import type React from "react";
import Link from "next/link";
import { MS_SITE_ENGAGEMENT_PATHS } from "../lib/msSite1702Foundation.js";

export function MsEngagementPaths(): React.ReactElement {
  return (
    <section className="ms-section ms-section--paths" aria-labelledby="ms-paths-title">
      <div className="ms-section__intro">
        <p className="ms-eyebrow">Cómo trabajar con nosotros</p>
        <h2 id="ms-paths-title">Elige el camino que encaja</h2>
        <p className="ms-lead ms-lead--left">
          MotanOS es el producto estrella, no el único servicio. Motans Studio también diseña webs,
          apps y SaaS a medida sin exigir MotanOS.
        </p>
      </div>
      <div className="ms-path-grid">
        {MS_SITE_ENGAGEMENT_PATHS.map((path) => (
          <article
            key={path.id}
            className={`ms-card ms-path-card ms-path-card--${path.accent}`}
          >
            <h3>{path.title}</h3>
            <p>{path.summary}</p>
            <p className="ms-path-card__fit">{path.fit}</p>
            <Link href={path.ctaHref} className="ms-btn ms-btn--secondary ms-btn--sm">
              {path.ctaLabel}
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
