import type React from "react";
import type { Metadata } from "next";
import { AssistedRequestForm } from "../../components/AssistedRequestForm.js";
import { createMsSitePageMetadata } from "../../lib/msSite1703SeoFoundation.js";

export const metadata: Metadata = createMsSitePageMetadata("solicitud");

export default function SolicitudPage(): React.ReactElement {
  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "2rem 1rem",
        lineHeight: 1.6,
      }}
    >
      {/* Header */}
      <section style={{ textAlign: "center", padding: "2rem 0" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "1rem" }}>
          Motans Studio te lo configura
        </h1>
        <p style={{ color: "#444", maxWidth: "600px", margin: "0 auto", fontSize: "1.125rem" }}>
          ¿No tienes tiempo para configurar todo? Déjanos tus datos y un equipo especializado contactará 
          contigo para ayudarte a poner en marcha MotanOS en tu negocio.
        </p>
        <p style={{ color: "#389e0d", fontSize: "0.875rem", marginTop: "1rem" }}>
          ✓ Respuesta en menos de 24 horas
        </p>
      </section>

      {/* Formulario */}
      <section
        style={{
          padding: "2rem",
          background: "#f9f9f9",
          borderRadius: "8px",
          border: "1px solid #eee",
        }}
      >
        <AssistedRequestForm />
      </section>

      {/* Info adicional */}
      <section style={{ padding: "2rem 0", textAlign: "center" }}>
        <h2 style={{ fontSize: "1.25rem", marginBottom: "1rem" }}>¿Qué incluye la configuración asistida?</h2>
        <div
          style={{
            display: "grid",
            gap: "1rem",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            textAlign: "left",
          }}
        >
          <div style={{ padding: "1rem" }}>
            <h3 style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>📋 Análisis inicial</h3>
            <p style={{ color: "#666", fontSize: "0.875rem" }}>
              Entendemos tu negocio, tus necesidades y qué plan se adapta mejor.
            </p>
          </div>
          <div style={{ padding: "1rem" }}>
            <h3 style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>🍽️ Configuración de carta</h3>
            <p style={{ color: "#666", fontSize: "0.875rem" }}>
              Ayudamos a estructurar tu carta, categorías y productos iniciales.
            </p>
          </div>
          <div style={{ padding: "1rem" }}>
            <h3 style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>🪑 Mesas y zonas</h3>
            <p style={{ color: "#666", fontSize: "0.875rem" }}>
              Configuramos tu distribución de mesas y generamos los QR de acceso.
            </p>
          </div>
          <div style={{ padding: "1rem" }}>
            <h3 style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>👥 Usuarios y permisos</h3>
            <p style={{ color: "#666", fontSize: "0.875rem" }}>
              Creamos usuarios para tu staff con los permisos adecuados.
            </p>
          </div>
        </div>
      </section>

      {/* Nota */}
      <section style={{ padding: "1rem 0" }}>
        <div
          style={{
            padding: "1rem",
            background: "#fffbe6",
            border: "1px solid #ffe58f",
            borderRadius: "4px",
            fontSize: "0.75rem",
            color: "#614700",
          }}
        >
          <strong>Nota:</strong> La configuración asistida es un servicio de onboarding inicial. 
          No incluye modificaciones continuas ni soporte de diseño gráfico. 
          Para cambios posteriores, tendrás acceso al panel de MotanOS para gestionarlos tú mismo 
          o contratar soporte adicional.
        </div>
      </section>

      {/* CTA alternativo */}
      <section style={{ padding: "2rem 0", textAlign: "center", borderTop: "1px solid #eee" }}>
        <p style={{ color: "#666", marginBottom: "1rem" }}>
          ¿Prefieres explorar tú mismo?
        </p>
        <a
          href="/planes"
          style={{
            display: "inline-block",
            padding: "0.75rem 1.5rem",
            background: "transparent",
            color: "#111",
            textDecoration: "none",
            border: "2px solid #111",
            borderRadius: "4px",
            fontWeight: 500,
          }}
        >
          Ver planes de MotanOS
        </a>
      </section>
    </div>
  );
}
