// Commercial Site Foundation Tests Runner
// Fase 17 - Block 4: SEO/legal/performance closure

import { run } from "node:test";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Run all test files in the tests directory
const testFiles = [
  join(__dirname, "commercialSiteFoundation.test.js"),
  join(__dirname, "commercialSiteSeo.test.js"),
  join(__dirname, "commercialSiteLegal.test.js"),
  join(__dirname, "commercialLandingClaimsGuard.test.js"),
  join(__dirname, "hosteleriaLandingContentModelFoundation.test.js"),
  join(__dirname, "hosteleriaLandingContentModelHardening.test.js"),
  join(__dirname, "hosteleriaLandingPreviewAdapterFoundation.test.js"),
  join(__dirname, "hosteleriaLandingPreviewShellSlotFoundation.test.js"),
  join(__dirname, "hosteleriaLandingPreviewRouteBoundaryFoundation.test.js"),
];

console.log("[commercial-site tests] Running foundation tests...");

let passed = 0;
let failed = 0;

const stream = run({
  files: testFiles,
});

stream.on("test:fail", (test: unknown) => {
  const t = test as { name: string };
  console.error(`[commercial-site tests] FAIL: ${t.name}`);
  failed++;
});

stream.on("test:pass", (test: unknown) => {
  const t = test as { name: string };
  console.log(`[commercial-site tests] PASS: ${t.name}`);
  passed++;
});

stream.on("end", () => {
  console.log(`\n[commercial-site tests] Results: ${passed} passed, ${failed} failed`);
  process.exit(failed > 0 ? 1 : 0);
});
