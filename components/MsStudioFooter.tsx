"use client";

import type React from "react";
import { MS_SITE_FOOTER } from "../lib/msSiteFooterFoundation.js";
import { useMsSiteLocale } from "./MsSiteLocaleProvider.js";

export function MsStudioFooter(): React.ReactElement {
  const year = new Date().getFullYear();
  const footer = MS_SITE_FOOTER;
  const { ui } = useMsSiteLocale();

  return (
    <footer className="ms-studio-footer" role="contentinfo">
      <div className="ms-studio-footer__hairline" aria-hidden="true" />
      <div className="ms-studio-footer__inner">
        <p className="ms-studio-footer__copy" suppressHydrationWarning>
          © {year} Motans Studio. {ui.footerRights}
        </p>
        <nav className="ms-studio-footer__legal" aria-label="Legal">
          {footer.legalLinks.map((link, index) => (
            <span key={link.href} className="ms-studio-footer__legal-item">
              {index > 0 ? (
                <span className="ms-studio-footer__sep" aria-hidden="true">
                  ·
                </span>
              ) : null}
              <a href={link.href} className="ms-studio-footer__legal-link">
                {ui.footerLegal}
              </a>
            </span>
          ))}
        </nav>
        <p className="ms-studio-footer__lockup">{footer.productLockupPublic}</p>
      </div>
    </footer>
  );
}
