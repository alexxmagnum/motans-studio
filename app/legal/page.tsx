import type React from "react";
import type { Metadata } from "next";
import { createMsSitePageMetadata } from "../../lib/msSite1703SeoFoundation.js";

export const metadata: Metadata = createMsSitePageMetadata("legal");

export default function LegalPage(): React.ReactElement {
  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "2rem 1rem",
        lineHeight: 1.6,
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "2rem" }}>Información legal</h1>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1.25rem", marginBottom: "1rem" }}>Datos de contacto</h2>
        <p style={{ color: "#444" }}>
          <strong>Motans Studio</strong>
        </p>
        <p style={{ color: "#666" }}>
          Email: info@motans.studio
        </p>
        <p style={{ color: "#666" }}>
          España — Mercado activo
        </p>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1.25rem", marginBottom: "1rem" }}>Privacidad</h2>
        <p style={{ color: "#444" }}>
          Los datos que nos proporcionas a través de los formularios de contacto son utilizados 
          únicamente para responder a tu solicitud y, en su caso, configurar MotanOS en tu negocio.
        </p>
        <ul style={{ color: "#666", marginTop: "0.5rem", paddingLeft: "1.5rem" }}>
          <li>No compartimos tus datos con terceros.</li>
          <li>No utilizamos tus datos para marketing sin tu consentimiento.</li>
          <li>Conservamos tus datos solo el tiempo necesario para la relación comercial.</li>
        </ul>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1.25rem", marginBottom: "1rem" }}>Cookies</h2>
        <p style={{ color: "#444" }}>
          Este sitio no utiliza cookies de seguimiento ni analíticas. 
          Solo utiliza cookies técnicas necesarias para el funcionamiento del sitio.
        </p>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1.25rem", marginBottom: "1rem" }}>Términos de uso</h2>
        <p style={{ color: "#444" }}>
          El contenido de este sitio es informativo. Los planes, precios y disponibilidad 
          mostrados son orientativos y pueden variar. Para contratar MotanOS, contacta directamente 
          con Motans Studio.
        </p>
        <p style={{ color: "#666", marginTop: "0.5rem" }}>
          Este sitio no crea cuentas reales ni procesa pagos. Es una vitrina comercial 
          para captar leads y solicitudes asistidas.
        </p>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1.25rem", marginBottom: "1rem" }}>Propiedad intelectual</h2>
        <p style={{ color: "#444" }}>
          MotanOS, el logo de MotanOS y Motans Studio son marcas registradas. 
          Todo el contenido de este sitio está protegido por derechos de autor.
        </p>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1.25rem", marginBottom: "1rem" }}>Limitación de responsabilidad</h2>
        <p style={{ color: "#666", fontSize: "0.875rem" }}>
          Motans Studio no se hace responsable de decisiones comerciales tomadas basándose 
          únicamente en la información de este sitio. Los precios y condiciones finales 
          se establecen en contrato directo con el cliente.
        </p>
      </section>

      <div
        style={{
          padding: "1rem",
          background: "#fffbe6",
          border: "1px solid #ffe58f",
          borderRadius: "4px",
          fontSize: "0.875rem",
          color: "#614700",
          marginTop: "2rem",
        }}
      >
        <strong>Nota importante:</strong> Esta página legal es una versión básica. 
        Motans Studio debe revisar y completar esta información con asesoramiento legal 
        antes de activar el site comercial de forma productiva.
      </div>

    </div>
  );
}
