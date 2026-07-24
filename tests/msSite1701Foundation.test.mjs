import { describe, it } from "node:test";
import assert from "node:assert";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { MOTANS_CORPORATE_BRAND_ASSETS } from "@motanos/branding";

const __dirname = dirname(fileURLToPath(import.meta.url));
const appDir = join(__dirname, "..", "app");
const publicBrandDir = join(__dirname, "..", "public", "brand");
const foundationPath = join(__dirname, "..", "lib", "msSite1701Foundation.ts");

describe("MS_SITE_17_01 foundation", () => {
  it("exposes block id and required routes", () => {
    const source = readFileSync(foundationPath, "utf-8");
    assert.match(
      source,
      /MS_SITE_17_01_MOTANS_STUDIO_COMMERCIAL_SITE_WITH_MOTANOS_SUBSITE_FOUNDATION/,
    );
    assert.match(source, /@motanos\/branding/);
    assert.match(source, /motanos:\s*"\/motanos"/);
    assert.match(source, /hosteleria:\s*"\/motanos\/hosteleria"/);
  });

  it("serves brand assets under public/brand", () => {
    for (const key of ["iconM", "markMsWebp", "stamp"]) {
      const asset = MOTANS_CORPORATE_BRAND_ASSETS[key];
      assert.ok(existsSync(join(publicBrandDir, asset.fileName)), `missing ${asset.fileName}`);
    }
  });

  it("has route page files for subsite structure", () => {
    for (const route of [
      "page.tsx",
      join("servicios", "page.tsx"),
      join("motanos", "page.tsx"),
      join("motanos", "hosteleria", "page.tsx"),
      join("contacto", "page.tsx"),
    ]) {
      assert.ok(existsSync(join(appDir, route)), `missing ${route}`);
    }
  });
});
