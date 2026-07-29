import type { MetadataRoute } from "next";
import { MS_SITE_PUBLIC_ORIGIN } from "../lib/msSite1703SeoFoundation.js";

export const dynamic = "force-static";

/**
 * Aliases y rutas congeladas: noindex vía metadata de página + disallow aquí.
 * Páginas legales: indexables (transparencia / cumplimiento) — no se excluyen.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/servicios",
          "/contacto",
          "/motanos",
          "/motanos/",
          "/planes",
          "/solicitud",
          "/motans",
          "/motans/",
        ],
      },
    ],
    sitemap: `${MS_SITE_PUBLIC_ORIGIN}/sitemap.xml`,
    host: MS_SITE_PUBLIC_ORIGIN,
  };
}
