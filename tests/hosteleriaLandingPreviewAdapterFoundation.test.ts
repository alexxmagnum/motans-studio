import { describe, it } from "node:test";
import assert from "node:assert";

import {
  HOSTELERIA_LANDING_PREVIEW_REQUIRED_BADGES,
  createHosteleriaLandingPreviewDescriptor,
  createHosteleriaLandingPreviewSummary,
  validateHosteleriaLandingPreviewDescriptor,
  type HosteleriaLandingPreviewDescriptor,
} from "../lib/hosteleriaLanding/hosteleriaLandingPreviewAdapterFoundation";
import { HOSTELERIA_LANDING_CONTENT_MODEL_FOUNDATION } from "../lib/hosteleriaLanding/hosteleriaLandingContentModelFoundation";
import { HOSTELERIA_LANDING_IMPLEMENTATION_BOUNDARY } from "../lib/hosteleriaLanding/hosteleriaLandingContentModelHardening";

const unsafeDescriptor = (
  patch: Partial<HosteleriaLandingPreviewDescriptor>,
): HosteleriaLandingPreviewDescriptor =>
  ({
    ...createHosteleriaLandingPreviewDescriptor(),
    ...patch,
  }) as HosteleriaLandingPreviewDescriptor;

describe("Hosteleria landing preview adapter foundation", () => {
  it("creates a valid default preview descriptor from the 23.19 content model", () => {
    const descriptor = createHosteleriaLandingPreviewDescriptor();
    const result = validateHosteleriaLandingPreviewDescriptor(descriptor);

    assert.strictEqual(result.valid, true);
    assert.strictEqual(result.state, "passed");
    assert.deepStrictEqual(result.blockedReasons, []);
    assert.strictEqual(descriptor.sourceLandingId, HOSTELERIA_LANDING_CONTENT_MODEL_FOUNDATION.landingId);
  });

  it("keeps preview descriptor foundation_only and non-productive", () => {
    const descriptor = createHosteleriaLandingPreviewDescriptor();

    assert.strictEqual(descriptor.status, "preview_adapter_foundation");
    assert.strictEqual(descriptor.mode, "foundation_only");
    assert.strictEqual(descriptor.isProductivePreview, false);
  });

  it("converts sections to display-only preview sections", () => {
    const descriptor = createHosteleriaLandingPreviewDescriptor();

    assert.strictEqual(descriptor.sections.length, HOSTELERIA_LANDING_CONTENT_MODEL_FOUNDATION.sections.length);
    assert.ok(descriptor.sections.every((section) => section.displayOnly));
    assert.deepStrictEqual(
      descriptor.sections.map((section) => section.previewSectionId),
      HOSTELERIA_LANDING_CONTENT_MODEL_FOUNDATION.sections.map((section) => section.sectionId),
    );
  });

  it("converts CTA to disabled and non-real descriptors", () => {
    const descriptor = createHosteleriaLandingPreviewDescriptor();

    assert.strictEqual(descriptor.ctaDescriptors.length, HOSTELERIA_LANDING_CONTENT_MODEL_FOUNDATION.cta.length);
    assert.ok(
      descriptor.ctaDescriptors.every(
        (cta) => cta.enabled === false && cta.isRealAction === false && cta.reasonDisabled.length > 0,
      ),
    );
  });

  it("converts FAQ to display-only descriptors", () => {
    const descriptor = createHosteleriaLandingPreviewDescriptor();

    assert.strictEqual(descriptor.faqDescriptors.length, HOSTELERIA_LANDING_CONTENT_MODEL_FOUNDATION.faq.length);
    assert.ok(descriptor.faqDescriptors.every((faq) => faq.displayOnly));
  });

  it("includes required safety badges and warnings", () => {
    const descriptor = createHosteleriaLandingPreviewDescriptor();
    const badgeLabels = descriptor.badges.map((badge) => badge.label);

    for (const requiredBadge of HOSTELERIA_LANDING_PREVIEW_REQUIRED_BADGES) {
      assert.ok(badgeLabels.includes(requiredBadge.label), `missing badge ${requiredBadge.label}`);
    }

    assert.ok(descriptor.warnings.some((warning) => warning.includes("no UI")));
    assert.ok(descriptor.warnings.some((warning) => warning.includes("CTA descriptors are disabled")));
  });

  it("inherits the closed implementation boundary", () => {
    const descriptor = createHosteleriaLandingPreviewDescriptor();

    assert.deepStrictEqual(descriptor.implementationBoundary, HOSTELERIA_LANDING_IMPLEMENTATION_BOUNDARY);
    assert.strictEqual(descriptor.implementationBoundary.canBeUsedForFuturePreviewAdapter, true);
    assert.strictEqual(descriptor.implementationBoundary.canBeUsedForFutureUi, false);
    assert.strictEqual(descriptor.implementationBoundary.allowsRealForms, false);
    assert.strictEqual(descriptor.implementationBoundary.allowsApiClient, false);
    assert.strictEqual(descriptor.implementationBoundary.allowsRealActivation, false);
  });

  it("fails if CTA are enabled", () => {
    const descriptor = unsafeDescriptor({
      ctaDescriptors: [
        {
          ...createHosteleriaLandingPreviewDescriptor().ctaDescriptors[0],
          enabled: true,
        },
      ],
    });

    assert.strictEqual(validateHosteleriaLandingPreviewDescriptor(descriptor).valid, false);
  });

  it("fails if CTA become real actions", () => {
    const descriptor = unsafeDescriptor({
      ctaDescriptors: [
        {
          ...createHosteleriaLandingPreviewDescriptor().ctaDescriptors[0],
          isRealAction: true,
        },
      ],
    });

    assert.strictEqual(validateHosteleriaLandingPreviewDescriptor(descriptor).valid, false);
  });

  it("fails if real forms, apiClient or activation are allowed", () => {
    for (const boundaryPatch of [
      { allowsRealForms: true },
      { allowsApiClient: true },
      { allowsRealActivation: true },
    ]) {
      const descriptor = unsafeDescriptor({
        implementationBoundary: {
          ...HOSTELERIA_LANDING_IMPLEMENTATION_BOUNDARY,
          ...boundaryPatch,
        } as typeof HOSTELERIA_LANDING_IMPLEMENTATION_BOUNDARY,
      });

      assert.strictEqual(validateHosteleriaLandingPreviewDescriptor(descriptor).valid, false);
    }
  });

  it("fails if route, page or productive preview are opened", () => {
    const productiveDescriptor = unsafeDescriptor({ isProductivePreview: true });
    const routeDescriptor = unsafeDescriptor({
      implementationBoundary: {
        ...HOSTELERIA_LANDING_IMPLEMENTATION_BOUNDARY,
        allowsRouteCreation: true,
      } as typeof HOSTELERIA_LANDING_IMPLEMENTATION_BOUNDARY,
    });
    const pageDescriptor = unsafeDescriptor({
      implementationBoundary: {
        ...HOSTELERIA_LANDING_IMPLEMENTATION_BOUNDARY,
        allowsPageCreation: true,
      } as typeof HOSTELERIA_LANDING_IMPLEMENTATION_BOUNDARY,
    });

    assert.strictEqual(validateHosteleriaLandingPreviewDescriptor(productiveDescriptor).valid, false);
    assert.strictEqual(validateHosteleriaLandingPreviewDescriptor(routeDescriptor).valid, false);
    assert.strictEqual(validateHosteleriaLandingPreviewDescriptor(pageDescriptor).valid, false);
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
          ...HOSTELERIA_LANDING_CONTENT_MODEL_FOUNDATION.capabilities,
          ...capabilityPatch,
        } as typeof HOSTELERIA_LANDING_CONTENT_MODEL_FOUNDATION.capabilities,
      });

      assert.strictEqual(validateHosteleriaLandingPreviewDescriptor(descriptor).valid, false);
    }
  });

  it("fails if Carta Digital is sold standalone", () => {
    const descriptor = unsafeDescriptor({
      capabilities: {
        ...HOSTELERIA_LANDING_CONTENT_MODEL_FOUNDATION.capabilities,
        sellsStandaloneDigitalMenu: true,
      } as typeof HOSTELERIA_LANDING_CONTENT_MODEL_FOUNDATION.capabilities,
    });

    assert.strictEqual(validateHosteleriaLandingPreviewDescriptor(descriptor).valid, false);
  });

  it("fails if customer web becomes the menu source", () => {
    const descriptor = unsafeDescriptor({
      capabilities: {
        ...HOSTELERIA_LANDING_CONTENT_MODEL_FOUNDATION.capabilities,
        customerWebIsMenuSource: true,
      } as typeof HOSTELERIA_LANDING_CONTENT_MODEL_FOUNDATION.capabilities,
    });

    assert.strictEqual(validateHosteleriaLandingPreviewDescriptor(descriptor).valid, false);
  });

  it("fails with service_role, env or secrets copy", () => {
    const unsafeCopies = ["service_role", "SUPABASE_SERVICE_ROLE_KEY", ".env", "secret"];

    for (const unsafeCopy of unsafeCopies) {
      const descriptor = unsafeDescriptor({
        warnings: [unsafeCopy],
      });

      assert.strictEqual(validateHosteleriaLandingPreviewDescriptor(descriptor).valid, false);
    }
  });

  it("renders a safe textual summary", () => {
    const descriptor = createHosteleriaLandingPreviewDescriptor();
    const summary = createHosteleriaLandingPreviewSummary(descriptor);
    const result = validateHosteleriaLandingPreviewDescriptor({
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
