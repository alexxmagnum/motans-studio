import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  CONTACT_FORM_TO_EMAIL,
  formatContactEmailHtml,
  formatContactEmailText,
  parseContactFormBody,
  validateContactFormPayload,
} from "../../../lib/contactFormServer.js";

export const runtime = "nodejs";

const JSON_HEADERS = {
  "Cache-Control": "no-store",
} as const;

type JsonBody = Record<string, unknown>;

function json(status: number, body: JsonBody): NextResponse {
  return NextResponse.json(body, { status, headers: JSON_HEADERS });
}

function resolveFromAddress(): string {
  const configured = process.env.RESEND_FROM_EMAIL?.trim();
  if (configured) {
    return configured;
  }
  // Resend test sender — replace with a verified domain address in production.
  return "Motans Studio <onboarding@resend.dev>";
}

export async function POST(request: Request): Promise<NextResponse> {
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

  const payload = parseContactFormBody(raw);
  if (payload === null) {
    return json(400, {
      success: false,
      message: "Cuerpo de la solicitud inválido.",
      validationErrors: undefined,
    });
  }

  // Honeypot filled — pretend success without sending mail.
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

  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    return json(503, {
      success: false,
      message: `El servicio de contacto no está disponible todavía. Escríbenos a ${CONTACT_FORM_TO_EMAIL}.`,
      validationErrors: undefined,
    });
  }

  const submittedAt = new Date().toISOString();
  const submittedAtLocal = new Intl.DateTimeFormat("es-ES", {
    dateStyle: "full",
    timeStyle: "medium",
    timeZone: "Europe/Madrid",
  }).format(new Date(submittedAt));

  const resend = new Resend(apiKey);
  const replyTo = payload.email.trim();
  const subjectName = payload.name.trim();

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
