/**
 * MOTANS_STUDIO_PUBLIC_SITE_REBUILD_CORRECTION_V1 — copy y estructura SSOT de la Home.
 */

import { MS_SITE_ROUTES } from "./msSite1701Foundation.js";
import { MS_SITE_HOSTELERIA_PAGE, MS_SITE_STUDIO_PATHS } from "./msSite1703Foundation.js";
import { FASE_17_PUBLISHABLE_ROUTES } from "./fase17CommercialSitePublishableFoundation.js";

export const MS_SITE_HOME_SUPER_PREMIUM_BLOCK_ID =
  "MOTANS_STUDIO_PUBLIC_SITE_REBUILD_CORRECTION_V1" as const;

/** @deprecated alias tests previos */
export const MS_SITE_HOME_SUPER_PREMIUM_BLOCK_ID_V1 =
  MS_SITE_HOME_SUPER_PREMIUM_BLOCK_ID;

export const MS_SITE_HOME_HERO = {
  anchorId: "inicio",
  eyebrow: "MOTANS STUDIO",
  title: "Creamos sistemas digitales para empresas que quieren operar mejor.",
  subcopy:
    "Motans Studio diseña webs premium, aplicaciones, SaaS y productos propios como MotanOS: tecnología a medida con criterio de negocio.",
  ctaPrimary: { label: "Iniciar proyecto", href: "#contacto" },
  ctaSecondary: { label: "Ver MotanOS", href: "#motanos" },
  showcaseLabel: "Ecosistema Motans Studio",
  showcaseLayers: [
    { id: "web", label: "Web premium", detail: "Presencia y SEO" },
    { id: "motanos", label: "MotanOS", detail: "Operativa del negocio" },
    { id: "qr", label: "Carta QR", detail: "Mesa y pedido" },
    { id: "staff", label: "Operativa staff", detail: "Validación en sala" },
    { id: "saas", label: "SaaS modular", detail: "Crece por módulos" },
  ] as const,
} as const;

export const MS_SITE_HOME_CAPABILITIES = {
  anchorId: "servicios",
  eyebrow: "Qué construimos",
  title: "Producto, web y software con el mismo criterio de estudio.",
  lead: "Cuatro líneas de trabajo — cada una con alcance claro y ejecución real.",
  items: [
    {
      id: "motanos",
      title: "MotanOS",
      line: "Sistema operativo para negocios — carta, mesa y operativa con validación del equipo.",
      href: "#motanos",
      accent: "product",
    },
    {
      id: "web",
      title: "Webs premium",
      line: "Presencia digital a medida, SEO y rendimiento para marcas que necesitan credibilidad.",
      href: MS_SITE_ROUTES.servicios,
      accent: "studio",
    },
    {
      id: "saas",
      title: "Aplicaciones y SaaS",
      line: "Plataformas escalables, permisos y arquitectura preparada para crecer.",
      href: MS_SITE_ROUTES.servicios,
      accent: "custom",
    },
    {
      id: "ai",
      title: "IA y automatización",
      line: "Flujos inteligentes y automatización empresarial con criterio humano en el negocio.",
      href: MS_SITE_ROUTES.servicios,
      accent: "automation",
    },
  ] as const,
} as const;

export const MS_SITE_HOME_MOTANOS = {
  anchorId: "motanos",
  eyebrow: "Producto estrella",
  title: "MotanOS",
  lead: "El sistema operativo para negocios de Motans Studio — diseñado, desarrollado y evolucionado por el estudio.",
  modules: [
    {
      id: "carta",
      title: "Carta y mesa",
      line: "Carta digital integrada en el producto — no como SKU suelto.",
    },
    {
      id: "validacion",
      title: "Validación staff",
      line: "El comensal propone; el equipo valida antes de cocina o barra.",
    },
    {
      id: "modular",
      title: "Crece por módulos",
      line: "Activa solo lo que tu negocio necesita, con acompañamiento del estudio.",
    },
  ] as const,
  verticalEyebrow: "Primer vertical",
  verticalTitle: "MotanOS Hostelería",
  verticalLine:
    "Bares, restaurantes y cafeterías — carta QR en mesa, pedidos y operativa con validación del equipo.",
  ctas: [
    { label: "Conocer MotanOS", href: MS_SITE_ROUTES.motanos, variant: "primary" as const },
    { label: "Ver hostelería", href: "#hosteleria", variant: "secondary" as const },
    { label: "Planes orientativos", href: FASE_17_PUBLISHABLE_ROUTES.planes, variant: "ghost" as const },
    {
      label: "Configuración asistida",
      href: FASE_17_PUBLISHABLE_ROUTES.solicitud,
      variant: "ghost" as const,
    },
  ] as const,
} as const;

export const MS_SITE_HOME_VERTICALS = {
  anchorId: "verticales",
  eyebrow: "Verticales",
  title: "¿Encaja en mi tipo de negocio?",
  lead: "Construimos para sectores concretos — empezando por hostelería con MotanOS.",
  items: [
    {
      id: "hosteleria",
      title: "Hostelería",
      problem: "Carta, mesa y operativa desconectadas o lentas en hora punta.",
      solution: "MotanOS Hostelería integra carta QR, pedido desde mesa y validación staff.",
      href: "#hosteleria",
      status: "available" as const,
    },
    {
      id: "locales",
      title: "Negocios locales",
      problem: "Necesitas presencia premium y herramientas sin complejidad innecesaria.",
      solution: "Web profesional, SEO local y sistemas a medida según tu operativa.",
      href: "#contacto",
      status: "available" as const,
    },
    {
      id: "servicios",
      title: "Servicios profesionales",
      problem: "Procesos manuales, datos dispersos y poca visibilidad del negocio.",
      solution: "Aplicaciones web, automatización empresarial e IA aplicada con alcance claro.",
      href: MS_SITE_ROUTES.servicios,
      status: "available" as const,
    },
    {
      id: "retail",
      title: "Retail",
      problem: "Experiencia de cliente y operaciones que deben escalar con criterio.",
      solution: "Arquitectura preparada para futuros verticales — conversación con el estudio.",
      href: "#contacto",
      status: "roadmap" as const,
    },
  ] as const,
} as const;

export const MS_SITE_HOME_HOSTELERIA = {
  anchorId: "hosteleria",
  title: MS_SITE_HOSTELERIA_PAGE.title,
  lead: MS_SITE_HOSTELERIA_PAGE.lead,
  ideas: MS_SITE_HOSTELERIA_PAGE.ideas,
  cta: MS_SITE_HOSTELERIA_PAGE.cta,
  ctaAssisted: MS_SITE_HOSTELERIA_PAGE.ctaAssisted,
} as const;

export const MS_SITE_HOME_ENGAGEMENT = {
  anchorId: "como-trabajar",
  eyebrow: "Cómo podemos ayudarte",
  title: "Elige el camino que encaja",
  lead: "MotanOS es el producto estrella — no el único servicio del estudio.",
  paths: MS_SITE_STUDIO_PATHS,
  bridge: {
    eyebrow: "Del estudio al producto",
    line: "La misma exigencia visual y técnica en tu web y en MotanOS.",
    subline: "Un mismo criterio desde la presencia pública hasta la operativa del negocio.",
  },
} as const;

export const MS_SITE_HOME_EVIDENCE = {
  anchorId: "evidencia",
  eyebrow: "Producto real",
  title: "Diseñado y desarrollado por Motans Studio",
  lead: "Producto propio en evolución — sin testimonios inventados ni métricas vacías.",
  honestLine:
    "Demo y vídeos en preparación. Mientras tanto, explora rutas reales del ecosistema.",
  links: [
    {
      id: "motanos",
      label: "Subsite MotanOS",
      line: "Qué es el producto, módulos y primer vertical.",
      href: MS_SITE_ROUTES.motanos,
    },
    {
      id: "hosteleria",
      label: "MotanOS Hostelería",
      line: "Carta QR, pedido desde mesa y validación staff en staging.",
      href: MS_SITE_ROUTES.hosteleria,
    },
    {
      id: "planes",
      label: "Planes orientativos",
      line: "Comparativa conceptual — sin checkout en este site.",
      href: FASE_17_PUBLISHABLE_ROUTES.planes,
    },
    {
      id: "solicitud",
      label: "Configuración asistida",
      line: "Acompañamiento del estudio para arrancar con alcance claro.",
      href: FASE_17_PUBLISHABLE_ROUTES.solicitud,
    },
  ] as const,
} as const;

export const MS_SITE_HOME_FINAL_CTA = {
  anchorId: "empezar",
  eyebrow: "Siguiente paso",
  title: "Hablemos de tu sistema digital.",
  lead: "Tres caminos claros — una sola conversación con el estudio.",
  paths: [
    {
      id: "web",
      label: "Quiero una web",
      line: "Presencia digital premium con SEO y rendimiento.",
      href: "#contacto",
    },
    {
      id: "motanos",
      label: "Quiero MotanOS",
      line: "Producto estrella para operar tu negocio con módulos.",
      href: "#motanos",
    },
    {
      id: "custom",
      label: "Quiero software a medida",
      line: "Aplicaciones, SaaS y automatización empresarial.",
      href: "#contacto",
    },
  ] as const,
  ctaPrimary: { label: "Hablar con Motans Studio", href: "#contacto" },
} as const;
