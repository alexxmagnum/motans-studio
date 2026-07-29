/**
 * Motans Studio — Cómo trabajamos (Fase 5).
 * Narrativa editorial de criterio. Sin metodología, sin timeline.
 */

export const MS_STUDIO_PROCESS_BLOCK_ID = "MOTANS_STUDIO_PROCESS_EDITORIAL_V1" as const;

export type MsStudioProcessLayout =
  | "billboard"
  | "offset"
  | "aside"
  | "wide"
  | "pair"
  | "coda";

export type MsStudioProcessMoment = {
  readonly id: string;
  readonly layout: MsStudioProcessLayout;
  readonly eyebrow?: string;
  readonly title: string;
  readonly body: string;
  /** Solo layout `aside`: frase corta al margen. */
  readonly aside?: string;
  /** Solo layout `pair`: línea de apoyo bajo el título. */
  readonly support?: string;
};

export const MS_STUDIO_PROCESS = {
  anchorId: "proceso",
  kicker: "Proceso",
  headline: {
    line1: "Un proceso claro.",
    line2Before: "Sin perder ",
    line2Accent: "tiempo",
    line2After: ".",
  },
  lead: "Cada proyecto pasa por las mismas decisiones serias. No hay magia: hay criterio, orden y revisión hasta que el resultado encaja con el negocio.",
  moments: [
    {
      id: "entender",
      layout: "billboard",
      eyebrow: "Antes de escribir código",
      title: "Entendemos el negocio.",
      body: "No empezamos por la pantalla. Empezamos por cómo opera tu empresa, dónde se pierde tiempo y qué tiene que cambiar de verdad.",
    },
    {
      id: "disenar",
      layout: "offset",
      eyebrow: "Antes de desarrollar",
      title: "Diseñamos la decisión.",
      body: "El diseño no es maquillaje. Es acordar qué se construye, para quién y con qué límites — antes de comprometer semanas de desarrollo.",
    },
    {
      id: "validar",
      layout: "aside",
      title: "Validamos antes de escalar.",
      body: "Preferimos corregir una decisión a mitad de camino que descubrirla demasiado tarde. Menos rehacer. Más certeza.",
      aside: "Criterio antes que volumen.",
    },
    {
      id: "construir",
      layout: "wide",
      eyebrow: "Construcción",
      title: "Construimos con calidad, no con prisa.",
      body: "Código limpio, arquitectura sensata y detalle que se nota cuando el producto ya está en manos del equipo que lo usa cada día.",
    },
    {
      id: "revisar",
      layout: "pair",
      title: "Revisamos hasta que tenga sentido.",
      body: "No entregamos “acabado” solo porque llega la fecha. Entregamos algo que se entiende, se usa y se sostiene.",
      support: "El resultado importa más que el checklist.",
    },
    {
      id: "acompanar",
      layout: "coda",
      eyebrow: "Después del lanzamiento",
      title: "Seguimos cuando el producto ya está vivo.",
      body: "El go-live no es el final. Acompañamos, ajustamos y mejoramos cuando la realidad del negocio lo pide.",
    },
  ] as const satisfies readonly MsStudioProcessMoment[],
  closing: "No vendemos metodología. Trabajamos con método.",
} as const;
