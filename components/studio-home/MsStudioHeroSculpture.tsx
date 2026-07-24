import type React from "react";
import Image from "next/image";
import { MS_STUDIO_HOME_SCULPTURE } from "../../lib/msStudioHomeFoundation.js";

/** Panel escultura M — lateral derecho, sin overlays ni procesado. */
export function MsStudioHeroSculpture(): React.ReactElement {
  const asset = MS_STUDIO_HOME_SCULPTURE;

  return (
    <figure className="msh-hero__figure" aria-hidden="true">
      <Image
        className="msh-hero__visual-img"
        src={asset.path}
        alt=""
        width={asset.width}
        height={asset.height}
        priority
        sizes="(min-width: 1025px) 58vw, 88vw"
        decoding="async"
        draggable={false}
      />
    </figure>
  );
}
