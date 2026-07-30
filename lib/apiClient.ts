// API Client for Commercial Site
// Conecta los formularios a los endpoints públicos reales (sin auth).
// Fase 17 — IMPLEMENTATION_FASE_17_COMMERCIAL_SITE_MINIMAL_PUBLISHABLE
// Fase 7A — integración explícita: NEXT_PUBLIC_API_URL vacío ≠ configurado.

import { MS_SITE_IDENTITY } from "./msSiteIdentityFoundation.js";

/**
 * Base URL de la API pública de leads.
 * - Producción: definir `NEXT_PUBLIC_API_URL` (ej. https://api.motansstudio.com)
 * - Desarrollo local: fallback `http://localhost:3002` solo fuera de production
 * - Cadena vacía en .env se trata como no configurada
 */
function resolveMsSiteApiBaseUrl(): string {
  const raw = process.env.NEXT_PUBLIC_API_URL?.trim();
  if (raw) {
    return raw.replace(/\/$/, "");
  }
  if (process.env.NODE_ENV === "production") {
    return "";
  }
  return "http://localhost:3002";
}

export const MS_SITE_API_BASE_URL = resolveMsSiteApiBaseUrl();

/** True solo si el despliegue definió explícitamente NEXT_PUBLIC_API_URL. */
export const MS_SITE_API_URL_CONFIGURED = Boolean(
  process.env.NEXT_PUBLIC_API_URL?.trim(),
);

const API_BASE_URL = MS_SITE_API_BASE_URL;

export type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string; validationErrors: Array<{ field: string; message: string }> | undefined };

export type LeadResponse = {
  leadId: string;
  message: string;
};

export type LeadRequest = {
  name: string;
  email: string;
  businessName: string;
  businessType: string;
  message: string | undefined;
};

export type AssistedRequest = {
  name: string;
  email: string;
  phone: string | undefined;
  businessName: string;
  businessType: string;
  businessLocation: string;
  preferredPlan: string | undefined;
  urgency: string | undefined;
  currentSystem: string | undefined;
  message: string | undefined;
};

export type AssistedResponse = {
  requestId: string;
  message: string;
  estimatedResponseHours: number;
};

type FetchLikeResponse = {
  readonly status: number;
  readonly ok: boolean;
  json(): Promise<unknown>;
};

type FetchLikeFn = (
  input: string,
  init?: {
    readonly method?: "POST";
    readonly headers?: Record<string, string>;
    readonly body?: string;
    readonly signal?: AbortSignal;
  },
) => Promise<FetchLikeResponse>;

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const readValidationErrors = (
  payload: Record<string, unknown>,
): Array<{ field: string; message: string }> | undefined => {
  const raw = payload.validationErrors;
  if (!Array.isArray(raw)) {
    return undefined;
  }
  return raw as Array<{ field: string; message: string }>;
};

const CONNECTION_ERROR_MESSAGE = MS_SITE_API_URL_CONFIGURED
  ? `Error de conexión. Inténtalo de nuevo o escríbenos a ${MS_SITE_IDENTITY.email}.`
  : `El servicio de contacto no está disponible todavía. Escríbenos a ${MS_SITE_IDENTITY.email}.`;

/** Evita peticiones colgadas en redes inestables. */
const MS_SITE_API_TIMEOUT_MS = 15_000;

async function apiPostPublic<TSuccess extends Record<string, unknown>>(
  path: string,
  body: unknown,
  mapSuccess: (payload: Record<string, unknown>) => TSuccess,
): Promise<ApiResult<TSuccess>> {
  if (!API_BASE_URL) {
    return {
      ok: false,
      error: CONNECTION_ERROR_MESSAGE,
      validationErrors: undefined,
    };
  }

  const fallbackFetch = (globalThis as { fetch?: FetchLikeFn }).fetch;
  if (fallbackFetch === undefined) {
    return {
      ok: false,
      error: "No se pudo conectar. Inténtalo de nuevo.",
      validationErrors: undefined,
    };
  }

  try {
    const response = await fallbackFetch(`${API_BASE_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(MS_SITE_API_TIMEOUT_MS),
    });

    const payload = await response.json();
    if (!isObject(payload)) {
      return {
        ok: false,
        error: "Respuesta inválida del servidor.",
        validationErrors: undefined,
      };
    }

    if (payload.success === false) {
      return {
        ok: false,
        error: String(payload.message ?? "Error en la solicitud"),
        validationErrors: readValidationErrors(payload),
      };
    }

    if (!response.ok || payload.success !== true) {
      return {
        ok: false,
        error: String(payload.message ?? "Hubo un error. Inténtalo de nuevo."),
        validationErrors: readValidationErrors(payload),
      };
    }

    return { ok: true, data: mapSuccess(payload) };
  } catch {
    return {
      ok: false,
      error: CONNECTION_ERROR_MESSAGE,
      validationErrors: undefined,
    };
  }
}

export async function submitLead(request: LeadRequest): Promise<ApiResult<LeadResponse>> {
  return apiPostPublic("/api/public/leads", {
    ...request,
    source: "commercial_site",
    submittedAt: new Date().toISOString(),
  }, (payload) => ({
    leadId: String(payload.leadId ?? ""),
    message: String(payload.message ?? "Lead recibido"),
  }));
}

export async function submitAssistedRequest(
  request: AssistedRequest,
): Promise<ApiResult<AssistedResponse>> {
  return apiPostPublic("/api/public/assisted-requests", {
    ...request,
    source: "commercial_site",
    submittedAt: new Date().toISOString(),
  }, (payload) => ({
    requestId: String(payload.requestId ?? ""),
    message: String(payload.message ?? "Solicitud recibida"),
    estimatedResponseHours: Number(payload.estimatedResponseHours ?? 24),
  }));
}
