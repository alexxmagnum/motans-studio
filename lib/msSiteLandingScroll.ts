/** Altura sticky del header (min-height .ms-header__inner). */
export const MS_SITE_HEADER_SCROLL_OFFSET_PX = 76;

/**
 * Hueco extra bajo el header al anclar secciones.
 * Valor bajo → título/eyebrow quedan pegados al header tras el click de nav.
 */
export const MS_SITE_LANDING_SECTION_SCROLL_GAP_PX = 8;

/** @deprecated Prefer getLandingSectionScrollOffsetPx — kept for existing call sites. */
export const MS_SITE_LANDING_SCROLL_OFFSET_ADJUST_PX = -24;

export function getLandingSectionScrollOffsetPx(): number {
  return MS_SITE_HEADER_SCROLL_OFFSET_PX + MS_SITE_LANDING_SECTION_SCROLL_GAP_PX;
}

/**
 * Offset de anclas / spy: justo bajo el header.
 * (Nombre histórico: antes medía la tapa del card del hero.)
 */
export function measureLandingCardTopOffsetPx(): number {
  return getLandingSectionScrollOffsetPx();
}

export function getLandingCardTopOffsetPx(): number {
  return getLandingSectionScrollOffsetPx();
}

/**
 * El id de sección suele estar en el <section> con padding grande.
 * Para que el click de nav no deje un hueco negro, anclamos al bloque de título.
 */
function findLandingAnchorFocus(section: HTMLElement): HTMLElement {
  const selectors = [
    ".msh-contact__opening",
    ".msh-offer__opening",
    ".msh-factory__opening",
    ".msh-eyebrow",
    "[aria-labelledby] > .ms-dp-shell",
    "h1",
    "h2",
  ] as const;

  for (const selector of selectors) {
    const match = section.querySelector(selector);
    if (match instanceof HTMLElement) {
      return match;
    }
  }

  return section;
}

function landingScrollBehavior(): ScrollBehavior {
  if (typeof window === "undefined") {
    return "auto";
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
}

export function scrollLandingToTop(): void {
  window.scrollTo({ top: 0, left: 0, behavior: landingScrollBehavior() });
}

export function scrollLandingToAnchor(anchorId: string): void {
  const id = anchorId?.trim() || "inicio";
  if (id === "inicio") {
    scrollLandingToTop();
    return;
  }

  const section = document.getElementById(id);
  if (!section) {
    scrollLandingToTop();
    return;
  }

  const focus = findLandingAnchorFocus(section);
  const offset = getLandingSectionScrollOffsetPx();
  const top = focus.getBoundingClientRect().top + window.scrollY - offset;

  window.scrollTo({ top: Math.max(0, top), left: 0, behavior: landingScrollBehavior() });
}

export function syncLandingScrollPaddingTop(): void {
  const offset = getLandingSectionScrollOffsetPx();
  document.documentElement.style.setProperty("scroll-padding-top", `${offset}px`);
  document.documentElement.style.setProperty("--ms-landing-scroll-offset", `${offset}px`);
}
