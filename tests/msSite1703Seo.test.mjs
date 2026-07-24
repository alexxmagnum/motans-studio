import { describe, it } from "node:test";
import assert from "node:assert";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const appDir = join(__dirname, "..", "app");
const libDir = join(__dirname, "..", "lib");

describe("MS_SITE_17_03C premium SEO", () => {
  it("hero H1 includes Motans Studio brand copy", () => {
    const home = readFileSync(join(appDir, "page.tsx"), "utf-8");
    const copy = readFileSync(join(libDir, "msStudioHomeFoundation.ts"), "utf-8");
    assert.ok(copy.includes("MOTANS_STUDIO_HOME_PREMIUM_HERO_CONTINUITY_V1"));
    assert.ok(copy.includes("MOTANS_STUDIO_PREMIUM_HERO_SPLIT_V2"));
    assert.ok(copy.includes("productos digitales"));
    assert.ok(copy.includes("Diseñamos y"));
    assert.ok(copy.includes('accent: "crecer"'));
    assert.ok(home.includes("MsStudioHomeHero"));
    assert.ok(home.includes("MsSiteStructuredData"));
  });

  it("SEO foundation has metadata helper and JSON-LD", () => {
    const seo = readFileSync(join(libDir, "msSite1703SeoFoundation.ts"), "utf-8");
    assert.ok(seo.includes("createMsSitePageMetadata"));
    assert.ok(seo.includes("Organization"));
    assert.ok(seo.includes("canonical"));
    assert.ok(seo.includes("Motans Studio"));
  });

  it("layout uses premium metadata factory", () => {
    const layout = readFileSync(join(appDir, "layout.tsx"), "utf-8");
    assert.ok(layout.includes("createMsSitePageMetadata"));
    assert.ok(layout.includes("openGraph") === false);
    assert.ok(layout.includes('createMsSitePageMetadata("studio")'));
  });

  it("exports sitemap and robots routes", () => {
    assert.ok(readFileSync(join(appDir, "sitemap.ts"), "utf-8").includes("MS_SITE_SITEMAP_PATHS"));
    assert.ok(readFileSync(join(appDir, "robots.ts"), "utf-8").includes("sitemap"));
  });
});
