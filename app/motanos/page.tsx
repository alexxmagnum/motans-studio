import type React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { MotansStudioBrandMark } from "../../components/MotansStudioBrandMark.js";
import { MsFeatureCards } from "../../components/MsFeatureCards.js";
import { MsMotanosAccountActions } from "../../components/MsMotanosAccountActions.js";
import { MsProductVerticalTeaser } from "../../components/MsProductVerticalTeaser.js";
import {
  MS_SITE_BRAND_HIERARCHY,
  MS_SITE_ROUTES,
} from "../../lib/msSite1701Foundation.js";
import { MS_SITE_MOTANOS_PAGE } from "../../lib/msSite1703Foundation.js";
import { createMsSitePageMetadata } from "../../lib/msSite1703SeoFoundation.js";

export const metadata: Metadata = createMsSitePageMetadata("motanos");

export default function MotanOSProductPage(): React.ReactElement {
  return (
    <div className="ms-page ms-page--product">
      <section className="ms-product-page" aria-labelledby="ms-motanos-title">
        <span className="ms-product-page__hairline" aria-hidden="true" />
        <div className="ms-product-page__inner ms-hero-page--center">
          <MotansStudioBrandMark variant="lockup-product" height={72} />
          <p className="ms-eyebrow ms-eyebrow--on-dark">{MS_SITE_BRAND_HIERARCHY.productLockup}</p>
          <h1 id="ms-motanos-title">{MS_SITE_MOTANOS_PAGE.title}</h1>
          <p className="ms-lead">{MS_SITE_MOTANOS_PAGE.lead}</p>
          <MsMotanosAccountActions />
          <div className="msh-motanos-hub-actions">
            <Link href={MS_SITE_ROUTES.hosteleria} className="msh-btn msh-btn--cta">
              {MS_SITE_MOTANOS_PAGE.verticalCta}
              <span className="msh-btn__arrow" aria-hidden="true">
                →
              </span>
            </Link>
            <Link href={MS_SITE_ROUTES.planes} className="msh-btn msh-btn--cta msh-btn--cta-secondary">
              Planes
              <span className="msh-btn__arrow" aria-hidden="true">
                →
              </span>
            </Link>
            <Link href={MS_SITE_ROUTES.solicitud} className="msh-btn msh-btn--cta msh-btn--cta-secondary">
              Configuración asistida
              <span className="msh-btn__arrow" aria-hidden="true">
                →
              </span>
            </Link>
          </div>
          <MsFeatureCards
            items={MS_SITE_MOTANOS_PAGE.pillars}
            variant="product"
            columns={3}
          />
        </div>
      </section>

      <section className="ms-chapter ms-chapter--studio-after-product">
        <MsProductVerticalTeaser
          line={MS_SITE_MOTANOS_PAGE.verticalLine}
          ctaLabel={MS_SITE_MOTANOS_PAGE.verticalCta}
        />
        <div className="ms-actions">
          <Link href={MS_SITE_ROUTES.contacto} className="ms-btn ms-btn--primary">
            {MS_SITE_MOTANOS_PAGE.cta}
          </Link>
        </div>
      </section>
    </div>
  );
}
