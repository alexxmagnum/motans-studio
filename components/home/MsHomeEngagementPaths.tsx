import type React from "react";
import { MS_SITE_HOME_ENGAGEMENT } from "../../lib/msSiteHomeSuperPremiumFoundation.js";

export function MsHomeEngagementPaths(): React.ReactElement {
  const section = MS_SITE_HOME_ENGAGEMENT;

  return (
    <section
      id={section.anchorId}
      className="ms-home-section ms-home-paths"
      aria-labelledby="ms-home-paths-title"
    >
      <div className="ms-home-shell">
        <header className="ms-home-section__head ms-home-section__head--wide">
          <p className="ms-home-kicker">{section.eyebrow}</p>
          <h2 id="ms-home-paths-title" className="ms-home-section__title">
            {section.title}
          </h2>
          <p className="ms-home-section__lead">{section.lead}</p>
        </header>

        <div className="ms-home-paths__selector" role="list">
          {section.paths.map((path, index) => (
            <a
              key={path.id}
              href={path.href}
              className={`ms-home-paths__option ms-home-paths__option--${path.accent}`}
              role="listitem"
            >
              <span className="ms-home-paths__option-num" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="ms-home-paths__option-body">
                <strong>{path.label}</strong>
                <span>{path.line}</span>
              </span>
            </a>
          ))}
        </div>

        <aside className="ms-home-paths__bridge">
          <p className="ms-home-kicker">{section.bridge.eyebrow}</p>
          <p className="ms-home-paths__bridge-line">{section.bridge.line}</p>
          <p className="ms-home-paths__bridge-sub">{section.bridge.subline}</p>
        </aside>
      </div>
    </section>
  );
}
