/**
 * Motans Studio — Capacidades premium V13.
 * Demos super premium (WebP). Bloque MotanOS conservado internamente; oculto en superficie pública.
 */

import { MS_SITE_ROUTES } from "./msSite1701Foundation.js";

export const MS_STUDIO_SERVICES_PREMIUM_BLOCK_ID =
  "MOTANS_STUDIO_SERVICES_PREMIUM_REBUILD_V13" as const;

/** @deprecated Use MS_STUDIO_SERVICES_PREMIUM_BLOCK_ID */
export const MS_STUDIO_SERVICES_CINEMATIC_BLOCK_ID = MS_STUDIO_SERVICES_PREMIUM_BLOCK_ID;

export type MsStudioCapabilitiesVisualVariant =
  | "webs"
  | "plataformas-saas"
  | "automatizacion"
  | "motanos";

export type MsStudioCapabilitiesBlockRhythm = "split" | "panorama" | "spotlight";

export type MsStudioCapabilitiesBlockLayout = "start" | "end";

export type MsCapabilityFrameMode = "landscape" | "portrait";

export type MsCapabilityAssetKind = "demo" | "screenshot";

export type MsStudioCapabilityScreen = {
  readonly src: string;
  readonly alt: string;
  readonly label: string;
  readonly width: number;
  readonly height: number;
  readonly frame: MsCapabilityFrameMode;
  readonly kind: MsCapabilityAssetKind;
  readonly focus?: string;
};

export type MsStudioCapabilitiesBlock = {
  readonly id: MsStudioCapabilitiesVisualVariant;
  readonly kicker: string;
  readonly layout: MsStudioCapabilitiesBlockLayout;
  readonly rhythm: MsStudioCapabilitiesBlockRhythm;
  readonly title: string;
  readonly subtitle?: string;
  readonly description: string;
  readonly proofPoints: readonly string[];
  readonly cta: string;
  readonly href: string;
  readonly screens: readonly MsStudioCapabilityScreen[];
};

export const MS_STUDIO_CAPABILITY_ASSETS = {
  websDemo: {
    src: "/capabilities/webs-premium-demo.webp",
    alt: "Demo web premium — barbería Dapper Barbershop",
    label: "",
    width: 1024,
    height: 682,
    frame: "landscape",
    kind: "demo",
  },
  saasDemo: {
    src: "/capabilities/saas-premium-demo.webp",
    alt: "Demo panel admin SaaS premium — dashboard Novus",
    label: "",
    width: 1024,
    height: 682,
    frame: "landscape",
    kind: "demo",
  },
  automationDemo: {
    src: "/capabilities/automation-premium-demo.webp",
    alt: "Demo flujo de automatización premium — onboarding conectado",
    label: "",
    width: 1024,
    height: 682,
    frame: "landscape",
    kind: "demo",
  },
  /** Asset conservado para reactivar MotanOS; no se monta en superficie pública. */
  motanosCarta: {
    src: "/capabilities/motanos-carta.webp",
    alt: "Carta digital MotanOS — Casa Motans, menú hostelería",
    label: "",
    width: 367,
    height: 815,
    frame: "portrait",
    kind: "screenshot",
  },
} as const;

export const MS_STUDIO_CAPABILITIES = {
  kicker: "Qué hacemos",
  titleBefore: "Diseñamos la infraestructura digital",
  titleAccentLine: {
    before: "que impulsa negocios ",
    accent: "modernos",
    after: ".",
  },
  lead:
    "Creamos experiencias web, plataformas SaaS, automatizaciones e inteligencia artificial que simplifican operaciones y ayudan a crecer.",
  ctaPrimary: {
    label: "Ver qué hacemos",
    href: "#webs",
  },
  /** CTA secundario studio — MotanOS fuera de superficie pública. */
  ctaSecondary: {
    label: "Hablemos",
    href: "/#contacto",
  },
  blocks: [
    {
      id: "webs",
      kicker: "WEBS",
      layout: "start",
      rhythm: "split",
      title: "Webs que convierten visitas en negocio.",
      description:
        "Diseñamos experiencias digitales rápidas, modernas y orientadas a resultados.",
      proofPoints: [
        "Web cliente real en producción",
        "Mobile-first y carga rápida",
        "Diseño orientado a conversión",
      ],
      cta: "Solicitar proyecto web",
      href: "/#contacto",
      screens: [MS_STUDIO_CAPABILITY_ASSETS.websDemo],
    },
    {
      id: "plataformas-saas",
      kicker: "PLATAFORMAS SAAS",
      layout: "end",
      rhythm: "split",
      title: "Software diseñado para escalar operaciones.",
      description:
        "Creamos plataformas capaces de centralizar procesos, datos y gestión.",
      proofPoints: [
        "Arquitectura multi-tenant",
        "Módulos activables por negocio",
        "Panel operativo unificado",
      ],
      cta: "Solicitar proyecto SaaS",
      href: "/#contacto",
      screens: [MS_STUDIO_CAPABILITY_ASSETS.saasDemo],
    },
    {
      id: "automatizacion",
      kicker: "AUTOMATIZACIÓN",
      layout: "start",
      rhythm: "panorama",
      title: "Automatización que elimina trabajo repetitivo.",
      description:
        "Conectamos herramientas, datos y procesos para liberar tiempo operativo.",
      proofPoints: [
        "Flujos entre herramientas y datos",
        "Menos tareas manuales en el día a día",
        "Operativa más rápida y fiable",
      ],
      cta: "Solicitar automatización",
      href: "/#contacto",
      screens: [MS_STUDIO_CAPABILITY_ASSETS.automationDemo],
    },
    {
      id: "motanos",
      kicker: "MOTANOS",
      layout: "end",
      rhythm: "spotlight",
      title: "MotanOS",
      subtitle: "Sistema operativo para negocios modernos.",
      description:
        "Una plataforma diseñada para organizar, controlar y hacer crecer operaciones reales.",
      proofPoints: [
        "Carta digital + QR de mesa",
        "Staff, cocina y operaciones conectadas",
        "Primer vertical: Hostelería",
      ],
      cta: "Descubrir MotanOS",
      href: MS_SITE_ROUTES.motanos,
      screens: [MS_STUDIO_CAPABILITY_ASSETS.motanosCarta],
    },
  ] as const satisfies readonly MsStudioCapabilitiesBlock[],
} as const;

/** @deprecated Use MS_STUDIO_CAPABILITIES */
export const MS_STUDIO_SERVICES_CINEMATIC = MS_STUDIO_CAPABILITIES;
