/**
 * Motans Studio — copy del sistema de consentimiento (Fase 6).
 */

import type { SupportedLanguageCode } from "@motanos/i18n";
import type { MsSiteConsentCategoryId } from "./msSiteConsentFoundation.js";

export type MsSiteConsentCopy = {
  readonly title: string;
  readonly lead: string;
  readonly acceptAll: string;
  readonly rejectAll: string;
  readonly configure: string;
  readonly save: string;
  readonly closePreferences: string;
  readonly preferencesTitle: string;
  readonly preferencesLead: string;
  readonly alwaysOn: string;
  readonly learnMore: string;
  readonly openFromFooter: string;
  readonly dialogLabel: string;
  readonly categories: Record<
    MsSiteConsentCategoryId,
    { readonly label: string; readonly description: string }
  >;
};

const ES: MsSiteConsentCopy = {
  title: "Tu privacidad, con el mismo cuidado que el producto",
  lead: "Usamos cookies necesarias para el sitio y, solo si lo permites, categorías opcionales para medir, mejorar o personalizar la experiencia.",
  acceptAll: "Aceptar todas",
  rejectAll: "Rechazar todas",
  configure: "Configurar preferencias",
  save: "Guardar",
  closePreferences: "Cerrar",
  preferencesTitle: "Preferencias de cookies",
  preferencesLead:
    "Activa solo lo que quieras. Las cookies necesarias permanecen siempre activas.",
  alwaysOn: "Siempre activas",
  learnMore: "Política de cookies",
  openFromFooter: "Configurar cookies",
  dialogLabel: "Consentimiento de cookies",
  categories: {
    necessary: {
      label: "Necesarias",
      description: "Imprescindibles para seguridad, sesión y funcionamiento básico del sitio.",
    },
    analytics: {
      label: "Analíticas",
      description: "Nos ayudan a entender el uso del sitio de forma agregada (p. ej. Analytics).",
    },
    marketing: {
      label: "Marketing",
      description: "Publicidad y remarketing (p. ej. Meta Pixel) cuando se activen integraciones.",
    },
    preferences: {
      label: "Preferencias",
      description: "Recuerdan opciones de interfaz y personalización no esenciales.",
    },
    functional: {
      label: "Funcionales",
      description: "Mejoran funciones opcionales del sitio sin ser estrictamente necesarias.",
    },
  },
};

function localize(base: MsSiteConsentCopy, patch: Partial<MsSiteConsentCopy>): MsSiteConsentCopy {
  return {
    ...base,
    ...patch,
    categories: {
      ...base.categories,
      ...(patch.categories ?? {}),
    },
  };
}

export const MS_SITE_CONSENT_I18N: Record<SupportedLanguageCode, MsSiteConsentCopy> = {
  es: ES,
  en: localize(ES, {
    title: "Your privacy, with the same care as the product",
    lead: "We use necessary cookies for the site and, only if you allow it, optional categories to measure, improve or personalize the experience.",
    acceptAll: "Accept all",
    rejectAll: "Reject all",
    configure: "Configure preferences",
    save: "Save",
    closePreferences: "Close",
    preferencesTitle: "Cookie preferences",
    preferencesLead: "Enable only what you want. Necessary cookies always stay on.",
    alwaysOn: "Always on",
    learnMore: "Cookie policy",
    openFromFooter: "Cookie settings",
    dialogLabel: "Cookie consent",
    categories: {
      necessary: {
        label: "Necessary",
        description: "Required for security, session and basic site operation.",
      },
      analytics: {
        label: "Analytics",
        description: "Help us understand site usage in aggregate (e.g. Analytics).",
      },
      marketing: {
        label: "Marketing",
        description: "Ads and remarketing (e.g. Meta Pixel) when integrations go live.",
      },
      preferences: {
        label: "Preferences",
        description: "Remember non-essential UI and personalization choices.",
      },
      functional: {
        label: "Functional",
        description: "Improve optional site features that are not strictly required.",
      },
    },
  }),
  fr: localize(ES, {
    title: "Votre vie privée, avec le même soin que le produit",
    lead: "Nous utilisons des cookies nécessaires et, seulement si vous l’acceptez, des catégories optionnelles pour mesurer, améliorer ou personnaliser l’expérience.",
    acceptAll: "Tout accepter",
    rejectAll: "Tout refuser",
    configure: "Configurer les préférences",
    save: "Enregistrer",
    closePreferences: "Fermer",
    preferencesTitle: "Préférences cookies",
    preferencesLead: "Activez uniquement ce que vous souhaitez. Les cookies nécessaires restent toujours actifs.",
    alwaysOn: "Toujours actifs",
    learnMore: "Politique de cookies",
    openFromFooter: "Configurer les cookies",
    dialogLabel: "Consentement cookies",
  }),
  de: localize(ES, {
    title: "Ihre Privatsphäre — mit derselben Sorgfalt wie das Produkt",
    lead: "Wir verwenden notwendige Cookies und, nur wenn Sie zustimmen, optionale Kategorien zur Messung, Verbesserung oder Personalisierung.",
    acceptAll: "Alle akzeptieren",
    rejectAll: "Alle ablehnen",
    configure: "Einstellungen",
    save: "Speichern",
    closePreferences: "Schließen",
    preferencesTitle: "Cookie-Einstellungen",
    preferencesLead: "Aktivieren Sie nur, was Sie möchten. Notwendige Cookies bleiben immer aktiv.",
    alwaysOn: "Immer aktiv",
    learnMore: "Cookie-Richtlinie",
    openFromFooter: "Cookies konfigurieren",
    dialogLabel: "Cookie-Einwilligung",
  }),
  it: localize(ES, {
    title: "La tua privacy, con la stessa cura del prodotto",
    lead: "Usiamo cookie necessari e, solo se lo consenti, categorie opzionali per misurare, migliorare o personalizzare l’esperienza.",
    acceptAll: "Accetta tutte",
    rejectAll: "Rifiuta tutte",
    configure: "Configura preferenze",
    save: "Salva",
    closePreferences: "Chiudi",
    preferencesTitle: "Preferenze cookie",
    preferencesLead: "Attiva solo ciò che vuoi. I cookie necessari restano sempre attivi.",
    alwaysOn: "Sempre attivi",
    learnMore: "Politica cookie",
    openFromFooter: "Configura cookie",
    dialogLabel: "Consenso cookie",
  }),
  pt: localize(ES, {
    title: "A sua privacidade, com o mesmo cuidado do produto",
    lead: "Usamos cookies necessários e, só se permitir, categorias opcionais para medir, melhorar ou personalizar a experiência.",
    acceptAll: "Aceitar todas",
    rejectAll: "Rejeitar todas",
    configure: "Configurar preferências",
    save: "Guardar",
    closePreferences: "Fechar",
    preferencesTitle: "Preferências de cookies",
    preferencesLead: "Ative apenas o que quiser. As cookies necessárias ficam sempre ativas.",
    alwaysOn: "Sempre ativas",
    learnMore: "Política de cookies",
    openFromFooter: "Configurar cookies",
    dialogLabel: "Consentimento de cookies",
  }),
};
