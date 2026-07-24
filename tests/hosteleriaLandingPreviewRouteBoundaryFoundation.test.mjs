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
const routeBoundaryPath = join(
  __dirname,
  "..",
  "lib",
  "hosteleriaLanding",
  "hosteleriaLandingPreviewRouteBoundaryFoundation.ts",
);

let routeBoundaryModule;
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

const loadRouteBoundaryModule = async () => {
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
  const shellSlotUrl = toDataModuleUrl(shellSlotSource);
  const routeBoundarySource = transpileTypescript(routeBoundaryPath)
    .replace(/from "\.\/hosteleriaLandingPreviewShellSlotFoundation";/g, `from "${shellSlotUrl}";`)
    .replace(/from "\.\/hosteleriaLandingContentModelFoundation";/g, `from "${foundationUrl}";`);

  const [shellSlot, routeBoundary] = await Promise.all([
    import(shellSlotUrl),
    import(toDataModuleUrl(routeBoundarySource)),
  ]);

  return { shellSlot, routeBoundary };
};

const unsafeRouteBoundaryMetadata = (patch = {}) => ({
  ...routeBoundaryModule.createHosteleriaLandingPreviewRouteBoundaryMetadata(),
  ...patch,
});

describe("Hosteleria landing preview route boundary foundation", () => {
  before(async () => {
    const modules = await loadRouteBoundaryModule();
    shellSlotModule = modules.shellSlot;
    routeBoundaryModule = modules.routeBoundary;
  });

  it("creates a valid default route boundary metadata descriptor", () => {
    const metadata = routeBoundaryModule.createHosteleriaLandingPreviewRouteBoundaryMetadata();
    const result = routeBoundaryModule.validateHosteleriaLandingPreviewRouteBoundaryMetadata(metadata);

    assert.strictEqual(result.valid, true);
    assert.strictEqual(result.state, "passed");
    assert.deepStrictEqual(result.blockedReasons, []);
  });

  it("points sourceSlotId to the 23.24 shell-slot", () => {
    const shellSlot = shellSlotModule.createHosteleriaLandingPreviewShellSlotDescriptor();
    const metadata = routeBoundaryModule.createHosteleriaLandingPreviewRouteBoundaryMetadata(shellSlot);

    assert.strictEqual(metadata.sourceSlotId, shellSlot.slotId);
  });

  it("keeps preview_boundary and does not create a real or productive route", () => {
    const metadata = routeBoundaryModule.createHosteleriaLandingPreviewRouteBoundaryMetadata();

    assert.strictEqual(metadata.routeStatus, "preview_boundary");
    assert.strictEqual(metadata.createsRealRoute, false);
    assert.strictEqual(metadata.createsProductiveRoute, false);
  });

  it("does not create page files or route handlers", () => {
    const metadata = routeBoundaryModule.createHosteleriaLandingPreviewRouteBoundaryMetadata();

    assert.strictEqual(metadata.createsPageFile, false);
    assert.strictEqual(metadata.createsRouteHandler, false);
  });

  it("keeps renderer implementation pending", () => {
    const metadata = routeBoundaryModule.createHosteleriaLandingPreviewRouteBoundaryMetadata();

    assert.strictEqual(metadata.rendererImplementationPending, true);
  });

  it("uses foundation-only inputs and blocks real data/actions", () => {
    const metadata = routeBoundaryModule.createHosteleriaLandingPreviewRouteBoundaryMetadata();

    assert.strictEqual(metadata.usesFixtureOrFoundationOnly, true);
    assert.strictEqual(metadata.allowsRealData, false);
    assert.strictEqual(metadata.allowsRealActions, false);
  });

  it("blocks forms, apiClient, activation, checkout and payments", () => {
    const metadata = routeBoundaryModule.createHosteleriaLandingPreviewRouteBoundaryMetadata();

    assert.strictEqual(metadata.allowsForms, false);
    assert.strictEqual(metadata.allowsApiClient, false);
    assert.strictEqual(metadata.allowsActivation, false);
    assert.strictEqual(metadata.allowsCheckout, false);
    assert.strictEqual(metadata.allowsPayments, false);
  });

  it("includes required blocked modules", () => {
    const metadata = routeBoundaryModule.createHosteleriaLandingPreviewRouteBoundaryMetadata();

    for (const blockedModule of routeBoundaryModule.HOSTELERIA_LANDING_PREVIEW_ROUTE_BOUNDARY_REQUIRED_BLOCKED_MODULES) {
      assert.ok(metadata.blockedModules.includes(blockedModule), `missing blocked module ${blockedModule}`);
    }
  });

  it("includes required blocked claims", () => {
    const metadata = routeBoundaryModule.createHosteleriaLandingPreviewRouteBoundaryMetadata();

    for (const blockedClaim of routeBoundaryModule.HOSTELERIA_LANDING_PREVIEW_ROUTE_BOUNDARY_REQUIRED_BLOCKED_CLAIMS) {
      assert.ok(metadata.blockedClaims.includes(blockedClaim), `missing blocked claim ${blockedClaim}`);
    }
  });

  it("fails if createsRealRoute is opened", () => {
    const metadata = unsafeRouteBoundaryMetadata({ createsRealRoute: true });

    assert.strictEqual(routeBoundaryModule.validateHosteleriaLandingPreviewRouteBoundaryMetadata(metadata).valid, false);
  });

  it("fails if createsProductiveRoute is opened", () => {
    const metadata = unsafeRouteBoundaryMetadata({ createsProductiveRoute: true });

    assert.strictEqual(routeBoundaryModule.validateHosteleriaLandingPreviewRouteBoundaryMetadata(metadata).valid, false);
  });

  it("fails if page file or route handler creation is opened", () => {
    const pageMetadata = unsafeRouteBoundaryMetadata({ createsPageFile: true });
    const handlerMetadata = unsafeRouteBoundaryMetadata({ createsRouteHandler: true });

    assert.strictEqual(routeBoundaryModule.validateHosteleriaLandingPreviewRouteBoundaryMetadata(pageMetadata).valid, false);
    assert.strictEqual(routeBoundaryModule.validateHosteleriaLandingPreviewRouteBoundaryMetadata(handlerMetadata).valid, false);
  });

  it("fails if renderer implementation is marked done", () => {
    const metadata = unsafeRouteBoundaryMetadata({ rendererImplementationPending: false });

    assert.strictEqual(routeBoundaryModule.validateHosteleriaLandingPreviewRouteBoundaryMetadata(metadata).valid, false);
  });

  it("fails if real data or real actions are allowed", () => {
    const dataMetadata = unsafeRouteBoundaryMetadata({ allowsRealData: true });
    const actionMetadata = unsafeRouteBoundaryMetadata({ allowsRealActions: true });

    assert.strictEqual(routeBoundaryModule.validateHosteleriaLandingPreviewRouteBoundaryMetadata(dataMetadata).valid, false);
    assert.strictEqual(routeBoundaryModule.validateHosteleriaLandingPreviewRouteBoundaryMetadata(actionMetadata).valid, false);
  });

  it("fails if forms, apiClient, activation, checkout or payments are allowed", () => {
    for (const patch of [
      { allowsForms: true },
      { allowsApiClient: true },
      { allowsActivation: true },
      { allowsCheckout: true },
      { allowsPayments: true },
    ]) {
      const metadata = unsafeRouteBoundaryMetadata(patch);

      assert.strictEqual(routeBoundaryModule.validateHosteleriaLandingPreviewRouteBoundaryMetadata(metadata).valid, false);
    }
  });

  it("fails if sourceSlotId does not match the 23.24 shell-slot", () => {
    const metadata = unsafeRouteBoundaryMetadata({
      sourceSlotId: "wrong-shell-slot",
    });

    assert.strictEqual(routeBoundaryModule.validateHosteleriaLandingPreviewRouteBoundaryMetadata(metadata).valid, false);
  });

  it("fails if required blocked modules are missing", () => {
    const metadata = unsafeRouteBoundaryMetadata({
      blockedModules: routeBoundaryModule.HOSTELERIA_LANDING_PREVIEW_ROUTE_BOUNDARY_REQUIRED_BLOCKED_MODULES.filter(
        (blockedModule) => blockedModule !== "Takeaway",
      ),
    });

    assert.strictEqual(routeBoundaryModule.validateHosteleriaLandingPreviewRouteBoundaryMetadata(metadata).valid, false);
  });

  it("fails if required blocked claims are missing", () => {
    const metadata = unsafeRouteBoundaryMetadata({
      blockedClaims: routeBoundaryModule.HOSTELERIA_LANDING_PREVIEW_ROUTE_BOUNDARY_REQUIRED_BLOCKED_CLAIMS.filter(
        (blockedClaim) => blockedClaim !== "Carta Digital como producto suelto",
      ),
    });

    assert.strictEqual(routeBoundaryModule.validateHosteleriaLandingPreviewRouteBoundaryMetadata(metadata).valid, false);
  });

  it("fails with service_role, env or secrets copy", () => {
    const unsafeCopies = ["service_role", "SUPABASE_SERVICE_ROLE_KEY", ".env", "secret"];

    for (const unsafeCopy of unsafeCopies) {
      const metadata = unsafeRouteBoundaryMetadata({
        implementationRequirements: [
          ...routeBoundaryModule.createHosteleriaLandingPreviewRouteBoundaryMetadata().implementationRequirements,
          unsafeCopy,
        ],
      });

      assert.strictEqual(routeBoundaryModule.validateHosteleriaLandingPreviewRouteBoundaryMetadata(metadata).valid, false);
    }
  });

  it("renders a safe textual summary", () => {
    const metadata = routeBoundaryModule.createHosteleriaLandingPreviewRouteBoundaryMetadata();
    const summary = routeBoundaryModule.createHosteleriaLandingPreviewRouteBoundarySummary(metadata);
    const result = routeBoundaryModule.validateHosteleriaLandingPreviewRouteBoundaryMetadata({
      ...metadata,
      summary,
    });

    assert.ok(summary.includes("route boundary metadata"));
    assert.ok(summary.includes("no real route"));
    assert.ok(summary.includes("no page file"));
    assert.ok(summary.includes("no route handler"));
    assert.ok(summary.includes("Carta Digital/QR remains inside MotanOS Hosteleria"));
    assert.strictEqual(result.valid, true);
  });
});
