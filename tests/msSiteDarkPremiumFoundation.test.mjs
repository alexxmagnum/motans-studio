import { describe, it } from "node:test";
import assert from "node:assert";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const appDir = join(__dirname, "..", "app");
const studioHomeDir = join(__dirname, "..", "components", "studio-home");
const libDir = join(__dirname, "..", "lib");

describe("MOTANS_STUDIO_HOME_PREMIUM_HERO_CONTINUITY_V1 (dark premium shell)", () => {
  it("exposes studio home split hero foundation copy", () => {
    const foundation = readFileSync(join(libDir, "msStudioHomeFoundation.ts"), "utf-8");
    assert.ok(foundation.includes("MOTANS_STUDIO_HOME_PREMIUM_HERO_CONTINUITY_V1"));
    assert.ok(foundation.includes("MOTANS_STUDIO_PREMIUM_HERO_SPLIT_V2"));
    assert.ok(foundation.includes("productos digitales"));
    assert.ok(foundation.includes("Conocer Motans Studio"));
    assert.ok(foundation.includes("motans-hero-m-sculpture-panel.png"));
    assert.ok(!foundation.includes("LA TERRAZA"));
    assert.ok(!foundation.includes("motans-reference-mockup"));
  });

  it("home page composes studio repositioning sections", () => {
    const home = readFileSync(join(appDir, "page.tsx"), "utf-8");
    const plans = readFileSync(join(__dirname, "..", "components", "home", "MsHomePlans.tsx"), "utf-8");
    assert.ok(home.includes("ms-page--studio-home"));
    assert.ok(home.includes("MsStudioHomeHero"));
    assert.ok(home.includes("MsStudioOfferSection"));
    assert.ok(home.includes("MsStudioFactorySection"));
    assert.ok(!home.includes("MsStudioHomeProcess"));
    assert.ok(home.includes("MsStudioHomeFinalCta"));
    assert.ok(!home.includes("MsStudioHomeContinuity"));
    assert.ok(!home.includes("MsStudioHomeMotanosLab"));
    assert.ok(!home.includes("MsHomePlans"));
    assert.ok(plans.includes("MsMotanosPlansSection"));
    assert.ok(home.includes("MsHomeContact"));
  });

  it("hero uses split layout with sculpture panel on the right", () => {
    const hero = readFileSync(join(studioHomeDir, "MsStudioHomeHero.tsx"), "utf-8");
    const sculpture = readFileSync(join(studioHomeDir, "MsStudioHeroSculpture.tsx"), "utf-8");
    assert.ok(hero.includes("<h1"));
    assert.ok(hero.includes("msh-hero__hero-video"));
    assert.ok(!hero.includes("MsStudioHeroSculpture"));
    assert.ok(hero.includes("msh-hero__viewport"));
    assert.ok(hero.includes("msh-hero__visual"));
    assert.ok(hero.includes("msh-btn--cta"));
    assert.ok(sculpture.includes("msh-hero__visual-img"));
    assert.ok(
      readFileSync(join(libDir, "msStudioHomeFoundation.ts"), "utf-8").includes(
        "motans-hero-m-sculpture-panel.png",
      ),
    );
    assert.ok(!sculpture.includes("motans-reference-mockup"));
  });

  it("main nav matches simplified studio labels", () => {
    const nav = readFileSync(join(libDir, "msSite1701Foundation.ts"), "utf-8");
    assert.ok(nav.includes('label: "MotanOS"'));
    assert.ok(nav.includes("MS_SITE_PUBLIC_MOTANOS_VISIBLE = false"));
    assert.ok(nav.includes("MS_SITE_PUBLIC_NAV_ITEMS"));
    assert.ok(nav.includes("Qué hacemos"));
    assert.ok(nav.includes("Contacto"));
    assert.ok(!nav.includes("/#planes"));
    assert.ok(!nav.includes("MS_SITE_ROUTES.solicitud"));
    assert.ok(!nav.includes("Tecnologías"));
    assert.ok(!nav.includes("Nosotros"));
  });

  it("motanos page exposes planes and assisted setup actions", () => {
    const motanos = readFileSync(join(appDir, "motanos", "page.tsx"), "utf-8");
    assert.ok(motanos.includes("msh-motanos-hub-actions"));
    assert.ok(motanos.includes("MS_SITE_ROUTES.planes"));
    assert.ok(motanos.includes("MS_SITE_ROUTES.solicitud"));
  });

  it("shell uses dark premium class and Hablemos CTA", () => {
    const shell = readFileSync(join(__dirname, "..", "components", "MotansStudioSiteShell.tsx"), "utf-8");
    const foundation = readFileSync(join(libDir, "msStudioHomeFoundation.ts"), "utf-8");
    assert.ok(shell.includes("ms-site--dark-premium"));
    assert.ok(shell.includes("MS_STUDIO_HOME_HEADER_CTA"));
    assert.ok(foundation.includes("Hablemos"));
    assert.ok(shell.includes("MS_STUDIO_HOME_LOGO"));
  });

  it("landing scroll targets V10 hero selector", () => {
    const scroll = readFileSync(join(libDir, "msSiteLandingScroll.ts"), "utf-8");
    assert.ok(scroll.includes(".msh-hero"));
  });
});
