export const supportedLanguageCodes = [
  "es",
  "en",
  "fr",
  "de",
  "it",
  "pt",
] as const;

export type SupportedLanguageCode = (typeof supportedLanguageCodes)[number];

export const defaultLanguage: SupportedLanguageCode = "es";

export type TranslationDictionary = Record<string, string>;

export const getDefaultLanguage = (): SupportedLanguageCode => {
  return defaultLanguage;
};
