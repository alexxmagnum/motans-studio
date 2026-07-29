import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, test } from "node:test";

const __dirname = dirname(fileURLToPath(import.meta.url));
const foundation = readFileSync(join(__dirname, "..", "lib", "msSiteFooterFoundation.ts"), "utf-8");
const component = readFileSync(join(__dirname, "..", "components", "MsStudioFooter.tsx"), "utf-8");

describe("msSiteFooterFoundation", () => {
  test("footer close V3 — brand, specialties, talk, minimal legal", () => {
    assert.ok(foundation.includes("MS_SITE_FOOTER_STUDIO_CLOSE_V3"));
    assert.ok(foundation.includes("MS_SITE_FOOTER_LEGAL"));
    assert.ok(foundation.includes("MS_SITE_FOOTER_SPECIALTIES"));
    assert.ok(foundation.includes("MS_SITE_IDENTITY.email"));
    assert.ok(foundation.includes("Especializados en"));
    assert.ok(foundation.includes("tagline"));
    assert.ok(component.includes("ms-studio-footer__tagline"));
    assert.ok(component.includes("ms-studio-footer__specialties"));
    assert.ok(component.includes("ms-studio-footer__cta"));
    assert.ok(component.includes("openPreferences"));
    assert.ok(component.includes("Motans Studio") || foundation.includes("MS_SITE_IDENTITY.brand"));
    assert.ok(!foundation.includes("MS_SITE_FOOTER_NAV"));
    assert.ok(!foundation.includes("MS_SITE_FOOTER_SERVICES"));
    assert.ok(!foundation.includes("MS_SITE_FOOTER_TECH"));
    assert.ok(!foundation.includes("MS_SITE_FOOTER_SOCIAL"));
    assert.ok(!foundation.includes("MS_SITE_ROUTES.solicitud"));
    assert.ok(!foundation.includes("MS_SITE_ROUTES.planes"));
  });

  test("legal footer — aviso, privacidad, cookies, condiciones", () => {
    assert.ok(foundation.includes("MS_SITE_ROUTES.legalAviso"));
    assert.ok(foundation.includes("MS_SITE_ROUTES.legalPrivacidad"));
    assert.ok(foundation.includes("MS_SITE_ROUTES.legalCookies"));
    assert.ok(foundation.includes("MS_SITE_ROUTES.legalCondiciones"));
    assert.ok(foundation.includes('label: "Cookies"'));
    assert.ok(!foundation.includes("MS_SITE_ROUTES.legalServicios"));
    assert.ok(!foundation.includes("MS_SITE_ROUTES.legalAccesibilidad"));
  });
});
