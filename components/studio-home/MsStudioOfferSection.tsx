"use client";

import { useEffect, useRef, type ReactElement, type RefObject } from "react";
import { getMsStudioOffer } from "../../lib/msStudioEditorialI18nFoundation.js";
import { useMsSiteLocale } from "../MsSiteLocaleProvider.js";
import { MsSiteNavAnchor } from "../MsSiteNavAnchor.js";
import { MsStudioOfferProductVisual } from "./MsStudioOfferProductVisuals.js";

function useOfferReveal(rootRef: RefObject<HTMLElement | null>): void {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    const nodes = [...root.querySelectorAll<HTMLElement>("[data-offer-reveal]")];
    if (!nodes.length) {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      nodes.forEach((node) => node.classList.add("is-revealed"));
      return;
    }

    const reveal = (node: HTMLElement, observer?: IntersectionObserver) => {
      if (node.classList.contains("is-revealed")) {
        return;
      }
      node.classList.add("is-revealed");
      observer?.unobserve(node);
    };

    /** Evita el hueco negro: lo ya pasado o visible no puede quedarse en opacity 0. */
    const revealPastAndVisible = () => {
      const limit = window.innerHeight * 0.98;
      for (const node of nodes) {
        if (node.getBoundingClientRect().top < limit) {
          reveal(node);
        }
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            reveal(entry.target as HTMLElement, observer);
          }
        }
      },
      { root: null, rootMargin: "12% 0px 12% 0px", threshold: 0.01 },
    );

    revealPastAndVisible();
    nodes.forEach((node) => {
      if (!node.classList.contains("is-revealed")) {
        observer.observe(node);
      }
    });

    const onScrollOrResize = () => revealPastAndVisible();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    window.addEventListener("hashchange", revealPastAndVisible);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      window.removeEventListener("hashchange", revealPastAndVisible);
    };
  }, [rootRef]);
}

function useOfferParallax(rootRef: RefObject<HTMLElement | null>): void {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const stages = root.querySelectorAll<HTMLElement>("[data-offer-parallax]");
    if (!stages.length) {
      return;
    }

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const vh = window.innerHeight;
        stages.forEach((stage) => {
          const rect = stage.getBoundingClientRect();
          const mid = rect.top + rect.height / 2;
          const progress = (mid - vh / 2) / vh;
          const shift = Math.max(-12, Math.min(12, progress * -14));
          stage.style.setProperty("--offer-parallax", `${shift.toFixed(2)}px`);
        });
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [rootRef]);
}

/**
 * Qué hacemos — galería de productos digitales (sin cards).
 */
export function MsStudioOfferSection(): ReactElement {
  const { locale } = useMsSiteLocale();
  const offer = getMsStudioOffer(locale);
  const rootRef = useRef<HTMLElement | null>(null);
  useOfferReveal(rootRef);
  useOfferParallax(rootRef);
  const titleId = "msh-offer-title";

  return (
    <section ref={rootRef} id={offer.anchorId} className="msh-offer" aria-labelledby={titleId}>
      <div className="msh-offer__rail">
        <header className="msh-offer__opening" data-offer-reveal>
          <h2 id={titleId} className="msh-offer__title">
            {offer.title}
          </h2>
          <p className="msh-offer__lead">{offer.lead}</p>
        </header>

        <div className="msh-offer__gallery">
          {offer.cards.map((product, index) => (
            <article
              key={product.id}
              id={product.id}
              className={`msh-offer__block msh-offer__block--${product.visual} msh-offer__block--${product.layout}`}
              data-offer-reveal
              style={{ ["--offer-delay" as string]: `${Math.min(index * 40, 160)}ms` }}
            >
              <div className="msh-offer__block-copy">
                <p className="msh-offer__block-index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="msh-offer__block-title">{product.title}</h3>
                <p className="msh-offer__block-body">{product.body}</p>
              </div>
              <div className="msh-offer__block-stage" data-offer-parallax>
                <MsStudioOfferProductVisual kind={product.visual} />
              </div>
            </article>
          ))}
        </div>

        <footer className="msh-offer__close" data-offer-reveal>
          <p className="msh-offer__close-line">{offer.close.line}</p>
          <MsSiteNavAnchor href={offer.close.href} className="msh-offer__close-cta">
            {offer.close.cta}
            <span aria-hidden="true">→</span>
          </MsSiteNavAnchor>
        </footer>
      </div>
    </section>
  );
}
