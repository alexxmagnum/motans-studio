import { describe, it } from "node:test";
import assert from "node:assert";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const appDir = join(__dirname, "..", "app");
const componentsDir = join(__dirname, "..", "components", "home");
const libDir = join(__dirname, "..", "lib");

describe("MOTANS_STUDIO_PUBLIC_SITE_REBUILD_CORRECTION_V1", () => {
  it("exposes seven home sections in foundation SSOT", () => {
    const foundation = readFileSync(join(libDir, "msSiteHomeSuperPremiumFoundation.ts"), "utf-8");
    assert.ok(foundation.includes("MOTANS_STUDIO_PUBLIC_SITE_REBUILD_CORRECTION_V1"));
    assert.ok(foundation.includes("MS_SITE_HOME_HERO"));
    assert.ok(foundation.includes("MS_SITE_HOME_CAPABILITIES"));
    assert.ok(foundation.includes("MS_SITE_HOME_MOTANOS"));
    assert.ok(foundation.includes("MS_SITE_HOME_VERTICALS"));
    assert.ok(foundation.includes("MS_SITE_HOME_ENGAGEMENT"));
    assert.ok(foundation.includes("MS_SITE_HOME_EVIDENCE"));
    assert.ok(foundation.includes("MS_SITE_HOME_FINAL_CTA"));
    assert.ok(foundation.includes("MOTANS_STUDIO_PUBLIC_SITE_REBUILD_CORRECTION_V1"));
    assert.ok(foundation.includes("Creamos sistemas digitales para empresas que quieren operar mejor."));
  });

  it("home page composes super premium sections in order", () => {
    const home = readFileSync(join(appDir, "page.tsx"), "utf-8");
    assert.ok(home.includes("ms-page--super-premium"));
    assert.ok(home.includes("MsHomeHero"));
    assert.ok(home.includes("MsHomeCapabilities"));
    assert.ok(home.includes("MsHomeMotanos"));
    assert.ok(home.includes("MsHomeVerticals"));
    assert.ok(home.includes("MsHomeEngagementPaths"));
    assert.ok(home.includes("MsHomeEvidence"));
    assert.ok(home.includes("MsHomeFinalCta"));
    assert.ok(home.includes("MsHomeHosteleriaDepth"));
    assert.ok(home.includes("MsHomeContact"));
    assert.ok(!home.includes("MsHeroPathsHub"));
    assert.ok(!home.includes("MsHeroHosteleriaJourneyPanel"));
  });

  it("hero uses single H1 and premium showcase", () => {
    const hero = readFileSync(join(componentsDir, "MsHomeHero.tsx"), "utf-8");
    const foundation = readFileSync(join(libDir, "msSiteHomeSuperPremiumFoundation.ts"), "utf-8");
    assert.ok(hero.includes("<h1"));
    assert.ok(hero.includes("ms-home-hero__stage"));
    assert.ok(foundation.includes("Iniciar proyecto"));
    assert.ok(foundation.includes("Ver MotanOS"));
  });

  it("engagement paths moved after product context", () => {
    const home = readFileSync(join(appDir, "page.tsx"), "utf-8");
    const motanosIndex = home.indexOf("<MsHomeMotanos");
    const engagementIndex = home.indexOf("<MsHomeEngagementPaths");
    assert.ok(motanosIndex >= 0 && engagementIndex > motanosIndex);
  });

  it("SEO home metadata and JSON-LD include MotanOS application", () => {
    const seo = readFileSync(join(libDir, "msSite1703SeoFoundation.ts"), "utf-8");
    assert.ok(seo.includes("desarrollo web premium"));
    assert.ok(seo.includes("SoftwareApplication"));
    assert.ok(seo.includes("MotanOS"));
    assert.ok(seo.includes("canonical"));
  });

  it("landing scroll targets new hero frame selector", () => {
    const scroll = readFileSync(join(libDir, "msSiteLandingScroll.ts"), "utf-8");
    assert.ok(scroll.includes(".ms-home-hero--impact"));
  });
});
