import {
  createHosteleriaLandingPreviewDescriptor,
  validateHosteleriaLandingPreviewDescriptor,
  type HosteleriaLandingPreviewBadge,
  type HosteleriaLandingPreviewCtaDescriptor,
  type HosteleriaLandingPreviewDescriptor,
  type HosteleriaLandingPreviewSection,
} from "./hosteleriaLandingPreviewAdapterFoundation";
import {
  type HosteleriaLandingCapabilityFlags,
  type HosteleriaLandingCtaKind,
  type HosteleriaLandingRiskLevel,
  type HosteleriaLandingSectionId,
  type HosteleriaLandingValidationCheck,
  type HosteleriaLandingValidationState,
} from "./hosteleriaLandingContentModelFoundation";
import { type HosteleriaLandingImplementationBoundary } from "./hosteleriaLandingContentModelHardening";

export type HosteleriaLandingPreviewShellSlotStatus = "shell_slot_foundation";
export type HosteleriaLandingPreviewShellSlotMode = "foundation_only";

export type HosteleriaLandingPreviewShellSlotRegion = {
  readonly regionId: HosteleriaLandingSectionId;
  readonly sourcePreviewSectionId: HosteleriaLandingSectionId;
  readonly title: string;
  readonly body: string;
  readonly displayOnly: true;
  readonly sourceRiskLevel: HosteleriaLandingRiskLevel;
};

export type HosteleriaLandingPreviewShellSlotNotice = {
  readonly noticeId: string;
  readonly label: string;
  readonly severity: "info" | "warning" | "blocked";
  readonly source: "badge" | "warning" | "shell-slot-boundary";
};

export type HosteleriaLandingPreviewShellSlotCta = {
  readonly ctaId: string;
  readonly label: string;
  readonly intent: HosteleriaLandingCtaKind;
  readonly enabled: false;
  readonly isRealAction: false;
  readonly reasonBlocked: string;
};

export type HosteleriaLandingPreviewShellSlotBlockedFlags = {
  readonly noProductiveSlot: true;
  readonly noUi: true;
  readonly noRouteCreation: true;
  readonly noPageCreation: true;
  readonly noRealCta: true;
  readonly noRealForms: true;
  readonly noApiClient: true;
  readonly noRealActivation: true;
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

export type HosteleriaLandingPreviewShellSlotDescriptor = {
  readonly slotId: "motanos-hosteleria-commercial-landing-preview-shell-slot-23-24";
  readonly sourcePreviewId: HosteleriaLandingPreviewDescriptor["previewId"];
  readonly status: HosteleriaLandingPreviewShellSlotStatus;
  readonly mode: HosteleriaLandingPreviewShellSlotMode;
  readonly isProductiveSlot: false;
  readonly createsUi: false;
  readonly createsRoute: false;
  readonly createsPage: false;
  readonly regions: readonly HosteleriaLandingPreviewShellSlotRegion[];
  readonly notices: readonly HosteleriaLandingPreviewShellSlotNotice[];
  readonly blockedCtaSlots: readonly HosteleriaLandingPreviewShellSlotCta[];
  readonly blockedFlags: HosteleriaLandingPreviewShellSlotBlockedFlags;
  readonly capabilities: HosteleriaLandingCapabilityFlags;
  readonly implementationBoundary: HosteleriaLandingImplementationBoundary;
  readonly summary: string;
};

export type HosteleriaLandingPreviewShellSlotValidationResult = {
  readonly valid: boolean;
  readonly state: HosteleriaLandingValidationState;
  readonly checks: readonly HosteleriaLandingValidationCheck[];
  readonly blockedReasons: readonly string[];
  readonly warnings: readonly string[];
  readonly summary: string;
};

export const HOSTELERIA_LANDING_PREVIEW_SHELL_SLOT_BLOCKED_FLAGS: HosteleriaLandingPreviewShellSlotBlockedFlags = {
  noProductiveSlot: true,
  noUi: true,
  noRouteCreation: true,
  noPageCreation: true,
  noRealCta: true,
  noRealForms: true,
  noApiClient: true,
  noRealActivation: true,
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

const REQUIRED_NOTICE_LABELS: readonly string[] = [
  "Foundation only",
  "No landing productiva",
  "No UI real",
  "No route/page",
  "No activación real",
  "No checkout",
  "No pagos",
  "No Takeaway",
  "No Delivery",
  "No Reservas live",
  "No execute",
  "No live-read",
  "Carta Digital dentro de MotanOS",
  "Public-menu output only",
  "Web cliente no fuente",
];

const toCheck = (checkId: string, passed: boolean, message: string): HosteleriaLandingValidationCheck => ({
  checkId,
  passed,
  message,
});

const slugifyNoticeId = (label: string): string =>
  label
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const createRegionFromPreviewSection = (
  section: HosteleriaLandingPreviewSection,
): HosteleriaLandingPreviewShellSlotRegion => ({
  regionId: section.previewSectionId,
  sourcePreviewSectionId: section.previewSectionId,
  title: section.title,
  body: section.body,
  displayOnly: true,
  sourceRiskLevel: section.sourceRiskLevel,
});

const createNoticeFromBadge = (badge: HosteleriaLandingPreviewBadge): HosteleriaLandingPreviewShellSlotNotice => ({
  noticeId: badge.badgeId,
  label: badge.label,
  severity: badge.severity,
  source: "badge",
});

const createNoticeFromWarning = (warning: string, index: number): HosteleriaLandingPreviewShellSlotNotice => ({
  noticeId: `preview-warning-${index + 1}`,
  label: warning,
  severity: "warning",
  source: "warning",
});

const createRequiredBoundaryNotices = (): readonly HosteleriaLandingPreviewShellSlotNotice[] => [
  { noticeId: "no-ui-real", label: "No UI real", severity: "blocked", source: "shell-slot-boundary" },
  { noticeId: "no-route-page", label: "No route/page", severity: "blocked", source: "shell-slot-boundary" },
];

const createBlockedCtaSlot = (
  cta: HosteleriaLandingPreviewCtaDescriptor,
): HosteleriaLandingPreviewShellSlotCta => ({
  ctaId: cta.ctaId,
  label: cta.label,
  intent: cta.intent,
  enabled: false,
  isRealAction: false,
  reasonBlocked: cta.reasonDisabled,
});

export const createHosteleriaLandingPreviewShellSlotSummary = (
  descriptor?: Pick<HosteleriaLandingPreviewShellSlotDescriptor, "slotId" | "sourcePreviewId" | "mode">,
): string =>
  [
    "23.24 commercial landing preview shell-slot foundation.",
    descriptor
      ? `${descriptor.slotId} maps ${descriptor.sourcePreviewId} as ${descriptor.mode}.`
      : "Maps the 23.22 preview descriptor to safe shell-slot descriptors.",
    "Shell-slot is TS-only: no UI, no routes, no forms, no apiClient and no real data.",
    "Blocked CTA slots remain disabled and non-real.",
    "Carta Digital/QR remains inside MotanOS Hosteleria; public-menu is output only and customer web is not the menu source.",
    "Next recommended block: 23.25 commercial landing preview shell-slot hardening / route boundary decision, sin UI productiva ni rutas reales.",
  ].join(" ");

export const createHosteleriaLandingPreviewShellSlotDescriptor = (
  preview: HosteleriaLandingPreviewDescriptor = createHosteleriaLandingPreviewDescriptor(),
): HosteleriaLandingPreviewShellSlotDescriptor => {
  const descriptorBase = {
    slotId: "motanos-hosteleria-commercial-landing-preview-shell-slot-23-24",
    sourcePreviewId: preview.previewId,
    status: "shell_slot_foundation",
    mode: "foundation_only",
    isProductiveSlot: false,
    createsUi: false,
    createsRoute: false,
    createsPage: false,
  } as const;

  return {
    ...descriptorBase,
    regions: preview.sections.map(createRegionFromPreviewSection),
    notices: [
      ...preview.badges.map(createNoticeFromBadge),
      ...preview.warnings.map(createNoticeFromWarning),
      ...createRequiredBoundaryNotices(),
    ],
    blockedCtaSlots: preview.ctaDescriptors.map(createBlockedCtaSlot),
    blockedFlags: HOSTELERIA_LANDING_PREVIEW_SHELL_SLOT_BLOCKED_FLAGS,
    capabilities: preview.capabilities,
    implementationBoundary: preview.implementationBoundary,
    summary: createHosteleriaLandingPreviewShellSlotSummary(descriptorBase),
  };
};

const hasRequiredNotices = (descriptor: HosteleriaLandingPreviewShellSlotDescriptor): boolean => {
  const labels = new Set(descriptor.notices.map((notice) => notice.label));
  return REQUIRED_NOTICE_LABELS.every((label) => labels.has(label));
};

const hasClosedBlockedFlags = (flags: HosteleriaLandingPreviewShellSlotBlockedFlags): boolean =>
  (Object.keys(HOSTELERIA_LANDING_PREVIEW_SHELL_SLOT_BLOCKED_FLAGS) as Array<
    keyof HosteleriaLandingPreviewShellSlotBlockedFlags
  >).every((key) => flags[key] === HOSTELERIA_LANDING_PREVIEW_SHELL_SLOT_BLOCKED_FLAGS[key]);

const collectSlotCopy = (descriptor: HosteleriaLandingPreviewShellSlotDescriptor): readonly string[] => [
  descriptor.slotId,
  descriptor.sourcePreviewId,
  descriptor.status,
  descriptor.mode,
  ...descriptor.regions.flatMap((region) => [
    region.regionId,
    region.sourcePreviewSectionId,
    region.title,
    region.body,
  ]),
  ...descriptor.notices.map((notice) => notice.label),
  ...descriptor.blockedCtaSlots.flatMap((cta) => [
    cta.ctaId,
    cta.label,
    cta.intent,
    cta.reasonBlocked,
  ]),
  descriptor.summary,
];

export const validateHosteleriaLandingPreviewShellSlotDescriptor = (
  descriptor: HosteleriaLandingPreviewShellSlotDescriptor = createHosteleriaLandingPreviewShellSlotDescriptor(),
): HosteleriaLandingPreviewShellSlotValidationResult => {
  const sourcePreview = createHosteleriaLandingPreviewDescriptor();
  const previewValidation = validateHosteleriaLandingPreviewDescriptor(sourcePreview);
  const slotCopy = collectSlotCopy(descriptor);

  const checks: readonly HosteleriaLandingValidationCheck[] = [
    ...previewValidation.checks,
    toCheck(
      "shellSlot:identity",
      descriptor.slotId === "motanos-hosteleria-commercial-landing-preview-shell-slot-23-24" &&
        descriptor.sourcePreviewId === sourcePreview.previewId,
      "Shell-slot descriptor must keep the 23.24 id and source the 23.22 preview id.",
    ),
    toCheck(
      "shellSlot:foundationOnly",
      descriptor.status === "shell_slot_foundation" &&
        descriptor.mode === "foundation_only" &&
        descriptor.isProductiveSlot === false,
      "Shell-slot descriptor must remain foundation_only and non-productive.",
    ),
    toCheck(
      "shellSlot:noUiRoutePage",
      descriptor.createsUi === false &&
        descriptor.createsRoute === false &&
        descriptor.createsPage === false,
      "Shell-slot descriptor must not create UI, routes or pages.",
    ),
    toCheck(
      "shellSlot:regions",
      descriptor.regions.length === sourcePreview.sections.length &&
        descriptor.regions.every((region) => region.displayOnly === true),
      "Shell-slot regions must mirror preview sections as display-only regions.",
    ),
    toCheck(
      "shellSlot:noticesRequired",
      hasRequiredNotices(descriptor),
      "Shell-slot descriptor must include every required safety notice.",
    ),
    toCheck(
      "shellSlot:blockedCtaSlots",
      descriptor.blockedCtaSlots.length === sourcePreview.ctaDescriptors.length &&
        descriptor.blockedCtaSlots.every((cta) => cta.enabled === false && cta.isRealAction === false),
      "Shell-slot CTA slots must stay blocked, disabled and non-real.",
    ),
    toCheck(
      "shellSlot:blockedFlagsClosed",
      hasClosedBlockedFlags(descriptor.blockedFlags),
      "Shell-slot blocked flags must remain closed.",
    ),
    toCheck(
      "shellSlot:noRealFormsApiActivation",
      descriptor.implementationBoundary.allowsRealForms === false &&
        descriptor.implementationBoundary.allowsApiClient === false &&
        descriptor.implementationBoundary.allowsRealActivation === false,
      "Shell-slot descriptor must inherit closed forms, apiClient and activation boundary.",
    ),
    toCheck(
      "shellSlot:noRoutesPagesProductiveLanding",
      descriptor.implementationBoundary.allowsRouteCreation === false &&
        descriptor.implementationBoundary.allowsPageCreation === false &&
        descriptor.implementationBoundary.allowsProductiveLanding === false,
      "Shell-slot descriptor must not allow routes, pages or productive landing.",
    ),
    toCheck(
      "shellSlot:noRealDataCheckoutPaymentsFutureModules",
      descriptor.capabilities.usesRealData === false &&
        descriptor.capabilities.allowsCheckout === false &&
        descriptor.capabilities.allowsPayments === false &&
        descriptor.capabilities.includesTakeaway === false &&
        descriptor.capabilities.includesDelivery === false &&
        descriptor.capabilities.includesReservationsLive === false &&
        descriptor.capabilities.opensExecute === false &&
        descriptor.capabilities.usesLiveRead === false,
      "Shell-slot descriptor must block real data, checkout, payments, Takeaway, Delivery, Reservas, execute and live-read.",
    ),
    toCheck(
      "shellSlot:noStandaloneDigitalMenuOrCustomerWebSource",
      descriptor.capabilities.sellsStandaloneDigitalMenu === false &&
        descriptor.capabilities.customerWebIsMenuSource === false &&
        descriptor.capabilities.publicMenuIsOutputOnly === true,
      "Shell-slot descriptor must keep Carta Digital inside MotanOS, public-menu output-only and customer web non-source.",
    ),
    toCheck(
      "shellSlot:noSecrets",
      !slotCopy.some((copy) => SECRET_OR_ENV_PATTERN.test(copy)),
      "Shell-slot descriptor must not include service_role, secrets or env references.",
    ),
  ];

  const failedChecks = checks.filter((check) => !check.passed);
  const blockedReasons = [
    ...previewValidation.blockedReasons,
    ...failedChecks.map((check) => check.message),
  ];
  const warnings = [
    ...descriptor.notices
      .filter((notice) => notice.severity === "warning")
      .map((notice) => notice.label),
    ...previewValidation.warnings,
  ];
  const valid = previewValidation.valid && failedChecks.length === 0;

  return {
    valid,
    state: valid ? "passed" : "failed",
    checks,
    blockedReasons,
    warnings,
    summary: valid
      ? "23.24 shell-slot foundation passed: slot descriptor is display-only, CTA slots are blocked and all boundaries remain closed."
      : "23.24 shell-slot foundation failed: unsafe shell-slot descriptor drift detected.",
  };
};
