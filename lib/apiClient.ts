// API Client for Commercial Site
// Conecta los formularios a los endpoints públicos reales (sin auth).
// Fase 17 — IMPLEMENTATION_FASE_17_COMMERCIAL_SITE_MINIMAL_PUBLISHABLE

/** Optional public API. Empty/unset falls back to local default; set NEXT_PUBLIC_API_URL in .env.local. */
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3002";

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

async function apiPostPublic<TSuccess extends Record<string, unknown>>(
  path: string,
  body: unknown,
  mapSuccess: (payload: Record<string, unknown>) => TSuccess,
): Promise<ApiResult<TSuccess>> {
  const fallbackFetch = (globalThis as { fetch?: FetchLikeFn }).fetch;
  if (fallbackFetch === undefined) {
    return {
      ok: false,
      error: "Fetch no disponible en este entorno.",
      validationErrors: undefined,
    };
  }

  try {
    const response = await fallbackFetch(`${API_BASE_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
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
        error: String(payload.message ?? "Error desconocido"),
        validationErrors: readValidationErrors(payload),
      };
    }

    return { ok: true, data: mapSuccess(payload) };
  } catch (error) {
    console.error(`[apiClient] POST ${path} error:`, error);
    return {
      ok: false,
      error: "Error de conexión. Intenta de nuevo.",
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
