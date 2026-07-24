import type React from "react";
import Link from "next/link";
import { MS_SITE_ROUTES } from "../../lib/msSite1701Foundation.js";
import { MS_HOSTELERIA_LANDING } from "../../lib/msHosteleriaLandingFoundation.js";
import {
  buildMotanosClientLoginUrl,
  buildMotanosClientRegisterUrl,
} from "../../lib/msSiteSaasOnboardingCtaFoundation.js";
import { MsHosteleriaPortadaHero } from "./MsHosteleriaPortadaHero.js";
import { MotansMonogram } from "./motansHosteleriaIdentity.js";

export function MsHosteleriaLandingV1(): React.ReactElement {
  const copy = MS_HOSTELERIA_LANDING;

  return (
    <div className="msh-landing msh-landing--portada">
      <MsHosteleriaPortadaHero copy={copy.hero} />

      <header className="msh-landing__bar">
        <div className="msh-landing__bar-inner">
          <div className="msh-landing__brand">
            <MotansMonogram size={22} />
            <span className="msh-landing__brand-studio">{copy.parentLabel}</span>
            <span className="msh-landing__brand-sep" aria-hidden="true">
              ·
            </span>
            <span className="msh-landing__brand-product">{copy.productLabel}</span>
          </div>
          <nav className="msh-landing__nav" aria-label="MotanOS Hostelería">
            {copy.nav.map((item) => (
              <a key={item.href} href={item.href} className="msh-landing__nav-link">
                {item.label}
              </a>
            ))}
            <a
              href={buildMotanosClientLoginUrl()}
              className="msh-landing__nav-link msh-landing__nav-link--login"
            >
              Iniciar sesión
            </a>
          </nav>
        </div>
      </header>

      <section
        id="problema"
        className="msh-landing__chapter msh-landing__chapter--dark"
        aria-labelledby="msh-problem-title"
      >
        <div className="msh-landing__chapter-inner">
          <p className="msh-landing__chapter-num">01</p>
          <h2 id="msh-problem-title" className="msh-landing__chapter-title">
            {copy.problem.title}
          </h2>
          <p className="msh-landing__chapter-lead">{copy.problem.lead}</p>
          <ul className="msh-landing__list msh-landing__list--problem">
            {copy.problem.items.map((item) => (
              <li key={item} className="msh-landing__list-item">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="respuesta"
        className="msh-landing__chapter"
        aria-labelledby="msh-answer-title"
      >
        <div className="msh-landing__chapter-inner">
          <p className="msh-landing__chapter-num">02</p>
          <h2 id="msh-answer-title" className="msh-landing__chapter-title">
            {copy.answer.title}
          </h2>
          <p className="msh-landing__chapter-lead">{copy.answer.lead}</p>
          <ul className="msh-landing__list msh-landing__list--answer">
            {copy.answer.items.map((item) => (
              <li key={item} className="msh-landing__list-item msh-landing__list-item--answer">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="empezar"
        className="msh-landing__chapter msh-landing__chapter--soft"
        aria-labelledby="msh-start-title"
      >
        <div className="msh-landing__chapter-inner">
          <p className="msh-landing__chapter-num">03</p>
          <h2 id="msh-start-title" className="msh-landing__chapter-title">
            {copy.startSimple.title}
          </h2>
          <p className="msh-landing__chapter-lead">{copy.startSimple.lead}</p>
          <ol className="msh-landing__steps">
            {copy.startSimple.steps.map((step, index) => (
              <li key={step.id} className="msh-landing__step">
                <span className="msh-landing__step-num">{index + 1}</span>
                <div>
                  <h3 className="msh-landing__step-title">{step.title}</h3>
                  <p className="msh-landing__step-text">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        id="sistema"
        className="msh-landing__chapter"
        aria-labelledby="msh-system-title"
      >
        <div className="msh-landing__chapter-inner">
          <p className="msh-landing__chapter-num">04</p>
          <h2 id="msh-system-title" className="msh-landing__chapter-title">
            {copy.system.title}
          </h2>
          <p className="msh-landing__chapter-lead">{copy.system.lead}</p>
          <div className="msh-landing__areas">
            {copy.system.areas.map((area) => (
              <article key={area.id} className="msh-landing__area">
                <h3 className="msh-landing__area-label">{area.label}</h3>
                <p className="msh-landing__area-text">{area.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="work-first"
        className="msh-landing__chapter msh-landing__chapter--soft"
        aria-labelledby="msh-work-title"
      >
        <div className="msh-landing__chapter-inner">
          <p className="msh-landing__chapter-num">05</p>
          <h2 id="msh-work-title" className="msh-landing__chapter-title">
            {copy.workFirst.title}
          </h2>
          <p className="msh-landing__chapter-lead">{copy.workFirst.lead}</p>
          <div className="msh-landing__phases">
            {copy.workFirst.phases.map((phase, index) => (
              <article key={phase.id} className="msh-landing__phase">
                <span className="msh-landing__phase-index">{index + 1}</span>
                <h3 className="msh-landing__phase-title">{phase.title}</h3>
                <p className="msh-landing__phase-text">{phase.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="no-es"
        className="msh-landing__chapter msh-landing__chapter--dark"
        aria-labelledby="msh-not-title"
      >
        <div className="msh-landing__chapter-inner">
          <p className="msh-landing__chapter-num">06</p>
          <h2 id="msh-not-title" className="msh-landing__chapter-title">
            {copy.notThis.title}
          </h2>
          <ul className="msh-landing__not-list">
            {copy.notThis.items.map((item) => (
              <li key={item} className="msh-landing__not-item">
                MotanOS no es {item}.
              </li>
            ))}
          </ul>
          <p className="msh-landing__not-close">{copy.notThis.lead}</p>
        </div>
      </section>

      <section
        id="probar"
        className="msh-landing__chapter msh-landing__chapter--final"
        aria-labelledby="msh-final-title"
      >
        <div className="msh-landing__chapter-inner msh-landing__final">
          <MotansMonogram size={32} className="msh-landing__final-mark" />
          <h2 id="msh-final-title" className="msh-landing__final-title">
            {copy.finalCta.title}
          </h2>
          <p className="msh-landing__final-lead">{copy.finalCta.subtitle}</p>
          <div className="msh-landing__actions msh-landing__actions--center">
            <a
              href={buildMotanosClientRegisterUrl()}
              className="msh-landing__btn msh-landing__btn--primary"
            >
              {copy.finalCta.ctaPrimary}
            </a>
            <Link
              href={MS_SITE_ROUTES.contacto}
              className="msh-landing__btn msh-landing__btn--secondary msh-landing__btn--on-dark"
            >
              {copy.finalCta.ctaSecondary}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
