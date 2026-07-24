import type React from "react";
import {
  MS_SITE_HOSTELERIA_ROADMAP_MODULES,
  MS_SITE_HOSTELERIA_STAGING_CAPABILITIES,
} from "../lib/msSite1701Foundation.js";

export function MsClaimsMatrix(): React.ReactElement {
  return (
    <section className="ms-section" aria-labelledby="ms-claims-matrix-title">
      <h2 id="ms-claims-matrix-title">Disponible hoy vs roadmap</h2>
      <p className="ms-lead ms-lead--left">
        Matriz comercial honesta: lo demostrado en staging no implica producción general ni cobro
        automático.
      </p>
      <div className="ms-matrix">
        <div className="ms-matrix__col">
          <h3 className="ms-matrix__head ms-matrix__head--today">Demostrado en staging</h3>
          <ul className="ms-list">
            {MS_SITE_HOSTELERIA_STAGING_CAPABILITIES.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="ms-matrix__col">
          <h3 className="ms-matrix__head ms-matrix__head--later">En roadmap</h3>
          <ul className="ms-list">
            {MS_SITE_HOSTELERIA_ROADMAP_MODULES.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
