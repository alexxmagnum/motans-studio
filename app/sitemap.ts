import type { MetadataRoute } from "next";
import {
  MS_SITE_PUBLIC_ORIGIN,
  MS_SITE_SITEMAP_PATHS,
} from "../lib/msSite1703SeoFoundation.js";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return MS_SITE_SITEMAP_PATHS.map((path) => ({
    url: path === "/" ? MS_SITE_PUBLIC_ORIGIN : `${MS_SITE_PUBLIC_ORIGIN}${path}`,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.startsWith("/legal") ? 0.4 : 0.7,
  }));
}
