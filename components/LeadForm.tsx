"use client";

import type React from "react";
import { useState, useCallback, useRef } from "react";
import { submitLead } from "../lib/apiClient.js";
import { MS_SITE_PROJECT_INTENTS, MS_SITE_PROJECT_INTENTS_PUBLIC } from "../lib/msSite1703Foundation.js";
import { useMsSiteLocale } from "./MsSiteLocaleProvider.js";
import type { MsSiteUiCopy } from "../lib/msSiteUiI18nFoundation.js";

type FormStatus = "idle" | "loading" | "success" | "error";

interface LeadFormData {
  name: string;
  email: string;
  projectIntent: string;
  businessName: string;
  message: string;
}

interface LeadFormErrors {
  name?: string;
  email?: string;
  projectIntent?: string;
  businessName?: string;
  message?: string;
}

function validateLeadForm(data: LeadFormData, ui: MsSiteUiCopy): LeadFormErrors {
  const errors: LeadFormErrors = {};
  const name = data.name.trim();
  const email = data.email.trim();

  if (!name || name.length < 2) {
    errors.name = ui.formRequiredName;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    errors.email = ui.formRequiredEmail;
  } else if (!emailRegex.test(email)) {
    errors.email = ui.formInvalidEmail;
  }

  if (!data.projectIntent) {
    errors.projectIntent = ui.formRequiredIntent;
  }

  if (data.message.trim().length > 500) {
    errors.message = ui.formMessageTooLong;
  }

  return errors;
}

interface LeadFormProps {
  onSuccess?: () => void;
  variant?: "default" | "compact" | "premium";
  submitVariant?: "default" | "studio-home";
}

export function LeadForm({
  onSuccess,
  variant = "default",
  submitVariant = "default",
}: LeadFormProps): React.ReactElement {
  const isPremium = variant === "premium";
  const { ui } = useMsSiteLocale();

  const intentOptions = MS_SITE_PROJECT_INTENTS_PUBLIC.map((intent) => ({
    value: intent.value,
    label:
      intent.value === "web-only"
        ? ui.intentWebOnly
        : intent.value === "custom-saas"
          ? ui.intentCustomSaas
          : intent.value === "automation"
            ? ui.intentAutomation
            : intent.value === "other"
              ? ui.intentOther
              : intent.label,
  }));

  const sectorOptions = [
    { value: "", label: ui.sectorOptional },
    { value: "hosteleria", label: ui.sectorHospitality },
    { value: "retail", label: ui.sectorRetail },
    { value: "servicios", label: ui.sectorServices },
    { value: "otro", label: ui.sectorOther },
  ] as const;

  const [formData, setFormData] = useState<LeadFormData>({
    name: "",
    email: "",
    projectIntent: "",
    businessName: "",
    message: "",
  });
  const [sector, setSector] = useState("");
  /** Honeypot — bots lo rellenan; humanos no lo ven. */
  const [companyUrl, setCompanyUrl] = useState("");
  const [errors, setErrors] = useState<LeadFormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const inFlightRef = useRef(false);

  const updateField = useCallback(
    (field: keyof LeadFormData, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    },
    [errors],
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setErrorMessage("");

      if (inFlightRef.current || status === "loading") {
        return;
      }

      const validationErrors = validateLeadForm(formData, ui);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      // Bot filled the honeypot — fake success, no API call
      if (companyUrl.trim()) {
        setStatus("success");
        onSuccess?.();
        return;
      }

      inFlightRef.current = true;
      setStatus("loading");

      const intentLabel =
        intentOptions.find((i) => i.value === formData.projectIntent)?.label ??
        MS_SITE_PROJECT_INTENTS.find((i) => i.value === formData.projectIntent)?.label ??
        formData.projectIntent;

      const messageParts = [
        `[Proyecto: ${intentLabel}]`,
        sector ? `[Sector: ${sector}]` : "",
        formData.message.trim(),
      ].filter(Boolean);

      const result = await submitLead({
        name: formData.name.trim(),
        email: formData.email.trim(),
        businessName: formData.businessName.trim() || "Por definir en conversación",
        businessType: sector || "general",
        message: messageParts.join("\n"),
      });

      if (result.ok) {
        setStatus("success");
        onSuccess?.();
      } else {
        inFlightRef.current = false;
        setStatus("error");
        setErrorMessage(result.error);
        if (result.validationErrors) {
          const newErrors: LeadFormErrors = {};
          for (const ve of result.validationErrors) {
            if (
              ve.field === "name" ||
              ve.field === "email" ||
              ve.field === "businessName" ||
              ve.field === "businessType" ||
              ve.field === "message"
            ) {
              (newErrors as Record<string, string>)[ve.field] = ve.message;
            }
          }
          setErrors(newErrors);
        }
      }
    },
    [companyUrl, formData, intentOptions, onSuccess, sector, status, ui],
  );

  if (status === "success") {
    return (
      <div className="ms-form ms-form__status ms-form__status--success" role="status">
        <h3 className="ms-form__success-title">{ui.formSuccessTitle}</h3>
        <p className="ms-form__success-body">
          {ui.formSuccessBody.replace("{name}", formData.name).replace("{email}", formData.email)}
        </p>
        <button
          type="button"
          className="msh-btn msh-btn--cta ms-form__success-again"
          onClick={() => {
            inFlightRef.current = false;
            setStatus("idle");
            setFormData({
              name: "",
              email: "",
              projectIntent: "",
              businessName: "",
              message: "",
            });
            setSector("");
            setCompanyUrl("");
          }}
        >
          {ui.formSendAnother}
        </button>
      </div>
    );
  }

  const fieldClass = (field: keyof LeadFormErrors) =>
    errors[field] ? "ms-field ms-field--error" : "ms-field";

  return (
    <form onSubmit={handleSubmit} className={`ms-form${isPremium ? " ms-form--premium" : ""}`} noValidate>
      {status === "error" && (
        <div className="ms-form__status ms-form__status--error" role="alert">
          {errorMessage || ui.formErrorGeneric}
        </div>
      )}

      {/* Honeypot: oculto visualmente; no anunciado a AT para no confundir. */}
      <div className="ms-sr-only" aria-hidden="true">
        <label htmlFor="lead-company-url">Company website</label>
        <input
          id="lead-company-url"
          type="text"
          name="company_url"
          value={companyUrl}
          onChange={(e) => setCompanyUrl(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <fieldset className={fieldClass("projectIntent")}>
        <legend className={isPremium ? "ms-form__legend" : undefined}>
          {ui.formWhatLooking}
        </legend>
        <div className="ms-intents" role="radiogroup" aria-required="true">
          {intentOptions.map((intent) => (
            <label key={intent.value} className="ms-intent">
              <input
                type="radio"
                name="projectIntent"
                value={intent.value}
                checked={formData.projectIntent === intent.value}
                onChange={() => updateField("projectIntent", intent.value)}
                disabled={status === "loading"}
              />
              {intent.label}
            </label>
          ))}
        </div>
        {errors.projectIntent && (
          <span className="ms-field__error">{errors.projectIntent}</span>
        )}
      </fieldset>

      <div className={fieldClass("name")}>
        <label htmlFor="lead-name">{ui.formName}</label>
        <input
          id="lead-name"
          type="text"
          autoComplete="name"
          value={formData.name}
          onChange={(e) => updateField("name", e.target.value)}
          disabled={status === "loading"}
        />
        {errors.name && <span className="ms-field__error">{errors.name}</span>}
      </div>

      <div className={fieldClass("email")}>
        <label htmlFor="lead-email">{ui.formEmail}</label>
        <input
          id="lead-email"
          type="email"
          autoComplete="email"
          inputMode="email"
          value={formData.email}
          onChange={(e) => updateField("email", e.target.value)}
          disabled={status === "loading"}
        />
        {errors.email && <span className="ms-field__error">{errors.email}</span>}
      </div>

      {isPremium && (
        <div className="ms-field">
          <label htmlFor="lead-business">{ui.formBusiness}</label>
          <input
            id="lead-business"
            type="text"
            value={formData.businessName}
            onChange={(e) => updateField("businessName", e.target.value)}
            disabled={status === "loading"}
          />
        </div>
      )}

      {isPremium && (
        <div className="ms-field">
          <label htmlFor="lead-sector">{ui.formSector}</label>
          <select
            id="lead-sector"
            value={sector}
            onChange={(e) => setSector(e.target.value)}
            disabled={status === "loading"}
          >
            {sectorOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className={fieldClass("message")}>
        <label htmlFor="lead-message">{ui.formMessage}</label>
        <textarea
          id="lead-message"
          value={formData.message}
          onChange={(e) => updateField("message", e.target.value)}
          disabled={status === "loading"}
          rows={isPremium ? 4 : 3}
          maxLength={500}
          placeholder={ui.formMessagePlaceholder}
        />
        {errors.message && <span className="ms-field__error">{errors.message}</span>}
      </div>

      <button
        type="submit"
        className={
          submitVariant === "studio-home"
            ? "msh-btn msh-btn--cta msh-btn--cta-hero-primary msh-btn--submit"
            : "ms-btn ms-btn--primary"
        }
        disabled={status === "loading"}
      >
        {status === "loading" ? ui.formSending : ui.formSubmit}
        {submitVariant === "studio-home" && status !== "loading" ? (
          <span className="msh-btn__arrow" aria-hidden="true">
            →
          </span>
        ) : null}
      </button>
    </form>
  );
}
