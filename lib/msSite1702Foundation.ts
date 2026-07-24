/**
 * MS_SITE_17_02 — Super premium UI/UX + brand refinement (copy y bloques, sin rutas nuevas).
 */

export const MS_SITE_1702_BLOCK_ID =
  "MS_SITE_17_02_SUPER_PREMIUM_UI_UX_BRAND_REFINEMENT" as const;

/** Formas de trabajar con Motans Studio — MotanOS no es obligatorio. */
export const MS_SITE_ENGAGEMENT_PATHS: readonly {
  readonly id: string;
  readonly title: string;
  readonly summary: string;
  readonly fit: string;
  readonly ctaLabel: string;
  readonly ctaHref: string;
  readonly accent: "studio" | "product" | "bundle";
}[] = [
  {
    id: "web-only",
    title: "Solo web profesional",
    summary: "Presencia digital, SEO y credibilidad sin tocar tu operativa interna.",
    fit: "Ideal si hoy necesitas vender mejor online, no cambiar cocina ni pedidos.",
    ctaLabel: "Pedir conversación web",
    ctaHref: "/contacto",
    accent: "studio",
  },
  {
    id: "motanos-only",
    title: "Solo MotanOS",
    summary:
      "Implantamos el producto estrella sin rehacer tu web actual: la carta y la operación viven en MotanOS.",
    fit: "Para negocios que ya tienen web y quieren orden en mesa, staff y cocina/barra.",
    ctaLabel: "Ver MotanOS",
    ctaHref: "/motanos",
    accent: "product",
  },
  {
    id: "web-motanos",
    title: "Web + MotanOS",
    summary: "Paquete completo: presencia pública y sistema operativo alineados, una sola dirección creativa.",
    fit: "Cuando quieres coherencia de marca de punta a punta.",
    ctaLabel: "Hablar del paquete",
    ctaHref: "/contacto",
    accent: "bundle",
  },
];

export const MS_SITE_ECOSYSTEM_LADDER: readonly {
  readonly seal: "M" | "MS" | "MotanOS" | "Hostelería";
  readonly label: string;
  readonly detail: string;
}[] = [
  { seal: "M", label: "Sello ecosistema", detail: "Continuidad visual entre superficies" },
  { seal: "MS", label: "Motans Studio", detail: "Empresa: webs, apps, SaaS, automatizaciones" },
  { seal: "MotanOS", label: "MotanOS by Motans Studio", detail: "Producto SaaS estrella" },
  { seal: "Hostelería", label: "MotanOS Hostelería", detail: "Primer vertical demostrable" },
];

export const MS_SITE_TRUST_PRINCIPLES: readonly string[] = [
  "Sin métricas inventadas ni logos de clientes ficticios.",
  "Claims alineados a lo demostrado en staging — honestos en piloto.",
  "Motans Studio no es solo restaurantes; Hostelería es el primer vertical de MotanOS.",
  "La web del cliente es opcional; MotanOS puede implantarse sin rehacer tu web.",
];

export const MS_SITE_HOME_HERO = {
  eyebrow: "Estudio digital · SaaS · sistemas a medida",
  title: "Motans Studio",
  lead: "Construimos webs, apps y plataformas que se sienten premium — y un producto estrella, MotanOS, para operar el negocio con criterio.",
  sublead:
    "Puedes contratar solo web, solo MotanOS o ambos. Sin obligarte a un paquete que no necesitas.",
} as const;
