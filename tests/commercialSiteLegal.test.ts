// Commercial Site Legal Tests
// Fase 17 - Block 4: SEO/legal/performance closure
// Fase 6 — hub + plantillas legales

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

function readLegalSurface(): string {
  return [
    readFileSync(join(appDir, "legal", "page.tsx"), "utf-8"),
    readFileSync(join(componentsDir, "MsSiteLegalDocument.tsx"), "utf-8"),
    readFileSync(join(libDir, "msSiteLegalFoundation.ts"), "utf-8"),
  ].join("\n");
}

describe("Commercial Site Legal", () => {
  it("should have legal page", () => {
    const legalPath = join(appDir, "legal", "page.tsx");
    assert.ok(existsSync(legalPath), "legal page should exist");
  });

  it("should have contact information in legal page", () => {
    const content = readLegalSurface().toLowerCase();
    assert.ok(
      content.includes("motans studio") ||
        content.includes("contacto") ||
        content.includes("email"),
      "legal page should have contact information",
    );
  });

  it("should have privacy mention in legal page", () => {
    const content = readLegalSurface().toLowerCase();
    assert.ok(content.includes("privacidad"), "legal page should mention privacy");
  });

  it("should mention cookies in legal page", () => {
    const content = readLegalSurface().toLowerCase();
    assert.ok(
      content.includes("cookies") || content.includes("cookie"),
      "legal page should mention cookies",
    );
  });

  it("should have terms of use mention", () => {
    const content = readLegalSurface().toLowerCase();
    assert.ok(
      content.includes("términos") ||
        content.includes("condiciones") ||
        content.includes("uso"),
      "legal page should mention terms of use",
    );
  });

  it("should link back to home from legal page", () => {
    const layoutPath = join(__dirname, "..", "app", "layout.tsx");
    const backFoundationPath = join(__dirname, "..", "lib", "msSitePageBackFoundation.ts");
    const layout = readFileSync(layoutPath, "utf-8");
    const foundation = readFileSync(backFoundationPath, "utf-8");

    assert.ok(
      layout.includes("MsSitePageBackLink") &&
        foundation.includes("MS_SITE_ROUTES.home") &&
        foundation.includes("[MS_SITE_ROUTES.legal]"),
      "legal route should use global back link to home via layout",
    );
  });

  it("should have footer with legal link in layout", () => {
    const footerPath = join(componentsDir, "MsStudioFooter.tsx");
    const foundationPath = join(libDir, "msSiteFooterFoundation.ts");
    const content = `${readFileSync(footerPath, "utf-8")}\n${readFileSync(foundationPath, "utf-8")}`;

    assert.ok(
      content.includes('href="/legal"') ||
        content.includes("MS_SITE_ROUTES.legal") ||
        content.includes("MS_SITE_FOOTER"),
      "footer should link to legal page",
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
