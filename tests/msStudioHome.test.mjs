import { describe, it } from "node:test";
import assert from "node:assert";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const componentsDir = join(__dirname, "..", "components", "studio-home");
const libDir = join(__dirname, "..", "lib");

describe("MOTANS_STUDIO_HOME_PREMIUM_HERO_CONTINUITY_V1", () => {
  it("exposes studio home foundation with strategic repositioning copy", () => {
    const foundation = readFileSync(join(libDir, "msStudioHomeFoundation.ts"), "utf-8");
    assert.ok(foundation.includes("MOTANS_STUDIO_HOME_PREMIUM_HERO_CONTINUITY_V1"));
    assert.ok(foundation.includes("MOTANS_STUDIO_HOME_STRATEGIC_REPOSITIONING_V1"));
    assert.ok(foundation.includes("MOTANS_STUDIO_PREMIUM_HERO_SPLIT_V2"));
    assert.ok(foundation.includes("secondaryCtaStudio"));
    assert.ok(foundation.includes("Creamos herramientas digitales"));
    assert.ok(foundation.includes("que simplifican el"));
    assert.ok(foundation.includes('accent: "trabajo"'));
    assert.ok(foundation.includes("MS_STUDIO_HOME_MOTANOS_PUBLIC_VISIBLE"));
  });

  it("hero uses experience video splash layout", () => {
    const hero = readFileSync(join(componentsDir, "MsStudioHomeHero.tsx"), "utf-8");
    assert.ok(hero.includes("msh-hero__hero-video"));
    assert.ok(hero.includes("msh-hero--experience"));
    assert.ok(hero.includes("MS_STUDIO_HOME_MOTANOS_PUBLIC_VISIBLE"));
  });

  it("home mounts studio narrative without public MotanOS surfaces", () => {
    const home = readFileSync(join(__dirname, "..", "app", "page.tsx"), "utf-8");
    const nav = readFileSync(join(libDir, "msSite1701Foundation.ts"), "utf-8");
    assert.ok(home.includes("MsStudioHomeHero"));
    assert.ok(home.includes("MsStudioOfferSection"));
    assert.ok(home.includes("MsStudioFactorySection"));
    assert.ok(!home.includes("MsStudioHomeProcess"));
    assert.ok(home.includes("MsStudioHomeFinalCta"));
    assert.ok(home.includes("MsHomeContact"));
    assert.ok(!home.includes("MsStudioLandingSectionSlot"));
    assert.ok(!home.includes("MsStudioHomeContinuity"));
    assert.ok(!home.includes("MsStudioHomeMotanosLab"));
    assert.ok(!home.includes("MsHomePlans"));
    assert.ok(nav.includes("MS_SITE_PUBLIC_MOTANOS_VISIBLE = false"));
    assert.ok(nav.includes("MS_SITE_PUBLIC_NAV_ITEMS"));
    assert.ok(!nav.includes('href: "/#faq"'));
  });

  it("servicios and contacto routes redirect to landing anchors", () => {
    const serviciosPage = readFileSync(join(__dirname, "..", "app", "servicios", "page.tsx"), "utf-8");
    const contactoPage = readFileSync(join(__dirname, "..", "app", "contacto", "page.tsx"), "utf-8");
    assert.ok(serviciosPage.includes("servicios") || serviciosPage.includes("location"));
    assert.ok(contactoPage.includes("contacto") || contactoPage.includes("location"));
  });
});
