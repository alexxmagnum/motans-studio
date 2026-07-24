"use client";

import { useCallback, useId, useState, type ReactElement } from "react";
import type { MsSiteMotanosConceptualPlan } from "../../lib/msSiteMotanosPlansFoundation.js";

export interface MsHomePlanAccordionCardProps {
  readonly plan: MsSiteMotanosConceptualPlan;
  readonly expanded: boolean;
  readonly onToggle: () => void;
}

/** Card plan MotanOS desplegable — resumen cerrado + detalle completo al expandir. */
export function MsHomePlanAccordionCard({
  plan,
  expanded,
  onToggle,
}: MsHomePlanAccordionCardProps): ReactElement {
  const panelId = useId();
  const featured = "featured" in plan && plan.featured === true;

  return (
    <div className="msh-plans__cell">
      <div className="msh-plans__cell-badge-row">
        {featured ? (
          <span className="msh-plan-card__badge msh-plan-card__badge--outside">Recomendado</span>
        ) : null}
      </div>

      <article
        className={[
          "msh-plan-card",
          "msh-plan-card--accordion",
          featured ? "msh-plan-card--featured" : "",
          expanded ? "msh-plan-card--open" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <button
          type="button"
          className="msh-plan-card__toggle"
          aria-expanded={expanded}
          aria-controls={panelId}
          onClick={onToggle}
        >
          <span className="msh-plan-card__toggle-main">
            <span className="msh-plan-card__head">
              <span className="msh-plan-card__name">{plan.name}</span>
              <span className="msh-plan-card__chevron" aria-hidden="true" />
            </span>
            <span className="msh-plan-card__price">{plan.priceLabel}</span>
            <span className="msh-plan-card__desc">{plan.description}</span>
            <span className="msh-plan-card__highlight">{plan.highlight}</span>
          </span>

          <span className="msh-plan-card__toggle-hint">
            {expanded ? "Ocultar detalle" : "Ver detalle del plan"}
          </span>
        </button>

      <div id={panelId} className="msh-plan-card__panel" aria-hidden={!expanded}>
        <div className="msh-plan-card__panel-inner">
          <p className="msh-plan-card__audience">
            <span className="msh-plan-card__label">Para</span>
            {plan.audience}
          </p>

          <div className="msh-plan-card__block">
            <h4 className="msh-plan-card__block-title">Límites</h4>
            <ul className="msh-plan-card__list">
              <li>{plan.limits.locations}</li>
              <li>{plan.limits.tables}</li>
              <li>{plan.limits.carta}</li>
              <li>{plan.limits.staff}</li>
            </ul>
          </div>

          <div className="msh-plan-card__block">
            <h4 className="msh-plan-card__block-title">Funciones incluidas</h4>
            <ul className="msh-plan-card__list msh-plan-card__list--features">
              {plan.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>

          {"addon" in plan && plan.addon ? (
            <p className="msh-plan-card__addon">
              <span className="msh-plan-card__addon-mark" aria-hidden="true">
                +
              </span>
              {plan.addon}
            </p>
          ) : null}

          <p className="msh-plan-card__note">{plan.note}</p>
        </div>
      </div>
      </article>
    </div>
  );
}

export interface MsHomePlansAccordionProps {
  readonly plans: readonly MsSiteMotanosConceptualPlan[];
}

/** Grid de planes con acordeón (un plan abierto a la vez). */
export function MsHomePlansAccordion({ plans }: MsHomePlansAccordionProps): ReactElement {
  const [openKey, setOpenKey] = useState<string | null>(null);

  const handleToggle = useCallback((key: string) => {
    setOpenKey((current) => (current === key ? null : key));
  }, []);

  return (
    <div className="msh-plans__grid">
      {plans.map((plan) => (
        <MsHomePlanAccordionCard
          key={plan.key}
          plan={plan}
          expanded={openKey === plan.key}
          onToggle={() => handleToggle(plan.key)}
        />
      ))}
    </div>
  );
}
