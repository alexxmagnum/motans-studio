"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const LEGACY_HASH_ROUTES: Record<string, string> = {
  servicios: "/servicios",
  contacto: "/contacto",
};

/** Enlaces viejos /#servicios y /#contacto → rutas limpias. */
export function MsSiteLegacyHashRedirect(): null {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname !== "/") {
      return;
    }

    const hash = window.location.hash.replace("#", "");
    const target = LEGACY_HASH_ROUTES[hash];
    if (!target) {
      return;
    }

    router.replace(target);
  }, [pathname, router]);

  return null;
}
