import type React from "react";
import Link from "next/link";
import { MsHosteleriaOwnerStartPaths } from "../MsHosteleriaOwnerStartPaths.js";
import { MS_SITE_HOME_HOSTELERIA } from "../../lib/msSiteHomeSuperPremiumFoundation.js";

export function MsHomeHosteleriaDepth(): React.ReactElement {
  const section = MS_SITE_HOME_HOSTELERIA;

  return (
    <section
      id={section.anchorId}
      className="ms-home-section ms-home-hosteleria"
      aria-labelledby="ms-home-hosteleria-title"
    >
      <div className="ms-home-shell">
        <header className="ms-home-hosteleria__head">
          <p className="ms-home-kicker">MotanOS Hostelería</p>
          <h2 id="ms-home-hosteleria-title" className="ms-home-section__title">
            {section.title}
          </h2>
          <p className="ms-home-section__lead">{section.lead}</p>
        </header>

        <div className="ms-home-hosteleria__grid">
          {section.ideas.map((idea, index) => (
            <article key={idea.id} className="ms-home-hosteleria__idea">
              <span className="ms-home-hosteleria__idea-num" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{idea.title}</h3>
              <p>{idea.line}</p>
            </article>
          ))}
        </div>

        <div className="ms-home-hosteleria__owner">
          <MsHosteleriaOwnerStartPaths variant="compact" />
        </div>

        <div className="ms-home-hosteleria__links">
          <Link href="/motanos/hosteleria" className="ms-home-btn ms-home-btn--ghost">
            Página completa de hostelería
          </Link>
        </div>
      </div>
    </section>
  );
}
