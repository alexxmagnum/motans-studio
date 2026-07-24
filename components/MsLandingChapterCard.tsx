import type React from "react";
import { MS_SITE_BRAND_HIERARCHY } from "../lib/msSite1701Foundation.js";

export interface MsLandingChapterCardProps {
  readonly anchorId?: string | undefined;
  readonly title: string;
  readonly titleId?: string | undefined;
  readonly lead?: string | undefined;
  readonly deck?: string | undefined;
  readonly variant?: "studio" | "product" | "hosteleria" | "contact" | undefined;
  readonly children: React.ReactNode;
}

export function MsLandingChapterCard({
  anchorId,
  title,
  titleId,
  lead,
  deck,
  variant = "studio",
  children,
}: MsLandingChapterCardProps): React.ReactElement {
  return (
    <article
      id={anchorId}
      className={`ms-landing-chapter-card ms-landing-chapter-card--${variant}`}
      aria-labelledby={titleId}
    >
      <span className="ms-landing-chapter-card__hairline" aria-hidden="true" />
      <header className="ms-landing-chapter-card__head ms-landing-section-head">
        <p className="ms-landing-studio-kicker">{MS_SITE_BRAND_HIERARCHY.parent}</p>
        <h2 id={titleId} className="ms-landing-section-title">
          {title}
        </h2>
        {lead ? <p className="ms-lead">{lead}</p> : null}
        {deck ? <p className="ms-landing-chapter-card__deck">{deck}</p> : null}
      </header>
      <div className="ms-landing-chapter-card__body">{children}</div>
    </article>
  );
}
