/**
 * Commercial Site — Test Runtime Setup
 *
 * Creates node_modules shims in .test-dist so that @motanos/* workspace
 * packages can be resolved at runtime by Node.js ESM loader.
 */

import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const testDistRoot = new URL("../.test-dist/apps/commercial-site/", import.meta.url);
const testDistPath = fileURLToPath(testDistRoot);

const createPackageShim = async (packageName, relativeTarget) => {
  const packageRoot = join(testDistPath, "node_modules", "@motanos", packageName);
  await mkdir(packageRoot, { recursive: true });
  await writeFile(
    join(packageRoot, "package.json"),
    JSON.stringify(
      {
        name: `@motanos/${packageName}`,
        private: true,
        type: "module",
        exports: { ".": "./index.js" },
      },
      null,
      2
    )
  );
  await writeFile(
    join(packageRoot, "index.js"),
    `export * from ${JSON.stringify(relativeTarget)};\n`
  );
};

await mkdir(join(testDistPath, "node_modules", "@motanos"), { recursive: true });

// Commercial-site solo usa los foundations del propio repo
// No necesita shims externos para los tests de foundation

console.log("[motans-studio-website] Test runtime setup complete.");
