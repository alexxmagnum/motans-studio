export type CommercialSiteSectionId =
  | "hero"
  | "problem"
  | "solution"
  | "not-just-qr"
  | "motanos-hosteleria"
  | "digital-menu-inside-motanos"
  | "operations"
  | "current-modules"
  | "future-modules"
  | "customer-web-optional"
  | "plans-preview"
  | "assisted-request"
  | "markets"
  | "legal-placeholder"
  | "final-cta";

export type CommercialSiteSectionStatus =
  | "foundation_placeholder"
  | "blocked_until_renderer"
  | "blocked_until_backend"
  | "blocked_until_ms_manager"
  | "blocked_until_legal"
  | "future";

export type CommercialSiteCtaState = "none" | "placeholder_only" | "blocked";

export type CommercialSiteSection = {
  readonly id: CommercialSiteSectionId;
  readonly label: string;
  readonly description: string;
  readonly routeAnchor: `#${string}`;
  readonly status: CommercialSiteSectionStatus;
  readonly allowedMessage: string;
  readonly forbiddenClaims: readonly string[];
  readonly ctaState: CommercialSiteCtaState;
};

export const COMMERCIAL_SITE_SECTIONS: readonly CommercialSiteSection[] = [
  {
    id: "hero",
    label: "Hero",
    description:
      "Main hero section presenting MotanOS as the operating system for hospitality businesses.",
    routeAnchor: "#hero",
    status: "foundation_placeholder",
    allowedMessage:
      "MotanOS Hostelería es el sistema operativo digital para bares, restaurantes y cafeterías.",
    forbiddenClaims: [
      "No decir carta digital suelta",
      "No decir checkout activo",
      "No prometer delivery/takeaway como activo",
    ],
    ctaState: "placeholder_only",
  },
  {
    id: "problem",
    label: "Problema real",
    description:
      "Pain point section describing real operational chaos in bars and restaurants.",
    routeAnchor: "#problem",
    status: "foundation_placeholder",
    allowedMessage:
      "Cartas desactualizadas, pedidos olvidados, camareros saturados, cocina sin orden, errores en cuenta.",
    forbiddenClaims: ["No exagerar problemas sin evidencia"],
    ctaState: "none",
  },
  {
    id: "solution",
    label: "Solución MotanOS",
    description:
      "Solution section showing MotanOS as a unified system: carta, mesas, pedidos, staff, cocina, barra, caja.",
    routeAnchor: "#solution",
    status: "foundation_placeholder",
    allowedMessage:
      "MotanOS une carta, mesas, pedidos, staff, cocina, barra y caja en un solo sistema.",
    forbiddenClaims: [
      "No prometer operativa productiva real todavía",
      "No decir que está listo para producción",
    ],
    ctaState: "none",
  },
  {
    id: "not-just-qr",
    label: "No es solo carta QR",
    description:
      "Differentiator section clarifying that MotanOS is not a simple QR menu product.",
    routeAnchor: "#not-just-qr",
    status: "foundation_placeholder",
    allowedMessage:
      "Una carta QR muestra platos. MotanOS organiza el negocio.",
    forbiddenClaims: [
      "No vender carta digital como producto independiente",
      "No decir que la carta QR es el producto principal",
    ],
    ctaState: "none",
  },
  {
    id: "motanos-hosteleria",
    label: "MotanOS Hostelería",
    description:
      "Vertical section presenting MotanOS Hostelería as the first vertical of the platform.",
    routeAnchor: "#motanos-hosteleria",
    status: "foundation_placeholder",
    allowedMessage: "MotanOS Hostelería es el primer vertical de MotanOS.",
    forbiddenClaims: [
      "No prometer verticales futuros como activos",
      "No mezclar hostelería con otros verticales sin distinción",
    ],
    ctaState: "none",
  },
  {
    id: "digital-menu-inside-motanos",
    label: "Carta digital dentro de MotanOS",
    description:
      "Section explaining that the digital menu lives inside MotanOS. The customer web can link or embed it but is never the real source.",
    routeAnchor: "#digital-menu",
    status: "foundation_placeholder",
    allowedMessage:
      "La carta vive en MotanOS. La web cliente y public-menu solo la muestran o enlazan como salidas públicas controladas.",
    forbiddenClaims: [
      "No vender carta digital como producto suelto",
      "No hacer de la web cliente la fuente real de la carta",
    ],
    ctaState: "none",
  },
  {
    id: "operations",
    label: "Operaciones del negocio",
    description:
      "Section showing mesas, pedidos, staff, cocina, barra and caja as a unified system.",
    routeAnchor: "#operations",
    status: "foundation_placeholder",
    allowedMessage:
      "Mesas, pedidos, staff, cocina, barra y caja: un sistema operativo completo para tu negocio.",
    forbiddenClaims: [
      "No prometer operativa pública real todavía",
      "No mezclar operaciones internas con site público",
    ],
    ctaState: "none",
  },
  {
    id: "current-modules",
    label: "Módulos actuales",
    description:
      "Section showing current foundation/active modules as concepts. Must not claim production availability unless confirmed.",
    routeAnchor: "#modules",
    status: "foundation_placeholder",
    allowedMessage:
      "Módulos disponibles: carta digital, mesas y QR, pedidos validados por staff, cocina/barra, caja.",
    forbiddenClaims: [
      "No decir disponible productivo si aún es foundation",
      "No prometer módulos no activos como listos",
    ],
    ctaState: "none",
  },
  {
    id: "future-modules",
    label: "Módulos futuros",
    description:
      "Section presenting delivery and takeaway as future modules, clearly marked as coming soon.",
    routeAnchor: "#future-modules",
    status: "future",
    allowedMessage:
      "Roadmap modular por fases: Takeaway, Delivery, Reservas y app móvil quedan fuera de este corte hasta apertura formal por Motans Studio.",
    forbiddenClaims: [
      "No decir delivery/takeaway como activos",
      "No prometer fecha de lanzamiento",
    ],
    ctaState: "none",
  },
  {
    id: "customer-web-optional",
    label: "Web cliente opcional",
    description:
      "Section explaining that the customer web is an optional and independent module, not the source of the carta.",
    routeAnchor: "#customer-web",
    status: "foundation_placeholder",
    allowedMessage:
      "La web del negocio es un módulo opcional e independiente. Puede mostrar o enlazar la carta de MotanOS.",
    forbiddenClaims: [
      "No mezclar web cliente con carta como fuente real",
      "No confundir site comercial con web cliente",
    ],
    ctaState: "none",
  },
  {
    id: "plans-preview",
    label: "Planes (preview)",
    description:
      "Plans preview section. Prices must not be hardcoded as final. Source must be controlled in future.",
    routeAnchor: "#plans",
    status: "blocked_until_ms_manager",
    allowedMessage:
      "Planes MotanOS — precios y detalles pendientes de configuración controlada.",
    forbiddenClaims: [
      "No hardcodear precios definitivos",
      "No mostrar ofertas no controladas",
      "No activar checkout desde esta sección",
    ],
    ctaState: "blocked",
  },
  {
    id: "assisted-request",
    label: "Solicitud asistida",
    description:
      "Assisted setup request section. CTA is placeholder only. No real lead persistence until backend and legal compliance exist.",
    routeAnchor: "#assisted-request",
    status: "foundation_placeholder",
    allowedMessage:
      "¿Prefieres que Motans Studio lo configure por ti? Solicita ayuda asistida.",
    forbiddenClaims: [
      "No capturar lead real sin backend",
      "No persistir datos personales sin consentimiento",
      "No prometer respuesta automática real",
    ],
    ctaState: "placeholder_only",
  },
  {
    id: "markets",
    label: "Mercados",
    description:
      "Markets section showing Spain as active and other countries as coming soon.",
    routeAnchor: "#markets",
    status: "foundation_placeholder",
    allowedMessage:
      "Disponible en España. Próximamente en otros países.",
    forbiddenClaims: [
      "No decir disponible en países bloqueados",
      "No activar checkout fuera de España",
    ],
    ctaState: "none",
  },
  {
    id: "legal-placeholder",
    label: "Legales (placeholder)",
    description:
      "Legal placeholder section. Not real legal compliance until reviewed and confirmed.",
    routeAnchor: "#legal",
    status: "blocked_until_legal",
    allowedMessage:
      "Aviso legal, política de privacidad y cookies — pendiente de revisión legal.",
    forbiddenClaims: [
      "No publicar como legales reales sin revisión",
      "No omitir cookies consent si aplica",
    ],
    ctaState: "blocked",
  },
  {
    id: "final-cta",
    label: "CTA final",
    description:
      "Final call to action. Placeholder only. No checkout, no real lead form, no tenant creation.",
    routeAnchor: "#cta",
    status: "foundation_placeholder",
    allowedMessage:
      "Habla con Motans Studio para una demo controlada o información comercial, sin alta automática ni checkout.",
    forbiddenClaims: [
      "No activar checkout",
      "No crear tenant real",
      "No capturar lead real sin backend",
    ],
    ctaState: "placeholder_only",
  },
];

export const isCommercialSiteSectionCtaBlocked = (
  section: CommercialSiteSection,
): boolean => section.ctaState === "blocked";

export const getCommercialSiteSectionById = (
  id: CommercialSiteSectionId,
): CommercialSiteSection | undefined =>
  COMMERCIAL_SITE_SECTIONS.find((s) => s.id === id);
