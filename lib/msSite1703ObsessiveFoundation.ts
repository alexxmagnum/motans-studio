/**
 * MS_SITE_17_03C_OBSESSIVE — copy refinado (percepción premium, sin claims nuevos).
 */

import { MS_SITE_PUBLIC_MOTANOS_VISIBLE } from "./msSite1701Foundation.js";

export const MS_SITE_17_03C_OBSESSIVE_BLOCK_ID =
  "MS_SITE_17_03C_IMPLEMENTATION_OBSESSIVE_PREMIUM_REDESIGN" as const;

export const MS_SITE_HOME_OBSESSIVE = {
  brandLabel: "MOTANS STUDIO",
  heroHeadline: "¿Qué necesitas hacer crecer?",
  leadParagraphs: [
    "Motans Studio diseña y desarrolla sistemas digitales reales.",
    "Webs, aplicaciones y MotanOS.",
  ] as const,
} as const;

export const MS_SITE_ECOSYSTEM_BRIDGE_OBSESSIVE = {
  kicker: "Del estudio al producto",
  line: "La misma exigencia visual y técnica en tu web y en MotanOS.",
} as const;

export const MS_SITE_CONFIDENCE_OBSESSIVE = {
  line: "¿Web, MotanOS o las dos? Lo definimos contigo y arrancamos con alcance claro.",
  cta: "Iniciar conversación",
} as const;

export const MS_SITE_CONTACT_OBSESSIVE = {
  kicker: "Contacto",
  /** Conservado — copy con MotanOS para reactivar. */
  trustLead: "Un estudio, una conversación directa — web, MotanOS o el paquete que encaje.",
  /** Copy público mientras MotanOS está oculto. */
  trustLeadPublic: MS_SITE_PUBLIC_MOTANOS_VISIBLE
    ? "Un estudio, una conversación directa — web, MotanOS o el paquete que encaje."
    : "Un estudio, una conversación directa — web, SaaS, automatización o el paquete que encaje.",
} as const;
