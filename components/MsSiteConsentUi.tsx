"use client";

import type React from "react";
import { useEffect, useId, useRef } from "react";
import Link from "next/link";
import {
  MS_SITE_CONSENT_CATEGORIES,
  type MsSiteConsentChoices,
  type MsSiteConsentCategoryId,
} from "../lib/msSiteConsentFoundation.js";
import type { MsSiteConsentCopy } from "../lib/msSiteConsentI18nFoundation.js";
import { MS_SITE_ROUTES } from "../lib/msSite1701Foundation.js";

export type MsSiteConsentUiProps = {
  readonly copy: MsSiteConsentCopy;
  readonly draft: MsSiteConsentChoices;
  readonly setDraft: React.Dispatch<React.SetStateAction<MsSiteConsentChoices>>;
  readonly bannerVisible: boolean;
  readonly preferencesOpen: boolean;
  readonly onAcceptAll: () => void;
  readonly onRejectAll: () => void;
  readonly onOpenPreferences: () => void;
  readonly onClosePreferences: () => void;
  readonly onSave: () => void;
};

function toggleCategory(
  id: MsSiteConsentCategoryId,
  locked: boolean,
  setDraft: MsSiteConsentUiProps["setDraft"],
): void {
  if (locked) {
    return;
  }
  setDraft((prev) => ({
    ...prev,
    necessary: true,
    [id]: !prev[id],
  }));
}

export function MsSiteConsentUi({
  copy,
  draft,
  setDraft,
  bannerVisible,
  preferencesOpen,
  onAcceptAll,
  onRejectAll,
  onOpenPreferences,
  onClosePreferences,
  onSave,
}: MsSiteConsentUiProps): React.ReactElement | null {
  const titleId = useId();
  const prefsTitleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const firstFocusRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!preferencesOpen) {
      return;
    }
    const previous = document.activeElement as HTMLElement | null;
    firstFocusRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClosePreferences();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      previous?.focus?.();
    };
  }, [preferencesOpen, onClosePreferences]);

  if (!bannerVisible && !preferencesOpen) {
    return null;
  }

  return (
    <div
      className={`ms-consent${preferencesOpen ? " ms-consent--prefs-open" : ""}`}
      role="region"
      aria-label={copy.dialogLabel}
    >
      {preferencesOpen ? (
        <button
          type="button"
          className="ms-consent__backdrop"
          aria-label={copy.closePreferences}
          onClick={onClosePreferences}
        />
      ) : null}

      <div
        className="ms-consent__panel"
        ref={panelRef}
        role={preferencesOpen ? "dialog" : undefined}
        aria-modal={preferencesOpen ? true : undefined}
        aria-labelledby={preferencesOpen ? prefsTitleId : titleId}
      >
        {!preferencesOpen ? (
          <div className="ms-consent__banner">
            <div className="ms-consent__accent" aria-hidden="true" />
            <div className="ms-consent__copy">
              <p className="ms-consent__kicker">Motans Studio</p>
              <h2 id={titleId} className="ms-consent__title">
                {copy.title}
              </h2>
              <p className="ms-consent__lead">{copy.lead}</p>
              <p className="ms-consent__more">
                <Link href={MS_SITE_ROUTES.legalCookies} className="ms-consent__link">
                  {copy.learnMore}
                </Link>
              </p>
            </div>
            <div className="ms-consent__actions">
              <button
                type="button"
                className="ms-consent__btn ms-consent__btn--primary"
                onClick={onAcceptAll}
              >
                {copy.acceptAll}
              </button>
              <button
                type="button"
                className="ms-consent__btn ms-consent__btn--ghost"
                onClick={onRejectAll}
              >
                {copy.rejectAll}
              </button>
              <button
                type="button"
                className="ms-consent__btn ms-consent__btn--text"
                onClick={onOpenPreferences}
              >
                {copy.configure}
              </button>
            </div>
          </div>
        ) : (
          <div className="ms-consent__prefs">
            <div className="ms-consent__accent" aria-hidden="true" />
            <div className="ms-consent__prefs-head">
              <div>
                <p className="ms-consent__kicker">Motans Studio</p>
                <h2 id={prefsTitleId} className="ms-consent__title">
                  {copy.preferencesTitle}
                </h2>
                <p className="ms-consent__lead">{copy.preferencesLead}</p>
              </div>
              <button
                ref={firstFocusRef}
                type="button"
                className="ms-consent__icon-close"
                onClick={onClosePreferences}
                aria-label={copy.closePreferences}
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>

            <ul className="ms-consent__list">
              {MS_SITE_CONSENT_CATEGORIES.map((category) => {
                const meta = copy.categories[category.id];
                const checked = draft[category.id];
                const inputId = `ms-consent-${category.id}`;
                return (
                  <li key={category.id} className="ms-consent__item">
                    <div className="ms-consent__item-copy">
                      <label htmlFor={inputId} className="ms-consent__item-label">
                        {meta.label}
                        {category.locked ? (
                          <span className="ms-consent__badge">{copy.alwaysOn}</span>
                        ) : null}
                      </label>
                      <p className="ms-consent__item-desc">{meta.description}</p>
                    </div>
                    <div className="ms-consent__switch-wrap">
                      <input
                        id={inputId}
                        type="checkbox"
                        className="ms-consent__switch"
                        checked={checked}
                        disabled={category.locked}
                        onChange={() =>
                          toggleCategory(category.id, category.locked, setDraft)
                        }
                      />
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="ms-consent__actions ms-consent__actions--prefs">
              <button
                type="button"
                className="ms-consent__btn ms-consent__btn--primary"
                onClick={onSave}
              >
                {copy.save}
              </button>
              <button
                type="button"
                className="ms-consent__btn ms-consent__btn--ghost"
                onClick={onRejectAll}
              >
                {copy.rejectAll}
              </button>
              <button
                type="button"
                className="ms-consent__btn ms-consent__btn--text"
                onClick={onAcceptAll}
              >
                {copy.acceptAll}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
