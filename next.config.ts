import type { NextConfig } from "next";

/**
 * Fase 0: rutas MotanOS / planes / solicitud redirigen a home (superficie studio-only).
 * Con `output: "export"`, Next no aplica `redirects` en el export estático;
 * Vercel usa `vercel.json`. Las páginas en `app/motanos|planes|solicitud` también
 * redirigen en cliente para preview local / estático.
 */
const nextConfig: NextConfig = {
  transpilePackages: [
    "@motanos/design-system",
    "@motanos/branding",
    "@motanos/i18n",
  ],
  output: "export",
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
