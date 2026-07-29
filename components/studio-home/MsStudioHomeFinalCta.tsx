"use client";

import type { ReactElement } from "react";
import { MS_STUDIO_HOME_FINAL_CTA } from "../../lib/msStudioHomeFoundation.js";
import { useMsSiteLocale } from "../MsSiteLocaleProvider.js";
import { MsSiteNavAnchor } from "../MsSiteNavAnchor.js";
import { MsStudioSectionEyebrow } from "./MsStudioSectionEyebrow.js";
import { MsStudioTitleWithAccent } from "./MsStudioTitleWithAccent.js";

/** CTA final — puente editorial desde El Estudio hacia contacto. */
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
      <div className="ms-dp-shell msh-final-cta__shell">
        <MsStudioSectionEyebrow>{ui.finalKicker}</MsStudioSectionEyebrow>
        <h2 id={titleId} className="ms-dp-section__title msh-final-cta__title">
          <MsStudioTitleWithAccent text={ui.finalTitle} />
        </h2>
        <p className="ms-dp-section__note msh-final-cta__lead">{ui.finalLead}</p>
        <div className="msh-hero__actions msh-final-cta__actions">
          <MsSiteNavAnchor href={cta.cta.href} className="msh-btn msh-btn--cta msh-btn--cta-hero-primary">
            {ui.hablemos}
            <span className="msh-btn__arrow" aria-hidden="true">
              →
            </span>
          </MsSiteNavAnchor>
        </div>
      </div>
    </section>
  );
}
