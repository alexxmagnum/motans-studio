/**
 * Fase 17 — Site comercial mínimo publicable (Plan 07 §22.4).
 * Fuente única para gobernanza, tests y checklist de cierre de bloque.
 */

export const FASE_17_COMMERCIAL_SITE_PUBLISHABLE_BLOCK_ID =
  "IMPLEMENTATION_FASE_17_COMMERCIAL_SITE_MINIMAL_PUBLISHABLE" as const;

export const FASE_17_PUBLIC_API_PATHS = {
  leads: "/api/public/leads",
  assistedRequests: "/api/public/assisted-requests",
} as const;

/** Rutas públicas mínimas Plan 07 §22.4 */
export const FASE_17_PUBLISHABLE_ROUTES = {
  home: "/",
  planes: "/planes",
  solicitud: "/solicitud",
  legal: "/legal/aviso-legal",
  contacto: "/contacto",
  hosteleria: "/motanos/hosteleria",
} as const;

export const FASE_17_PUBLISHABLE_SECONDARY_NAV: readonly {
  readonly href: string;
  readonly label: string;
}[] = [
  { href: FASE_17_PUBLISHABLE_ROUTES.planes, label: "Planes" },
  { href: FASE_17_PUBLISHABLE_ROUTES.solicitud, label: "Configuración asistida" },
];

export const FASE_17_PLAN_07_22_4_CHECKLIST: readonly {
  readonly id: string;
  readonly route: string;
  readonly label: string;
}[] = [
  { id: "landing", route: "/", label: "Landing principal + hero + problema/solución" },
  { id: "planes", route: "/planes", label: "Planes visibles (orientativos)" },
  { id: "lead", route: "/contacto", label: "Formulario lead (/contacto)" },
  { id: "assisted", route: "/solicitud", label: "Solicitud asistida" },
  { id: "market_es", route: "/planes", label: "España activa; otros países próximamente" },
  { id: "legal", route: "/legal/aviso-legal", label: "Legales básicos (aviso, privacidad, cookies, condiciones)" },
];

export const FASE_17_PUBLISHABLE_STATUS = {
  blockId: FASE_17_COMMERCIAL_SITE_PUBLISHABLE_BLOCK_ID,
  phase: "Fase 17",
  planReference: "Plan 07 §22.4",
  publishableMinimally: true,
  productionLegallyFinal: false,
  allowsPublicLeadCapture: true,
  allowsPublicAssistedRequests: true,
  allowsCheckout: false,
  allowsTenantCreation: false,
  allowsOnboarding: false,
  spainMarketActive: true,
} as const;
