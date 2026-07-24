/**
 * External CTAs from commercial-site → motanos-client SaaS onboarding.
 * Site sells; motanos-client operates. No checkout, pricing or Stripe on site.
 */

export const MS_SITE_SAAS_ONBOARDING_CTA_BLOCK_ID =
  "SAAS_SELF_SERVICE_ONBOARDING_PRODUCT_SURFACE_SITE_CTA" as const;

/** Sales-safe labels (commercial claims guard). Plan aliases documented in microcopy. */
export const MS_SITE_SAAS_ONBOARDING_CTAS = {
  /** Plan alias: "Crear restaurante" */
  primary: "Alta en MotanOS Hostelería",
  /** Plan alias: "Probar MotanOS" */
  secondary: "Probar MotanOS",
  /** Plan alias: "Comenzar gratis" — sin palabra "gratis" por claims guard */
  tertiary: "Comenzar sin coste",
} as const;

export const MS_SITE_SAAS_ONBOARDING_CTA_NOTE =
  "Sin checkout, sin Stripe y sin billing en esta fase. La carta digital vive dentro de MotanOS." as const;

export const MS_SITE_SAAS_ONBOARDING_ONBOARDING_PATH = "/onboarding/saas" as const;
export const MS_SITE_SAAS_ONBOARDING_REGISTER_PATH = "/register" as const;
export const MS_SITE_SAAS_ONBOARDING_LOGIN_PATH = "/login" as const;

/** Auth CTAs on MotanOS product pages → motanos-client (no checkout on site). */
export const MS_SITE_MOTANOS_ACCOUNT_CTA_LABELS = {
  createAccount: "Crear cuenta",
  myAccount: "Mi cuenta",
} as const;

export const resolveMotanosClientPublicOrigin = (): string => {
  const fromEnv = String(
    process.env.NEXT_PUBLIC_MOTANOS_CLIENT_URL ??
      process.env.MOTANOS_CLIENT_PUBLIC_URL ??
      "",
  ).trim();
  if (fromEnv.length > 0) {
    return fromEnv.replace(/\/+$/, "");
  }
  return "http://localhost:3002";
};

export const buildMotanosClientSaasOnboardingUrl = (): string =>
  `${resolveMotanosClientPublicOrigin()}${MS_SITE_SAAS_ONBOARDING_ONBOARDING_PATH}`;

export const buildMotanosClientRegisterUrl = (): string =>
  `${resolveMotanosClientPublicOrigin()}${MS_SITE_SAAS_ONBOARDING_REGISTER_PATH}`;

export const buildMotanosClientLoginUrl = (): string =>
  `${resolveMotanosClientPublicOrigin()}${MS_SITE_SAAS_ONBOARDING_LOGIN_PATH}`;
