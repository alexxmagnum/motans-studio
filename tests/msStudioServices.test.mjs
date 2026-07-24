import { describe, it } from "node:test";
import assert from "node:assert";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const appRoot = join(__dirname, "..");

describe("MOTANS_STUDIO_SERVICES_PREMIUM_REBUILD_V13", () => {
  it("uses super premium demo webp assets (not Motans product captures)", () => {
    const foundation = readFileSync(join(appRoot, "lib", "msStudioServicesFoundation.ts"), "utf-8");
    assert.ok(foundation.includes("MOTANS_STUDIO_SERVICES_PREMIUM_REBUILD_V13"));
    assert.ok(foundation.includes("webs-premium-demo.webp"));
    assert.ok(foundation.includes("saas-premium-demo.webp"));
    assert.ok(foundation.includes("automation-premium-demo.webp"));
    assert.ok(foundation.includes('kind: "demo"'));
    assert.ok(foundation.includes("Dapper Barbershop"));
    assert.ok(!foundation.includes("webs-demo.webp"));
  });

  it("keeps real motanos carta screenshot", () => {
    const foundation = readFileSync(join(appRoot, "lib", "msStudioServicesFoundation.ts"), "utf-8");
    assert.ok(foundation.includes("motanos-carta.webp"));
    assert.ok(foundation.includes('kind: "screenshot"'));
  });

  it("ships generated premium demo webp files", () => {
    const webs = readFileSync(join(appRoot, "public", "capabilities", "webs-premium-demo.webp"));
    assert.ok(webs.byteLength > 5_000);
    assert.equal(webs[0], 0x52);
  });

  it("opens capability images in a lightbox on /servicios", () => {
    const visual = readFileSync(
      join(appRoot, "components", "studio-services", "MsStudioCapabilitiesVisual.tsx"),
      "utf-8",
    );
    const capabilities = readFileSync(
      join(appRoot, "components", "studio-services", "MsStudioCapabilities.tsx"),
      "utf-8",
    );
    const expandable = readFileSync(
      join(appRoot, "components", "studio-services", "MsCapabilityExpandableFrame.tsx"),
      "utf-8",
    );

    assert.ok(visual.includes("MsCapabilityExpandableFrame"));
    assert.ok(visual.includes("expandable"));
    assert.ok(capabilities.includes("expandable"));
    assert.ok(expandable.includes("closeLightbox"));
    assert.ok(expandable.includes("mscap-lightbox__img"));
  });

  it("uses interactive MotanOS stamp splash on scroll and click", () => {
    const capabilities = readFileSync(
      join(appRoot, "components", "studio-services", "MsStudioCapabilities.tsx"),
      "utf-8",
    );
    const stamp = readFileSync(
      join(appRoot, "components", "studio-services", "MsCapMotanosStampInteractive.tsx"),
      "utf-8",
    );
    const layout = readFileSync(join(appRoot, "app", "layout.tsx"), "utf-8");

    assert.ok(capabilities.includes("MsCapMotanosStampInteractive"));
    assert.ok(!capabilities.includes('className="mscap-motanos-stamp"'));
    assert.ok(stamp.includes("IntersectionObserver"));
    assert.ok(stamp.includes("resetToPending"));
    assert.ok(stamp.includes("MS_STUDIO_STAMP_PLAY_RATIO"));
    assert.ok(layout.includes("msStudioStampSplash.css"));
  });
});
