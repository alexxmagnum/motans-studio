import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  CONTACT_FORM_TO_EMAIL,
  formatContactEmailHtml,
  formatContactEmailText,
  parseContactFormBody,
  sanitizeContactFormPayload,
  sanitizeHeaderSafe,
  validateContactFormPayload,
} from "../../../lib/contactFormServer.js";
import {
  getClientIpFromRequest,
  isContactRateLimited,
  verifyTurnstileToken,
} from "../../../lib/contactFormSecurity.js";

export const runtime = "nodejs";

const JSON_HEADERS = {
  "Cache-Control": "no-store",
} as const;

type JsonBody = Record<string, unknown>;

function json(status: number, body: JsonBody): NextResponse {
  return NextResponse.json(body, { status, headers: JSON_HEADERS });
}

function resolveFromAddress(): string {
  // Production: set RESEND_FROM_EMAIL=Motans Studio <info@motansstudio.com>
  // (domain verified in Resend). See docs/BRANDING.md.
  const configured = process.env.RESEND_FROM_EMAIL?.trim();
  if (configured) {
    return configured;
  }
  // Local/dev only — Resend onboarding sender. Not Motans Studio production branding.
  return "Motans Studio <onboarding@resend.dev>";
}

export async function POST(request: Request): Promise<NextResponse> {
  const ip = getClientIpFromRequest(request);

  if (isContactRateLimited(ip)) {
    return json(429, {
      success: false,
      message:
        "Has enviado demasiadas solicitudes. Inténtalo de nuevo más tarde.",
      validationErrors: undefined,
    });
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return json(400, {
      success: false,
      message: "Cuerpo de la solicitud inválido.",
      validationErrors: undefined,
    });
  }

  const parsed = parseContactFormBody(raw);
  if (parsed === null) {
    return json(400, {
      success: false,
      message: "Cuerpo de la solicitud inválido.",
      validationErrors: undefined,
    });
  }

  const payload = sanitizeContactFormPayload(parsed);

  if (payload.companyUrl.trim().length > 0) {
    return json(200, {
      success: true,
      leadId: `hp_${Date.now().toString(36)}`,
      message: "Mensaje recibido.",
    });
  }

  const validationErrors = validateContactFormPayload(payload);
  if (validationErrors.length > 0) {
    return json(400, {
      success: false,
      message: "Hay errores de validación.",
      validationErrors,
    });
  }

  const turnstileOk = await verifyTurnstileToken({
    token: payload.turnstileToken,
    ip,
  });
  if (!turnstileOk) {
    return json(400, {
      success: false,
      message: "No pudimos verificar que eres humano. Recarga e inténtalo de nuevo.",
      validationErrors: [
        { field: "turnstile", message: "Verificación de seguridad requerida." },
      ],
    });
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    return json(503, {
      success: false,
      message: `El servicio de contacto no está disponible todavía. Escríbenos a ${CONTACT_FORM_TO_EMAIL}.`,
      validationErrors: undefined,
    });
  }

  const submittedAtLocal = new Intl.DateTimeFormat("es-ES", {
    dateStyle: "full",
    timeStyle: "medium",
    timeZone: "Europe/Madrid",
  }).format(new Date());

  const resend = new Resend(apiKey);
  const replyTo = payload.email;
  const subjectName = sanitizeHeaderSafe(payload.name, 80);

  try {
    const result = await resend.emails.send({
      from: resolveFromAddress(),
      to: [CONTACT_FORM_TO_EMAIL],
      replyTo,
      subject: `Contacto Motans Studio — ${subjectName}`,
      text: formatContactEmailText({
        payload,
        submittedAt: submittedAtLocal,
      }),
      html: formatContactEmailHtml({
        payload,
        submittedAt: submittedAtLocal,
      }),
    });

    if (result.error) {
      console.error("[contact] Resend error:", result.error.message);
      return json(502, {
        success: false,
        message: `No se pudo enviar el mensaje. Inténtalo de nuevo o escríbenos a ${CONTACT_FORM_TO_EMAIL}.`,
        validationErrors: undefined,
      });
    }

    const leadId =
      typeof result.data?.id === "string" && result.data.id.length > 0
        ? result.data.id
        : `contact_${Date.now().toString(36)}`;

    return json(200, {
      success: true,
      leadId,
      message: "Mensaje recibido. Te contactaremos pronto.",
    });
  } catch (error) {
    console.error("[contact] Unexpected send failure:", error);
    return json(502, {
      success: false,
      message: `Error de conexión. Inténtalo de nuevo o escríbenos a ${CONTACT_FORM_TO_EMAIL}.`,
      validationErrors: undefined,
    });
  }
}

export async function GET(): Promise<NextResponse> {
  return json(405, {
    success: false,
    message: "Método no permitido.",
    validationErrors: undefined,
  });
}
