import type { Metadata } from "next";
import type { ReactNode } from "react";

/** Ruta congelada — no indexar; la landing canónica es `/`. */
export const metadata: Metadata = {
  robots: { index: false, follow: true },
  alternates: { canonical: "/" },
};

export default function PlanesFrozenLayout({
  children,
}: Readonly<{ children: ReactNode }>): ReactNode {
  return children;
}
