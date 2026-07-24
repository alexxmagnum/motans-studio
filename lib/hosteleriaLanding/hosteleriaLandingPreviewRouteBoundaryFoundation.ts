import {
  createHosteleriaLandingPreviewShellSlotDescriptor,
  validateHosteleriaLandingPreviewShellSlotDescriptor,
  type HosteleriaLandingPreviewShellSlotDescriptor,
} from "./hosteleriaLandingPreviewShellSlotFoundation";
import {
  type HosteleriaLandingValidationCheck,
  type HosteleriaLandingValidationState,
} from "./hosteleriaLandingContentModelFoundation";

export type HosteleriaLandingPreviewRouteBoundaryStatus = "preview_boundary";

export type HosteleriaLandingPreviewRouteBoundaryBlockedModule =
  | "Takeaway"
  | "Delivery"
  | "Reservas live"
  | "Pagos/caja real"
  | "Execute"
  | "Live-read"
  | "Activacion real"
  | "Cliente real productivo";

export type HosteleriaLandingPreviewRouteBoundaryBlockedClaim =
  | "Carta Digital como producto suelto"
  | "Web cliente como fuente real de carta"
  | "Public-menu como fuente real"
  | "Alta automatica lista"
  | "Checkout/pagos listos"
  | "Backend/API real conectado";

export type HosteleriaLandingPreviewRouteBoundaryCommercialBoundaries = {
  readonly digitalMenuInsideMotanos: true;
  readonly publicMenuOutputOnly: true;
  readonly customerWebIsMenuSource: false;
  readonly msManagerSeparateFromMotanosClient: true;
};

export type HosteleriaLandingPreviewRouteBoundaryMetadata = {
  readonly routeId: "motanos-hosteleria-commercial-landing-preview-route-boundary-23-26";
  readonly sourceSlotId: HosteleriaLandingPreviewShellSlotDescriptor["slotId"];
  readonly routeStatus: HosteleriaLandingPreviewRouteBoundaryStatus;
  readonly createsRealRoute: false;
  readonly createsProductiveRoute: false;
  readonly createsPageFile: false;
  readonly createsRouteHandler: false;
  readonly rendererImplementationPending: true;
  readonly usesFixtureOrFoundationOnly: true;
  readonly allowsRealData: false;
  readonly allowsRealActions: false;
  readonly allowsForms: false;
  readonly allowsApiClient: false;
  readonly allowsActivation: false;
  readonly allowsCheckout: false;
  readonly allowsPayments: false;
  readonly blockedModules: readonly HosteleriaLandingPreviewRouteBoundaryBlockedModule[];
  readonly blockedClaims: readonly HosteleriaLandingPreviewRouteBoundaryBlockedClaim[];
  readonly commercialBoundaries: HosteleriaLandingPreviewRouteBoundaryCommercialBoundaries;
  readonly implementationRequirements: readonly string[];
  readonly summary: string;
};

export type HosteleriaLandingPreviewRouteBoundaryValidationResult = {
  readonly valid: boolean;
  readonly state: HosteleriaLandingValidationState;
  readonly checks: readonly HosteleriaLandingValidationCheck[];
  readonly blockedReasons: readonly string[];
  readonly warnings: readonly string[];
  readonly summary: string;
};

export const HOSTELERIA_LANDING_PREVIEW_ROUTE_BOUNDARY_REQUIRED_BLOCKED_MODULES: readonly HosteleriaLandingPreviewRouteBoundaryBlockedModule[] =
  [
    "Takeaway",
    "Delivery",
    "Reservas live",
    "Pagos/caja real",
    "Execute",
    "Live-read",
    "Activacion real",
    "Cliente real productivo",
  ];

export const HOSTELERIA_LANDING_PREVIEW_ROUTE_BOUNDARY_REQUIRED_BLOCKED_CLAIMS: readonly HosteleriaLandingPreviewRouteBoundaryBlockedClaim[] =
  [
    "Carta Digital como producto suelto",
    "Web cliente como fuente real de carta",
    "Public-menu como fuente real",
    "Alta automatica lista",
    "Checkout/pagos listos",
    "Backend/API real conectado",
  ];

export const HOSTELERIA_LANDING_PREVIEW_ROUTE_BOUNDARY_COMMERCIAL_BOUNDARIES: HosteleriaLandingPreviewRouteBoundaryCommercialBoundaries =
  {
    digitalMenuInsideMotanos: true,
    publicMenuOutputOnly: true,
    customerWebIsMenuSource: false,
    msManagerSeparateFromMotanosClient: true,
  };

export const HOSTELERIA_LANDING_PREVIEW_ROUTE_BOUNDARY_IMPLEMENTATION_REQUIREMENTS: readonly string[] = [
  "No page file is created in this block.",
  "No route handler is created in this block.",
  "No renderer is implemented in this block.",
  "No real forms, apiClient, activation, checkout or payments are allowed.",
  "No real customer, tenant, business or API data is connected.",
  "23.27 must decide hardening or implementation gate before any route or UI surface.",
];

const SECRET_OR_ENV_PATTERN = /(service_role|SUPABASE_SERVICE_ROLE_KEY|secret|secrets|\.env)/i;

const toCheck = (checkId: string, passed: boolean, message: string): HosteleriaLandingValidationCheck => ({
  checkId,
  passed,
  message,
});

const hasEveryRequiredModule = (metadata: HosteleriaLandingPreviewRouteBoundaryMetadata): boolean => {
  const modules = new Set(metadata.blockedModules);
  return HOSTELERIA_LANDING_PREVIEW_ROUTE_BOUNDARY_REQUIRED_BLOCKED_MODULES.every((module) =>
    modules.has(module),
  );
};

const hasEveryRequiredClaim = (metadata: HosteleriaLandingPreviewRouteBoundaryMetadata): boolean => {
  const claims = new Set(metadata.blockedClaims);
  return HOSTELERIA_LANDING_PREVIEW_ROUTE_BOUNDARY_REQUIRED_BLOCKED_CLAIMS.every((claim) => claims.has(claim));
};

const collectRouteBoundaryCopy = (
  metadata: HosteleriaLandingPreviewRouteBoundaryMetadata,
): readonly string[] => [
  metadata.routeId,
  metadata.sourceSlotId,
  metadata.routeStatus,
  ...metadata.blockedModules,
  ...metadata.blockedClaims,
  ...metadata.implementationRequirements,
  metadata.summary,
];

export const createHosteleriaLandingPreviewRouteBoundarySummary = (
  metadata?: Pick<HosteleriaLandingPreviewRouteBoundaryMetadata, "routeId" | "sourceSlotId" | "routeStatus">,
): string =>
  [
    "23.26 commercial landing preview route boundary metadata.",
    metadata
      ? `${metadata.routeId} references ${metadata.sourceSlotId} as ${metadata.routeStatus}.`
      : "References the 23.24 shell-slot as safe route boundary metadata.",
    "Route boundary metadata is TS-only: no real route, no page file, no route handler, no UI and no renderer.",
    "It uses foundation-only inputs and blocks real data, real actions, forms, apiClient, activation, checkout and payments.",
    "Carta Digital/QR remains inside MotanOS Hosteleria; public-menu is output only and customer web is not the menu source.",
    "Next recommended block: 23.27 commercial landing preview route boundary hardening / implementation gate, sin UI productiva ni route real.",
  ].join(" ");

export const createHosteleriaLandingPreviewRouteBoundaryMetadata = (
  shellSlot: HosteleriaLandingPreviewShellSlotDescriptor = createHosteleriaLandingPreviewShellSlotDescriptor(),
): HosteleriaLandingPreviewRouteBoundaryMetadata => {
  const metadataBase = {
    routeId: "motanos-hosteleria-commercial-landing-preview-route-boundary-23-26",
    sourceSlotId: shellSlot.slotId,
    routeStatus: "preview_boundary",
    createsRealRoute: false,
    createsProductiveRoute: false,
    createsPageFile: false,
    createsRouteHandler: false,
    rendererImplementationPending: true,
    usesFixtureOrFoundationOnly: true,
    allowsRealData: false,
    allowsRealActions: false,
    allowsForms: false,
    allowsApiClient: false,
    allowsActivation: false,
    allowsCheckout: false,
    allowsPayments: false,
  } as const;

  return {
    ...metadataBase,
    blockedModules: HOSTELERIA_LANDING_PREVIEW_ROUTE_BOUNDARY_REQUIRED_BLOCKED_MODULES,
    blockedClaims: HOSTELERIA_LANDING_PREVIEW_ROUTE_BOUNDARY_REQUIRED_BLOCKED_CLAIMS,
    commercialBoundaries: HOSTELERIA_LANDING_PREVIEW_ROUTE_BOUNDARY_COMMERCIAL_BOUNDARIES,
    implementationRequirements: HOSTELERIA_LANDING_PREVIEW_ROUTE_BOUNDARY_IMPLEMENTATION_REQUIREMENTS,
    summary: createHosteleriaLandingPreviewRouteBoundarySummary(metadataBase),
  };
};

export const validateHosteleriaLandingPreviewRouteBoundaryMetadata = (
  metadata: HosteleriaLandingPreviewRouteBoundaryMetadata = createHosteleriaLandingPreviewRouteBoundaryMetadata(),
): HosteleriaLandingPreviewRouteBoundaryValidationResult => {
  const sourceShellSlot = createHosteleriaLandingPreviewShellSlotDescriptor();
  const shellSlotValidation = validateHosteleriaLandingPreviewShellSlotDescriptor(sourceShellSlot);
  const routeBoundaryCopy = collectRouteBoundaryCopy(metadata);

  const checks: readonly HosteleriaLandingValidationCheck[] = [
    ...shellSlotValidation.checks,
    toCheck(
      "routeBoundary:identity",
      metadata.routeId === "motanos-hosteleria-commercial-landing-preview-route-boundary-23-26" &&
        metadata.sourceSlotId === sourceShellSlot.slotId,
      "Route boundary metadata must keep the 23.26 id and source the 23.24 shell-slot id.",
    ),
    toCheck(
      "routeBoundary:previewBoundary",
      metadata.routeStatus === "preview_boundary",
      "Route boundary metadata must remain preview_boundary.",
    ),
    toCheck(
      "routeBoundary:noRealRoute",
      metadata.createsRealRoute === false &&
        metadata.createsProductiveRoute === false &&
        metadata.createsPageFile === false &&
        metadata.createsRouteHandler === false,
      "Route boundary metadata must not create real routes, productive routes, page files or route handlers.",
    ),
    toCheck(
      "routeBoundary:rendererPending",
      metadata.rendererImplementationPending === true,
      "Route boundary metadata must keep renderer implementation pending.",
    ),
    toCheck(
      "routeBoundary:foundationOnly",
      metadata.usesFixtureOrFoundationOnly === true &&
        metadata.allowsRealData === false &&
        metadata.allowsRealActions === false,
      "Route boundary metadata must use foundation-only inputs and block real data/actions.",
    ),
    toCheck(
      "routeBoundary:noFormsApiActivationCheckoutPayments",
      metadata.allowsForms === false &&
        metadata.allowsApiClient === false &&
        metadata.allowsActivation === false &&
        metadata.allowsCheckout === false &&
        metadata.allowsPayments === false,
      "Route boundary metadata must block forms, apiClient, activation, checkout and payments.",
    ),
    toCheck(
      "routeBoundary:blockedModules",
      hasEveryRequiredModule(metadata),
      "Route boundary metadata must include every required blocked module.",
    ),
    toCheck(
      "routeBoundary:blockedClaims",
      hasEveryRequiredClaim(metadata),
      "Route boundary metadata must include every required blocked claim.",
    ),
    toCheck(
      "routeBoundary:commercialBoundaries",
      metadata.commercialBoundaries.digitalMenuInsideMotanos === true &&
        metadata.commercialBoundaries.publicMenuOutputOnly === true &&
        metadata.commercialBoundaries.customerWebIsMenuSource === false &&
        metadata.commercialBoundaries.msManagerSeparateFromMotanosClient === true,
      "Route boundary metadata must keep commercial/product boundaries closed.",
    ),
    toCheck(
      "routeBoundary:noSecrets",
      !routeBoundaryCopy.some((copy) => SECRET_OR_ENV_PATTERN.test(copy)),
      "Route boundary metadata must not include service_role, secrets or env references.",
    ),
  ];

  const failedChecks = checks.filter((check) => !check.passed);
  const blockedReasons = [
    ...shellSlotValidation.blockedReasons,
    ...failedChecks.map((check) => check.message),
  ];
  const warnings = [
    "23.26 route boundary metadata is not a route, page, handler, renderer or UI.",
    "23.27 must decide hardening or implementation gate before any real route surface.",
    ...shellSlotValidation.warnings,
  ];
  const valid = shellSlotValidation.valid && failedChecks.length === 0;

  return {
    valid,
    state: valid ? "passed" : "failed",
    checks,
    blockedReasons,
    warnings,
    summary: valid
      ? "23.26 route boundary metadata passed: no real route, no page file, no route handler, no UI, no real data and no real actions."
      : "23.26 route boundary metadata failed: unsafe route boundary drift detected.",
  };
};
