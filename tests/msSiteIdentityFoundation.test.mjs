import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, test } from "node:test";

const __dirname = dirname(fileURLToPath(import.meta.url));
const identity = readFileSync(join(__dirname, "..", "lib", "msSiteIdentityFoundation.ts"), "utf-8");
const seo = readFileSync(join(__dirname, "..", "lib", "msSite1703SeoFoundation.ts"), "utf-8");
const legal = readFileSync(join(__dirname, "..", "lib", "msSiteLegalFoundation.ts"), "utf-8");

describe("msSiteIdentityFoundation", () => {
  test("official production identity is wired", () => {
    assert.ok(identity.includes("MS_SITE_IDENTITY_PRODUCTION_V1"));
    assert.ok(identity.includes("https://www.motansstudio.com"));
    assert.ok(identity.includes("Alexandru Ionut Casian"));
    assert.ok(identity.includes("X5129436E"));
    assert.ok(identity.includes("info@motansstudio.com"));
    assert.ok(identity.includes("+34 614 20 64 65"));
    assert.ok(seo.includes("MS_SITE_OFFICIAL_ORIGIN"));
    assert.ok(seo.includes("MS_SITE_IDENTITY.email"));
    assert.ok(legal.includes("MS_SITE_IDENTITY"));
    assert.ok(!legal.includes("[EDITAR]"));
    assert.ok(!legal.includes("Plantilla editable"));
  });
});
