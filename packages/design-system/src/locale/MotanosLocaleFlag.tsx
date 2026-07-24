import type { ReactNode } from "react";

import type { MotanosLocaleCode } from "./motanosLocaleOptions.js";

export interface MotanosLocaleFlagProps {
  readonly locale: MotanosLocaleCode;
  readonly className?: string | undefined;
  readonly title?: string | undefined;
}

/** Banderas SVG (evita emojis que en Windows se ven como «ES», «GB»…). */
export function MotanosLocaleFlag({
  locale,
  className,
  title,
}: MotanosLocaleFlagProps) {
  const label = title ?? locale.toUpperCase();

  return (
    <span
      className={["public-menu-lang__flag-svg", className].filter(Boolean).join(" ")}
      role="img"
      aria-label={label}
    >
      <svg viewBox="0 0 24 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        {renderFlag(locale)}
      </svg>
    </span>
  );
}

function renderFlag(locale: MotanosLocaleCode): ReactNode {
  switch (locale) {
    case "es":
      return (
        <>
          <rect width="24" height="16" fill="#AA151B" />
          <rect y="4" width="24" height="8" fill="#F1BF00" />
        </>
      );
    case "en":
      return (
        <>
          <rect width="24" height="16" fill="#012169" />
          <path fill="#FFF" d="M0 0l24 16M24 0L0 16" stroke="#FFF" strokeWidth="2.2" />
          <path fill="#C8102E" d="M0 0l24 16M24 0L0 16" stroke="#C8102E" strokeWidth="1.1" />
          <path fill="#FFF" d="M12 0v16M0 8h24" stroke="#FFF" strokeWidth="3.2" />
          <path fill="#C8102E" d="M12 0v16M0 8h24" stroke="#C8102E" strokeWidth="1.6" />
        </>
      );
    case "fr":
      return (
        <>
          <rect width="8" height="16" fill="#002395" />
          <rect x="8" width="8" height="16" fill="#FFF" />
          <rect x="16" width="8" height="16" fill="#ED2939" />
        </>
      );
    case "de":
      return (
        <>
          <rect width="24" height="5.33" fill="#000" />
          <rect y="5.33" width="24" height="5.34" fill="#DD0000" />
          <rect y="10.67" width="24" height="5.33" fill="#FFCE00" />
        </>
      );
    case "it":
      return (
        <>
          <rect width="8" height="16" fill="#009246" />
          <rect x="8" width="8" height="16" fill="#FFF" />
          <rect x="16" width="8" height="16" fill="#CE2B37" />
        </>
      );
    case "pt":
      return (
        <>
          <rect width="10" height="16" fill="#006600" />
          <rect x="10" width="14" height="16" fill="#FF0000" />
          <circle cx="10" cy="8" r="3.2" fill="#FFD700" stroke="#003399" strokeWidth="0.5" />
        </>
      );
    default:
      return <rect width="24" height="16" fill="#E8E4DC" />;
  }
}
