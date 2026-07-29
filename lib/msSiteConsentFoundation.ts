/**
 * Motans Studio — consentimiento de cookies (Fase 6).
 * Persistencia local; puente listo para Analytics / Meta Pixel.
 */

export const MS_SITE_CONSENT_BLOCK_ID = "MS_SITE_CONSENT_V1" as const;

export const MS_SITE_CONSENT_STORAGE_KEY = "motans-studio-consent-v1" as const;

export const MS_SITE_CONSENT_VERSION = 1 as const;

export type MsSiteConsentCategoryId =
  | "necessary"
  | "analytics"
  | "marketing"
  | "preferences"
  | "functional";

export type MsSiteConsentChoices = Record<MsSiteConsentCategoryId, boolean>;

export type MsSiteConsentRecord = {
  readonly version: typeof MS_SITE_CONSENT_VERSION;
  readonly updatedAt: string;
  readonly choices: MsSiteConsentChoices;
};

export const MS_SITE_CONSENT_CATEGORIES: readonly {
  readonly id: MsSiteConsentCategoryId;
  readonly locked: boolean;
}[] = [
  { id: "necessary", locked: true },
  { id: "analytics", locked: false },
  { id: "marketing", locked: false },
  { id: "preferences", locked: false },
  { id: "functional", locked: false },
] as const;

export const MS_SITE_CONSENT_DEFAULT_CHOICES: MsSiteConsentChoices = {
  necessary: true,
  analytics: false,
  marketing: false,
  preferences: false,
  functional: false,
};

export function createMsSiteConsentRecord(
  choices: MsSiteConsentChoices,
): MsSiteConsentRecord {
  return {
    version: MS_SITE_CONSENT_VERSION,
    updatedAt: new Date().toISOString(),
    choices: {
      ...choices,
      necessary: true,
    },
  };
}

export function parseMsSiteConsentRecord(raw: string | null): MsSiteConsentRecord | null {
  if (!raw) {
    return null;
  }
  try {
    const parsed = JSON.parse(raw) as Partial<MsSiteConsentRecord>;
    if (parsed.version !== MS_SITE_CONSENT_VERSION || !parsed.choices) {
      return null;
    }
    return createMsSiteConsentRecord({
      necessary: true,
      analytics: Boolean(parsed.choices.analytics),
      marketing: Boolean(parsed.choices.marketing),
      preferences: Boolean(parsed.choices.preferences),
      functional: Boolean(parsed.choices.functional),
    });
  } catch {
    return null;
  }
}

/** Puente preparado para scripts de terceros (GA, Meta, etc.). */
export type MsSiteConsentIntegrationHook = (record: MsSiteConsentRecord) => void;

const integrationHooks: MsSiteConsentIntegrationHook[] = [];

export function registerMsSiteConsentIntegration(
  hook: MsSiteConsentIntegrationHook,
): () => void {
  integrationHooks.push(hook);
  return () => {
    const index = integrationHooks.indexOf(hook);
    if (index >= 0) {
      integrationHooks.splice(index, 1);
    }
  };
}

export function notifyMsSiteConsentIntegrations(record: MsSiteConsentRecord): void {
  for (const hook of integrationHooks) {
    try {
      hook(record);
    } catch {
      /* no bloquear UX por integraciones */
    }
  }
}
