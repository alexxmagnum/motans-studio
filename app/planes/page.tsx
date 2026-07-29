"use client";

import Link from "next/link";
import { useEffect, type ReactElement } from "react";

/**
 * Fase 0 — Planes MotanOS congelados en superficie pública.
 * Redirect a Motans Studio home.
 */
export default function PlanesFrozenRedirectPage(): ReactElement {
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
        <Link href="/">Ir a Motans Studio</Link>
      </p>
    </main>
  );
}
