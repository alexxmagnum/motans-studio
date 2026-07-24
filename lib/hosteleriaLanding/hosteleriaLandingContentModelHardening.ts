import {
  HOSTELERIA_LANDING_CONTENT_MODEL_FOUNDATION,
  validateHosteleriaLandingContentModel,
  type HosteleriaLandingContentModel,
  type HosteleriaLandingValidationCheck,
  type HosteleriaLandingValidationState,
} from "./hosteleriaLandingContentModelFoundation";

export type HosteleriaLandingImplementationBoundary = {
  readonly canBeUsedForFutureUi: false;
  readonly canBeUsedForFuturePreviewAdapter: true;
  readonly requiresExplicitImplementationCharter: true;
  readonly requiresUxReview: true;
  readonly requiresSecurityReview: true;
  readonly requiresCopyApproval: true;
  readonly allowsRealForms: false;
  readonly allowsApiClient: false;
  readonly allowsRealActivation: false;
  readonly allowsRouteCreation: false;
  readonly allowsPageCreation: false;
  readonly allowsProductiveLanding: false;
  readonly nextAllowedStep: "23.21 — Commercial landing preview adapter/boundary decision, sin UI productiva ni rutas reales.";
};

export type HosteleriaLandingHardeningAttempt = {
  readonly additionalPublicCopy?: readonly string[];
  readonly proposedCtaLabels?: readonly string[];
  readonly proposedPricingCopy?: readonly string[];
  readonly usesApiClient?: boolean;
  readonly usesContactForm?: boolean;
  readonly usesRealData?: boolean;
  readonly createsRoute?: boolean;
  readonly createsPage?: boolean;
  readonly enablesProductiveLanding?: boolean;
};

export type HosteleriaLandingHardeningInput = {
  readonly model?: HosteleriaLandingContentModel;
  readonly implementationBoundary?: HosteleriaLandingImplementationBoundary;
  readonly attempt?: HosteleriaLandingHardeningAttempt;
};

export type HosteleriaLandingHardeningResult = {
  readonly valid: boolean;
  readonly state: HosteleriaLandingValidationState;
  readonly checks: readonly HosteleriaLandingValidationCheck[];
  readonly blockedReasons: readonly string[];
  readonly warnings: readonly string[];
  readonly implementationBoundary: HosteleriaLandingImplementationBoundary;
  readonly summary: string;
};

export const HOSTELERIA_LANDING_IMPLEMENTATION_BOUNDARY: HosteleriaLandingImplementationBoundary = {
  canBeUsedForFutureUi: false,
  canBeUsedForFuturePreviewAdapter: true,
  requiresExplicitImplementationCharter: true,
  requiresUxReview: true,
  requiresSecurityReview: true,
  requiresCopyApproval: true,
  allowsRealForms: false,
  allowsApiClient: false,
  allowsRealActivation: false,
  allowsRouteCreation: false,
  allowsPageCreation: false,
  allowsProductiveLanding: false,
  nextAllowedStep:
    "23.21 — Commercial landing preview adapter/boundary decision, sin UI productiva ni rutas reales.",
};

const ACTIVATION_CTA_PATTERN =
  /\b(activar|activa|crear|crea|publicar|publica|contratar|checkout|cobrar|pagar|reservar|takeaway|delivery)\b/i;

const PRICING_HARDCODE_PATTERN =
  /(\b\d+[,.]?\d*\s?(€|eur|euros|usd|\$)|(?:€|\$)\s?\d+[,.]?\d*)/i;

const API_CLIENT_PATTERN = /\b(apiClient|contactForm|formulario real|fetch real|endpoint real)\b/i;

const asCheck = (
  checkId: string,
  passed: boolean,
  message: string,
): HosteleriaLandingValidationCheck => ({
  checkId,
  passed,
  message,
});

const collectAttemptCopy = (attempt: HosteleriaLandingHardeningAttempt): readonly string[] => [
  ...(attempt.additionalPublicCopy ?? []),
  ...(attempt.proposedCtaLabels ?? []),
  ...(attempt.proposedPricingCopy ?? []),
];

const hasForbiddenActivationCta = (attempt: HosteleriaLandingHardeningAttempt): boolean =>
  (attempt.proposedCtaLabels ?? []).some((label) => ACTIVATION_CTA_PATTERN.test(label));

const hasPricingHardcode = (attempt: HosteleriaLandingHardeningAttempt): boolean =>
  (attempt.proposedPricingCopy ?? []).some((copy) => PRICING_HARDCODE_PATTERN.test(copy));

const hasApiClientCopy = (attempt: HosteleriaLandingHardeningAttempt): boolean =>
  collectAttemptCopy(attempt).some((copy) => API_CLIENT_PATTERN.test(copy));

const getBoundaryChecks = (
  boundary: HosteleriaLandingImplementationBoundary,
): readonly HosteleriaLandingValidationCheck[] => [
  asCheck(
    "implementationBoundary:noProductiveLanding",
    boundary.allowsProductiveLanding === false && boundary.canBeUsedForFutureUi === false,
    "Implementation boundary must keep productive UI/landing closed.",
  ),
  asCheck(
    "implementationBoundary:noRouteCreation",
    boundary.allowsRouteCreation === false,
    "Implementation boundary must not allow route creation.",
  ),
  asCheck(
    "implementationBoundary:noPageCreation",
    boundary.allowsPageCreation === false,
    "Implementation boundary must not allow page creation.",
  ),
  asCheck(
    "implementationBoundary:noApiClientUse",
    boundary.allowsApiClient === false,
    "Implementation boundary must not allow apiClient use.",
  ),
  asCheck(
    "implementationBoundary:noContactFormUse",
    boundary.allowsRealForms === false,
    "Implementation boundary must not allow real forms.",
  ),
  asCheck(
    "implementationBoundary:noRealActivation",
    boundary.allowsRealActivation === false,
    "Implementation boundary must not allow real activation.",
  ),
  asCheck(
    "implementationBoundary:requiredReviews",
    boundary.requiresExplicitImplementationCharter === true &&
      boundary.requiresUxReview === true &&
      boundary.requiresSecurityReview === true &&
      boundary.requiresCopyApproval === true,
    "Implementation boundary must require charter, UX review, security review and copy approval.",
  ),
];

const getAttemptChecks = (
  attempt: HosteleriaLandingHardeningAttempt,
): readonly HosteleriaLandingValidationCheck[] => [
  asCheck(
    "hardening:noProductiveLanding",
    attempt.enablesProductiveLanding !== true,
    "Attempt must not enable a productive landing.",
  ),
  asCheck("hardening:noRouteCreation", attempt.createsRoute !== true, "Attempt must not create routes."),
  asCheck("hardening:noPageCreation", attempt.createsPage !== true, "Attempt must not create pages."),
  asCheck("hardening:noApiClientUse", attempt.usesApiClient !== true, "Attempt must not use apiClient."),
  asCheck("hardening:noContactFormUse", attempt.usesContactForm !== true, "Attempt must not use contact forms."),
  asCheck("hardening:noRealData", attempt.usesRealData !== true, "Attempt must not use real data."),
  asCheck(
    "hardening:noActivationCta",
    !hasForbiddenActivationCta(attempt),
    "Attempt CTA must not look like activation, checkout, payment, booking, Takeaway or Delivery.",
  ),
  asCheck(
    "hardening:noPricingHardcode",
    !hasPricingHardcode(attempt),
    "Attempt must not include hardcoded pricing or monetary amounts.",
  ),
  asCheck(
    "hardening:noApiClientOrContactCopy",
    !hasApiClientCopy(attempt),
    "Attempt copy must not reference apiClient, contactForm, real fetch or real endpoints.",
  ),
];

const getModelHardeningChecks = (
  model: HosteleriaLandingContentModel,
): readonly HosteleriaLandingValidationCheck[] => [
  asCheck(
    "model:approvalChecklistPresent",
    model.approvalChecklist.length >= 10,
    "Approval checklist must remain present and strong.",
  ),
  asCheck(
    "model:noStandaloneDigitalMenu",
    model.capabilities.sellsStandaloneDigitalMenu === false,
    "Content model must not sell Carta Digital/QR as standalone.",
  ),
  asCheck(
    "model:noCustomerWebAsSource",
    model.capabilities.customerWebIsMenuSource === false,
    "Content model must keep customer web as non-source.",
  ),
  asCheck(
    "model:publicMenuOutputOnly",
    model.capabilities.publicMenuIsOutputOnly === true,
    "Content model must keep public-menu output only.",
  ),
  asCheck(
    "model:noFutureModulesOrOperations",
    model.capabilities.includesTakeaway === false &&
      model.capabilities.includesDelivery === false &&
      model.capabilities.includesReservationsLive === false &&
      model.capabilities.allowsPayments === false &&
      model.capabilities.opensExecute === false &&
      model.capabilities.usesLiveRead === false,
    "Content model must block Takeaway, Delivery, Reservas, payments, execute and live-read.",
  ),
];

export const validateHosteleriaLandingContentModelHardening = (
  input: HosteleriaLandingHardeningInput = {},
): HosteleriaLandingHardeningResult => {
  const model = input.model ?? HOSTELERIA_LANDING_CONTENT_MODEL_FOUNDATION;
  const boundary = input.implementationBoundary ?? HOSTELERIA_LANDING_IMPLEMENTATION_BOUNDARY;
  const attempt = input.attempt ?? {};
  const attemptCopy = collectAttemptCopy(attempt);
  const foundationValidation = validateHosteleriaLandingContentModel(model, attemptCopy);

  const checks = [
    ...foundationValidation.checks,
    ...getModelHardeningChecks(model),
    ...getBoundaryChecks(boundary),
    ...getAttemptChecks(attempt),
  ] as const;

  const failedChecks = checks.filter((check) => !check.passed);
  const blockedReasons = [
    ...foundationValidation.blockedReasons,
    ...failedChecks.map((check) => check.message),
  ];
  const warnings = foundationValidation.warnings;
  const valid = foundationValidation.valid && failedChecks.length === 0;

  return {
    valid,
    state: valid ? "passed" : "failed",
    checks,
    blockedReasons,
    warnings,
    implementationBoundary: boundary,
    summary: valid
      ? "23.20 hardening passed: content model remains foundation-only and implementation boundary is closed before UI/routes/forms/API."
      : "23.20 hardening failed: unsafe implementation drift, CTA, pricing, API/form use or boundary opening detected.",
  };
};
