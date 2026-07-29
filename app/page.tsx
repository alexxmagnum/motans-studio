import type React from "react";
import type { Metadata } from "next";
import { MsSiteStructuredData } from "../components/MsSiteStructuredData.js";
import { MsStudioHomeHero } from "../components/studio-home/MsStudioHomeHero.js";
import { MsStudioOfferSection } from "../components/studio-home/MsStudioOfferSection.js";
import { MsStudioFactorySection } from "../components/studio-home/MsStudioFactorySection.js";
import { MsStudioHomeFinalCta } from "../components/studio-home/MsStudioHomeFinalCta.js";
import { MsHomeContact } from "../components/home/MsHomeContact.js";
import { createMsSitePageMetadata } from "../lib/msSite1703SeoFoundation.js";

export const metadata: Metadata = createMsSitePageMetadata("home");

/**
 * Landing pública — Hero + Offer + El Estudio + CTA + Contacto.
 * Entrega / Tecnologías / FAQ: chasis reservado, no montado hasta tener contenido real.
 */
export default function MotansStudioHomePage(): React.ReactElement {
  return (
    <div className="ms-page ms-page--landing ms-page--studio-home">
      <MsSiteStructuredData />

      <MsStudioHomeHero />
      <MsStudioOfferSection />
      <MsStudioFactorySection />
      <MsStudioHomeFinalCta />
      <MsHomeContact />
    </div>
  );
}
