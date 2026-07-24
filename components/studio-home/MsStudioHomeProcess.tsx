"use client";

import type { ReactElement } from "react";
import { MS_STUDIO_HOME_PROCESS } from "../../lib/msStudioHomeFoundation.js";
import { useMsSiteLocale } from "../MsSiteLocaleProvider.js";

/**
 * Cómo trabajamos — timeline premium.
 * Reutiliza ms-dp-section + msh-continuity item chrome (CSS ya en layout).
 */
export function MsStudioHomeProcess(): ReactElement {
  const section = MS_STUDIO_HOME_PROCESS;
  const { ui } = useMsSiteLocale();
  const titleId = "msh-process-title";

  return (
    <section
      id={section.anchorId}
      className="ms-dp-section msh-process"
      aria-labelledby={titleId}
    >
      <div className="ms-dp-shell">
        <p className="ms-dp-section__kicker">{ui.processKicker}</p>
        <h2 id={titleId} className="ms-dp-section__title">
          {ui.processTitle}
        </h2>
        <ol className="ms-ladder msh-process__ladder">
          {ui.processSteps.map((step, index) => (
            <li key={step} className="ms-ladder__step msh-process__step">
              <span className="ms-ladder__index msh-process__index" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="ms-ladder__copy msh-process__copy">
                <strong className="msh-continuity__item-title">{step}</strong>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
