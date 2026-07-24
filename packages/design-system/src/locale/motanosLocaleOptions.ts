import {
  defaultLanguage,
  supportedLanguageCodes,
  type SupportedLanguageCode,
} from "@motanos/i18n";

export type MotanosLocaleCode = SupportedLanguageCode;

export const MOTANOS_DEFAULT_LOCALE: MotanosLocaleCode = defaultLanguage;

export interface MotanosLocaleOption {
  readonly code: MotanosLocaleCode;
  readonly label: string;
  readonly nativeLabel: string;
  readonly isPrimary?: boolean | undefined;
}

const MOTANOS_PRIMARY_LOCALE_OPTION: MotanosLocaleOption = {
  code: "es",
  label: "Español",
  nativeLabel: "Español",
  isPrimary: true,
};

/** Seis idiomas base MotanOS — español principal (misma lista que carta pública). */
export const MOTANOS_LOCALE_OPTIONS: readonly MotanosLocaleOption[] = [
  MOTANOS_PRIMARY_LOCALE_OPTION,
  { code: "en", label: "English", nativeLabel: "English" },
  { code: "fr", label: "Français", nativeLabel: "Français" },
  { code: "de", label: "Deutsch", nativeLabel: "Deutsch" },
  { code: "it", label: "Italiano", nativeLabel: "Italiano" },
  { code: "pt", label: "Português", nativeLabel: "Português" },
];

export function isMotanosLocaleCode(value: string): value is MotanosLocaleCode {
  return (supportedLanguageCodes as readonly string[]).includes(value);
}

export function resolveMotanosLocale(
  stored: string | null | undefined,
): MotanosLocaleCode {
  if (stored !== undefined && stored !== null && isMotanosLocaleCode(stored)) {
    return stored;
  }
  return MOTANOS_DEFAULT_LOCALE;
}

export function findMotanosLocaleOption(code: MotanosLocaleCode): MotanosLocaleOption {
  for (const option of MOTANOS_LOCALE_OPTIONS) {
    if (option.code === code) {
      return option;
    }
  }
  return MOTANOS_PRIMARY_LOCALE_OPTION;
}
