import type { ReactElement } from "react";
import {
  MS_STUDIO_CAPABILITIES,
  type MsStudioCapabilitiesVisualVariant,
} from "../../lib/msStudioServicesFoundation.js";
import { MsCapabilityProductFrame } from "./MsCapabilityProductFrame.js";
import { MsCapabilityExpandableFrame } from "./MsCapabilityExpandableFrame.js";

type MsStudioCapabilitiesVisualProps = {
  readonly variant: MsStudioCapabilitiesVisualVariant;
  readonly priority?: boolean;
  readonly expandable?: boolean;
};

function getBlockScreens(variant: MsStudioCapabilitiesVisualVariant) {
  return MS_STUDIO_CAPABILITIES.blocks.find((block) => block.id === variant)?.screens ?? [];
}

/** Ilustracion WebP premium por capacidad — clara, ligera, coherente con la home dark. */
export function MsStudioCapabilitiesVisual({
  variant,
  priority = false,
  expandable = false,
}: MsStudioCapabilitiesVisualProps): ReactElement {
  const screen = getBlockScreens(variant)[0];
  if (!screen) {
    return <div className="mscap-visual" />;
  }

  const Frame = expandable ? MsCapabilityExpandableFrame : MsCapabilityProductFrame;

  return (
    <div
      className={`mscap-visual mscap-visual--${variant}`}
      aria-hidden={expandable ? undefined : "true"}
    >
      <Frame screen={screen} priority={priority} />
    </div>
  );
}
