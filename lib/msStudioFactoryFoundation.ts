/**
 * Motans Studio — El Estudio (recorrido necesidad → herramienta que evoluciona).
 * Ancla #estudio.
 */

export const MS_STUDIO_FACTORY_BLOCK_ID = "MOTANS_STUDIO_FACTORY_LINE_V1" as const;

export const MS_STUDIO_FACTORY = {
  anchorId: "estudio" as const,
  kicker: "EL ESTUDIO",
  titleBefore: "De una necesidad a una herramienta que ",
  titleAccent: "evoluciona",
  titleAfter: ".",
  title: "De una necesidad a una herramienta que evoluciona.",
  lead:
    "Analizamos el problema, diseñamos la solución y construimos una base lista para crecer y adaptarse.",
} as const;

export type MsStudioFactoryPhaseId =
  | "idea"
  | "analisis"
  | "diseno"
  | "arquitectura"
  | "desarrollo"
  | "automatizacion"
  | "lanzamiento"
  | "evolucion";

export type MsStudioFactoryPhase = {
  readonly id: MsStudioFactoryPhaseId;
  readonly label: string;
  readonly index: string;
  readonly blurb: string;
};

export const MS_STUDIO_FACTORY_PHASES = [
  {
    id: "idea",
    label: "Idea",
    index: "01",
    blurb: "Escuchamos el problema real y el objetivo de negocio.",
  },
  {
    id: "analisis",
    label: "Análisis",
    index: "02",
    blurb: "Mapeamos fricción, datos y prioridad de impacto.",
  },
  {
    id: "diseno",
    label: "Diseño",
    index: "03",
    blurb: "Definimos la experiencia y el flujo que debe funcionar.",
  },
  {
    id: "arquitectura",
    label: "Arquitectura",
    index: "04",
    blurb: "Montamos una base sólida, clara y preparada para crecer.",
  },
  {
    id: "desarrollo",
    label: "Desarrollo",
    index: "05",
    blurb: "Construimos el producto con calidad y ritmo de entrega.",
  },
  {
    id: "automatizacion",
    label: "Automatización",
    index: "06",
    blurb: "Quitamos trabajo manual donde aporta de verdad.",
  },
  {
    id: "lanzamiento",
    label: "Lanzamiento",
    index: "07",
    blurb: "Ponemos en marcha, medimos y estabilizamos en real.",
  },
  {
    id: "evolucion",
    label: "Evolución",
    index: "08",
    blurb: "Iteramos con evidencia: la herramienta sigue mejorando.",
  },
] as const satisfies readonly MsStudioFactoryPhase[];
