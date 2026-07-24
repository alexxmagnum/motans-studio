import type React from "react";
import Link from "next/link";
import { MotansStudioBrandMark } from "../MotansStudioBrandMark.js";
import { MS_SITE_HOME_MOTANOS } from "../../lib/msSiteHomeSuperPremiumFoundation.js";

export function MsHomeMotanos(): React.ReactElement {
  const section = MS_SITE_HOME_MOTANOS;

  return (
    <section
      id={section.anchorId}
      className="ms-home-section ms-home-product"
      aria-labelledby="ms-home-motanos-title"
    >
      <div className="ms-home-product__shell">
        <div className="ms-home-shell ms-home-product__grid">
          <div className="ms-home-product__narrative">
            <MotansStudioBrandMark variant="lockup-product" height={42} showWordmark />
            <p className="ms-home-kicker ms-home-kicker--on-dark">{section.eyebrow}</p>
            <h2 id="ms-home-motanos-title" className="ms-home-product__title">
              {section.title}
            </h2>
            <p className="ms-home-product__lead">{section.lead}</p>

            <div className="ms-home-product__vertical">
              <p className="ms-home-kicker ms-home-kicker--on-dark">{section.verticalEyebrow}</p>
              <h3 className="ms-home-product__vertical-title">{section.verticalTitle}</h3>
              <p className="ms-home-product__vertical-line">{section.verticalLine}</p>
            </div>
          </div>

          <div className="ms-home-product__stack">
            {section.modules.map((module, index) => (
              <article
                key={module.id}
                className="ms-home-product__module"
                style={{ "--ms-module-i": index } as React.CSSProperties}
              >
                <span className="ms-home-product__module-num" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3>{module.title}</h3>
                  <p>{module.line}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="ms-home-shell ms-home-product__actions">
          {section.ctas.map((cta) => (
            <Link
              key={cta.label}
              href={cta.href}
              className={
                cta.variant === "primary"
                  ? "ms-home-btn ms-home-btn--primary ms-home-btn--on-dark"
                  : cta.variant === "secondary"
                    ? "ms-home-btn ms-home-btn--light ms-home-btn--on-dark"
                    : "ms-home-btn ms-home-btn--ghost ms-home-btn--on-dark"
              }
            >
              {cta.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
