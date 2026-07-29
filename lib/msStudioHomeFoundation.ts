/**
 * Motans Studio — HOME hero + continuidad premium v1.
 * Escultura M como panel derecho (asset aprobado); copy integrado a la izquierda.
 * HOME STRATEGIC REPOSITIONING — Motans Studio studio-first; MotanOS = Innovation Lab.
 */

import { MS_SITE_ROUTES, MS_SITE_PUBLIC_MOTANOS_VISIBLE } from "./msSite1701Foundation.js";
import { MOTANS_CORPORATE_BRAND_ASSETS } from "@motanos/branding";

export const MS_STUDIO_HOME_BLOCK_ID = "MOTANS_STUDIO_HOME_PREMIUM_HERO_CONTINUITY_V1" as const;
export const MS_STUDIO_SERVICES_EDITORIAL_BLOCK_ID =
  "MOTANS_STUDIO_SERVICES_PREMIUM_EDITORIAL_V1" as const;
export const MS_STUDIO_SERVICES_EDITORIAL_COMPOSITION_BLOCK_ID =
  "MOTANS_STUDIO_SERVICES_PREMIUM_EDITORIAL_COMPOSITION_V2" as const;
export const MS_STUDIO_HOME_HERO_BLOCK_ID = "MOTANS_STUDIO_PREMIUM_HERO_SPLIT_V2" as const;
export const MS_STUDIO_HOME_REPOSITIONING_BLOCK_ID =
  "MOTANS_STUDIO_HOME_STRATEGIC_REPOSITIONING_V1" as const;
/** Fase 0: MotanOS congelado en superficie pública (reactivable). */
export const MS_STUDIO_HOME_MOTANOS_PUBLIC_VISIBLE = MS_SITE_PUBLIC_MOTANOS_VISIBLE;

export const MS_STUDIO_HOME_LOGO = {
  path: MOTANS_CORPORATE_BRAND_ASSETS.markMsWebp.publicPath,
  fallbackPath: MOTANS_CORPORATE_BRAND_ASSETS.markMsPng.publicPath,
  alt: MOTANS_CORPORATE_BRAND_ASSETS.markMsWebp.alt,
  width: 82,
  height: 58,
} as const;

/** Panel escultura M — asset lateral derecho del hero (no background). */
export const MS_STUDIO_HOME_SCULPTURE = {
  path: "/brand/motans-hero-m-sculpture-panel.png",
  width: 1536,
  height: 1024,
} as const;

export const MS_STUDIO_HOME_SCULPTURE_KIND = "brand-hero-panel-render" as const;

/** Colores de marca (muestreados del logo). */
export const MS_STUDIO_HOME_BRAND_COLORS = {
  cyanBlue: "#04a2fb",
  turquoise: "#52ebe6",
  teal: "#34cc68",
  lime: "#a6e10b",
  gradient:
    "linear-gradient(90deg, #04a2fb 0%, #52ebe6 38%, #34cc68 62%, #a6e10b 100%)",
} as const;

/** Nav de referencia studio. MotanOS solo si MS_STUDIO_HOME_MOTANOS_PUBLIC_VISIBLE. */
export const MS_STUDIO_HOME_NAV = [
  { href: "/", label: "Inicio" },
  { href: "/#servicios", label: "Qué hacemos" },
  { href: "/#proceso", label: "Proceso" },
  ...(MS_STUDIO_HOME_MOTANOS_PUBLIC_VISIBLE
    ? ([{ href: "/motanos", label: "MotanOS" }] as const)
    : ([] as const)),
  { href: "/#contacto", label: "Contacto" },
] as const;

export const MS_STUDIO_HOME_HEADER_CTA = {
  label: "Hablemos",
  href: "/#contacto",
} as const;

export const MS_STUDIO_HOME_BRAND_WORDMARK = {
  primary: "Motans",
  secondary: "Studio",
} as const;

export const MS_STUDIO_HOME_HERO = {
  anchorId: "inicio",
  badge: "Motans Studio",
  titleBeforeAccent: ["Creamos herramientas digitales", "que simplifican el"] as const,
  titleAccentLine: {
    before: "",
    accent: "trabajo",
    after: ".",
  } as const,
  subtitle:
    "Desde una web hasta una plataforma SaaS, una automatización o una solución basada en inteligencia artificial. Cada herramienta se diseña para resolver un problema real.",
  tags: ["Webs", "SaaS", "Automatización", "IA"] as const,
  /** CTA primario — conversión. */
  cta: { label: "Hablemos", href: "/#contacto" },
  /** Conservado — visible solo si MS_SITE_PUBLIC_MOTANOS_VISIBLE. */
  secondaryCta: { label: "Explorar MotanOS", href: "/motanos" },
  /** CTA secundario studio — explorar oferta. */
  secondaryCtaStudio: { label: "Ver qué hacemos", href: "/#servicios" },
} as const;

/** Sección Qué construimos — catálogo Continuity en home. */
export const MS_STUDIO_HOME_CONTINUITY = {
  anchorId: "que-construimos",
  kicker: "Qué construimos",
  title: "Qué podemos construir para tu empresa.",
  lead:
    "No desarrollamos únicamente páginas web. Diseñamos y construimos productos digitales adaptados a cada negocio.",
  items: [
    {
      id: "webs",
      layout: "start" as const,
      backdropWord: "WEBS",
      title: "WEBS",
      offerings: ["Captan clientes", "Refuerzan tu marca", "Generan oportunidades"] as const,
    },
    {
      id: "saas",
      layout: "end" as const,
      backdropWord: "SAAS",
      title: "SAAS",
      offerings: ["Digitaliza procesos", "Centraliza operaciones", "Escala tu negocio"] as const,
    },
    {
      id: "automatizacion",
      layout: "start" as const,
      backdropWord: "AUTO",
      title: "AUTOMATIZACIÓN",
      offerings: ["Elimina tareas repetitivas", "Conecta herramientas", "Ahorra tiempo"] as const,
    },
    {
      id: "ia",
      layout: "end" as const,
      backdropWord: "IA",
      title: "IA",
      offerings: [
        "Automatiza respuestas",
        "Asiste a tus clientes",
        "Multiplica la productividad",
      ] as const,
    },
  ],
} as const;

/** Cómo trabajamos — copy legacy; sección viva en msStudioProcessFoundation. */
export const MS_STUDIO_HOME_PROCESS = {
  anchorId: "proceso",
  kicker: "Proceso",
  title: "Cómo trabajamos.",
  steps: [
    "Entendemos el problema.",
    "Diseñamos la solución.",
    "Creamos un prototipo.",
    "Desarrollamos el producto.",
    "Lo desplegamos.",
    "Lo mejoramos continuamente.",
  ] as const,
} as const;

/** MotanOS Innovation Lab — no comercial, sin planes ni compra. */
export const MS_STUDIO_HOME_MOTANOS_LAB = {
  anchorId: "motanos-lab",
  badge: "PRÓXIMAMENTE",
  title: "Nuestro laboratorio de innovación.",
  lead:
    "MotanOS es la plataforma que actualmente estamos desarrollando para la digitalización de negocios.",
  body:
    "Construir nuestro propio producto nos permite mejorar continuamente la calidad, arquitectura y experiencia de las soluciones que desarrollamos para nuestros clientes.",
  href: MS_SITE_ROUTES.motanos,
  linkLabel: "Conocer el laboratorio",
} as const;

/** CTA final home. */
export const MS_STUDIO_HOME_FINAL_CTA = {
  anchorId: "hablemos",
  title: "¿Quieres mejorar tu empresa con tecnología?",
  lead:
    "Diseñamos, desarrollamos y evolucionamos productos digitales adaptados a cada empresa.",
  cta: { label: "Hablemos", href: "/#contacto" },
} as const;
