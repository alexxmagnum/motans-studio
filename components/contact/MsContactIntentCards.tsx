"use client";

import type { ReactElement } from "react";

export type MsContactIntentOption = {
  readonly value: string;
  readonly title: string;
  readonly description: string;
  readonly icon: "web" | "saas" | "automation" | "other";
};

type MsContactIntentCardsProps = {
  readonly legend: string;
  readonly options: readonly MsContactIntentOption[];
  readonly value: string;
  readonly disabled?: boolean;
  readonly error?: string | undefined;
  readonly onChange: (value: string) => void;
};

function IntentIcon({
  kind,
}: {
  readonly kind: MsContactIntentOption["icon"];
}): ReactElement {
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };

  if (kind === "web") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18" />
        <path d="M12 3a14 14 0 0 1 0 18" />
        <path d="M12 3a14 14 0 0 0 0 18" />
      </svg>
    );
  }
  if (kind === "saas") {
    return (
      <svg {...common}>
        <path d="M12 3v3" />
        <path d="M12 18v3" />
        <path d="M3 12h3" />
        <path d="M18 12h3" />
        <circle cx="12" cy="12" r="4.5" />
        <path d="M7.5 7.5 5.5 5.5" />
        <path d="M18.5 5.5 16.5 7.5" />
        <path d="M16.5 16.5 18.5 18.5" />
        <path d="M5.5 18.5 7.5 16.5" />
      </svg>
    );
  }
  if (kind === "automation") {
    return (
      <svg {...common}>
        <rect x="4" y="4" width="6" height="6" rx="1.2" />
        <rect x="14" y="4" width="6" height="6" rx="1.2" />
        <rect x="9" y="14" width="6" height="6" rx="1.2" />
        <path d="M7 10v2a2 2 0 0 0 2 2h1" />
        <path d="M17 10v1a2 2 0 0 1-2 2h-1" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M21 15a3 3 0 0 1-3 3H8l-5 3V6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3z" />
    </svg>
  );
}

export function MsContactIntentCards({
  legend,
  options,
  value,
  disabled = false,
  error,
  onChange,
}: MsContactIntentCardsProps): ReactElement {
  return (
    <fieldset
      className={`ms-field ms-intent-cards${error ? " ms-field--error" : ""}`}
    >
      <legend className="ms-form__legend">{legend}</legend>
      <div className="ms-intent-cards__grid" role="radiogroup" aria-required="true">
        {options.map((option) => {
          const checked = value === option.value;
          const inputId = `lead-intent-${option.value}`;
          return (
            <label
              key={option.value}
              htmlFor={inputId}
              className={`ms-intent-card${checked ? " is-selected" : ""}`}
            >
              <input
                id={inputId}
                type="radio"
                name="projectIntent"
                value={option.value}
                checked={checked}
                disabled={disabled}
                onChange={() => onChange(option.value)}
              />
              <span className="ms-intent-card__icon" aria-hidden="true">
                <IntentIcon kind={option.icon} />
              </span>
              <span className="ms-intent-card__body">
                <span className="ms-intent-card__title">{option.title}</span>
                <span className="ms-intent-card__desc">{option.description}</span>
              </span>
            </label>
          );
        })}
      </div>
      {error ? (
        <span className="ms-field__error" role="alert">
          {error}
        </span>
      ) : null}
    </fieldset>
  );
}
