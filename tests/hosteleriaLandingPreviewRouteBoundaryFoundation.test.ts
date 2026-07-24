import { describe, it } from "node:test";
import assert from "node:assert";

import { createHosteleriaLandingPreviewShellSlotDescriptor } from "../lib/hosteleriaLanding/hosteleriaLandingPreviewShellSlotFoundation";
import {
  HOSTELERIA_LANDING_PREVIEW_ROUTE_BOUNDARY_REQUIRED_BLOCKED_CLAIMS,
  HOSTELERIA_LANDING_PREVIEW_ROUTE_BOUNDARY_REQUIRED_BLOCKED_MODULES,
  createHosteleriaLandingPreviewRouteBoundaryMetadata,
  createHosteleriaLandingPreviewRouteBoundarySummary,
  validateHosteleriaLandingPreviewRouteBoundaryMetadata,
  type HosteleriaLandingPreviewRouteBoundaryMetadata,
} from "../lib/hosteleriaLanding/hosteleriaLandingPreviewRouteBoundaryFoundation";

const unsafeRouteBoundaryMetadata = (
  patch: Partial<HosteleriaLandingPreviewRouteBoundaryMetadata>,
): HosteleriaLandingPreviewRouteBoundaryMetadata =>
  ({
    ...createHosteleriaLandingPreviewRouteBoundaryMetadata(),
    ...patch,
  }) as HosteleriaLandingPreviewRouteBoundaryMetadata;

describe("Hosteleria landing preview route boundary foundation", () => {
  it("creates a valid default route boundary metadata descriptor", () => {
    const metadata = createHosteleriaLandingPreviewRouteBoundaryMetadata();
    const result = validateHosteleriaLandingPreviewRouteBoundaryMetadata(metadata);

    assert.strictEqual(result.valid, true);
    assert.strictEqual(result.state, "passed");
    assert.deepStrictEqual(result.blockedReasons, []);
  });

  it("points sourceSlotId to the 23.24 shell-slot", () => {
    const shellSlot = createHosteleriaLandingPreviewShellSlotDescriptor();
    const metadata = createHosteleriaLandingPreviewRouteBoundaryMetadata(shellSlot);

    assert.strictEqual(metadata.sourceSlotId, shellSlot.slotId);
  });

  it("keeps preview_boundary and does not create a real or productive route", () => {
    const metadata = createHosteleriaLandingPreviewRouteBoundaryMetadata();

    assert.strictEqual(metadata.routeStatus, "preview_boundary");
    assert.strictEqual(metadata.createsRealRoute, false);
    assert.strictEqual(metadata.createsProductiveRoute, false);
  });

  it("does not create page files or route handlers", () => {
    const metadata = createHosteleriaLandingPreviewRouteBoundaryMetadata();

    assert.strictEqual(metadata.createsPageFile, false);
    assert.strictEqual(metadata.createsRouteHandler, false);
  });

  it("keeps renderer implementation pending", () => {
    const metadata = createHosteleriaLandingPreviewRouteBoundaryMetadata();

    assert.strictEqual(metadata.rendererImplementationPending, true);
  });

  it("uses foundation-only inputs and blocks real data/actions", () => {
    const metadata = createHosteleriaLandingPreviewRouteBoundaryMetadata();

    assert.strictEqual(metadata.usesFixtureOrFoundationOnly, true);
    assert.strictEqual(metadata.allowsRealData, false);
    assert.strictEqual(metadata.allowsRealActions, false);
  });

  it("blocks forms, apiClient, activation, checkout and payments", () => {
    const metadata = createHosteleriaLandingPreviewRouteBoundaryMetadata();

    assert.strictEqual(metadata.allowsForms, false);
    assert.strictEqual(metadata.allowsApiClient, false);
    assert.strictEqual(metadata.allowsActivation, false);
    assert.strictEqual(metadata.allowsCheckout, false);
    assert.strictEqual(metadata.allowsPayments, false);
  });

  it("includes required blocked modules", () => {
    const metadata = createHosteleriaLandingPreviewRouteBoundaryMetadata();

    for (const blockedModule of HOSTELERIA_LANDING_PREVIEW_ROUTE_BOUNDARY_REQUIRED_BLOCKED_MODULES) {
      assert.ok(metadata.blockedModules.includes(blockedModule), `missing blocked module ${blockedModule}`);
    }
  });

  it("includes required blocked claims", () => {
    const metadata = createHosteleriaLandingPreviewRouteBoundaryMetadata();

    for (const blockedClaim of HOSTELERIA_LANDING_PREVIEW_ROUTE_BOUNDARY_REQUIRED_BLOCKED_CLAIMS) {
      assert.ok(metadata.blockedClaims.includes(blockedClaim), `missing blocked claim ${blockedClaim}`);
    }
  });

  it("fails if createsRealRoute is opened", () => {
    const metadata = unsafeRouteBoundaryMetadata({ createsRealRoute: true });

    assert.strictEqual(validateHosteleriaLandingPreviewRouteBoundaryMetadata(metadata).valid, false);
  });

  it("fails if createsProductiveRoute is opened", () => {
    const metadata = unsafeRouteBoundaryMetadata({ createsProductiveRoute: true });

    assert.strictEqual(validateHosteleriaLandingPreviewRouteBoundaryMetadata(metadata).valid, false);
  });

  it("fails if page file or route handler creation is opened", () => {
    const pageMetadata = unsafeRouteBoundaryMetadata({ createsPageFile: true });
    const handlerMetadata = unsafeRouteBoundaryMetadata({ createsRouteHandler: true });

    assert.strictEqual(validateHosteleriaLandingPreviewRouteBoundaryMetadata(pageMetadata).valid, false);
    assert.strictEqual(validateHosteleriaLandingPreviewRouteBoundaryMetadata(handlerMetadata).valid, false);
  });

  it("fails if renderer implementation is marked done", () => {
    const metadata = unsafeRouteBoundaryMetadata({ rendererImplementationPending: false });

    assert.strictEqual(validateHosteleriaLandingPreviewRouteBoundaryMetadata(metadata).valid, false);
  });

  it("fails if real data or real actions are allowed", () => {
    const dataMetadata = unsafeRouteBoundaryMetadata({ allowsRealData: true });
    const actionMetadata = unsafeRouteBoundaryMetadata({ allowsRealActions: true });

    assert.strictEqual(validateHosteleriaLandingPreviewRouteBoundaryMetadata(dataMetadata).valid, false);
    assert.strictEqual(validateHosteleriaLandingPreviewRouteBoundaryMetadata(actionMetadata).valid, false);
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

      assert.strictEqual(validateHosteleriaLandingPreviewRouteBoundaryMetadata(metadata).valid, false);
    }
  });

  it("fails if sourceSlotId does not match the 23.24 shell-slot", () => {
    const metadata = unsafeRouteBoundaryMetadata({
      sourceSlotId: "wrong-shell-slot",
    } as Partial<HosteleriaLandingPreviewRouteBoundaryMetadata>);

    assert.strictEqual(validateHosteleriaLandingPreviewRouteBoundaryMetadata(metadata).valid, false);
  });

  it("fails if required blocked modules are missing", () => {
    const metadata = unsafeRouteBoundaryMetadata({
      blockedModules: HOSTELERIA_LANDING_PREVIEW_ROUTE_BOUNDARY_REQUIRED_BLOCKED_MODULES.filter(
        (blockedModule) => blockedModule !== "Takeaway",
      ),
    });

    assert.strictEqual(validateHosteleriaLandingPreviewRouteBoundaryMetadata(metadata).valid, false);
  });

  it("fails if required blocked claims are missing", () => {
    const metadata = unsafeRouteBoundaryMetadata({
      blockedClaims: HOSTELERIA_LANDING_PREVIEW_ROUTE_BOUNDARY_REQUIRED_BLOCKED_CLAIMS.filter(
        (blockedClaim) => blockedClaim !== "Carta Digital como producto suelto",
      ),
    });

    assert.strictEqual(validateHosteleriaLandingPreviewRouteBoundaryMetadata(metadata).valid, false);
  });

  it("fails with service_role, env or secrets copy", () => {
    const unsafeCopies = ["service_role", "SUPABASE_SERVICE_ROLE_KEY", ".env", "secret"];

    for (const unsafeCopy of unsafeCopies) {
      const metadata = unsafeRouteBoundaryMetadata({
        implementationRequirements: [
          ...createHosteleriaLandingPreviewRouteBoundaryMetadata().implementationRequirements,
          unsafeCopy,
        ],
      });

      assert.strictEqual(validateHosteleriaLandingPreviewRouteBoundaryMetadata(metadata).valid, false);
    }
  });

  it("renders a safe textual summary", () => {
    const metadata = createHosteleriaLandingPreviewRouteBoundaryMetadata();
    const summary = createHosteleriaLandingPreviewRouteBoundarySummary(metadata);
    const result = validateHosteleriaLandingPreviewRouteBoundaryMetadata({
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
