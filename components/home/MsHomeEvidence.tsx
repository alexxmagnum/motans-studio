import type React from "react";
import Link from "next/link";
import { MS_SITE_HOME_EVIDENCE } from "../../lib/msSiteHomeSuperPremiumFoundation.js";

export function MsHomeEvidence(): React.ReactElement {
  const section = MS_SITE_HOME_EVIDENCE;

  return (
    <section
      id={section.anchorId}
      className="ms-home-section ms-home-evidence"
      aria-labelledby="ms-home-evidence-title"
    >
      <div className="ms-home-shell">
        <header className="ms-home-section__head ms-home-section__head--wide">
          <p className="ms-home-kicker">{section.eyebrow}</p>
          <h2 id="ms-home-evidence-title" className="ms-home-section__title">
            {section.title}
          </h2>
          <p className="ms-home-section__lead">{section.lead}</p>
          <p className="ms-home-evidence__honest">{section.honestLine}</p>
        </header>

        <div className="ms-home-evidence__list">
          {section.links.map((link, index) => (
            <Link key={link.id} href={link.href} className="ms-home-evidence__row">
              <span className="ms-home-evidence__num" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="ms-home-evidence__body">
                <strong>{link.label}</strong>
                <span>{link.line}</span>
              </span>
              <span className="ms-home-evidence__arrow" aria-hidden="true">
                →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
