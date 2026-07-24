import type React from "react";
import Link from "next/link";
import { MS_SITE_BRAND_HIERARCHY } from "../lib/msSite1701Foundation.js";
import { MS_SITE_HOSTELERIA_PAGE } from "../lib/msSite1703Foundation.js";
import { buildMotanosClientRegisterUrl } from "../lib/msSiteSaasOnboardingCtaFoundation.js";
import { MS_SITE_OWNER_START_ASSISTED } from "../lib/msSiteOwnerOnboardingPathFoundation.js";
import { MsFeatureCards } from "./MsFeatureCards.js";
import { MsHosteleriaOwnerStartPaths } from "./MsHosteleriaOwnerStartPaths.js";
import { MsMotanosStampHeroBand } from "./MsMotanosStampHeroBand.js";

export function MsLandingHosteleriaSection(): React.ReactElement {
  return (
    <section className="ms-landing-hosteleria" aria-labelledby="ms-landing-hosteleria-title">
      <article id="hosteleria" className="ms-landing-motanos__card ms-landing-hosteleria__card">
        <span className="ms-landing-motanos__card-hairline" aria-hidden="true" />

        <MsMotanosStampHeroBand />

        <div className="ms-landing-motanos__body">
          <header className="ms-landing-section-head ms-landing-hosteleria__head">
            <p className="ms-landing-studio-kicker">{MS_SITE_BRAND_HIERARCHY.parent}</p>
            <h2 id="ms-landing-hosteleria-title" className="ms-landing-section-title">
              {MS_SITE_HOSTELERIA_PAGE.title}
            </h2>
            <p className="ms-lead">{MS_SITE_HOSTELERIA_PAGE.lead}</p>
          </header>

          <MsFeatureCards items={MS_SITE_HOSTELERIA_PAGE.ideas} variant="studio" columns={2} />
          <MsHosteleriaOwnerStartPaths />
          <div className="ms-actions ms-actions--compact">
            <a href={buildMotanosClientRegisterUrl()} className="ms-btn ms-btn--ghost">
              Registro MotanOS
            </a>
            <Link href={MS_SITE_OWNER_START_ASSISTED.href} className="ms-btn ms-btn--ghost">
              {MS_SITE_HOSTELERIA_PAGE.ctaAssisted}
            </Link>
          </div>
        </div>
      </article>
    </section>
  );
}
