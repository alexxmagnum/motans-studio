import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, test } from "node:test";

const __dirname = dirname(fileURLToPath(import.meta.url));
const foundation = readFileSync(join(__dirname, "..", "lib", "msSiteFooterFoundation.ts"), "utf-8");
const component = readFileSync(join(__dirname, "..", "components", "MsStudioFooter.tsx"), "utf-8");

describe("msSiteFooterFoundation", () => {
  test("footer bar — no hero copy or menu", () => {
    assert.ok(foundation.includes("MS_SITE_FOOTER_STUDIO_BAR_V3"));
    assert.ok(foundation.includes("legalLinks"));
    assert.ok(!foundation.includes("tagline"));
    assert.ok(!foundation.includes("Creemos productos"));
    assert.ok(!component.includes("ms-studio-footer__tagline"));
    assert.ok(!component.includes("MS_STUDIO_HOME_LOGO"));
    assert.ok(!component.includes("Inicio"));
    assert.ok(!component.includes("Servicios"));
  });

  test("includes legal link only — planes and solicitud live on motanos page", () => {
    assert.ok(foundation.includes("MS_SITE_ROUTES.legal"));
    assert.ok(!foundation.includes("MS_SITE_ROUTES.solicitud"));
    assert.ok(!foundation.includes("MS_SITE_ROUTES.planes"));
  });
});
