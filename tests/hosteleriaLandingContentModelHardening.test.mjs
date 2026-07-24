import { describe, it, before } from "node:test";
import assert from "node:assert";
import { readFileSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";
import ts from "typescript";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const foundationPath = join(
  __dirname,
  "..",
  "lib",
  "hosteleriaLanding",
  "hosteleriaLandingContentModelFoundation.ts",
);
const hardeningPath = join(
  __dirname,
  "..",
  "lib",
  "hosteleriaLanding",
  "hosteleriaLandingContentModelHardening.ts",
);

let hardeningModule;

const transpileTypescript = (filePath) => {
  const source = readFileSync(filePath, "utf-8");
  return ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ES2022,
      target: ts.ScriptTarget.ES2022,
      strict: true,
    },
    fileName: pathToFileURL(filePath).href,
  }).outputText;
};

const toDataModuleUrl = (source) =>
  `data:text/javascript;base64,${Buffer.from(source, "utf-8").toString("base64")}`;

const loadHardeningModule = async () => {
  const foundationUrl = toDataModuleUrl(transpileTypescript(foundationPath));
  const hardeningSource = transpileTypescript(hardeningPath).replace(
    /from "\.\/hosteleriaLandingContentModelFoundation";/g,
    `from "${foundationUrl}";`,
  );

  return import(toDataModuleUrl(hardeningSource));
};

describe("Hosteleria landing content model hardening", () => {
  before(async () => {
    hardeningModule = await loadHardeningModule();
  });

  it("passes with the default 23.19 content model and closed implementation boundary", () => {
    const result = hardeningModule.validateHosteleriaLandingContentModelHardening();

    assert.strictEqual(result.valid, true);
    assert.strictEqual(result.state, "passed");
    assert.deepStrictEqual(result.blockedReasons, []);
  });

  it("fails with activation CTA drift", () => {
    const result = hardeningModule.validateHosteleriaLandingContentModelHardening({
      attempt: {
        proposedCtaLabels: ["Activar mi cuenta ahora"],
      },
    });

    assert.strictEqual(result.valid, false);
  });

  it("fails with checkout, payment or charge claims", () => {
    const unsafeCopies = ["Checkout listo", "Empieza a cobrar hoy", "Pagos listos"];

    for (const unsafeCopy of unsafeCopies) {
      const result = hardeningModule.validateHosteleriaLandingContentModelHardening({
        attempt: {
          additionalPublicCopy: [unsafeCopy],
        },
      });

      assert.strictEqual(result.valid, false, `copy should fail: ${unsafeCopy}`);
    }
  });

  it("fails with hardcoded pricing not approved by controlled source", () => {
    const result = hardeningModule.validateHosteleriaLandingContentModelHardening({
      attempt: {
        proposedPricingCopy: ["Plan Pro desde 49€ al mes"],
      },
    });

    assert.strictEqual(result.valid, false);
  });

  it("fails with apiClient or contact form usage", () => {
    const apiClientResult = hardeningModule.validateHosteleriaLandingContentModelHardening({
      attempt: {
        usesApiClient: true,
      },
    });
    const contactFormResult = hardeningModule.validateHosteleriaLandingContentModelHardening({
      attempt: {
        usesContactForm: true,
      },
    });
    const copyResult = hardeningModule.validateHosteleriaLandingContentModelHardening({
      attempt: {
        additionalPublicCopy: ["Conectar apiClient y contactForm real"],
      },
    });

    assert.strictEqual(apiClientResult.valid, false);
    assert.strictEqual(contactFormResult.valid, false);
    assert.strictEqual(copyResult.valid, false);
  });

  it("fails with Takeaway, Delivery, Reservas, execute or live-read drift", () => {
    const unsafeCopies = [
      "Takeaway incluido",
      "Delivery incluido",
      "Reservas listas",
      "execute",
      "live-read",
    ];

    for (const unsafeCopy of unsafeCopies) {
      const result = hardeningModule.validateHosteleriaLandingContentModelHardening({
        attempt: {
          additionalPublicCopy: [unsafeCopy],
        },
      });

      assert.strictEqual(result.valid, false, `copy should fail: ${unsafeCopy}`);
    }
  });

  it("fails with standalone Carta Digital copy", () => {
    const result = hardeningModule.validateHosteleriaLandingContentModelHardening({
      attempt: {
        additionalPublicCopy: ["Te vendemos una carta QR"],
      },
    });

    assert.strictEqual(result.valid, false);
  });

  it("fails with customer web as menu source copy", () => {
    const result = hardeningModule.validateHosteleriaLandingContentModelHardening({
      attempt: {
        additionalPublicCopy: ["Tu web sera la fuente real de carta"],
      },
    });

    assert.strictEqual(result.valid, false);
  });

  it("fails with service_role, env or secrets copy", () => {
    const unsafeCopies = ["service_role", "SUPABASE_SERVICE_ROLE_KEY", ".env", "secret"];

    for (const unsafeCopy of unsafeCopies) {
      const result = hardeningModule.validateHosteleriaLandingContentModelHardening({
        attempt: {
          additionalPublicCopy: [unsafeCopy],
        },
      });

      assert.strictEqual(result.valid, false, `copy should fail: ${unsafeCopy}`);
    }
  });

  it("keeps implementation boundary closed", () => {
    const result = hardeningModule.validateHosteleriaLandingContentModelHardening();
    const boundary = result.implementationBoundary;

    assert.deepStrictEqual(boundary, hardeningModule.HOSTELERIA_LANDING_IMPLEMENTATION_BOUNDARY);
    assert.strictEqual(boundary.canBeUsedForFutureUi, false);
    assert.strictEqual(boundary.canBeUsedForFuturePreviewAdapter, true);
    assert.strictEqual(boundary.requiresExplicitImplementationCharter, true);
    assert.strictEqual(boundary.requiresUxReview, true);
    assert.strictEqual(boundary.requiresSecurityReview, true);
    assert.strictEqual(boundary.requiresCopyApproval, true);
    assert.strictEqual(boundary.allowsRealForms, false);
    assert.strictEqual(boundary.allowsApiClient, false);
    assert.strictEqual(boundary.allowsRealActivation, false);
  });
});
