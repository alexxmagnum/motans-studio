"use client";

import type React from "react";
import { MS_SITE_PUBLIC_NAV_ITEMS } from "../lib/msSite1701Foundation.js";
import { isMsSiteNavItemActive } from "../lib/msSiteLandingNavFoundation.js";
import { getNavLabelForHref } from "../lib/msSiteLocaleFoundation.js";
import { useMsSiteLocale } from "./MsSiteLocaleProvider.js";
import { MsSiteNavAnchor } from "./MsSiteNavAnchor.js";

export interface MsSiteNavLinksProps {
  readonly activePath?: string | undefined;
  readonly className: string;
}

export function MsSiteNavLinks({
  activePath,
  className,
}: MsSiteNavLinksProps): React.ReactElement {
  const { locale } = useMsSiteLocale();

  return (
    <>
      {MS_SITE_PUBLIC_NAV_ITEMS.map((item) => {
        const active = isMsSiteNavItemActive(item.href, activePath);
        const itemClass = item.kind === "cta" ? `${className} ms-nav__cta` : className;
        return (
          <MsSiteNavAnchor
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={itemClass}
          >
            {getNavLabelForHref(item.href, locale)}
          </MsSiteNavAnchor>
        );
      })}
    </>
  );
}
