/**
 * Motans Studio — editorial landing i18n (Offer, Why, Process).
 * Text maps per locale; getters merge onto Spanish structural bases.
 */

import type { SupportedLanguageCode } from "@motanos/i18n";
import {
  MS_STUDIO_OFFER,
  type MsStudioOfferCard,
} from "./msStudioOfferFoundation.js";
import { MS_STUDIO_WHY } from "./msStudioWhyFoundation.js";
import {
  MS_STUDIO_PROCESS,
  type MsStudioProcessMoment,
} from "./msStudioProcessFoundation.js";

/* ─── Localized copy types (text only) ─── */

export type MsStudioOfferCardCopy = {
  readonly title: string;
  readonly body: string;
};

export type MsStudioOfferCopy = {
  readonly title: string;
  readonly lead: string;
  readonly cards: readonly [
    MsStudioOfferCardCopy,
    MsStudioOfferCardCopy,
    MsStudioOfferCardCopy,
    MsStudioOfferCardCopy,
    MsStudioOfferCardCopy,
  ];
  readonly close: {
    readonly line: string;
    readonly cta: string;
  };
};

export type MsStudioWhyPrincipleCopy = {
  readonly title: string;
  readonly body: string;
};

export type MsStudioWhyCopy = {
  readonly kicker: string;
  readonly headline: {
    readonly line1: string;
    readonly line2: string;
    readonly line3Before: string;
    readonly line3Accent: string;
    readonly line3After: string;
  };
  readonly lead: string;
  readonly manifesto: string;
  readonly principles: readonly [
    MsStudioWhyPrincipleCopy,
    MsStudioWhyPrincipleCopy,
    MsStudioWhyPrincipleCopy,
    MsStudioWhyPrincipleCopy,
  ];
  readonly fit: {
    readonly kicker: string;
    readonly title: string;
    readonly yesLabel: string;
    readonly yes: readonly [string, string, string];
    readonly noLabel: string;
    readonly no: readonly [string, string, string];
  };
  readonly close: {
    readonly line: string;
    readonly cta: string;
  };
};

export type MsStudioProcessMomentCopy = {
  readonly eyebrow?: string;
  readonly title: string;
  readonly body: string;
  readonly aside?: string;
  readonly support?: string;
};

export type MsStudioProcessCopy = {
  readonly kicker: string;
  readonly headline: {
    readonly line1: string;
    readonly line2Before: string;
    readonly line2Accent: string;
    readonly line2After: string;
  };
  readonly lead: string;
  readonly moments: readonly [
    MsStudioProcessMomentCopy,
    MsStudioProcessMomentCopy,
    MsStudioProcessMomentCopy,
    MsStudioProcessMomentCopy,
    MsStudioProcessMomentCopy,
    MsStudioProcessMomentCopy,
  ];
  readonly closing: string;
};

export type MsStudioOfferLocalized = {
  readonly anchorId: typeof MS_STUDIO_OFFER.anchorId;
  readonly title: string;
  readonly lead: string;
  readonly cards: readonly MsStudioOfferCard[];
  readonly close: {
    readonly line: string;
    readonly cta: string;
    readonly href: typeof MS_STUDIO_OFFER.close.href;
  };
};

export type MsStudioWhyLocalized = {
  readonly anchorId: typeof MS_STUDIO_WHY.anchorId;
  readonly kicker: string;
  readonly headline: MsStudioWhyCopy["headline"];
  readonly lead: string;
  readonly manifesto: string;
  readonly principles: readonly {
    readonly id: string;
    readonly index: string;
    readonly layout: (typeof MS_STUDIO_WHY.principles)[number]["layout"];
    readonly title: string;
    readonly body: string;
  }[];
  readonly fit: {
    readonly kicker: string;
    readonly title: string;
    readonly yesLabel: string;
    readonly yes: readonly string[];
    readonly noLabel: string;
    readonly no: readonly string[];
  };
  readonly close: {
    readonly line: string;
    readonly cta: string;
    readonly href: typeof MS_STUDIO_WHY.close.href;
  };
};

export type MsStudioProcessLocalized = {
  readonly anchorId: typeof MS_STUDIO_PROCESS.anchorId;
  readonly kicker: string;
  readonly headline: MsStudioProcessCopy["headline"];
  readonly lead: string;
  readonly moments: readonly MsStudioProcessMoment[];
  readonly closing: string;
};

/* ─── Offer copy ─── */

const MS_STUDIO_OFFER_I18N: Record<SupportedLanguageCode, MsStudioOfferCopy> = {
  es: {
    title: "Qué hacemos",
    lead: "Diseñamos y desarrollamos herramientas digitales adaptadas a cada empresa.",
    cards: [
      {
        title: "Aplicaciones web",
        body: "Herramientas accesibles desde cualquier lugar para gestionar procesos, clientes y operaciones.",
      },
      {
        title: "Plataformas SaaS",
        body: "Productos preparados para crecer contigo y convertirse en parte del día a día de tu empresa.",
      },
      {
        title: "Automatización",
        body: "Reducimos tareas repetitivas conectando procesos y herramientas.",
      },
      {
        title: "Inteligencia Artificial",
        body: "Incorporamos IA cuando realmente aporta valor al trabajo diario.",
      },
      {
        title: "Integraciones",
        body: "Conectamos las herramientas que ya utilizas para que trabajen como un único sistema.",
      },
    ],
    close: {
      line: "Si tu empresa necesita una herramienta digital — o varias — la diseñamos contigo.",
      cta: "Hablemos",
    },
  },
  en: {
    title: "What we do",
    lead: "We design and build digital tools tailored to each company.",
    cards: [
      {
        title: "Web applications",
        body: "Tools accessible from anywhere to manage processes, clients, and operations.",
      },
      {
        title: "SaaS platforms",
        body: "Products built to grow with you and become part of your company's everyday work.",
      },
      {
        title: "Automation",
        body: "We reduce repetitive work by connecting processes and tools.",
      },
      {
        title: "Artificial Intelligence",
        body: "We bring in AI when it truly adds value to daily work.",
      },
      {
        title: "Integrations",
        body: "We connect the tools you already use so they work as one system.",
      },
    ],
    close: {
      line: "If your company needs a digital tool — or several — we design it with you.",
      cta: "Let's talk",
    },
  },
  fr: {
    title: "Ce que nous faisons",
    lead: "Nous concevons et développons des outils numériques adaptés à chaque entreprise.",
    cards: [
      {
        title: "Applications web",
        body: "Des outils accessibles de n'importe où pour gérer processus, clients et opérations.",
      },
      {
        title: "Plateformes SaaS",
        body: "Des produits prêts à grandir avec vous et à faire partie du quotidien de votre entreprise.",
      },
      {
        title: "Automatisation",
        body: "Nous réduisons les tâches répétitives en connectant processus et outils.",
      },
      {
        title: "Intelligence artificielle",
        body: "Nous intégrons l'IA lorsqu'elle apporte vraiment de la valeur au travail quotidien.",
      },
      {
        title: "Intégrations",
        body: "Nous connectons les outils que vous utilisez déjà pour qu'ils fonctionnent comme un seul système.",
      },
    ],
    close: {
      line: "Si votre entreprise a besoin d'un outil numérique — ou de plusieurs — nous le concevons avec vous.",
      cta: "Parlons-en",
    },
  },
  de: {
    title: "Was wir tun",
    lead: "Wir entwerfen und entwickeln digitale Werkzeuge, die zu jedem Unternehmen passen.",
    cards: [
      {
        title: "Webanwendungen",
        body: "Werkzeuge, die von überall zugänglich sind — für Prozesse, Kunden und Betrieb.",
      },
      {
        title: "SaaS-Plattformen",
        body: "Produkte, die mit Ihnen wachsen und Teil des Alltags Ihres Unternehmens werden.",
      },
      {
        title: "Automatisierung",
        body: "Wir reduzieren wiederkehrende Aufgaben, indem wir Prozesse und Werkzeuge verbinden.",
      },
      {
        title: "Künstliche Intelligenz",
        body: "Wir setzen KI ein, wenn sie dem täglichen Arbeiten wirklich Mehrwert bringt.",
      },
      {
        title: "Integrationen",
        body: "Wir verbinden die Werkzeuge, die Sie bereits nutzen, zu einem einzigen System.",
      },
    ],
    close: {
      line: "Wenn Ihr Unternehmen ein digitales Werkzeug braucht — oder mehrere — gestalten wir es gemeinsam.",
      cta: "Sprechen wir",
    },
  },
  it: {
    title: "Cosa facciamo",
    lead: "Progettiamo e sviluppiamo strumenti digitali su misura per ogni azienda.",
    cards: [
      {
        title: "Applicazioni web",
        body: "Strumenti accessibili da qualsiasi luogo per gestire processi, clienti e operazioni.",
      },
      {
        title: "Piattaforme SaaS",
        body: "Prodotti pronti a crescere con te e a diventare parte del quotidiano della tua azienda.",
      },
      {
        title: "Automazione",
        body: "Riduciamo i compiti ripetitivi collegando processi e strumenti.",
      },
      {
        title: "Intelligenza artificiale",
        body: "Integriamo l'IA quando porta davvero valore al lavoro quotidiano.",
      },
      {
        title: "Integrazioni",
        body: "Colleghiamo gli strumenti che già usi perché lavorino come un unico sistema.",
      },
    ],
    close: {
      line: "Se la tua azienda ha bisogno di uno strumento digitale — o di più — lo progettiamo insieme.",
      cta: "Parliamone",
    },
  },
  pt: {
    title: "O que fazemos",
    lead: "Desenhamos e desenvolvemos ferramentas digitais adaptadas a cada empresa.",
    cards: [
      {
        title: "Aplicações web",
        body: "Ferramentas acessíveis de qualquer lugar para gerir processos, clientes e operações.",
      },
      {
        title: "Plataformas SaaS",
        body: "Produtos preparados para crescer consigo e fazer parte do dia a dia da sua empresa.",
      },
      {
        title: "Automatização",
        body: "Reduzimos tarefas repetitivas ligando processos e ferramentas.",
      },
      {
        title: "Inteligência Artificial",
        body: "Incorporamos IA quando realmente acrescenta valor ao trabalho diário.",
      },
      {
        title: "Integrações",
        body: "Ligamos as ferramentas que já utiliza para trabalharem como um único sistema.",
      },
    ],
    close: {
      line: "Se a sua empresa precisa de uma ferramenta digital — ou várias — desenhamos consigo.",
      cta: "Vamos falar",
    },
  },
};

/* ─── Why copy ─── */

const MS_STUDIO_WHY_I18N: Record<SupportedLanguageCode, MsStudioWhyCopy> = {
  es: {
    kicker: "El estudio",
    headline: {
      line1: "No competimos",
      line2: "por hacer webs.",
      line3Before: "Construimos ",
      line3Accent: "productos",
      line3After: ".",
    },
    lead: "Motans Studio existe para empresas que necesitan software con criterio: pensado, diseñado y construido para operar en el tiempo — no para cubrir un entregable.",
    manifesto: "Cada decisión tiene un motivo. Si no lo tiene, no entra.",
    principles: [
      {
        title: "Primero el criterio.",
        body: "Antes de abrir el editor, entendemos el problema real. El código llega cuando la decisión ya está clara.",
      },
      {
        title: "Sistemas, no pantallas.",
        body: "Diseñamos la lógica que sostiene el producto. La interfaz es consecuencia — no el punto de partida.",
      },
      {
        title: "Simplicidad con filo.",
        body: "Quitamos lo que no aporta. Lo que queda tiene que ser exacto, legible y capaz de escalar.",
      },
      {
        title: "Hecho para durar.",
        body: "Preferimos una arquitectura limpia a un efecto brillante. La calidad manda sobre la prisa.",
      },
    ],
    fit: {
      kicker: "Encaje",
      title: "Con quién trabajamos.",
      yesLabel: "Encaja si",
      yes: [
        "Necesitas un producto digital a medida, no una plantilla disfrazada.",
        "Valoras claridad, ownership y decisiones explícitas.",
        "Prefieres menos ruido y más precisión en cada entrega.",
      ],
      noLabel: "No encaja si",
      no: [
        "Buscas el precio más bajo o el plazo imposible.",
        "Quieres reutilizar una plantilla y llamarla producto.",
        "Necesitas un equipo que diga que sí a todo.",
      ],
    },
    close: {
      line: "Si buscas un estudio que construya contigo — no para impresionar — hablemos.",
      cta: "Hablemos",
    },
  },
  en: {
    kicker: "The studio",
    headline: {
      line1: "We do not compete",
      line2: "to make websites.",
      line3Before: "We build ",
      line3Accent: "products",
      line3After: ".",
    },
    lead: "Motans Studio exists for companies that need software with judgment: thought through, designed, and built to operate over time — not to tick off a deliverable.",
    manifesto: "Every decision has a reason. If it does not, it does not ship.",
    principles: [
      {
        title: "Judgment first.",
        body: "Before we open the editor, we understand the real problem. Code arrives when the decision is already clear.",
      },
      {
        title: "Systems, not screens.",
        body: "We design the logic that holds the product up. The interface is a consequence — not the starting point.",
      },
      {
        title: "Sharp simplicity.",
        body: "We remove what does not help. What remains must be exact, readable, and able to scale.",
      },
      {
        title: "Built to last.",
        body: "We prefer a clean architecture over a shiny effect. Quality leads over haste.",
      },
    ],
    fit: {
      kicker: "Fit",
      title: "Who we work with.",
      yesLabel: "A fit if",
      yes: [
        "You need a custom digital product, not a template in disguise.",
        "You value clarity, ownership, and explicit decisions.",
        "You prefer less noise and more precision in every delivery.",
      ],
      noLabel: "Not a fit if",
      no: [
        "You want the lowest price or an impossible deadline.",
        "You want to reuse a template and call it a product.",
        "You need a team that says yes to everything.",
      ],
    },
    close: {
      line: "If you want a studio that builds with you — not to impress — let’s talk.",
      cta: "Let's talk",
    },
  },
  fr: {
    kicker: "Le studio",
    headline: {
      line1: "Nous ne concurrençons pas",
      line2: "pour faire des sites.",
      line3Before: "Nous construisons des ",
      line3Accent: "produits",
      line3After: ".",
    },
    lead: "Motans Studio existe pour les entreprises qui ont besoin de logiciel avec du critère : pensé, conçu et construit pour opérer dans le temps — pas pour cocher une livraison.",
    manifesto: "Chaque décision a une raison. Sinon, elle n’entre pas.",
    principles: [
      {
        title: "D’abord le critère.",
        body: "Avant d’ouvrir l’éditeur, nous comprenons le vrai problème. Le code arrive quand la décision est déjà claire.",
      },
      {
        title: "Des systèmes, pas des écrans.",
        body: "Nous concevons la logique qui porte le produit. L’interface est une conséquence — pas le point de départ.",
      },
      {
        title: "Simplicité tranchante.",
        body: "Nous enlevons ce qui n’apporte rien. Ce qui reste doit être exact, lisible et capable de scaler.",
      },
      {
        title: "Fait pour durer.",
        body: "Nous préférons une architecture propre à un effet brillant. La qualité prime sur la précipitation.",
      },
    ],
    fit: {
      kicker: "Adéquation",
      title: "Avec qui nous travaillons.",
      yesLabel: "Ça colle si",
      yes: [
        "Vous avez besoin d’un produit numérique sur mesure, pas d’un modèle déguisé.",
        "Vous valorisez clarté, ownership et décisions explicites.",
        "Vous préférez moins de bruit et plus de précision à chaque livraison.",
      ],
      noLabel: "Ça ne colle pas si",
      no: [
        "Vous cherchez le prix le plus bas ou le délai impossible.",
        "Vous voulez réutiliser un modèle et l’appeler produit.",
        "Vous avez besoin d’une équipe qui dit oui à tout.",
      ],
    },
    close: {
      line: "Si vous cherchez un studio qui construit avec vous — pas pour impressionner — parlons-en.",
      cta: "Parlons-en",
    },
  },
  de: {
    kicker: "Das Studio",
    headline: {
      line1: "Wir konkurrieren nicht",
      line2: "darum, Websites zu bauen.",
      line3Before: "Wir bauen ",
      line3Accent: "Produkte",
      line3After: ".",
    },
    lead: "Motans Studio existiert für Unternehmen, die Software mit Urteil brauchen: durchdacht, gestaltet und gebaut, um über Zeit zu operieren — nicht um ein Deliverable abzuhaken.",
    manifesto: "Jede Entscheidung hat einen Grund. Hat sie keinen, kommt sie nicht rein.",
    principles: [
      {
        title: "Zuerst das Urteil.",
        body: "Bevor wir den Editor öffnen, verstehen wir das echte Problem. Code kommt, wenn die Entscheidung klar ist.",
      },
      {
        title: "Systeme, keine Screens.",
        body: "Wir gestalten die Logik, die das Produkt trägt. Die Oberfläche ist Folge — nicht Ausgangspunkt.",
      },
      {
        title: "Schärfe in der Einfachheit.",
        body: "Wir streichen, was nichts bringt. Was bleibt, muss exakt, lesbar und skalierbar sein.",
      },
      {
        title: "Für Dauer gebaut.",
        body: "Wir bevorzugen saubere Architektur vor einem glänzenden Effekt. Qualität führt vor Eile.",
      },
    ],
    fit: {
      kicker: "Passung",
      title: "Mit wem wir arbeiten.",
      yesLabel: "Passt, wenn",
      yes: [
        "Sie ein digitales Individualprodukt brauchen, keine getarnte Vorlage.",
        "Sie Klarheit, Ownership und explizite Entscheidungen schätzen.",
        "Sie weniger Lärm und mehr Präzision in jeder Lieferung wollen.",
      ],
      noLabel: "Passt nicht, wenn",
      no: [
        "Sie den niedrigsten Preis oder die unmögliche Frist suchen.",
        "Sie eine Vorlage wiederverwenden und Produkt nennen wollen.",
        "Sie ein Team brauchen, das zu allem Ja sagt.",
      ],
    },
    close: {
      line: "Wenn Sie ein Studio suchen, das mit Ihnen baut — nicht um zu beeindrucken — sprechen wir.",
      cta: "Sprechen wir",
    },
  },
  it: {
    kicker: "Lo studio",
    headline: {
      line1: "Non competiamo",
      line2: "per fare siti.",
      line3Before: "Costruiamo ",
      line3Accent: "prodotti",
      line3After: ".",
    },
    lead: "Motans Studio esiste per aziende che servono software con criterio: pensato, progettato e costruito per operare nel tempo — non per spuntare una consegna.",
    manifesto: "Ogni decisione ha un motivo. Se non ce l’ha, non entra.",
    principles: [
      {
        title: "Prima il criterio.",
        body: "Prima di aprire l’editor, capiamo il problema reale. Il codice arriva quando la decisione è già chiara.",
      },
      {
        title: "Sistemi, non schermate.",
        body: "Progettiamo la logica che sostiene il prodotto. L’interfaccia è conseguenza — non il punto di partenza.",
      },
      {
        title: "Semplicità con filo.",
        body: "Togliamo ciò che non serve. Ciò che resta deve essere esatto, leggibile e capace di scalare.",
      },
      {
        title: "Fatto per durare.",
        body: "Preferiamo un’architettura pulita a un effetto brillante. La qualità guida sulla fretta.",
      },
    ],
    fit: {
      kicker: "Affinità",
      title: "Con chi lavoriamo.",
      yesLabel: "Incastra se",
      yes: [
        "Ti serve un prodotto digitale su misura, non un template mascherato.",
        "Valorizzi chiarezza, ownership e decisioni esplicite.",
        "Preferisci meno rumore e più precisione in ogni consegna.",
      ],
      noLabel: "Non incastra se",
      no: [
        "Cerchi il prezzo più basso o la scadenza impossibile.",
        "Vuoi riusare un template e chiamarlo prodotto.",
        "Ti serve un team che dica di sì a tutto.",
      ],
    },
    close: {
      line: "Se cerchi uno studio che costruisca con te — non per impressionare — parliamone.",
      cta: "Parliamone",
    },
  },
  pt: {
    kicker: "O estúdio",
    headline: {
      line1: "Não competimos",
      line2: "por fazer websites.",
      line3Before: "Construímos ",
      line3Accent: "produtos",
      line3After: ".",
    },
    lead: "A Motans Studio existe para empresas que precisam de software com critério: pensado, desenhado e construído para operar no tempo — não para cumprir uma entrega.",
    manifesto: "Cada decisão tem um motivo. Se não tem, não entra.",
    principles: [
      {
        title: "Primeiro o critério.",
        body: "Antes de abrir o editor, compreendemos o problema real. O código chega quando a decisão já está clara.",
      },
      {
        title: "Sistemas, não ecrãs.",
        body: "Desenhamos a lógica que sustenta o produto. A interface é consequência — não o ponto de partida.",
      },
      {
        title: "Simplicidade com fio.",
        body: "Tiramos o que não acrescenta. O que fica tem de ser exacto, legível e capaz de escalar.",
      },
      {
        title: "Feito para durar.",
        body: "Preferimos uma arquitectura limpa a um efeito brilhante. A qualidade manda sobre a pressa.",
      },
    ],
    fit: {
      kicker: "Encaixe",
      title: "Com quem trabalhamos.",
      yesLabel: "Encaixa se",
      yes: [
        "Precisa de um produto digital à medida, não de um template disfarçado.",
        "Valoriza clareza, ownership e decisões explícitas.",
        "Prefere menos ruído e mais precisão em cada entrega.",
      ],
      noLabel: "Não encaixa se",
      no: [
        "Procura o preço mais baixo ou o prazo impossível.",
        "Quer reutilizar um template e chamá-lo de produto.",
        "Precisa de uma equipa que diga que sim a tudo.",
      ],
    },
    close: {
      line: "Se procura um estúdio que construa consigo — não para impressionar — falemos.",
      cta: "Vamos falar",
    },
  },
};

/* ─── Process copy ─── */

const MS_STUDIO_PROCESS_I18N: Record<SupportedLanguageCode, MsStudioProcessCopy> = {
  es: {
    kicker: "Proceso",
    headline: {
      line1: "Un proceso claro.",
      line2Before: "Sin perder ",
      line2Accent: "tiempo",
      line2After: ".",
    },
    lead: "Cada proyecto pasa por las mismas decisiones serias. No hay magia: hay criterio, orden y revisión hasta que el resultado encaja con el negocio.",
    moments: [
      {
        eyebrow: "Antes de escribir código",
        title: "Entendemos el negocio.",
        body: "No empezamos por la pantalla. Empezamos por cómo opera tu empresa, dónde se pierde tiempo y qué tiene que cambiar de verdad.",
      },
      {
        eyebrow: "Antes de desarrollar",
        title: "Diseñamos la decisión.",
        body: "El diseño no es maquillaje. Es acordar qué se construye, para quién y con qué límites — antes de comprometer semanas de desarrollo.",
      },
      {
        title: "Validamos antes de escalar.",
        body: "Preferimos corregir una decisión a mitad de camino que descubrirla demasiado tarde. Menos rehacer. Más certeza.",
        aside: "Criterio antes que volumen.",
      },
      {
        eyebrow: "Construcción",
        title: "Construimos con calidad, no con prisa.",
        body: "Código limpio, arquitectura sensata y detalle que se nota cuando el producto ya está en manos del equipo que lo usa cada día.",
      },
      {
        title: "Revisamos hasta que tenga sentido.",
        body: "No entregamos “acabado” solo porque llega la fecha. Entregamos algo que se entiende, se usa y se sostiene.",
        support: "El resultado importa más que el checklist.",
      },
      {
        eyebrow: "Después del lanzamiento",
        title: "Seguimos cuando el producto ya está vivo.",
        body: "El go-live no es el final. Acompañamos, ajustamos y mejoramos cuando la realidad del negocio lo pide.",
      },
    ],
    closing: "No vendemos metodología. Trabajamos con método.",
  },
  en: {
    kicker: "How we work",
    headline: {
      line1: "A clear process.",
      line2Before: "Without wasting ",
      line2Accent: "time",
      line2After: ".",
    },
    lead: "Every project goes through the same serious decisions. There is no magic: there is judgment, order, and review until the result fits the business.",
    moments: [
      {
        eyebrow: "Before writing code",
        title: "We understand the business.",
        body: "We do not start with the screen. We start with how your company operates, where time is lost, and what truly has to change.",
      },
      {
        eyebrow: "Before building",
        title: "We design the decision.",
        body: "Design is not makeup. It is agreeing what gets built, for whom, and with what limits — before committing weeks of development.",
      },
      {
        title: "We validate before we scale.",
        body: "We would rather correct a decision mid-way than discover it too late. Less rework. More certainty.",
        aside: "Judgment before volume.",
      },
      {
        eyebrow: "Build",
        title: "We build with quality, not haste.",
        body: "Clean code, sound architecture, and detail you notice when the product is already in the hands of the team that uses it every day.",
      },
      {
        title: "We review until it makes sense.",
        body: "We do not ship “done” just because the date arrives. We deliver something that is understood, used, and sustained.",
        support: "The result matters more than the checklist.",
      },
      {
        eyebrow: "After launch",
        title: "We stay when the product is already alive.",
        body: "Go-live is not the end. We accompany, adjust, and improve when the reality of the business asks for it.",
      },
    ],
    closing: "We do not sell methodology. We work with method.",
  },
  fr: {
    kicker: "Comment nous travaillons",
    headline: {
      line1: "Un processus clair.",
      line2Before: "Sans perdre de ",
      line2Accent: "temps",
      line2After: ".",
    },
    lead: "Chaque projet passe par les mêmes décisions sérieuses. Pas de magie : du critère, de l’ordre et de la révision jusqu’à ce que le résultat colle au métier.",
    moments: [
      {
        eyebrow: "Avant d’écrire du code",
        title: "Nous comprenons le métier.",
        body: "Nous ne commençons pas par l’écran. Nous commençons par la façon dont votre entreprise opère, où le temps se perd et ce qui doit vraiment changer.",
      },
      {
        eyebrow: "Avant de développer",
        title: "Nous concevons la décision.",
        body: "Le design n’est pas du maquillage. C’est s’accorder sur ce qui se construit, pour qui et avec quelles limites — avant d’engager des semaines de développement.",
      },
      {
        title: "Nous validons avant de scaler.",
        body: "Nous préférons corriger une décision à mi-chemin que la découvrir trop tard. Moins de refaire. Plus de certitude.",
        aside: "Le critère avant le volume.",
      },
      {
        eyebrow: "Construction",
        title: "Nous construisons avec qualité, pas avec précipitation.",
        body: "Code propre, architecture sensée et détail qui se voit quand le produit est déjà entre les mains de l’équipe qui l’utilise chaque jour.",
      },
      {
        title: "Nous révisons jusqu’à ce que ça ait du sens.",
        body: "Nous ne livrons pas « terminé » seulement parce que la date arrive. Nous livrons quelque chose qui se comprend, s’utilise et se tient.",
        support: "Le résultat compte plus que la checklist.",
      },
      {
        eyebrow: "Après le lancement",
        title: "Nous restons quand le produit est déjà vivant.",
        body: "Le go-live n’est pas la fin. Nous accompagnons, ajustons et améliorons quand la réalité du métier le demande.",
      },
    ],
    closing: "Nous ne vendons pas de méthodologie. Nous travaillons avec méthode.",
  },
  de: {
    kicker: "Wie wir arbeiten",
    headline: {
      line1: "Ein klarer Prozess.",
      line2Before: "Ohne ",
      line2Accent: "Zeit",
      line2After: " zu verlieren.",
    },
    lead: "Jedes Projekt durchläuft dieselben ernsthaften Entscheidungen. Keine Magie: Urteil, Ordnung und Prüfung, bis das Ergebnis zum Business passt.",
    moments: [
      {
        eyebrow: "Bevor Code geschrieben wird",
        title: "Wir verstehen das Business.",
        body: "Wir starten nicht beim Screen. Wir starten dabei, wie Ihr Unternehmen operiert, wo Zeit verloren geht und was wirklich ändern muss.",
      },
      {
        eyebrow: "Vor der Entwicklung",
        title: "Wir gestalten die Entscheidung.",
        body: "Design ist kein Make-up. Es heißt zu klären, was gebaut wird, für wen und mit welchen Grenzen — bevor Wochen Entwicklung gebunden werden.",
      },
      {
        title: "Wir validieren, bevor wir skalieren.",
        body: "Wir korrigieren lieber eine Entscheidung auf halbem Weg, als sie zu spät zu entdecken. Weniger Nacharbeit. Mehr Sicherheit.",
        aside: "Urteil vor Volumen.",
      },
      {
        eyebrow: "Bau",
        title: "Wir bauen mit Qualität, nicht mit Eile.",
        body: "Sauberer Code, vernünftige Architektur und Detail, das spürbar wird, wenn das Produkt schon im Team liegt, das es jeden Tag nutzt.",
      },
      {
        title: "Wir prüfen, bis es Sinn ergibt.",
        body: "Wir liefern nicht „fertig“, nur weil das Datum da ist. Wir liefern etwas, das verstanden, genutzt und getragen wird.",
        support: "Das Ergebnis zählt mehr als die Checkliste.",
      },
      {
        eyebrow: "Nach dem Launch",
        title: "Wir bleiben, wenn das Produkt schon lebt.",
        body: "Go-live ist nicht das Ende. Wir begleiten, justieren und verbessern, wenn die Realität des Business es verlangt.",
      },
    ],
    closing: "Wir verkaufen keine Methodologie. Wir arbeiten mit Methode.",
  },
  it: {
    kicker: "Come lavoriamo",
    headline: {
      line1: "Un processo chiaro.",
      line2Before: "Senza perdere ",
      line2Accent: "tempo",
      line2After: ".",
    },
    lead: "Ogni progetto passa dalle stesse decisioni serie. Niente magia: criterio, ordine e revisione finché il risultato non combacia con il business.",
    moments: [
      {
        eyebrow: "Prima di scrivere codice",
        title: "Comprendiamo il business.",
        body: "Non partiamo dalla schermata. Partiamo da come opera la tua azienda, dove si perde tempo e cosa deve davvero cambiare.",
      },
      {
        eyebrow: "Prima di sviluppare",
        title: "Progettiamo la decisione.",
        body: "Il design non è trucco. È accordarsi su cosa si costruisce, per chi e con quali limiti — prima di impegnare settimane di sviluppo.",
      },
      {
        title: "Validiamo prima di scalare.",
        body: "Preferiamo correggere una decisione a metà strada piuttosto che scoprirla troppo tardi. Meno rifare. Più certezza.",
        aside: "Criterio prima del volume.",
      },
      {
        eyebrow: "Costruzione",
        title: "Costruiamo con qualità, non con fretta.",
        body: "Codice pulito, architettura sensata e dettaglio che si nota quando il prodotto è già nelle mani del team che lo usa ogni giorno.",
      },
      {
        title: "Rivediamo finché ha senso.",
        body: "Non consegniamo “finito” solo perché arriva la data. Consegniamo qualcosa che si comprende, si usa e si sostiene.",
        support: "Il risultato conta più della checklist.",
      },
      {
        eyebrow: "Dopo il lancio",
        title: "Restiamo quando il prodotto è già vivo.",
        body: "Il go-live non è la fine. Accompagniamo, regoliamo e miglioriamo quando la realtà del business lo chiede.",
      },
    ],
    closing: "Non vendiamo metodologia. Lavoriamo con metodo.",
  },
  pt: {
    kicker: "Como trabalhamos",
    headline: {
      line1: "Um processo claro.",
      line2Before: "Sem perder ",
      line2Accent: "tempo",
      line2After: ".",
    },
    lead: "Cada projeto passa pelas mesmas decisões sérias. Não há magia: há critério, ordem e revisão até o resultado encaixar no negócio.",
    moments: [
      {
        eyebrow: "Antes de escrever código",
        title: "Compreendemos o negócio.",
        body: "Não começamos pelo ecrã. Começamos por como opera a sua empresa, onde se perde tempo e o que tem de mudar de verdade.",
      },
      {
        eyebrow: "Antes de desenvolver",
        title: "Desenhamos a decisão.",
        body: "O design não é maquilhagem. É acordar o que se constrói, para quem e com que limites — antes de comprometer semanas de desenvolvimento.",
      },
      {
        title: "Validamos antes de escalar.",
        body: "Preferimos corrigir uma decisão a meio caminho a descobri-la demasiado tarde. Menos refazer. Mais certeza.",
        aside: "Critério antes do volume.",
      },
      {
        eyebrow: "Construção",
        title: "Construímos com qualidade, não com pressa.",
        body: "Código limpo, arquitectura sensata e detalhe que se nota quando o produto já está nas mãos da equipa que o usa todos os dias.",
      },
      {
        title: "Revisamos até fazer sentido.",
        body: "Não entregamos “acabado” só porque chega a data. Entregamos algo que se compreende, se usa e se sustenta.",
        support: "O resultado importa mais do que a checklist.",
      },
      {
        eyebrow: "Depois do lançamento",
        title: "Continuamos quando o produto já está vivo.",
        body: "O go-live não é o fim. Acompanhamos, ajustamos e melhoramos quando a realidade do negócio o pede.",
      },
    ],
    closing: "Não vendemos metodologia. Trabalhamos com método.",
  },
};

/* ─── Assembly helpers ─── */

function resolveLocale(locale: SupportedLanguageCode): SupportedLanguageCode {
  return locale in MS_STUDIO_OFFER_I18N ? locale : "es";
}

/* ─── Public getters ─── */

export function getMsStudioOffer(locale: SupportedLanguageCode): MsStudioOfferLocalized {
  const copy = MS_STUDIO_OFFER_I18N[resolveLocale(locale)] ?? MS_STUDIO_OFFER_I18N.es;
  const baseCards = MS_STUDIO_OFFER.cards;

  const cards: MsStudioOfferCard[] = baseCards.map((base, index) => {
    const text = copy.cards[index]!;
    return {
      id: base.id,
      visual: base.visual,
      layout: base.layout,
      title: text.title,
      body: text.body,
    };
  });

  return {
    anchorId: MS_STUDIO_OFFER.anchorId,
    title: copy.title,
    lead: copy.lead,
    cards,
    close: {
      line: copy.close.line,
      cta: copy.close.cta,
      href: MS_STUDIO_OFFER.close.href,
    },
  };
}

export function getMsStudioWhy(locale: SupportedLanguageCode): MsStudioWhyLocalized {
  const copy = MS_STUDIO_WHY_I18N[resolveLocale(locale)] ?? MS_STUDIO_WHY_I18N.es;

  const principles = MS_STUDIO_WHY.principles.map((base, index) => {
    const text = copy.principles[index]!;
    return {
      id: base.id,
      index: base.index,
      layout: base.layout,
      title: text.title,
      body: text.body,
    };
  });

  return {
    anchorId: MS_STUDIO_WHY.anchorId,
    kicker: copy.kicker,
    headline: copy.headline,
    lead: copy.lead,
    manifesto: copy.manifesto,
    principles,
    fit: {
      kicker: copy.fit.kicker,
      title: copy.fit.title,
      yesLabel: copy.fit.yesLabel,
      yes: copy.fit.yes,
      noLabel: copy.fit.noLabel,
      no: copy.fit.no,
    },
    close: {
      line: copy.close.line,
      cta: copy.close.cta,
      href: MS_STUDIO_WHY.close.href,
    },
  };
}

export function getMsStudioProcess(locale: SupportedLanguageCode): MsStudioProcessLocalized {
  const copy = MS_STUDIO_PROCESS_I18N[resolveLocale(locale)] ?? MS_STUDIO_PROCESS_I18N.es;

  const moments: MsStudioProcessMoment[] = MS_STUDIO_PROCESS.moments.map((base, index) => {
    const text = copy.moments[index]!;
    return {
      id: base.id,
      layout: base.layout,
      title: text.title,
      body: text.body,
      ...(text.eyebrow !== undefined ? { eyebrow: text.eyebrow } : {}),
      ...(text.aside !== undefined ? { aside: text.aside } : {}),
      ...(text.support !== undefined ? { support: text.support } : {}),
    };
  });

  return {
    anchorId: MS_STUDIO_PROCESS.anchorId,
    kicker: copy.kicker,
    headline: copy.headline,
    lead: copy.lead,
    moments,
    closing: copy.closing,
  };
}




