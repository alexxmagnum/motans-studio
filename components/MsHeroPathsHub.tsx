import type React from "react";
import {
  MS_SITE_ECOSYSTEM_BRIDGE,
  MS_SITE_STUDIO_PATHS,
} from "../lib/msSite1703Foundation.js";
import { MS_SITE_ECOSYSTEM_BRIDGE_OBSESSIVE } from "../lib/msSite1703ObsessiveFoundation.js";

export function MsHeroPathsHub(): React.ReactElement {
  return (
    <div className="ms-hero-studio__hub" aria-labelledby="ms-hero-paths-title">
      <header className="ms-hero-studio__hub-head">
        <p className="ms-eyebrow">Cómo trabajar con nosotros</p>
        <h2 id="ms-hero-paths-title">Elige el camino que encaja</h2>
        <p className="ms-hero-studio__hub-deck">
          MotanOS es el producto estrella — no el único servicio del estudio.
        </p>
      </header>

      <div className="ms-service-showcase ms-hero-path-grid">
        {MS_SITE_STUDIO_PATHS.map((path) => (
          <a
            key={path.id}
            href={path.href}
            className={`ms-service-card ms-path-card--in-hero ms-path-card--${path.accent}`}
          >
            <span className="ms-service-card__mark" aria-hidden="true" />
            <h3>{path.label}</h3>
            <p>{path.line}</p>
          </a>
        ))}
      </div>

      <aside className="ms-hero-bridge" aria-label="Del estudio al producto">
        <span className="ms-hero-bridge__hairline" aria-hidden="true" />
        <div className="ms-hero-bridge__copy">
          <p className="ms-eyebrow">{MS_SITE_ECOSYSTEM_BRIDGE_OBSESSIVE.kicker}</p>
          <p className="ms-hero-bridge__line">{MS_SITE_ECOSYSTEM_BRIDGE_OBSESSIVE.line}</p>
          <p className="ms-hero-bridge__sub">{MS_SITE_ECOSYSTEM_BRIDGE.line}</p>
        </div>
      </aside>
    </div>
  );
}
