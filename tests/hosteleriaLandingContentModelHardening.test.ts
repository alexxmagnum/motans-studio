import { describe, it } from "node:test";
import assert from "node:assert";

import {
  HOSTELERIA_LANDING_IMPLEMENTATION_BOUNDARY,
  validateHosteleriaLandingContentModelHardening,
} from "../lib/hosteleriaLanding/hosteleriaLandingContentModelHardening";

describe("Hosteleria landing content model hardening", () => {
  it("passes with the default 23.19 content model and closed implementation boundary", () => {
    const result = validateHosteleriaLandingContentModelHardening();

    assert.strictEqual(result.valid, true);
    assert.strictEqual(result.state, "passed");
    assert.deepStrictEqual(result.blockedReasons, []);
  });

  it("fails with activation CTA drift", () => {
    const result = validateHosteleriaLandingContentModelHardening({
      attempt: {
        proposedCtaLabels: ["Activar mi cuenta ahora"],
      },
    });

    assert.strictEqual(result.valid, false);
  });

  it("fails with checkout, payment or charge claims", () => {
    const unsafeCopies = ["Checkout listo", "Empieza a cobrar hoy", "Pagos listos"];

    for (const unsafeCopy of unsafeCopies) {
      const result = validateHosteleriaLandingContentModelHardening({
        attempt: {
          additionalPublicCopy: [unsafeCopy],
        },
      });

      assert.strictEqual(result.valid, false, `copy should fail: ${unsafeCopy}`);
    }
  });

  it("fails with hardcoded pricing not approved by controlled source", () => {
    const result = validateHosteleriaLandingContentModelHardening({
      attempt: {
        proposedPricingCopy: ["Plan Pro desde 49€ al mes"],
      },
    });

    assert.strictEqual(result.valid, false);
  });

  it("fails with apiClient or contact form usage", () => {
    const apiClientResult = validateHosteleriaLandingContentModelHardening({
      attempt: {
        usesApiClient: true,
      },
    });
    const contactFormResult = validateHosteleriaLandingContentModelHardening({
      attempt: {
        usesContactForm: true,
      },
    });
    const copyResult = validateHosteleriaLandingContentModelHardening({
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
      const result = validateHosteleriaLandingContentModelHardening({
        attempt: {
          additionalPublicCopy: [unsafeCopy],
        },
      });

      assert.strictEqual(result.valid, false, `copy should fail: ${unsafeCopy}`);
    }
  });

  it("fails with standalone Carta Digital copy", () => {
    const result = validateHosteleriaLandingContentModelHardening({
      attempt: {
        additionalPublicCopy: ["Te vendemos una carta QR"],
      },
    });

    assert.strictEqual(result.valid, false);
  });

  it("fails with customer web as menu source copy", () => {
    const result = validateHosteleriaLandingContentModelHardening({
      attempt: {
        additionalPublicCopy: ["Tu web sera la fuente real de carta"],
      },
    });

    assert.strictEqual(result.valid, false);
  });

  it("fails with service_role, env or secrets copy", () => {
    const unsafeCopies = ["service_role", "SUPABASE_SERVICE_ROLE_KEY", ".env", "secret"];

    for (const unsafeCopy of unsafeCopies) {
      const result = validateHosteleriaLandingContentModelHardening({
        attempt: {
          additionalPublicCopy: [unsafeCopy],
        },
      });

      assert.strictEqual(result.valid, false, `copy should fail: ${unsafeCopy}`);
    }
  });

  it("keeps implementation boundary closed", () => {
    const result = validateHosteleriaLandingContentModelHardening();
    const boundary = result.implementationBoundary;

    assert.deepStrictEqual(boundary, HOSTELERIA_LANDING_IMPLEMENTATION_BOUNDARY);
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
