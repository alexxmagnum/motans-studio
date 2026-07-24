import type React from "react";
import type { Metadata } from "next";
import { MsStudioCapabilities } from "../../components/studio-services/MsStudioCapabilities.js";
import { createMsSitePageMetadata } from "../../lib/msSite1703SeoFoundation.js";
import { MS_SITE_PUBLIC_MOTANOS_VISIBLE } from "../../lib/msSite1701Foundation.js";

export const metadata: Metadata = createMsSitePageMetadata("servicios");

export default function ServiciosPage(): React.ReactElement {
  return (
    <div className="ms-page ms-page--landing ms-page--studio-services">
      <MsStudioCapabilities
        asPage
        excludeBlockIds={MS_SITE_PUBLIC_MOTANOS_VISIBLE ? [] : ["motanos"]}
      />
    </div>
  );
}
