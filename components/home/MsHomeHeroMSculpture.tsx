import type React from "react";
import { MS_SITE_DARK_HERO_SCULPTURE } from "../../lib/msSiteDarkPremiumFoundation.js";

/** Render 3D oficial de marca — asset en public/brand, no recorte de mockup. */
export function MsHomeHeroMSculpture(): React.ReactElement {
  const asset = MS_SITE_DARK_HERO_SCULPTURE;

  return (
    <div className="ms-dp-m-sculpture">
      <img
        src={asset.src}
        alt=""
        className="ms-dp-m-sculpture__render"
        width={asset.width}
        height={asset.height}
        decoding="async"
        draggable={false}
      />
    </div>
  );
}
