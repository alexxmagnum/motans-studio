"use client";

import { useEffect, type ReactElement } from "react";

/**
 * Fase 0 — MotanOS Hostelería congelado en superficie pública.
 * Redirect a Motans Studio home.
 */
export default function MotanOSHosteleriaFrozenRedirectPage(): ReactElement {
  useEffect(() => {
    window.location.replace("/");
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
        <a href="/">Ir a Motans Studio</a>
      </p>
    </main>
  );
}
