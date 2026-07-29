import type { MetadataRoute } from "next";
import { MOTANS_CORPORATE_BRAND_ASSETS } from "@motanos/branding";
import { MS_SITE_IDENTITY } from "../lib/msSiteIdentityFoundation.js";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  const icon = MOTANS_CORPORATE_BRAND_ASSETS.markMsPng.publicPath;

  return {
    id: "/",
    name: MS_SITE_IDENTITY.brand,
    short_name: "Motans",
    description:
      "Software a medida, plataformas SaaS, automatización e integraciones para empresas.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait-primary",
    background_color: "#000000",
    theme_color: "#000000",
    lang: "es-ES",
    dir: "ltr",
    categories: ["business", "productivity"],
    icons: [
      {
        src: icon,
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: icon,
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
