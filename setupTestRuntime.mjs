// Test runtime setup for Node.js native test runner
// Resolves .js imports to .ts source files for testing

import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, resolve as resolvePath, extname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const extensions = [".ts", ".tsx", ".js", ".jsx"];

export async function resolve(specifier, context, nextResolve) {
  // Handle relative imports without extensions
  if (specifier.startsWith("./") || specifier.startsWith("../")) {
    if (!extname(specifier)) {
      for (const ext of extensions) {
        try {
          const resolved = resolvePath(__dirname, specifier + ext);
          readFileSync(resolved);
          return {
            url: "file://" + resolved,
            shortCircuit: true,
          };
        } catch {
          // Try next extension
        }
      }
    }
    
    // Handle .js imports -> resolve to .ts
    if (specifier.endsWith(".js")) {
      const tsSpecifier = specifier.slice(0, -3) + ".ts";
      try {
        const resolved = resolvePath(__dirname, tsSpecifier);
        readFileSync(resolved);
        return {
          url: "file://" + resolved,
          shortCircuit: true,
        };
      } catch {
        // Fall through to default
      }
    }
  }
  
  return nextResolve(specifier, context);
}

export async function load(url, context, nextLoad) {
  return nextLoad(url, context);
}
