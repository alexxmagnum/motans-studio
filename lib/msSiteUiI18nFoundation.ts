/**
 * Motans Studio commercial-site — UI copy i18n (public studio surfaces).
 * Nav chrome remains in MS_SITE_NAV_I18N; this covers home, contact, servicios, chrome CTAs.
 */

import type { SupportedLanguageCode } from "@motanos/i18n";

export type MsSiteUiCopy = {
  readonly hablemos: string;
  readonly back: string;
  readonly footerRights: string;
  readonly footerLegal: string;
  readonly heroTitleLine1: string;
  readonly heroTitleLine2: string;
  readonly heroTitleBefore: string;
  readonly heroAccent: string;
  readonly heroTitleAfter: string;
  readonly heroSubtitle: string;
  readonly tagWebs: string;
  readonly tagSaas: string;
  readonly tagAutomation: string;
  readonly tagAi: string;
  readonly ctaKnowStudio: string;
  readonly processKicker: string;
  readonly processTitle: string;
  readonly processSteps: readonly [
    string,
    string,
    string,
    string,
    string,
    string,
  ];
  readonly finalTitle: string;
  readonly finalLead: string;
  readonly contactKicker: string;
  readonly contactTitle: string;
  readonly contactLead: string;
  readonly contactTrust: string;
  readonly formWhatLooking: string;
  readonly formName: string;
  readonly formEmail: string;
  readonly formBusiness: string;
  readonly formSector: string;
  readonly formMessage: string;
  readonly formMessagePlaceholder: string;
  readonly formSubmit: string;
  readonly formSending: string;
  readonly formRequiredIntent: string;
  readonly formRequiredName: string;
  readonly formRequiredEmail: string;
  readonly formInvalidEmail: string;
  readonly intentWebOnly: string;
  readonly intentCustomSaas: string;
  readonly sectorOptional: string;
  readonly sectorHospitality: string;
  readonly sectorRetail: string;
  readonly sectorServices: string;
  readonly sectorOther: string;
  readonly capKicker: string;
  readonly capTitleBefore: string;
  readonly capTitleBeforeAccent: string;
  readonly capAccent: string;
  readonly capTitleAfter: string;
  readonly capLead: string;
  readonly capWebsKicker: string;
  readonly capWebsTitle: string;
  readonly capWebsDesc: string;
  readonly capSaasKicker: string;
  readonly capSaasTitle: string;
  readonly capSaasDesc: string;
  readonly capAutoKicker: string;
  readonly capAutoTitle: string;
  readonly capAutoDesc: string;
};

export const MS_SITE_UI_I18N: Record<SupportedLanguageCode, MsSiteUiCopy> = {
  es: {
    hablemos: "Hablemos",
    back: "Volver",
    footerRights: "Todos los derechos reservados.",
    footerLegal: "Aviso legal",
    heroTitleLine1: "Diseñamos y",
    heroTitleLine2: "construimos productos digitales",
    heroTitleBefore: "para empresas que quieren ",
    heroAccent: "crecer",
    heroTitleAfter: ".",
    heroSubtitle:
      "Desde webs premium hasta plataformas SaaS, automatización e inteligencia artificial. Creamos tecnología que ayuda a las empresas a vender más, ahorrar tiempo y crecer.",
    tagWebs: "Webs",
    tagSaas: "SaaS",
    tagAutomation: "Automatización",
    tagAi: "IA",
    ctaKnowStudio: "Conocer Motans Studio",
    processKicker: "Proceso",
    processTitle: "Cómo trabajamos.",
    processSteps: [
      "Entendemos el problema.",
      "Diseñamos la solución.",
      "Creamos un prototipo.",
      "Desarrollamos el producto.",
      "Lo desplegamos.",
      "Lo mejoramos continuamente.",
    ],
    finalTitle: "¿Quieres mejorar tu negocio con tecnología?",
    finalLead:
      "Diseñamos, desarrollamos y evolucionamos productos digitales adaptados a cada empresa.",
    contactKicker: "Contacto",
    contactTitle: "Hablemos",
    contactLead: "Cuéntanos qué necesitas. Te respondemos desde Motans Studio.",
    contactTrust:
      "Un estudio, una conversación directa — web, SaaS, automatización o el paquete que encaje.",
    formWhatLooking: "¿Qué buscas? *",
    formName: "Nombre *",
    formEmail: "Email *",
    formBusiness: "Negocio o proyecto (opcional)",
    formSector: "Sector (opcional)",
    formMessage: "Mensaje (opcional)",
    formMessagePlaceholder: "¿Algo más que debamos saber?",
    formSubmit: "Enviar mensaje",
    formSending: "Enviando…",
    formRequiredIntent: "Indica qué buscas",
    formRequiredName: "El nombre es obligatorio",
    formRequiredEmail: "El email es obligatorio",
    formInvalidEmail: "Email no válido",
    intentWebOnly: "Solo web",
    intentCustomSaas: "App / SaaS",
    sectorOptional: "Seleccionar",
    sectorHospitality: "Hostelería",
    sectorRetail: "Retail",
    sectorServices: "Servicios",
    sectorOther: "Otro",
    capKicker: "Qué hacemos",
    capTitleBefore: "Diseñamos la infraestructura digital",
    capTitleBeforeAccent: "que impulsa negocios ",
    capAccent: "modernos",
    capTitleAfter: ".",
    capLead:
      "Creamos experiencias web, plataformas SaaS, automatizaciones y productos digitales que simplifican operaciones y ayudan a crecer.",
    capWebsKicker: "WEBS",
    capWebsTitle: "Webs que convierten visitas en negocio.",
    capWebsDesc:
      "Diseñamos experiencias digitales rápidas, modernas y orientadas a resultados.",
    capSaasKicker: "PLATAFORMAS SAAS",
    capSaasTitle: "Software diseñado para escalar operaciones.",
    capSaasDesc:
      "Creamos plataformas capaces de centralizar procesos, datos y gestión.",
    capAutoKicker: "AUTOMATIZACIÓN",
    capAutoTitle: "Automatización que elimina trabajo repetitivo.",
    capAutoDesc:
      "Conectamos herramientas, datos y procesos para liberar tiempo operativo.",
  },
  en: {
    hablemos: "Let's talk",
    back: "Back",
    footerRights: "All rights reserved.",
    footerLegal: "Legal notice",
    heroTitleLine1: "We design and",
    heroTitleLine2: "build digital products",
    heroTitleBefore: "for companies that want to ",
    heroAccent: "grow",
    heroTitleAfter: ".",
    heroSubtitle:
      "From premium websites to SaaS platforms, automation and artificial intelligence. We create technology that helps businesses sell more, save time and grow.",
    tagWebs: "Webs",
    tagSaas: "SaaS",
    tagAutomation: "Automation",
    tagAi: "AI",
    ctaKnowStudio: "Discover Motans Studio",
    processKicker: "Process",
    processTitle: "How we work.",
    processSteps: [
      "We understand the problem.",
      "We design the solution.",
      "We create a prototype.",
      "We build the product.",
      "We deploy it.",
      "We keep improving it.",
    ],
    finalTitle: "Want to improve your business with technology?",
    finalLead:
      "We design, develop and evolve digital products tailored to each company.",
    contactKicker: "Contact",
    contactTitle: "Let's talk",
    contactLead: "Tell us what you need. We reply from Motans Studio.",
    contactTrust:
      "One studio, one direct conversation — web, SaaS, automation or the package that fits.",
    formWhatLooking: "What are you looking for? *",
    formName: "Name *",
    formEmail: "Email *",
    formBusiness: "Business or project (optional)",
    formSector: "Sector (optional)",
    formMessage: "Message (optional)",
    formMessagePlaceholder: "Anything else we should know?",
    formSubmit: "Send message",
    formSending: "Sending…",
    formRequiredIntent: "Tell us what you need",
    formRequiredName: "Name is required",
    formRequiredEmail: "Email is required",
    formInvalidEmail: "Invalid email",
    intentWebOnly: "Website only",
    intentCustomSaas: "App / SaaS",
    sectorOptional: "Select",
    sectorHospitality: "Hospitality",
    sectorRetail: "Retail",
    sectorServices: "Services",
    sectorOther: "Other",
    capKicker: "What we do",
    capTitleBefore: "We design the digital infrastructure",
    capTitleBeforeAccent: "that powers ",
    capAccent: "modern",
    capTitleAfter: " businesses.",
    capLead:
      "We create web experiences, SaaS platforms, automations and digital products that simplify operations and help you grow.",
    capWebsKicker: "WEBS",
    capWebsTitle: "Websites that turn visits into business.",
    capWebsDesc:
      "We design fast, modern digital experiences built for results.",
    capSaasKicker: "SAAS PLATFORMS",
    capSaasTitle: "Software designed to scale operations.",
    capSaasDesc:
      "We build platforms that centralize processes, data and management.",
    capAutoKicker: "AUTOMATION",
    capAutoTitle: "Automation that removes repetitive work.",
    capAutoDesc:
      "We connect tools, data and processes to free up operational time.",
  },
  fr: {
    hablemos: "Parlons-en",
    back: "Retour",
    footerRights: "Tous droits réservés.",
    footerLegal: "Mentions légales",
    heroTitleLine1: "Nous concevons et",
    heroTitleLine2: "construisons des produits numériques",
    heroTitleBefore: "pour les entreprises qui veulent ",
    heroAccent: "grandir",
    heroTitleAfter: ".",
    heroSubtitle:
      "Des sites premium aux plateformes SaaS, automatisation et intelligence artificielle. Nous créons une technologie qui aide les entreprises à vendre plus, gagner du temps et scaler.",
    tagWebs: "Sites",
    tagSaas: "SaaS",
    tagAutomation: "Automatisation",
    tagAi: "IA",
    ctaKnowStudio: "Découvrir Motans Studio",
    processKicker: "Processus",
    processTitle: "Comment nous travaillons.",
    processSteps: [
      "Nous comprenons le problème.",
      "Nous concevons la solution.",
      "Nous créons un prototype.",
      "Nous développons le produit.",
      "Nous le déployons.",
      "Nous l'améliorons en continu.",
    ],
    finalTitle: "Vous voulez améliorer votre activité avec la technologie ?",
    finalLead:
      "Nous concevons, développons et faisons évoluer des produits numériques adaptés à chaque entreprise.",
    contactKicker: "Contact",
    contactTitle: "Parlons-en",
    contactLead: "Dites-nous ce dont vous avez besoin. Nous répondons depuis Motans Studio.",
    contactTrust:
      "Un studio, une conversation directe — web, SaaS, automatisation ou le pack qui convient.",
    formWhatLooking: "Que recherchez-vous ? *",
    formName: "Nom *",
    formEmail: "Email *",
    formBusiness: "Entreprise ou projet (optionnel)",
    formSector: "Secteur (optionnel)",
    formMessage: "Message (optionnel)",
    formMessagePlaceholder: "Autre chose à savoir ?",
    formSubmit: "Envoyer le message",
    formSending: "Envoi…",
    formRequiredIntent: "Indiquez ce que vous recherchez",
    formRequiredName: "Le nom est obligatoire",
    formRequiredEmail: "L'email est obligatoire",
    formInvalidEmail: "Email invalide",
    intentWebOnly: "Site uniquement",
    intentCustomSaas: "App / SaaS",
    sectorOptional: "Sélectionner",
    sectorHospitality: "Restauration",
    sectorRetail: "Retail",
    sectorServices: "Services",
    sectorOther: "Autre",
    capKicker: "Ce que nous faisons",
    capTitleBefore: "Nous concevons l'infrastructure digitale",
    capTitleBeforeAccent: "qui propulse les entreprises ",
    capAccent: "modernes",
    capTitleAfter: ".",
    capLead:
      "Nous créons des expériences web, plateformes SaaS, automatisations et produits numériques qui simplifient les opérations et aident à grandir.",
    capWebsKicker: "SITES",
    capWebsTitle: "Des sites qui transforment les visites en business.",
    capWebsDesc:
      "Nous concevons des expériences digitales rapides, modernes et orientées résultats.",
    capSaasKicker: "PLATEFORMES SAAS",
    capSaasTitle: "Un logiciel conçu pour scaler les opérations.",
    capSaasDesc:
      "Nous créons des plateformes capables de centraliser processus, données et gestion.",
    capAutoKicker: "AUTOMATISATION",
    capAutoTitle: "Une automatisation qui élimine le travail répétitif.",
    capAutoDesc:
      "Nous connectons outils, données et processus pour libérer du temps opérationnel.",
  },
  de: {
    hablemos: "Sprechen wir",
    back: "Zurück",
    footerRights: "Alle Rechte vorbehalten.",
    footerLegal: "Impressum",
    heroTitleLine1: "Wir gestalten und",
    heroTitleLine2: "bauen digitale Produkte",
    heroTitleBefore: "für Unternehmen, die ",
    heroAccent: "wachsen",
    heroTitleAfter: " wollen.",
    heroSubtitle:
      "Von Premium-Websites bis SaaS-Plattformen, Automatisierung und künstlicher Intelligenz. Wir schaffen Technologie, die Unternehmen hilft, mehr zu verkaufen, Zeit zu sparen und zu skalieren.",
    tagWebs: "Webs",
    tagSaas: "SaaS",
    tagAutomation: "Automatisierung",
    tagAi: "KI",
    ctaKnowStudio: "Motans Studio entdecken",
    processKicker: "Prozess",
    processTitle: "So arbeiten wir.",
    processSteps: [
      "Wir verstehen das Problem.",
      "Wir gestalten die Lösung.",
      "Wir erstellen einen Prototyp.",
      "Wir entwickeln das Produkt.",
      "Wir stellen es bereit.",
      "Wir verbessern es laufend.",
    ],
    finalTitle: "Möchten Sie Ihr Unternehmen mit Technologie verbessern?",
    finalLead:
      "Wir gestalten, entwickeln und weiterentwickeln digitale Produkte für jedes Unternehmen.",
    contactKicker: "Kontakt",
    contactTitle: "Sprechen wir",
    contactLead: "Erzählen Sie uns, was Sie brauchen. Wir antworten von Motans Studio.",
    contactTrust:
      "Ein Studio, ein direktes Gespräch — Web, SaaS, Automatisierung oder das passende Paket.",
    formWhatLooking: "Was suchen Sie? *",
    formName: "Name *",
    formEmail: "E-Mail *",
    formBusiness: "Unternehmen oder Projekt (optional)",
    formSector: "Branche (optional)",
    formMessage: "Nachricht (optional)",
    formMessagePlaceholder: "Noch etwas, das wir wissen sollten?",
    formSubmit: "Nachricht senden",
    formSending: "Senden…",
    formRequiredIntent: "Bitte angeben, was Sie suchen",
    formRequiredName: "Name ist erforderlich",
    formRequiredEmail: "E-Mail ist erforderlich",
    formInvalidEmail: "Ungültige E-Mail",
    intentWebOnly: "Nur Website",
    intentCustomSaas: "App / SaaS",
    sectorOptional: "Auswählen",
    sectorHospitality: "Gastronomie",
    sectorRetail: "Retail",
    sectorServices: "Dienstleistungen",
    sectorOther: "Sonstiges",
    capKicker: "Was wir tun",
    capTitleBefore: "Wir gestalten die digitale Infrastruktur",
    capTitleBeforeAccent: "die ",
    capAccent: "moderne",
    capTitleAfter: " Unternehmen antreibt.",
    capLead:
      "Wir schaffen Web-Erlebnisse, SaaS-Plattformen, Automatisierungen und digitale Produkte, die Abläufe vereinfachen und Wachstum fördern.",
    capWebsKicker: "WEBS",
    capWebsTitle: "Websites, die Besuche in Geschäft verwandeln.",
    capWebsDesc:
      "Wir gestalten schnelle, moderne digitale Erlebnisse mit Fokus auf Ergebnisse.",
    capSaasKicker: "SAAS-PLATTFORMEN",
    capSaasTitle: "Software zum Skalieren von Abläufen.",
    capSaasDesc:
      "Wir bauen Plattformen, die Prozesse, Daten und Steuerung zentralisieren.",
    capAutoKicker: "AUTOMATISIERUNG",
    capAutoTitle: "Automatisierung, die repetitive Arbeit entfernt.",
    capAutoDesc:
      "Wir verbinden Tools, Daten und Prozesse, um operative Zeit freizusetzen.",
  },
  it: {
    hablemos: "Parliamone",
    back: "Indietro",
    footerRights: "Tutti i diritti riservati.",
    footerLegal: "Note legali",
    heroTitleLine1: "Progettiamo e",
    heroTitleLine2: "costruiamo prodotti digitali",
    heroTitleBefore: "per aziende che vogliono ",
    heroAccent: "crescere",
    heroTitleAfter: ".",
    heroSubtitle:
      "Dai siti premium alle piattaforme SaaS, automazione e intelligenza artificiale. Creiamo tecnologia che aiuta le imprese a vendere di più, risparmiare tempo e scalare.",
    tagWebs: "Web",
    tagSaas: "SaaS",
    tagAutomation: "Automazione",
    tagAi: "IA",
    ctaKnowStudio: "Scopri Motans Studio",
    processKicker: "Processo",
    processTitle: "Come lavoriamo.",
    processSteps: [
      "Capisco il problema.",
      "Progettiamo la soluzione.",
      "Creiamo un prototipo.",
      "Sviluppiamo il prodotto.",
      "Lo rilasciamo.",
      "Lo miglioriamo continuamente.",
    ],
    finalTitle: "Vuoi migliorare la tua azienda con la tecnologia?",
    finalLead:
      "Progettiamo, sviluppiamo ed evolviamo prodotti digitali su misura per ogni impresa.",
    contactKicker: "Contatto",
    contactTitle: "Parliamone",
    contactLead: "Raccontaci di cosa hai bisogno. Rispondiamo da Motans Studio.",
    contactTrust:
      "Uno studio, una conversazione diretta — web, SaaS, automazione o il pacchetto che serve.",
    formWhatLooking: "Cosa cerchi? *",
    formName: "Nome *",
    formEmail: "Email *",
    formBusiness: "Azienda o progetto (opzionale)",
    formSector: "Settore (opzionale)",
    formMessage: "Messaggio (opzionale)",
    formMessagePlaceholder: "Altro da sapere?",
    formSubmit: "Invia messaggio",
    formSending: "Invio…",
    formRequiredIntent: "Indica cosa cerchi",
    formRequiredName: "Il nome è obbligatorio",
    formRequiredEmail: "L'email è obbligatoria",
    formInvalidEmail: "Email non valida",
    intentWebOnly: "Solo sito",
    intentCustomSaas: "App / SaaS",
    sectorOptional: "Seleziona",
    sectorHospitality: "Ristorazione",
    sectorRetail: "Retail",
    sectorServices: "Servizi",
    sectorOther: "Altro",
    capKicker: "Cosa facciamo",
    capTitleBefore: "Progettiamo l'infrastruttura digitale",
    capTitleBeforeAccent: "che spinge le imprese ",
    capAccent: "moderne",
    capTitleAfter: ".",
    capLead:
      "Creiamo esperienze web, piattaforme SaaS, automazioni e prodotti digitali che semplificano le operazioni e aiutano a crescere.",
    capWebsKicker: "WEB",
    capWebsTitle: "Siti che trasformano visite in business.",
    capWebsDesc:
      "Progettiamo esperienze digitali veloci, moderne e orientate ai risultati.",
    capSaasKicker: "PIATTAFORME SAAS",
    capSaasTitle: "Software pensato per scalare le operazioni.",
    capSaasDesc:
      "Creiamo piattaforme in grado di centralizzare processi, dati e gestione.",
    capAutoKicker: "AUTOMAZIONE",
    capAutoTitle: "Automazione che elimina il lavoro ripetitivo.",
    capAutoDesc:
      "Colleghiamo strumenti, dati e processi per liberare tempo operativo.",
  },
  pt: {
    hablemos: "Vamos falar",
    back: "Voltar",
    footerRights: "Todos os direitos reservados.",
    footerLegal: "Aviso legal",
    heroTitleLine1: "Desenhamos e",
    heroTitleLine2: "construímos produtos digitais",
    heroTitleBefore: "para empresas que querem ",
    heroAccent: "crescer",
    heroTitleAfter: ".",
    heroSubtitle:
      "De websites premium a plataformas SaaS, automatização e inteligência artificial. Criamos tecnologia que ajuda as empresas a vender mais, poupar tempo e escalar.",
    tagWebs: "Webs",
    tagSaas: "SaaS",
    tagAutomation: "Automatização",
    tagAi: "IA",
    ctaKnowStudio: "Conhecer Motans Studio",
    processKicker: "Processo",
    processTitle: "Como trabalhamos.",
    processSteps: [
      "Compreendemos o problema.",
      "Desenhamos a solução.",
      "Criamos um protótipo.",
      "Desenvolvemos o produto.",
      "Fazemos o deploy.",
      "Melhoramos continuamente.",
    ],
    finalTitle: "Quer melhorar o seu negócio com tecnologia?",
    finalLead:
      "Desenhamos, desenvolvemos e evoluímos produtos digitais adaptados a cada empresa.",
    contactKicker: "Contacto",
    contactTitle: "Vamos falar",
    contactLead: "Conte-nos o que precisa. Respondemos a partir da Motans Studio.",
    contactTrust:
      "Um estúdio, uma conversa direta — web, SaaS, automatização ou o pacote que encaixa.",
    formWhatLooking: "O que procura? *",
    formName: "Nome *",
    formEmail: "Email *",
    formBusiness: "Negócio ou projeto (opcional)",
    formSector: "Setor (opcional)",
    formMessage: "Mensagem (opcional)",
    formMessagePlaceholder: "Mais alguma coisa que devamos saber?",
    formSubmit: "Enviar mensagem",
    formSending: "A enviar…",
    formRequiredIntent: "Indique o que procura",
    formRequiredName: "O nome é obrigatório",
    formRequiredEmail: "O email é obrigatório",
    formInvalidEmail: "Email inválido",
    intentWebOnly: "Só website",
    intentCustomSaas: "App / SaaS",
    sectorOptional: "Selecionar",
    sectorHospitality: "Hotelaria",
    sectorRetail: "Retail",
    sectorServices: "Serviços",
    sectorOther: "Outro",
    capKicker: "O que fazemos",
    capTitleBefore: "Desenhamos a infraestrutura digital",
    capTitleBeforeAccent: "que impulsiona negócios ",
    capAccent: "modernos",
    capTitleAfter: ".",
    capLead:
      "Criamos experiências web, plataformas SaaS, automatizações e produtos digitais que simplificam operações e ajudam a crescer.",
    capWebsKicker: "WEBS",
    capWebsTitle: "Websites que convertem visitas em negócio.",
    capWebsDesc:
      "Desenhamos experiências digitais rápidas, modernas e orientadas a resultados.",
    capSaasKicker: "PLATAFORMAS SAAS",
    capSaasTitle: "Software pensado para escalar operações.",
    capSaasDesc:
      "Criamos plataformas capazes de centralizar processos, dados e gestão.",
    capAutoKicker: "AUTOMATIZAÇÃO",
    capAutoTitle: "Automatização que elimina trabalho repetitivo.",
    capAutoDesc:
      "Ligamos ferramentas, dados e processos para libertar tempo operativo.",
  },
};
