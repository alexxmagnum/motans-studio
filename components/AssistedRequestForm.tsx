"use client";

import type React from "react";
import { useState, useCallback } from "react";
import { submitAssistedRequest } from "../lib/apiClient.js";
import { MS_SITE_IDENTITY } from "../lib/msSiteIdentityFoundation.js";

// Assisted Request Form - Connected to real API
// Uses domains/commercial createAssistedRequest via public-commercial API endpoint

type FormStatus = "idle" | "loading" | "success" | "error";

interface AssistedRequestData {
  name: string;
  email: string;
  phone: string;
  businessName: string;
  businessType: string;
  businessLocation: string;
  currentSystem: string;
  preferredPlan: string;
  urgency: string;
  message: string;
}

interface AssistedRequestErrors {
  name?: string;
  email?: string;
  phone?: string;
  businessName?: string;
  businessType?: string;
  businessLocation?: string;
  message?: string;
}

const BUSINESS_TYPES = [
  { value: "", label: "Selecciona tipo de negocio" },
  { value: "bar", label: "Bar" },
  { value: "restaurante", label: "Restaurante" },
  { value: "cafeteria", label: "Cafetería" },
  { value: "pizzeria", label: "Pizzería" },
  { value: "hamburgueseria", label: "Hamburguesería" },
  { value: "tapas", label: "Bar de tapas" },
  { value: "hotel", label: "Hotel con restaurante" },
  { value: "otro", label: "Otro" },
] as const;

const PREFERRED_PLANS = [
  { value: "", label: "No estoy seguro, quiero asesoramiento" },
  { value: "base", label: "MotanOS Base — Entrada operativa" },
  { value: "pro", label: "MotanOS Pro — Crecimiento" },
  { value: "premium", label: "MotanOS Premium — Avanzado" },
] as const;

const URGENCY_OPTIONS = [
  { value: "", label: "Selecciona urgencia" },
  { value: "low", label: "Sin prisa - Explorando opciones" },
  { value: "medium", label: "En los próximos meses" },
  { value: "high", label: "Lo necesito pronto" },
  { value: "asap", label: "Urgente - Ya debería tenerlo" },
] as const;

function validateAssistedRequestForm(data: AssistedRequestData): AssistedRequestErrors {
  const errors: AssistedRequestErrors = {};

  if (!data.name.trim() || data.name.trim().length < 2) {
    errors.name = "El nombre debe tener al menos 2 caracteres";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email.trim() || !emailRegex.test(data.email)) {
    errors.email = "Introduce un email válido";
  }

  const phoneRegex = /^[\d\s\+\-\(\)]{9,}$/;
  if (data.phone && !phoneRegex.test(data.phone)) {
    errors.phone = "Introduce un teléfono válido";
  }

  if (!data.businessName.trim() || data.businessName.trim().length < 2) {
    errors.businessName = "El nombre del negocio es obligatorio";
  }

  if (!data.businessType) {
    errors.businessType = "Selecciona un tipo de negocio";
  }

  if (!data.businessLocation.trim()) {
    errors.businessLocation = "La ubicación es obligatoria (ciudad/barrio)";
  }

  if (data.message.length > 1000) {
    errors.message = "El mensaje no puede exceder 1000 caracteres";
  }

  return errors;
}

interface AssistedRequestFormProps {
  onSuccess?: () => void;
}

export function AssistedRequestForm({ onSuccess }: AssistedRequestFormProps): React.ReactElement {
  const [formData, setFormData] = useState<AssistedRequestData>({
    name: "",
    email: "",
    phone: "",
    businessName: "",
    businessType: "",
    businessLocation: "",
    currentSystem: "",
    preferredPlan: "",
    urgency: "",
    message: "",
  });
  const [errors, setErrors] = useState<AssistedRequestErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const updateField = useCallback(<K extends keyof AssistedRequestData>(field: K, value: AssistedRequestData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error if this field has validation
    if (field in errors && errors[field as keyof AssistedRequestErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }, [errors]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setErrorMessage("");

      const validationErrors = validateAssistedRequestForm(formData);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      setStatus("loading");

      // Call real API endpoint
      const result = await submitAssistedRequest({
        name: formData.name,
        email: formData.email,
        phone: formData.phone !== undefined && formData.phone.length > 0 ? formData.phone : undefined,
        businessName: formData.businessName,
        businessType: formData.businessType,
        businessLocation: formData.businessLocation,
        preferredPlan: formData.preferredPlan !== undefined && formData.preferredPlan.length > 0 ? formData.preferredPlan : undefined,
        urgency: formData.urgency !== undefined && formData.urgency.length > 0 ? formData.urgency : undefined,
        currentSystem: formData.currentSystem !== undefined && formData.currentSystem.length > 0 ? formData.currentSystem : undefined,
        message: formData.message !== undefined && formData.message.length > 0 ? formData.message : undefined,
      });

      if (result.ok) {
        setStatus("success");
        onSuccess?.();
      } else {
        setStatus("error");
        setErrorMessage(result.error);
        // Map validation errors from API to form errors
        if (result.validationErrors) {
          const newErrors: AssistedRequestErrors = {};
          for (const ve of result.validationErrors) {
            if (ve.field in newErrors || ve.field === "name" || ve.field === "email" || ve.field === "businessName" || ve.field === "businessType" || ve.field === "businessLocation" || ve.field === "message") {
              (newErrors as Record<string, string>)[ve.field] = ve.message;
            }
          }
          setErrors(newErrors);
        }
      }
    },
    [formData, onSuccess]
  );

  if (status === "success") {
    return (
      <div
        style={{
          padding: "2rem",
          background: "#f6ffed",
          border: "1px solid #b7eb8f",
          borderRadius: "8px",
          textAlign: "center",
        }}
      >
        <h3 style={{ color: "#389e0d", marginBottom: "0.5rem", fontSize: "1.25rem" }}>
          ¡Solicitud recibida!
        </h3>
        <p style={{ color: "#555", fontSize: "0.875rem", marginBottom: "1rem" }}>
          Gracias {formData.name}. Un equipo de Motans Studio contactará contigo en menos de 24 horas para
          ayudarte a configurar MotanOS en <strong>{formData.businessName}</strong>.
        </p>
        <p style={{ color: "#666", fontSize: "0.75rem" }}>
          Mientras tanto, puedes escribirnos directamente a{" "}
          <strong>{MS_SITE_IDENTITY.email}</strong> o llamarnos al{" "}
          <strong>{MS_SITE_IDENTITY.phone}</strong>.
        </p>
        <button
          onClick={() => {
            setStatus("idle");
            setFormData({
              name: "",
              email: "",
              phone: "",
              businessName: "",
              businessType: "",
              businessLocation: "",
              currentSystem: "",
              preferredPlan: "",
              urgency: "",
              message: "",
            });
          }}
          style={{
            marginTop: "1.5rem",
            padding: "0.5rem 1rem",
            background: "#389e0d",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Enviar otra solicitud
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      {status === "error" && (
        <div
          style={{
            padding: "1rem",
            background: "#fff1f0",
            border: "1px solid #ffccc7",
            borderRadius: "4px",
            marginBottom: "1rem",
            color: "#cf1322",
            fontSize: "0.875rem",
          }}
        >
          {errorMessage ||
            `Hubo un error. Inténtalo de nuevo o contacta directamente con ${MS_SITE_IDENTITY.email}`}
        </div>
      )}

      <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))" }}>
        <div>
          <label htmlFor="req-name" style={{ display: "block", fontSize: "0.875rem", marginBottom: "0.25rem" }}>
            Nombre completo *
          </label>
          <input
            id="req-name"
            type="text"
            value={formData.name}
            onChange={(e) => updateField("name", (e.target as HTMLInputElement).value)}
            disabled={status === "loading"}
            style={{
              width: "100%",
              padding: "0.5rem",
              border: errors.name ? "1px solid #cf1322" : "1px solid #d9d9d9",
              borderRadius: "4px",
              fontSize: "1rem",
            }}
          />
          {errors.name && <span style={{ color: "#cf1322", fontSize: "0.75rem" }}>{errors.name}</span>}
        </div>

        <div>
          <label htmlFor="req-email" style={{ display: "block", fontSize: "0.875rem", marginBottom: "0.25rem" }}>
            Email *
          </label>
          <input
            id="req-email"
            type="email"
            value={formData.email}
            onChange={(e) => updateField("email", (e.target as HTMLInputElement).value)}
            disabled={status === "loading"}
            style={{
              width: "100%",
              padding: "0.5rem",
              border: errors.email ? "1px solid #cf1322" : "1px solid #d9d9d9",
              borderRadius: "4px",
              fontSize: "1rem",
            }}
          />
          {errors.email && <span style={{ color: "#cf1322", fontSize: "0.75rem" }}>{errors.email}</span>}
        </div>

        <div>
          <label htmlFor="req-phone" style={{ display: "block", fontSize: "0.875rem", marginBottom: "0.25rem" }}>
            Teléfono
          </label>
          <input
            id="req-phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => updateField("phone", (e.target as HTMLInputElement).value)}
            disabled={status === "loading"}
            placeholder="+34 600 000 000"
            style={{
              width: "100%",
              padding: "0.5rem",
              border: errors.phone ? "1px solid #cf1322" : "1px solid #d9d9d9",
              borderRadius: "4px",
              fontSize: "1rem",
            }}
          />
          {errors.phone && <span style={{ color: "#cf1322", fontSize: "0.75rem" }}>{errors.phone}</span>}
        </div>

        <div>
          <label htmlFor="req-business" style={{ display: "block", fontSize: "0.875rem", marginBottom: "0.25rem" }}>
            Nombre del negocio *
          </label>
          <input
            id="req-business"
            type="text"
            value={formData.businessName}
            onChange={(e) => updateField("businessName", (e.target as HTMLInputElement).value)}
            disabled={status === "loading"}
            style={{
              width: "100%",
              padding: "0.5rem",
              border: errors.businessName ? "1px solid #cf1322" : "1px solid #d9d9d9",
              borderRadius: "4px",
              fontSize: "1rem",
            }}
          />
          {errors.businessName && <span style={{ color: "#cf1322", fontSize: "0.75rem" }}>{errors.businessName}</span>}
        </div>
      </div>

      <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", marginTop: "1rem" }}>
        <div>
          <label htmlFor="req-type" style={{ display: "block", fontSize: "0.875rem", marginBottom: "0.25rem" }}>
            Tipo de negocio *
          </label>
          <select
            id="req-type"
            value={formData.businessType}
            onChange={(e) => updateField("businessType", (e.target as HTMLSelectElement).value)}
            disabled={status === "loading"}
            style={{
              width: "100%",
              padding: "0.5rem",
              border: errors.businessType ? "1px solid #cf1322" : "1px solid #d9d9d9",
              borderRadius: "4px",
              fontSize: "1rem",
              background: "#fff",
            }}
          >
            {BUSINESS_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
          {errors.businessType && <span style={{ color: "#cf1322", fontSize: "0.75rem" }}>{errors.businessType}</span>}
        </div>

        <div>
          <label htmlFor="req-location" style={{ display: "block", fontSize: "0.875rem", marginBottom: "0.25rem" }}>
            Ubicación (ciudad/barrio) *
          </label>
          <input
            id="req-location"
            type="text"
            value={formData.businessLocation}
            onChange={(e) => updateField("businessLocation", (e.target as HTMLInputElement).value)}
            disabled={status === "loading"}
            placeholder="Ej: Madrid, Salamanca"
            style={{
              width: "100%",
              padding: "0.5rem",
              border: errors.businessLocation ? "1px solid #cf1322" : "1px solid #d9d9d9",
              borderRadius: "4px",
              fontSize: "1rem",
            }}
          />
          {errors.businessLocation && <span style={{ color: "#cf1322", fontSize: "0.75rem" }}>{errors.businessLocation}</span>}
        </div>

        <div>
          <label htmlFor="req-plan" style={{ display: "block", fontSize: "0.875rem", marginBottom: "0.25rem" }}>
            Plan preferido
          </label>
          <select
            id="req-plan"
            value={formData.preferredPlan}
            onChange={(e) => updateField("preferredPlan", (e.target as HTMLSelectElement).value)}
            disabled={status === "loading"}
            style={{
              width: "100%",
              padding: "0.5rem",
              border: "1px solid #d9d9d9",
              borderRadius: "4px",
              fontSize: "1rem",
              background: "#fff",
            }}
          >
            {PREFERRED_PLANS.map((plan) => (
              <option key={plan.value} value={plan.value}>
                {plan.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="req-urgency" style={{ display: "block", fontSize: "0.875rem", marginBottom: "0.25rem" }}>
            Urgencia
          </label>
          <select
            id="req-urgency"
            value={formData.urgency}
            onChange={(e) => updateField("urgency", (e.target as HTMLSelectElement).value)}
            disabled={status === "loading"}
            style={{
              width: "100%",
              padding: "0.5rem",
              border: "1px solid #d9d9d9",
              borderRadius: "4px",
              fontSize: "1rem",
              background: "#fff",
            }}
          >
            {URGENCY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div style={{ marginTop: "1rem" }}>
        <label htmlFor="req-current" style={{ display: "block", fontSize: "0.875rem", marginBottom: "0.25rem" }}>
          ¿Qué sistema usas actualmente? (opcional)
        </label>
        <input
          id="req-current"
          type="text"
          value={formData.currentSystem}
          onChange={(e) => updateField("currentSystem", (e.target as HTMLInputElement).value)}
          disabled={status === "loading"}
          placeholder="Ej: carta de papel, otro software, nada..."
          style={{
            width: "100%",
            padding: "0.5rem",
            border: "1px solid #d9d9d9",
            borderRadius: "4px",
            fontSize: "1rem",
          }}
        />
      </div>

      <div style={{ marginTop: "1rem" }}>
        <label htmlFor="req-message" style={{ display: "block", fontSize: "0.875rem", marginBottom: "0.25rem" }}>
          Cuéntanos más sobre tus necesidades (opcional)
        </label>
        <textarea
          id="req-message"
          value={formData.message}
          onChange={(e) => updateField("message", (e.target as HTMLTextAreaElement).value)}
          disabled={status === "loading"}
          rows={4}
          maxLength={1000}
          placeholder="¿Cuántas mesas tienes? ¿Tienes cocina y barra? ¿Necesitas ayuda con la carta?"
          style={{
            width: "100%",
            padding: "0.5rem",
            border: errors.message ? "1px solid #cf1322" : "1px solid #d9d9d9",
            borderRadius: "4px",
            fontSize: "1rem",
            resize: "vertical",
          }}
        />
        <div style={{ fontSize: "0.75rem", color: "#888", marginTop: "0.25rem" }}>
          {formData.message.length}/1000 caracteres
        </div>
        {errors.message && <span style={{ color: "#cf1322", fontSize: "0.75rem" }}>{errors.message}</span>}
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        style={{
          width: "100%",
          marginTop: "1.5rem",
          padding: "0.75rem",
          background: status === "loading" ? "#ccc" : "#111",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          fontSize: "1rem",
          cursor: status === "loading" ? "not-allowed" : "pointer",
        }}
      >
        {status === "loading" ? "Enviando solicitud..." : "Solicitar configuración asistida"}
      </button>

      <p style={{ fontSize: "0.75rem", color: "#888", marginTop: "1rem", textAlign: "center" }}>
        Al enviar, aceptas que Motans Studio contacte contigo para ayudarte con la configuración. 
        No compartimos tus datos con terceros. No hay compromiso de compra.
      </p>
    </form>
  );
}
