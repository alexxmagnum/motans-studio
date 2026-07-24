import { describe, it } from "node:test";
import assert from "node:assert";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

describe("Fase 17 commercial site publishable", () => {
  it("should define Plan 07 §22.4 checklist routes", async () => {
    const { FASE_17_PLAN_07_22_4_CHECKLIST, FASE_17_PUBLISHABLE_STATUS } = await import(
      "../lib/fase17CommercialSitePublishableFoundation.ts"
    );
    assert.strictEqual(FASE_17_PUBLISHABLE_STATUS.publishableMinimally, true);
    assert.ok(FASE_17_PLAN_07_22_4_CHECKLIST.length >= 6);
    const routes = FASE_17_PLAN_07_22_4_CHECKLIST.map((item) => item.route);
    assert.ok(routes.includes("/"));
    assert.ok(routes.includes("/planes"));
    assert.ok(routes.includes("/solicitud"));
    assert.ok(routes.includes("/legal"));
  });

  it("should include publishable routes in sitemap", () => {
    const seo = readFileSync(join(root, "lib", "msSite1703SeoFoundation.ts"), "utf-8");
    assert.ok(seo.includes('"/planes"'));
    assert.ok(seo.includes('"/solicitud"'));
    assert.ok(seo.includes('"/legal"'));
  });

  it("should wire lead and assisted forms to public API paths", () => {
    const client = readFileSync(join(root, "lib", "apiClient.ts"), "utf-8");
    assert.ok(client.includes("/api/public/leads"));
    assert.ok(client.includes("/api/public/assisted-requests"));
    assert.ok(client.includes("payload.success === false"));
  });

  it("should enable public capture in foundation status", async () => {
    const { COMMERCIAL_SITE_FOUNDATION_STATUS } = await import(
      "../lib/commercialSiteFoundation.ts"
    );
    assert.strictEqual(COMMERCIAL_SITE_FOUNDATION_STATUS.phase, "Fase 17");
    assert.strictEqual(COMMERCIAL_SITE_FOUNDATION_STATUS.allowsRealLeadCapture, true);
    assert.strictEqual(COMMERCIAL_SITE_FOUNDATION_STATUS.allowsRealAssistedRequests, true);
    assert.strictEqual(COMMERCIAL_SITE_FOUNDATION_STATUS.publishableMinimally, true);
  });
});
