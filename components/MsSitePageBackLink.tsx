"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactElement } from "react";
import { getMsSitePageBack } from "../lib/msSitePageBackFoundation.js";
import { useMsSiteLocale } from "./MsSiteLocaleProvider.js";

/** Enlace «Volver» con flecha — oculto en home. */
export function MsSitePageBackLink(): ReactElement | null {
  const pathname = usePathname();
  const back = getMsSitePageBack(pathname);
  const { ui } = useMsSiteLocale();

  if (back === null) {
    return null;
  }

  return (
    <>
      <div className="ms-page-back-wrap">
        <Link href={back.href} className="ms-page-back">
          <span className="ms-page-back__arrow" aria-hidden="true">
            ←
          </span>
          <span>{ui.back}</span>
        </Link>
      </div>
      <div className="ms-page-back-spacer" aria-hidden="true" />
    </>
  );
}
