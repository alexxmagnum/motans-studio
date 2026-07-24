import type React from "react";
import type { Metadata } from "next";
import { MsHosteleriaLandingV1 } from "../../../components/hosteleria/MsHosteleriaLandingV1.js";
import { createMsSitePageMetadata } from "../../../lib/msSite1703SeoFoundation.js";
import "../../msHosteleriaLanding.css";

export const metadata: Metadata = createMsSitePageMetadata("hosteleria");

export default function MotanOSHosteleriaPage(): React.ReactElement {
  return (
    <div className="ms-page ms-page--hosteleria-landing">
      <MsHosteleriaLandingV1 />
    </div>
  );
}
