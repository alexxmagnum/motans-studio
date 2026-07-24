import type { ReactElement } from "react";
import Link from "next/link";
import { MS_SITE_BRAND_ASSETS } from "../../lib/msSite1701Foundation.js";
import { MS_STUDIO_HOME_MOTANOS_LAB } from "../../lib/msStudioHomeFoundation.js";
import { MsCapMotanosStampInteractive } from "../studio-services/MsCapMotanosStampInteractive.js";
import { MsStudioCapabilitiesVisual } from "../studio-services/MsStudioCapabilitiesVisual.js";

/**
 * MotanOS Innovation Lab — laboratorio en desarrollo (PRÓXIMAMENTE).
 * Reutiliza chrome mscap MotanOS + stamp; sin pricing ni lenguaje de venta.
 */
export function MsStudioHomeMotanosLab(): ReactElement {
  const lab = MS_STUDIO_HOME_MOTANOS_LAB;
  const titleId = "msh-motanos-lab-title";

  return (
    <section
      id={lab.anchorId}
      className="mscap mscap--v13 msh-motanos-lab"
      aria-labelledby={titleId}
    >
      <article className="mscap-block mscap-block--motanos">
        <div className="mscap-rail mscap-block__row mscap-block__row--motanos">
          <div className="mscap-block__thumb">
            <MsStudioCapabilitiesVisual variant="motanos" expandable />
          </div>
          <div className="mscap-block__copy mscap-block__copy--motanos">
            <p className="mscap-block__kicker msh-motanos-lab__badge">{lab.badge}</p>
            <div className="mscap-block__stamp-wrap mscap-block__stamp-wrap--motanos">
              <MsCapMotanosStampInteractive
                stampSrc={MS_SITE_BRAND_ASSETS.logoMotanOSProduct.path}
                label={MS_SITE_BRAND_ASSETS.logoMotanOSProduct.alt}
              />
            </div>
            <div className="mscap-motanos-body">
              <h2 id={titleId} className="mscap-block__subtitle">
                {lab.title}
              </h2>
              <p className="mscap-block__line msh-hero__subtitle">{lab.lead}</p>
              <p className="mscap-block__line msh-hero__subtitle">{lab.body}</p>
              <Link
                href={lab.href}
                className="mscap-block__cta msh-btn msh-btn--cta msh-btn--cta-hero-secondary"
              >
                {lab.linkLabel}
                <span className="mscap-block__cta-arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}
