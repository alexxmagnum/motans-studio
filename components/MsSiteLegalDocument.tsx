import type React from "react";
import Link from "next/link";
import type { MsSiteLegalPage } from "../lib/msSiteLegalFoundation.js";
import { MS_SITE_LEGAL_PAGES } from "../lib/msSiteLegalFoundation.js";

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
          </section>
        ))}
      </div>

      <nav className="ms-legal__related" aria-label="Documentos legales">
        <p className="ms-legal__related-title">Documentos</p>
        <ul className="ms-legal__related-list">
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
