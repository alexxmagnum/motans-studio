"use client";

import type React from "react";
import Link from "next/link";
import {
  MS_SITE_FOOTER_CONTACT,
  MS_SITE_FOOTER_LEGAL,
  MS_SITE_FOOTER_NAV,
  MS_SITE_FOOTER_SERVICES,
  MS_SITE_FOOTER_SOCIAL,
  MS_SITE_FOOTER_TECH,
} from "../lib/msSiteFooterFoundation.js";
import { MS_SITE_ROUTES } from "../lib/msSite1701Foundation.js";
import { MS_SITE_CONSENT_I18N } from "../lib/msSiteConsentI18nFoundation.js";
import { useMsSiteLocale } from "./MsSiteLocaleProvider.js";
import { useMsSiteConsentOptional } from "./MsSiteConsentProvider.js";

export function MsStudioFooter(): React.ReactElement {
  const year = new Date().getFullYear();
  const { ui, locale } = useMsSiteLocale();
  const consent = useMsSiteConsentOptional();
  const consentCopy = MS_SITE_CONSENT_I18N[locale];

  return (
    <footer className="ms-studio-footer" role="contentinfo">
      <div className="ms-studio-footer__hairline" aria-hidden="true" />

      <div className="ms-studio-footer__shell">
        <div className="ms-studio-footer__brand">
          <p className="ms-studio-footer__brand-name">Motans Studio</p>
          <p className="ms-studio-footer__tagline">{MS_SITE_FOOTER_CONTACT.tagline}</p>
          <div className="ms-studio-footer__contact-block">
            <a
              className="ms-studio-footer__contact-link"
              href={`mailto:${MS_SITE_FOOTER_CONTACT.email}`}
            >
              {MS_SITE_FOOTER_CONTACT.email}
            </a>
            <p className="ms-studio-footer__location">{MS_SITE_FOOTER_CONTACT.location}</p>
          </div>
          {MS_SITE_FOOTER_SOCIAL.length > 0 ? (
            <ul className="ms-studio-footer__social" aria-label="Redes sociales">
              {MS_SITE_FOOTER_SOCIAL.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    className="ms-studio-footer__social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <nav className="ms-studio-footer__col" aria-label="Enlaces principales">
          <p className="ms-studio-footer__col-title">Explorar</p>
          <ul className="ms-studio-footer__list">
            {MS_SITE_FOOTER_NAV.map((link) => (
              <li key={`${link.href}-${link.label}`}>
                <Link href={link.href} className="ms-studio-footer__link">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="ms-studio-footer__col" aria-label="Servicios">
          <p className="ms-studio-footer__col-title">Servicios</p>
          <ul className="ms-studio-footer__list">
            {MS_SITE_FOOTER_SERVICES.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="ms-studio-footer__link">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ms-studio-footer__col">
          <p className="ms-studio-footer__col-title">Tecnologías</p>
          <ul className="ms-studio-footer__list ms-studio-footer__list--tech">
            {MS_SITE_FOOTER_TECH.map((tech) => (
              <li key={tech}>
                <span className="ms-studio-footer__tech">{tech}</span>
              </li>
            ))}
          </ul>
          <p className="ms-studio-footer__col-title ms-studio-footer__col-title--spaced">
            Contacto
          </p>
          <ul className="ms-studio-footer__list">
            <li>
              <Link href="/#contacto" className="ms-studio-footer__link">
                Hablemos
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="ms-studio-footer__legal-bar">
        <nav className="ms-studio-footer__legal" aria-label="Información legal">
          <Link href={MS_SITE_ROUTES.legal} className="ms-studio-footer__legal-link">
            {ui.footerLegal}
          </Link>
          {MS_SITE_FOOTER_LEGAL.map((link) => (
            <span key={link.href} className="ms-studio-footer__legal-item">
              <span className="ms-studio-footer__sep" aria-hidden="true">
                ·
              </span>
              <Link href={link.href} className="ms-studio-footer__legal-link">
                {link.label}
              </Link>
            </span>
          ))}
          {consent ? (
            <span className="ms-studio-footer__legal-item">
              <span className="ms-studio-footer__sep" aria-hidden="true">
                ·
              </span>
              <button
                type="button"
                className="ms-studio-footer__legal-btn"
                onClick={consent.openPreferences}
              >
                {consentCopy.openFromFooter}
              </button>
            </span>
          ) : null}
        </nav>
      </div>

      <div className="ms-studio-footer__meta">
        <p className="ms-studio-footer__copy" suppressHydrationWarning>
          © {year} Motans Studio. {ui.footerRights}
        </p>
        <p className="ms-studio-footer__lockup">Motans Studio</p>
      </div>
    </footer>
  );
}
