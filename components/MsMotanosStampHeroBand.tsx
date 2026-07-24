import type React from "react";
import { MS_SITE_BRAND_ASSETS } from "../lib/msSite1701Foundation.js";

export interface MsMotanosStampHeroBandProps {
  readonly className?: string | undefined;
}

/** Banda negra MotanOS + stamp — misma pieza que el card grande de la sección #motanos */
export function MsMotanosStampHeroBand({
  className,
}: MsMotanosStampHeroBandProps): React.ReactElement {
  return (
    <div className={["ms-landing-motanos__hero-band", className].filter(Boolean).join(" ")}>
      <div className="ms-landing-motanos__hero-inner">
        <img
          src={MS_SITE_BRAND_ASSETS.logoMotanOSProduct.path}
          alt={MS_SITE_BRAND_ASSETS.logoMotanOSProduct.alt}
          decoding="async"
          className="ms-landing-motanos__stamp"
        />
      </div>
    </div>
  );
}
