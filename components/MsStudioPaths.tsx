import type React from "react";
import Link from "next/link";
import { MS_SITE_STUDIO_PATHS } from "../lib/msSite1703Foundation.js";

export function MsStudioPaths(): React.ReactElement {
  return (
    <section className="ms-chapter ms-paths" aria-labelledby="ms-paths-title">
      <div className="ms-chapter__head">
        <p className="ms-eyebrow">Cómo trabajar con nosotros</p>
        <h2 id="ms-paths-title">Elige el camino que encaja</h2>
      </div>
      <ul className="ms-path-list">
        {MS_SITE_STUDIO_PATHS.map((path) => (
          <li key={path.id}>
            <Link href={path.href} className="ms-path-row">
              <span className="ms-path-row__label">{path.label}</span>
              <span className="ms-path-row__line">{path.line}</span>
              <span className="ms-path-row__arrow" aria-hidden="true">
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
