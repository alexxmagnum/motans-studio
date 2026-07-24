export type HosteleriaLandingStatus = "content_model_foundation";

export type HosteleriaLandingVertical = "hosteleria";

export type HosteleriaLandingProduct = "MotanOS Hosteleria";

export type HosteleriaLandingSource = "approved_copy_pack";

export type HosteleriaLandingRiskLevel = "low" | "medium" | "high";

export type HosteleriaLandingSectionId =
  | "hero"
  | "problem"
  | "solution"
  | "integratedDigitalMenuQr"
  | "singleSourceOfTruth"
  | "publicMenuOutput"
  | "conceptualDemoFlow"
  | "includedToday"
  | "notIncludedToday"
  | "modularRoadmap"
  | "optionalCustomerWeb"
  | "safeCta"
  | "safeFaq"
  | "internalDisclaimer";

export type HosteleriaLandingCtaKind = "primary" | "secondary" | "tertiary";

export type HosteleriaLandingCapabilityFlags = {
  readonly isProductiveSite: false;
  readonly createsRoute: false;
  readonly createsPage: false;
  readonly usesRealData: false;
  readonly usesApiClient: false;
  readonly usesContactForm: false;
  readonly activatesAccount: false;
  readonly allowsCheckout: false;
  readonly allowsPayments: false;
  readonly includesTakeaway: false;
  readonly includesDelivery: false;
  readonly includesReservationsLive: false;
  readonly opensExecute: false;
  readonly usesLiveRead: false;
  readonly sellsStandaloneDigitalMenu: false;
  readonly customerWebIsMenuSource: false;
  readonly publicMenuIsOutputOnly: true;
};

export type HosteleriaLandingSection = {
  readonly sectionId: HosteleriaLandingSectionId;
  readonly title: string;
  readonly body: string;
  readonly allowedClaims: readonly string[];
  readonly blockedClaims: readonly string[];
  readonly riskLevel: HosteleriaLandingRiskLevel;
};

export type HosteleriaLandingHeroVariant = {
  readonly variantId: "systemOperating" | "singleBase" | "notStandaloneMenu" | "controlledDemo";
  readonly headline: string;
  readonly subheadline: string;
  readonly supportingCopy: string;
  readonly allowedUse: string;
  readonly riskLimit: string;
};

export type HosteleriaLandingCta = {
  readonly ctaId: string;
  readonly kind: HosteleriaLandingCtaKind;
  readonly label: string;
  readonly microcopy: string;
  readonly createsAccount: false;
  readonly startsCheckout: false;
  readonly usesForm: false;
};

export type HosteleriaLandingFaq = {
  readonly question: string;
  readonly answer: string;
};

export type HosteleriaLandingContentModel = {
  readonly landingId: "motanos-hosteleria-commercial-landing-content-model-23-19";
  readonly vertical: HosteleriaLandingVertical;
  readonly product: HosteleriaLandingProduct;
  readonly status: HosteleriaLandingStatus;
  readonly source: HosteleriaLandingSource;
  readonly sourceBlocks: readonly ["23.17", "23.16", "23.18", "23.15"];
  readonly capabilities: HosteleriaLandingCapabilityFlags;
  readonly heroVariants: readonly HosteleriaLandingHeroVariant[];
  readonly sections: readonly HosteleriaLandingSection[];
  readonly cta: readonly HosteleriaLandingCta[];
  readonly prohibitedCta: readonly string[];
  readonly faq: readonly HosteleriaLandingFaq[];
  readonly disclaimers: readonly string[];
  readonly forbiddenClaims: readonly string[];
  readonly approvalChecklist: readonly string[];
};

export type HosteleriaLandingValidationState = "passed" | "failed";

export type HosteleriaLandingValidationCheck = {
  readonly checkId: string;
  readonly passed: boolean;
  readonly message: string;
};

export type HosteleriaLandingValidationResult = {
  readonly valid: boolean;
  readonly state: HosteleriaLandingValidationState;
  readonly checks: readonly HosteleriaLandingValidationCheck[];
  readonly blockedReasons: readonly string[];
  readonly warnings: readonly string[];
  readonly summary: string;
};

const REQUIRED_SECTION_IDS: readonly HosteleriaLandingSectionId[] = [
  "hero",
  "problem",
  "solution",
  "integratedDigitalMenuQr",
  "singleSourceOfTruth",
  "publicMenuOutput",
  "conceptualDemoFlow",
  "includedToday",
  "notIncludedToday",
  "modularRoadmap",
  "optionalCustomerWeb",
  "safeCta",
  "safeFaq",
  "internalDisclaimer",
];

const SAFE_CAPABILITIES: HosteleriaLandingCapabilityFlags = {
  isProductiveSite: false,
  createsRoute: false,
  createsPage: false,
  usesRealData: false,
  usesApiClient: false,
  usesContactForm: false,
  activatesAccount: false,
  allowsCheckout: false,
  allowsPayments: false,
  includesTakeaway: false,
  includesDelivery: false,
  includesReservationsLive: false,
  opensExecute: false,
  usesLiveRead: false,
  sellsStandaloneDigitalMenu: false,
  customerWebIsMenuSource: false,
  publicMenuIsOutputOnly: true,
};

type BlockedClaimPattern = {
  readonly id: string;
  readonly reason: string;
  readonly pattern: RegExp;
};

export const HOSTELERIA_LANDING_BLOCKED_CLAIM_PATTERNS: readonly BlockedClaimPattern[] = [
  {
    id: "standalone-digital-menu",
    reason: "Carta Digital/QR no puede venderse como producto suelto.",
    pattern:
      /\b(motanos es una carta digital|te vendemos una carta qr|carta digital independiente|carta qr como producto suelto)\b/i,
  },
  {
    id: "customer-web-menu-source",
    reason: "La web cliente no puede ser fuente real de carta.",
    pattern: /\b(tu web sera la fuente|web cliente como fuente|la web gestiona tu carta|web.*fuente real.*carta)\b/i,
  },
  {
    id: "takeaway-active",
    reason: "Takeaway sigue fuera de alcance y no esta abierto.",
    pattern: /\b(takeaway incluido|takeaway activo|takeaway listo|takeaway disponible|activar takeaway)\b/i,
  },
  {
    id: "delivery-active",
    reason: "Delivery sigue fuera de alcance y no esta abierto.",
    pattern: /\b(delivery incluido|delivery activo|delivery listo|delivery disponible|activar delivery)\b/i,
  },
  {
    id: "reservations-live-active",
    reason: "Reservas live cliente sigue pausado.",
    pattern: /\b(reservas live incluidas|reservas live listo|reservas listas|reservas activas|reservar ahora)\b/i,
  },
  {
    id: "payments-ready",
    reason: "Pagos, cobros y fiscalidad real no estan listos en este bloque.",
    pattern:
      /\b(pagos listos|pagos activos|pagos disponibles|conectar pagos ahora|empieza a cobrar|empezar a cobrar|cobrar hoy)\b/i,
  },
  {
    id: "checkout-ready",
    reason: "Checkout queda bloqueado hasta charter productivo posterior.",
    pattern: /\b(checkout listo|checkout activo|empezar checkout|start checkout|contratar plan ahora)\b/i,
  },
  {
    id: "automatic-activation",
    reason: "Alta automatica, cuenta real y cliente operativo real no estan autorizados.",
    pattern:
      /\b(alta automatica lista|activar mi cuenta ahora|activa tu cuenta ahora|crear mi restaurante ahora|crea tu restaurante ahora|cliente real operativo|cliente real listo|publica tu carta real ahora|publicar carta real ahora)\b/i,
  },
  {
    id: "execute-live-read",
    reason: "Execute y live-read siguen pausados/cerrados.",
    pattern: /\b(execute|live-read|live read)\b/i,
  },
  {
    id: "real-api-backend",
    reason: "No se conectan API, backend ni datos reales desde este content model.",
    pattern: /\b(api real|backend real conectado|datos reales conectados|fetch real)\b/i,
  },
  {
    id: "unapproved-pricing",
    reason: "Precios, planes y ofertas finales requieren fuente controlada posterior.",
    pattern: /\b(precios finales|pricing definitivo|plan final aprobado|oferta live|ofertas live)\b/i,
  },
  {
    id: "secrets-env-service-role",
    reason: "No se permite mencionar ni exponer service_role, secretos o env reales.",
    pattern: /(service_role|SUPABASE_SERVICE_ROLE_KEY|secret|secrets|\.env)/i,
  },
];

export const HOSTELERIA_LANDING_CONTENT_MODEL_FOUNDATION: HosteleriaLandingContentModel = {
  landingId: "motanos-hosteleria-commercial-landing-content-model-23-19",
  vertical: "hosteleria",
  product: "MotanOS Hosteleria",
  status: "content_model_foundation",
  source: "approved_copy_pack",
  sourceBlocks: ["23.17", "23.16", "23.18", "23.15"],
  capabilities: SAFE_CAPABILITIES,
  heroVariants: [
    {
      variantId: "systemOperating",
      headline: "MotanOS Hosteleria: el sistema operativo digital para restaurantes.",
      subheadline: "La carta, el QR y la operacion empiezan en una misma base.",
      supportingCopy:
        "Una demo controlada para entender como MotanOS ordena carta, mesas, QR y flujo operativo sin activar todavia un cliente real.",
      allowedUse: "Hero principal de posicionamiento.",
      riskLimit: "Debe mantenerse como demo controlada, no como producto operativo completo.",
    },
    {
      variantId: "singleBase",
      headline: "La carta, el QR y la operacion del restaurante en una misma base.",
      subheadline: "Una forma mas clara de ordenar lo que hoy vive en herramientas separadas.",
      supportingCopy:
        "MotanOS Hosteleria centraliza el criterio de producto sin prometer caja fiscal, pagos ni activacion automatica.",
      allowedUse: "Hero para duenos que sufren fragmentacion operativa.",
      riskLimit: "No debe sugerir backoffice completo ni fiscalidad lista.",
    },
    {
      variantId: "notStandaloneMenu",
      headline: "No es una carta digital mas. Es MotanOS.",
      subheadline: "La Carta Digital/QR es una pieza integrada del sistema operativo del restaurante.",
      supportingCopy:
        "La carta nace en MotanOS y puede mostrarse por QR, public-menu o web cliente como salidas controladas.",
      allowedUse: "Diferenciacion frente a carta QR simple.",
      riskLimit: "No convertir la Carta Digital en producto aislado.",
    },
    {
      variantId: "controlledDemo",
      headline: "Entiende como MotanOS ordena tu restaurante antes de activarlo.",
      subheadline: "Demo controlada de carta, QR y flujo operativo, sin cliente real automatico.",
      supportingCopy:
        "Sirve para ver el enfoque, los limites y el roadmap sin checkout ni cuenta real.",
      allowedUse: "Captacion temprana y pilotos controlados.",
      riskLimit: "Debe evitar cualquier CTA de activacion inmediata.",
    },
  ],
  sections: [
    {
      sectionId: "hero",
      title: "MotanOS Hosteleria: el sistema operativo digital para restaurantes.",
      body: "La carta, el QR y la operacion empiezan en una misma base. La demo actual es controlada y no activa cliente real.",
      allowedClaims: ["Sistema operativo digital para restaurantes", "Demo controlada/foundation"],
      blockedClaims: ["Producto operativo completo", "Cliente real listo", "Alta automatica lista"],
      riskLevel: "medium",
    },
    {
      sectionId: "problem",
      title: "El problema no es tener o no tener QR.",
      body: "El problema es trabajar con piezas sueltas: carta aislada, staff saturado, cocina sin contexto y poca trazabilidad.",
      allowedClaims: ["Problemas reales de fragmentacion operativa"],
      blockedClaims: ["Afirmar que todos los restaurantes sufren todos los problemas"],
      riskLevel: "low",
    },
    {
      sectionId: "solution",
      title: "MotanOS une la carta, el QR y la operacion bajo una misma base.",
      body: "MotanOS Hosteleria empieza como base operativa para que la carta viva en MotanOS y el flujo futuro respete cliente propone, staff valida.",
      allowedClaims: ["Base unica", "Cliente propone y staff valida como regla de producto"],
      blockedClaims: ["Pedidos directos a cocina/barra", "Producto operativo completo"],
      riskLevel: "medium",
    },
    {
      sectionId: "integratedDigitalMenuQr",
      title: "La Carta Digital/QR vive dentro de MotanOS Hosteleria.",
      body: "La carta no es un producto separado ni una web duplicada. Es una parte integrada de MotanOS Hosteleria.",
      allowedClaims: ["Carta Digital/QR integrada en MotanOS Hosteleria"],
      blockedClaims: ["Carta Digital independiente", "Te vendemos una carta QR"],
      riskLevel: "high",
    },
    {
      sectionId: "singleSourceOfTruth",
      title: "Una carta. Una fuente. Varias salidas controladas.",
      body: "La fuente real de productos, precios, alergenos y disponibilidad vive en MotanOS.",
      allowedClaims: ["MotanOS como fuente real de carta"],
      blockedClaims: ["Web cliente como fuente real", "Duplicar carta en superficies publicas"],
      riskLevel: "high",
    },
    {
      sectionId: "publicMenuOutput",
      title: "public-menu muestra la carta. No sustituye MotanOS.",
      body: "public-menu es una salida publica/controlada de la carta. No es fuente real ni crea comandas de mesa.",
      allowedClaims: ["public-menu como salida publica/controlada"],
      blockedClaims: ["public-menu como fuente", "Pedidos de mesa desde carta publica"],
      riskLevel: "high",
    },
    {
      sectionId: "conceptualDemoFlow",
      title: "Un flujo claro: carta, QR, propuesta y validacion.",
      body: "La demo explica el recorrido conceptual: carta en MotanOS, salida QR/public-menu, propuesta conceptual del cliente y validacion staff.",
      allowedClaims: ["Flujo conceptual controlado", "Validacion staff antes de cocina/barra"],
      blockedClaims: ["Flujo productivo real", "Cliente operativo listo"],
      riskLevel: "medium",
    },
    {
      sectionId: "includedToday",
      title: "Que se puede entender hoy en la demo controlada.",
      body: "La demo foundation permite explicar el concepto, los limites, la Carta Digital/QR integrada, public-menu como salida y web cliente como opcional.",
      allowedClaims: ["Foundation para entender el enfoque"],
      blockedClaims: ["Cliente real operativo", "Backend real conectado"],
      riskLevel: "medium",
    },
    {
      sectionId: "notIncludedToday",
      title: "Lo que no esta incluido todavia tambien importa.",
      body: "La landing futura debe explicar valor sin prometer checkout, pagos, activacion automatica, modulos futuros ni cliente real.",
      allowedClaims: ["Limites honestos del bloque"],
      blockedClaims: ["Takeaway/Delivery/Reservas activos", "Pagos listos", "Execute/live-read"],
      riskLevel: "high",
    },
    {
      sectionId: "modularRoadmap",
      title: "Preparado para crecer, construido por fases.",
      body: "El roadmap prepara crecimiento, pero no mezcla lo preparado por arquitectura con lo operativo hoy.",
      allowedClaims: ["Roadmap modular sin fechas ni inclusion"],
      blockedClaims: ["Modulos futuros como incluidos", "Fechas cerradas sin charter"],
      riskLevel: "medium",
    },
    {
      sectionId: "optionalCustomerWeb",
      title: "Tu web puede mostrar la carta. MotanOS sigue siendo la fuente.",
      body: "La web cliente es opcional e independiente. Puede mostrar o enlazar la carta MotanOS, pero no gobierna productos, precios ni disponibilidad.",
      allowedClaims: ["Web cliente opcional/no fuente"],
      blockedClaims: ["Web cliente como panel real de carta", "Site comercial como web cliente"],
      riskLevel: "high",
    },
    {
      sectionId: "safeCta",
      title: "CTA seguros para demo/contacto/lista piloto.",
      body: "Los CTA del content model son editoriales y no crean cuenta, checkout, formulario real ni activacion.",
      allowedClaims: ["Solicitar demo controlada", "Hablar con Motans Studio"],
      blockedClaims: ["Activar cuenta ahora", "Contratar plan ahora", "Publicar carta real"],
      riskLevel: "high",
    },
    {
      sectionId: "safeFaq",
      title: "FAQ segura para evitar promesas falsas.",
      body: "La FAQ protege Carta Digital dentro de MotanOS, public-menu como salida y modulos futuros como no incluidos.",
      allowedClaims: ["Preguntas frecuentes con limites claros"],
      blockedClaims: ["Reservas, pagos o modulos futuros listos"],
      riskLevel: "medium",
    },
    {
      sectionId: "internalDisclaimer",
      title: "Disclaimer interno obligatorio.",
      body: "Este content model no es site productivo, no crea UI, no crea rutas, no toca formularios y no activa clientes reales.",
      allowedClaims: ["Foundation editorial/tecnica no productiva"],
      blockedClaims: ["Site productivo completo", "Ruta real creada"],
      riskLevel: "high",
    },
  ],
  cta: [
    {
      ctaId: "request-controlled-demo",
      kind: "primary",
      label: "Solicitar demo controlada",
      microcopy: "La demo no crea cuenta real ni activa pagos o modulos futuros.",
      createsAccount: false,
      startsCheckout: false,
      usesForm: false,
    },
    {
      ctaId: "talk-to-motans-studio",
      kind: "secondary",
      label: "Hablar con Motans Studio",
      microcopy: "Contacto editorial futuro; este modelo no toca formularios reales.",
      createsAccount: false,
      startsCheckout: false,
      usesForm: false,
    },
    {
      ctaId: "controlled-pilot-list",
      kind: "tertiary",
      label: "Entrar en lista de pilotos controlados",
      microcopy: "No implica aceptacion, fecha, checkout ni activacion automatica.",
      createsAccount: false,
      startsCheckout: false,
      usesForm: false,
    },
  ],
  prohibitedCta: [
    "Crear mi restaurante ahora",
    "Activar mi cuenta ahora",
    "Empezar a cobrar ahora",
    "Publicar carta real ahora",
    "Activar pedidos QR",
    "Activar Takeaway",
    "Activar Delivery",
    "Reservar ahora",
    "Conectar pagos ahora",
    "Contratar plan ahora",
  ],
  faq: [
    {
      question: "MotanOS Hosteleria es solo una carta digital?",
      answer:
        "No. La Carta Digital/QR es una pieza integrada de MotanOS Hosteleria. MotanOS se posiciona como sistema operativo digital para el restaurante.",
    },
    {
      question: "La carta QR se vende por separado?",
      answer:
        "No en este posicionamiento. La Carta Digital/QR vive dentro de MotanOS Hosteleria y no se vende como producto suelto.",
    },
    {
      question: "Puedo usar mi web como fuente de la carta?",
      answer:
        "No. La web cliente puede mostrar o enlazar la carta, pero la fuente real sigue siendo MotanOS.",
    },
    {
      question: "public-menu crea pedidos de mesa?",
      answer:
        "No. public-menu es salida publica/controlada. Los pedidos de mesa requieren contexto operativo y validacion staff en el modelo MVP.",
    },
    {
      question: "Que puedo solicitar ahora?",
      answer:
        "Puedes solicitar una demo controlada, hablar con Motans Studio o entrar en una lista de pilotos controlados.",
    },
  ],
  disclaimers: [
    "Este content model no es site productivo.",
    "Este content model no crea UI, componentes React, page.tsx ni route.ts.",
    "Este content model no toca formularios reales ni apiClient.",
    "Este content model no conecta datos reales, API real ni backend real.",
    "La demo descrita no representa cliente real operativo ni alta automatica.",
    "No implica checkout, pagos reales, Takeaway, Delivery, Reservas live, execute ni live-read.",
    "No permite vender Carta Digital/QR como producto suelto.",
    "La web cliente no es fuente real de carta.",
  ],
  forbiddenClaims: [
    "MotanOS es una carta digital.",
    "Te vendemos una carta QR.",
    "Carta Digital independiente.",
    "Carta QR como producto suelto.",
    "Crea tu restaurante ahora.",
    "Activa tu cuenta ahora.",
    "Publica tu carta real ahora.",
    "Empieza a cobrar hoy.",
    "Checkout listo.",
    "Pagos listos.",
    "Takeaway incluido.",
    "Delivery incluido.",
    "Reservas listas.",
    "Backend real conectado a la demo.",
    "Tu web sera la fuente de carta.",
    "Los pedidos del cliente llegan directos a cocina/barra.",
    "service_role",
    ".env",
  ],
  approvalChecklist: [
    "No promete cliente real operativo.",
    "No vende Carta Digital/QR como producto suelto.",
    "No promete Takeaway, Delivery, Reservas, pagos, execute ni live-read.",
    "No usa web cliente como fuente de carta.",
    "public-menu queda como salida/no fuente.",
    "CTA no activa cuentas reales.",
    "CTA no sugiere checkout ni pago.",
    "No hardcodea precios, planes u ofertas finales no aprobadas.",
    "No mezcla MS Manager con MotanOS cliente.",
    "Mantiene cliente propone / staff valida como regla de producto.",
  ],
};

const hasRequiredSections = (sections: readonly HosteleriaLandingSection[]): boolean => {
  const ids = new Set(sections.map((section) => section.sectionId));
  return REQUIRED_SECTION_IDS.every((sectionId) => ids.has(sectionId));
};

const collectPublicCopy = (
  model: HosteleriaLandingContentModel,
  additionalPublicCopy: readonly string[],
): readonly string[] => [
  ...model.heroVariants.flatMap((variant) => [
    variant.headline,
    variant.subheadline,
    variant.supportingCopy,
  ]),
  ...model.sections.flatMap((section) => [
    section.title,
    section.body,
    ...section.allowedClaims,
  ]),
  ...model.cta.flatMap((cta) => [cta.label, cta.microcopy]),
  ...model.faq.flatMap((faq) => [faq.question, faq.answer]),
  ...additionalPublicCopy,
];

const findBlockedClaims = (
  publicCopy: readonly string[],
): readonly { readonly patternId: string; readonly reason: string; readonly text: string }[] =>
  publicCopy.flatMap((text) =>
    HOSTELERIA_LANDING_BLOCKED_CLAIM_PATTERNS.flatMap((blockedPattern) =>
      blockedPattern.pattern.test(text)
        ? [
            {
              patternId: blockedPattern.id,
              reason: blockedPattern.reason,
              text,
            },
          ]
        : [],
    ),
  );

const getCapabilityChecks = (
  capabilities: HosteleriaLandingCapabilityFlags,
): readonly HosteleriaLandingValidationCheck[] =>
  (Object.keys(SAFE_CAPABILITIES) as Array<keyof HosteleriaLandingCapabilityFlags>).map((key) => ({
    checkId: `capability:${key}`,
    passed: capabilities[key] === SAFE_CAPABILITIES[key],
    message: `${key} must remain ${String(SAFE_CAPABILITIES[key])}`,
  }));

export const validateHosteleriaLandingContentModel = (
  model: HosteleriaLandingContentModel = HOSTELERIA_LANDING_CONTENT_MODEL_FOUNDATION,
  additionalPublicCopy: readonly string[] = [],
): HosteleriaLandingValidationResult => {
  const publicCopy = collectPublicCopy(model, additionalPublicCopy);
  const blockedClaims = findBlockedClaims(publicCopy);

  const checks: readonly HosteleriaLandingValidationCheck[] = [
    {
      checkId: "identity:landing-id",
      passed: model.landingId === "motanos-hosteleria-commercial-landing-content-model-23-19",
      message: "Landing id must remain the 23.19 content model foundation id.",
    },
    {
      checkId: "identity:status",
      passed: model.status === "content_model_foundation",
      message: "Status must remain content_model_foundation.",
    },
    {
      checkId: "identity:source",
      passed: model.source === "approved_copy_pack" && model.sourceBlocks.includes("23.17"),
      message: "Source must remain approved_copy_pack based on 23.17.",
    },
    {
      checkId: "sections:required",
      passed: hasRequiredSections(model.sections),
      message: "All required 23.19 landing content sections must exist.",
    },
    {
      checkId: "cta:safe",
      passed: model.cta.every(
        (cta) => cta.createsAccount === false && cta.startsCheckout === false && cta.usesForm === false,
      ),
      message: "CTA entries must not create account, start checkout or use real forms.",
    },
    {
      checkId: "claims:blocked-patterns",
      passed: blockedClaims.length === 0,
      message: "Public copy must not contain prohibited claims.",
    },
    ...getCapabilityChecks(model.capabilities),
  ];

  const failedChecks = checks.filter((check) => !check.passed);
  const blockedReasons = [
    ...failedChecks.map((check) => check.message),
    ...blockedClaims.map((claim) => `${claim.reason} Offending copy: "${claim.text}"`),
  ];
  const warnings =
    model.disclaimers.length === 0
      ? ["No internal disclaimers are defined."]
      : [];
  const valid = failedChecks.length === 0 && blockedClaims.length === 0;

  return {
    valid,
    state: valid ? "passed" : "failed",
    checks,
    blockedReasons,
    warnings,
    summary: valid
      ? "23.19 content model foundation passed: no productive landing, no real CTA, no real data and no prohibited claims."
      : "23.19 content model foundation failed: blocked claims or unsafe capabilities detected.",
  };
};

export const createHosteleriaLandingSafeSummary = (
  model: HosteleriaLandingContentModel = HOSTELERIA_LANDING_CONTENT_MODEL_FOUNDATION,
): string =>
  [
    `${model.product} landing content model foundation.`,
    "Content model only: no productive site, no UI, no route and no real data.",
    "Carta Digital/QR remains inside MotanOS Hosteleria.",
    "public-menu is output only and customer web is not the menu source.",
    "Next recommended block: 23.20 commercial landing content model hardening / implementation boundary.",
  ].join(" ");
