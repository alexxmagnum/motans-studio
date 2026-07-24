import { describe, it } from "node:test";
import assert from "node:assert";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import {
  MS_SITE_1701_BLOCK_ID,
  MS_SITE_BRAND_ASSETS,
  MS_SITE_FORBIDDEN_CLAIMS,
  MS_SITE_ROUTES,
} from "../lib/msSite1701Foundation";

const __dirname = dirname(fileURLToPath(import.meta.url));
const appDir = join(__dirname, "..", "app");
const publicBrandDir = join(__dirname, "..", "public", "brand");

describe("MS_SITE_17_01 foundation", () => {
  it("exposes block id and required routes", () => {
    assert.strictEqual(
      MS_SITE_1701_BLOCK_ID,
      "MS_SITE_17_01_MOTANS_STUDIO_COMMERCIAL_SITE_WITH_MOTANOS_SUBSITE_FOUNDATION",
    );
    assert.strictEqual(MS_SITE_ROUTES.home, "/");
    assert.strictEqual(MS_SITE_ROUTES.servicios, "/servicios");
    assert.strictEqual(MS_SITE_ROUTES.motanos, "/motanos");
    assert.strictEqual(MS_SITE_ROUTES.hosteleria, "/motanos/hosteleria");
    assert.strictEqual(MS_SITE_ROUTES.contacto, "/contacto");
  });

  it("serves brand assets under public/brand", () => {
    for (const asset of [
      MS_SITE_BRAND_ASSETS.logoM,
      MS_SITE_BRAND_ASSETS.logoMs,
      MS_SITE_BRAND_ASSETS.logoMotanOSProduct,
    ]) {
      const filename = asset.path.replace("/brand/", "");
      assert.ok(
        existsSync(join(publicBrandDir, filename)),
        `missing brand asset: ${filename}`,
      );
    }
  });

  it("has route page files for subsite structure", () => {
    const routes = [
      "page.tsx",
      join("servicios", "page.tsx"),
      join("motanos", "page.tsx"),
      join("motanos", "hosteleria", "page.tsx"),
      join("contacto", "page.tsx"),
    ];
    for (const route of routes) {
      assert.ok(existsSync(join(appDir, route)), `missing route file: ${route}`);
    }
  });

  it("lists explicit forbidden commercial claims", () => {
    assert.ok(MS_SITE_FORBIDDEN_CLAIMS.some((c) => /TPV/i.test(c)));
    assert.ok(MS_SITE_FORBIDDEN_CLAIMS.some((c) => /Delivery/i.test(c)));
    assert.ok(MS_SITE_FORBIDDEN_CLAIMS.some((c) => /carta QR como producto/i.test(c)));
  });
});
