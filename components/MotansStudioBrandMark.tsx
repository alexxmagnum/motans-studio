import type React from "react";
import { MS_SITE_BRAND_ASSETS } from "../lib/msSite1701Foundation.js";

export type MotansStudioBrandMarkVariant =
  | "mark-only"
  | "lockup-studio"
  | "lockup-product"
  | "ms"
  | "motanos-product";

export interface MotansStudioBrandMarkProps {
  readonly variant: MotansStudioBrandMarkVariant;
  readonly height?: number;
  readonly showWordmark?: boolean;
}

function markSizeStyle(height: number): React.CSSProperties {
  return { height: `${height}px`, width: "auto", maxWidth: "100%" };
}

function MsMarkImage({
  height,
  className,
}: {
  readonly height: number;
  readonly className?: string;
}): React.ReactElement {
  const png = MS_SITE_BRAND_ASSETS.logoMsPng;
  const webp = MS_SITE_BRAND_ASSETS.logoMsWebp;
  const sizeStyle = markSizeStyle(height);
  return (
    <picture className={className} style={sizeStyle}>
      <source srcSet={webp.path} type="image/webp" />
      <img
        src={png.path}
        alt={png.alt}
        height={height}
        decoding="async"
        className="ms-brand-mark"
        style={sizeStyle}
      />
    </picture>
  );
}

export function MotansStudioBrandMark({
  variant,
  height = 36,
  showWordmark = true,
}: MotansStudioBrandMarkProps): React.ReactElement {
  if (variant === "lockup-studio" || variant === "ms" || variant === "mark-only") {
    const mark = <MsMarkImage height={height} />;
    if (variant === "mark-only" || !showWordmark) {
      return mark;
    }
    return (
      <span className="ms-lockup ms-lockup--studio">
        {mark}
        <span className="ms-lockup__text">
          <strong>Motans Studio</strong>
        </span>
      </span>
    );
  }

  if (variant === "motanos-product" || variant === "lockup-product") {
    const asset = MS_SITE_BRAND_ASSETS.logoMotanOSProduct;
    return (
      <span className="ms-lockup ms-lockup--product">
        <img
          src={asset.path}
          alt={asset.alt}
          height={height}
          decoding="async"
          className="ms-brand-mark ms-brand-mark--product"
          style={markSizeStyle(height)}
        />
        {showWordmark ? (
          <span className="ms-lockup__text">
            <strong>MotanOS</strong>
            <small>by Motans Studio</small>
          </span>
        ) : null}
      </span>
    );
  }

  return <MsMarkImage height={height} />;
}
