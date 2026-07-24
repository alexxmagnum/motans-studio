import { describe, it } from "node:test";
import assert from "node:assert";

import {
  HOSTELERIA_LANDING_CONTENT_MODEL_FOUNDATION,
  createHosteleriaLandingSafeSummary,
  validateHosteleriaLandingContentModel,
} from "../lib/hosteleriaLanding/hosteleriaLandingContentModelFoundation";

const REQUIRED_SECTION_IDS = [
  "hero",
  "problem",
  "solution",
  "integratedDigitalMenuQr",
  "singleSourceOfTruth",
  "publicMenuOutput",
  "conceptualDemoFlow",
  "includedToday",
  "notIncludedToday",
  "modularRoadmap",
  "optionalCustomerWeb",
  "safeCta",
  "safeFaq",
  "internalDisclaimer",
] as const;

describe("Hosteleria landing content model foundation", () => {
  it("keeps the default content model valid", () => {
    const result = validateHosteleriaLandingContentModel();

    assert.strictEqual(result.valid, true);
    assert.strictEqual(result.state, "passed");
    assert.deepStrictEqual(result.blockedReasons, []);
  });

  it("includes every required landing section", () => {
    const sectionIds = HOSTELERIA_LANDING_CONTENT_MODEL_FOUNDATION.sections.map(
      (section) => section.sectionId,
    );

    for (const sectionId of REQUIRED_SECTION_IDS) {
      assert.ok(sectionIds.includes(sectionId), `missing section ${sectionId}`);
    }
  });

  it("keeps hero variants safe and foundation-only", () => {
    const heroText = HOSTELERIA_LANDING_CONTENT_MODEL_FOUNDATION.heroVariants
      .map((variant) => `${variant.headline} ${variant.subheadline} ${variant.supportingCopy}`)
      .join(" ");

    assert.ok(heroText.includes("MotanOS"));
    assert.ok(heroText.includes("demo controlada") || heroText.includes("Demo controlada"));
    assert.doesNotMatch(heroText, /checkout listo|activar mi cuenta ahora|cliente real operativo/i);
  });

  it("keeps CTA safe and disconnected from account, checkout and real forms", () => {
    const ctaLabels = HOSTELERIA_LANDING_CONTENT_MODEL_FOUNDATION.cta.map((cta) => cta.label);

    assert.ok(ctaLabels.includes("Solicitar demo controlada"));
    assert.ok(ctaLabels.includes("Hablar con Motans Studio"));
    assert.ok(
      HOSTELERIA_LANDING_CONTENT_MODEL_FOUNDATION.cta.every(
        (cta) => !cta.createsAccount && !cta.startsCheckout && !cta.usesForm,
      ),
    );
  });

  it("keeps FAQ safe for Carta Digital, public-menu and customer web boundaries", () => {
    const faqText = HOSTELERIA_LANDING_CONTENT_MODEL_FOUNDATION.faq
      .map((faq) => `${faq.question} ${faq.answer}`)
      .join(" ");

    assert.ok(faqText.includes("no se vende como producto suelto"));
    assert.ok(faqText.includes("public-menu es salida publica/controlada"));
    assert.ok(faqText.includes("fuente real sigue siendo MotanOS"));
  });

  it("keeps non-production, no-data and no-checkout capability flags", () => {
    const capabilities = HOSTELERIA_LANDING_CONTENT_MODEL_FOUNDATION.capabilities;

    assert.strictEqual(capabilities.isProductiveSite, false);
    assert.strictEqual(capabilities.createsRoute, false);
    assert.strictEqual(capabilities.createsPage, false);
    assert.strictEqual(capabilities.usesRealData, false);
    assert.strictEqual(capabilities.usesApiClient, false);
    assert.strictEqual(capabilities.usesContactForm, false);
    assert.strictEqual(capabilities.activatesAccount, false);
    assert.strictEqual(capabilities.allowsCheckout, false);
    assert.strictEqual(capabilities.allowsPayments, false);
  });

  it("marks public-menu as output only and customer web as not menu source", () => {
    const capabilities = HOSTELERIA_LANDING_CONTENT_MODEL_FOUNDATION.capabilities;

    assert.strictEqual(capabilities.publicMenuIsOutputOnly, true);
    assert.strictEqual(capabilities.customerWebIsMenuSource, false);
    assert.strictEqual(capabilities.sellsStandaloneDigitalMenu, false);
  });

  it("blocks future modules, payments, execute and live-read in capabilities", () => {
    const capabilities = HOSTELERIA_LANDING_CONTENT_MODEL_FOUNDATION.capabilities;

    assert.strictEqual(capabilities.includesTakeaway, false);
    assert.strictEqual(capabilities.includesDelivery, false);
    assert.strictEqual(capabilities.includesReservationsLive, false);
    assert.strictEqual(capabilities.opensExecute, false);
    assert.strictEqual(capabilities.usesLiveRead, false);
  });

  it("fails with Takeaway, Delivery, Reservas, payments, execute or live-read claims", () => {
    const unsafeClaims = [
      "Takeaway incluido",
      "Delivery incluido",
      "Reservas listas",
      "Pagos listos",
      "execute",
      "live-read",
    ];

    for (const unsafeClaim of unsafeClaims) {
      const result = validateHosteleriaLandingContentModel(
        HOSTELERIA_LANDING_CONTENT_MODEL_FOUNDATION,
        [unsafeClaim],
      );

      assert.strictEqual(result.valid, false, `claim should fail: ${unsafeClaim}`);
      assert.strictEqual(result.state, "failed");
    }
  });

  it("fails with account creation, payment, checkout or real publishing claims", () => {
    const unsafeClaims = [
      "Activar mi cuenta ahora",
      "Empieza a cobrar hoy",
      "Checkout listo",
      "Publica tu carta real ahora",
      "Cliente real operativo",
    ];

    for (const unsafeClaim of unsafeClaims) {
      const result = validateHosteleriaLandingContentModel(
        HOSTELERIA_LANDING_CONTENT_MODEL_FOUNDATION,
        [unsafeClaim],
      );

      assert.strictEqual(result.valid, false, `claim should fail: ${unsafeClaim}`);
    }
  });

  it("fails with service_role, env or secrets claims", () => {
    const unsafeClaims = ["service_role", "SUPABASE_SERVICE_ROLE_KEY", ".env", "secret"];

    for (const unsafeClaim of unsafeClaims) {
      const result = validateHosteleriaLandingContentModel(
        HOSTELERIA_LANDING_CONTENT_MODEL_FOUNDATION,
        [unsafeClaim],
      );

      assert.strictEqual(result.valid, false, `claim should fail: ${unsafeClaim}`);
    }
  });

  it("renders a safe textual summary", () => {
    const summary = createHosteleriaLandingSafeSummary();
    const result = validateHosteleriaLandingContentModel(
      HOSTELERIA_LANDING_CONTENT_MODEL_FOUNDATION,
      [summary],
    );

    assert.ok(summary.includes("content model foundation"));
    assert.ok(summary.includes("no productive site"));
    assert.ok(summary.includes("Carta Digital/QR remains inside MotanOS Hosteleria"));
    assert.strictEqual(result.valid, true);
  });
});
