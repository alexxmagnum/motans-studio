/**
 * MOTANS_STUDIO_DARK_PREMIUM_REFERENCE — copy, tokens y asset 3D oficial de marca.
 */

export const MS_SITE_DARK_PREMIUM_BLOCK_ID = "MOTANS_STUDIO_DARK_PREMIUM_REFERENCE" as const;

/** Render 3D M generado para hero (public/brand). No es recorte del mockup de página. */
export const MS_SITE_DARK_HERO_SCULPTURE = {
  src: "/brand/motans-hero-sculpture.png",
  width: 880,
  height: 1000,
} as const;

export type MsSiteDarkTrustBrandIcon =
  | "diamond"
  | "nativo"
  | "none"
  | "hexagon"
  | "crown"
  | "shield";

export const MS_SITE_DARK_HERO = {
  anchorId: "inicio",
  kicker: "MOTANS STUDIO",
  titleLines: ["Construimos", "productos", "digitales."] as const,
  accentLinePrefix: "Para empresas que quieren",
  accentWord: "crecer",
  cta: { label: "Crear proyecto", href: "#contacto" },
  scrollLabel: "SCROLL",
} as const;

export const MS_SITE_DARK_TRUST = {
  kicker: "MARCAS QUE CONFÍAN",
  brands: [
    { id: "terraza", label: "LA TERRAZA", icon: "diamond" as const },
    { id: "nativo", label: "NATIVO", icon: "nativo" as const },
    { id: "kairos", label: "KAIRÓS", icon: "none" as const },
    { id: "valkiria", label: "VALKIRIA", icon: "hexagon" as const },
    { id: "beluga", label: "BELUGA", icon: "crown" as const },
    { id: "sibaris", label: "SIBARIS", icon: "shield" as const },
  ] as const,
} as const;

export const MS_SITE_DARK_HEADER_CTA = {
  label: "Hablemos",
  href: "/contacto",
} as const;
