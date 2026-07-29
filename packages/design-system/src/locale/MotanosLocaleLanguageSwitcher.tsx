"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";

import { MotanosLocaleFlag } from "./MotanosLocaleFlag.js";
import {
  findMotanosLocaleOption,
  MOTANOS_LOCALE_OPTIONS,
  type MotanosLocaleCode,
  type MotanosLocaleOption,
} from "./motanosLocaleOptions.js";

export interface MotanosLocaleLanguageSwitcherProps {
  readonly locale: MotanosLocaleCode;
  readonly setLocale: (code: MotanosLocaleCode) => void;
  readonly className?: string | undefined;
  readonly options?: readonly MotanosLocaleOption[] | undefined;
  readonly showSoonNotice?: boolean | undefined;
  readonly soonNotice?: string | undefined;
  readonly triggerAriaLabel?: string | undefined;
  readonly listboxAriaLabel?: string | undefined;
  /** Stable id for SSR/static export hydration (avoids useId drift across duplicate instances). */
  readonly panelId?: string | undefined;
}

export function MotanosLocaleLanguageSwitcher({
  locale,
  setLocale,
  className,
  options = MOTANOS_LOCALE_OPTIONS,
  showSoonNotice = false,
  soonNotice,
  triggerAriaLabel,
  listboxAriaLabel = "Seleccionar idioma",
  panelId: panelIdProp,
}: MotanosLocaleLanguageSwitcherProps): ReactNode {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const generatedPanelId = useId();
  const panelId = panelIdProp ?? generatedPanelId;
  const activeOption = findMotanosLocaleOption(locale);
  const triggerLabel =
    triggerAriaLabel ??
    `Idioma: ${activeOption.nativeLabel}. Pulsa para elegir otro idioma`;

  useEffect(() => {
    if (!open) {
      return;
    }
    const closeIfOutside = (event: Event): void => {
      const target = event.target;
      if (target instanceof Node && rootRef.current?.contains(target)) {
        return;
      }
      setOpen(false);
    };
    const onKey = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", closeIfOutside, true);
    document.addEventListener("mousedown", closeIfOutside, true);
    document.addEventListener("touchstart", closeIfOutside, true);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", closeIfOutside, true);
      document.removeEventListener("mousedown", closeIfOutside, true);
      document.removeEventListener("touchstart", closeIfOutside, true);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const selectLocale = (code: MotanosLocaleCode): void => {
    setLocale(code);
    setOpen(false);
  };

  const rootClass = ["public-menu-lang", open ? "is-open" : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={rootClass} ref={rootRef}>
      <button
        type="button"
        className="public-menu-lang__trigger"
        aria-label={triggerLabel}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        <MotanosLocaleFlag
          locale={locale}
          className="public-menu-lang__flag"
          title={activeOption.nativeLabel}
        />
        <span className="public-menu-lang__code">{locale.toUpperCase()}</span>
        <span className="public-menu-lang__chevron" aria-hidden="true" />
      </button>
      {open ? (
        <div
          id={panelId}
          className="public-menu-lang__panel"
          role="listbox"
          aria-label={listboxAriaLabel}
        >
          {showSoonNotice && soonNotice ? (
            <p className="public-menu-lang__soon">{soonNotice}</p>
          ) : null}
          <ul className="public-menu-lang__grid">
            {options.map((option) => {
              const isActive = option.code === locale;
              return (
                <li key={option.code}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={isActive}
                    className={[
                      "public-menu-lang__option",
                      isActive ? "is-active" : "",
                      option.isPrimary ? "is-primary" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    onClick={() => selectLocale(option.code)}
                  >
                    <span className="public-menu-lang__option-head">
                      <MotanosLocaleFlag
                        locale={option.code}
                        className="public-menu-lang__option-flag"
                        title={option.nativeLabel}
                      />
                      <span className="public-menu-lang__option-name">
                        {option.nativeLabel}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
