"use client";

import type React from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  MS_SITE_CONSENT_DEFAULT_CHOICES,
  MS_SITE_CONSENT_STORAGE_KEY,
  createMsSiteConsentRecord,
  notifyMsSiteConsentIntegrations,
  parseMsSiteConsentRecord,
  type MsSiteConsentCategoryId,
  type MsSiteConsentChoices,
  type MsSiteConsentRecord,
} from "../lib/msSiteConsentFoundation.js";
import { MS_SITE_CONSENT_I18N } from "../lib/msSiteConsentI18nFoundation.js";
import { useMsSiteLocale } from "./MsSiteLocaleProvider.js";
import { MsSiteConsentUi } from "./MsSiteConsentUi.js";

type MsSiteConsentContextValue = {
  readonly ready: boolean;
  readonly record: MsSiteConsentRecord | null;
  readonly choices: MsSiteConsentChoices;
  readonly bannerVisible: boolean;
  readonly preferencesOpen: boolean;
  readonly openPreferences: () => void;
  readonly closePreferences: () => void;
  readonly acceptAll: () => void;
  readonly rejectAll: () => void;
  readonly saveChoices: (choices: MsSiteConsentChoices) => void;
  readonly hasCategory: (id: MsSiteConsentCategoryId) => boolean;
};

const MsSiteConsentContext = createContext<MsSiteConsentContextValue | null>(null);

function readStoredConsent(): MsSiteConsentRecord | null {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    return parseMsSiteConsentRecord(window.localStorage.getItem(MS_SITE_CONSENT_STORAGE_KEY));
  } catch {
    return null;
  }
}

function writeStoredConsent(record: MsSiteConsentRecord): void {
  try {
    window.localStorage.setItem(MS_SITE_CONSENT_STORAGE_KEY, JSON.stringify(record));
  } catch {
    /* storage bloqueado */
  }
}

export function MsSiteConsentProvider({
  children,
}: {
  readonly children: React.ReactNode;
}): React.ReactElement {
  const { locale } = useMsSiteLocale();
  const copy = MS_SITE_CONSENT_I18N[locale];

  const [ready, setReady] = useState(false);
  const [record, setRecord] = useState<MsSiteConsentRecord | null>(null);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [draft, setDraft] = useState<MsSiteConsentChoices>(MS_SITE_CONSENT_DEFAULT_CHOICES);

  useEffect(() => {
    const stored = readStoredConsent();
    setRecord(stored);
    if (stored) {
      setDraft(stored.choices);
      notifyMsSiteConsentIntegrations(stored);
    }
    setReady(true);
  }, []);

  const persist = useCallback((choices: MsSiteConsentChoices) => {
    const next = createMsSiteConsentRecord(choices);
    writeStoredConsent(next);
    setRecord(next);
    setDraft(next.choices);
    setPreferencesOpen(false);
    notifyMsSiteConsentIntegrations(next);
  }, []);

  const acceptAll = useCallback(() => {
    persist({
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
      functional: true,
    });
  }, [persist]);

  const rejectAll = useCallback(() => {
    persist({ ...MS_SITE_CONSENT_DEFAULT_CHOICES });
  }, [persist]);

  const saveChoices = useCallback(
    (choices: MsSiteConsentChoices) => {
      persist(choices);
    },
    [persist],
  );

  const openPreferences = useCallback(() => {
    setDraft(record?.choices ?? MS_SITE_CONSENT_DEFAULT_CHOICES);
    setPreferencesOpen(true);
  }, [record]);

  const closePreferences = useCallback(() => {
    setPreferencesOpen(false);
  }, []);

  const value = useMemo<MsSiteConsentContextValue>(
    () => ({
      ready,
      record,
      choices: record?.choices ?? MS_SITE_CONSENT_DEFAULT_CHOICES,
      bannerVisible: ready && record === null,
      preferencesOpen,
      openPreferences,
      closePreferences,
      acceptAll,
      rejectAll,
      saveChoices,
      hasCategory: (id) => Boolean(record?.choices[id]),
    }),
    [
      ready,
      record,
      preferencesOpen,
      openPreferences,
      closePreferences,
      acceptAll,
      rejectAll,
      saveChoices,
    ],
  );

  return (
    <MsSiteConsentContext.Provider value={value}>
      {children}
      <MsSiteConsentUi
        copy={copy}
        draft={draft}
        setDraft={setDraft}
        bannerVisible={value.bannerVisible}
        preferencesOpen={preferencesOpen}
        onAcceptAll={acceptAll}
        onRejectAll={rejectAll}
        onOpenPreferences={openPreferences}
        onClosePreferences={closePreferences}
        onSave={() => saveChoices(draft)}
      />
    </MsSiteConsentContext.Provider>
  );
}

export function useMsSiteConsent(): MsSiteConsentContextValue {
  const ctx = useContext(MsSiteConsentContext);
  if (!ctx) {
    throw new Error("useMsSiteConsent must be used within MsSiteConsentProvider");
  }
  return ctx;
}

/** Safe for footer / chrome that may render outside provider in tests. */
export function useMsSiteConsentOptional(): MsSiteConsentContextValue | null {
  return useContext(MsSiteConsentContext);
}
