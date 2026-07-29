import type React from "react";
import Link from "next/link";
import type { MsSiteLegalPage } from "../lib/msSiteLegalFoundation.js";
import { MS_SITE_LEGAL_PAGES, MS_SITE_LEGAL_HUB } from "../lib/msSiteLegalFoundation.js";

export function MsSiteLegalDocument({
  page,
}: {
  readonly page: MsSiteLegalPage;
}): React.ReactElement {
  return (
    <article className="ms-legal">
      <header className="ms-legal__header">
        <p className="ms-legal__kicker">{page.kicker}</p>
        <h1 className="ms-legal__title">{page.title}</h1>
        <p className="ms-legal__desc">{page.description}</p>
        <aside className="ms-legal__banner" role="note">
          {page.templateBanner}
        </aside>
      </header>

      <div className="ms-legal__body">
        {page.sections.map((section) => (
          <section key={section.heading} className="ms-legal__section">
            <h2 className="ms-legal__heading">{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph} className="ms-legal__p">
                {paragraph}
              </p>
            ))}
            {section.bullets ? (
              <ul className="ms-legal__list">
                {section.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
            {section.editableNote ? (
              <p className="ms-legal__edit-note">{section.editableNote}</p>
            ) : null}
          </section>
        ))}
      </div>

      <nav className="ms-legal__related" aria-label="Documentos legales">
        <p className="ms-legal__related-title">Otros documentos</p>
        <ul className="ms-legal__related-list">
          <li>
            <Link href={MS_SITE_LEGAL_HUB.path}>{MS_SITE_LEGAL_HUB.title}</Link>
          </li>
          {MS_SITE_LEGAL_PAGES.filter((item) => item.id !== page.id).map((item) => (
            <li key={item.id}>
              <Link href={item.path}>{item.title}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </article>
  );
}

export function MsSiteLegalHub(): React.ReactElement {
  return (
    <article className="ms-legal">
      <header className="ms-legal__header">
        <p className="ms-legal__kicker">{MS_SITE_LEGAL_HUB.kicker}</p>
        <h1 className="ms-legal__title">{MS_SITE_LEGAL_HUB.title}</h1>
        <p className="ms-legal__desc">{MS_SITE_LEGAL_HUB.intro}</p>
        <aside className="ms-legal__banner" role="note">
          Plantilla editable — contenido orientativo pendiente de revisión legal profesional.
          Incluye aviso legal, privacidad, cookies, condiciones de uso, política de servicios,
          contacto legal y accesibilidad.
        </aside>
      </header>

      <section className="ms-legal__section">
        <h2 className="ms-legal__heading">Datos de contacto</h2>
        <p className="ms-legal__p">
          <strong>Motans Studio</strong>
        </p>
        <p className="ms-legal__p">Email: info@motans.studio</p>
        <p className="ms-legal__p">España — Mercado activo</p>
      </section>

      <nav className="ms-legal__hub-grid" aria-label="Índice legal">
        {MS_SITE_LEGAL_PAGES.map((page) => (
          <Link key={page.id} href={page.path} className="ms-legal__hub-card">
            <span className="ms-legal__hub-kicker">{page.kicker}</span>
            <span className="ms-legal__hub-title">{page.title}</span>
            <span className="ms-legal__hub-desc">{page.description}</span>
          </Link>
        ))}
      </nav>
    </article>
  );
}
