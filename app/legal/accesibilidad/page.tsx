import type React from "react";
import type { Metadata } from "next";
import { MsSiteLegalDocument } from "../../../components/MsSiteLegalDocument.js";
import { getMsSiteLegalPage } from "../../../lib/msSiteLegalFoundation.js";
import { createMsSitePageMetadata } from "../../../lib/msSite1703SeoFoundation.js";

export const metadata: Metadata = createMsSitePageMetadata("legalAccesibilidad");

export default function LegalAccesibilidadPage(): React.ReactElement {
  return <MsSiteLegalDocument page={getMsSiteLegalPage("accesibilidad")} />;
}
