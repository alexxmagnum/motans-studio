import type React from "react";
import type { MsSiteDarkTrustBrandIcon } from "../../lib/msSiteDarkPremiumFoundation.js";

export interface MsHomeTrustBrandIconProps {
  readonly icon: MsSiteDarkTrustBrandIcon;
}

export function MsHomeTrustBrandIcon({ icon }: MsHomeTrustBrandIconProps): React.ReactElement | null {
  if (icon === "none") {
    return null;
  }

  const common = {
    className: "ms-dp-trust__icon-svg",
    width: 14,
    height: 14,
    viewBox: "0 0 14 14",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": true as const,
  };

  switch (icon) {
    case "diamond":
      return (
        <svg {...common}>
          <path
            d="M7 1L12 7L7 13L2 7L7 1Z"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "nativo":
      return (
        <svg {...common}>
          <path
            d="M4 12L7 3L10 12H8.5L7.8 9.8H6.2L5.5 12H4ZM6.55 8.5H7.45L7 6.8L6.55 8.5Z"
            fill="currentColor"
          />
        </svg>
      );
    case "hexagon":
      return (
        <svg {...common}>
          <path
            d="M7 1.5L11.5 4.25V9.75L7 12.5L2.5 9.75V4.25L7 1.5Z"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "crown":
      return (
        <svg {...common}>
          <path
            d="M2 10V11.5H12V10L10.5 6.5L8 9L7 5.5L6 9L3.5 6.5L2 10Z"
            stroke="currentColor"
            strokeWidth="1.1"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path
            d="M7 1.5L11.5 3.5V7.5C11.5 10 9.5 12 7 12.5C4.5 12 2.5 10 2.5 7.5V3.5L7 1.5Z"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>
      );
    default:
      return null;
  }
}
