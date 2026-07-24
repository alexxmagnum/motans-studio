/** Altura sticky del header (min-height .ms-header__inner). */
export const MS_SITE_HEADER_SCROLL_OFFSET_PX = 76;

/** Sube el card un poco respecto a la medida del hero (negativo = menos hueco bajo el header). */
export const MS_SITE_LANDING_SCROLL_OFFSET_ADJUST_PX = -24;

const MS_SITE_LANDING_CARD_SELECTORS = [".msh-hero", ".ms-dp-hero"] as const;

function findLandingHeroCard(): HTMLElement | null {
  for (const selector of MS_SITE_LANDING_CARD_SELECTORS) {
    const element = document.querySelector(selector);
    if (element instanceof HTMLElement) {
      return element;
    }
  }
  return null;
}

let cachedLandingCardTopOffsetPx: number | null = null;

/**
 * Distancia desde el top del viewport hasta el card grande del hero con scroll en 0
 * (misma referencia visual que pulsar Inicio).
 */
export function measureLandingCardTopOffsetPx(): number {
  const heroCard = findLandingHeroCard();
  if (!heroCard) {
    return MS_SITE_HEADER_SCROLL_OFFSET_PX + 28 + MS_SITE_LANDING_SCROLL_OFFSET_ADJUST_PX;
  }

  const top =
    heroCard.getBoundingClientRect().top +
    window.scrollY +
    MS_SITE_LANDING_SCROLL_OFFSET_ADJUST_PX;
  cachedLandingCardTopOffsetPx = top;
  return top;
}

export function getLandingCardTopOffsetPx(): number {
  if (cachedLandingCardTopOffsetPx !== null) {
    return cachedLandingCardTopOffsetPx;
  }
  return measureLandingCardTopOffsetPx();
}

export function scrollLandingToTop(): void {
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

export function scrollLandingToAnchor(anchorId: string): void {
  const id = anchorId?.trim() || "inicio";
  if (id === "inicio") {
    scrollLandingToTop();
    return;
  }

  const target = document.getElementById(id);
  if (!target) {
    scrollLandingToTop();
    return;
  }

  const offset = getLandingCardTopOffsetPx();
  const top = target.getBoundingClientRect().top + window.scrollY - offset;

  window.scrollTo({ top: Math.max(0, top), left: 0, behavior: "auto" });
}

export function syncLandingScrollPaddingTop(): void {
  const offset = measureLandingCardTopOffsetPx();
  document.documentElement.style.setProperty("scroll-padding-top", `${offset}px`);
  document.documentElement.style.setProperty("--ms-landing-scroll-offset", `${offset}px`);
}
