import type { ReactElement } from "react";
import {
  getMsStudioLandingSection,
  type MsStudioLandingSectionId,
} from "../../lib/msStudioLandingArchitectureFoundation.js";
import { MsStudioSectionEyebrow } from "./MsStudioSectionEyebrow.js";

type MsStudioLandingSectionSlotProps = {
  readonly sectionId: Exclude<
    MsStudioLandingSectionId,
    "inicio" | "servicios" | "estudio" | "contacto"
  >;
  /** Variante visual mínima con chrome existente (sin diseño nuevo). */
  readonly alt?: boolean;
};

const SLOT_COPY: Record<
  MsStudioLandingSectionSlotProps["sectionId"],
  { kicker: string; title: string; note: string }
> = {
  entrega: {
    kicker: "Entrega",
    title: "Qué recibe el cliente",
    note: "Ownership, código y documentación — detalle en una próxima fase.",
  },
  tecnologias: {
    kicker: "Tecnologías",
    title: "Tecnologías",
    note: "Stack y criterio técnico — detalle en una próxima fase.",
  },
  faq: {
    kicker: "FAQ",
    title: "Preguntas frecuentes",
    note: "Respuestas claras — detalle en una próxima fase.",
  },
};

/**
 * Slot de chasis narrativo — Fase 1 (Server Component).
 * Reserva el acto en el scroll; el contenido definitivo llega en fases posteriores.
 */
export function MsStudioLandingSectionSlot({
  sectionId,
  alt = false,
}: MsStudioLandingSectionSlotProps): ReactElement {
  const section = getMsStudioLandingSection(sectionId);
  const copy = SLOT_COPY[sectionId];
  const titleId = `msh-slot-${sectionId}-title`;

  return (
    <section
      id={section.id}
      className={["ms-dp-section", "msh-landing-slot", alt ? "ms-dp-section--alt" : ""]
        .filter(Boolean)
        .join(" ")}
      aria-labelledby={titleId}
      data-landing-slot={section.id}
    >
      <div className="ms-dp-shell">
        <MsStudioSectionEyebrow>{copy.kicker}</MsStudioSectionEyebrow>
        <h2 id={titleId} className="ms-dp-section__title">
          {copy.title}
        </h2>
        <p className="ms-dp-section__note">{copy.note}</p>
      </div>
    </section>
  );
}
