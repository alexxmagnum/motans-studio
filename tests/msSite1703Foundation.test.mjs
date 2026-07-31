import { describe, it } from "node:test";
import assert from "node:assert";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const appDir = join(__dirname, "..", "app");
const componentsDir = join(__dirname, "..", "components");

describe("MS_SITE_17_03C emergency visual redesign", () => {
  it("uses design-system tokens in global CSS", () => {
    const css = readFileSync(join(appDir, "msSite1703Global.css"), "utf-8");
    assert.ok(css.includes("#2d9af4"));
    assert.ok(css.includes("#000000"));
    assert.ok(css.includes("--ms-brand-gradient"));
    assert.ok(!css.includes("#f6f3ed"));
    assert.ok(!css.includes("ms-path-row"));
    assert.ok(!css.includes("ms-service-list"));
  });

  it("home is single landing with studio editorial sections", () => {
    const home = readFileSync(join(appDir, "page.tsx"), "utf-8");
    const nav = readFileSync(join(__dirname, "..", "lib", "msSite1701Foundation.ts"), "utf-8");
    assert.ok(home.includes("ms-page--studio-home"));
    assert.ok(home.includes("MsStudioHomeHero"));
    assert.ok(home.includes("MsStudioOfferSection"));
    assert.ok(home.includes("MsStudioFactorySection"));
    assert.ok(!home.includes("MsStudioHomeProcess"));
    assert.ok(!home.includes("MsStudioHomeFinalCta"));
    assert.ok(home.includes("MsHomeContact"));
    assert.ok(!home.includes("MsStudioLandingSectionSlot"));
    assert.ok(!home.includes("MsStudioHomeContinuity"));
    assert.ok(!home.includes("MsStudioHomeMotanosLab"));
    assert.ok(!home.includes("MsHomePlans"));
    assert.ok(nav.includes("MS_SITE_PUBLIC_MOTANOS_VISIBLE = false"));
    assert.ok(nav.includes("MS_SITE_PUBLIC_NAV_ITEMS"));
    assert.ok(!nav.includes('href: "/#faq"'));
  });

  it("path cards component uses card grid", () => {
    const paths = readFileSync(join(componentsDir, "MsStudioPathCards.tsx"), "utf-8");
    const foundation = readFileSync(join(__dirname, "..", "lib", "msSite1703Foundation.ts"), "utf-8");
    assert.ok(paths.includes("MsHeroPathsHub"));
    assert.ok(foundation.includes("custom-saas"));
  });

  it("servicios and contacto are redirect routes to landing anchors", () => {
    const serviciosPage = readFileSync(join(appDir, "servicios", "page.tsx"), "utf-8");
    const contactoPage = readFileSync(join(appDir, "contacto", "page.tsx"), "utf-8");
    assert.ok(serviciosPage.includes("servicios") || serviciosPage.includes("replace"));
    assert.ok(contactoPage.includes("contacto") || contactoPage.includes("replace"));
  });

  it("motanos public route is frozen to home redirect", () => {
    const page = readFileSync(join(appDir, "motanos", "page.tsx"), "utf-8");
    assert.ok(page.includes("location.replace") || page.includes('"/\"') || page.includes("'/'"));
  });

  it("hosteleria public route is frozen to home redirect", () => {
    const page = readFileSync(join(appDir, "motanos", "hosteleria", "page.tsx"), "utf-8");
    assert.ok(page.includes("location.replace") || page.includes('"/\"') || page.includes("'/'"));
  });

  it("contact uses premium home contact block", () => {
    const contact = readFileSync(join(componentsDir, "home", "MsHomeContact.tsx"), "utf-8");
    assert.ok(contact.includes("LeadForm"));
    assert.ok(contact.includes('variant="premium"') || contact.includes("premium"));
  });

  it("footer is premium brand closure with legal links", () => {
    const footer = readFileSync(join(componentsDir, "MsStudioFooter.tsx"), "utf-8");
    assert.ok(footer.includes("ms-studio-footer"));
    assert.ok(footer.includes("MS_SITE_FOOTER_LEGAL") || footer.includes("legal"));
    assert.ok(footer.includes("ms-studio-footer__rule") || footer.includes("ms-studio-footer__copy"));
    assert.ok(!footer.includes('href="#"'));
    assert.ok(!footer.includes("MS_SITE_FOOTER_NAV"));
  });

  it("brand mark supports webp MS and lockups", () => {
    const branding = readFileSync(
      join(__dirname, "..", "packages", "branding", "src", "motansBrandAssets.ts"),
      "utf-8",
    );
    assert.ok(branding.includes("markMsWebp"));
    assert.ok(branding.includes("markMsPng"));
  });
});
