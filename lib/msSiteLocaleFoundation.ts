import {
  defaultLanguage,
  supportedLanguageCodes,
  type SupportedLanguageCode,
} from "@motanos/i18n";

export { defaultLanguage, supportedLanguageCodes, type SupportedLanguageCode };

export const MS_SITE_LOCALE_STORAGE_KEY = "motans-studio-site-locale" as const;

export { MOTANOS_LOCALE_OPTIONS as MS_SITE_LOCALE_OPTIONS } from "@motanos/design-system/locale";

export function isSupportedLanguageCode(value: string): value is SupportedLanguageCode {
  return (supportedLanguageCodes as readonly string[]).includes(value);
}

export function resolveSiteLocale(value: string | null | undefined): SupportedLanguageCode {
  if (value && isSupportedLanguageCode(value)) {
    return value;
  }
  return defaultLanguage;
}

export const MS_SITE_NAV_I18N: Record<
  SupportedLanguageCode,
  {
    readonly inicio: string;
    readonly servicios: string;
    readonly motanos: string;
    readonly planes: string;
    readonly configuracionAsistida: string;
    readonly contacto: string;
    readonly menu: string;
    readonly language: string;
    readonly chooseLanguage: string;
    readonly primaryLocale: string;
  }
> = {
  es: {
    inicio: "Inicio",
    servicios: "Qué hacemos",
    motanos: "MotanOS",
    planes: "Planes",
    configuracionAsistida: "Configuración asistida",
    contacto: "Contacto",
    menu: "Menú",
    language: "Idioma",
    chooseLanguage: "Elegir idioma",
    primaryLocale: "Principal",
  },
  en: {
    inicio: "Home",
    servicios: "What we do",
    motanos: "MotanOS",
    planes: "Plans",
    configuracionAsistida: "Assisted setup",
    contacto: "Contact",
    menu: "Menu",
    language: "Language",
    chooseLanguage: "Choose language",
    primaryLocale: "Primary",
  },
  fr: {
    inicio: "Accueil",
    servicios: "Ce que nous faisons",
    motanos: "MotanOS",
    planes: "Offres",
    configuracionAsistida: "Configuration assistée",
    contacto: "Contact",
    menu: "Menu",
    language: "Langue",
    chooseLanguage: "Choisir la langue",
    primaryLocale: "Principal",
  },
  de: {
    inicio: "Start",
    servicios: "Was wir tun",
    motanos: "MotanOS",
    planes: "Tarife",
    configuracionAsistida: "Begleitete Einrichtung",
    contacto: "Kontakt",
    menu: "Menü",
    language: "Sprache",
    chooseLanguage: "Sprache wählen",
    primaryLocale: "Haupt",
  },
  it: {
    inicio: "Home",
    servicios: "Cosa facciamo",
    motanos: "MotanOS",
    planes: "Piani",
    configuracionAsistida: "Configurazione assistita",
    contacto: "Contatto",
    menu: "Menu",
    language: "Lingua",
    chooseLanguage: "Scegli lingua",
    primaryLocale: "Principale",
  },
  pt: {
    inicio: "Início",
    servicios: "O que fazemos",
    motanos: "MotanOS",
    planes: "Planos",
    configuracionAsistida: "Configuração assistida",
    contacto: "Contacto",
    menu: "Menu",
    language: "Idioma",
    chooseLanguage: "Escolher idioma",
    primaryLocale: "Principal",
  },
};

export type MsSiteNavLabelKey = keyof (typeof MS_SITE_NAV_I18N)["es"];

const NAV_LABEL_KEY_BY_HREF: Record<string, MsSiteNavLabelKey> = {
  "/": "inicio",
  "/servicios": "servicios",
  "/#servicios": "servicios",
  "/motanos": "motanos",
  "/#planes": "planes",
  "/solicitud": "configuracionAsistida",
  "/contacto": "contacto",
  "/#contacto": "contacto",
};

export function getNavLabelForHref(
  href: string,
  locale: SupportedLanguageCode,
): string {
  const key = NAV_LABEL_KEY_BY_HREF[href];
  if (!key) {
    return href;
  }
  return MS_SITE_NAV_I18N[locale][key];
}
