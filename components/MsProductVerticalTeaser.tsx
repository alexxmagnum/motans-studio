import type React from "react";
import Link from "next/link";
import { MS_SITE_ROUTES } from "../lib/msSite1701Foundation.js";

export interface MsProductVerticalTeaserProps {
  readonly line: string;
  readonly ctaLabel: string;
  readonly href?: string;
}

export function MsProductVerticalTeaser({
  line,
  ctaLabel,
  href = MS_SITE_ROUTES.hosteleria,
}: MsProductVerticalTeaserProps): React.ReactElement {
  return (
    <Link href={href} className="ms-vertical-teaser">
      <span className="ms-vertical-teaser__hairline" aria-hidden="true" />
      <p className="ms-vertical-teaser__product">{ctaLabel}</p>
      <p className="ms-vertical-teaser__line">{line}</p>
      <span className="ms-vertical-teaser__cta">
        Ver más
        <span aria-hidden="true"> →</span>
      </span>
    </Link>
  );
}
