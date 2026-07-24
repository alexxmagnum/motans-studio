import type React from "react";
import { MS_SITE_TRUST_PRINCIPLES } from "../lib/msSite1702Foundation.js";

export function MsTrustStrip(): React.ReactElement {
  return (
    <section className="ms-trust" aria-label="Principios de confianza">
      <ul className="ms-trust__list">
        {MS_SITE_TRUST_PRINCIPLES.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
