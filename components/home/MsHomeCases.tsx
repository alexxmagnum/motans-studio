import type React from "react";
import { MS_SITE_HOME_V2_CASES } from "../../lib/msSiteHomeZeroBullshitFoundation.js";

export function MsHomeCases(): React.ReactElement {
  const section = MS_SITE_HOME_V2_CASES;

  return (
    <section id={section.anchorId} className="ms-hp-section ms-hp-section--surface" aria-labelledby="ms-hp-cases-title">
      <div className="ms-hp-shell">
        <header className="ms-hp-section__head">
          <p className="ms-eyebrow">{section.title}</p>
          <h2 id="ms-hp-cases-title" className="ms-hp-section__title">
            Problema → resultado
          </h2>
        </header>
        <div className="ms-hp-cards ms-hp-cards--three">
          {section.items.map((item) => (
            <article key={item.id} className="ms-hp-card ms-hp-card--case">
              <span className="ms-hp-card__accent" aria-hidden="true" />
              <h3 className="ms-hp-card__title">{item.title}</h3>
              <p className="ms-hp-card__meta">
                <strong>Antes:</strong> {item.problem}
              </p>
              <p className="ms-hp-card__meta">
                <strong>Después:</strong> {item.result}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
