import type React from "react";
import type { Metadata } from "next";
import { MsHomeContact } from "../../components/home/MsHomeContact.js";
import { createMsSitePageMetadata } from "../../lib/msSite1703SeoFoundation.js";

export const metadata: Metadata = createMsSitePageMetadata("contacto");

export default function ContactoPage(): React.ReactElement {
  return (
    <div className="ms-page ms-page--landing ms-page--studio-home">
      <MsHomeContact asPage />
    </div>
  );
}
