/**
 * Planes conceptuales MotanOS Hostelería — SSOT copy orientativo.
 * Precios TBD. Sin checkout ni importes en UI.
 */

import { MS_SITE_ROUTES } from "./msSite1701Foundation.js";

export const MS_SITE_MOTANOS_PLANS_BLOCK_ID = "MS_SITE_MOTANOS_CONCEPTUAL_PLANS" as const;

export const MS_SITE_MOTANOS_CONCEPTUAL_PLANS = [
  {
    key: "base",
    name: "MotanOS Base",
    description: "Entrada operativa para bares y restaurantes que empiezan",
    audience: "Bares de tapas, cafeterías, food trucks",
    priceLabel: "Precio próximamente",
    highlight: "Hasta 8 mesas · Carta QR · Pedido validado por staff",
    limits: {
      locations: "1 local",
      tables: "Hasta 8 mesas",
      carta: "Carta sin tope comercial publicado",
      staff: "1 owner + 3 usuarios/staff adicionales",
    },
    features: [
      "Carta Publicada MotanOS con acceso QR en mesa",
      "Pedidos con validación staff",
      "Mesas y operativa de sala",
      "Cocina y barra (operativa inicial bajo revisión comercial)",
      "Caja básica bajo revisión comercial",
      "Soporte por email",
    ],
    modules: ["Carta Publicada MotanOS", "Acceso QR", "Mesas", "Pedidos", "Cocina/Barra"],
    pricingStatus: "tbd",
    note: "Precio por definir. Sin Web Restaurante incluida. Consultar con Motans Studio.",
  },
  {
    key: "pro",
    name: "MotanOS Pro",
    description: "Crecimiento con MotanOS Impulso y Web Restaurante incluida",
    audience: "Restaurantes familiares, pizzerías, hamburgueserías",
    priceLabel: "Precio próximamente",
    highlight: "Hasta 20 mesas · Web Restaurante incluida · Impulso",
    featured: true,
    limits: {
      locations: "1 local",
      tables: "Hasta 20 mesas",
      carta: "Carta sin tope comercial publicado",
      staff: "1 owner + 9 usuarios/staff adicionales",
    },
    features: [
      "Todo lo de MotanOS Base",
      "MotanOS Impulso (eventos, promociones y horas valle bajo revisión)",
      "Web Restaurante incluida en subdominio Motans",
      "Misma Carta Publicada MotanOS accesible por QR y web",
      "Historial de pedidos por mesa bajo revisión",
      "Reportes bajo revisión",
      "Soporte prioritario",
    ],
    modules: ["Todo Base +", "MotanOS Impulso", "Web Restaurante", "Reportes"],
    pricingStatus: "tbd",
    note: "Precio por definir. Dominio propio e integración web externa como extra/servicio futuro.",
    addon: "Dominio propio e integración web externa: servicio/add-on futuro",
  },
  {
    key: "premium",
    name: "MotanOS Premium",
    description: "Avanzado con más capacidad y automatizaciones cuando estén disponibles",
    audience: "Restaurantes medianos con operativa exigente",
    priceLabel: "Precio próximamente",
    highlight: "Hasta 30 mesas · Automatizaciones futuras · Soporte dedicado",
    limits: {
      locations: "1 local",
      tables: "Hasta 30 mesas",
      carta: "Carta sin tope comercial publicado",
      staff: "1 owner + 15 usuarios/staff adicionales",
    },
    features: [
      "Todo lo de MotanOS Pro",
      "Web Restaurante incluida en subdominio Motans",
      "Automatizaciones cuando estén disponibles (disclaimer: no operativas hasta GO producto)",
      "Auditoría y backups bajo revisión",
      "Soporte dedicado bajo revisión",
      "Onboarding asistido bajo revisión",
    ],
    modules: ["Todo Pro +", "Automatizaciones (futuro)", "Auditoría", "Soporte dedicado"],
    pricingStatus: "tbd",
    note: "Precio por definir. Dominio propio como opción premium/extra, no incluido por defecto.",
    addon: "Dominio propio e integración web externa: servicio/add-on futuro",
  },
] as const;

export type MsSiteMotanosConceptualPlan = (typeof MS_SITE_MOTANOS_CONCEPTUAL_PLANS)[number];

export const MS_SITE_HOME_PLANS = {
  anchorId: "planes",
  kicker: "Planes",
  title: "MotanOS Hostelería",
  lead: "Carta QR, pedidos validados por staff y operativa de sala. Una carta publicada, varios canales.",
  disclaimer: "Precios por definir. Sin checkout online todavía.",
  trialNote: "Prueba MotanOS 30 días sin tarjeta — un trial por negocio.",
  cta: { label: "Ver planes completos", href: MS_SITE_ROUTES.planes },
  contactCta: { label: "Hablar con Motans Studio", href: "/contacto" },
} as const;

export const MS_SITE_PLANES_PAGE = {
  kicker: "Planes",
  title: "MotanOS Hostelería",
  lead: "Carta QR, pedidos validados por staff y operativa de sala. Una carta publicada, varios canales.",
  disclaimer: "Precios por definir. Sin checkout online todavía.",
  trialNote: "Prueba MotanOS 30 días sin tarjeta — un trial por negocio.",
  ctaPrimary: { label: "Solicitar asesoramiento", href: MS_SITE_ROUTES.solicitud },
  contactCta: { label: "Hablar con Motans Studio", href: "/contacto" },
  registerCta: { label: "O empieza tú mismo con una cuenta MotanOS" },
} as const;
