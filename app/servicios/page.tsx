"use client";

/**
 * Fase 1 — /servicios ya no es experiencia separada.
 * Redirect al ancla de la landing única.
 */
import { useEffect, type ReactElement } from "react";

export default function ServiciosLandingRedirectPage(): ReactElement {
  useEffect(() => {
    window.location.replace("/#servicios");
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
        <a href="/#servicios">Ir a Qué hacemos</a>
      </p>
    </main>
  );
}
