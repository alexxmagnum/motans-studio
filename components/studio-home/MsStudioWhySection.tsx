"use client";

import { useEffect, useRef, type ReactElement, type RefObject } from "react";
import { getMsStudioWhy } from "../../lib/msStudioEditorialI18nFoundation.js";
import { useMsSiteLocale } from "../MsSiteLocaleProvider.js";
import { MsSiteNavAnchor } from "../MsSiteNavAnchor.js";

function useWhyReveal(rootRef: RefObject<HTMLElement | null>): void {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nodes = root.querySelectorAll<HTMLElement>("[data-why-reveal]");

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
      { root: null, rootMargin: "0px 0px -12% 0px", threshold: 0.18 },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [rootRef]);
}

/**
 * Por qué Motans Studio — acto editorial (Fase 3).
 * Tipografía protagonista. Sin cards. Sin iconos. Sin stock.
 */
export function MsStudioWhySection(): ReactElement {
  const { locale } = useMsSiteLocale();
  const why = getMsStudioWhy(locale);
  const rootRef = useRef<HTMLElement | null>(null);
  useWhyReveal(rootRef);
  const titleId = "msh-why-title";

  return (
    <section
      ref={rootRef}
      id={why.anchorId}
      className="msh-why"
      aria-labelledby={titleId}
    >
      <div className="msh-why__rail">
        <header className="msh-why__opening" data-why-reveal>
          <p className="msh-why__kicker">{why.kicker}</p>
          <h2 id={titleId} className="msh-why__headline">
            <span className="msh-why__headline-line">{why.headline.line1}</span>
            <span className="msh-why__headline-line">{why.headline.line2}</span>
            <span className="msh-why__headline-line">
              {why.headline.line3Before}
              <span className="msh-why__accent">{why.headline.line3Accent}</span>
              {why.headline.line3After}
            </span>
          </h2>
          <p className="msh-why__lead">{why.lead}</p>
        </header>

        <p className="msh-why__manifesto" data-why-reveal>
          <span className="msh-why__manifesto-mark" aria-hidden="true" />
          <span className="msh-why__manifesto-text">{why.manifesto}</span>
        </p>

        <ol className="msh-why__principles">
          {why.principles.map((principle) => (
            <li
              key={principle.id}
              className={`msh-why__principle msh-why__principle--${principle.layout}`}
              data-why-reveal
            >
              <span className="msh-why__index" aria-hidden="true">
                {principle.index}
              </span>
              <div className="msh-why__principle-body">
                <h3 className="msh-why__principle-title">{principle.title}</h3>
                <p className="msh-why__principle-copy">{principle.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="msh-why__fit" data-why-reveal>
          <p className="msh-why__fit-kicker">{why.fit.kicker}</p>
          <h3 className="msh-why__fit-title">{why.fit.title}</h3>
          <div className="msh-why__fit-grid">
            <div className="msh-why__fit-col msh-why__fit-col--yes">
              <p className="msh-why__fit-label">{why.fit.yesLabel}</p>
              <ul className="msh-why__fit-list">
                {why.fit.yes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="msh-why__fit-col msh-why__fit-col--no">
              <p className="msh-why__fit-label">{why.fit.noLabel}</p>
              <ul className="msh-why__fit-list">
                {why.fit.no.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <footer className="msh-why__close" data-why-reveal>
          <p className="msh-why__close-line">{why.close.line}</p>
          <MsSiteNavAnchor href={why.close.href} className="msh-why__close-cta">
            {why.close.cta}
            <span className="msh-why__close-arrow" aria-hidden="true">
              →
            </span>
          </MsSiteNavAnchor>
        </footer>
      </div>
    </section>
  );
}
