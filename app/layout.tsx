import type React from "react";
import type { Metadata, Viewport } from "next";
import { MotansStudioSiteShell } from "../components/MotansStudioSiteShell.js";
import { MsSitePageBackLink } from "../components/MsSitePageBackLink.js";
import { MsSiteMotanosLangStyles } from "../components/MsSiteMotanosLangStyles.js";
import { createMsSitePageMetadata } from "../lib/msSite1703SeoFoundation.js";
import "./msSite1703Global.css";
import "./msSite1703Obsessive.css";
import "./msSiteDarkPremium.css";
import "./msStudioHome.css";
import "./msStudioFactory.css";
import "./msStudioOffer.css";
import "./msSiteHomeSplash.css";
import "./msStudioServices.css";
import "./msStudioStampSplash.css";
/* Experience last — otherwise splash.css wins on video size */
import "./msStudioHeroExperience.css";
/* Kill-switch móvil: anula caps desktop que filtraban a phone */
import "./msStudioHeroMobileFix.css";
/* Fase 6 — confianza / legales / footer (después del home para no pisar hero) */
import "./msSiteConsent.css";
import "./msStudioFooter.css";
import "./msSiteLegal.css";

export const metadata: Metadata = {
  ...createMsSitePageMetadata("studio"),
  verification: {
    google: "ZmUZhGMSCbPPt-6MTlMtXiPdhhuj0vSv7xtB6OUraWc",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
    { media: "(prefers-color-scheme: light)", color: "#000000" },
  ],
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactElement {
  return (
    <html lang="es" suppressHydrationWarning>
      <body style={{ margin: 0 }}>
        <MsSiteMotanosLangStyles />
        <a href="#main-content" className="ms-skip">
          Saltar al contenido principal
        </a>

        <MotansStudioSiteShell>
          <main id="main-content">
            <MsSitePageBackLink />
            {children}
          </main>
        </MotansStudioSiteShell>
      </body>
    </html>
  );
}
