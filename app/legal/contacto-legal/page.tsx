"use client";

/** Documento eliminado — redirige a Privacidad (contacto de datos). */
import Link from "next/link";
import { useEffect, type ReactElement } from "react";
import { MS_SITE_ROUTES } from "../../../lib/msSite1701Foundation.js";

export default function LegalContactoRedirectPage(): ReactElement {
  useEffect(() => {
    window.location.replace(MS_SITE_ROUTES.legalPrivacidad);
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
        <Link href={MS_SITE_ROUTES.legalPrivacidad}>Ir a Privacidad</Link>
      </p>
    </main>
  );
}
