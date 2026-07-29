"use client";

import type React from "react";
import { LeadForm } from "../LeadForm.js";
import { useMsSiteLocale } from "../MsSiteLocaleProvider.js";
import { MsStudioSectionEyebrow } from "../studio-home/MsStudioSectionEyebrow.js";
import { MsStudioTitleWithAccent } from "../studio-home/MsStudioTitleWithAccent.js";

/** Contacto — página /contacto (mismo bloque que antes en #contacto). */
export function MsHomeContact({
  asPage = false,
}: {
  readonly asPage?: boolean;
}): React.ReactElement {
  const Title = asPage ? "h1" : "h2";
  const { ui } = useMsSiteLocale();

  return (
    <section
      id={asPage ? undefined : "contacto"}
      className="ms-dp-section msh-contact"
      aria-labelledby="ms-dp-contact-title"
    >
      <div className="ms-dp-shell">
        <MsStudioSectionEyebrow>{ui.contactKicker}</MsStudioSectionEyebrow>
        <Title id="ms-dp-contact-title" className="ms-dp-section__title">
          <MsStudioTitleWithAccent text={ui.contactTitle} />
        </Title>
        <p className="ms-dp-section__note">{ui.contactLead}</p>
        <p className="msh-contact__trust">{ui.contactTrust}</p>
        <p className="msh-contact__next">{ui.contactNext}</p>
        <div className="msh-contact__form-card">
          <LeadForm variant="premium" submitVariant="studio-home" />
        </div>
      </div>
    </section>
  );
}
