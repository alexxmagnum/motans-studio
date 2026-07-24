import type React from "react";
import type { Metadata } from "next";
import { MotansStudioSiteShell } from "../components/MotansStudioSiteShell.js";
import { MsSitePageBackLink } from "../components/MsSitePageBackLink.js";
import { MsSiteMotanosLangStyles } from "../components/MsSiteMotanosLangStyles.js";
import { createMsSitePageMetadata } from "../lib/msSite1703SeoFoundation.js";
import "./msSite1703Global.css";
import "./msSite1703Obsessive.css";
import "./msSiteDarkPremium.css";
import "./msStudioHome.css";
import "./msSiteHomeSplash.css";
import "./msStudioServices.css";
import "./msStudioStampSplash.css";

export const metadata: Metadata = createMsSitePageMetadata("studio");

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
