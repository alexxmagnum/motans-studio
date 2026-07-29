/**
 * Motans Studio — Por qué Motans Studio (Fase 3).
 * Narrativa editorial: forma de trabajar, no catálogo de servicios.
 */

export const MS_STUDIO_WHY_BLOCK_ID = "MOTANS_STUDIO_WHY_EDITORIAL_V1" as const;

export const MS_STUDIO_WHY = {
  anchorId: "estudio",
  kicker: "El estudio",
  headline: {
    line1: "No competimos",
    line2: "por hacer webs.",
    line3Before: "Construimos ",
    line3Accent: "productos",
    line3After: ".",
  },
  lead:
    "Motans Studio existe para empresas que necesitan software con criterio: pensado, diseñado y construido para operar en el tiempo — no para cubrir un entregable.",
  manifesto: "Cada decisión tiene un motivo. Si no lo tiene, no entra.",
  principles: [
    {
      id: "criterio",
      index: "01",
      layout: "statement" as const,
      title: "Primero el criterio.",
      body: "Antes de abrir el editor, entendemos el problema real. El código llega cuando la decisión ya está clara.",
    },
    {
      id: "sistemas",
      index: "02",
      layout: "pull" as const,
      title: "Sistemas, no pantallas.",
      body: "Diseñamos la lógica que sostiene el producto. La interfaz es consecuencia — no el punto de partida.",
    },
    {
      id: "simplicidad",
      index: "03",
      layout: "compact" as const,
      title: "Simplicidad con filo.",
      body: "Quitamos lo que no aporta. Lo que queda tiene que ser exacto, legible y capaz de escalar.",
    },
    {
      id: "duracion",
      index: "04",
      layout: "wide" as const,
      title: "Hecho para durar.",
      body: "Preferimos una arquitectura limpia a un efecto brillante. La calidad manda sobre la prisa.",
    },
  ],
  fit: {
    kicker: "Encaje",
    title: "Con quién trabajamos.",
    yesLabel: "Encaja si",
    yes: [
      "Necesitas un producto digital a medida, no una plantilla disfrazada.",
      "Valoras claridad, ownership y decisiones explícitas.",
      "Prefieres menos ruido y más precisión en cada entrega.",
    ],
    noLabel: "No encaja si",
    no: [
      "Buscas el precio más bajo o el plazo imposible.",
      "Quieres reutilizar una plantilla y llamarla producto.",
      "Necesitas un equipo que diga que sí a todo.",
    ],
  },
  close: {
    line: "Si buscas un estudio que construya contigo — no para impresionar — hablemos.",
    cta: "Hablemos",
    href: "/#contacto",
  },
} as const;
