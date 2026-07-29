"use client";

import type React from "react";
import { usePathname } from "next/navigation";
import { MS_SITE_ROUTES } from "../lib/msSite1701Foundation.js";
import {
  MS_STUDIO_HOME_BRAND_WORDMARK,
  MS_STUDIO_HOME_HEADER_CTA,
  MS_STUDIO_HOME_LOGO,
} from "../lib/msStudioHomeFoundation.js";
import { MsSiteLanguageSelector } from "./MsSiteLanguageSelector.js";
import { MsSiteLocaleProvider, useMsSiteLocale } from "./MsSiteLocaleProvider.js";
import { MsSiteMobileNav } from "./MsSiteMobileNav.js";
import { MsSiteNavAnchor } from "./MsSiteNavAnchor.js";
import { MsSiteNavLinks } from "./MsSiteNavLinks.js";
import { MsStudioFooter } from "./MsStudioFooter.js";
import { MsSiteConsentProvider } from "./MsSiteConsentProvider.js";
import { MsSiteLegacyHashRedirect } from "./MsSiteLegacyHashRedirect.js";
import { useMsSiteLandingNavSpy } from "./useMsSiteLandingNavSpy.js";

export interface MotansStudioSiteShellProps {
  readonly children: React.ReactNode;
  readonly activePath?: string | undefined;
}

function MotansStudioSiteShellChrome({
  children,
  activePath: activePathProp,
}: MotansStudioSiteShellProps): React.ReactElement {
  const pathname = usePathname();
  const landingNavHref = useMsSiteLandingNavSpy(pathname === "/");
  const activePath = activePathProp ?? landingNavHref ?? pathname;
  const { ui } = useMsSiteLocale();

  return (
    <div className="ms-site ms-site--dark-premium">
      <MsSiteConsentProvider>
        <header className="ms-header ms-dp-header">
          <div className="ms-header__inner ms-dp-header__inner">
            <MsSiteNavAnchor
              href={MS_SITE_ROUTES.home}
              className="msh-brand"
              aria-label="Motans Studio — home"
            >
              <img
                src={MS_STUDIO_HOME_LOGO.fallbackPath}
                alt={MS_STUDIO_HOME_LOGO.alt}
                className="msh-brand__mark"
                height={MS_STUDIO_HOME_LOGO.height}
                width={MS_STUDIO_HOME_LOGO.width}
                decoding="async"
              />
              <span className="msh-brand__name">
                {`${MS_STUDIO_HOME_BRAND_WORDMARK.primary} ${MS_STUDIO_HOME_BRAND_WORDMARK.secondary}`}
              </span>
            </MsSiteNavAnchor>

            <nav className="ms-nav-desktop msh-nav" aria-label="Principal">
              <MsSiteNavLinks activePath={activePath} className="msh-nav__link" />
            </nav>

            <div className="msh-header__actions">
              <MsSiteNavAnchor href={MS_STUDIO_HOME_HEADER_CTA.href} className="msh-btn msh-btn--header">
                {ui.hablemos}
                <span className="msh-btn__arrow msh-btn__arrow--up" aria-hidden="true">
                  ↗
                </span>
              </MsSiteNavAnchor>
              <div className="msh-header__locale">
                <MsSiteLanguageSelector panelId="ms-site-lang-header" />
              </div>
              <MsSiteMobileNav activePath={activePath} />
            </div>
          </div>
        </header>

        <MsSiteLegacyHashRedirect />
        {children}

        <MsStudioFooter />
      </MsSiteConsentProvider>
    </div>
  );
}

export function MotansStudioSiteShell(props: MotansStudioSiteShellProps): React.ReactElement {
  return (
    <MsSiteLocaleProvider>
      <MotansStudioSiteShellChrome {...props} />
    </MsSiteLocaleProvider>
  );
}
