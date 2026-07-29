"use client";

import { useRef, type CSSProperties, type ReactElement } from "react";
import {
  MS_STUDIO_FACTORY,
  MS_STUDIO_FACTORY_PHASES,
} from "../../lib/msStudioFactoryFoundation.js";
import { MsStudioSectionEyebrow } from "./MsStudioSectionEyebrow.js";
import { useMsStudioFactoryMotion } from "./useMsStudioFactoryMotion.js";

/**
 * La Fábrica / El Estudio — recorrido tipográfico Motans.
 * Sin ilustraciones falsas: número, título, línea y rampa de color.
 */
export function MsStudioFactorySection(): ReactElement {
  const rootRef = useRef<HTMLElement | null>(null);
  useMsStudioFactoryMotion(rootRef);
  const titleId = "msh-factory-title";

  return (
    <section
      ref={rootRef}
      id={MS_STUDIO_FACTORY.anchorId}
      className="msh-factory"
      aria-labelledby={titleId}
      data-factory-root
    >
      <div className="msh-factory__rail">
        <header className="msh-factory__opening">
          <MsStudioSectionEyebrow>{MS_STUDIO_FACTORY.kicker}</MsStudioSectionEyebrow>
          <h2 id={titleId} className="msh-factory__title">
            {MS_STUDIO_FACTORY.titleBefore}
            <span className="msh-title-accent">{MS_STUDIO_FACTORY.titleAccent}</span>
            {MS_STUDIO_FACTORY.titleAfter}
          </h2>
          <p className="msh-factory__lead">{MS_STUDIO_FACTORY.lead}</p>
        </header>

        <div className="msh-factory__stageboard">
          <div className="msh-factory__energy" aria-hidden="true" data-factory-energy>
            <span className="msh-factory__energy-track" />
            <span className="msh-factory__energy-beam" />
            <span className="msh-factory__energy-return" />
          </div>

          <ol className="msh-factory__line" aria-label="Recorrido de la fábrica digital">
            {MS_STUDIO_FACTORY_PHASES.map((phase, index) => (
              <li
                key={phase.id}
                className={`msh-factory__stage msh-factory__stage--${phase.id}`}
                data-factory-stage={phase.id}
                style={{ "--factory-stage-i": String(index) } as CSSProperties}
              >
                <div className="msh-factory__stage-shell">
                  <p className="msh-factory__stage-index" aria-hidden="true">
                    {phase.index}
                  </p>
                  <div className="msh-factory__stage-copy">
                    <h3 className="msh-factory__stage-label">{phase.label}</h3>
                    <p className="msh-factory__stage-blurb">{phase.blurb}</p>
                  </div>
                  <span className="msh-factory__stage-rail" aria-hidden="true" />
                </div>
                {index < MS_STUDIO_FACTORY_PHASES.length - 1 ? (
                  <span className="msh-factory__connector" aria-hidden="true" />
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
