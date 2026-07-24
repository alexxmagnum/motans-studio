"use client";

import type React from "react";
import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import {
  scrollLandingToAnchor,
  scrollLandingToTop,
  syncLandingScrollPaddingTop,
} from "../lib/msSiteLandingScroll.js";

const MS_SITE_LANDING_PATH = "/" as const;

function applyScrollAfterNavigation(pathname: string): void {
  if (pathname !== MS_SITE_LANDING_PATH) {
    scrollLandingToTop();
    return;
  }

  syncLandingScrollPaddingTop();

  const hash = window.location.hash.replace("#", "");
  if (!hash) {
    scrollLandingToTop();
    return;
  }

  requestAnimationFrame(() => {
    scrollLandingToAnchor(hash);
  });
}

export default function CommercialSiteTemplate({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactElement {
  const pathname = usePathname();

  useLayoutEffect(() => {
    applyScrollAfterNavigation(pathname);
    const retry = window.setTimeout(() => applyScrollAfterNavigation(pathname), 0);
    return () => window.clearTimeout(retry);
  }, [pathname]);

  return <>{children}</>;
}
