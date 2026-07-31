// API Client for Commercial Site
// Contacto público → Route Handler same-origin `/api/contact` (Resend, server-only).
// Assisted requests still target optional external NEXT_PUBLIC_API_URL (legacy).

import { MS_SITE_IDENTITY } from "./msSiteIdentityFoundation.js";

/**
 * Base URL for legacy assisted-request API (optional).
 * Contact form does not use this — it posts to `/api/contact`.
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
  projectIntent: string;
  projectIntentLabel: string;
  sector: string;
  sectorLabel: string;
  message: string | undefined;
  /** Honeypot — must stay empty for humans. */
  companyUrl?: string;
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

const CONNECTION_ERROR_MESSAGE = `Error de conexión. Inténtalo de nuevo o escríbenos a ${MS_SITE_IDENTITY.email}.`;

const ASSISTED_CONNECTION_ERROR_MESSAGE = MS_SITE_API_URL_CONFIGURED
  ? CONNECTION_ERROR_MESSAGE
  : `El servicio de contacto no está disponible todavía. Escríbenos a ${MS_SITE_IDENTITY.email}.`;

/** Evita peticiones colgadas en redes inestables. */
const MS_SITE_API_TIMEOUT_MS = 15_000;

async function apiPostJson<TSuccess extends Record<string, unknown>>(
  url: string,
  body: unknown,
  mapSuccess: (payload: Record<string, unknown>) => TSuccess,
  connectionErrorMessage: string,
): Promise<ApiResult<TSuccess>> {
  const fallbackFetch = (globalThis as { fetch?: FetchLikeFn }).fetch;
  if (fallbackFetch === undefined) {
    return {
      ok: false,
      error: "No se pudo conectar. Inténtalo de nuevo.",
      validationErrors: undefined,
    };
  }

  try {
    const response = await fallbackFetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(MS_SITE_API_TIMEOUT_MS),
    });

    let payload: unknown;
    try {
      payload = await response.json();
    } catch {
      return {
        ok: false,
        error: "Respuesta inválida del servidor.",
        validationErrors: undefined,
      };
    }

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
      error: connectionErrorMessage,
      validationErrors: undefined,
    };
  }
}

async function apiPostPublic<TSuccess extends Record<string, unknown>>(
  path: string,
  body: unknown,
  mapSuccess: (payload: Record<string, unknown>) => TSuccess,
): Promise<ApiResult<TSuccess>> {
  if (!API_BASE_URL) {
    return {
      ok: false,
      error: ASSISTED_CONNECTION_ERROR_MESSAGE,
      validationErrors: undefined,
    };
  }

  return apiPostJson(
    `${API_BASE_URL}${path}`,
    body,
    mapSuccess,
    ASSISTED_CONNECTION_ERROR_MESSAGE,
  );
}

/** Public contact form → Next.js Route Handler (Resend). */
export async function submitLead(request: LeadRequest): Promise<ApiResult<LeadResponse>> {
  return apiPostJson(
    "/api/contact",
    {
      name: request.name,
      email: request.email,
      businessName: request.businessName,
      projectIntent: request.projectIntent,
      projectIntentLabel: request.projectIntentLabel,
      sector: request.sector,
      sectorLabel: request.sectorLabel,
      message: request.message ?? "",
      companyUrl: request.companyUrl ?? "",
    },
    (payload) => ({
      leadId: String(payload.leadId ?? ""),
      message: String(payload.message ?? "Mensaje recibido"),
    }),
    CONNECTION_ERROR_MESSAGE,
  );
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
