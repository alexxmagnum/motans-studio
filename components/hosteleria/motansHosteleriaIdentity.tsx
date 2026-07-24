import type React from "react";
import { MotansStudioBrandMark } from "../MotansStudioBrandMark.js";

/** Single Motans accent dot — use sparingly. */
export function MotansSystemDot({
  className = "",
}: {
  readonly className?: string;
}): React.ReactElement {
  return <span className={`msh-system-dot ${className}`.trim()} aria-hidden="true" />;
}

/** Single Motans signature line — one per hero, no more. */
export function MotansSignatureLine({
  className = "",
}: {
  readonly className?: string;
}): React.ReactElement {
  return (
    <span className={`msh-signature-line ${className}`.trim()} aria-hidden="true">
      <span className="msh-signature-line__beam" />
      <MotansSystemDot />
    </span>
  );
}

/** Official MotanOS stamp — hero-scale brand mark from repo SSOT. */
export function MotansHeroStamp({
  className = "",
}: {
  readonly className?: string;
}): React.ReactElement {
  return (
    <img
      src="/brand/MotanOS.stamp.png"
      alt=""
      className={`msh-hero-stamp ${className}`.trim()}
      width={1774}
      height={887}
      decoding="async"
      fetchPriority="high"
    />
  );
}

/** Compact monogram for header / declaration only. */
export function MotansMonogram({
  size = 22,
  className = "",
}: {
  readonly size?: number;
  readonly className?: string;
}): React.ReactElement {
  return (
    <span className={`msh-monogram ${className}`.trim()} aria-hidden="true">
      <MotansStudioBrandMark variant="mark-only" height={size} showWordmark={false} />
    </span>
  );
}
