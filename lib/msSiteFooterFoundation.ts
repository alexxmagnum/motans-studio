/**
 * Motans Studio — footer (cierre premium editorial).
 */

import { MS_SITE_ROUTES } from "./msSite1701Foundation.js";
import { MS_SITE_IDENTITY } from "./msSiteIdentityFoundation.js";

export const MS_SITE_FOOTER_BLOCK_ID = "MS_SITE_FOOTER_STUDIO_CLOSE_V3" as const;

export const MS_SITE_FOOTER_CONTACT = {
  email: MS_SITE_IDENTITY.email,
  phone: MS_SITE_IDENTITY.phone,
  phoneTel: MS_SITE_IDENTITY.phoneTel,
  whatsappUrl: MS_SITE_IDENTITY.whatsappUrl,
  location: MS_SITE_IDENTITY.address.countryName,
  ctaHref: "/#contacto",
} as const;

export type MsSiteFooterLink = {
  readonly href: string;
  readonly label: string;
};

export const MS_SITE_FOOTER_SPECIALTIES: readonly string[] = [
  "Software a medida",
  "Plataformas SaaS",
  "Automatización",
  "Integraciones",
  "IA aplicada",
  "Diseño UX/UI",
] as const;

/** Cuatro documentos legales. Cookies también accesible vía «Configurar cookies». */
export const MS_SITE_FOOTER_LEGAL: readonly MsSiteFooterLink[] = [
  { href: MS_SITE_ROUTES.legalAviso, label: "Aviso legal" },
  { href: MS_SITE_ROUTES.legalPrivacidad, label: "Privacidad" },
  { href: MS_SITE_ROUTES.legalCookies, label: "Cookies" },
  { href: MS_SITE_ROUTES.legalCondiciones, label: "Condiciones" },
] as const;

export const MS_SITE_FOOTER = {
  brand: MS_SITE_IDENTITY.brand,
  tagline:
    "Software a medida, plataformas SaaS y herramientas digitales para empresas que quieren crecer con tecnología.",
  specialtiesTitle: "Especializados en",
  specialties: MS_SITE_FOOTER_SPECIALTIES,
  talkTitle: "Hablemos",
  contact: MS_SITE_FOOTER_CONTACT,
  legalLinks: MS_SITE_FOOTER_LEGAL,
} as const;
