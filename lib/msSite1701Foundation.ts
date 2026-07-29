/**
 * MS_SITE_17_01 — Motans Studio commercial site + MotanOS subsite foundation.
 * Sales-safe claims aligned to Fase 13 closure + Fase 14 kitchen/bar foundation.
 */

import { MOTANS_CORPORATE_BRAND_ASSETS } from "@motanos/branding";

export const MS_SITE_1701_BLOCK_ID =
  "MS_SITE_17_01_MOTANS_STUDIO_COMMERCIAL_SITE_WITH_MOTANOS_SUBSITE_FOUNDATION" as const;

export const MS_SITE_BRAND_HIERARCHY = {
  parent: "Motans Studio",
  product: "MotanOS",
  productLockup: "MotanOS by Motans Studio",
  firstVertical: "MotanOS Hostelería",
  ecosystemSeal: "M",
} as const;

export const MS_SITE_BRAND_ASSETS = {
  logoM: {
    path: MOTANS_CORPORATE_BRAND_ASSETS.iconM.publicPath,
    alt: "Motans Studio — sello M del ecosistema",
  },
  logoMs: {
    path: MOTANS_CORPORATE_BRAND_ASSETS.markMsPng.publicPath,
    alt: MOTANS_CORPORATE_BRAND_ASSETS.markMsPng.alt,
  },
  logoMsWebp: {
    path: MOTANS_CORPORATE_BRAND_ASSETS.markMsWebp.publicPath,
    alt: MOTANS_CORPORATE_BRAND_ASSETS.markMsWebp.alt,
  },
  logoMsPng: {
    path: MOTANS_CORPORATE_BRAND_ASSETS.markMsPng.publicPath,
    alt: MOTANS_CORPORATE_BRAND_ASSETS.markMsPng.alt,
  },
  logoMotanOSProduct: {
    path: MOTANS_CORPORATE_BRAND_ASSETS.stamp.publicPath,
    alt: "MotanOS by Motans Studio",
  },
} as const;

export const MS_SITE_ROUTES = {
  home: "/",
  servicios: "/servicios",
  motanos: "/motanos",
  hosteleria: "/motanos/hosteleria",
  contacto: "/contacto",
  planes: "/planes",
  solicitud: "/solicitud",
  legal: "/legal",
  legalAviso: "/legal/aviso-legal",
  legalPrivacidad: "/legal/privacidad",
  legalCookies: "/legal/cookies",
  legalCondiciones: "/legal/condiciones",
  legalServicios: "/legal/servicios",
  legalContacto: "/legal/contacto-legal",
  legalAccesibilidad: "/legal/accesibilidad",
} as const;

export type MsSiteRouteKey = keyof typeof MS_SITE_ROUTES;

/**
 * Visibilidad pública de MotanOS.
 * `false` = MotanOS fuera de superficie pública (nav, home, footer, CTAs, SEO indexable).
 * Fase 0: congelado — no vender ni generar expectativa de producto.
 * Arquitectura y foundations se conservan para reactivar más adelante.
 */
export const MS_SITE_PUBLIC_MOTANOS_VISIBLE = false as const;

/** Navegación principal — landing única por anclas (Fase 1). MotanOS fuera de nav pública. */
export const MS_SITE_NAV_ITEMS: readonly {
  readonly href: string;
  readonly label: string;
  readonly kind: "studio" | "product" | "vertical" | "cta";
}[] = [
  { href: "/", label: "Inicio", kind: "studio" },
  { href: "/#servicios", label: "Qué hacemos", kind: "studio" },
  { href: "/#proceso", label: "Proceso", kind: "studio" },
  { href: "/motanos", label: "MotanOS", kind: "product" },
  { href: "/#contacto", label: "Contacto", kind: "studio" },
];

/** Nav visible en shell: filtra MotanOS cuando `MS_SITE_PUBLIC_MOTANOS_VISIBLE` es false. */
export const MS_SITE_PUBLIC_NAV_ITEMS = MS_SITE_PUBLIC_MOTANOS_VISIBLE
  ? MS_SITE_NAV_ITEMS
  : MS_SITE_NAV_ITEMS.filter((item) => item.kind !== "product" && item.href !== "/motanos");

export const MS_SITE_ALLOWED_CLAIMS: readonly string[] = [
  "Motans Studio crea webs, apps, SaaS y sistemas digitales para profesionales.",
  "MotanOS es el sistema operativo para negocios.",
  "MotanOS Hostelería es el primer vertical disponible.",
  "Carta Digital/QR integrada en MotanOS Hostelería — no se vende como producto suelto.",
  "Pedido QR: el cliente propone; el staff valida antes de operación interna.",
  "Cocina y barra foundation demostrada en entorno staging (colas y preparación inicial).",
  "MotanOS crece por módulos con activación controlada.",
  "España como mercado de contacto comercial; otros países en roadmap.",
];

export const MS_SITE_FORBIDDEN_CLAIMS: readonly string[] = [
  "TPV completo",
  "Pagos integrados o cobro en producción",
  "Fiscalidad o facturación automática",
  "Delivery o Takeaway activos",
  "Cocina/barra completa (ready, served, pantallas TV)",
  "Producción general o alta automática de clientes",
  "IA incluida por defecto",
  "Automatización total sin staff",
  "Carta QR como producto independiente",
  "Motans Studio solo para restaurantes",
];

/** Capacidades demostradas en staging — no producción general. */
export const MS_SITE_HOSTELERIA_STAGING_CAPABILITIES: readonly string[] = [
  "Carta Digital/QR de mesa dentro de MotanOS Hostelería",
  "Propuesta de pedido desde el comensal (cesta e intención de pedido)",
  "Validación, edición y rechazo por staff",
  "Puente a cocina/barra tras validación staff",
  "Colas cocina y barra con tickets de preparación (foundation)",
  "Transición operativa inicial pending → preparing en staging",
];

/** Módulos en roadmap — no activos en este corte. */
export const MS_SITE_HOSTELERIA_ROADMAP_MODULES: readonly string[] = [
  "Estados listo y servido en cocina/barra",
  "Pantallas TV cocina/barra",
  "Precuenta y caja",
  "TPV y pagos",
  "Takeaway",
  "Delivery",
  "App nativa staff (futura; PWA web operativa primero)",
];

export const MS_SITE_STUDIO_SERVICES: readonly {
  readonly id: string;
  readonly title: string;
  readonly description: string;
}[] = [
  {
    id: "webs",
    title: "Webs para profesionales",
    description:
      "Presencia digital premium, SEO y rendimiento para negocios que necesitan credibilidad online.",
  },
  {
    id: "apps",
    title: "Apps",
    description: "Aplicaciones a medida y experiencias app-ready alineadas con tu operativa.",
  },
  {
    id: "saas",
    title: "SaaS a medida",
    description: "Plataformas multi-tenant, permisos y escalabilidad a medida del negocio.",
  },
  {
    id: "automation",
    title: "Automatizaciones",
    description: "Flujos digitales que reducen fricción sin sustituir criterio humano del negocio.",
  },
  {
    id: "digital-products",
    title: "Productos digitales",
    description: "Software y ecosistemas conectados diseñados para operar y crecer con claridad.",
  },
];

export const MS_SITE_DISCLAIMER =
  "Contenido comercial controlado: sin checkout, sin pagos, sin alta automática ni activación productiva general. Piloto y demo bajo acompañamiento Motans Studio." as const;

/** SEO premium: `lib/msSite1703SeoFoundation.ts` */
