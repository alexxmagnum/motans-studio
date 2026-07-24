"use client";

import type React from "react";
import { useEffect, useRef } from "react";
import { useMsSiteLocale } from "./MsSiteLocaleProvider.js";
import { MsSiteLanguageSelector } from "./MsSiteLanguageSelector.js";
import { MsSiteNavLinks } from "./MsSiteNavLinks.js";

export interface MsSiteMobileNavProps {
  readonly activePath?: string | undefined;
}

export function MsSiteMobileNav({ activePath }: MsSiteMobileNavProps): React.ReactElement {
  const { nav } = useMsSiteLocale();
  const detailsRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const details = detailsRef.current;
    if (!details) {
      return;
    }

    let removeOutsideListeners: (() => void) | undefined;

    const detachOutsideListeners = (): void => {
      removeOutsideListeners?.();
      removeOutsideListeners = undefined;
    };

    const attachOutsideListeners = (): void => {
      detachOutsideListeners();

      const closeIfOutside = (event: Event): void => {
        const target = event.target;
        if (target instanceof Node && details.contains(target)) {
          return;
        }
        details.open = false;
      };

      const onKey = (event: KeyboardEvent): void => {
        if (event.key === "Escape") {
          details.open = false;
        }
      };

      document.addEventListener("pointerdown", closeIfOutside, true);
      document.addEventListener("mousedown", closeIfOutside, true);
      document.addEventListener("touchstart", closeIfOutside, true);
      window.addEventListener("keydown", onKey);

      removeOutsideListeners = () => {
        document.removeEventListener("pointerdown", closeIfOutside, true);
        document.removeEventListener("mousedown", closeIfOutside, true);
        document.removeEventListener("touchstart", closeIfOutside, true);
        window.removeEventListener("keydown", onKey);
      };
    };

    const onToggle = (): void => {
      if (details.open) {
        attachOutsideListeners();
      } else {
        detachOutsideListeners();
      }
    };

    details.addEventListener("toggle", onToggle);
    return () => {
      details.removeEventListener("toggle", onToggle);
      detachOutsideListeners();
    };
  }, []);

  return (
    <details ref={detailsRef} className="ms-nav-mobile">
      <summary>{nav.menu}</summary>
      <nav className="ms-nav-mobile__panel" aria-label="Principal móvil">
        <div className="ms-nav-mobile__locale">
          <span className="ms-nav-mobile__locale-label">{nav.language}</span>
          <MsSiteLanguageSelector panelId="ms-site-lang-mobile" />
        </div>
        <MsSiteNavLinks activePath={activePath} className="" />
      </nav>
    </details>
  );
}
