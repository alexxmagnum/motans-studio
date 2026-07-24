"use client";

import type React from "react";
import { MotanosLocaleLanguageSwitcher } from "@motanos/design-system/locale";

import { useMsSiteLocale } from "./MsSiteLocaleProvider.js";

export interface MsSiteLanguageSelectorProps {
  readonly panelId?: string | undefined;
}

export function MsSiteLanguageSelector({
  panelId,
}: MsSiteLanguageSelectorProps = {}): React.ReactElement {
  const { locale, setLocale, nav } = useMsSiteLocale();

  return (
    <MotanosLocaleLanguageSwitcher
      locale={locale}
      setLocale={setLocale}
      panelId={panelId}
      listboxAriaLabel={nav.chooseLanguage}
      primaryBadgeLabel={nav.primaryLocale}
      triggerAriaLabel={`${nav.language}: ${nav.chooseLanguage}`}
    />
  );
}
