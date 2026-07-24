"use client";

import { useEffect, useState } from "react";
import {
  MS_SITE_LANDING_NAV_SECTIONS,
} from "../lib/msSiteLandingNavFoundation.js";
import {
  getLandingCardTopOffsetPx,
  syncLandingScrollPaddingTop,
} from "../lib/msSiteLandingScroll.js";

function getActiveLandingNavHref(): string {
  const activationLine = getLandingCardTopOffsetPx() + 48;
  const viewportBand = window.innerHeight * 0.72;
  let active: string = MS_SITE_LANDING_NAV_SECTIONS[0].navHref;

  for (const section of MS_SITE_LANDING_NAV_SECTIONS) {
    const element = document.getElementById(section.id);
    if (!element) {
      continue;
    }

    const rect = element.getBoundingClientRect();
    const passedTop = rect.top <= activationLine;
    const intersectsViewport =
      rect.bottom > activationLine && rect.top < viewportBand;

    if (passedTop || intersectsViewport) {
      active = section.navHref;
    }
  }

  return active;
}

function readInitialLandingNavHref(): string {
  if (typeof window === "undefined") {
    return "/";
  }

  const hash = window.location.hash.replace("#", "");
  if (!hash) {
    return "/";
  }

  const match = MS_SITE_LANDING_NAV_SECTIONS.find((section) => section.id === hash);
  return match?.navHref ?? "/";
}

function syncLandingHashWithNavHref(navHref: string): void {
  if (window.location.pathname !== "/") {
    return;
  }

  const desired = navHref === "/" ? "/" : navHref;
  const current = `${window.location.pathname}${window.location.hash}`;

  if (current !== desired) {
    window.history.replaceState(null, "", desired);
  }
}

/** Actualiza el ítem activo del header mientras se recorre la landing. */
export function useMsSiteLandingNavSpy(enabled: boolean): string | undefined {
  // SSR y primer paint del cliente deben coincidir: el hash no viaja al servidor.
  const [activeHref, setActiveHref] = useState<string>("/");
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    setIsHydrated(true);
    setActiveHref(readInitialLandingNavHref());

    syncLandingScrollPaddingTop();

    let frame = 0;
    let delayedUpdate: number | undefined;

    const update = (): void => {
      const next = getActiveLandingNavHref();
      setActiveHref((previous) => (previous === next ? previous : next));
      syncLandingHashWithNavHref(next);
    };

    const scheduleUpdate = (): void => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    const onHashChange = (): void => {
      scheduleUpdate();
    };

    update();
    delayedUpdate = window.setTimeout(update, 0);
    const retryUpdate = window.setTimeout(update, 120);
    const retryUpdateLate = window.setTimeout(update, 400);

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate, { passive: true });
    window.addEventListener("hashchange", onHashChange);

    return () => {
      cancelAnimationFrame(frame);
      if (delayedUpdate !== undefined) {
        window.clearTimeout(delayedUpdate);
      }
      window.clearTimeout(retryUpdate);
      window.clearTimeout(retryUpdateLate);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, [enabled]);

  if (!enabled) {
    return undefined;
  }

  if (!isHydrated) {
    return "/";
  }

  return activeHref;
}
