import type React from "react";
import type { Metadata } from "next";
import { MsMotanosPlansSection } from "../../components/plans/MsMotanosPlansSection.js";
import { createMsSitePageMetadata } from "../../lib/msSite1703SeoFoundation.js";

export const metadata: Metadata = createMsSitePageMetadata("planes");

export default function PlanesPage(): React.ReactElement {
  return (
    <div className="ms-page ms-page--studio-home ms-page--planes">
      <MsMotanosPlansSection variant="page" />
    </div>
  );
}
