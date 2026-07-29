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
  readonly heroSoundOn: string;
  readonly heroSoundOff: string;
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
  readonly formSuccessTitle: string;
  readonly formSuccessBody: string;
  readonly formSendAnother: string;
  readonly formErrorGeneric: string;
  readonly formMessageTooLong: string;
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
    footerLegal: "Información legal",
    heroTitleLine1: "Creamos herramientas digitales",
    heroTitleLine2: "que simplifican el",
    heroTitleBefore: "",
    heroAccent: "trabajo",
    heroTitleAfter: ".",
    heroSubtitle:
      "Desde una web hasta una plataforma SaaS, una automatización o una solución basada en inteligencia artificial. Cada herramienta se diseña para resolver un problema real.",
    heroSoundOn: "Activar sonido",
    heroSoundOff: "Silenciar",
    tagWebs: "Webs",
    tagSaas: "SaaS",
    tagAutomation: "Automatización",
    tagAi: "IA",
    ctaKnowStudio: "Ver qué hacemos",
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
    finalTitle: "¿Quieres mejorar tu empresa con tecnología?",
    finalLead:
      "Diseñamos, desarrollamos y evolucionamos productos digitales adaptados a cada empresa.",
    contactKicker: "Contacto",
    contactTitle: "Hablemos",
    contactLead: "Cuéntanos qué necesitas. Te respondemos desde Motans Studio.",
    contactTrust:
      "Un estudio, una conversación directa — software, SaaS, automatización o el producto que encaje.",
    formWhatLooking: "¿Qué buscas? *",
    formName: "Nombre *",
    formEmail: "Email *",
    formBusiness: "Empresa o proyecto (opcional)",
    formSector: "Sector (opcional)",
    formMessage: "Mensaje (opcional)",
    formMessagePlaceholder: "¿Algo más que debamos saber?",
    formSubmit: "Enviar",
    formSending: "Enviando…",
    formSuccessTitle: "Mensaje enviado",
    formSuccessBody: "Gracias, {name}. Te responderemos en {email}.",
    formSendAnother: "Enviar otro mensaje",
    formErrorGeneric: "Hubo un error. Inténtalo de nuevo.",
    formMessageTooLong: "Máximo 500 caracteres",
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
    footerLegal: "Legal information",
    heroTitleLine1: "We create digital tools",
    heroTitleLine2: "that simplify",
    heroTitleBefore: "",
    heroAccent: "work",
    heroTitleAfter: ".",
    heroSubtitle:
      "From a website to a SaaS platform, an automation, or an AI-based solution. Every tool is designed to solve a real problem.",
    heroSoundOn: "Unmute",
    heroSoundOff: "Mute",
    tagWebs: "Webs",
    tagSaas: "SaaS",
    tagAutomation: "Automation",
    tagAi: "AI",
    ctaKnowStudio: "See what we do",
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
    finalTitle: "Want to improve your company with technology?",
    finalLead:
      "We design, develop and evolve digital products tailored to each company.",
    contactKicker: "Contact",
    contactTitle: "Let's talk",
    contactLead: "Tell us what you need. We reply from Motans Studio.",
    contactTrust:
      "One studio, one direct conversation — software, SaaS, automation or the product that fits.",
    formWhatLooking: "What are you looking for? *",
    formName: "Name *",
    formEmail: "Email *",
    formBusiness: "Company or project (optional)",
    formSector: "Sector (optional)",
    formMessage: "Message (optional)",
    formMessagePlaceholder: "Anything else we should know?",
    formSubmit: "Send",
    formSending: "Sending…",
    formSuccessTitle: "Message sent",
    formSuccessBody: "Thanks, {name}. We'll reply at {email}.",
    formSendAnother: "Send another message",
    formErrorGeneric: "Something went wrong. Please try again.",
    formMessageTooLong: "Maximum 500 characters",
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
    heroTitleLine1: "Nous créons des outils numériques",
    heroTitleLine2: "qui simplifient le",
    heroTitleBefore: "",
    heroAccent: "travail",
    heroTitleAfter: ".",
    heroSubtitle:
      "D’un site web à une plateforme SaaS, une automatisation ou une solution basée sur l’intelligence artificielle. Chaque outil est conçu pour résoudre un problème réel.",
    heroSoundOn: "Activer le son",
    heroSoundOff: "Couper le son",
    tagWebs: "Sites",
    tagSaas: "SaaS",
    tagAutomation: "Automatisation",
    tagAi: "IA",
    ctaKnowStudio: "Voir ce que nous faisons",
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
      "Un studio, une conversation directe — logiciel, SaaS, automatisation ou le produit qui convient.",
    formWhatLooking: "Que recherchez-vous ? *",
    formName: "Nom *",
    formEmail: "Email *",
    formBusiness: "Entreprise ou projet (optionnel)",
    formSector: "Secteur (optionnel)",
    formMessage: "Message (optionnel)",
    formMessagePlaceholder: "Autre chose à savoir ?",
    formSubmit: "Envoyer",
    formSending: "Envoi…",
    formSuccessTitle: "Message envoyé",
    formSuccessBody: "Merci, {name}. Nous vous répondrons à {email}.",
    formSendAnother: "Envoyer un autre message",
    formErrorGeneric: "Une erreur est survenue. Réessayez.",
    formMessageTooLong: "Maximum 500 caractères",
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
    heroTitleLine1: "Wir schaffen digitale Werkzeuge",
    heroTitleLine2: "die die",
    heroTitleBefore: "",
    heroAccent: "Arbeit",
    heroTitleAfter: " vereinfachen.",
    heroSubtitle:
      "Von einer Website über eine SaaS-Plattform bis zu Automatisierung oder einer KI-Lösung. Jedes Werkzeug wird entwickelt, um ein reales Problem zu lösen.",
    heroSoundOn: "Ton einschalten",
    heroSoundOff: "Stummschalten",
    tagWebs: "Webs",
    tagSaas: "SaaS",
    tagAutomation: "Automatisierung",
    tagAi: "KI",
    ctaKnowStudio: "Was wir tun",
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
      "Ein Studio, ein direktes Gespräch — Software, SaaS, Automatisierung oder das passende Produkt.",
    formWhatLooking: "Was suchen Sie? *",
    formName: "Name *",
    formEmail: "E-Mail *",
    formBusiness: "Unternehmen oder Projekt (optional)",
    formSector: "Branche (optional)",
    formMessage: "Nachricht (optional)",
    formMessagePlaceholder: "Noch etwas, das wir wissen sollten?",
    formSubmit: "Senden",
    formSending: "Senden…",
    formSuccessTitle: "Nachricht gesendet",
    formSuccessBody: "Danke, {name}. Wir antworten unter {email}.",
    formSendAnother: "Weitere Nachricht senden",
    formErrorGeneric: "Es ist ein Fehler aufgetreten. Bitte erneut versuchen.",
    formMessageTooLong: "Maximal 500 Zeichen",
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
    footerLegal: "Legale",
    heroTitleLine1: "Creiamo strumenti digitali",
    heroTitleLine2: "che semplificano il",
    heroTitleBefore: "",
    heroAccent: "lavoro",
    heroTitleAfter: ".",
    heroSubtitle:
      "Da un sito web a una piattaforma SaaS, un’automazione o una soluzione basata sull’intelligenza artificiale. Ogni strumento è progettato per risolvere un problema reale.",
    heroSoundOn: "Attiva audio",
    heroSoundOff: "Disattiva audio",
    tagWebs: "Web",
    tagSaas: "SaaS",
    tagAutomation: "Automazione",
    tagAi: "IA",
    ctaKnowStudio: "Cosa facciamo",
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
      "Uno studio, una conversazione diretta — software, SaaS, automazione o il prodotto che serve.",
    formWhatLooking: "Cosa cerchi? *",
    formName: "Nome *",
    formEmail: "Email *",
    formBusiness: "Azienda o progetto (opzionale)",
    formSector: "Settore (opzionale)",
    formMessage: "Messaggio (opzionale)",
    formMessagePlaceholder: "Altro da sapere?",
    formSubmit: "Invia",
    formSending: "Invio…",
    formSuccessTitle: "Messaggio inviato",
    formSuccessBody: "Grazie, {name}. Ti risponderemo a {email}.",
    formSendAnother: "Invia un altro messaggio",
    formErrorGeneric: "Si è verificato un errore. Riprova.",
    formMessageTooLong: "Massimo 500 caratteri",
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
    footerLegal: "Informação legal",
    heroTitleLine1: "Criamos ferramentas digitais",
    heroTitleLine2: "que simplificam o",
    heroTitleBefore: "",
    heroAccent: "trabalho",
    heroTitleAfter: ".",
    heroSubtitle:
      "De um website a uma plataforma SaaS, uma automatização ou uma solução baseada em inteligência artificial. Cada ferramenta é desenhada para resolver um problema real.",
    heroSoundOn: "Ativar som",
    heroSoundOff: "Silenciar",
    tagWebs: "Webs",
    tagSaas: "SaaS",
    tagAutomation: "Automatização",
    tagAi: "IA",
    ctaKnowStudio: "Ver o que fazemos",
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
    finalTitle: "Quer melhorar a sua empresa com tecnologia?",
    finalLead:
      "Desenhamos, desenvolvemos e evoluímos produtos digitais adaptados a cada empresa.",
    contactKicker: "Contacto",
    contactTitle: "Vamos falar",
    contactLead: "Conte-nos o que precisa. Respondemos a partir da Motans Studio.",
    contactTrust:
      "Um estúdio, uma conversa direta — software, SaaS, automatização ou o produto que encaixa.",
    formWhatLooking: "O que procura? *",
    formName: "Nome *",
    formEmail: "Email *",
    formBusiness: "Empresa ou projeto (opcional)",
    formSector: "Setor (opcional)",
    formMessage: "Mensagem (opcional)",
    formMessagePlaceholder: "Mais alguma coisa que devamos saber?",
    formSubmit: "Enviar",
    formSending: "A enviar…",
    formSuccessTitle: "Mensagem enviada",
    formSuccessBody: "Obrigado, {name}. Responderemos em {email}.",
    formSendAnother: "Enviar outra mensagem",
    formErrorGeneric: "Ocorreu um erro. Tente novamente.",
    formMessageTooLong: "Máximo 500 caracteres",
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
