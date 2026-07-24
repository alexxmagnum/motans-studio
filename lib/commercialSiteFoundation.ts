export const COMMERCIAL_SITE_FOUNDATION_STATUS = {
  appId: "@motanos/commercial-site",
  phase: "Fase 17",
  scope: "Commercial site minimal publishable (Plan 07 §22.4)",
  title: "Commercial Site — publishable minimum",
  notice: "Public conversion via /api/public/* when API host configured; no checkout",
  sellsMotanOS: true,
  digitalMenuBelongsToMotanOS: true,
  digitalMenuSoldStandalone: false,
  customerWebIsOptional: true,
  allowsRealLeadCapture: true,
  allowsRealAssistedRequests: true,
  allowsCheckout: false,
  allowsPayments: false,
  allowsFinalPricing: false,
  allowsLiveOffersFromMsManager: false,
  allowsTenantCreation: false,
  allowsRealOnboarding: false,
  backendConnected: true,
  rendererDecided: true,
  frameworkSelected: true,
  deliveryActive: false,
  takeawayActive: false,
  publishableMinimally: true,
  productionReady: false,
} as const;

export const COMMERCIAL_SITE_FOUNDATION_MESSAGE = {
  headline: "No es complicado. Es MotanOS.",
  tagline: "MotanOS Hostelería es el sistema operativo para bares, restaurantes y cafeterías.",
  pitch:
    "Carta Digital/QR, mesas, pedidos propuestos por el cliente, validación del staff y control del negocio en una experiencia conectada.",
  benefit: "Tu bar más organizado, más rápido y más profesional.",
  differentiator:
    "Una carta QR muestra platos. MotanOS organiza el negocio.",
  vertical: "MotanOS Hostelería es el primer vertical.",
  digitalMenuClaim:
    "La Carta Digital/QR forma parte de MotanOS Hostelería: la carta vive en MotanOS y no se vende como producto suelto.",
  customerWebClaim:
    "La web cliente es un módulo opcional: puede mostrar o enlazar la carta, pero MotanOS conserva el control operativo.",
} as const;

export const COMMERCIAL_SITE_FOUNDATION_LIMITS = [
  "No checkout",
  "No payments",
  "No real onboarding",
  "No tenant creation",
  "No final pricing",
  "No live plans from MS Manager (planes orientativos en UI)",
  "No real offers",
  "No delivery/takeaway active",
  "No customer web generation",
  "Legal copy requires Motans Studio review before full production",
] as const;

export const COMMERCIAL_SITE_FOUNDATION_RULES = [
  "Commercial site sells MotanOS",
  "Digital menu belongs to MotanOS",
  "Digital menu is not sold standalone",
  "Customer web is optional and independent",
  "No checkout",
  "No final pricing",
  "No future modules promised as active",
  "Spain active, other countries coming soon",
  "Offers/prices must come from controlled source in future",
] as const;

export const COMMERCIAL_SITE_BLOCKED_ACTIONS = [
  {
    id: "submit-lead",
    label: "Submit lead",
    reason: "enabled_via_public_api",
    disabled: false,
  },
  {
    id: "submit-assisted-request",
    label: "Submit assisted request",
    reason: "enabled_via_public_api",
    disabled: false,
  },
  {
    id: "start-checkout",
    label: "Start checkout",
    reason: "blocked",
    disabled: true,
  },
  {
    id: "create-tenant",
    label: "Create tenant",
    reason: "blocked",
    disabled: true,
  },
  {
    id: "activate-plan",
    label: "Activate plan",
    reason: "blocked",
    disabled: true,
  },
  {
    id: "show-final-pricing",
    label: "Show final pricing",
    reason: "blocked",
    disabled: true,
  },
  {
    id: "publish-offer",
    label: "Publish offer",
    reason: "blocked",
    disabled: true,
  },
  {
    id: "request-delivery",
    label: "Request delivery",
    reason: "blocked",
    disabled: true,
  },
  {
    id: "request-takeaway",
    label: "Request takeaway",
    reason: "blocked",
    disabled: true,
  },
  {
    id: "create-customer-web",
    label: "Create customer web",
    reason: "blocked",
    disabled: true,
  },
] as const;

export const COMMERCIAL_SITE_MARKET_STATUS = {
  spain: {
    code: "ES",
    label: "España",
    active: true,
    checkoutEnabled: false,
  },
  portugal: {
    code: "PT",
    label: "Portugal",
    active: false,
    status: "coming_soon",
  },
  france: {
    code: "FR",
    label: "France",
    active: false,
    status: "coming_soon",
  },
  germany: {
    code: "DE",
    label: "Germany",
    active: false,
    status: "coming_soon",
  },
  italy: {
    code: "IT",
    label: "Italy",
    active: false,
    status: "coming_soon",
  },
  mexico: {
    code: "MX",
    label: "México",
    active: false,
    status: "coming_soon",
  },
  colombia: {
    code: "CO",
    label: "Colombia",
    active: false,
    status: "coming_soon",
  },
  usa: {
    code: "US",
    label: "United States",
    active: false,
    status: "coming_soon",
  },
} as const;
