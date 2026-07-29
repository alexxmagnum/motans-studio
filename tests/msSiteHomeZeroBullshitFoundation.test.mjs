import { describe, it } from "node:test";
import assert from "node:assert";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const appDir = join(__dirname, "..", "app");
const studioHomeDir = join(__dirname, "..", "components", "studio-home");
const libDir = join(__dirname, "..", "lib");

describe("MOTANS_STUDIO_HOME_V10 content SSOT", () => {
  it("keeps servicios copy in zero-bullshit foundation", () => {
    const foundation = readFileSync(join(libDir, "msSiteHomeZeroBullshitFoundation.ts"), "utf-8");
    assert.ok(foundation.includes("MOTANS_STUDIO_HOME_REBUILD_V2_ZERO_BULLSHIT"));
    assert.ok(foundation.includes("MS_SITE_HOME_V2_WHAT"));
    assert.ok(foundation.includes('anchorId: "servicios"'));
    assert.ok(foundation.includes('kicker: "Servicios"'));
    assert.ok(!foundation.includes("MS_SITE_HOME_V2_PROJECTS"));
  });

  it("home page composes current studio repositioning sections in order", () => {
    const home = readFileSync(join(appDir, "page.tsx"), "utf-8");
    assert.ok(home.includes("ms-page--studio-home"));
    assert.ok(home.includes("MsStudioHomeHero"));
    assert.ok(home.includes("MsStudioOfferSection"));
    assert.ok(home.includes("MsStudioFactorySection"));
    assert.ok(!home.includes("MsStudioHomeProcess"));
    assert.ok(home.includes("MsStudioHomeFinalCta"));
    assert.ok(!home.includes("MsStudioHomeContinuity"));
    assert.ok(!home.includes("MsStudioHomeMotanosLab"));
    assert.ok(!home.includes("MsHomePlans"));
    assert.ok(home.includes("MsHomeContact"));
    assert.ok(home.indexOf("MsStudioHomeHero") < home.indexOf("MsStudioOfferSection"));
    assert.ok(home.indexOf("MsStudioOfferSection") < home.indexOf("MsStudioFactorySection"));
    assert.ok(home.indexOf("MsStudioFactorySection") < home.indexOf("MsStudioHomeFinalCta"));
    assert.ok(home.indexOf("MsStudioHomeFinalCta") < home.indexOf("MsHomeContact"));
  });

  it("hero uses single H1 and CTA buttons", () => {
    const hero = readFileSync(join(studioHomeDir, "MsStudioHomeHero.tsx"), "utf-8");
    assert.ok(hero.includes("<h1"));
    assert.ok(hero.includes("msh-btn--cta"));
    assert.ok(hero.includes("msh-hero__actions"));
  });

  it("main nav uses simplified MS_SITE_NAV_ITEMS", () => {
    const nav = readFileSync(join(libDir, "msSite1701Foundation.ts"), "utf-8");
    const navLinks = readFileSync(join(__dirname, "..", "components", "MsSiteNavLinks.tsx"), "utf-8");
    assert.ok(nav.includes("/servicios"));
    assert.ok(nav.includes("/contacto"));
    assert.ok(nav.includes("/motanos"));
    assert.ok(!nav.includes("/#planes"));
    assert.ok(!nav.includes("/#proyectos"));
    assert.ok(!navLinks.includes("FASE_17_PUBLISHABLE_SECONDARY_NAV"));
  });

  it("SEO home metadata and JSON-LD remain intact", () => {
    const seo = readFileSync(join(libDir, "msSite1703SeoFoundation.ts"), "utf-8");
    assert.ok(seo.includes("SoftwareApplication"));
    assert.ok(seo.includes("MotanOS"));
    assert.ok(seo.includes("canonical"));
  });

  it("landing scroll targets V10 hero selector", () => {
    const scroll = readFileSync(join(libDir, "msSiteLandingScroll.ts"), "utf-8");
    assert.ok(scroll.includes(".msh-hero"));
  });
});
