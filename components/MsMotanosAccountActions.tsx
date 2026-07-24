import type React from "react";
import {
  MS_SITE_MOTANOS_ACCOUNT_CTA_LABELS,
  buildMotanosClientLoginUrl,
  buildMotanosClientRegisterUrl,
} from "../lib/msSiteSaasOnboardingCtaFoundation.js";

/** Crear cuenta / Mi cuenta — enlaces externos a motanos-client. */
export function MsMotanosAccountActions(): React.ReactElement {
  return (
    <div className="msh-hero__actions msh-hero__actions--motanos">
      <a href={buildMotanosClientRegisterUrl()} className="msh-btn msh-btn--cta">
        {MS_SITE_MOTANOS_ACCOUNT_CTA_LABELS.createAccount}
        <span className="msh-btn__arrow" aria-hidden="true">
          →
        </span>
      </a>
      <a href={buildMotanosClientLoginUrl()} className="msh-btn msh-btn--cta">
        {MS_SITE_MOTANOS_ACCOUNT_CTA_LABELS.myAccount}
        <span className="msh-btn__arrow" aria-hidden="true">
          →
        </span>
      </a>
    </div>
  );
}
