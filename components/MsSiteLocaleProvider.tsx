"use client";

import type React from "react";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  MS_SITE_LOCALE_STORAGE_KEY,
  MS_SITE_NAV_I18N,
  defaultLanguage,
  resolveSiteLocale,
  type SupportedLanguageCode,
} from "../lib/msSiteLocaleFoundation.js";
import { MS_SITE_UI_I18N, type MsSiteUiCopy } from "../lib/msSiteUiI18nFoundation.js";

export type MsSiteLocaleContextValue = {
  readonly locale: SupportedLanguageCode;
  readonly setLocale: (locale: SupportedLanguageCode) => void;
  readonly nav: (typeof MS_SITE_NAV_I18N)["es"];
  readonly ui: MsSiteUiCopy;
};

const MsSiteLocaleContext = createContext<MsSiteLocaleContextValue | null>(null);

function readStoredLocale(): SupportedLanguageCode {
  if (typeof window === "undefined") {
    return defaultLanguage;
  }
  return resolveSiteLocale(window.localStorage.getItem(MS_SITE_LOCALE_STORAGE_KEY));
}

export function MsSiteLocaleProvider({
  children,
}: {
  readonly children: React.ReactNode;
}): React.ReactElement {
  const [locale, setLocaleState] = useState<SupportedLanguageCode>(defaultLanguage);

  useEffect(() => {
    setLocaleState(readStoredLocale());
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    window.localStorage.setItem(MS_SITE_LOCALE_STORAGE_KEY, locale);
  }, [locale]);

  const setLocale = useCallback((next: SupportedLanguageCode) => {
    setLocaleState(next);
  }, []);

  const value = useMemo<MsSiteLocaleContextValue>(
    () => ({
      locale,
      setLocale,
      nav: MS_SITE_NAV_I18N[locale],
      ui: MS_SITE_UI_I18N[locale],
    }),
    [locale, setLocale],
  );

  return <MsSiteLocaleContext.Provider value={value}>{children}</MsSiteLocaleContext.Provider>;
}

export function useMsSiteLocale(): MsSiteLocaleContextValue {
  const ctx = useContext(MsSiteLocaleContext);
  if (!ctx) {
    throw new Error("useMsSiteLocale must be used within MsSiteLocaleProvider");
  }
  return ctx;
}
