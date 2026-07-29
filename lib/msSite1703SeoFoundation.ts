/**
 * MS_SITE_17_03C — SEO premium: copy natural, metadata Next.js y datos estructurados.
 */

import type { Metadata } from "next";

import { MOTANS_CORPORATE_BRAND_ASSETS } from "@motanos/branding";
import { MS_SITE_PUBLIC_MOTANOS_VISIBLE } from "./msSite1701Foundation.js";

/** Origen público del site (override en despliegue con NEXT_PUBLIC_MS_SITE_ORIGIN). */
export const MS_SITE_PUBLIC_ORIGIN =
  (typeof process !== "undefined" &&
    process.env.NEXT_PUBLIC_MS_SITE_ORIGIN?.replace(/\/$/, "")) ||
  "https://motans.studio";

export const MS_SITE_SEO = {
  home: {
    title: "Motans Studio · Software a medida, desarrollo web, SaaS e IA",
    description:
      "Motans Studio construye software a medida, webs, plataformas SaaS, automatización e inteligencia artificial. Productos digitales hechos para operar — con precisión de estudio.",
    path: "/",
    keywords: [
      "Motans Studio",
      "software a medida",
      "desarrollo de software",
      "desarrollo web",
      "desarrollo SaaS",
      "automatización empresarial",
      "inteligencia artificial",
      "plataformas digitales",
      "desarrollo web premium",
      "software para empresas",
    ],
  },
  studio: {
    title: "Motans Studio · Software a medida, desarrollo web, SaaS e IA",
    description:
      "Motans Studio construye software a medida, webs, plataformas SaaS, automatización e inteligencia artificial. Productos digitales hechos para operar — con precisión de estudio.",
    path: "/",
    keywords: [
      "Motans Studio",
      "software a medida",
      "desarrollo de software",
      "desarrollo web",
      "desarrollo SaaS",
      "automatización empresarial",
      "inteligencia artificial",
      "plataformas digitales",
    ],
  },
  servicios: {
    title: "Servicios digitales · Motans Studio",
    description: MS_SITE_PUBLIC_MOTANOS_VISIBLE
      ? "Desarrollo web, diseño web, plataformas SaaS, automatización, software a medida y productos digitales por Motans Studio. MotanOS — sistema operativo para negocios."
      : "Software a medida, diseño UX/UI, plataformas SaaS, automatización e inteligencia artificial por Motans Studio.",
    path: "/servicios",
    keywords: MS_SITE_PUBLIC_MOTANOS_VISIBLE
      ? [
          "Motans Studio",
          "desarrollo web",
          "diseño web",
          "plataformas SaaS",
          "automatización",
          "software a medida",
          "productos digitales",
          "MotanOS",
        ]
      : [
          "Motans Studio",
          "desarrollo web",
          "diseño UX/UI",
          "plataformas SaaS",
          "automatización",
          "software a medida",
          "inteligencia artificial",
          "productos digitales",
        ],
  },
  motanos: {
    title: "MotanOS · Sistema operativo para negocios | Motans Studio",
    description:
      "MotanOS by Motans Studio: carta, mesas y operativa con validación staff. Crece por módulos; MotanOS Hostelería es el primer vertical disponible.",
    path: "/motanos",
    keywords: ["MotanOS", "Motans Studio", "SaaS negocios", "hostelería", "carta QR"],
  },
  hosteleria: {
    title: "MotanOS Hostelería · Sistema operativo para restaurantes | Motans Studio",
    description:
      "Dirige tu restaurante desde el trabajo real: carta, QR, pedidos, equipo y servicio en un único sistema operativo. Empieza por lo esencial; mejora después.",
    path: "/motanos/hosteleria",
    keywords: [
      "MotanOS Hostelería",
      "restaurantes",
      "carta QR",
      "pedido mesa",
      "Motans Studio",
    ],
  },
  contacto: {
    title: "Contacto · Motans Studio",
    description: MS_SITE_PUBLIC_MOTANOS_VISIBLE
      ? "Hablemos con Motans Studio: webs, apps y MotanOS para hostelería. Cuéntanos tu proyecto."
      : "Hablemos con Motans Studio: software a medida, plataformas SaaS, automatización e inteligencia artificial. Cuéntanos tu proyecto.",
    path: "/contacto",
    keywords: MS_SITE_PUBLIC_MOTANOS_VISIBLE
      ? ["contacto Motans Studio", "demo MotanOS", "presupuesto"]
      : [
          "contacto Motans Studio",
          "desarrollo web",
          "desarrollo SaaS",
          "software a medida",
          "presupuesto",
        ],
  },
  planes: {
    title: "Planes MotanOS Hostelería · Orientativos | Motans Studio",
    description:
      "Compara planes conceptuales de MotanOS Hostelería. España mercado activo; otros países próximamente. Sin checkout en este site.",
    path: "/planes",
    keywords: ["planes MotanOS", "precios orientativos", "hostelería", "Motans Studio"],
  },
  solicitud: {
    title: "Configuración asistida MotanOS · Motans Studio",
    description:
      "Solicita que Motans Studio configure MotanOS en tu bar o restaurante. Respuesta orientativa en 24 horas.",
    path: "/solicitud",
    keywords: ["configuración asistida", "onboarding MotanOS", "Motans Studio"],
  },
  legal: {
    title: "Información legal · Motans Studio",
    description: MS_SITE_PUBLIC_MOTANOS_VISIBLE
      ? "Privacidad, cookies y términos de uso del site comercial Motans Studio y MotanOS."
      : "Centro legal Motans Studio: aviso legal, privacidad, cookies, condiciones y accesibilidad.",
    path: "/legal",
    keywords: ["privacidad", "cookies", "términos", "Motans Studio", "aviso legal"],
  },
  legalAviso: {
    title: "Aviso legal · Motans Studio",
    description: "Aviso legal e información societaria del sitio Motans Studio.",
    path: "/legal/aviso-legal",
    keywords: ["aviso legal", "Motans Studio"],
  },
  legalPrivacidad: {
    title: "Política de privacidad · Motans Studio",
    description: "Política de privacidad y tratamiento de datos en Motans Studio.",
    path: "/legal/privacidad",
    keywords: ["privacidad", "datos personales", "Motans Studio"],
  },
  legalCookies: {
    title: "Política de cookies · Motans Studio",
    description: "Política de cookies y gestión del consentimiento en Motans Studio.",
    path: "/legal/cookies",
    keywords: ["cookies", "consentimiento", "Motans Studio"],
  },
  legalCondiciones: {
    title: "Condiciones de uso · Motans Studio",
    description: "Condiciones de uso del sitio web de Motans Studio.",
    path: "/legal/condiciones",
    keywords: ["condiciones de uso", "términos", "Motans Studio"],
  },
  legalServicios: {
    title: "Política de servicios · Motans Studio",
    description: "Marco orientativo de prestación de servicios de Motans Studio.",
    path: "/legal/servicios",
    keywords: ["servicios", "política de servicios", "Motans Studio"],
  },
  legalContacto: {
    title: "Contacto legal · Motans Studio",
    description: "Canales de contacto legal y de privacidad de Motans Studio.",
    path: "/legal/contacto-legal",
    keywords: ["contacto legal", "privacidad", "Motans Studio"],
  },
  legalAccesibilidad: {
    title: "Accesibilidad · Motans Studio",
    description: "Compromiso de accesibilidad del sitio Motans Studio.",
    path: "/legal/accesibilidad",
    keywords: ["accesibilidad", "WCAG", "Motans Studio"],
  },
} as const;

export type MsSiteSeoPageKey = keyof typeof MS_SITE_SEO;

const MS_SITE_OG_LOCALE = "es_ES" as const;

function absoluteUrl(path: string): string {
  return path === "/" ? MS_SITE_PUBLIC_ORIGIN : `${MS_SITE_PUBLIC_ORIGIN}${path}`;
}

/** Metadata Next.js coherente por página (título, OG, Twitter, canonical, icons). */
export function createMsSitePageMetadata(page: MsSiteSeoPageKey): Metadata {
  const seo = MS_SITE_SEO[page];
  const canonical = absoluteUrl(seo.path);
  const ogImagePath = MOTANS_CORPORATE_BRAND_ASSETS.markMsPng.publicPath;
  const ogImageUrl = absoluteUrl(ogImagePath);

  return {
    title: seo.title,
    description: seo.description,
    keywords: [...seo.keywords],
    authors: [{ name: "Motans Studio", url: MS_SITE_PUBLIC_ORIGIN }],
    creator: "Motans Studio",
    publisher: "Motans Studio",
    metadataBase: new URL(MS_SITE_PUBLIC_ORIGIN),
    alternates: { canonical },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: ogImagePath, type: "image/png", sizes: "32x32" },
        { url: ogImagePath, type: "image/png", sizes: "192x192" },
      ],
      apple: [{ url: ogImagePath, type: "image/png", sizes: "180x180" }],
      shortcut: "/favicon.ico",
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: canonical,
      siteName: "Motans Studio",
      locale: MS_SITE_OG_LOCALE,
      type: "website",
      images: [
        {
          url: ogImageUrl,
          width: MOTANS_CORPORATE_BRAND_ASSETS.markMsPng.width ?? 1024,
          height: MOTANS_CORPORATE_BRAND_ASSETS.markMsPng.height ?? 1024,
          alt: MOTANS_CORPORATE_BRAND_ASSETS.markMsPng.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [ogImageUrl],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

const MS_SITE_HOME_ORGANIZATION_JSON_LD = {
  "@type": "Organization",
  "@id": `${MS_SITE_PUBLIC_ORIGIN}/#organization`,
  name: "Motans Studio",
  url: MS_SITE_PUBLIC_ORIGIN,
  logo: `${MS_SITE_PUBLIC_ORIGIN}${MOTANS_CORPORATE_BRAND_ASSETS.markMsPng.publicPath}`,
  email: "info@motans.studio",
  description: MS_SITE_SEO.home.description,
  ...(MS_SITE_PUBLIC_MOTANOS_VISIBLE
    ? {
        brand: {
          "@type": "Brand",
          name: "MotanOS",
        },
      }
    : {}),
} as const;

/** Conservado — nodo MotanOS para reactivar en JSON-LD público. */
export const MS_SITE_MOTANOS_SOFTWARE_JSON_LD = {
  "@type": "SoftwareApplication",
  "@id": `${MS_SITE_PUBLIC_ORIGIN}/#motanos`,
  name: "MotanOS",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "Proyecto de innovación de Motans Studio actualmente en desarrollo: plataforma para la digitalización de negocios. No comercializado como producto disponible en este site.",
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/PreOrder",
  },
  brand: {
    "@type": "Brand",
    name: "MotanOS",
  },
  publisher: { "@id": `${MS_SITE_PUBLIC_ORIGIN}/#organization` },
  url: `${MS_SITE_PUBLIC_ORIGIN}/motanos`,
} as const;

export const MS_SITE_HOME_JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    MS_SITE_HOME_ORGANIZATION_JSON_LD,
    {
      "@type": "WebSite",
      "@id": `${MS_SITE_PUBLIC_ORIGIN}/#website`,
      url: MS_SITE_PUBLIC_ORIGIN,
      name: "Motans Studio",
      description: MS_SITE_SEO.home.description,
      inLanguage: "es-ES",
      publisher: { "@id": `${MS_SITE_PUBLIC_ORIGIN}/#organization` },
    },
    {
      "@type": "WebPage",
      "@id": `${MS_SITE_PUBLIC_ORIGIN}/#webpage`,
      url: MS_SITE_PUBLIC_ORIGIN,
      name: MS_SITE_SEO.home.title,
      description: MS_SITE_SEO.home.description,
      isPartOf: { "@id": `${MS_SITE_PUBLIC_ORIGIN}/#website` },
      about: { "@id": `${MS_SITE_PUBLIC_ORIGIN}/#organization` },
      inLanguage: "es-ES",
    },
    ...(MS_SITE_PUBLIC_MOTANOS_VISIBLE ? [MS_SITE_MOTANOS_SOFTWARE_JSON_LD] : []),
  ],
} as const;

export const MS_SITE_SITEMAP_PATHS: readonly string[] = [
  "/",
  "/servicios",
  "/contacto",
  "/legal",
  "/legal/aviso-legal",
  "/legal/privacidad",
  "/legal/cookies",
  "/legal/condiciones",
  "/legal/servicios",
  "/legal/contacto-legal",
  "/legal/accesibilidad",
  ...(MS_SITE_PUBLIC_MOTANOS_VISIBLE
    ? (["/motanos", "/motanos/hosteleria", "/planes", "/solicitud"] as const)
    : ([] as const)),
];
