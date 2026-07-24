import type React from "react";
import Link from "next/link";
import {
  MS_SITE_HOME_PLANS,
  MS_SITE_MOTANOS_CONCEPTUAL_PLANS,
  MS_SITE_PLANES_PAGE,
} from "../../lib/msSiteMotanosPlansFoundation.js";
import { buildMotanosClientRegisterUrl } from "../../lib/msSiteSaasOnboardingCtaFoundation.js";
import { MsHomePlansAccordion } from "../home/MsHomePlanAccordionCard.js";

/** Bloque Planes MotanOS — home (#planes) y página /planes. */
export function MsMotanosPlansSection({
  variant = "home",
}: {
  readonly variant?: "home" | "page";
}): React.ReactElement {
  const isHome = variant === "home";
  const copy = isHome ? MS_SITE_HOME_PLANS : MS_SITE_PLANES_PAGE;
  const Heading = isHome ? "h2" : "h1";
  const titleId = isHome ? "ms-dp-planes-title" : "ms-planes-page-title";

  return (
    <section
      id={isHome ? MS_SITE_HOME_PLANS.anchorId : undefined}
      className={["ms-dp-section", "ms-dp-section--alt", "msh-plans", isHome ? "" : "msh-plans--page"]
        .filter(Boolean)
        .join(" ")}
      aria-labelledby={titleId}
    >
      <div className="ms-dp-shell">
        <p className="ms-dp-section__kicker">{copy.kicker}</p>
        <Heading id={titleId} className="ms-dp-section__title">
          {copy.title}
        </Heading>
        <p className="ms-dp-section__note">{copy.lead}</p>

        <MsHomePlansAccordion plans={MS_SITE_MOTANOS_CONCEPTUAL_PLANS} />

        <p className="msh-plans__disclaimer">{copy.disclaimer}</p>
        <p className="msh-plans__trial">{copy.trialNote}</p>

        <div className="msh-plans__actions">
          {isHome ? (
            <>
              <Link href={MS_SITE_HOME_PLANS.cta.href} className="msh-btn msh-btn--cta">
                {MS_SITE_HOME_PLANS.cta.label}
                <span className="msh-btn__arrow" aria-hidden="true">
                  →
                </span>
              </Link>
              <Link href={MS_SITE_HOME_PLANS.contactCta.href} className="ms-dp-link">
                {MS_SITE_HOME_PLANS.contactCta.label} →
              </Link>
            </>
          ) : (
            <>
              <Link href={MS_SITE_PLANES_PAGE.ctaPrimary.href} className="msh-btn msh-btn--cta">
                {MS_SITE_PLANES_PAGE.ctaPrimary.label}
                <span className="msh-btn__arrow" aria-hidden="true">
                  →
                </span>
              </Link>
              <Link href={MS_SITE_PLANES_PAGE.contactCta.href} className="ms-dp-link">
                {MS_SITE_PLANES_PAGE.contactCta.label} →
              </Link>
              <Link href={buildMotanosClientRegisterUrl()} className="ms-dp-link msh-plans__register">
                {MS_SITE_PLANES_PAGE.registerCta.label} →
              </Link>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
