"use client";

import { useEffect, useRef, type ReactElement, type RefObject } from "react";
import { getMsStudioProcess } from "../../lib/msStudioEditorialI18nFoundation.js";
import type { MsStudioProcessMoment } from "../../lib/msStudioProcessFoundation.js";
import { useMsSiteLocale } from "../MsSiteLocaleProvider.js";

function useProcessReveal(rootRef: RefObject<HTMLElement | null>): void {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nodes = root.querySelectorAll<HTMLElement>("[data-process-reveal]");

    if (reduceMotion) {
      nodes.forEach((node) => node.classList.add("is-revealed"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        }
      },
      { root: null, rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [rootRef]);
}

function ProcessMoment({ moment }: { readonly moment: MsStudioProcessMoment }): ReactElement {
  const titleId = `msh-work-${moment.id}-title`;

  if (moment.layout === "aside") {
    return (
      <article
        className={`msh-work__moment msh-work__moment--${moment.layout}`}
        aria-labelledby={titleId}
        data-process-reveal
      >
        <div className="msh-work__moment-main">
          <h3 id={titleId} className="msh-work__moment-title">
            {moment.title}
          </h3>
          <p className="msh-work__moment-body">{moment.body}</p>
        </div>
        {moment.aside ? (
          <p className="msh-work__moment-aside">
            <span className="msh-work__moment-aside-text">{moment.aside}</span>
          </p>
        ) : null}
      </article>
    );
  }

  if (moment.layout === "pair") {
    return (
      <article
        className={`msh-work__moment msh-work__moment--${moment.layout}`}
        aria-labelledby={titleId}
        data-process-reveal
      >
        <h3 id={titleId} className="msh-work__moment-title">
          {moment.title}
        </h3>
        {moment.support ? <p className="msh-work__moment-support">{moment.support}</p> : null}
        <p className="msh-work__moment-body">{moment.body}</p>
      </article>
    );
  }

  return (
    <article
      className={`msh-work__moment msh-work__moment--${moment.layout}`}
      aria-labelledby={titleId}
      data-process-reveal
    >
      {moment.eyebrow ? <p className="msh-work__moment-eyebrow">{moment.eyebrow}</p> : null}
      <h3 id={titleId} className="msh-work__moment-title">
        {moment.title}
      </h3>
      <p className="msh-work__moment-body">{moment.body}</p>
    </article>
  );
}

/**
 * Cómo trabajamos — acto editorial (Fase 5).
 * Tipografía protagonista. Composiciones distintas. Sin timeline ni cards.
 */
export function MsStudioHomeProcess(): ReactElement {
  const { locale } = useMsSiteLocale();
  const process = getMsStudioProcess(locale);
  const rootRef = useRef<HTMLElement | null>(null);
  useProcessReveal(rootRef);
  const titleId = "msh-work-title";

  return (
    <section
      ref={rootRef}
      id={process.anchorId}
      className="msh-work"
      aria-labelledby={titleId}
    >
      <div className="msh-work__rail">
        <header className="msh-work__opening" data-process-reveal>
          <p className="msh-work__kicker">{process.kicker}</p>
          <h2 id={titleId} className="msh-work__headline">
            <span className="msh-work__headline-line">{process.headline.line1}</span>
            <span className="msh-work__headline-line">
              {process.headline.line2Before}
              <span className="msh-work__accent">{process.headline.line2Accent}</span>
              {process.headline.line2After}
            </span>
          </h2>
          <p className="msh-work__lead">{process.lead}</p>
        </header>

        <div className="msh-work__sequence">
          {process.moments.map((moment) => (
            <ProcessMoment key={moment.id} moment={moment} />
          ))}
        </div>

        <p className="msh-work__closing" data-process-reveal>
          {process.closing}
        </p>
      </div>
    </section>
  );
}
