import { describe, it } from "node:test";
import assert from "node:assert";
import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const appDir = join(__dirname, "..", "app");
const componentsDir = join(__dirname, "..", "components");

describe("MS_SITE_17_02 premium refinement", () => {
  it("exposes engagement paths for web-only, motanos-only and bundle", () => {
    const css = readFileSync(join(appDir, "msSite1701Global.css"), "utf-8");
    assert.ok(css.includes("--ms-accent-aqua"));
    assert.ok(css.includes("ms-nav-mobile"));
    assert.ok(existsSync(join(componentsDir, "MsEngagementPaths.tsx")));
    assert.ok(existsSync(join(componentsDir, "MsEcosystemLadder.tsx")));
  });

  it("home includes engagement paths section", () => {
    const home = readFileSync(join(appDir, "page.tsx"), "utf-8");
    assert.ok(home.includes("MsEngagementPaths"));
    assert.ok(home.includes("MsEcosystemLadder"));
    assert.ok(home.includes("ms-hero--dark"));
  });

  it("hosteleria uses dedicated landing V1", () => {
    const page = readFileSync(join(appDir, "motanos", "hosteleria", "page.tsx"), "utf-8");
    assert.ok(page.includes("MsHosteleriaLandingV1"));
  });
});
