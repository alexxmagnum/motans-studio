import { describe, it, before } from "node:test";
import assert from "node:assert";
import { readFileSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";
import ts from "typescript";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const modelPath = join(
  __dirname,
  "..",
  "lib",
  "hosteleriaLanding",
  "hosteleriaLandingContentModelFoundation.ts",
);

let foundationModule;

const loadTypescriptModule = async (filePath) => {
  const source = readFileSync(filePath, "utf-8");
  const transpiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ES2022,
      target: ts.ScriptTarget.ES2022,
      strict: true,
    },
    fileName: pathToFileURL(filePath).href,
  });

  const encoded = Buffer.from(transpiled.outputText, "utf-8").toString("base64");
  return import(`data:text/javascript;base64,${encoded}`);
};

const requiredSectionIds = [
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
];

describe("Hosteleria landing content model foundation", () => {
  before(async () => {
    foundationModule = await loadTypescriptModule(modelPath);
  });

  it("keeps the default content model valid", () => {
    const result = foundationModule.validateHosteleriaLandingContentModel();

    assert.strictEqual(result.valid, true);
    assert.strictEqual(result.state, "passed");
    assert.deepStrictEqual(result.blockedReasons, []);
  });

  it("includes every required landing section", () => {
    const sectionIds = foundationModule.HOSTELERIA_LANDING_CONTENT_MODEL_FOUNDATION.sections.map(
      (section) => section.sectionId,
    );

    for (const sectionId of requiredSectionIds) {
      assert.ok(sectionIds.includes(sectionId), `missing section ${sectionId}`);
    }
  });

  it("keeps hero variants safe and foundation-only", () => {
    const heroText = foundationModule.HOSTELERIA_LANDING_CONTENT_MODEL_FOUNDATION.heroVariants
      .map((variant) => `${variant.headline} ${variant.subheadline} ${variant.supportingCopy}`)
      .join(" ");

    assert.ok(heroText.includes("MotanOS"));
    assert.ok(heroText.includes("demo controlada") || heroText.includes("Demo controlada"));
    assert.doesNotMatch(heroText, /checkout listo|activar mi cuenta ahora|cliente real operativo/i);
  });

  it("keeps CTA safe and disconnected from account, checkout and real forms", () => {
    const cta = foundationModule.HOSTELERIA_LANDING_CONTENT_MODEL_FOUNDATION.cta;
    const ctaLabels = cta.map((entry) => entry.label);

    assert.ok(ctaLabels.includes("Solicitar demo controlada"));
    assert.ok(ctaLabels.includes("Hablar con Motans Studio"));
    assert.ok(
      cta.every((entry) => !entry.createsAccount && !entry.startsCheckout && !entry.usesForm),
    );
  });

  it("keeps FAQ safe for Carta Digital, public-menu and customer web boundaries", () => {
    const faqText = foundationModule.HOSTELERIA_LANDING_CONTENT_MODEL_FOUNDATION.faq
      .map((faq) => `${faq.question} ${faq.answer}`)
      .join(" ");

    assert.ok(faqText.includes("no se vende como producto suelto"));
    assert.ok(faqText.includes("public-menu es salida publica/controlada"));
    assert.ok(faqText.includes("fuente real sigue siendo MotanOS"));
  });

  it("keeps non-production, no-data and no-checkout capability flags", () => {
    const capabilities = foundationModule.HOSTELERIA_LANDING_CONTENT_MODEL_FOUNDATION.capabilities;

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
    const capabilities = foundationModule.HOSTELERIA_LANDING_CONTENT_MODEL_FOUNDATION.capabilities;

    assert.strictEqual(capabilities.publicMenuIsOutputOnly, true);
    assert.strictEqual(capabilities.customerWebIsMenuSource, false);
    assert.strictEqual(capabilities.sellsStandaloneDigitalMenu, false);
  });

  it("blocks future modules, payments, execute and live-read in capabilities", () => {
    const capabilities = foundationModule.HOSTELERIA_LANDING_CONTENT_MODEL_FOUNDATION.capabilities;

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
      const result = foundationModule.validateHosteleriaLandingContentModel(
        foundationModule.HOSTELERIA_LANDING_CONTENT_MODEL_FOUNDATION,
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
      const result = foundationModule.validateHosteleriaLandingContentModel(
        foundationModule.HOSTELERIA_LANDING_CONTENT_MODEL_FOUNDATION,
        [unsafeClaim],
      );

      assert.strictEqual(result.valid, false, `claim should fail: ${unsafeClaim}`);
    }
  });

  it("fails with service_role, env or secrets claims", () => {
    const unsafeClaims = ["service_role", "SUPABASE_SERVICE_ROLE_KEY", ".env", "secret"];

    for (const unsafeClaim of unsafeClaims) {
      const result = foundationModule.validateHosteleriaLandingContentModel(
        foundationModule.HOSTELERIA_LANDING_CONTENT_MODEL_FOUNDATION,
        [unsafeClaim],
      );

      assert.strictEqual(result.valid, false, `claim should fail: ${unsafeClaim}`);
    }
  });

  it("renders a safe textual summary", () => {
    const summary = foundationModule.createHosteleriaLandingSafeSummary();
    const result = foundationModule.validateHosteleriaLandingContentModel(
      foundationModule.HOSTELERIA_LANDING_CONTENT_MODEL_FOUNDATION,
      [summary],
    );

    assert.ok(summary.includes("content model foundation"));
    assert.ok(summary.includes("no productive site"));
    assert.ok(summary.includes("Carta Digital/QR remains inside MotanOS Hosteleria"));
    assert.strictEqual(result.valid, true);
  });
});
