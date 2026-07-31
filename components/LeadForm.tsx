"use client";

import type React from "react";
import { useCallback, useRef, useState } from "react";
import { submitLead } from "../lib/apiClient.js";
import {
  CONTACT_MESSAGE_MAX,
  CONTACT_MESSAGE_MIN,
} from "../lib/contactFormLimits.js";
import type { MsSiteUiCopy } from "../lib/msSiteUiI18nFoundation.js";
import {
  isTurnstileConfigured,
  MsContactTurnstile,
} from "./contact/MsContactTurnstile.js";
import { useMsSiteLocale } from "./MsSiteLocaleProvider.js";

type FormStatus = "idle" | "loading" | "success" | "error";

interface LeadFormData {
  name: string;
  email: string;
  businessName: string;
  message: string;
}

interface LeadFormErrors {
  name?: string;
  email?: string;
  message?: string;
  turnstile?: string;
}

const EMAIL_REGEX =
  /^(?=.{1,254}$)(?=.{1,64}@)[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+$/;

function validateName(value: string, ui: MsSiteUiCopy): string | undefined {
  const name = value.trim();
  if (!name || name.length < 2) return ui.formRequiredName;
  if (name.length > 120) return ui.formRequiredName;
  return undefined;
}

function validateEmail(value: string, ui: MsSiteUiCopy): string | undefined {
  const email = value.trim();
  if (!email) return ui.formRequiredEmail;
  if (!EMAIL_REGEX.test(email)) return ui.formInvalidEmail;
  return undefined;
}

function validateMessage(value: string, ui: MsSiteUiCopy): string | undefined {
  const message = value.trim();
  if (message.length < CONTACT_MESSAGE_MIN) return ui.formMessageTooShort;
  if (message.length > CONTACT_MESSAGE_MAX) return ui.formMessageTooLong;
  return undefined;
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
  const liveRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<LeadFormData>({
    name: "",
    email: "",
    businessName: "",
    message: "",
  });
  const [companyUrl, setCompanyUrl] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileReset, setTurnstileReset] = useState(0);
  const [touched, setTouched] = useState<
    Partial<Record<keyof LeadFormErrors, boolean>>
  >({});
  const [errors, setErrors] = useState<LeadFormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const inFlightRef = useRef(false);

  const messageLength = formData.message.trim().length;
  const messageEnough = messageLength >= CONTACT_MESSAGE_MIN;

  const markTouched = (field: keyof LeadFormErrors) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const runFieldValidation = useCallback(
    (field: keyof LeadFormData, next: LeadFormData) => {
      let error: string | undefined;
      if (field === "name") error = validateName(next.name, ui);
      if (field === "email") error = validateEmail(next.email, ui);
      if (field === "message") error = validateMessage(next.message, ui);
      setErrors((prev) => {
        const copy = { ...prev };
        if (field === "name" || field === "email" || field === "message") {
          if (error) copy[field] = error;
          else delete copy[field];
        }
        return copy;
      });
    },
    [ui],
  );

  const updateField = useCallback(
    (field: keyof LeadFormData, value: string) => {
      setFormData((prev) => {
        const next = { ...prev, [field]: value };
        if (touched[field as keyof LeadFormErrors] || field === "message") {
          queueMicrotask(() => runFieldValidation(field, next));
        }
        return next;
      });
    },
    [runFieldValidation, touched],
  );

  const onTurnstileToken = useCallback((token: string) => {
    setTurnstileToken(token);
    setErrors((prev) => {
      if (!prev.turnstile) return prev;
      const copy = { ...prev };
      delete copy.turnstile;
      return copy;
    });
  }, []);

  const onTurnstileExpire = useCallback(() => {
    setTurnstileToken("");
  }, []);

  const validateAll = useCallback((): LeadFormErrors => {
    const next: LeadFormErrors = {};
    const nameErr = validateName(formData.name, ui);
    const emailErr = validateEmail(formData.email, ui);
    const messageErr = validateMessage(formData.message, ui);
    if (nameErr) next.name = nameErr;
    if (emailErr) next.email = emailErr;
    if (messageErr) next.message = messageErr;
    if (isTurnstileConfigured() && !turnstileToken.trim()) {
      next.turnstile = ui.formTurnstileRequired;
    }
    return next;
  }, [formData, turnstileToken, ui]);

  const resetForm = () => {
    inFlightRef.current = false;
    setStatus("idle");
    setFormData({ name: "", email: "", businessName: "", message: "" });
    setCompanyUrl("");
    setTurnstileToken("");
    setTurnstileReset((n) => n + 1);
    setTouched({});
    setErrors({});
    setErrorMessage("");
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setErrorMessage("");

      if (inFlightRef.current || status === "loading") {
        return;
      }

      setTouched({ name: true, email: true, message: true, turnstile: true });

      const validationErrors = validateAll();
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        liveRef.current?.focus();
        return;
      }

      if (companyUrl.trim()) {
        setStatus("success");
        onSuccess?.();
        return;
      }

      inFlightRef.current = true;
      setStatus("loading");

      const result = await submitLead({
        name: formData.name.trim(),
        email: formData.email.trim(),
        businessName:
          formData.businessName.trim() || "Por definir en conversación",
        businessType: "general",
        projectIntent: "other",
        projectIntentLabel: "",
        sector: "",
        sectorLabel: "",
        message: formData.message.trim(),
        companyUrl,
        turnstileToken,
      });

      if (result.ok) {
        setStatus("success");
        onSuccess?.();
      } else {
        inFlightRef.current = false;
        setStatus("error");
        setErrorMessage(result.error);
        setTurnstileReset((n) => n + 1);
        setTurnstileToken("");
        if (result.validationErrors) {
          const newErrors: LeadFormErrors = {};
          for (const ve of result.validationErrors) {
            if (
              ve.field === "name" ||
              ve.field === "email" ||
              ve.field === "message" ||
              ve.field === "turnstile"
            ) {
              newErrors[ve.field] = ve.message;
            }
          }
          setErrors(newErrors);
        }
      }
    },
    [
      companyUrl,
      formData,
      onSuccess,
      status,
      turnstileToken,
      validateAll,
    ],
  );

  if (status === "success") {
    return (
      <div
        className="ms-form ms-form__status ms-form__status--success ms-form-success"
        role="status"
        aria-live="polite"
      >
        <div className="ms-form-success__mark" aria-hidden="true">
          ✓
        </div>
        <h3 className="ms-form__success-title">{ui.formSuccessTitle}</h3>
        <p className="ms-form__success-body">{ui.formSuccessLead}</p>
        <p className="ms-form__success-follow">{ui.formSuccessFollow}</p>
        <button
          type="button"
          className="msh-btn msh-btn--cta ms-form__success-again"
          onClick={resetForm}
        >
          {ui.formSendAnother}
        </button>
      </div>
    );
  }

  const fieldClass = (
    field: keyof LeadFormErrors,
    value = "",
  ): string => {
    if (errors[field]) return "ms-field ms-field--error";
    if (value.trim().length > 0) return "ms-field ms-field--filled";
    return "ms-field";
  };

  const formDisabled = status === "loading";

  return (
    <form
      onSubmit={handleSubmit}
      className={`ms-form ms-form--contact ms-form--contact-v2${isPremium ? " ms-form--premium" : ""}`}
      noValidate
      aria-busy={formDisabled}
    >
      <div
        ref={liveRef}
        className="ms-sr-only"
        tabIndex={-1}
        aria-live="polite"
      >
        {errors.name ||
          errors.email ||
          errors.message ||
          errors.turnstile ||
          errorMessage ||
          ""}
      </div>

      {status === "error" && errorMessage ? (
        <div className="ms-form__status ms-form__status--error" role="alert">
          {errorMessage}
        </div>
      ) : null}

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

      <fieldset disabled={formDisabled} className="ms-form__fieldset">
        <div className="ms-form-grid">
          <div className={fieldClass("name", formData.name)}>
            <label htmlFor="lead-name">{ui.formName}</label>
            <input
              id="lead-name"
              type="text"
              autoComplete="name"
              value={formData.name}
              onChange={(e) => updateField("name", e.target.value)}
              onBlur={() => {
                markTouched("name");
                runFieldValidation("name", formData);
              }}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "lead-name-error" : undefined}
              disabled={formDisabled}
              maxLength={120}
            />
            {errors.name ? (
              <span id="lead-name-error" className="ms-field__error" role="alert">
                {errors.name}
              </span>
            ) : null}
          </div>

          <div className={fieldClass("email", formData.email)}>
            <label htmlFor="lead-email">{ui.formEmail}</label>
            <input
              id="lead-email"
              type="email"
              autoComplete="email"
              inputMode="email"
              value={formData.email}
              onChange={(e) => updateField("email", e.target.value)}
              onBlur={() => {
                markTouched("email");
                runFieldValidation("email", formData);
              }}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "lead-email-error" : undefined}
              disabled={formDisabled}
              maxLength={254}
            />
            {errors.email ? (
              <span id="lead-email-error" className="ms-field__error" role="alert">
                {errors.email}
              </span>
            ) : null}
          </div>
        </div>

        <div
          className={
            formData.businessName.trim()
              ? "ms-field ms-field--filled"
              : "ms-field"
          }
        >
          <label htmlFor="lead-business">{ui.formBusiness}</label>
          <input
            id="lead-business"
            type="text"
            value={formData.businessName}
            onChange={(e) => updateField("businessName", e.target.value)}
            disabled={formDisabled}
            maxLength={200}
            autoComplete="organization"
          />
        </div>

        <div className={`${fieldClass("message", formData.message)} ms-field--project`}>
          <label htmlFor="lead-message">{ui.formMessage}</label>
          <textarea
            id="lead-message"
            value={formData.message}
            onChange={(e) => updateField("message", e.target.value)}
            onBlur={() => {
              markTouched("message");
              runFieldValidation("message", formData);
            }}
            disabled={formDisabled}
            rows={12}
            maxLength={CONTACT_MESSAGE_MAX}
            placeholder={ui.formMessagePlaceholder}
            aria-invalid={Boolean(errors.message)}
            aria-describedby="lead-message-count"
            required
          />
          <div className="ms-form__message-meta" aria-live="polite">
            <span
              id="lead-message-count"
              className={`ms-form__counter${messageEnough ? " is-ready" : ""}`}
            >
              {messageLength} / {CONTACT_MESSAGE_MAX}
            </span>
            {messageEnough ? (
              <span className="ms-form__enough">{ui.formMessageEnough}</span>
            ) : null}
          </div>
          {errors.message ? (
            <span className="ms-field__error" role="alert">
              {errors.message}
            </span>
          ) : null}
        </div>

        <div className="ms-form-section--security">
          <MsContactTurnstile
            onToken={onTurnstileToken}
            onExpire={onTurnstileExpire}
            resetSignal={turnstileReset}
          />
          {errors.turnstile ? (
            <span className="ms-field__error" role="alert">
              {errors.turnstile}
            </span>
          ) : null}
        </div>
      </fieldset>

      <div className="ms-form-section--submit">
        <button
          type="submit"
          className={
            submitVariant === "studio-home"
              ? "msh-btn msh-btn--cta msh-btn--cta-hero-primary msh-btn--submit"
              : "ms-btn ms-btn--primary"
          }
          disabled={formDisabled}
          aria-label={formDisabled ? ui.formSending : ui.formSubmit}
        >
          {formDisabled ? (
            <span className="ms-form__sending">
              <span className="ms-form__spinner" aria-hidden="true" />
              {ui.formSending}
            </span>
          ) : (
            <>
              {ui.formSubmit}
              {submitVariant === "studio-home" ? (
                <span className="msh-btn__arrow" aria-hidden="true">
                  →
                </span>
              ) : null}
            </>
          )}
        </button>
      </div>
    </form>
  );
}
