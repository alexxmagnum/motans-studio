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
  readonly finalKicker: string;
  readonly finalTitle: string;
  readonly finalLead: string;
  readonly contactKicker: string;
  readonly contactTitle: string;
  readonly contactLead: string;
  readonly contactTrust: string;
  readonly contactNext: string;
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
  readonly intentAutomation: string;
  readonly intentOther: string;
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
    footerLegal: "Legal",
    heroTitleLine1: "Creamos herramientas digitales",
    heroTitleLine2: "que simplifican el",
    heroTitleBefore: "",
    heroAccent: "trabajo",
    heroTitleAfter: ".",
    heroSubtitle:
      "Desde una web hasta un SaaS, una automatización o una solución con IA. Cada herramienta resuelve un problema concreto.",
    heroSoundOn: "Sonido activado",
    heroSoundOff: "Sonido desactivado",
    tagWebs: "Webs",
    tagSaas: "SaaS",
    tagAutomation: "Automatización",
    tagAi: "IA",
    ctaKnowStudio: "Ver qué hacemos",
    finalKicker: "SIGUIENTE PASO",
    finalTitle: "¿Hay algo en tu negocio que podría funcionar mejor?",
    finalLead:
      "Primero hablamos para entender el problema. Si encaja, lo convertimos en una herramienta preparada para crecer.",
    contactKicker: "Contacto",
    contactTitle: "¿En qué podemos ayudarte?",
    contactLead: "Cuéntanos qué necesitas. Respondemos en 24–48 h laborables.",
    contactTrust:
      "Conversación directa con el estudio, sin compromiso. Software a medida, SaaS, automatización e IA aplicada — no plantillas genéricas ni marketing.",
    contactNext:
      "Después del envío revisamos tu caso y te proponemos una primera conversación.",
    formWhatLooking: "¿Qué buscas? *",
    formName: "Nombre *",
    formEmail: "Email *",
    formBusiness: "Empresa (opcional)",
    formSector: "Sector (opcional)",
    formMessage: "Mensaje (opcional)",
    formMessagePlaceholder: "Describe el problema o el objetivo",
    formSubmit: "Enviar",
    formSending: "Enviando…",
    formSuccessTitle: "Mensaje enviado",
    formSuccessBody:
      "Gracias, {name}. Te responderemos a {email} en 24–48 h laborables.",
    formSendAnother: "Enviar otro mensaje",
    formErrorGeneric: "Hubo un error. Inténtalo de nuevo.",
    formMessageTooLong: "Máximo 500 caracteres",
    formRequiredIntent: "Indica qué buscas",
    formRequiredName: "El nombre es obligatorio",
    formRequiredEmail: "El email es obligatorio",
    formInvalidEmail: "Email no válido",
    intentWebOnly: "Web",
    intentCustomSaas: "App / SaaS",
    intentAutomation: "Automatización",
    intentOther: "Otro / consultar",
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
      "From a website to a SaaS, an automation, or an AI solution. Every tool solves a concrete problem.",
    heroSoundOn: "Sound on",
    heroSoundOff: "Sound off",
    tagWebs: "Webs",
    tagSaas: "SaaS",
    tagAutomation: "Automation",
    tagAi: "AI",
    ctaKnowStudio: "See what we do",
    finalKicker: "NEXT STEP",
    finalTitle: "Is there something in your business that could work better?",
    finalLead:
      "First we talk to understand the problem. If it's a fit, we turn it into a tool ready to grow.",
    contactKicker: "Contact",
    contactTitle: "How can we help you?",
    contactLead: "Tell us what you need. We reply within 24–48 business hours.",
    contactTrust:
      "A direct conversation with the studio, no commitment. Custom software, SaaS, automation, and applied AI — not generic templates or marketing.",
    contactNext:
      "After you send, we review your case and propose a first conversation.",
    formWhatLooking: "What are you looking for? *",
    formName: "Name *",
    formEmail: "Email *",
    formBusiness: "Company (optional)",
    formSector: "Sector (optional)",
    formMessage: "Message (optional)",
    formMessagePlaceholder: "Describe the problem or goal",
    formSubmit: "Send",
    formSending: "Sending…",
    formSuccessTitle: "Message sent",
    formSuccessBody:
      "Thanks, {name}. We'll reply at {email} within 24–48 business hours.",
    formSendAnother: "Send another message",
    formErrorGeneric: "Something went wrong. Please try again.",
    formMessageTooLong: "Maximum 500 characters",
    formRequiredIntent: "Tell us what you need",
    formRequiredName: "Name is required",
    formRequiredEmail: "Email is required",
    formInvalidEmail: "Invalid email",
    intentWebOnly: "Website",
    intentCustomSaas: "App / SaaS",
    intentAutomation: "Automation",
    intentOther: "Other / inquire",
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
    heroSoundOn: "Son activé",
    heroSoundOff: "Son désactivé",
    tagWebs: "Sites",
    tagSaas: "SaaS",
    tagAutomation: "Automatisation",
    tagAi: "IA",
    ctaKnowStudio: "Voir ce que nous faisons",
    finalKicker: "ÉTAPE SUIVANTE",
    finalTitle: "Y a-t-il quelque chose dans votre activité qui pourrait mieux fonctionner ?",
    finalLead:
      "D'abord, nous parlons pour comprendre le problème. Si cela convient, nous le transformons en un outil prêt à grandir.",
    contactKicker: "Contact",
    contactTitle: "Comment pouvons-nous vous aider ?",
    contactLead: "Dites-nous ce dont vous avez besoin. Réponse sous 24–48 h ouvrées.",
    contactTrust:
      "Conversation directe avec le studio, sans engagement. Logiciel sur mesure, SaaS, automatisation et IA appliquée — pas de templates génériques ni de marketing.",
    contactNext:
      "Après l'envoi, nous étudions votre cas et proposons une première conversation.",
    formWhatLooking: "Que recherchez-vous ? *",
    formName: "Nom *",
    formEmail: "Email *",
    formBusiness: "Entreprise (optionnel)",
    formSector: "Secteur (optionnel)",
    formMessage: "Message (optionnel)",
    formMessagePlaceholder: "Décrivez le problème ou l'objectif",
    formSubmit: "Envoyer",
    formSending: "Envoi…",
    formSuccessTitle: "Message envoyé",
    formSuccessBody:
      "Merci, {name}. Nous vous répondrons à {email} sous 24–48 h ouvrées.",
    formSendAnother: "Envoyer un autre message",
    formErrorGeneric: "Une erreur est survenue. Réessayez.",
    formMessageTooLong: "Maximum 500 caractères",
    formRequiredIntent: "Indiquez ce que vous recherchez",
    formRequiredName: "Le nom est obligatoire",
    formRequiredEmail: "L'email est obligatoire",
    formInvalidEmail: "Email invalide",
    intentWebOnly: "Site web",
    intentCustomSaas: "App / SaaS",
    intentAutomation: "Automatisation",
    intentOther: "Autre / demander",
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
    heroSoundOn: "Ton an",
    heroSoundOff: "Ton aus",
    tagWebs: "Webs",
    tagSaas: "SaaS",
    tagAutomation: "Automatisierung",
    tagAi: "KI",
    ctaKnowStudio: "Was wir tun",
    finalKicker: "NÄCHSTER SCHRITT",
    finalTitle: "Gibt es in Ihrem Unternehmen etwas, das besser laufen könnte?",
    finalLead:
      "Zuerst sprechen wir, um das Problem zu verstehen. Wenn es passt, wird daraus ein Werkzeug, das mitwachsen kann.",
    contactKicker: "Kontakt",
    contactTitle: "Womit können wir Ihnen helfen?",
    contactLead: "Erzählen Sie uns, was Sie brauchen. Antwort innerhalb von 24–48 Stunden an Werktagen.",
    contactTrust:
      "Direktes Gespräch mit dem Studio, ohne Verpflichtung. Individuelle Software, SaaS, Automatisierung und angewandte KI — keine generischen Templates und kein Marketing.",
    contactNext:
      "Nach dem Absenden prüfen wir Ihren Fall und schlagen ein erstes Gespräch vor.",
    formWhatLooking: "Was suchen Sie? *",
    formName: "Name *",
    formEmail: "E-Mail *",
    formBusiness: "Unternehmen (optional)",
    formSector: "Branche (optional)",
    formMessage: "Nachricht (optional)",
    formMessagePlaceholder: "Beschreiben Sie das Problem oder Ziel",
    formSubmit: "Senden",
    formSending: "Senden…",
    formSuccessTitle: "Nachricht gesendet",
    formSuccessBody:
      "Danke, {name}. Wir antworten unter {email} innerhalb von 24–48 Stunden an Werktagen.",
    formSendAnother: "Weitere Nachricht senden",
    formErrorGeneric: "Es ist ein Fehler aufgetreten. Bitte erneut versuchen.",
    formMessageTooLong: "Maximal 500 Zeichen",
    formRequiredIntent: "Bitte angeben, was Sie suchen",
    formRequiredName: "Name ist erforderlich",
    formRequiredEmail: "E-Mail ist erforderlich",
    formInvalidEmail: "Ungültige E-Mail",
    intentWebOnly: "Website",
    intentCustomSaas: "App / SaaS",
    intentAutomation: "Automatisierung",
    intentOther: "Sonstiges / anfragen",
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
    heroSoundOn: "Audio attivo",
    heroSoundOff: "Audio disattivo",
    tagWebs: "Web",
    tagSaas: "SaaS",
    tagAutomation: "Automazione",
    tagAi: "IA",
    ctaKnowStudio: "Cosa facciamo",
    finalKicker: "PASSO SUCCESSIVO",
    finalTitle: "C'è qualcosa nella tua azienda che potrebbe funzionare meglio?",
    finalLead:
      "Prima parliamo per capire il problema. Se è adatto, lo trasformiamo in uno strumento pronto a crescere.",
    contactKicker: "Contatto",
    contactTitle: "In che modo possiamo aiutarti?",
    contactLead: "Raccontaci di cosa hai bisogno. Rispondiamo entro 24–48 ore lavorative.",
    contactTrust:
      "Conversazione diretta con lo studio, senza impegno. Software su misura, SaaS, automazione e IA applicata — non template generici né marketing.",
    contactNext:
      "Dopo l'invio esaminiamo il tuo caso e proponiamo una prima conversazione.",
    formWhatLooking: "Cosa cerchi? *",
    formName: "Nome *",
    formEmail: "Email *",
    formBusiness: "Azienda (opzionale)",
    formSector: "Settore (opzionale)",
    formMessage: "Messaggio (opzionale)",
    formMessagePlaceholder: "Descrivi il problema o l'obiettivo",
    formSubmit: "Invia",
    formSending: "Invio…",
    formSuccessTitle: "Messaggio inviato",
    formSuccessBody:
      "Grazie, {name}. Ti risponderemo a {email} entro 24–48 ore lavorative.",
    formSendAnother: "Invia un altro messaggio",
    formErrorGeneric: "Si è verificato un errore. Riprova.",
    formMessageTooLong: "Massimo 500 caratteri",
    formRequiredIntent: "Indica cosa cerchi",
    formRequiredName: "Il nome è obbligatorio",
    formRequiredEmail: "L'email è obbligatoria",
    formInvalidEmail: "Email non valida",
    intentWebOnly: "Web",
    intentCustomSaas: "App / SaaS",
    intentAutomation: "Automazione",
    intentOther: "Altro / consulta",
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
    heroSoundOn: "Som ativado",
    heroSoundOff: "Som desativado",
    tagWebs: "Webs",
    tagSaas: "SaaS",
    tagAutomation: "Automatização",
    tagAi: "IA",
    ctaKnowStudio: "Ver o que fazemos",
    finalKicker: "PRÓXIMO PASSO",
    finalTitle: "Há algo no seu negócio que poderia funcionar melhor?",
    finalLead:
      "Primeiro falamos para perceber o problema. Se encaixar, transformamo-lo numa ferramenta preparada para crescer.",
    contactKicker: "Contacto",
    contactTitle: "Em que podemos ajudar?",
    contactLead: "Conte-nos o que precisa. Respondemos em 24–48 h úteis.",
    contactTrust:
      "Conversa direta com o estúdio, sem compromisso. Software à medida, SaaS, automatização e IA aplicada — sem templates genéricos nem marketing.",
    contactNext:
      "Após o envio, analisamos o seu caso e propomos uma primeira conversa.",
    formWhatLooking: "O que procura? *",
    formName: "Nome *",
    formEmail: "Email *",
    formBusiness: "Empresa (opcional)",
    formSector: "Setor (opcional)",
    formMessage: "Mensagem (opcional)",
    formMessagePlaceholder: "Descreva o problema ou o objetivo",
    formSubmit: "Enviar",
    formSending: "A enviar…",
    formSuccessTitle: "Mensagem enviada",
    formSuccessBody:
      "Obrigado, {name}. Responderemos em {email} em 24–48 h úteis.",
    formSendAnother: "Enviar outra mensagem",
    formErrorGeneric: "Ocorreu um erro. Tente novamente.",
    formMessageTooLong: "Máximo 500 caracteres",
    formRequiredIntent: "Indique o que procura",
    formRequiredName: "O nome é obrigatório",
    formRequiredEmail: "O email é obrigatório",
    formInvalidEmail: "Email inválido",
    intentWebOnly: "Web",
    intentCustomSaas: "App / SaaS",
    intentAutomation: "Automatização",
    intentOther: "Outro / consultar",
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
