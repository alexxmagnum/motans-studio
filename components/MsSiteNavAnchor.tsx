"use client";

import type React from "react";
import { usePathname } from "next/navigation";
import { scrollLandingToAnchor } from "../lib/msSiteLandingScroll.js";

const MS_SITE_LANDING_PATH = "/" as const;

function resolveNavHref(href: string, pathname: string): string {
  if (href === MS_SITE_LANDING_PATH) {
    return MS_SITE_LANDING_PATH;
  }

  if (href.startsWith("/#") && pathname === MS_SITE_LANDING_PATH) {
    return href.slice(1);
  }

  return href;
}

function landingHashFromHref(href: string): string | null {
  if (href === MS_SITE_LANDING_PATH) {
    return "inicio";
  }
  if (href.startsWith("/#")) {
    return href.slice(2);
  }
  if (href.startsWith("#")) {
    return href.slice(1);
  }
  return null;
}

export interface MsSiteNavAnchorProps {
  readonly href: string;
  readonly className?: string | undefined;
  readonly children: React.ReactNode;
  readonly "aria-current"?: React.AnchorHTMLAttributes<HTMLAnchorElement>["aria-current"];
  readonly "aria-label"?: string | undefined;
}

export function MsSiteNavAnchor({
  href,
  className,
  children,
  "aria-current": ariaCurrent,
  "aria-label": ariaLabel,
}: MsSiteNavAnchorProps): React.ReactElement {
  const pathname = usePathname();
  const resolvedHref = resolveNavHref(href, pathname);
  const landingHash = pathname === MS_SITE_LANDING_PATH ? landingHashFromHref(href) : null;

  return (
    <a
      href={resolvedHref}
      className={className}
      aria-current={ariaCurrent}
      aria-label={ariaLabel}
      onClick={(event) => {
        const details = event.currentTarget.closest("details.ms-nav-mobile");
        if (details instanceof HTMLDetailsElement) {
          details.open = false;
        }

        if (landingHash === null) {
          return;
        }

        event.preventDefault();
        scrollLandingToAnchor(landingHash);
        if (landingHash === "inicio") {
          window.history.pushState(null, "", MS_SITE_LANDING_PATH);
        } else {
          window.history.pushState(null, "", `#${landingHash}`);
        }
      }}
    >
      {children}
    </a>
  );
}
