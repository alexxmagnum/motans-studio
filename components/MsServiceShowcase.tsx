import type React from "react";
import Link from "next/link";
import { MS_SITE_STUDIO_SERVICES, MS_SITE_ROUTES } from "../lib/msSite1701Foundation.js";
import { MS_SITE_SERVICIOS } from "../lib/msSite1703Foundation.js";

export function MsServiceShowcase(): React.ReactElement {
  return (
    <>
      <div className="ms-service-showcase">
        {MS_SITE_STUDIO_SERVICES.map((service) => (
          <article key={service.id} className="ms-service-card">
            <span className="ms-service-card__mark" aria-hidden="true" />
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </article>
        ))}
      </div>

      <section className="ms-bridge-card" aria-labelledby="ms-bridge-title">
        <span className="ms-bridge-card__hairline" aria-hidden="true" />
        <p className="ms-eyebrow">Producto estrella</p>
        <h2 id="ms-bridge-title">MotanOS</h2>
        <p className="ms-bridge-card__line">{MS_SITE_SERVICIOS.bridge}</p>
        <div className="ms-actions">
          <Link href="#contacto" className="ms-btn ms-btn--primary">
            {MS_SITE_SERVICIOS.cta}
          </Link>
          <Link href="#motanos" className="ms-btn ms-btn--secondary">
            Conocer MotanOS
          </Link>
        </div>
      </section>
    </>
  );
}
