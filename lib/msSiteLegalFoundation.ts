/**
 * Motans Studio — páginas legales (Fase 6).
 * Contenido claramente marcado como plantilla editable — no es asesoramiento legal.
 */

export const MS_SITE_LEGAL_BLOCK_ID = "MS_SITE_LEGAL_PAGES_V1" as const;

export type MsSiteLegalPageId =
  | "hub"
  | "aviso-legal"
  | "privacidad"
  | "cookies"
  | "condiciones"
  | "servicios"
  | "contacto-legal"
  | "accesibilidad";

export type MsSiteLegalSection = {
  readonly heading: string;
  readonly paragraphs: readonly string[];
  readonly bullets?: readonly string[];
  readonly editableNote?: string;
};

export type MsSiteLegalPage = {
  readonly id: MsSiteLegalPageId;
  readonly path: string;
  readonly title: string;
  readonly description: string;
  readonly kicker: string;
  readonly templateBanner: string;
  readonly sections: readonly MsSiteLegalSection[];
};

const TEMPLATE_BANNER =
  "Plantilla editable — contenido orientativo pendiente de revisión legal profesional. No constituye asesoramiento jurídico.";

export const MS_SITE_LEGAL_PAGES: readonly MsSiteLegalPage[] = [
  {
    id: "aviso-legal",
    path: "/legal/aviso-legal",
    title: "Aviso legal",
    description: "Información societaria y condiciones de uso del sitio Motans Studio.",
    kicker: "Legal",
    templateBanner: TEMPLATE_BANNER,
    sections: [
      {
        heading: "Titular del sitio",
        paragraphs: [
          "[EDITAR] Razón social / nombre comercial: Motans Studio.",
          "[EDITAR] NIF/CIF, domicilio social y datos de registro mercantil.",
        ],
        editableNote: "Completar con datos societarios reales antes de producción.",
      },
      {
        heading: "Objeto",
        paragraphs: [
          "Este sitio web ofrece información comercial sobre los servicios de Motans Studio: diseño y desarrollo de productos digitales, software a medida, plataformas SaaS, automatización e inteligencia artificial.",
        ],
      },
      {
        heading: "Propiedad intelectual",
        paragraphs: [
          "Los textos, marcas, logotipos, diseños y código visibles en este sitio están protegidos. Queda prohibida su reproducción sin autorización escrita de Motans Studio.",
        ],
      },
      {
        heading: "Limitación de responsabilidad",
        paragraphs: [
          "La información publicada tiene carácter orientativo. Motans Studio no garantiza la ausencia de errores tipográficos ni la vigencia permanente de precios o disponibilidad descritos en el sitio.",
        ],
      },
    ],
  },
  {
    id: "privacidad",
    path: "/legal/privacidad",
    title: "Política de privacidad",
    description: "Cómo Motans Studio trata los datos personales en el sitio comercial.",
    kicker: "Privacidad",
    templateBanner: TEMPLATE_BANNER,
    sections: [
      {
        heading: "Responsable del tratamiento",
        paragraphs: [
          "[EDITAR] Identidad y datos de contacto del responsable del tratamiento.",
          "Email de contacto de privacidad: [EDITAR] privacy@motans.studio",
        ],
      },
      {
        heading: "Datos que tratamos",
        paragraphs: [
          "Datos facilitados en formularios de contacto (nombre, email, empresa, mensaje y preferencias de proyecto).",
        ],
        bullets: [
          "Finalidad: responder solicitudes y gestionar la relación comercial.",
          "Base jurídica: [EDITAR] consentimiento / medidas precontractuales.",
          "Conservación: el tiempo necesario para la relación y obligaciones legales.",
        ],
      },
      {
        heading: "Derechos",
        paragraphs: [
          "Puedes ejercer acceso, rectificación, supresión, oposición, limitación y portabilidad conforme a la normativa aplicable, contactando en la dirección indicada.",
        ],
      },
      {
        heading: "Encargados y transferencias",
        paragraphs: [
          "[EDITAR] Proveedores de hosting, email y herramientas de gestión. Indicar si hay transferencias internacionales y garantías aplicadas.",
        ],
      },
    ],
  },
  {
    id: "cookies",
    path: "/legal/cookies",
    title: "Política de cookies",
    description: "Uso de cookies y tecnologías similares en motans.studio.",
    kicker: "Cookies",
    templateBanner: TEMPLATE_BANNER,
    sections: [
      {
        heading: "Qué son las cookies",
        paragraphs: [
          "Las cookies son pequeños archivos que el sitio puede almacenar en tu dispositivo para recordar preferencias o medir el uso del servicio.",
        ],
      },
      {
        heading: "Categorías",
        paragraphs: ["Clasificamos las cookies en las siguientes categorías:"],
        bullets: [
          "Necesarias — imprescindibles para el funcionamiento del sitio (siempre activas).",
          "Analíticas — miden tráfico y uso (solo con consentimiento).",
          "Marketing — publicidad y remarketing (solo con consentimiento).",
          "Preferencias — recuerdan opciones de interfaz (solo con consentimiento).",
          "Funcionales — mejoran funciones no esenciales (solo con consentimiento).",
        ],
      },
      {
        heading: "Gestión del consentimiento",
        paragraphs: [
          "Puedes aceptar, rechazar o configurar categorías desde el panel de cookies del sitio. Puedes cambiar tu elección en cualquier momento desde el enlace «Configurar cookies» del pie de página.",
        ],
      },
      {
        heading: "Listado detallado",
        paragraphs: [
          "[EDITAR] Tabla de cookies concretas (nombre, proveedor, duración, finalidad) cuando se activen integraciones (Analytics, Meta Pixel, etc.).",
        ],
        editableNote: "Mantener sincronizado con el panel de consentimiento.",
      },
    ],
  },
  {
    id: "condiciones",
    path: "/legal/condiciones",
    title: "Condiciones de uso",
    description: "Condiciones de acceso y uso del sitio web de Motans Studio.",
    kicker: "Uso",
    templateBanner: TEMPLATE_BANNER,
    sections: [
      {
        heading: "Aceptación",
        paragraphs: [
          "El acceso y uso de este sitio implica la aceptación de estas condiciones. Si no estás de acuerdo, te rogamos que no utilices el sitio.",
        ],
      },
      {
        heading: "Uso permitido",
        paragraphs: [
          "El sitio es una vitrina comercial informativa. Queda prohibido el uso fraudulento, la extracción masiva de contenidos o cualquier actividad que degrade la seguridad o disponibilidad del servicio.",
        ],
      },
      {
        heading: "Contenidos y ofertas",
        paragraphs: [
          "Descripciones de servicios, plazos y precios son orientativos hasta confirmación por escrito o contrato.",
        ],
      },
    ],
  },
  {
    id: "servicios",
    path: "/legal/servicios",
    title: "Política de servicios",
    description: "Marco orientativo de prestación de servicios de Motans Studio.",
    kicker: "Servicios",
    templateBanner: TEMPLATE_BANNER,
    sections: [
      {
        heading: "Alcance",
        paragraphs: [
          "Motans Studio presta servicios de diseño y desarrollo de software, webs, plataformas SaaS, automatización e inteligencia artificial bajo encargo.",
        ],
      },
      {
        heading: "Proceso y entregables",
        paragraphs: [
          "El alcance, plazos, ownership del código y criterios de aceptación se definen en propuesta o contrato específico por proyecto.",
        ],
        editableNote: "Enlazar a plantillas de contrato / SOW cuando existan.",
      },
      {
        heading: "Soporte y mantenimiento",
        paragraphs: [
          "[EDITAR] Condiciones de soporte post-entrega, SLAs y exclusiones.",
        ],
      },
    ],
  },
  {
    id: "contacto-legal",
    path: "/legal/contacto-legal",
    title: "Contacto legal",
    description: "Canales de contacto para asuntos legales y de privacidad.",
    kicker: "Contacto",
    templateBanner: TEMPLATE_BANNER,
    sections: [
      {
        heading: "Canales",
        paragraphs: [
          "Email general: info@motans.studio",
          "[EDITAR] Email legal / privacidad: legal@motans.studio",
          "[EDITAR] Domicilio a efectos de notificaciones.",
        ],
      },
      {
        heading: "Horario orientativo",
        paragraphs: [
          "[EDITAR] Días laborables y franja horaria de respuesta (p. ej. 24–48 h laborables).",
        ],
      },
    ],
  },
  {
    id: "accesibilidad",
    path: "/legal/accesibilidad",
    title: "Accesibilidad",
    description: "Compromiso de accesibilidad del sitio Motans Studio.",
    kicker: "Accesibilidad",
    templateBanner: TEMPLATE_BANNER,
    sections: [
      {
        heading: "Compromiso",
        paragraphs: [
          "Motans Studio trabaja para que este sitio sea usable con teclado, lectores de pantalla y contrastes adecuados, alineado con buenas prácticas WCAG.",
        ],
      },
      {
        heading: "Estado",
        paragraphs: [
          "Se revisan de forma continua focus visible, etiquetas ARIA, estructura semántica y responsive. Si encuentras una barrera, escríbenos a info@motans.studio.",
        ],
      },
      {
        heading: "Mejoras previstas",
        paragraphs: [
          "[EDITAR] Roadmap de auditorías y correcciones de accesibilidad.",
        ],
      },
    ],
  },
] as const;

export const MS_SITE_LEGAL_HUB = {
  id: "hub" as const,
  path: "/legal",
  title: "Información legal",
  description: "Centro de documentos legales y de cumplimiento de Motans Studio.",
  kicker: "Cumplimiento",
  intro:
    "Documentación legal del sitio comercial. Los textos marcados como plantilla deben revisarse con asesoramiento profesional antes de producción.",
} as const;

export function getMsSiteLegalPage(id: Exclude<MsSiteLegalPageId, "hub">): MsSiteLegalPage {
  const page = MS_SITE_LEGAL_PAGES.find((item) => item.id === id);
  if (!page) {
    throw new Error(`Unknown legal page: ${id}`);
  }
  return page;
}
