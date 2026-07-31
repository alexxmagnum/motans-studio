/**
 * Server-side validation + email payload for the public contact form.
 * Used only by app/api/contact — never imported from client components.
 */

import { MS_SITE_IDENTITY } from "./msSiteIdentityFoundation.js";

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
  /** Honeypot — must be empty for real submissions. */
  readonly companyUrl: string;
};

export type ContactFormValidationError = {
  readonly field: string;
  readonly message: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const readString = (body: Record<string, unknown>, key: string): string => {
  const value = body[key];
  return typeof value === "string" ? value : "";
};

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

  if (name.length < 2 || name.length > 120) {
    errors.push({
      field: "name",
      message: "El nombre debe tener entre 2 y 120 caracteres.",
    });
  }

  if (!email) {
    errors.push({ field: "email", message: "El email es obligatorio." });
  } else if (!EMAIL_REGEX.test(email) || email.length > 254) {
    errors.push({ field: "email", message: "Introduce un email válido." });
  }

  if (
    !CONTACT_FORM_ALLOWED_INTENTS.includes(projectIntent as ContactFormIntent)
  ) {
    errors.push({
      field: "projectIntent",
      message: "Selecciona un tipo de proyecto válido.",
    });
  }

  if (payload.businessName.trim().length > 200) {
    errors.push({
      field: "businessName",
      message: "El nombre de empresa es demasiado largo.",
    });
  }

  if (payload.sector.trim().length > 80) {
    errors.push({
      field: "sector",
      message: "El sector no es válido.",
    });
  }

  if (message.length > 500) {
    errors.push({
      field: "message",
      message: "El mensaje no puede superar 500 caracteres.",
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
  const message = payload.message.trim() || "(Sin mensaje)";

  return [
    "Nuevo mensaje de contacto — Motans Studio",
    "",
    `Nombre: ${payload.name.trim()}`,
    `Email: ${payload.email.trim()}`,
    `Empresa: ${business}`,
    `Sector: ${sector}`,
    `Tipo de proyecto: ${project}`,
    `Mensaje:`,
    message,
    "",
    `Fecha y hora: ${submittedAt}`,
  ].join("\n");
}

export function formatContactEmailHtml(input: {
  readonly payload: ContactFormPayload;
  readonly submittedAt: string;
}): string {
  const escape = (value: string): string =>
    value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");

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
  const message = payload.message.trim() || "(Sin mensaje)";

  const row = (label: string, value: string): string =>
    `<tr><td style="padding:6px 12px 6px 0;vertical-align:top;color:#555;white-space:nowrap;"><strong>${escape(label)}</strong></td><td style="padding:6px 0;vertical-align:top;">${escape(value).replaceAll("\n", "<br/>")}</td></tr>`;

  return `<!DOCTYPE html><html><body style="font-family:system-ui,sans-serif;line-height:1.45;color:#111;">
<p style="margin:0 0 16px;"><strong>Nuevo mensaje de contacto — Motans Studio</strong></p>
<table style="border-collapse:collapse;max-width:640px;">
${row("Nombre", payload.name.trim())}
${row("Email", payload.email.trim())}
${row("Empresa", business)}
${row("Sector", sector)}
${row("Tipo de proyecto", project)}
${row("Mensaje", message)}
${row("Fecha y hora", submittedAt)}
</table>
</body></html>`;
}
