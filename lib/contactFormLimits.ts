/** Shared contact-form limits (client + server). */

export const CONTACT_MESSAGE_MIN = 80 as const;
export const CONTACT_MESSAGE_MAX = 5000 as const;
export const CONTACT_NAME_MAX = 120 as const;
export const CONTACT_EMAIL_MAX = 254 as const;
export const CONTACT_BUSINESS_MAX = 200 as const;
export const CONTACT_SECTOR_MAX = 80 as const;
export const CONTACT_LABEL_MAX = 160 as const;
export const CONTACT_RATE_LIMIT_MAX = 5 as const;
export const CONTACT_RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;

export const CONTACT_ALLOWED_SECTORS = [
  "",
  "hosteleria",
  "retail",
  "servicios",
  "otro",
] as const;

export type ContactAllowedSector = (typeof CONTACT_ALLOWED_SECTORS)[number];
