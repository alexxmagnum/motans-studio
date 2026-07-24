import { MS_SITE_ROUTES } from "./msSite1701Foundation.js";
import { MS_SITE_PUBLIC_MOTANOS_VISIBLE } from "./msSite1701Foundation.js";

export const MS_SITE_FOOTER_BLOCK_ID = "MS_SITE_FOOTER_STUDIO_BAR_V3" as const;

/** Footer bar — solo legal y copyright. Sin copy del hero ni menú. */
export const MS_SITE_FOOTER = {
  /** Conservado para reactivar MotanOS en público. */
  productLockup: "MotanOS by Motans Studio",
  /** Lockup visible mientras MotanOS está oculto en la experiencia pública. */
  productLockupPublic: MS_SITE_PUBLIC_MOTANOS_VISIBLE
    ? "MotanOS by Motans Studio"
    : "Motans Studio",
  legalLinks: [{ href: MS_SITE_ROUTES.legal, label: "Aviso legal" }],
} as const;
