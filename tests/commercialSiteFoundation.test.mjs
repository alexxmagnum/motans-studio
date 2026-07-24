// Commercial Site Foundation Tests
// Block 4: SEO/legal/performance closure foundation

import { describe, it } from "node:test";
import assert from "node:assert";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe("Commercial Site Foundation", () => {
  describe("Foundation constants", () => {
    it("should have foundation status defined", () => {
      const foundationPath = join(__dirname, "..", "lib", "commercialSiteFoundation.ts");
      const content = readFileSync(foundationPath, "utf-8");

      assert.ok(content.includes("appId: \"@motanos/commercial-site\""), "should have correct appId");
      assert.ok(content.includes('phase: "Fase 17"'), "should have correct phase");
      assert.ok(content.includes("sellsMotanOS: true"), "should sell MotanOS");
      assert.ok(content.includes("digitalMenuBelongsToMotanOS: true"), "digital menu belongs to MotanOS");
      assert.ok(content.includes("allowsRealLeadCapture: true"), "lead capture enabled for publishable minimum");
      assert.ok(content.includes("publishableMinimally: true"), "publishable minimum flag");
      assert.ok(content.includes("productionReady: false"), "should not be production ready");
    });

    it("should have foundation messages defined", () => {
      const foundationPath = join(__dirname, "..", "lib", "commercialSiteFoundation.ts");
      const content = readFileSync(foundationPath, "utf-8");

      assert.ok(content.includes('headline:'), "should have headline");
      assert.ok(content.includes("No es complicado. Es MotanOS."), "should have correct headline");
      assert.ok(content.includes('tagline:'), "should have tagline");
      assert.ok(content.includes("sistema operativo"), "tagline should mention sistema operativo");
    });

    it("should have sections defined", () => {
      const sectionsPath = join(__dirname, "..", "lib", "commercialSiteSections.ts");
      const content = readFileSync(sectionsPath, "utf-8");

      assert.ok(content.includes("id: \"hero\""), "should have hero section");
      assert.ok(content.includes('status: "foundation_placeholder"'), "hero should have foundation_placeholder status");
    });
  });

  describe("Foundation shell", () => {
    it("should export foundation shell", () => {
      const shellPath = join(__dirname, "..", "app", "commercialSiteFoundationShell.ts");
      const content = readFileSync(shellPath, "utf-8");

      assert.ok(content.includes("export const COMMERCIAL_SITE_FOUNDATION_SHELL"), "should export COMMERCIAL_SITE_FOUNDATION_SHELL");
      assert.ok(content.includes("title:"), "shell should have title");
      assert.ok(content.includes("sections:"), "shell should have sections");
      assert.ok(content.includes("blockedActions:"), "shell should have blockedActions");
    });
  });
});
