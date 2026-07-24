import type React from "react";
import Link from "next/link";
import { MS_SITE_HOME_FINAL_CTA } from "../../lib/msSiteHomeSuperPremiumFoundation.js";

export function MsHomeFinalCta(): React.ReactElement {
  const section = MS_SITE_HOME_FINAL_CTA;

  return (
    <section
      id={section.anchorId}
      className="ms-home-section ms-home-closer"
      aria-labelledby="ms-home-closer-title"
    >
      <div className="ms-home-closer__band">
        <div className="ms-home-shell">
          <header className="ms-home-closer__head">
            <p className="ms-home-kicker ms-home-kicker--on-dark">{section.eyebrow}</p>
            <h2 id="ms-home-closer-title" className="ms-home-closer__title">
              {section.title}
            </h2>
            <p className="ms-home-closer__lead">{section.lead}</p>
          </header>

          <div className="ms-home-closer__paths">
            {section.paths.map((path) => (
              <Link key={path.id} href={path.href} className="ms-home-closer__path">
                <strong>{path.label}</strong>
                <span>{path.line}</span>
              </Link>
            ))}
          </div>

          <div className="ms-home-closer__primary">
            <Link href={section.ctaPrimary.href} className="ms-home-btn ms-home-btn--light">
              {section.ctaPrimary.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
