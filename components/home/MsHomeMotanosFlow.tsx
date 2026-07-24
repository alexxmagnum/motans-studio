import type React from "react";
import Link from "next/link";
import { MS_SITE_HOME_V2_MOTANOS } from "../../lib/msSiteHomeZeroBullshitFoundation.js";

export function MsHomeMotanosFlow(): React.ReactElement {
  const section = MS_SITE_HOME_V2_MOTANOS;

  return (
    <section id={section.anchorId} className="ms-hp-section ms-hp-section--dark" aria-labelledby="ms-hp-motanos-title">
      <div className="ms-hp-shell">
        <header className="ms-hp-section__head ms-hp-section__head--on-dark">
          <p className="ms-eyebrow ms-eyebrow--on-dark">Producto propio</p>
          <h2 id="ms-hp-motanos-title" className="ms-hp-section__title ms-hp-section__title--on-dark">
            {section.title}
          </h2>
          <p className="ms-hp-section__lead ms-hp-section__lead--on-dark">{section.lead}</p>
        </header>
        <ol className="ms-hp-flow">
          {section.steps.map((step, index) => (
            <li key={step}>
              <span className="ms-hp-flow__num">{String(index + 1).padStart(2, "0")}</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
        <div className="ms-actions">
          <Link href={section.cta.href} className="ms-btn ms-btn--primary">
            {section.cta.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
