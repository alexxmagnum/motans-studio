import type React from "react";
import type { Metadata } from "next";
import { MsSiteLegalHub } from "../../components/MsSiteLegalDocument.js";
import { createMsSitePageMetadata } from "../../lib/msSite1703SeoFoundation.js";

export const metadata: Metadata = createMsSitePageMetadata("legal");

export default function LegalPage(): React.ReactElement {
  return <MsSiteLegalHub />;
}
