import type { ReactElement, ReactNode } from "react";

type MsStudioSectionEyebrowProps = {
  readonly children: ReactNode;
  readonly className?: string;
};

/**
 * Eyebrow de sección — misma pieza que “Motans Studio” en el hero
 * (línea Motans + label uppercase).
 */
export function MsStudioSectionEyebrow({
  children,
  className,
}: MsStudioSectionEyebrowProps): ReactElement {
  return (
    <p className={["msh-eyebrow", className].filter(Boolean).join(" ")}>
      <span className="msh-eyebrow__mark" aria-hidden="true" />
      <span className="msh-eyebrow__text">{children}</span>
    </p>
  );
}
