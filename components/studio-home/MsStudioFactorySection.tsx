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
  const gradId = "msh-factory-journey-grad";

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
          <svg
            className="msh-factory__journey"
            aria-hidden="true"
            data-factory-energy
          >
            <defs>
              <linearGradient
                id={gradId}
                gradientUnits="userSpaceOnUse"
                data-factory-journey-grad
                x1="0"
                y1="0"
                x2="0"
                y2="100"
              >
                <stop offset="0%" stopColor="#04a2fb" />
                <stop offset="38%" stopColor="#52ebe6" />
                <stop offset="62%" stopColor="#34cc68" />
                <stop offset="100%" stopColor="#a6e10b" />
              </linearGradient>
              <filter
                id="msh-factory-journey-glow"
                x="-80%"
                y="-80%"
                width="260%"
                height="260%"
              >
                <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <path
              id="msh-factory-journey-route"
              className="msh-factory__journey-track"
              data-factory-path-track
              fill="none"
              stroke={`url(#${gradId})`}
            />
            <path
              className="msh-factory__journey-beam"
              data-factory-path-beam
              fill="none"
              stroke={`url(#${gradId})`}
              pathLength={100}
            />
            <path
              className="msh-factory__journey-pulse"
              data-factory-path-pulse
              fill="none"
              stroke={`url(#${gradId})`}
              pathLength={100}
            />
            <circle
              className="msh-factory__journey-head"
              data-factory-path-head
              r="4.5"
              fill="#a6e10b"
              filter="url(#msh-factory-journey-glow)"
            >
              <animateMotion
                data-factory-path-motion
                dur="5.2s"
                repeatCount="indefinite"
                rotate="auto"
                keyPoints="0;1"
                keyTimes="0;1"
                calcMode="linear"
              >
                <mpath href="#msh-factory-journey-route" />
              </animateMotion>
            </circle>
          </svg>

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
