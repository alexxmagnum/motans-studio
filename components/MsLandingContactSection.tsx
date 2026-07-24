import type React from "react";
import { LeadForm } from "./LeadForm.js";
import { MsContactTrust } from "./MsContactTrust.js";
import { MsLandingChapterCard } from "./MsLandingChapterCard.js";
import { MS_SITE_CONTACT } from "../lib/msSite1703Foundation.js";

export function MsLandingContactSection(): React.ReactElement {
  return (
    <section className="ms-chapter ms-landing-contact">
      <MsLandingChapterCard
        anchorId="contacto"
        title={MS_SITE_CONTACT.title}
        titleId="ms-landing-contact-title"
        lead={MS_SITE_CONTACT.lead}
        variant="contact"
      >
        <div className="ms-contact-layout">
          <MsContactTrust />
          <div className="ms-contact-card">
            <LeadForm variant="premium" />
          </div>
        </div>
      </MsLandingChapterCard>
    </section>
  );
}
