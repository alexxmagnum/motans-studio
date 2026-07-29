/**
 * Motans Studio — documentos legales mínimos (producción).
 * Solo: Aviso legal, Privacidad, Cookies, Condiciones de uso.
 */

import {
  MS_SITE_IDENTITY,
  MS_SITE_OFFICIAL_ORIGIN,
} from "./msSiteIdentityFoundation.js";

export const MS_SITE_LEGAL_BLOCK_ID = "MS_SITE_LEGAL_PAGES_V3" as const;

export type MsSiteLegalPageId =
  | "aviso-legal"
  | "privacidad"
  | "cookies"
  | "condiciones";

export type MsSiteLegalSection = {
  readonly heading: string;
  readonly paragraphs: readonly string[];
  readonly bullets?: readonly string[];
};

export type MsSiteLegalPage = {
  readonly id: MsSiteLegalPageId;
  readonly path: string;
  readonly title: string;
  readonly description: string;
  readonly kicker: string;
  readonly sections: readonly MsSiteLegalSection[];
};

/** Identificación del titular — solo en Aviso legal. */
const MS_SITE_LEGAL_IDENTIFICATION = [
  `Nombre comercial: ${MS_SITE_IDENTITY.brand}`,
  `Titular: ${MS_SITE_IDENTITY.legalName}`,
  `NIE: ${MS_SITE_IDENTITY.taxId}`,
  "Domicilio:",
  "Av. Castellón 1",
  "Bloque 2",
  "Escalera 3",
  "Apartamento 231",
  `${MS_SITE_IDENTITY.address.postalCode} ${MS_SITE_IDENTITY.address.addressLocality}`,
  MS_SITE_IDENTITY.address.addressRegion,
  MS_SITE_IDENTITY.address.countryName,
  `Correo electrónico: ${MS_SITE_IDENTITY.email}`,
  `Teléfono: ${MS_SITE_IDENTITY.phone}`,
  `WhatsApp: ${MS_SITE_IDENTITY.phone}`,
  `Sitio web: ${MS_SITE_OFFICIAL_ORIGIN}`,
] as const;

export const MS_SITE_LEGAL_PAGES: readonly MsSiteLegalPage[] = [
  {
    id: "aviso-legal",
    path: "/legal/aviso-legal",
    title: "Aviso legal",
    description: "Identificación del titular y marco legal del sitio Motans Studio.",
    kicker: "Legal",
    sections: [
      {
        heading: "Identificación",
        paragraphs: MS_SITE_LEGAL_IDENTIFICATION,
      },
      {
        heading: "Objeto del sitio web",
        paragraphs: [
          "Este sitio informa sobre los servicios de Motans Studio: software a medida, plataformas SaaS, aplicaciones web, automatización, integraciones, diseño UX/UI e inteligencia artificial aplicada.",
        ],
      },
      {
        heading: "Propiedad intelectual",
        paragraphs: [
          "Los textos, marcas, logotipos, diseños y código de este sitio pertenecen a Motans Studio o a sus legítimos titulares. Queda prohibida su reproducción sin autorización escrita.",
        ],
      },
      {
        heading: "Limitación de responsabilidad",
        paragraphs: [
          "La información del sitio es orientativa. Motans Studio no garantiza la ausencia de errores ni la vigencia permanente de descripciones hasta confirmación por escrito o contrato.",
        ],
      },
      {
        heading: "Legislación y jurisdicción",
        paragraphs: [
          "Este aviso se rige por la legislación española. Para cualquier controversia, serán competentes los juzgados del domicilio del titular, salvo norma imperativa en contrario.",
        ],
      },
    ],
  },
  {
    id: "privacidad",
    path: "/legal/privacidad",
    title: "Política de privacidad",
    description: "Tratamiento de datos personales en el sitio Motans Studio.",
    kicker: "Privacidad",
    sections: [
      {
        heading: "Datos que se recogen",
        paragraphs: [
          "Los datos que facilitas en el formulario de contacto: nombre, email y, si los aportas, empresa, sector, tipo de proyecto y mensaje.",
        ],
      },
      {
        heading: "Finalidad",
        paragraphs: [
          "Responder a tu solicitud y gestionar la relación comercial derivada.",
        ],
      },
      {
        heading: "Base jurídica",
        paragraphs: [
          "Tu consentimiento y, cuando aplique, la adopción de medidas precontractuales a petición tuya (art. 6.1.a y 6.1.b del RGPD).",
        ],
      },
      {
        heading: "Conservación",
        paragraphs: [
          "Durante el tiempo necesario para atender la solicitud, la relación comercial y las obligaciones legales aplicables.",
        ],
      },
      {
        heading: "Destinatarios",
        paragraphs: [
          "No se ceden datos a terceros salvo proveedores necesarios para operar el sitio y el correo (por ejemplo, hosting), o cuando lo exija la ley.",
        ],
      },
      {
        heading: "Derechos",
        paragraphs: [
          "Puedes ejercer acceso, rectificación, supresión, oposición, limitación y portabilidad. También puedes reclamar ante la Agencia Española de Protección de Datos.",
        ],
      },
      {
        heading: "Contacto",
        paragraphs: [
          `Para ejercer tus derechos o consultas de privacidad: ${MS_SITE_IDENTITY.email}.`,
          "La identificación completa del responsable figura en el Aviso legal.",
        ],
      },
    ],
  },
  {
    id: "cookies",
    path: "/legal/cookies",
    title: "Política de cookies",
    description: "Cookies y gestión del consentimiento en Motans Studio.",
    kicker: "Cookies",
    sections: [
      {
        heading: "Qué cookies utiliza el sitio",
        paragraphs: [
          "Actualmente solo se usan cookies o almacenamiento local necesarios para recordar tu preferencia de consentimiento.",
        ],
      },
      {
        heading: "Para qué sirven",
        paragraphs: [
          "Guardar si aceptas, rechazas o configuras el uso de cookies no esenciales. No se usan cookies de analítica ni de marketing mientras no se activen y se documenten aquí.",
        ],
      },
      {
        heading: "Cómo configurarlas",
        paragraphs: [
          "Desde el panel de cookies del sitio puedes aceptar, rechazar o elegir categorías. También desde «Configurar cookies» en el pie de página.",
        ],
      },
      {
        heading: "Cómo retirarlas",
        paragraphs: [
          "Puedes cambiar o retirar tu consentimiento en cualquier momento desde «Configurar cookies». También puedes borrar las cookies desde la configuración de tu navegador.",
        ],
      },
    ],
  },
  {
    id: "condiciones",
    path: "/legal/condiciones",
    title: "Condiciones de uso",
    description: "Condiciones de acceso y uso del sitio Motans Studio.",
    kicker: "Uso",
    sections: [
      {
        heading: "Uso permitido",
        paragraphs: [
          "El sitio es informativo y comercial. Debes usarlo de forma lícita. Queda prohibido el uso fraudulento, la extracción masiva de contenidos o cualquier acción que afecte a la seguridad o disponibilidad del sitio.",
        ],
      },
      {
        heading: "Propiedad intelectual",
        paragraphs: [
          "El contenido del sitio está protegido. No puedes copiarlo, distribuirlo ni explotarlo sin autorización escrita de Motans Studio, salvo el uso personal necesario para navegar.",
        ],
      },
      {
        heading: "Exclusión de responsabilidad",
        paragraphs: [
          "Motans Studio no responde de daños derivados del uso del sitio ni de la interpretación de la información publicada, que es orientativa hasta confirmación por escrito o contrato.",
        ],
      },
      {
        heading: "Legislación aplicable",
        paragraphs: [
          "Estas condiciones se rigen por la legislación española. Cualquier controversia se someterá a los juzgados del domicilio del titular, salvo norma imperativa en contrario.",
        ],
      },
    ],
  },
] as const;

export function getMsSiteLegalPage(id: MsSiteLegalPageId): MsSiteLegalPage {
  const page = MS_SITE_LEGAL_PAGES.find((item) => item.id === id);
  if (!page) {
    throw new Error(`Unknown legal page: ${id}`);
  }
  return page;
}
