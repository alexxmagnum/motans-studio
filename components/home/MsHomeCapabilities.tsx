import type React from "react";
import Link from "next/link";
import { MS_SITE_HOME_CAPABILITIES } from "../../lib/msSiteHomeSuperPremiumFoundation.js";

export function MsHomeCapabilities(): React.ReactElement {
  const section = MS_SITE_HOME_CAPABILITIES;

  return (
    <section
      id={section.anchorId}
      className="ms-home-section ms-home-build"
      aria-labelledby="ms-home-build-title"
    >
      <div className="ms-home-shell">
        <header className="ms-home-section__head ms-home-section__head--wide">
          <p className="ms-home-kicker">{section.eyebrow}</p>
          <h2 id="ms-home-build-title" className="ms-home-section__title">
            {section.title}
          </h2>
          <p className="ms-home-section__lead">{section.lead}</p>
        </header>

        <div className="ms-home-build__rail">
          {section.items.map((item, index) => (
            <Link
              key={item.id}
              href={item.href}
              className={`ms-home-build__row ms-home-build__row--${item.accent}`}
            >
              <span className="ms-home-build__index" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="ms-home-build__body">
                <h3>{item.title}</h3>
                <p>{item.line}</p>
              </div>
              <span className="ms-home-build__arrow" aria-hidden="true">
                →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
