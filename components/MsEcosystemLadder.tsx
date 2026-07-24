import type React from "react";
import { MS_SITE_ECOSYSTEM_LADDER } from "../lib/msSite1702Foundation.js";
import { MotansStudioBrandMark } from "./MotansStudioBrandMark.js";

export function MsEcosystemLadder(): React.ReactElement {
  return (
    <section className="ms-section" aria-labelledby="ms-ladder-title">
      <div className="ms-section__intro">
        <p className="ms-eyebrow">Arquitectura de marca</p>
        <h2 id="ms-ladder-title">De sello a vertical</h2>
        <p className="ms-lead ms-lead--left">
          Tres logos, una jerarquía clara. Premium no es cambiar la marca: es elevarla con intención.
        </p>
      </div>
      <ol className="ms-ladder">
        {MS_SITE_ECOSYSTEM_LADDER.map((step, index) => (
          <li key={step.seal} className="ms-ladder__step">
            <span className="ms-ladder__index" aria-hidden="true">
              {index + 1}
            </span>
            <div className="ms-ladder__mark">
              {step.seal === "M" ? (
                <span className="ms-ladder__m-badge" aria-hidden="true">
                  M
                </span>
              ) : step.seal === "MS" ? (
                <MotansStudioBrandMark variant="mark-only" height={36} showWordmark={false} />
              ) : step.seal === "MotanOS" ? (
                <MotansStudioBrandMark variant="motanos-product" height={40} showWordmark={false} />
              ) : (
                <span className="ms-ladder__vertical-badge">H</span>
              )}
            </div>
            <div className="ms-ladder__copy">
              <strong>{step.label}</strong>
              <span>{step.detail}</span>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
