/**
 * Dev server with clean cache — avoids Webpack runtime module errors after heavy edits.
 * Use `pnpm dev` (not only `dev:fast`) if you see Runtime Error / missing chunk modules.
 */
import { existsSync, rmSync } from "node:fs";
import { spawn } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const appRoot = join(dirname(fileURLToPath(import.meta.url)), "..");

function removeDir(path) {
  if (!existsSync(path)) {
    return;
  }
  rmSync(path, { recursive: true, force: true });
  console.log(`[motans-studio-website] removed: ${path}`);
}

removeDir(join(appRoot, ".next"));
removeDir(join(appRoot, "node_modules", ".cache"));

console.log("[motans-studio-website] starting next dev (clean cache)…");

const child = spawn(
  "next",
  ["dev", "--port", "3001", "--hostname", "0.0.0.0"],
  { cwd: appRoot, stdio: "inherit", shell: true },
);

child.on("exit", (code) => {
  process.exit(code ?? 0);
});
