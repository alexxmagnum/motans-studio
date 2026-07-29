"use client";

/**
 * /legal ya no es un hub de «Información legal».
 * Redirige al Aviso legal.
 */
import Link from "next/link";
import { useEffect, type ReactElement } from "react";
import { MS_SITE_ROUTES } from "../../lib/msSite1701Foundation.js";

export default function LegalHubRedirectPage(): ReactElement {
  useEffect(() => {
    window.location.replace(MS_SITE_ROUTES.legalAviso);
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
        <Link href={MS_SITE_ROUTES.legalAviso}>Ir al Aviso legal</Link>
      </p>
    </main>
  );
}
