/**
 * MS_SITE_17_03 — Commercial site copy + structure.
 */

import { MS_SITE_PUBLIC_MOTANOS_VISIBLE } from "./msSite1701Foundation.js";

export const MS_SITE_1703_BLOCK_ID =
  "MS_SITE_17_03C_IMPLEMENTATION_OBSESSIVE_PREMIUM_REDESIGN" as const;

export const MS_SITE_HOME = {
  eyebrow: "Estudio digital · producto propio",
  title: "Motans Studio",
  heroHeadline: "Diseñamos y construimos sistemas digitales para empresas.",
  lead: "Desde webs premium y aplicaciones a medida hasta plataformas completas como MotanOS.",
  ctaPrimary: "Iniciar proyecto",
  ctaSecondary: "Explorar MotanOS",
} as const;

/** Re-export obsessive hero copy for pages/tests */
export { MS_SITE_HOME_OBSESSIVE } from "./msSite1703ObsessiveFoundation.js";

export const MS_SITE_ECOSYSTEM_BRIDGE = {
  line: "Un mismo criterio desde la web hasta el producto.",
} as const;

export { MS_SITE_ECOSYSTEM_BRIDGE_OBSESSIVE } from "./msSite1703ObsessiveFoundation.js";

export const MS_SITE_STUDIO_PATHS: readonly {
  readonly id: string;
  readonly label: string;
  readonly line: string;
  readonly href: string;
  readonly accent: "studio" | "product" | "bundle" | "custom";
}[] = [
  {
    id: "web-only",
    label: "Solo web profesional",
    line: "Presencia digital impecable sin tocar tu operativa interna.",
    href: "#contacto",
    accent: "studio",
  },
  {
    id: "motanos-only",
    label: "Solo MotanOS",
    line: "El producto estrella sin rehacer tu web actual.",
    href: "#motanos",
    accent: "product",
  },
  {
    id: "web-motanos",
    label: "Web + MotanOS",
    line: "Presencia pública y operativa alineadas, una sola dirección creativa.",
    href: "#contacto",
    accent: "bundle",
  },
  {
    id: "custom-saas",
    label: "App o SaaS a medida",
    line: "Plataformas y productos digitales construidos para tu negocio.",
    href: "#contacto",
    accent: "custom",
  },
];

export const MS_SITE_MOTANOS_MOMENT = {
  line: "El sistema operativo para negocios de Motans Studio.",
  vertical: "Primer vertical: MotanOS Hostelería",
  cta: "Descubrir MotanOS",
} as const;

export const MS_SITE_CONFIDENCE = {
  line: "¿Web, MotanOS o las dos? Lo definimos contigo y arrancamos con alcance claro.",
  cta: "Hablar con el estudio",
} as const;

export const MS_SITE_SERVICIOS = {
  title: "Servicios",
  lead: "Con o sin MotanOS — tú eliges el alcance.",
  bridge: "¿Operativa de negocio? MotanOS es el producto estrella.",
  cta: "Pedir conversación",
} as const;

export const MS_SITE_MOTANOS_PAGE = {
  title: "MotanOS",
  lead: "El sistema operativo para negocios de Motans Studio.",
  pillars: [
    {
      id: "carta",
      title: "Carta y mesa integradas",
      line: "Un solo producto — la carta no se vende suelta.",
    },
    {
      id: "validacion",
      title: "Validación con criterio",
      line: "El comensal propone; el equipo valida antes de operar.",
    },
    {
      id: "modulos",
      title: "Crece por módulos",
      line: "Te contamos en conversación qué está listo hoy.",
    },
  ] as const,
  verticalLine: "Bares, restaurantes y cafeterías — primer vertical demostrable.",
  verticalCta: "MotanOS Hostelería",
  cta: "Solicitar conversación sobre MotanOS",
  videoSectionTitle: "Míralo en contexto",
  videoSectionLead: "Dos vídeos de presentación del producto y del arranque con Motans Studio.",
} as const;

export type MsSiteMotanosVideoCard = {
  readonly id: string;
  readonly title: string;
  readonly subtitle: string;
  readonly description: string;
  readonly badge: string;
  /** Ruta pública cuando exista el archivo en `public/videos/` */
  readonly videoSrc?: string | undefined;
};

/** Vídeo de presentación MotanOS Hostelería en el hero — demo controlada */
export const MS_SITE_HERO_HOSTELERIA_JOURNEY = {
  video: {
    id: "hosteleria-table-to-staff-journey",
    title: "Presentación: mesa, QR, pedido y aviso en staff",
    subtitle: "MotanOS Hostelería · demo",
    description:
      "Recorrido narrado: comensal en mesa, carta QR, propuesta de pedido, aviso al equipo y validación antes de cocina o barra.",
    badge: "Vídeo de prueba",
    videoSrc: "/hero/motanos-hosteleria-journey.mp4",
  } satisfies MsSiteMotanosVideoCard,
} as const;

export const MS_SITE_MOTANOS_VIDEO_CARDS: readonly MsSiteMotanosVideoCard[] = [
  {
    id: "how-it-works-owner",
    title: "Cómo funciona MotanOS",
    subtitle: "Visto por el dueño del bar",
    description:
      "Mesas, carta integrada y pedidos con validación staff — visto desde la gestión del negocio.",
    badge: "Vídeo de prueba",
  },
  {
    id: "onboarding-setup",
    title: "Alta y ajuste",
    subtitle: "Cómo se da de alta y lo configura",
    description:
      "Conversación, configuración asistida, carta y parámetros — cómo se prepara un local con MotanOS.",
    badge: "Vídeo de prueba",
  },
] as const;

export const MS_SITE_HOSTELERIA_PAGE = {
  title: "MotanOS Hostelería",
  lead: "Carta en mesa, pedido QR y operativa con validación del equipo — para bares y restaurantes.",
  ideas: [
    {
      id: "propone",
      title: "Propuesta desde la mesa",
      line: "El comensal propone desde la mesa con sesión QR.",
    },
    {
      id: "valida",
      title: "Validación del equipo",
      line: "Cocina y barra reciben solo lo confirmado en sala.",
    },
    {
      id: "carta",
      title: "Carta en MotanOS",
      line: "La carta vive en el producto — no como SKU suelto.",
    },
    {
      id: "modulos",
      title: "Crece por módulos",
      line: "Hostelería primero; más vertical cuando toque.",
    },
  ] as const,
  cta: "Hablar de Hostelería",
  ctaAssisted: "Hablar con Motans",
} as const;

export const MS_SITE_CONTACT = {
  title: "¿En qué podemos ayudarte?",
  lead: "Cuéntanos qué necesitas. Respondemos en 24–48 h laborables.",
  cta: "Enviar mensaje",
} as const;

export const MS_SITE_PROJECT_INTENTS: readonly {
  readonly value: string;
  readonly label: string;
}[] = [
  { value: "web-only", label: "Web" },
  { value: "motanos-only", label: "Solo MotanOS" },
  { value: "web-motanos", label: "Web + MotanOS" },
  { value: "custom-saas", label: "App / SaaS" },
  { value: "automation", label: "Automatización" },
  { value: "other", label: "Otro / consultar" },
];

/** Intents visibles en formulario público (oculta MotanOS si el flag está off). */
export const MS_SITE_PROJECT_INTENTS_PUBLIC = MS_SITE_PUBLIC_MOTANOS_VISIBLE
  ? MS_SITE_PROJECT_INTENTS
  : MS_SITE_PROJECT_INTENTS.filter(
      (intent) => intent.value !== "motanos-only" && intent.value !== "web-motanos",
    );
