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
const shellSlotPath = join(
  __dirname,
  "..",
  "lib",
  "hosteleriaLanding",
  "hosteleriaLandingPreviewShellSlotFoundation.ts",
);

let adapterModule;
let foundationModule;
let hardeningModule;
let shellSlotModule;

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

const loadShellSlotModule = async () => {
  const foundationUrl = toDataModuleUrl(transpileTypescript(foundationPath));
  const hardeningSource = transpileTypescript(hardeningPath).replace(
    /from "\.\/hosteleriaLandingContentModelFoundation";/g,
    `from "${foundationUrl}";`,
  );
  const hardeningUrl = toDataModuleUrl(hardeningSource);
  const adapterSource = transpileTypescript(adapterPath)
    .replace(/from "\.\/hosteleriaLandingContentModelFoundation";/g, `from "${foundationUrl}";`)
    .replace(/from "\.\/hosteleriaLandingContentModelHardening";/g, `from "${hardeningUrl}";`);
  const adapterUrl = toDataModuleUrl(adapterSource);
  const shellSlotSource = transpileTypescript(shellSlotPath)
    .replace(/from "\.\/hosteleriaLandingPreviewAdapterFoundation";/g, `from "${adapterUrl}";`)
    .replace(/from "\.\/hosteleriaLandingContentModelFoundation";/g, `from "${foundationUrl}";`)
    .replace(/from "\.\/hosteleriaLandingContentModelHardening";/g, `from "${hardeningUrl}";`);

  const [foundation, hardening, adapter, shellSlot] = await Promise.all([
    import(foundationUrl),
    import(hardeningUrl),
    import(adapterUrl),
    import(toDataModuleUrl(shellSlotSource)),
  ]);

  return { foundation, hardening, adapter, shellSlot };
};

const unsafeSlotDescriptor = (patch = {}) => ({
  ...shellSlotModule.createHosteleriaLandingPreviewShellSlotDescriptor(),
  ...patch,
});

describe("Hosteleria landing preview shell-slot foundation", () => {
  before(async () => {
    const modules = await loadShellSlotModule();
    foundationModule = modules.foundation;
    hardeningModule = modules.hardening;
    adapterModule = modules.adapter;
    shellSlotModule = modules.shellSlot;
  });

  it("creates a valid default shell-slot descriptor from the 23.22 preview adapter", () => {
    const descriptor = shellSlotModule.createHosteleriaLandingPreviewShellSlotDescriptor();
    const result = shellSlotModule.validateHosteleriaLandingPreviewShellSlotDescriptor(descriptor);

    assert.strictEqual(result.valid, true);
    assert.strictEqual(result.state, "passed");
    assert.deepStrictEqual(result.blockedReasons, []);
    assert.strictEqual(
      descriptor.sourcePreviewId,
      adapterModule.createHosteleriaLandingPreviewDescriptor().previewId,
    );
  });

  it("keeps slot descriptor foundation_only and non-productive", () => {
    const descriptor = shellSlotModule.createHosteleriaLandingPreviewShellSlotDescriptor();

    assert.strictEqual(descriptor.status, "shell_slot_foundation");
    assert.strictEqual(descriptor.mode, "foundation_only");
    assert.strictEqual(descriptor.isProductiveSlot, false);
    assert.strictEqual(descriptor.createsUi, false);
    assert.strictEqual(descriptor.createsRoute, false);
    assert.strictEqual(descriptor.createsPage, false);
  });

  it("creates slot regions from preview sections", () => {
    const preview = adapterModule.createHosteleriaLandingPreviewDescriptor();
    const descriptor = shellSlotModule.createHosteleriaLandingPreviewShellSlotDescriptor(preview);

    assert.strictEqual(descriptor.regions.length, preview.sections.length);
    assert.ok(descriptor.regions.every((region) => region.displayOnly));
    assert.deepStrictEqual(
      descriptor.regions.map((region) => region.sourcePreviewSectionId),
      preview.sections.map((section) => section.previewSectionId),
    );
  });

  it("creates notices from badges and warnings", () => {
    const preview = adapterModule.createHosteleriaLandingPreviewDescriptor();
    const descriptor = shellSlotModule.createHosteleriaLandingPreviewShellSlotDescriptor(preview);
    const noticeLabels = descriptor.notices.map((notice) => notice.label);

    for (const badge of preview.badges) {
      assert.ok(noticeLabels.includes(badge.label), `missing badge notice ${badge.label}`);
    }

    for (const warning of preview.warnings) {
      assert.ok(noticeLabels.includes(warning), `missing warning notice ${warning}`);
    }

    assert.ok(noticeLabels.includes("No UI real"));
    assert.ok(noticeLabels.includes("No route/page"));
  });

  it("converts CTA descriptors to blocked, disabled and non-real CTA slots", () => {
    const preview = adapterModule.createHosteleriaLandingPreviewDescriptor();
    const descriptor = shellSlotModule.createHosteleriaLandingPreviewShellSlotDescriptor(preview);

    assert.strictEqual(descriptor.blockedCtaSlots.length, preview.ctaDescriptors.length);
    assert.ok(
      descriptor.blockedCtaSlots.every(
        (cta) => cta.enabled === false && cta.isRealAction === false && cta.reasonBlocked.length > 0,
      ),
    );
  });

  it("inherits the closed implementation boundary", () => {
    const descriptor = shellSlotModule.createHosteleriaLandingPreviewShellSlotDescriptor();

    assert.deepStrictEqual(
      descriptor.implementationBoundary,
      hardeningModule.HOSTELERIA_LANDING_IMPLEMENTATION_BOUNDARY,
    );
    assert.strictEqual(descriptor.implementationBoundary.canBeUsedForFutureUi, false);
    assert.strictEqual(descriptor.implementationBoundary.allowsRealForms, false);
    assert.strictEqual(descriptor.implementationBoundary.allowsApiClient, false);
    assert.strictEqual(descriptor.implementationBoundary.allowsRealActivation, false);
  });

  it("fails if createsUi is opened", () => {
    const descriptor = unsafeSlotDescriptor({ createsUi: true });

    assert.strictEqual(shellSlotModule.validateHosteleriaLandingPreviewShellSlotDescriptor(descriptor).valid, false);
  });

  it("fails if route or page creation is opened", () => {
    const routeDescriptor = unsafeSlotDescriptor({ createsRoute: true });
    const pageDescriptor = unsafeSlotDescriptor({ createsPage: true });

    assert.strictEqual(shellSlotModule.validateHosteleriaLandingPreviewShellSlotDescriptor(routeDescriptor).valid, false);
    assert.strictEqual(shellSlotModule.validateHosteleriaLandingPreviewShellSlotDescriptor(pageDescriptor).valid, false);
  });

  it("fails if blocked CTA slots are enabled", () => {
    const descriptor = unsafeSlotDescriptor({
      blockedCtaSlots: [
        {
          ...shellSlotModule.createHosteleriaLandingPreviewShellSlotDescriptor().blockedCtaSlots[0],
          enabled: true,
        },
      ],
    });

    assert.strictEqual(shellSlotModule.validateHosteleriaLandingPreviewShellSlotDescriptor(descriptor).valid, false);
  });

  it("fails if blocked CTA slots become real actions", () => {
    const descriptor = unsafeSlotDescriptor({
      blockedCtaSlots: [
        {
          ...shellSlotModule.createHosteleriaLandingPreviewShellSlotDescriptor().blockedCtaSlots[0],
          isRealAction: true,
        },
      ],
    });

    assert.strictEqual(shellSlotModule.validateHosteleriaLandingPreviewShellSlotDescriptor(descriptor).valid, false);
  });

  it("fails if apiClient, forms or activation are allowed", () => {
    for (const boundaryPatch of [
      { allowsApiClient: true },
      { allowsRealForms: true },
      { allowsRealActivation: true },
    ]) {
      const descriptor = unsafeSlotDescriptor({
        implementationBoundary: {
          ...hardeningModule.HOSTELERIA_LANDING_IMPLEMENTATION_BOUNDARY,
          ...boundaryPatch,
        },
      });

      assert.strictEqual(shellSlotModule.validateHosteleriaLandingPreviewShellSlotDescriptor(descriptor).valid, false);
    }
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
      const descriptor = unsafeSlotDescriptor({
        capabilities: {
          ...foundationModule.HOSTELERIA_LANDING_CONTENT_MODEL_FOUNDATION.capabilities,
          ...capabilityPatch,
        },
      });

      assert.strictEqual(shellSlotModule.validateHosteleriaLandingPreviewShellSlotDescriptor(descriptor).valid, false);
    }
  });

  it("fails if Carta Digital is sold standalone", () => {
    const descriptor = unsafeSlotDescriptor({
      capabilities: {
        ...foundationModule.HOSTELERIA_LANDING_CONTENT_MODEL_FOUNDATION.capabilities,
        sellsStandaloneDigitalMenu: true,
      },
    });

    assert.strictEqual(shellSlotModule.validateHosteleriaLandingPreviewShellSlotDescriptor(descriptor).valid, false);
  });

  it("fails if customer web becomes the menu source", () => {
    const descriptor = unsafeSlotDescriptor({
      capabilities: {
        ...foundationModule.HOSTELERIA_LANDING_CONTENT_MODEL_FOUNDATION.capabilities,
        customerWebIsMenuSource: true,
      },
    });

    assert.strictEqual(shellSlotModule.validateHosteleriaLandingPreviewShellSlotDescriptor(descriptor).valid, false);
  });

  it("fails if blocked flags drift open", () => {
    const descriptor = unsafeSlotDescriptor({
      blockedFlags: {
        ...shellSlotModule.HOSTELERIA_LANDING_PREVIEW_SHELL_SLOT_BLOCKED_FLAGS,
        noUi: false,
      },
    });

    assert.strictEqual(shellSlotModule.validateHosteleriaLandingPreviewShellSlotDescriptor(descriptor).valid, false);
  });

  it("fails with service_role, env or secrets copy", () => {
    const unsafeCopies = ["service_role", "SUPABASE_SERVICE_ROLE_KEY", ".env", "secret"];

    for (const unsafeCopy of unsafeCopies) {
      const descriptor = unsafeSlotDescriptor({
        notices: [
          ...shellSlotModule.createHosteleriaLandingPreviewShellSlotDescriptor().notices,
          {
            noticeId: unsafeCopy,
            label: unsafeCopy,
            severity: "blocked",
            source: "shell-slot-boundary",
          },
        ],
      });

      assert.strictEqual(shellSlotModule.validateHosteleriaLandingPreviewShellSlotDescriptor(descriptor).valid, false);
    }
  });

  it("renders a safe textual summary", () => {
    const descriptor = shellSlotModule.createHosteleriaLandingPreviewShellSlotDescriptor();
    const summary = shellSlotModule.createHosteleriaLandingPreviewShellSlotSummary(descriptor);
    const result = shellSlotModule.validateHosteleriaLandingPreviewShellSlotDescriptor({
      ...descriptor,
      summary,
    });

    assert.ok(summary.includes("shell-slot foundation"));
    assert.ok(summary.includes("no UI"));
    assert.ok(summary.includes("Blocked CTA slots remain disabled"));
    assert.ok(summary.includes("Carta Digital/QR remains inside MotanOS Hosteleria"));
    assert.strictEqual(result.valid, true);
  });
});
