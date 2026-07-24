import {
  HOSTELERIA_LANDING_CONTENT_MODEL_FOUNDATION,
  validateHosteleriaLandingContentModel,
  type HosteleriaLandingCapabilityFlags,
  type HosteleriaLandingContentModel,
  type HosteleriaLandingCtaKind,
  type HosteleriaLandingRiskLevel,
  type HosteleriaLandingSectionId,
  type HosteleriaLandingValidationCheck,
  type HosteleriaLandingValidationState,
} from "./hosteleriaLandingContentModelFoundation";
import {
  HOSTELERIA_LANDING_IMPLEMENTATION_BOUNDARY,
  validateHosteleriaLandingContentModelHardening,
  type HosteleriaLandingImplementationBoundary,
} from "./hosteleriaLandingContentModelHardening";

export type HosteleriaLandingPreviewStatus = "preview_adapter_foundation";
export type HosteleriaLandingPreviewMode = "foundation_only";

export type HosteleriaLandingPreviewBadgeId =
  | "controlled-demo"
  | "foundation-only"
  | "no-productive-landing"
  | "no-real-activation"
  | "no-checkout"
  | "no-payments"
  | "no-takeaway"
  | "no-delivery"
  | "no-reservations-live"
  | "no-execute"
  | "no-live-read"
  | "digital-menu-inside-motanos"
  | "public-menu-output-only"
  | "customer-web-not-source";

export type HosteleriaLandingPreviewBadge = {
  readonly badgeId: HosteleriaLandingPreviewBadgeId;
  readonly label: string;
  readonly severity: "info" | "warning" | "blocked";
};

export type HosteleriaLandingPreviewSection = {
  readonly previewSectionId: HosteleriaLandingSectionId;
  readonly title: string;
  readonly body: string;
  readonly displayOnly: true;
  readonly sourceRiskLevel: HosteleriaLandingRiskLevel;
  readonly allowedClaims: readonly string[];
  readonly blockedClaims: readonly string[];
};

export type HosteleriaLandingPreviewHero = {
  readonly sourceVariantId: string;
  readonly headline: string;
  readonly subheadline: string;
  readonly supportingCopy: string;
  readonly displayOnly: true;
};

export type HosteleriaLandingPreviewCtaDescriptor = {
  readonly ctaId: string;
  readonly label: string;
  readonly intent: HosteleriaLandingCtaKind;
  readonly enabled: false;
  readonly reasonDisabled: string;
  readonly isRealAction: false;
};

export type HosteleriaLandingPreviewFaqDescriptor = {
  readonly question: string;
  readonly answer: string;
  readonly displayOnly: true;
};

export type HosteleriaLandingPreviewBlockedFlags = {
  readonly noProductivePreview: true;
  readonly noRealCta: true;
  readonly noRealForms: true;
  readonly noApiClient: true;
  readonly noRealActivation: true;
  readonly noRouteCreation: true;
  readonly noPageCreation: true;
  readonly noRealData: true;
  readonly noCheckout: true;
  readonly noPayments: true;
  readonly noTakeaway: true;
  readonly noDelivery: true;
  readonly noReservationsLive: true;
  readonly noExecute: true;
  readonly noLiveRead: true;
  readonly noStandaloneDigitalMenu: true;
  readonly noCustomerWebAsMenuSource: true;
  readonly publicMenuOutputOnly: true;
};

export type HosteleriaLandingPreviewDescriptor = {
  readonly previewId: "motanos-hosteleria-commercial-landing-preview-adapter-23-22";
  readonly sourceLandingId: HosteleriaLandingContentModel["landingId"];
  readonly status: HosteleriaLandingPreviewStatus;
  readonly mode: HosteleriaLandingPreviewMode;
  readonly isProductivePreview: false;
  readonly sections: readonly HosteleriaLandingPreviewSection[];
  readonly hero: HosteleriaLandingPreviewHero;
  readonly ctaDescriptors: readonly HosteleriaLandingPreviewCtaDescriptor[];
  readonly faqDescriptors: readonly HosteleriaLandingPreviewFaqDescriptor[];
  readonly badges: readonly HosteleriaLandingPreviewBadge[];
  readonly warnings: readonly string[];
  readonly blockedFlags: HosteleriaLandingPreviewBlockedFlags;
  readonly capabilities: HosteleriaLandingCapabilityFlags;
  readonly implementationBoundary: HosteleriaLandingImplementationBoundary;
  readonly summary: string;
};

export type HosteleriaLandingPreviewValidationResult = {
  readonly valid: boolean;
  readonly state: HosteleriaLandingValidationState;
  readonly checks: readonly HosteleriaLandingValidationCheck[];
  readonly blockedReasons: readonly string[];
  readonly warnings: readonly string[];
  readonly summary: string;
};

export const HOSTELERIA_LANDING_PREVIEW_REQUIRED_BADGES: readonly HosteleriaLandingPreviewBadge[] = [
  { badgeId: "controlled-demo", label: "Demo controlada", severity: "info" },
  { badgeId: "foundation-only", label: "Foundation only", severity: "info" },
  { badgeId: "no-productive-landing", label: "No landing productiva", severity: "blocked" },
  { badgeId: "no-real-activation", label: "No activación real", severity: "blocked" },
  { badgeId: "no-checkout", label: "No checkout", severity: "blocked" },
  { badgeId: "no-payments", label: "No pagos", severity: "blocked" },
  { badgeId: "no-takeaway", label: "No Takeaway", severity: "blocked" },
  { badgeId: "no-delivery", label: "No Delivery", severity: "blocked" },
  { badgeId: "no-reservations-live", label: "No Reservas live", severity: "blocked" },
  { badgeId: "no-execute", label: "No execute", severity: "blocked" },
  { badgeId: "no-live-read", label: "No live-read", severity: "blocked" },
  { badgeId: "digital-menu-inside-motanos", label: "Carta Digital dentro de MotanOS", severity: "warning" },
  { badgeId: "public-menu-output-only", label: "Public-menu output only", severity: "warning" },
  { badgeId: "customer-web-not-source", label: "Web cliente no fuente", severity: "warning" },
];

export const HOSTELERIA_LANDING_PREVIEW_BLOCKED_FLAGS: HosteleriaLandingPreviewBlockedFlags = {
  noProductivePreview: true,
  noRealCta: true,
  noRealForms: true,
  noApiClient: true,
  noRealActivation: true,
  noRouteCreation: true,
  noPageCreation: true,
  noRealData: true,
  noCheckout: true,
  noPayments: true,
  noTakeaway: true,
  noDelivery: true,
  noReservationsLive: true,
  noExecute: true,
  noLiveRead: true,
  noStandaloneDigitalMenu: true,
  noCustomerWebAsMenuSource: true,
  publicMenuOutputOnly: true,
};

const SECRET_OR_ENV_PATTERN = /(service_role|SUPABASE_SERVICE_ROLE_KEY|secret|secrets|\.env)/i;

const toCheck = (checkId: string, passed: boolean, message: string): HosteleriaLandingValidationCheck => ({
  checkId,
  passed,
  message,
});

const createWarnings = (
  capabilities: HosteleriaLandingCapabilityFlags,
  implementationBoundary: HosteleriaLandingImplementationBoundary,
): readonly string[] => [
  "Preview adapter foundation only: no UI, no React component, no page.tsx and no route.ts.",
  "CTA descriptors are disabled metadata, not executable actions.",
  "No real forms, apiClient, real data, checkout, payments, activation, execute or live-read are allowed.",
  capabilities.publicMenuIsOutputOnly
    ? "public-menu remains output only."
    : "public-menu output-only boundary is broken.",
  capabilities.customerWebIsMenuSource === false
    ? "Customer web is not the menu source."
    : "Customer web source boundary is broken.",
  implementationBoundary.canBeUsedForFuturePreviewAdapter
    ? "Implementation boundary allows this TS-only preview adapter foundation."
    : "Implementation boundary does not allow a preview adapter.",
];

export const createHosteleriaLandingPreviewSummary = (
  descriptor?: Pick<HosteleriaLandingPreviewDescriptor, "previewId" | "sourceLandingId" | "mode">,
): string =>
  [
    "23.22 commercial landing preview adapter foundation.",
    descriptor
      ? `${descriptor.previewId} maps ${descriptor.sourceLandingId} as ${descriptor.mode}.`
      : "Maps the 23.19 content model to safe preview descriptors.",
    "Preview adapter is TS-only: no UI, no routes, no forms, no apiClient and no real data.",
    "CTA descriptors remain disabled and non-real.",
    "Carta Digital/QR remains inside MotanOS Hosteleria; public-menu is output only and customer web is not the menu source.",
    "Next recommended block: 23.23 commercial landing preview adapter hardening / shell-slot decision, sin UI productiva ni rutas reales.",
  ].join(" ");

export const createHosteleriaLandingPreviewDescriptor = (
  model: HosteleriaLandingContentModel = HOSTELERIA_LANDING_CONTENT_MODEL_FOUNDATION,
  implementationBoundary: HosteleriaLandingImplementationBoundary = HOSTELERIA_LANDING_IMPLEMENTATION_BOUNDARY,
): HosteleriaLandingPreviewDescriptor => {
  const heroSource = model.heroVariants[0];
  if (!heroSource) {
    throw new Error("Hosteleria landing preview adapter requires at least one safe hero variant.");
  }

  const descriptorBase = {
    previewId: "motanos-hosteleria-commercial-landing-preview-adapter-23-22",
    sourceLandingId: model.landingId,
    status: "preview_adapter_foundation",
    mode: "foundation_only",
    isProductivePreview: false,
  } as const;

  return {
    ...descriptorBase,
    hero: {
      sourceVariantId: heroSource.variantId,
      headline: heroSource.headline,
      subheadline: heroSource.subheadline,
      supportingCopy: heroSource.supportingCopy,
      displayOnly: true,
    },
    sections: model.sections.map((section) => ({
      previewSectionId: section.sectionId,
      title: section.title,
      body: section.body,
      displayOnly: true,
      sourceRiskLevel: section.riskLevel,
      allowedClaims: section.allowedClaims,
      blockedClaims: section.blockedClaims,
    })),
    ctaDescriptors: model.cta.map((cta) => ({
      ctaId: cta.ctaId,
      label: cta.label,
      intent: cta.kind,
      enabled: false,
      reasonDisabled:
        "23.22 preview adapter foundation only describes CTA metadata: no account creation, checkout, forms or client activation.",
      isRealAction: false,
    })),
    faqDescriptors: model.faq.map((faq) => ({
      question: faq.question,
      answer: faq.answer,
      displayOnly: true,
    })),
    badges: HOSTELERIA_LANDING_PREVIEW_REQUIRED_BADGES,
    warnings: createWarnings(model.capabilities, implementationBoundary),
    blockedFlags: HOSTELERIA_LANDING_PREVIEW_BLOCKED_FLAGS,
    capabilities: model.capabilities,
    implementationBoundary,
    summary: createHosteleriaLandingPreviewSummary(descriptorBase),
  };
};

const hasEveryRequiredBadge = (descriptor: HosteleriaLandingPreviewDescriptor): boolean => {
  const badgeIds = new Set(descriptor.badges.map((badge) => badge.badgeId));
  return HOSTELERIA_LANDING_PREVIEW_REQUIRED_BADGES.every((badge) => badgeIds.has(badge.badgeId));
};

const hasClosedBlockedFlags = (flags: HosteleriaLandingPreviewBlockedFlags): boolean =>
  (Object.keys(HOSTELERIA_LANDING_PREVIEW_BLOCKED_FLAGS) as Array<
    keyof HosteleriaLandingPreviewBlockedFlags
  >).every((key) => flags[key] === HOSTELERIA_LANDING_PREVIEW_BLOCKED_FLAGS[key]);

const collectDescriptorCopy = (descriptor: HosteleriaLandingPreviewDescriptor): readonly string[] => [
  descriptor.previewId,
  descriptor.sourceLandingId,
  descriptor.status,
  descriptor.mode,
  descriptor.hero.headline,
  descriptor.hero.subheadline,
  descriptor.hero.supportingCopy,
  ...descriptor.sections.flatMap((section) => [
    section.title,
    section.body,
    ...section.allowedClaims,
  ]),
  ...descriptor.ctaDescriptors.flatMap((cta) => [
    cta.label,
    cta.intent,
    cta.reasonDisabled,
  ]),
  ...descriptor.faqDescriptors.flatMap((faq) => [faq.question, faq.answer]),
  ...descriptor.badges.map((badge) => badge.label),
  ...descriptor.warnings,
  descriptor.summary,
];

const collectDescriptorPublicCopy = (
  descriptor: HosteleriaLandingPreviewDescriptor,
): readonly string[] => [
  descriptor.hero.headline,
  descriptor.hero.subheadline,
  descriptor.hero.supportingCopy,
  ...descriptor.sections.flatMap((section) => [
    section.title,
    section.body,
    ...section.allowedClaims,
  ]),
  ...descriptor.ctaDescriptors.flatMap((cta) => [
    cta.label,
    cta.reasonDisabled,
  ]),
  ...descriptor.faqDescriptors.flatMap((faq) => [faq.question, faq.answer]),
];

export const validateHosteleriaLandingPreviewDescriptor = (
  descriptor: HosteleriaLandingPreviewDescriptor = createHosteleriaLandingPreviewDescriptor(),
): HosteleriaLandingPreviewValidationResult => {
  const foundationValidation = validateHosteleriaLandingContentModel(
    HOSTELERIA_LANDING_CONTENT_MODEL_FOUNDATION,
    collectDescriptorPublicCopy(descriptor),
  );
  const hardeningValidation = validateHosteleriaLandingContentModelHardening({
    implementationBoundary: descriptor.implementationBoundary,
  });
  const descriptorCopy = collectDescriptorCopy(descriptor);

  const checks: readonly HosteleriaLandingValidationCheck[] = [
    ...foundationValidation.checks,
    ...hardeningValidation.checks,
    toCheck(
      "preview:identity",
      descriptor.previewId === "motanos-hosteleria-commercial-landing-preview-adapter-23-22" &&
        descriptor.sourceLandingId === HOSTELERIA_LANDING_CONTENT_MODEL_FOUNDATION.landingId,
      "Preview descriptor must keep the 23.22 id and source the 23.19 landing id.",
    ),
    toCheck(
      "preview:foundationOnly",
      descriptor.status === "preview_adapter_foundation" &&
        descriptor.mode === "foundation_only" &&
        descriptor.isProductivePreview === false,
      "Preview descriptor must remain foundation_only and non-productive.",
    ),
    toCheck(
      "preview:sections",
      descriptor.sections.length === HOSTELERIA_LANDING_CONTENT_MODEL_FOUNDATION.sections.length &&
        descriptor.sections.every((section) => section.displayOnly === true),
      "Preview sections must mirror content model sections as display-only descriptors.",
    ),
    toCheck(
      "preview:ctaDisabled",
      descriptor.ctaDescriptors.every((cta) => cta.enabled === false && cta.isRealAction === false),
      "CTA descriptors must stay disabled and non-real.",
    ),
    toCheck(
      "preview:faqDisplayOnly",
      descriptor.faqDescriptors.length === HOSTELERIA_LANDING_CONTENT_MODEL_FOUNDATION.faq.length &&
        descriptor.faqDescriptors.every((faq) => faq.displayOnly === true),
      "FAQ descriptors must stay display-only.",
    ),
    toCheck(
      "preview:badgesRequired",
      hasEveryRequiredBadge(descriptor),
      "Preview descriptor must include every required safety badge.",
    ),
    toCheck(
      "preview:blockedFlagsClosed",
      hasClosedBlockedFlags(descriptor.blockedFlags),
      "Preview descriptor blocked flags must remain closed.",
    ),
    toCheck(
      "preview:noRealFormsApiActivation",
      descriptor.implementationBoundary.allowsRealForms === false &&
        descriptor.implementationBoundary.allowsApiClient === false &&
        descriptor.implementationBoundary.allowsRealActivation === false,
      "Preview descriptor must inherit closed forms, apiClient and real activation boundary.",
    ),
    toCheck(
      "preview:noRoutesPagesProductiveLanding",
      descriptor.implementationBoundary.allowsRouteCreation === false &&
        descriptor.implementationBoundary.allowsPageCreation === false &&
        descriptor.implementationBoundary.allowsProductiveLanding === false,
      "Preview descriptor must not allow routes, pages or productive landing.",
    ),
    toCheck(
      "preview:noRealDataCheckoutPaymentsFutureModules",
      descriptor.capabilities.usesRealData === false &&
        descriptor.capabilities.allowsCheckout === false &&
        descriptor.capabilities.allowsPayments === false &&
        descriptor.capabilities.includesTakeaway === false &&
        descriptor.capabilities.includesDelivery === false &&
        descriptor.capabilities.includesReservationsLive === false &&
        descriptor.capabilities.opensExecute === false &&
        descriptor.capabilities.usesLiveRead === false,
      "Preview descriptor must block real data, checkout, payments, Takeaway, Delivery, Reservas, execute and live-read.",
    ),
    toCheck(
      "preview:noStandaloneDigitalMenuOrCustomerWebSource",
      descriptor.capabilities.sellsStandaloneDigitalMenu === false &&
        descriptor.capabilities.customerWebIsMenuSource === false &&
        descriptor.capabilities.publicMenuIsOutputOnly === true,
      "Preview descriptor must keep Carta Digital inside MotanOS, public-menu output-only and customer web non-source.",
    ),
    toCheck(
      "preview:noSecrets",
      !descriptorCopy.some((copy) => SECRET_OR_ENV_PATTERN.test(copy)),
      "Preview descriptor must not include service_role, secrets or env references.",
    ),
  ];

  const failedChecks = checks.filter((check) => !check.passed);
  const blockedReasons = [
    ...foundationValidation.blockedReasons,
    ...hardeningValidation.blockedReasons,
    ...failedChecks.map((check) => check.message),
  ];
  const warnings = [...descriptor.warnings, ...foundationValidation.warnings, ...hardeningValidation.warnings];
  const valid = foundationValidation.valid && hardeningValidation.valid && failedChecks.length === 0;

  return {
    valid,
    state: valid ? "passed" : "failed",
    checks,
    blockedReasons,
    warnings,
    summary: valid
      ? "23.22 preview adapter foundation passed: descriptor is display-only, CTA are disabled and all implementation boundaries remain closed."
      : "23.22 preview adapter foundation failed: unsafe preview descriptor drift detected.",
  };
};
