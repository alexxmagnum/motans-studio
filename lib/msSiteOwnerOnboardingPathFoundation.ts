/**
 * P0 owner onboarding funnel — self-service vs assisted (commercial-site only).
 * MOTANOS_HOSTELERIA_OWNER_ONBOARDING_P0_REMEDIATION
 */
import { FASE_17_PUBLISHABLE_ROUTES } from "./fase17CommercialSitePublishableFoundation.js";
import {
  buildMotanosClientRegisterUrl,
  MS_SITE_SAAS_ONBOARDING_CTAS,
} from "./msSiteSaasOnboardingCtaFoundation.js";

export const MS_SITE_OWNER_ONBOARDING_PATH_BLOCK_ID =
  "MOTANOS_HOSTELERIA_OWNER_ONBOARDING_P0_REMEDIATION" as const;

/** Primary CTA for a restaurant owner who wants to start now (self-service). */
export const MS_SITE_OWNER_START_PRIMARY = {
  label: "Empezar con MotanOS Hostelería",
  href: FASE_17_PUBLISHABLE_ROUTES.hosteleria,
} as const;

/** Secondary CTA — assisted setup by Motans. */
export const MS_SITE_OWNER_START_ASSISTED = {
  label: "Configuración asistida",
  href: FASE_17_PUBLISHABLE_ROUTES.solicitud,
} as const;

export const MS_SITE_OWNER_PATH_DECISION = {
  title: "¿Cómo quieres empezar?",
  lead: "Elige una opción. No hace falta hablar con Motans para la autoservicio.",
  selfService: {
    id: "self-service",
    title: "Lo hago yo",
    summary: "Regístrate y configura tu negocio, carta y QR desde el panel.",
    ctaLabel: MS_SITE_SAAS_ONBOARDING_CTAS.secondary,
    ctaHref: buildMotanosClientRegisterUrl(),
  },
  assisted: {
    id: "assisted",
    title: "Motans me lo configura",
    summary: "Solicitud asistida: te contactamos para poner en marcha MotanOS en tu local.",
    ctaLabel: MS_SITE_OWNER_START_ASSISTED.label,
    ctaHref: MS_SITE_OWNER_START_ASSISTED.href,
  },
} as const;
