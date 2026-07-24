import type React from "react";
import Link from "next/link";
import { MS_SITE_HOME_VERTICALS } from "../../lib/msSiteHomeSuperPremiumFoundation.js";

export function MsHomeVerticals(): React.ReactElement {
  const section = MS_SITE_HOME_VERTICALS;

  return (
    <section
      id={section.anchorId}
      className="ms-home-section ms-home-verticals"
      aria-labelledby="ms-home-verticals-title"
    >
      <div className="ms-home-shell">
        <header className="ms-home-section__head ms-home-section__head--wide">
          <p className="ms-home-kicker">{section.eyebrow}</p>
          <h2 id="ms-home-verticals-title" className="ms-home-section__title">
            {section.title}
          </h2>
          <p className="ms-home-section__lead">{section.lead}</p>
        </header>

        <div className="ms-home-verticals__list">
          {section.items.map((item, index) => (
            <article key={item.id} className="ms-home-verticals__row">
              <div className="ms-home-verticals__index" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div className="ms-home-verticals__content">
                <div className="ms-home-verticals__head">
                  <h3>{item.title}</h3>
                  {item.status === "roadmap" ? (
                    <span className="ms-home-verticals__badge">En roadmap</span>
                  ) : null}
                </div>
                <div className="ms-home-verticals__cols">
                  <p>
                    <span className="ms-home-verticals__label">Reto</span>
                    {item.problem}
                  </p>
                  <p>
                    <span className="ms-home-verticals__label">Solución</span>
                    {item.solution}
                  </p>
                </div>
                <Link href={item.href} className="ms-home-verticals__cta">
                  {item.status === "roadmap" ? "Hablar con el estudio" : "Explorar vertical"}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
