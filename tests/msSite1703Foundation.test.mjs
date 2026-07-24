import { describe, it } from "node:test";
import assert from "node:assert";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const appDir = join(__dirname, "..", "app");
const componentsDir = join(__dirname, "..", "components");

const libDir = join(__dirname, "..", "lib");

describe("MS_SITE_17_03C emergency visual redesign", () => {
  it("uses design-system tokens in global CSS", () => {
    const css = readFileSync(join(appDir, "msSite1703Global.css"), "utf-8");
    assert.ok(css.includes("#2d9af4"));
    assert.ok(css.includes("#000000"));
    assert.ok(css.includes("#2d9af4"));
    assert.ok(css.includes("--ms-brand-gradient"));
    assert.ok(!css.includes("#f6f3ed"));
    assert.ok(!css.includes("ms-path-row"));
    assert.ok(!css.includes("ms-service-list"));
  });

  it("home is single landing with studio repositioning sections", () => {
    const home = readFileSync(join(appDir, "page.tsx"), "utf-8");
    const nav = readFileSync(join(__dirname, "..", "lib", "msSite1701Foundation.ts"), "utf-8");
    assert.ok(home.includes("ms-page--studio-home"));
    assert.ok(home.includes("MsStudioHomeHero"));
    assert.ok(home.includes("MsStudioCapabilities"));
    assert.ok(home.includes("MsStudioHomeProcess"));
    assert.ok(home.includes("MsStudioHomeFinalCta"));
    assert.ok(!home.includes("MsStudioHomeContinuity"));
    assert.ok(!home.includes("MsStudioHomeMotanosLab"));
    assert.ok(!home.includes("MsHomePlans"));
    assert.ok(!home.includes("MsHomeContact"));
    assert.ok(nav.includes("MS_SITE_PUBLIC_MOTANOS_VISIBLE = false"));
    assert.ok(nav.includes("/servicios"));
    assert.ok(nav.includes("/contacto"));
    assert.ok(nav.includes('label: "MotanOS"'));
    assert.ok(nav.includes("MS_SITE_PUBLIC_NAV_ITEMS"));
  });

  it("path cards component uses card grid", () => {
    const paths = readFileSync(join(componentsDir, "MsStudioPathCards.tsx"), "utf-8");
    const foundation = readFileSync(join(__dirname, "..", "lib", "msSite1703Foundation.ts"), "utf-8");
    assert.ok(paths.includes("MsHeroPathsHub"));
    assert.ok(foundation.includes("custom-saas"));
  });

  it("servicios and contacto are dedicated routes", () => {
    const serviciosPage = readFileSync(join(appDir, "servicios", "page.tsx"), "utf-8");
    const contactoPage = readFileSync(join(appDir, "contacto", "page.tsx"), "utf-8");
    assert.ok(serviciosPage.includes("MsStudioCapabilities"));
    assert.ok(contactoPage.includes("MsHomeContact"));
    assert.ok(!serviciosPage.includes("MsStudioHomeContinuity"));
    assert.ok(!serviciosPage.includes("MsServiceShowcase"));
  });

  it("motanos uses feature cards not pillar list", () => {
    const page = readFileSync(join(appDir, "motanos", "page.tsx"), "utf-8");
    assert.ok(page.includes("MsFeatureCards"));
    assert.ok(page.includes("MsMotanosAccountActions"));
    assert.ok(page.includes("msh-motanos-hub-actions"));
    assert.ok(page.includes("MsProductVerticalTeaser"));
    assert.ok(!page.includes("ms-pillars"));
  });

  it("hosteleria uses landing V1 not legacy feature cards", () => {
    const page = readFileSync(join(appDir, "motanos", "hosteleria", "page.tsx"), "utf-8");
    assert.ok(page.includes("MsHosteleriaLandingV1"));
    assert.ok(!page.includes("MsFeatureCards"));
    assert.ok(!page.includes("ms-ideas"));
  });

  it("contact uses premium home contact block", () => {
    const page = readFileSync(join(appDir, "contacto", "page.tsx"), "utf-8");
    const contact = readFileSync(join(componentsDir, "home", "MsHomeContact.tsx"), "utf-8");
    assert.ok(page.includes("MsHomeContact"));
    assert.ok(contact.includes('variant="premium"') || contact.includes("LeadForm"));
    assert.ok(contact.includes('submitVariant="studio-home"'));
  });

  it("footer is legal bar without hero copy", () => {
    const footer = readFileSync(join(componentsDir, "MsStudioFooter.tsx"), "utf-8");
    const shell = readFileSync(join(componentsDir, "MotansStudioSiteShell.tsx"), "utf-8");
    assert.ok(footer.includes("MS_SITE_FOOTER"));
    assert.ok(footer.includes("ms-studio-footer__legal"));
    assert.ok(!footer.includes("Creemos productos"));
    assert.ok(!footer.includes("MS_STUDIO_HOME_LOGO"));
    assert.ok(shell.includes("MsStudioFooter"));
  });

  it("brand mark supports webp MS and lockups", () => {
    const mark = readFileSync(join(componentsDir, "MotansStudioBrandMark.tsx"), "utf-8");
    assert.ok(mark.includes("logoMsWebp") || mark.includes("motans-ms.webp"));
    assert.ok(mark.includes("lockup-studio"));
    assert.ok(mark.includes("lockup-product"));
  });
});
