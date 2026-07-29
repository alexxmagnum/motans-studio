/**
 * Motans Studio — Qué hacemos.
 * Galería de productos digitales (bloques verticales, sin cards).
 */

export const MS_STUDIO_OFFER_BLOCK_ID = "MOTANS_STUDIO_OFFER_PRODUCT_GALLERY_V3" as const;

export type MsStudioOfferVisualKind =
  | "web"
  | "saas"
  | "automation"
  | "ai"
  | "integrations";

/** Ritmo tipográfico / composición del bloque. */
export type MsStudioOfferProductLayout =
  | "split-end"
  | "split-start"
  | "stack"
  | "immersive"
  | "center-stack";

export type MsStudioOfferProduct = {
  readonly id: string;
  readonly visual: MsStudioOfferVisualKind;
  readonly layout: MsStudioOfferProductLayout;
  readonly title: string;
  readonly body: string;
};

/** @deprecated alias — i18n sigue usando el nombre histórico `cards`. */
export type MsStudioOfferCard = MsStudioOfferProduct;

export const MS_STUDIO_OFFER = {
  anchorId: "servicios",
  title: "Qué hacemos",
  lead: "Diseñamos y desarrollamos herramientas digitales adaptadas a cada empresa.",
  cards: [
    {
      id: "aplicaciones-web",
      visual: "web",
      layout: "split-end",
      title: "Aplicaciones web",
      body: "Herramientas accesibles desde cualquier lugar para gestionar procesos, clientes y operaciones.",
    },
    {
      id: "plataformas-saas",
      visual: "saas",
      layout: "split-start",
      title: "Plataformas SaaS",
      body: "Productos preparados para crecer contigo y convertirse en parte del día a día de tu empresa.",
    },
    {
      id: "automatizacion",
      visual: "automation",
      layout: "stack",
      title: "Automatización",
      body: "Reducimos tareas repetitivas conectando procesos y herramientas.",
    },
    {
      id: "inteligencia-artificial",
      visual: "ai",
      layout: "stack",
      title: "Inteligencia Artificial",
      body: "Incorporamos IA cuando realmente aporta valor al trabajo diario.",
    },
    {
      id: "integraciones",
      visual: "integrations",
      layout: "center-stack",
      title: "Integraciones",
      body: "Conectamos las herramientas que ya utilizas para que trabajen como un único sistema.",
    },
  ] as const satisfies readonly MsStudioOfferProduct[],
  close: {
    line: "Si tu empresa necesita una herramienta digital — o varias — la diseñamos contigo.",
    cta: "Hablemos",
    href: "/#contacto",
  },
} as const;
