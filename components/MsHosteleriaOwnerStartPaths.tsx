import type React from "react";
import Link from "next/link";
import { MS_SITE_OWNER_PATH_DECISION } from "../lib/msSiteOwnerOnboardingPathFoundation.js";

type MsHosteleriaOwnerStartPathsProps = {
  readonly variant?: "default" | "compact" | undefined;
};

export function MsHosteleriaOwnerStartPaths({
  variant = "default",
}: MsHosteleriaOwnerStartPathsProps): React.ReactElement {
  const { title, lead, selfService, assisted } = MS_SITE_OWNER_PATH_DECISION;
  const sectionClass =
    variant === "compact"
      ? "ms-owner-start ms-owner-start--compact"
      : "ms-owner-start";

  return (
    <section className={sectionClass} aria-labelledby="ms-owner-start-title">
      <header className="ms-owner-start__head">
        <h2 id="ms-owner-start-title" className="ms-owner-start__title">
          {title}
        </h2>
        {variant !== "compact" ? <p className="ms-lead ms-lead--compact">{lead}</p> : null}
      </header>
      <div className="ms-owner-start__grid">
        <article className="ms-owner-start__card ms-owner-start__card--self">
          <h3 className="ms-owner-start__card-title">{selfService.title}</h3>
          <p className="ms-owner-start__card-summary">{selfService.summary}</p>
          <a href={selfService.ctaHref} className="ms-btn ms-btn--primary">
            {selfService.ctaLabel}
          </a>
        </article>
        <article className="ms-owner-start__card ms-owner-start__card--assisted">
          <h3 className="ms-owner-start__card-title">{assisted.title}</h3>
          <p className="ms-owner-start__card-summary">{assisted.summary}</p>
          <Link href={assisted.ctaHref} className="ms-btn ms-btn--secondary">
            {assisted.ctaLabel}
          </Link>
        </article>
      </div>
    </section>
  );
}
