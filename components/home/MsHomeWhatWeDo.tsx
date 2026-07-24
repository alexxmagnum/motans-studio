import type React from "react";
import Link from "next/link";
import { MS_SITE_HOME_V2_WHAT } from "../../lib/msSiteHomeZeroBullshitFoundation.js";

/** Bloque Servicios — ancla #servicios */
export function MsHomeWhatWeDo(): React.ReactElement {
  const section = MS_SITE_HOME_V2_WHAT;

  return (
    <section id={section.anchorId} className="ms-dp-section" aria-labelledby="ms-dp-servicios-title">
      <div className="ms-dp-shell">
        <p className="ms-dp-section__kicker">{section.kicker}</p>
        <h2 id="ms-dp-servicios-title" className="ms-dp-section__title">
          {section.title}
        </h2>
        <div className="ms-dp-trio">
          {section.items.map((item) => (
            <article key={item.id} className="ms-dp-trio__item">
              <h3>{item.title}</h3>
              <p>{item.line}</p>
              {"href" in item && item.href ? (
                <Link href="/motanos" className="ms-dp-link">
                  MotanOS →
                </Link>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
