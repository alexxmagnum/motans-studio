import type React from "react";
import { MS_SITE_CONTACT_OBSESSIVE } from "../lib/msSite1703ObsessiveFoundation.js";

export function MsContactTrust(): React.ReactElement {
  return (
    <aside className="ms-contact-trust" aria-label="Contacto Motans Studio">
      <p className="ms-eyebrow">{MS_SITE_CONTACT_OBSESSIVE.kicker}</p>
      <p className="ms-contact-trust__lead">{MS_SITE_CONTACT_OBSESSIVE.trustLeadPublic}</p>
    </aside>
  );
}
