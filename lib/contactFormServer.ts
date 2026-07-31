/**
 * Server-side validation, sanitization and email payload for public contact.
 */

import { MS_SITE_IDENTITY } from "./msSiteIdentityFoundation.js";
import {
  CONTACT_ALLOWED_SECTORS,
  CONTACT_BUSINESS_MAX,
  CONTACT_EMAIL_MAX,
  CONTACT_LABEL_MAX,
  CONTACT_MESSAGE_MAX,
  CONTACT_MESSAGE_MIN,
  CONTACT_NAME_MAX,
  CONTACT_SECTOR_MAX,
  type ContactAllowedSector,
} from "./contactFormLimits.js";

export const CONTACT_FORM_TO_EMAIL = MS_SITE_IDENTITY.email;

export const CONTACT_FORM_ALLOWED_INTENTS = [
  "web-only",
  "custom-saas",
  "automation",
  "other",
] as const;

export type ContactFormIntent = (typeof CONTACT_FORM_ALLOWED_INTENTS)[number];

export type ContactFormPayload = {
  readonly name: string;
  readonly email: string;
  readonly businessName: string;
  readonly projectIntent: string;
  readonly projectIntentLabel: string;
  readonly sector: string;
  readonly sectorLabel: string;
  readonly message: string;
  readonly companyUrl: string;
  readonly turnstileToken: string;
};

export type ContactFormValidationError = {
  readonly field: string;
  readonly message: string;
};

/** Robust email check (shape + length; no disposable-list dependency). */
const EMAIL_REGEX =
  /^(?=.{1,254}$)(?=.{1,64}@)[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+$/;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const readString = (body: Record<string, unknown>, key: string): string => {
  const value = body[key];
  return typeof value === "string" ? value : "";
};

/** Strip control chars / CR-LF (header injection) and normalize whitespace. */
export function sanitizePlainText(value: string, maxLength: number): string {
  const cleaned = value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .replace(/\r\n?/g, "\n")
    .replace(/[^\S\n]+/g, " ")
    .trim();
  return cleaned.slice(0, maxLength);
}

/** Single-line field safe for email Subject / Reply-To display. */
export function sanitizeHeaderSafe(value: string, maxLength: number): string {
  return sanitizePlainText(value, maxLength)
    .replace(/\n+/g, " ")
    .replace(/[\u2028\u2029]/g, " ")
    .trim();
}

export function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function parseContactFormBody(raw: unknown): ContactFormPayload | null {
  if (!isRecord(raw)) {
    return null;
  }
  return {
    name: readString(raw, "name"),
    email: readString(raw, "email"),
    businessName: readString(raw, "businessName"),
    projectIntent: readString(raw, "projectIntent"),
    projectIntentLabel: readString(raw, "projectIntentLabel"),
    sector: readString(raw, "sector"),
    sectorLabel: readString(raw, "sectorLabel"),
    message: readString(raw, "message"),
    companyUrl: readString(raw, "companyUrl"),
    turnstileToken: readString(raw, "turnstileToken"),
  };
}

export function sanitizeContactFormPayload(
  payload: ContactFormPayload,
): ContactFormPayload {
  return {
    name: sanitizeHeaderSafe(payload.name, CONTACT_NAME_MAX),
    email: sanitizeHeaderSafe(payload.email, CONTACT_EMAIL_MAX).toLowerCase(),
    businessName: sanitizePlainText(payload.businessName, CONTACT_BUSINESS_MAX),
    projectIntent:
      sanitizeHeaderSafe(payload.projectIntent, 40) || "other",
    projectIntentLabel: sanitizeHeaderSafe(
      payload.projectIntentLabel,
      CONTACT_LABEL_MAX,
    ),
    sector: sanitizeHeaderSafe(payload.sector, CONTACT_SECTOR_MAX),
    sectorLabel: sanitizeHeaderSafe(payload.sectorLabel, CONTACT_LABEL_MAX),
    message: sanitizePlainText(payload.message, CONTACT_MESSAGE_MAX),
    companyUrl: payload.companyUrl.slice(0, 500),
    turnstileToken: payload.turnstileToken.trim().slice(0, 2048),
  };
}

export function validateContactFormPayload(
  payload: ContactFormPayload,
): ContactFormValidationError[] {
  const errors: ContactFormValidationError[] = [];
  const name = payload.name.trim();
  const email = payload.email.trim();
  const message = payload.message.trim();
  const projectIntent = payload.projectIntent.trim();
  const sector = payload.sector.trim();

  if (name.length < 2 || name.length > CONTACT_NAME_MAX) {
    errors.push({
      field: "name",
      message: "El nombre debe tener entre 2 y 120 caracteres.",
    });
  }

  if (!email) {
    errors.push({ field: "email", message: "El email es obligatorio." });
  } else if (!EMAIL_REGEX.test(email)) {
    errors.push({ field: "email", message: "Introduce un email válido." });
  }

  if (
    projectIntent &&
    !CONTACT_FORM_ALLOWED_INTENTS.includes(projectIntent as ContactFormIntent)
  ) {
    errors.push({
      field: "projectIntent",
      message: "Selecciona un tipo de proyecto válido.",
    });
  }

  if (payload.projectIntentLabel.trim().length > CONTACT_LABEL_MAX) {
    errors.push({
      field: "projectIntent",
      message: "Tipo de proyecto no válido.",
    });
  }

  if (payload.businessName.trim().length > CONTACT_BUSINESS_MAX) {
    errors.push({
      field: "businessName",
      message: "El nombre de empresa es demasiado largo.",
    });
  }

  if (
    sector &&
    (!CONTACT_ALLOWED_SECTORS.includes(sector as ContactAllowedSector) ||
      payload.sectorLabel.trim().length > CONTACT_LABEL_MAX)
  ) {
    errors.push({
      field: "sector",
      message: "El sector no es válido.",
    });
  }

  if (message.length < CONTACT_MESSAGE_MIN) {
    errors.push({
      field: "message",
      message: `Cuéntanos un poco más (mínimo ${CONTACT_MESSAGE_MIN} caracteres).`,
    });
  } else if (message.length > CONTACT_MESSAGE_MAX) {
    errors.push({
      field: "message",
      message: `El proyecto no puede superar ${CONTACT_MESSAGE_MAX} caracteres.`,
    });
  }

  return errors;
}

export function formatContactEmailText(input: {
  readonly payload: ContactFormPayload;
  readonly submittedAt: string;
}): string {
  const { payload, submittedAt } = input;
  const business =
    payload.businessName.trim() || "Por definir en conversación";
  const sector =
    payload.sectorLabel.trim() ||
    payload.sector.trim() ||
    "No indicado";
  const project =
    payload.projectIntentLabel.trim() ||
    payload.projectIntent.trim() ||
    "No indicado";

  const lines = [
    "Nuevo mensaje de contacto — Motans Studio",
    "",
    `Nombre: ${payload.name.trim()}`,
    `Email: ${payload.email.trim()}`,
    `Empresa: ${business}`,
  ];
  if (sector !== "No indicado") {
    lines.push(`Sector: ${sector}`);
  }
  if (project !== "No indicado" && project !== "other") {
    lines.push(`Tipo de proyecto: ${project}`);
  }
  lines.push("Mensaje:", payload.message.trim(), "", `Fecha y hora: ${submittedAt}`);
  return lines.join("\n");
}

export function formatContactEmailHtml(input: {
  readonly payload: ContactFormPayload;
  readonly submittedAt: string;
}): string {
  const { payload, submittedAt } = input;
  const business =
    payload.businessName.trim() || "Por definir en conversación";
  const sector =
    payload.sectorLabel.trim() ||
    payload.sector.trim() ||
    "No indicado";
  const project =
    payload.projectIntentLabel.trim() ||
    payload.projectIntent.trim() ||
    "No indicado";

  const row = (label: string, value: string): string =>
    `<tr><td style="padding:6px 12px 6px 0;vertical-align:top;color:#555;white-space:nowrap;"><strong>${escapeHtml(label)}</strong></td><td style="padding:6px 0;vertical-align:top;">${escapeHtml(value).replaceAll("\n", "<br/>")}</td></tr>`;

  const optionalRows = [
    sector !== "No indicado" ? row("Sector", sector) : "",
    project !== "No indicado" && project !== "other"
      ? row("Tipo de proyecto", project)
      : "",
  ].join("");

  return `<!DOCTYPE html><html><body style="font-family:system-ui,sans-serif;line-height:1.45;color:#111;">
<p style="margin:0 0 16px;"><strong>Nuevo mensaje de contacto — Motans Studio</strong></p>
<table style="border-collapse:collapse;max-width:640px;">
${row("Nombre", payload.name.trim())}
${row("Email", payload.email.trim())}
${row("Empresa", business)}
${optionalRows}
${row("Mensaje", payload.message.trim())}
${row("Fecha y hora", submittedAt)}
</table>
</body></html>`;
}
