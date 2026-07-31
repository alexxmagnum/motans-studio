/**
 * Motans Studio — identidad y contacto oficiales (SSOT producción).
 * Fuente única para SEO, legal, footer y formularios.
 */

export const MS_SITE_IDENTITY_BLOCK_ID = "MS_SITE_IDENTITY_PRODUCTION_V1" as const;

/** Dominio canónico de producción (sin barra final). */
export const MS_SITE_OFFICIAL_ORIGIN = "https://www.motansstudio.com" as const;

export const MS_SITE_IDENTITY = {
  brand: "Motans Studio",
  legalName: "Alexandru Ionut Casian",
  legalForm: "Empresario Individual (Autónomo)",
  taxId: "X5129436E",
  taxIdLabel: "NIE",
  email: "info@motansstudio.com",
  phone: "+34 614 20 64 65",
  phoneTel: "+34614206465",
  /** wa.me — mismo número que teléfono. */
  whatsappUrl: "https://wa.me/34614206465",
  activity:
    "Desarrollo de software, aplicaciones web, plataformas SaaS, automatización, integraciones, diseño UX/UI y consultoría tecnológica.",
  address: {
    streetAddress: "Av. Castellón 1, Bloque 2, Escalera 3, Apartamento 231",
    postalCode: "12320",
    addressLocality: "Sant Jordi",
    addressRegion: "Castellón",
    addressCountry: "ES",
    countryName: "España",
  },
} as const;

export const MS_SITE_IDENTITY_ADDRESS_LINES = [
  MS_SITE_IDENTITY.address.streetAddress,
  `${MS_SITE_IDENTITY.address.postalCode} ${MS_SITE_IDENTITY.address.addressLocality}`,
  `${MS_SITE_IDENTITY.address.addressRegion}, ${MS_SITE_IDENTITY.address.countryName}`,
] as const;

export const MS_SITE_IDENTITY_ADDRESS_ONE_LINE = [
  MS_SITE_IDENTITY.address.streetAddress,
  `${MS_SITE_IDENTITY.address.postalCode} ${MS_SITE_IDENTITY.address.addressLocality}`,
  MS_SITE_IDENTITY.address.addressRegion,
  MS_SITE_IDENTITY.address.countryName,
].join(", ");
