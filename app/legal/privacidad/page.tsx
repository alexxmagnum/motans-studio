import type React from "react";
import type { Metadata } from "next";
import { MsSiteLegalDocument } from "../../../components/MsSiteLegalDocument.js";
import { getMsSiteLegalPage } from "../../../lib/msSiteLegalFoundation.js";
import { createMsSitePageMetadata } from "../../../lib/msSite1703SeoFoundation.js";

export const metadata: Metadata = {
  ...createMsSitePageMetadata("legalPrivacidad"),
  robots: { index: false, follow: true },
};

export default function LegalPrivacidadPage(): React.ReactElement {
  return <MsSiteLegalDocument page={getMsSiteLegalPage("privacidad")} />;
}
