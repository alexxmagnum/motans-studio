import type React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { createMsSitePageMetadata } from "../lib/msSite1703SeoFoundation.js";

export const metadata: Metadata = {
  ...createMsSitePageMetadata("home"),
  title: "Página no encontrada · Motans Studio",
  description: "La página que buscas no existe o se ha movido. Vuelve al inicio de Motans Studio.",
  robots: { index: false, follow: false },
};

/**
 * 404 pública — misma voz Motans Studio (sin inventar producto).
 */
export default function NotFound(): React.ReactElement {
  return (
    <div className="ms-page ms-page--studio-home" style={{ padding: "clamp(4rem, 12vh, 8rem) var(--msh-page-pad-x, 1.75rem)" }}>
      <div style={{ maxWidth: "36rem", margin: "0 auto" }}>
        <p
          style={{
            margin: "0 0 0.75rem",
            fontSize: "0.6875rem",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.42)",
          }}
        >
          Error 404
        </p>
        <h1
          style={{
            margin: "0 0 1rem",
            fontFamily: 'var(--msh-font, Inter, system-ui, sans-serif)',
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: 400,
            lineHeight: 1.15,
            color: "#fff",
          }}
        >
          Esta página no existe.
        </h1>
        <p style={{ margin: "0 0 2rem", fontSize: "1.05rem", lineHeight: 1.55, color: "rgba(255,255,255,0.62)" }}>
          Puede que el enlace esté desactualizado o que la ruta haya cambiado. Vuelve al inicio o hablemos.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.85rem" }}>
          <Link href="/" className="msh-btn msh-btn--cta">
            Inicio
          </Link>
          <Link href="/#contacto" className="msh-btn">
            Hablemos
          </Link>
        </div>
      </div>
    </div>
  );
}
