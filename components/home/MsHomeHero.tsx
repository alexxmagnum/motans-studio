import type React from "react";
import Link from "next/link";
import { MS_SITE_DARK_HERO, MS_SITE_DARK_TRUST } from "../../lib/msSiteDarkPremiumFoundation.js";
import { MsHomeHeroMSculpture } from "./MsHomeHeroMSculpture.js";
import { MsHomeTrustBrandIcon } from "./MsHomeTrustBrandIcon.js";

export function MsHomeHero(): React.ReactElement {
  const hero = MS_SITE_DARK_HERO;

  return (
    <section id={hero.anchorId} className="ms-dp-hero" aria-labelledby="ms-dp-hero-title">
      <div className="ms-dp-hero__grid">
        <div className="ms-dp-hero__copy">
          <p className="ms-dp-hero__kicker">{hero.kicker}</p>
          <h1 id="ms-dp-hero-title" className="ms-dp-hero__title">
            {hero.titleLines.map((line) => (
              <span key={line} className="ms-dp-hero__title-line">
                {line}
              </span>
            ))}
          </h1>
          <p className="ms-dp-hero__accent-line">
            {hero.accentLinePrefix}{" "}
            <span className="ms-dp-hero__accent-word">{hero.accentWord}</span>.
          </p>
          <Link href={hero.cta.href} className="ms-dp-btn ms-dp-btn--hero">
            {hero.cta.label}
            <span className="ms-dp-btn__arrow" aria-hidden="true">
              →
            </span>
          </Link>
        </div>

        <div className="ms-dp-hero__stage" aria-hidden="true">
          <MsHomeHeroMSculpture />
        </div>
      </div>

      <a href="#servicios" className="ms-dp-scroll" aria-label={hero.scrollLabel}>
        <span className="ms-dp-scroll__line" />
        <span className="ms-dp-scroll__label">{hero.scrollLabel}</span>
      </a>

      <footer className="ms-dp-trust">
        <div className="ms-dp-trust__inner">
          <p className="ms-dp-trust__kicker">{MS_SITE_DARK_TRUST.kicker}</p>
          <ul className="ms-dp-trust__brands" aria-label="Marcas que confían">
            {MS_SITE_DARK_TRUST.brands.map((brand, index) => (
              <li key={brand.id} className="ms-dp-trust__brand">
                {index > 0 ? <span className="ms-dp-trust__divider" aria-hidden="true" /> : null}
                <span className="ms-dp-trust__brand-mark">
                  <MsHomeTrustBrandIcon icon={brand.icon} />
                  <span className="ms-dp-trust__brand-name">{brand.label}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </footer>
    </section>
  );
}
