/**

 * MotanOS Hostelería landing V2 — narrative copy (commercial-site only).

 */



export const MS_HOSTELERIA_LANDING = {

  productLabel: "MotanOS Hostelería",

  parentLabel: "Motans Studio",

  nav: [

    { href: "#problema", label: "Problema" },

    { href: "#empezar", label: "Cómo funciona" },

    { href: "#sistema", label: "Sistema operativo" },

    { href: "#probar", label: "Probar" },

  ] as const,

  hero: {
    headline: "Nada empieza de cero.",
    line: "MotanOS Hostelería.",
    ctaLabel: "Descubrir MotanOS",
    ctaHref: "#empezar",
    keyVisualSrc: "/hero/hosteleria-frame-master-v1.webp",
    stampSrc: "/hero/sources/motanos-stamp-official.png",
    stampWidth: 88,
    stampHeight: 88,
  },

  problem: {

    title: "El restaurante ya funciona. El software suele estorbar.",

    lead: "Herramientas separadas, decisiones tarde y el dueño apagando fuegos.",

    items: [

      "WhatsApp",

      "Libreta",

      "TPV separado",

      "Reservas aparte",

      "Cocina esperando",

      "Dueño decidiendo tarde",

    ] as const,

  },

  answer: {

    title: "MotanOS convierte la operativa diaria en un sistema.",

    lead: "MotanOS no empieza pidiéndote que configures todo. Empieza ayudándote a operar.",

    items: [

      "Carta",

      "Pedidos",

      "Validación",

      "Cocina",

      "Sala",

      "Briefing",

      "Mejoras",

    ] as const,

  },

  startSimple: {

    title: "Empieza con carta, QR y tu primer pedido.",

    lead: "Es el primer paso hacia un restaurante más ordenado — no todo el producto de golpe.",

    steps: [

      {

        id: "carta",

        title: "Publica tu carta",

        text: "Una carta viva para el local: platos, precios y alérgenos.",

      },

      {

        id: "qr",

        title: "Coloca el QR en la mesa",

        text: "Cada mesa con su código. El comensal entra directo.",

      },

      {

        id: "pedido",

        title: "El cliente propone el pedido",

        text: "Desde el móvil, sin gritos ni libreta perdida.",

      },

      {

        id: "valida",

        title: "Tu equipo valida antes de cocina",

        text: "Sala confirma, edita o rechaza. Cocina solo recibe lo validado.",

      },

    ] as const,

  },

  system: {

    title: "Todo lo importante empieza a hablar el mismo idioma.",

    lead: "Un centro operativo donde sala, carta, pedidos y equipo comparten el mismo flujo — sin herramientas sueltas.",

    areas: [

      { id: "sala", label: "Sala", text: "Servicio coordinado, mesa a mesa." },

      { id: "carta", label: "Carta", text: "La fuente real del local." },

      { id: "pedidos", label: "Pedidos", text: "Desde la mesa, con validación." },

      { id: "equipo", label: "Equipo", text: "Roles y turnos cuando toque." },

      { id: "reservas", label: "Reservas", text: "Integradas cuando el local crezca." },

      { id: "briefing", label: "Briefing", text: "Alinear al equipo antes del servicio." },

      { id: "mejoras", label: "Mejoras", text: "Refinar con calma, sin prisa." },

    ] as const,

  },

  workFirst: {

    title: "Primero trabajas. Después mejoras.",

    lead: "No tienes que montar todo el primer día. Operas primero; optimizas cuando el servicio lo pida.",

    phases: [

      { id: "work", title: "Trabajar", text: "Carta, QR y pedidos validados en sala." },

      { id: "improve", title: "Mejorar", text: "Ajusta platos, zonas y flujo con calma." },

      { id: "optimize", title: "Optimizar", text: "Refina tiempos y coordinación del equipo." },

      { id: "grow", title: "Crecer", text: "Más locales o más servicio cuando toque." },

    ] as const,

  },

  notThis: {

    title: "Qué NO es MotanOS",

    lead: "MotanOS empieza por ayudarte a operar mejor.",

    items: [

      "un ERP",

      "un panel de métricas",

      "un TPV completo",

      "una app de reservas más",

      "un chatbot de IA",

    ] as const,

  },

  finalCta: {

    title: "Empieza por lo esencial. Construye el resto con calma.",

    subtitle: "Te enseñamos lo que ya puedes probar hoy y lo que sigue en piloto.",

    ctaPrimary: "Probar MotanOS",

    ctaSecondary: "Hablar con Motans Studio",

  },

} as const;


