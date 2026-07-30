import { describe, it } from "node:test";
import assert from "node:assert";
import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const appDir = join(__dirname, "..", "app");
const libDir = join(__dirname, "..", "lib");

describe("MS_SITE_17_03C premium SEO", () => {
  it("hero brand and structured data are wired on home", () => {
    const home = readFileSync(join(appDir, "page.tsx"), "utf-8");
    const copy = readFileSync(join(libDir, "msStudioHomeFoundation.ts"), "utf-8");
    assert.ok(copy.includes("MOTANS_STUDIO_HOME_PREMIUM_HERO_CONTINUITY_V1"));
    assert.ok(copy.includes("MOTANS_STUDIO_PREMIUM_HERO_SPLIT_V2"));
    assert.ok(copy.includes("Creamos herramientas digitales"));
    assert.ok(copy.includes("que simplifican el"));
    assert.ok(copy.includes('accent: "trabajo"'));
    assert.ok(copy.includes("badge: \"Motans Studio\""));
    assert.ok(home.includes("MsStudioHomeHero"));
    assert.ok(home.includes("MsSiteStructuredData"));
  });

  it("SEO foundation has metadata helper and JSON-LD", () => {
    const seo = readFileSync(join(libDir, "msSite1703SeoFoundation.ts"), "utf-8");
    assert.ok(seo.includes("createMsSitePageMetadata"));
    assert.ok(seo.includes("Organization"));
    assert.ok(seo.includes("canonical"));
    assert.ok(seo.includes("Motans Studio"));
    assert.ok(seo.includes("icons"));
    assert.ok(seo.includes("openGraph"));
    assert.ok(seo.includes("images"));
  });

  it("layout uses premium metadata factory", () => {
    const layout = readFileSync(join(appDir, "layout.tsx"), "utf-8");
    assert.ok(layout.includes("createMsSitePageMetadata"));
    assert.ok(layout.includes('createMsSitePageMetadata("studio")'));
  });

  it("exports sitemap, robots and web manifest", () => {
    assert.ok(readFileSync(join(appDir, "sitemap.ts"), "utf-8").includes("MS_SITE_SITEMAP_PATHS"));
    assert.ok(readFileSync(join(appDir, "robots.ts"), "utf-8").includes("sitemap"));
    assert.ok(existsSync(join(appDir, "manifest.ts")));
    assert.ok(readFileSync(join(appDir, "manifest.ts"), "utf-8").includes("Motans Studio") || readFileSync(join(appDir, "manifest.ts"), "utf-8").includes("MS_SITE_IDENTITY"));
  });

  it("ships favicon and app icons", () => {
    const root = join(__dirname, "..");
    assert.ok(existsSync(join(appDir, "favicon.ico")));
    assert.ok(existsSync(join(appDir, "icon.png")));
    assert.ok(existsSync(join(appDir, "apple-icon.png")));
    assert.ok(existsSync(join(root, "public", "icon-192.png")));
    assert.ok(existsSync(join(root, "public", "icon-512.png")));
    assert.ok(existsSync(join(root, "public", "apple-touch-icon.png")));
    assert.ok(existsSync(join(root, "public", "brand", "og-motans-studio.png")));
  });

  it("SEO foundation uses 1200x630 OG image and PNG icons", () => {
    const seo = readFileSync(join(libDir, "msSite1703SeoFoundation.ts"), "utf-8");
    assert.ok(seo.includes("/brand/og-motans-studio.png"));
    assert.ok(seo.includes("1200"));
    assert.ok(seo.includes("630"));
    assert.ok(seo.includes("/icon-192.png"));
    assert.ok(seo.includes("/icon-512.png"));
    assert.ok(seo.includes("/apple-touch-icon.png"));
  });
});
