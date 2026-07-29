// Commercial Site Legal Tests
// Fase 4 — cuatro documentos mínimos (aviso, privacidad, cookies, condiciones)

import { describe, it } from "node:test";
import assert from "node:assert";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const appDir = join(__dirname, "..", "app");
const componentsDir = join(__dirname, "..", "components");
const libDir = join(__dirname, "..", "lib");

function readLegalSurface() {
  return [
    readFileSync(join(appDir, "legal", "aviso-legal", "page.tsx"), "utf-8"),
    readFileSync(join(componentsDir, "MsSiteLegalDocument.tsx"), "utf-8"),
    readFileSync(join(libDir, "msSiteLegalFoundation.ts"), "utf-8"),
  ].join("\n");
}

describe("Commercial Site Legal", () => {
  it("should have legal redirect at /legal", () => {
    assert.ok(existsSync(join(appDir, "legal", "page.tsx")), "legal page should exist");
  });

  it("should have contact information in legal documents", () => {
    const content = readLegalSurface().toLowerCase();
    assert.ok(
      content.includes("motans studio") ||
        content.includes("correo") ||
        content.includes("email"),
      "legal documents should have contact information",
    );
  });

  it("should have privacy document", () => {
    const content = readLegalSurface().toLowerCase();
    assert.ok(content.includes("privacidad"), "should mention privacy");
  });

  it("should mention cookies", () => {
    const content = readLegalSurface().toLowerCase();
    assert.ok(
      content.includes("cookies") || content.includes("cookie"),
      "should mention cookies",
    );
  });

  it("should have terms of use", () => {
    const content = readLegalSurface().toLowerCase();
    assert.ok(
      content.includes("condiciones") || content.includes("uso"),
      "should mention terms of use",
    );
  });

  it("should expose exactly four legal document routes", () => {
    const routes = ["aviso-legal", "privacidad", "cookies", "condiciones"];
    for (const route of routes) {
      assert.ok(
        existsSync(join(appDir, "legal", route, "page.tsx")),
        `legal/${route} page should exist`,
      );
    }
    const foundation = readFileSync(join(libDir, "msSiteLegalFoundation.ts"), "utf-8");
    assert.ok(!foundation.includes('id: "servicios"'));
    assert.ok(!foundation.includes("contacto-legal"));
    assert.ok(!foundation.includes('id: "accesibilidad"'));
    assert.ok(!foundation.includes("MS_SITE_LEGAL_HUB"));
  });

  it("should link back to home from legal pages", () => {
    const layoutPath = join(__dirname, "..", "app", "layout.tsx");
    const backFoundationPath = join(__dirname, "..", "lib", "msSitePageBackFoundation.ts");
    const layout = readFileSync(layoutPath, "utf-8");
    const foundation = readFileSync(backFoundationPath, "utf-8");

    assert.ok(
      layout.includes("MsSitePageBackLink") &&
        foundation.includes("href: MS_SITE_ROUTES.home") &&
        foundation.includes("[MS_SITE_ROUTES.legalAviso]"),
      "legal routes should use global back link to home via layout",
    );
  });

  it("should have footer with legal links", () => {
    const footerPath = join(componentsDir, "MsStudioFooter.tsx");
    const foundationPath = join(libDir, "msSiteFooterFoundation.ts");
    const content = `${readFileSync(footerPath, "utf-8")}\n${readFileSync(foundationPath, "utf-8")}`;

    assert.ok(
      content.includes("MS_SITE_ROUTES.legalAviso") ||
        content.includes("MS_SITE_FOOTER_LEGAL") ||
        content.includes("/legal/"),
      "footer should link to legal pages",
    );
  });

  it("should have copyright notice", () => {
    const content = readFileSync(join(componentsDir, "MsStudioFooter.tsx"), "utf-8");
    assert.ok(
      content.includes("©") || content.toLowerCase().includes("copyright"),
      "should have copyright notice",
    );
  });

  it("should mention all rights reserved or similar", () => {
    const footer = readFileSync(join(componentsDir, "MsStudioFooter.tsx"), "utf-8");
    const ui = readFileSync(join(libDir, "msSiteUiI18nFoundation.ts"), "utf-8");
    const content = `${footer}\n${ui}`;
    assert.ok(
      content.toLowerCase().includes("todos los derechos") ||
        content.toLowerCase().includes("all rights") ||
        content.includes("footerRights"),
      "should mention rights reserved",
    );
  });
});
