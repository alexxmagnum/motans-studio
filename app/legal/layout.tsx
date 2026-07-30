import type { Metadata } from "next";
import type { ReactNode } from "react";

/**
 * Hub y stubs legales redirect — no indexar.
 * Las fichas indexables (`aviso-legal`, `privacidad`, `cookies`, `condiciones`)
 * sobrescriben robots/canonical vía `createMsSitePageMetadata`.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: true },
  alternates: { canonical: "/" },
};

export default function LegalSectionLayout({
  children,
}: Readonly<{ children: ReactNode }>): ReactNode {
  return children;
}
