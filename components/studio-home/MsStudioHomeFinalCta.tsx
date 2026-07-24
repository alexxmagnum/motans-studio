"use client";

import type { ReactElement } from "react";
import Link from "next/link";
import { MS_STUDIO_HOME_FINAL_CTA } from "../../lib/msStudioHomeFoundation.js";
import { useMsSiteLocale } from "../MsSiteLocaleProvider.js";

/** CTA final home — chrome ms-dp-section + botones msh-btn existentes. */
export function MsStudioHomeFinalCta(): ReactElement {
  const cta = MS_STUDIO_HOME_FINAL_CTA;
  const { ui } = useMsSiteLocale();
  const titleId = "msh-final-cta-title";

  return (
    <section
      id={cta.anchorId}
      className="ms-dp-section ms-dp-section--alt msh-final-cta"
      aria-labelledby={titleId}
    >
      <div className="ms-dp-shell">
        <h2 id={titleId} className="ms-dp-section__title">
          {ui.finalTitle}
        </h2>
        <p className="ms-dp-section__note">{ui.finalLead}</p>
        <div className="msh-hero__actions">
          <Link href={cta.cta.href} className="msh-btn msh-btn--cta msh-btn--cta-hero-primary">
            {ui.hablemos}
            <span className="msh-btn__arrow" aria-hidden="true">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
