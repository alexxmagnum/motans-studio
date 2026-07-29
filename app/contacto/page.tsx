"use client";

/**
 * Fase 1 — /contacto ya no es experiencia separada.
 * Redirect al ancla de la landing única.
 */
import { useEffect, type ReactElement } from "react";

export default function ContactoLandingRedirectPage(): ReactElement {
  useEffect(() => {
    window.location.replace("/#contacto");
  }, []);

  return (
    <main
      className="ms-page"
      style={{
        minHeight: "50vh",
        display: "grid",
        placeItems: "center",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <p>
        <a href="/#contacto">Ir a Contacto</a>
      </p>
    </main>
  );
}
