import type { CSSProperties, ReactElement } from "react";
import type { MsStudioCapabilityScreen } from "../../lib/msStudioServicesFoundation.js";

export interface MsCapabilityProductFrameProps {
  readonly screen: MsStudioCapabilityScreen;
  readonly priority?: boolean;
}

/** Marco premium para ilustraciones WebP o capturas de producto. */
export function MsCapabilityProductFrame({
  screen,
  priority = false,
}: MsCapabilityProductFrameProps): ReactElement {
  const frameStyle = {
    "--mscap-frame-focus": screen.focus ?? "center",
  } as CSSProperties;

  const isDemo = screen.kind === "demo";
  const isScreenshot = screen.kind === "screenshot";
  const isPortrait = screen.frame === "portrait";

  return (
    <figure
      className={[
        "mscap-frame",
        `mscap-frame--${screen.frame}`,
        isDemo ? "mscap-frame--demo" : "",
        isScreenshot ? "mscap-frame--screenshot" : "",
        isPortrait ? "mscap-frame--full" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      style={frameStyle}
    >
      <div className="mscap-frame__aura" aria-hidden="true" />
      <div className="mscap-frame__shell">
        <div className="mscap-frame__screen">
          <img
            src={screen.src}
            alt={screen.alt}
            width={screen.width}
            height={screen.height}
            className="mscap-frame__img"
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            draggable={false}
          />
        </div>
      </div>
    </figure>
  );
}
