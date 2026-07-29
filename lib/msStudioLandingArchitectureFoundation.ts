/**
 * Motans Studio — arquitectura narrativa de la landing única (Fase 1).
 * Orden de actos y anclas. Contenido visual definitivo = fases posteriores.
 */

export const MS_STUDIO_LANDING_ARCHITECTURE_BLOCK_ID =
  "MOTANS_STUDIO_LANDING_NARRATIVE_CHASSIS_V1" as const;

export type MsStudioLandingSectionId =
  | "inicio"
  | "servicios"
  | "estudio"
  | "entrega"
  | "tecnologias"
  | "faq"
  | "contacto";

export type MsStudioLandingSection = {
  readonly id: MsStudioLandingSectionId;
  /** Href usado por nav / scroll spy (`/` para inicio). */
  readonly navHref: string;
  /** Si aparece en la navegación principal. */
  readonly inPrimaryNav: boolean;
  readonly kicker: string;
  readonly title: string;
  /** Nota de chasis — sustituible en fases de contenido. */
  readonly slotNote: string;
};

/**
 * Flujo narrativo:
 * Hero → Qué hacemos → El Estudio → CTA → Contacto
 */
export const MS_STUDIO_LANDING_SECTIONS = [
  {
    id: "inicio",
    navHref: "/",
    inPrimaryNav: true,
    kicker: "Inicio",
    title: "Motans Studio",
    slotNote: "Hero actual — rediseño en Fase 2.",
  },
  {
    id: "servicios",
    navHref: "/#servicios",
    inPrimaryNav: true,
    kicker: "Qué hacemos",
    title: "Qué hacemos",
    slotNote: "Editorial Fase 4 — oferta por transformación.",
  },
  {
    id: "estudio",
    navHref: "/#estudio",
    inPrimaryNav: true,
    kicker: "EL ESTUDIO",
    title: "De una necesidad a una herramienta que evoluciona.",
    slotNote: "Línea de producción digital — ancla #estudio.",
  },
  {
    id: "entrega",
    navHref: "/#entrega",
    inPrimaryNav: false,
    kicker: "Entrega",
    title: "Qué recibe el cliente",
    slotNote: "Reservado — no montado en landing pública hasta contenido real.",
  },
  {
    id: "tecnologias",
    navHref: "/#tecnologias",
    inPrimaryNav: false,
    kicker: "Tecnologías",
    title: "Tecnologías",
    slotNote: "Reservado — no montado en landing pública hasta contenido real.",
  },
  {
    id: "faq",
    navHref: "/#faq",
    inPrimaryNav: false,
    kicker: "FAQ",
    title: "Preguntas frecuentes",
    slotNote: "Reservado — fuera de nav y scroll hasta contenido real.",
  },
  {
    id: "contacto",
    navHref: "/#contacto",
    inPrimaryNav: true,
    kicker: "Contacto",
    title: "Hablemos",
    slotNote: "Contacto montado en landing.",
  },
] as const satisfies readonly MsStudioLandingSection[];

/** Secciones presentes en el DOM público (scroll spy / anclas vivas). */
export const MS_STUDIO_LANDING_MOUNTED_SECTION_IDS = [
  "inicio",
  "servicios",
  "estudio",
  "contacto",
] as const satisfies readonly MsStudioLandingSectionId[];

export type MsStudioLandingPrimaryNavItem = {
  readonly href: string;
  readonly label: string;
  readonly kind: "studio";
};

/** Nav visible: Inicio · Qué hacemos · Estudio · Contacto */
export const MS_STUDIO_LANDING_PRIMARY_NAV: readonly MsStudioLandingPrimaryNavItem[] =
  MS_STUDIO_LANDING_SECTIONS.filter((section) => section.inPrimaryNav).map((section) => ({
    href: section.navHref,
    label:
      section.id === "inicio"
        ? "Inicio"
        : section.id === "servicios"
          ? "Qué hacemos"
          : section.id === "estudio"
            ? "Estudio"
            : "Contacto",
    kind: "studio" as const,
  }));

export function getMsStudioLandingSection(
  id: MsStudioLandingSectionId,
): MsStudioLandingSection {
  const section = MS_STUDIO_LANDING_SECTIONS.find((entry) => entry.id === id);
  if (!section) {
    throw new Error(`Unknown landing section: ${id}`);
  }
  return section;
}
