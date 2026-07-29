/**
 * Motans Studio — footer premium (Fase 6 / cierre 7A).
 */

import { MS_SITE_ROUTES } from "./msSite1701Foundation.js";

export const MS_SITE_FOOTER_BLOCK_ID = "MS_SITE_FOOTER_STUDIO_PREMIUM_V1" as const;

/** @deprecated Alias de compatibilidad — usar MS_SITE_FOOTER_BLOCK_ID */
export const MS_SITE_FOOTER_STUDIO_BAR_V3 = MS_SITE_FOOTER_BLOCK_ID;

export const MS_SITE_FOOTER_CONTACT = {
  email: "info@motans.studio",
  location: "España",
  tagline:
    "Software con precisión de estudio: webs, SaaS, automatización e inteligencia artificial para empresas exigentes.",
} as const;

export type MsSiteFooterLink = {
  readonly href: string;
  readonly label: string;
};

export const MS_SITE_FOOTER_NAV: readonly MsSiteFooterLink[] = [
  { href: "/", label: "Inicio" },
  { href: "/#servicios", label: "Qué hacemos" },
  { href: "/#estudio", label: "El estudio" },
  { href: "/#proceso", label: "Proceso" },
  { href: "/#contacto", label: "Contacto" },
] as const;

export const MS_SITE_FOOTER_SERVICES: readonly MsSiteFooterLink[] = [
  { href: "/#servicios", label: "Software a medida" },
  { href: "/#servicios", label: "Plataformas SaaS" },
  { href: "/#servicios", label: "Automatización" },
  { href: "/#servicios", label: "Inteligencia artificial" },
] as const;

export const MS_SITE_FOOTER_TECH: readonly string[] = [
  "Next.js",
  "TypeScript",
  "React",
  "Node.js",
  "Cloud",
] as const;

/**
 * Redes públicas — vacío hasta tener URLs reales.
 * No publicar `href="#"` ni enlaces “próximamente”.
 */
export const MS_SITE_FOOTER_SOCIAL: readonly {
  readonly id: string;
  readonly label: string;
  readonly href: string;
}[] = [] as const;

export const MS_SITE_FOOTER_LEGAL: readonly MsSiteFooterLink[] = [
  { href: MS_SITE_ROUTES.legalAviso, label: "Aviso legal" },
  { href: MS_SITE_ROUTES.legalPrivacidad, label: "Privacidad" },
  { href: MS_SITE_ROUTES.legalCookies, label: "Cookies" },
  { href: MS_SITE_ROUTES.legalCondiciones, label: "Condiciones" },
  { href: MS_SITE_ROUTES.legalServicios, label: "Servicios" },
  { href: MS_SITE_ROUTES.legalContacto, label: "Contacto legal" },
  { href: MS_SITE_ROUTES.legalAccesibilidad, label: "Accesibilidad" },
] as const;

/** Compatibilidad con tests / consumidores previos. */
export const MS_SITE_FOOTER = {
  productLockup: "MotanOS by Motans Studio",
  productLockupPublic: "Motans Studio",
  legalLinks: MS_SITE_FOOTER_LEGAL,
} as const;
