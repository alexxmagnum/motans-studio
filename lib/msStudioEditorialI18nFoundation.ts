/**
 * Motans Studio — editorial landing i18n (Offer).
 * Text maps per locale; getters merge onto Spanish structural bases.
 */

import type { SupportedLanguageCode } from "@motanos/i18n";
import {
  MS_STUDIO_OFFER,
  type MsStudioOfferCard,
} from "./msStudioOfferFoundation.js";

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

/* ─── Offer copy ─── */

const MS_STUDIO_OFFER_I18N: Record<SupportedLanguageCode, MsStudioOfferCopy> = {
  es: {
    title: "Qué hacemos",
    lead: "Software a medida, SaaS, automatización, integraciones e IA adaptados a cada empresa.",
    cards: [
      {
        title: "Aplicaciones web",
        body: "Aplicaciones a medida para gestionar procesos, clientes y operaciones desde cualquier lugar.",
      },
      {
        title: "Plataformas SaaS",
        body: "Productos multi-usuario con datos, permisos y operaciones centralizadas, listos para crecer.",
      },
      {
        title: "Automatización",
        body: "Eliminamos trabajo repetitivo conectando procesos y herramientas.",
      },
      {
        title: "Inteligencia Artificial",
        body: "Incorporamos IA solo cuando aporta valor real al día a día.",
      },
      {
        title: "Integraciones",
        body: "Conectamos las herramientas que ya utilizas para que trabajen como un único sistema.",
      },
    ],
    close: {
      line: "Si necesitas una herramienta digital — o varias — la diseñamos contigo.",
      cta: "Hablemos",
    },
  },
  en: {
    title: "What we do",
    lead: "Custom software, SaaS, automation, integrations, and AI tailored to each company.",
    cards: [
      {
        title: "Web applications",
        body: "Custom apps to manage processes, clients, and operations from anywhere.",
      },
      {
        title: "SaaS platforms",
        body: "Multi-user products with centralized data, permissions, and operations — built to grow.",
      },
      {
        title: "Automation",
        body: "We eliminate repetitive work by connecting processes and tools.",
      },
      {
        title: "Artificial Intelligence",
        body: "We bring in AI only when it adds real value to daily work.",
      },
      {
        title: "Integrations",
        body: "We connect the tools you already use so they work as one system.",
      },
    ],
    close: {
      line: "If you need a digital tool — or several — we design it with you.",
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
