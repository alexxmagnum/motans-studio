/**
 * MS_SITE_17_03C — Design tokens aligned to @motanos/design-system (no invented palettes).
 * Source: packages/design-system/src/tokens/colors.ts + signature/hospitality.ts
 */

export const MS_SITE_1703C_BLOCK_ID =
  "MS_SITE_17_03C_IMPLEMENTATION_EMERGENCY_VISUAL_REDESIGN" as const;

/** Studio warm surface (hospitality) */
export const msSiteStudioTokens = {
  bg: "#fcfaf6",
  surface: "#fffefc",
  ink: "#1c1814",
  muted: "#6b6258",
  border: "rgba(28, 24, 20, 0.1)",
  heroDeep: "#1a1612",
  warmAccent: "#b85c38",
  heroInk: "#faf6f0",
} as const;

/** MotanOS product surface (ecosystem shell aligned) */
export const msSiteProductTokens = {
  bg: "#141210",
  ink: "#f5f0e8",
  inkMuted: "rgba(245, 240, 232, 0.72)",
  border: "rgba(255, 255, 255, 0.08)",
} as const;

/** Motans brand signals */
export const msSiteBrandTokens = {
  cyan: "#2D9AF4",
  aqua: "#31D2C7",
  lime: "#8FEA1E",
  gradient: "linear-gradient(90deg, #2D9AF4 0%, #31D2C7 52%, #8FEA1E 100%)",
  gradientSoft: "linear-gradient(90deg, #2D9AF4 0%, #31D2C7 100%)",
  productTint: "rgba(45, 154, 244, 0.08)",
  focusRing: "rgba(45, 154, 244, 0.45)",
} as const;
