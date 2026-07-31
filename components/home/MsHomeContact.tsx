"use client";

import type React from "react";
import { LeadForm } from "../LeadForm.js";
import { useMsSiteLocale } from "../MsSiteLocaleProvider.js";
import { MsStudioSectionEyebrow } from "../studio-home/MsStudioSectionEyebrow.js";
import { MsStudioTitleWithAccent } from "../studio-home/MsStudioTitleWithAccent.js";

/** Contacto — apertura al grid de página; formulario centrado debajo. */
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
      className="ms-dp-section msh-contact msh-contact--premium"
      aria-labelledby="ms-dp-contact-title"
    >
      <div className="ms-dp-shell msh-contact__shell">
        <header className="msh-contact__opening">
          <MsStudioSectionEyebrow>{ui.contactKicker}</MsStudioSectionEyebrow>
          <Title id="ms-dp-contact-title" className="msh-contact__title">
            <MsStudioTitleWithAccent text={ui.contactTitle} />
          </Title>
        </header>
      </div>

      <div className="msh-contact__stage">
        <div className="msh-contact__panel">
          <LeadForm variant="premium" submitVariant="studio-home" />
        </div>
      </div>
    </section>
  );
}
