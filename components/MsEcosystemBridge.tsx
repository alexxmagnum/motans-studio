import type React from "react";
import { MS_SITE_ECOSYSTEM_BRIDGE } from "../lib/msSite1703Foundation.js";
import { MS_SITE_ECOSYSTEM_BRIDGE_OBSESSIVE } from "../lib/msSite1703ObsessiveFoundation.js";

export function MsEcosystemBridge(): React.ReactElement {
  return (
    <section className="ms-chapter ms-ecosystem-bridge" aria-label="Puente al ecosistema MotanOS">
      <div className="ms-ecosystem-bridge__card">
        <div className="ms-ecosystem-bridge__copy">
          <p className="ms-eyebrow">{MS_SITE_ECOSYSTEM_BRIDGE_OBSESSIVE.kicker}</p>
          <p className="ms-ecosystem-bridge__line">{MS_SITE_ECOSYSTEM_BRIDGE_OBSESSIVE.line}</p>
          <p className="ms-ecosystem-bridge__sub">{MS_SITE_ECOSYSTEM_BRIDGE.line}</p>
        </div>
      </div>
    </section>
  );
}
