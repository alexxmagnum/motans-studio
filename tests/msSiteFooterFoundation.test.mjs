import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, test } from "node:test";

const __dirname = dirname(fileURLToPath(import.meta.url));
const foundation = readFileSync(join(__dirname, "..", "lib", "msSiteFooterFoundation.ts"), "utf-8");
const component = readFileSync(join(__dirname, "..", "components", "MsStudioFooter.tsx"), "utf-8");

describe("msSiteFooterFoundation", () => {
  test("footer premium — brand, nav, services, legal (no MotanOS CTA routes)", () => {
    assert.ok(foundation.includes("MS_SITE_FOOTER_STUDIO_PREMIUM_V1"));
    assert.ok(foundation.includes("legalLinks") || foundation.includes("MS_SITE_FOOTER_LEGAL"));
    assert.ok(foundation.includes("tagline"));
    assert.ok(component.includes("ms-studio-footer__tagline"));
    assert.ok(component.includes("Motans Studio"));
    assert.ok(component.includes("Servicios") || foundation.includes("MS_SITE_FOOTER_SERVICES"));
    assert.ok(!foundation.includes("MS_SITE_ROUTES.solicitud"));
    assert.ok(!foundation.includes("MS_SITE_ROUTES.planes"));
  });

  test("includes legal routes — planes and solicitud stay out of public footer", () => {
    assert.ok(
      foundation.includes("MS_SITE_ROUTES.legal") ||
        foundation.includes("MS_SITE_ROUTES.legalAviso"),
    );
    assert.ok(!foundation.includes("MS_SITE_ROUTES.solicitud"));
    assert.ok(!foundation.includes("MS_SITE_ROUTES.planes"));
  });
});
