import { describe, it } from "node:test";
import assert from "node:assert";

import {
  createHosteleriaLandingPreviewDescriptor,
} from "../lib/hosteleriaLanding/hosteleriaLandingPreviewAdapterFoundation";
import { HOSTELERIA_LANDING_IMPLEMENTATION_BOUNDARY } from "../lib/hosteleriaLanding/hosteleriaLandingContentModelHardening";
import { HOSTELERIA_LANDING_CONTENT_MODEL_FOUNDATION } from "../lib/hosteleriaLanding/hosteleriaLandingContentModelFoundation";
import {
  HOSTELERIA_LANDING_PREVIEW_SHELL_SLOT_BLOCKED_FLAGS,
  createHosteleriaLandingPreviewShellSlotDescriptor,
  createHosteleriaLandingPreviewShellSlotSummary,
  validateHosteleriaLandingPreviewShellSlotDescriptor,
  type HosteleriaLandingPreviewShellSlotDescriptor,
} from "../lib/hosteleriaLanding/hosteleriaLandingPreviewShellSlotFoundation";

const unsafeSlotDescriptor = (
  patch: Partial<HosteleriaLandingPreviewShellSlotDescriptor>,
): HosteleriaLandingPreviewShellSlotDescriptor =>
  ({
    ...createHosteleriaLandingPreviewShellSlotDescriptor(),
    ...patch,
  }) as HosteleriaLandingPreviewShellSlotDescriptor;

describe("Hosteleria landing preview shell-slot foundation", () => {
  it("creates a valid default shell-slot descriptor from the 23.22 preview adapter", () => {
    const descriptor = createHosteleriaLandingPreviewShellSlotDescriptor();
    const result = validateHosteleriaLandingPreviewShellSlotDescriptor(descriptor);

    assert.strictEqual(result.valid, true);
    assert.strictEqual(result.state, "passed");
    assert.deepStrictEqual(result.blockedReasons, []);
    assert.strictEqual(descriptor.sourcePreviewId, createHosteleriaLandingPreviewDescriptor().previewId);
  });

  it("keeps slot descriptor foundation_only and non-productive", () => {
    const descriptor = createHosteleriaLandingPreviewShellSlotDescriptor();

    assert.strictEqual(descriptor.status, "shell_slot_foundation");
    assert.strictEqual(descriptor.mode, "foundation_only");
    assert.strictEqual(descriptor.isProductiveSlot, false);
    assert.strictEqual(descriptor.createsUi, false);
    assert.strictEqual(descriptor.createsRoute, false);
    assert.strictEqual(descriptor.createsPage, false);
  });

  it("creates slot regions from preview sections", () => {
    const preview = createHosteleriaLandingPreviewDescriptor();
    const descriptor = createHosteleriaLandingPreviewShellSlotDescriptor(preview);

    assert.strictEqual(descriptor.regions.length, preview.sections.length);
    assert.ok(descriptor.regions.every((region) => region.displayOnly));
    assert.deepStrictEqual(
      descriptor.regions.map((region) => region.sourcePreviewSectionId),
      preview.sections.map((section) => section.previewSectionId),
    );
  });

  it("creates notices from badges and warnings", () => {
    const preview = createHosteleriaLandingPreviewDescriptor();
    const descriptor = createHosteleriaLandingPreviewShellSlotDescriptor(preview);
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
    const preview = createHosteleriaLandingPreviewDescriptor();
    const descriptor = createHosteleriaLandingPreviewShellSlotDescriptor(preview);

    assert.strictEqual(descriptor.blockedCtaSlots.length, preview.ctaDescriptors.length);
    assert.ok(
      descriptor.blockedCtaSlots.every(
        (cta) => cta.enabled === false && cta.isRealAction === false && cta.reasonBlocked.length > 0,
      ),
    );
  });

  it("inherits the closed implementation boundary", () => {
    const descriptor = createHosteleriaLandingPreviewShellSlotDescriptor();

    assert.deepStrictEqual(descriptor.implementationBoundary, HOSTELERIA_LANDING_IMPLEMENTATION_BOUNDARY);
    assert.strictEqual(descriptor.implementationBoundary.canBeUsedForFutureUi, false);
    assert.strictEqual(descriptor.implementationBoundary.allowsRealForms, false);
    assert.strictEqual(descriptor.implementationBoundary.allowsApiClient, false);
    assert.strictEqual(descriptor.implementationBoundary.allowsRealActivation, false);
  });

  it("fails if createsUi is opened", () => {
    const descriptor = unsafeSlotDescriptor({ createsUi: true });

    assert.strictEqual(validateHosteleriaLandingPreviewShellSlotDescriptor(descriptor).valid, false);
  });

  it("fails if route or page creation is opened", () => {
    const routeDescriptor = unsafeSlotDescriptor({ createsRoute: true });
    const pageDescriptor = unsafeSlotDescriptor({ createsPage: true });

    assert.strictEqual(validateHosteleriaLandingPreviewShellSlotDescriptor(routeDescriptor).valid, false);
    assert.strictEqual(validateHosteleriaLandingPreviewShellSlotDescriptor(pageDescriptor).valid, false);
  });

  it("fails if blocked CTA slots are enabled", () => {
    const descriptor = unsafeSlotDescriptor({
      blockedCtaSlots: [
        {
          ...createHosteleriaLandingPreviewShellSlotDescriptor().blockedCtaSlots[0],
          enabled: true,
        },
      ],
    });

    assert.strictEqual(validateHosteleriaLandingPreviewShellSlotDescriptor(descriptor).valid, false);
  });

  it("fails if blocked CTA slots become real actions", () => {
    const descriptor = unsafeSlotDescriptor({
      blockedCtaSlots: [
        {
          ...createHosteleriaLandingPreviewShellSlotDescriptor().blockedCtaSlots[0],
          isRealAction: true,
        },
      ],
    });

    assert.strictEqual(validateHosteleriaLandingPreviewShellSlotDescriptor(descriptor).valid, false);
  });

  it("fails if apiClient, forms or activation are allowed", () => {
    for (const boundaryPatch of [
      { allowsApiClient: true },
      { allowsRealForms: true },
      { allowsRealActivation: true },
    ]) {
      const descriptor = unsafeSlotDescriptor({
        implementationBoundary: {
          ...HOSTELERIA_LANDING_IMPLEMENTATION_BOUNDARY,
          ...boundaryPatch,
        } as typeof HOSTELERIA_LANDING_IMPLEMENTATION_BOUNDARY,
      });

      assert.strictEqual(validateHosteleriaLandingPreviewShellSlotDescriptor(descriptor).valid, false);
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
          ...HOSTELERIA_LANDING_CONTENT_MODEL_FOUNDATION.capabilities,
          ...capabilityPatch,
        } as typeof HOSTELERIA_LANDING_CONTENT_MODEL_FOUNDATION.capabilities,
      });

      assert.strictEqual(validateHosteleriaLandingPreviewShellSlotDescriptor(descriptor).valid, false);
    }
  });

  it("fails if Carta Digital is sold standalone", () => {
    const descriptor = unsafeSlotDescriptor({
      capabilities: {
        ...HOSTELERIA_LANDING_CONTENT_MODEL_FOUNDATION.capabilities,
        sellsStandaloneDigitalMenu: true,
      } as typeof HOSTELERIA_LANDING_CONTENT_MODEL_FOUNDATION.capabilities,
    });

    assert.strictEqual(validateHosteleriaLandingPreviewShellSlotDescriptor(descriptor).valid, false);
  });

  it("fails if customer web becomes the menu source", () => {
    const descriptor = unsafeSlotDescriptor({
      capabilities: {
        ...HOSTELERIA_LANDING_CONTENT_MODEL_FOUNDATION.capabilities,
        customerWebIsMenuSource: true,
      } as typeof HOSTELERIA_LANDING_CONTENT_MODEL_FOUNDATION.capabilities,
    });

    assert.strictEqual(validateHosteleriaLandingPreviewShellSlotDescriptor(descriptor).valid, false);
  });

  it("fails if blocked flags drift open", () => {
    const descriptor = unsafeSlotDescriptor({
      blockedFlags: {
        ...HOSTELERIA_LANDING_PREVIEW_SHELL_SLOT_BLOCKED_FLAGS,
        noUi: false,
      } as typeof HOSTELERIA_LANDING_PREVIEW_SHELL_SLOT_BLOCKED_FLAGS,
    });

    assert.strictEqual(validateHosteleriaLandingPreviewShellSlotDescriptor(descriptor).valid, false);
  });

  it("fails with service_role, env or secrets copy", () => {
    const unsafeCopies = ["service_role", "SUPABASE_SERVICE_ROLE_KEY", ".env", "secret"];

    for (const unsafeCopy of unsafeCopies) {
      const descriptor = unsafeSlotDescriptor({
        notices: [
          ...createHosteleriaLandingPreviewShellSlotDescriptor().notices,
          {
            noticeId: unsafeCopy,
            label: unsafeCopy,
            severity: "blocked",
            source: "shell-slot-boundary",
          },
        ],
      });

      assert.strictEqual(validateHosteleriaLandingPreviewShellSlotDescriptor(descriptor).valid, false);
    }
  });

  it("renders a safe textual summary", () => {
    const descriptor = createHosteleriaLandingPreviewShellSlotDescriptor();
    const summary = createHosteleriaLandingPreviewShellSlotSummary(descriptor);
    const result = validateHosteleriaLandingPreviewShellSlotDescriptor({
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
