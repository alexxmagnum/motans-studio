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
const adapterPath = join(
  __dirname,
  "..",
  "lib",
  "hosteleriaLanding",
  "hosteleriaLandingPreviewAdapterFoundation.ts",
);

let adapterModule;
let foundationModule;
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

const loadPreviewAdapterModule = async () => {
  const foundationUrl = toDataModuleUrl(transpileTypescript(foundationPath));
  const hardeningSource = transpileTypescript(hardeningPath).replace(
    /from "\.\/hosteleriaLandingContentModelFoundation";/g,
    `from "${foundationUrl}";`,
  );
  const hardeningUrl = toDataModuleUrl(hardeningSource);
  const adapterSource = transpileTypescript(adapterPath)
    .replace(/from "\.\/hosteleriaLandingContentModelFoundation";/g, `from "${foundationUrl}";`)
    .replace(/from "\.\/hosteleriaLandingContentModelHardening";/g, `from "${hardeningUrl}";`);

  const [foundation, hardening, adapter] = await Promise.all([
    import(foundationUrl),
    import(hardeningUrl),
    import(toDataModuleUrl(adapterSource)),
  ]);

  return { foundation, hardening, adapter };
};

const unsafeDescriptor = (patch = {}) => ({
  ...adapterModule.createHosteleriaLandingPreviewDescriptor(),
  ...patch,
});

describe("Hosteleria landing preview adapter foundation", () => {
  before(async () => {
    const modules = await loadPreviewAdapterModule();
    foundationModule = modules.foundation;
    hardeningModule = modules.hardening;
    adapterModule = modules.adapter;
  });

  it("creates a valid default preview descriptor from the 23.19 content model", () => {
    const descriptor = adapterModule.createHosteleriaLandingPreviewDescriptor();
    const result = adapterModule.validateHosteleriaLandingPreviewDescriptor(descriptor);

    assert.strictEqual(result.valid, true);
    assert.strictEqual(result.state, "passed");
    assert.deepStrictEqual(result.blockedReasons, []);
    assert.strictEqual(
      descriptor.sourceLandingId,
      foundationModule.HOSTELERIA_LANDING_CONTENT_MODEL_FOUNDATION.landingId,
    );
  });

  it("keeps preview descriptor foundation_only and non-productive", () => {
    const descriptor = adapterModule.createHosteleriaLandingPreviewDescriptor();

    assert.strictEqual(descriptor.status, "preview_adapter_foundation");
    assert.strictEqual(descriptor.mode, "foundation_only");
    assert.strictEqual(descriptor.isProductivePreview, false);
  });

  it("converts sections to display-only preview sections", () => {
    const descriptor = adapterModule.createHosteleriaLandingPreviewDescriptor();

    assert.strictEqual(
      descriptor.sections.length,
      foundationModule.HOSTELERIA_LANDING_CONTENT_MODEL_FOUNDATION.sections.length,
    );
    assert.ok(descriptor.sections.every((section) => section.displayOnly));
    assert.deepStrictEqual(
      descriptor.sections.map((section) => section.previewSectionId),
      foundationModule.HOSTELERIA_LANDING_CONTENT_MODEL_FOUNDATION.sections.map(
        (section) => section.sectionId,
      ),
    );
  });

  it("converts CTA to disabled and non-real descriptors", () => {
    const descriptor = adapterModule.createHosteleriaLandingPreviewDescriptor();

    assert.strictEqual(
      descriptor.ctaDescriptors.length,
      foundationModule.HOSTELERIA_LANDING_CONTENT_MODEL_FOUNDATION.cta.length,
    );
    assert.ok(
      descriptor.ctaDescriptors.every(
        (cta) => cta.enabled === false && cta.isRealAction === false && cta.reasonDisabled.length > 0,
      ),
    );
  });

  it("converts FAQ to display-only descriptors", () => {
    const descriptor = adapterModule.createHosteleriaLandingPreviewDescriptor();

    assert.strictEqual(
      descriptor.faqDescriptors.length,
      foundationModule.HOSTELERIA_LANDING_CONTENT_MODEL_FOUNDATION.faq.length,
    );
    assert.ok(descriptor.faqDescriptors.every((faq) => faq.displayOnly));
  });

  it("includes required safety badges and warnings", () => {
    const descriptor = adapterModule.createHosteleriaLandingPreviewDescriptor();
    const badgeLabels = descriptor.badges.map((badge) => badge.label);

    for (const requiredBadge of adapterModule.HOSTELERIA_LANDING_PREVIEW_REQUIRED_BADGES) {
      assert.ok(badgeLabels.includes(requiredBadge.label), `missing badge ${requiredBadge.label}`);
    }

    assert.ok(descriptor.warnings.some((warning) => warning.includes("no UI")));
    assert.ok(descriptor.warnings.some((warning) => warning.includes("CTA descriptors are disabled")));
  });

  it("inherits the closed implementation boundary", () => {
    const descriptor = adapterModule.createHosteleriaLandingPreviewDescriptor();

    assert.deepStrictEqual(
      descriptor.implementationBoundary,
      hardeningModule.HOSTELERIA_LANDING_IMPLEMENTATION_BOUNDARY,
    );
    assert.strictEqual(descriptor.implementationBoundary.canBeUsedForFuturePreviewAdapter, true);
    assert.strictEqual(descriptor.implementationBoundary.canBeUsedForFutureUi, false);
    assert.strictEqual(descriptor.implementationBoundary.allowsRealForms, false);
    assert.strictEqual(descriptor.implementationBoundary.allowsApiClient, false);
    assert.strictEqual(descriptor.implementationBoundary.allowsRealActivation, false);
  });

  it("fails if CTA are enabled", () => {
    const descriptor = adapterModule.createHosteleriaLandingPreviewDescriptor();
    const result = adapterModule.validateHosteleriaLandingPreviewDescriptor(
      unsafeDescriptor({
        ctaDescriptors: [
          {
            ...descriptor.ctaDescriptors[0],
            enabled: true,
          },
        ],
      }),
    );

    assert.strictEqual(result.valid, false);
  });

  it("fails if CTA become real actions", () => {
    const descriptor = adapterModule.createHosteleriaLandingPreviewDescriptor();
    const result = adapterModule.validateHosteleriaLandingPreviewDescriptor(
      unsafeDescriptor({
        ctaDescriptors: [
          {
            ...descriptor.ctaDescriptors[0],
            isRealAction: true,
          },
        ],
      }),
    );

    assert.strictEqual(result.valid, false);
  });

  it("fails if real forms, apiClient or activation are allowed", () => {
    for (const boundaryPatch of [
      { allowsRealForms: true },
      { allowsApiClient: true },
      { allowsRealActivation: true },
    ]) {
      const descriptor = unsafeDescriptor({
        implementationBoundary: {
          ...hardeningModule.HOSTELERIA_LANDING_IMPLEMENTATION_BOUNDARY,
          ...boundaryPatch,
        },
      });

      assert.strictEqual(adapterModule.validateHosteleriaLandingPreviewDescriptor(descriptor).valid, false);
    }
  });

  it("fails if route, page or productive preview are opened", () => {
    const productiveDescriptor = unsafeDescriptor({ isProductivePreview: true });
    const routeDescriptor = unsafeDescriptor({
      implementationBoundary: {
        ...hardeningModule.HOSTELERIA_LANDING_IMPLEMENTATION_BOUNDARY,
        allowsRouteCreation: true,
      },
    });
    const pageDescriptor = unsafeDescriptor({
      implementationBoundary: {
        ...hardeningModule.HOSTELERIA_LANDING_IMPLEMENTATION_BOUNDARY,
        allowsPageCreation: true,
      },
    });

    assert.strictEqual(
      adapterModule.validateHosteleriaLandingPreviewDescriptor(productiveDescriptor).valid,
      false,
    );
    assert.strictEqual(adapterModule.validateHosteleriaLandingPreviewDescriptor(routeDescriptor).valid, false);
    assert.strictEqual(adapterModule.validateHosteleriaLandingPreviewDescriptor(pageDescriptor).valid, false);
  });

  it("fails if Takeaway, Delivery, Reservas, payments, execute or live-read are opened", () => {
    const capabilityPatches = [
      { includesTakeaway: true },
      { includesDelivery: true },
      { includesReservationsLive: true },
      { allowsPayments: true },
      { opensExecute: true },
      { usesLiveRead: true },
    ];

    for (const capabilityPatch of capabilityPatches) {
      const descriptor = unsafeDescriptor({
        capabilities: {
          ...foundationModule.HOSTELERIA_LANDING_CONTENT_MODEL_FOUNDATION.capabilities,
          ...capabilityPatch,
        },
      });

      assert.strictEqual(adapterModule.validateHosteleriaLandingPreviewDescriptor(descriptor).valid, false);
    }
  });

  it("fails if Carta Digital is sold standalone", () => {
    const descriptor = unsafeDescriptor({
      capabilities: {
        ...foundationModule.HOSTELERIA_LANDING_CONTENT_MODEL_FOUNDATION.capabilities,
        sellsStandaloneDigitalMenu: true,
      },
    });

    assert.strictEqual(adapterModule.validateHosteleriaLandingPreviewDescriptor(descriptor).valid, false);
  });

  it("fails if customer web becomes the menu source", () => {
    const descriptor = unsafeDescriptor({
      capabilities: {
        ...foundationModule.HOSTELERIA_LANDING_CONTENT_MODEL_FOUNDATION.capabilities,
        customerWebIsMenuSource: true,
      },
    });

    assert.strictEqual(adapterModule.validateHosteleriaLandingPreviewDescriptor(descriptor).valid, false);
  });

  it("fails with service_role, env or secrets copy", () => {
    const unsafeCopies = ["service_role", "SUPABASE_SERVICE_ROLE_KEY", ".env", "secret"];

    for (const unsafeCopy of unsafeCopies) {
      const descriptor = unsafeDescriptor({
        warnings: [unsafeCopy],
      });

      assert.strictEqual(adapterModule.validateHosteleriaLandingPreviewDescriptor(descriptor).valid, false);
    }
  });

  it("renders a safe textual summary", () => {
    const descriptor = adapterModule.createHosteleriaLandingPreviewDescriptor();
    const summary = adapterModule.createHosteleriaLandingPreviewSummary(descriptor);
    const result = adapterModule.validateHosteleriaLandingPreviewDescriptor({
      ...descriptor,
      summary,
    });

    assert.ok(summary.includes("preview adapter foundation"));
    assert.ok(summary.includes("no UI"));
    assert.ok(summary.includes("CTA descriptors remain disabled"));
    assert.ok(summary.includes("Carta Digital/QR remains inside MotanOS Hosteleria"));
    assert.strictEqual(result.valid, true);
  });
});
