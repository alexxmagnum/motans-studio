import type { MetadataRoute } from "next";
import { MS_SITE_PUBLIC_ORIGIN } from "../lib/msSite1703SeoFoundation.js";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${MS_SITE_PUBLIC_ORIGIN}/sitemap.xml`,
  };
}
