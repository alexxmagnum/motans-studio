// Commercial Site Foundation Tests Runner
// Fase 17 + Fase 7A — suite alineada a superficie studio pública (MotanOS congelado).

import { run } from "node:test";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Activos: site comercial studio + claims + SEO/legal + foundations vivas.
 * Fuera del runner (obsoletos para superficie pública MotanOS congelada):
 * - msSiteMotanosPlansFoundation.test.mjs
 * - msSiteSaasOnboardingCtaFoundation.test.mjs
 * Conservados aparte: hostelería foundations (producto interno / futuro).
 */
const testFiles = [
  join(__dirname, "commercialSiteFoundation.test.mjs"),
  join(__dirname, "commercialSiteSeo.test.mjs"),
  join(__dirname, "commercialSiteLegal.test.mjs"),
  join(__dirname, "fase17CommercialSitePublishable.test.mjs"),
  join(__dirname, "commercialLandingClaimsGuard.test.mjs"),
  join(__dirname, "msSite1701Foundation.test.mjs"),
  join(__dirname, "msSiteFooterFoundation.test.mjs"),
  join(__dirname, "msSite1703Foundation.test.mjs"),
  join(__dirname, "msSiteLocaleFoundation.test.mjs"),
  join(__dirname, "msSiteLandingNavFoundation.test.mjs"),
  join(__dirname, "msSitePageBackFoundation.test.mjs"),
  join(__dirname, "msSite1703Seo.test.mjs"),
  join(__dirname, "hosteleriaLandingContentModelFoundation.test.mjs"),
  join(__dirname, "hosteleriaLandingContentModelHardening.test.mjs"),
  join(__dirname, "hosteleriaLandingPreviewAdapterFoundation.test.mjs"),
  join(__dirname, "hosteleriaLandingPreviewShellSlotFoundation.test.mjs"),
  join(__dirname, "hosteleriaLandingPreviewRouteBoundaryFoundation.test.mjs"),
  join(__dirname, "motanOsHosteleriaMovementEngine.test.mjs"),
  join(__dirname, "msStudioHome.test.mjs"),
  join(__dirname, "msStudioServices.test.mjs"),
];

console.log("[motans-studio tests] Running foundation tests...");

let passed = 0;
let failed = 0;

const stream = run({ files: testFiles });

stream.on("test:fail", (test) => {
  console.error(`[motans-studio tests] FAIL: ${test.name}`);
  failed += 1;
});

stream.on("test:pass", (test) => {
  console.log(`[motans-studio tests] PASS: ${test.name}`);
  passed += 1;
});

stream.on("end", () => {
  const streamFailed = typeof stream.failed === "number" ? stream.failed : 0;
  const totalFailed = Math.max(failed, streamFailed);
  const exitCode = totalFailed > 0 ? 1 : 0;

  console.log(
    `\n[motans-studio tests] Results: ${passed} passed, ${totalFailed} failed (stream.failed=${streamFailed})`,
  );

  process.exit(exitCode);
});

stream.on("error", (error) => {
  console.error("[motans-studio tests] Runner error:", error);
  process.exit(1);
});
