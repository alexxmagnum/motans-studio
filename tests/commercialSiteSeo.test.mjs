// Commercial Site SEO Tests
// Fase 17 - Block 4: SEO/legal/performance closure

import { describe, it } from "node:test";
import assert from "node:assert";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const appDir = join(__dirname, "..", "app");

describe("Commercial Site SEO", () => {
  it("should have metadata in layout.tsx", () => {
    const layoutPath = join(appDir, "layout.tsx");
    const content = readFileSync(layoutPath, "utf-8");
    
    // Check for metadata export
    assert.ok(content.includes("export const metadata"), "layout should export metadata");
    assert.ok(
      content.includes("createMsSitePageMetadata"),
      "layout should use premium SEO metadata factory",
    );
  });

  it("should have semantic HTML structure", () => {
    const layoutPath = join(appDir, "layout.tsx");
    const shellPath = join(__dirname, "..", "components", "MotansStudioSiteShell.tsx");
    const footerPath = join(__dirname, "..", "components", "MsStudioFooter.tsx");
    const layout = readFileSync(layoutPath, "utf-8");
    const shell = readFileSync(shellPath, "utf-8");
    const footer = readFileSync(footerPath, "utf-8");

    assert.ok(layout.includes('id="main-content"'), "should have main-content id");
    assert.ok(layout.includes("<main"), "layout should wrap main landmark");
    assert.ok(shell.includes("MsStudioFooter"), "shell should render footer component");
    assert.ok(footer.toLowerCase().includes("<footer"), "footer component should have footer element");
    assert.ok(footer.includes('role="contentinfo"'), "footer should have contentinfo role");
    assert.ok(footer.includes("ms-studio-footer"), "footer should use studio footer class");
  });

  it("should have lang attribute for accessibility", () => {
    const layoutPath = join(appDir, "layout.tsx");
    const content = readFileSync(layoutPath, "utf-8");
    
    assert.ok(content.includes('<html lang="es"'), "html should have lang=es");
  });

  it("should have skip link for accessibility", () => {
    const layoutPath = join(appDir, "layout.tsx");
    const content = readFileSync(layoutPath, "utf-8");
    
    assert.ok(
      content.includes('href="#main-content"') || content.includes('href="#inicio"'),
      "should have skip link",
    );
    assert.ok(content.includes('id="main-content"'), "should have main-content id");
  });

  it("should not have hardcoded prices in plans page", () => {
    const plansPath = join(appDir, "planes", "page.tsx");
    const content = readFileSync(plansPath, "utf-8");
    
    // Check for common price patterns (€, $, numbers that look like prices)
    const pricePattern = /€\s*\d+[,.]?\d*/;
    const dollarPattern = /\$\s*\d+[,.]?\d*/;
    
    assert.ok(!pricePattern.test(content), "plans page should not have euro prices hardcoded");
    assert.ok(!dollarPattern.test(content), "plans page should not have dollar prices hardcoded");
  });

  it("should have CTA routes defined", () => {
    const home = readFileSync(join(appDir, "page.tsx"), "utf-8");
    const contacto = readFileSync(join(appDir, "contacto", "page.tsx"), "utf-8");
    const shell = readFileSync(join(__dirname, "..", "components", "MotansStudioSiteShell.tsx"), "utf-8");
    const footer = readFileSync(join(__dirname, "..", "components", "MsStudioFooter.tsx"), "utf-8");
    const footerFoundation = readFileSync(
      join(__dirname, "..", "lib", "msSiteFooterFoundation.ts"),
      "utf-8",
    );
    const studioHome = readFileSync(
      join(__dirname, "..", "lib", "msStudioHomeFoundation.ts"),
      "utf-8",
    );
    const navFoundation = readFileSync(
      join(__dirname, "..", "lib", "msSite1701Foundation.ts"),
      "utf-8",
    );
    const motanos = readFileSync(join(appDir, "motanos", "page.tsx"), "utf-8");
    const combined = `${home}\n${contacto}\n${motanos}\n${shell}\n${footer}\n${footerFoundation}\n${studioHome}\n${navFoundation}`;

    assert.ok(
      combined.includes('href="/planes"') ||
        combined.includes("/#planes") ||
        combined.includes("MS_SITE_ROUTES.planes"),
      "should link to /planes",
    );
    assert.ok(
      combined.includes('href="/solicitud"') || combined.includes("MS_SITE_ROUTES.solicitud"),
      "should link to /solicitud",
    );
    assert.ok(
      combined.includes('href="#contacto"') ||
        combined.includes('href="/#contacto"') ||
        combined.includes('href="/contacto"') ||
        combined.includes("#contacto") ||
        combined.includes("MS_SITE_ROUTES.contacto") ||
        combined.includes("MS_SITE_DARK_HEADER_CTA"),
      "should link to contacto",
    );
  });

  it("should mention Spain as active market", () => {
    const seoFoundation = readFileSync(
      join(__dirname, "..", "lib", "msSite1703SeoFoundation.ts"),
      "utf-8",
    );
    const content = seoFoundation.toLowerCase();

    assert.ok(content.includes("españa") || content.includes("spain"), "site should mention Spain");
    assert.ok(content.includes("activo") || content.includes("activa"), "should indicate Spain is active");
  });

  it("should indicate other countries are upcoming, not active", () => {
    const plansFoundation = readFileSync(
      join(__dirname, "..", "lib", "msSiteMotanosPlansFoundation.ts"),
      "utf-8",
    );
    const seoFoundation = readFileSync(
      join(__dirname, "..", "lib", "msSite1703SeoFoundation.ts"),
      "utf-8",
    );
    const content = `${plansFoundation}\n${seoFoundation}`.toLowerCase();

    const hasUpcoming =
      content.includes("próximamente") ||
      content.includes("próximas aperturas") ||
      content.includes("futuras expansiones");

    assert.ok(hasUpcoming, "should mention other countries as upcoming");
  });

  it("should NOT promise delivery as active feature", () => {
    const content = [
      readFileSync(join(appDir, "page.tsx"), "utf-8"),
      readFileSync(join(appDir, "motanos", "hosteleria", "page.tsx"), "utf-8"),
    ].join("\n");
    
    // Delivery should not be presented as currently available
    const deliveryActivePattern = /delivery.*(disponible|activo|ya|ahora|incluye)/i;
    assert.ok(
      !deliveryActivePattern.test(content),
      "should not promise delivery as currently active"
    );
  });

  it("should NOT promise takeaway as active feature", () => {
    const content = [
      readFileSync(join(appDir, "page.tsx"), "utf-8"),
      readFileSync(join(appDir, "motanos", "hosteleria", "page.tsx"), "utf-8"),
    ].join("\n");
    
    // Takeaway should not be presented as currently available
    const takeawayActivePattern = /takeaway.*(disponible|activo|ya|ahora|incluye)/i;
    assert.ok(
      !takeawayActivePattern.test(content),
      "should not promise takeaway as currently active"
    );
  });

  it("should NOT promise mobile app as available now", () => {
    const content = [
      readFileSync(join(appDir, "page.tsx"), "utf-8"),
      readFileSync(join(appDir, "motanos", "hosteleria", "page.tsx"), "utf-8"),
    ].join("\n");
    
    // App should not be presented as currently available
    const appActivePattern = /app.*(disponible|descarga|play store|app store|ya)/i;
    assert.ok(
      !appActivePattern.test(content),
      "should not promise mobile app as currently available"
    );
  });

  it("should indicate app is future/optional", () => {
    const content = [
      readFileSync(join(appDir, "page.tsx"), "utf-8"),
      readFileSync(join(appDir, "motanos", "hosteleria", "page.tsx"), "utf-8"),
      readFileSync(join(__dirname, "..", "lib", "msSiteMotanosPlansFoundation.ts"), "utf-8"),
    ].join("\n");
    
    // Should mention app as future or PWA-ready
    const hasFutureApp = 
      content.toLowerCase().includes("futura") ||
      content.toLowerCase().includes("pwa") ||
      content.toLowerCase().includes("futuro");
    
    assert.ok(hasFutureApp, "should indicate app is future/PWA");
  });
});
