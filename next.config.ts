import type { NextConfig } from "next";

/**
 * Fase 0: rutas MotanOS / planes / solicitud redirigen a home (superficie studio-only).
 * Sin `output: "export"` para permitir Route Handlers (contacto / Resend).
 * `vercel.json` refuerza redirects/headers en Vercel; Next también aplica `redirects`.
 */
const nextConfig: NextConfig = {
  transpilePackages: [
    "@motanos/design-system",
    "@motanos/branding",
    "@motanos/i18n",
  ],
  poweredByHeader: false,
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      { source: "/motanos", destination: "/", permanent: true },
      { source: "/motanos/:path*", destination: "/", permanent: true },
      { source: "/planes", destination: "/", permanent: true },
      { source: "/planes/:path*", destination: "/", permanent: true },
      { source: "/solicitud", destination: "/", permanent: true },
      { source: "/solicitud/:path*", destination: "/", permanent: true },
      { source: "/motans", destination: "/", permanent: true },
      { source: "/motans/:path*", destination: "/", permanent: true },
      { source: "/legal", destination: "/legal/aviso-legal", permanent: true },
      { source: "/legal/servicios", destination: "/legal/aviso-legal", permanent: true },
      {
        source: "/legal/contacto-legal",
        destination: "/legal/privacidad",
        permanent: true,
      },
      {
        source: "/legal/accesibilidad",
        destination: "/legal/aviso-legal",
        permanent: true,
      },
    ];
  },
  webpack: (config) => {
    config.resolve ??= {};
    config.resolve.extensionAlias = {
      ".js": [".ts", ".tsx", ".js"],
      ".jsx": [".tsx", ".jsx"],
    };
    return config;
  },
};

export default nextConfig;
