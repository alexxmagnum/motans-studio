import type React from "react";
import Link from "next/link";
import { MsFeatureCards } from "./MsFeatureCards.js";
import { MsMotanosStampHeroBand } from "./MsMotanosStampHeroBand.js";
import { MsMotanosVideoCards } from "./MsMotanosVideoCards.js";
import { MsProductVerticalTeaser } from "./MsProductVerticalTeaser.js";
import { MS_SITE_BRAND_HIERARCHY } from "../lib/msSite1701Foundation.js";
import {
  MS_SITE_MOTANOS_PAGE,
  MS_SITE_MOTANOS_VIDEO_CARDS,
} from "../lib/msSite1703Foundation.js";

export function MsLandingMotanosSection(): React.ReactElement {
  return (
    <section className="ms-landing-motanos" aria-labelledby="ms-landing-motanos-title">
      <article id="motanos" className="ms-landing-motanos__card">
        <span className="ms-landing-motanos__card-hairline" aria-hidden="true" />

        <MsMotanosStampHeroBand />

        <div className="ms-landing-motanos__body">
          <header className="ms-landing-section-head">
            <p className="ms-landing-studio-kicker">{MS_SITE_BRAND_HIERARCHY.parent}</p>
            <h2 id="ms-landing-motanos-title" className="ms-landing-section-title">
              {MS_SITE_MOTANOS_PAGE.title}
            </h2>
            <p className="ms-lead">{MS_SITE_MOTANOS_PAGE.lead}</p>
          </header>
          <MsFeatureCards
            items={MS_SITE_MOTANOS_PAGE.pillars}
            variant="product"
            columns={3}
          />
          <MsMotanosVideoCards
            items={MS_SITE_MOTANOS_VIDEO_CARDS}
            sectionTitle={MS_SITE_MOTANOS_PAGE.videoSectionTitle}
            sectionLead={MS_SITE_MOTANOS_PAGE.videoSectionLead}
          />
          <MsProductVerticalTeaser
            line={MS_SITE_MOTANOS_PAGE.verticalLine}
            ctaLabel={MS_SITE_MOTANOS_PAGE.verticalCta}
            href="#hosteleria"
          />
          <div className="ms-actions">
            <Link href="#contacto" className="ms-btn ms-btn--primary">
              {MS_SITE_MOTANOS_PAGE.cta}
            </Link>
          </div>
        </div>
      </article>
    </section>
  );
}
