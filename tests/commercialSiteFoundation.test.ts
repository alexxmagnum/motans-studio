import { describe, it } from "node:test";
import assert from "node:assert";

// Foundation contract tests for commercial site
// Block 4: SEO/legal/performance closure foundation

describe("Commercial Site Foundation", () => {
  describe("Foundation constants", () => {
    it("should have foundation status defined", async () => {
      const { COMMERCIAL_SITE_FOUNDATION_STATUS } = await import("../lib/commercialSiteFoundation.ts");

      assert.strictEqual(COMMERCIAL_SITE_FOUNDATION_STATUS.appId, "@motanos/commercial-site");
      assert.strictEqual(COMMERCIAL_SITE_FOUNDATION_STATUS.phase, "Fase 17");
      assert.strictEqual(COMMERCIAL_SITE_FOUNDATION_STATUS.sellsMotanOS, true);
      assert.strictEqual(COMMERCIAL_SITE_FOUNDATION_STATUS.digitalMenuBelongsToMotanOS, true);
      assert.strictEqual(COMMERCIAL_SITE_FOUNDATION_STATUS.allowsRealLeadCapture, true);
      assert.strictEqual(COMMERCIAL_SITE_FOUNDATION_STATUS.publishableMinimally, true);
      assert.strictEqual(COMMERCIAL_SITE_FOUNDATION_STATUS.productionReady, false);
    });

    it("should have foundation messages defined", async () => {
      const { COMMERCIAL_SITE_FOUNDATION_MESSAGE } = await import("../lib/commercialSiteFoundation.ts");

      assert.strictEqual(typeof COMMERCIAL_SITE_FOUNDATION_MESSAGE.headline, "string");
      assert.strictEqual(COMMERCIAL_SITE_FOUNDATION_MESSAGE.headline, "No es complicado. Es MotanOS.");
      assert.strictEqual(typeof COMMERCIAL_SITE_FOUNDATION_MESSAGE.tagline, "string");
      assert.ok(COMMERCIAL_SITE_FOUNDATION_MESSAGE.tagline.includes("sistema operativo"));
    });

    it("should have sections defined", async () => {
      const { COMMERCIAL_SITE_SECTIONS } = await import("../lib/commercialSiteSections.ts");

      assert.ok(Array.isArray(COMMERCIAL_SITE_SECTIONS));
      assert.ok(COMMERCIAL_SITE_SECTIONS.length > 0);

      const heroSection = COMMERCIAL_SITE_SECTIONS.find(s => s.id === "hero");
      assert.ok(heroSection);
      assert.strictEqual(heroSection?.status, "foundation_placeholder");
    });
  });

  describe("Foundation shell", () => {
    it("should export foundation shell", async () => {
      const { COMMERCIAL_SITE_FOUNDATION_SHELL } = await import("../app/commercialSiteFoundationShell.ts");

      assert.ok(COMMERCIAL_SITE_FOUNDATION_SHELL);
      assert.strictEqual(typeof COMMERCIAL_SITE_FOUNDATION_SHELL.title, "string");
      assert.ok(Array.isArray(COMMERCIAL_SITE_FOUNDATION_SHELL.sections));
      assert.ok(Array.isArray(COMMERCIAL_SITE_FOUNDATION_SHELL.blockedActions));
    });
  });
});
