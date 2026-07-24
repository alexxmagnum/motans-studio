import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@motanos/design-system",
    "@motanos/branding",
    "@motanos/i18n",
  ],
  output: "export",
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/motans",
        destination: "/motanos",
        permanent: true,
      },
      {
        source: "/motans/:path*",
        destination: "/motanos/:path*",
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
