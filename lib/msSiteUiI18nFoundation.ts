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
  readonly formMessageHelp: string;
  readonly formMessagePlaceholder: string;
  readonly formMessageEnough: string;
  readonly formMessageTooShort: string;
  readonly formSubmit: string;
  readonly formSending: string;
  readonly formSuccessTitle: string;
  readonly formSuccessLead: string;
  readonly formSuccessFollow: string;
  readonly formSuccessBody: string;
  readonly formSendAnother: string;
  readonly formErrorGeneric: string;
  readonly formMessageTooLong: string;
  readonly formRequiredIntent: string;
  readonly formRequiredName: string;
  readonly formRequiredEmail: string;
  readonly formInvalidEmail: string;
  readonly formTurnstileRequired: string;
  readonly intentWebOnly: string;
  readonly intentCustomSaas: string;
  readonly intentAutomation: string;
  readonly intentOther: string;
  readonly intentWebDesc: string;
  readonly intentSaasDesc: string;
  readonly intentAutoDesc: string;
  readonly intentOtherDesc: string;
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
    contactTitle: "¿Hay algo en tu negocio que podría funcionar mejor?",
    contactLead: "",
    contactTrust:
      "Conversación directa con el estudio, sin compromiso. Software a medida, SaaS, automatización e IA aplicada — no plantillas genéricas ni marketing.",
    contactNext:
      "Revisaremos personalmente tu solicitud y normalmente responderemos en menos de 24 horas laborables.",
    formWhatLooking: "¿Qué buscas?",
    formName: "Nombre completo *",
    formEmail: "Correo electrónico *",
    formBusiness: "Empresa o negocio (opcional)",
    formSector: "Sector",
    formMessage: "Mensaje *",
    formMessageHelp:
      "Cuéntanos qué está ocurriendo y qué te gustaría conseguir.",
    formMessagePlaceholder:
      "Explícanos con el mayor detalle posible qué necesitas, qué problema quieres resolver, cómo trabajáis actualmente y qué te gustaría conseguir. Cuanta más información nos des, mejor podremos entender tu situación y preparar una primera propuesta adaptada a tu proyecto.",
    formMessageEnough: "✓ Información suficiente para valorar el proyecto.",
    formMessageTooShort: "Mínimo 80 caracteres para poder valorar el proyecto",
    formSubmit: "Enviar solicitud",
    formSending: "Enviando solicitud...",
    formSuccessTitle: "Solicitud enviada correctamente.",
    formSuccessLead: "Gracias por contactar con Motans Studio.",
    formSuccessFollow:
      "Revisaremos personalmente tu solicitud y normalmente responderemos en menos de 24 horas laborables.",
    formSuccessBody:
      "Gracias, {name}. Te responderemos a {email} en menos de 24 h laborables.",
    formSendAnother: "Enviar otra solicitud",
    formErrorGeneric: "Hubo un error. Inténtalo de nuevo.",
    formMessageTooLong: "Máximo 5000 caracteres",
    formRequiredIntent: "Indica qué buscas",
    formRequiredName: "El nombre completo es obligatorio",
    formRequiredEmail: "El correo electrónico es obligatorio",
    formInvalidEmail: "Email no válido",
    formTurnstileRequired: "Completa la verificación de seguridad",
    intentWebOnly: "Web",
    intentCustomSaas: "Software / SaaS",
    intentAutomation: "Automatización",
    intentOther: "Otra consulta",
    intentWebDesc: "Landing pages, webs corporativas y eCommerce.",
    intentSaasDesc: "Aplicaciones web y plataformas a medida.",
    intentAutoDesc: "IA, integraciones y optimización de procesos.",
    intentOtherDesc: "Si tu proyecto no encaja en las categorías anteriores.",
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
    contactTitle: "Is there something in your business that could work better?",
    contactLead:
      "Tell us what's going on. Explain in as much detail as possible what you need, what problem you want to solve, how you work today, and what you'd like to achieve. The more information you share, the better we can understand your situation and prepare a first proposal tailored to your project.",
    contactTrust:
      "A direct conversation with the studio, no commitment. Custom software, SaaS, automation, and applied AI — not generic templates or marketing.",
    contactNext:
      "We will personally review your request and normally reply within 24 business hours.",
    formWhatLooking: "What are you looking for?",
    formName: "Full name *",
    formEmail: "Email address *",
    formBusiness: "Company or business (optional)",
    formSector: "Sector",
    formMessage: "Message *",
    formMessageHelp: "Tell us what's going on and what you'd like to achieve.",
    formMessagePlaceholder:
      "Tell us what's going on, what you want to improve, how you work today, which tools you use, what problem you want to solve, or any information that helps us understand your project better.",
    formMessageEnough: "✓ Enough detail to evaluate the project.",
    formMessageTooShort: "At least 80 characters so we can evaluate the project",
    formSubmit: "Send request",
    formSending: "Sending request...",
    formSuccessTitle: "Request sent successfully.",
    formSuccessLead: "Thank you for contacting Motans Studio.",
    formSuccessFollow:
      "We will personally review your request and normally reply within 24 business hours.",
    formSuccessBody:
      "Thanks, {name}. We'll reply at {email} within 24 business hours.",
    formSendAnother: "Send another request",
    formErrorGeneric: "Something went wrong. Please try again.",
    formMessageTooLong: "Maximum 5000 characters",
    formRequiredIntent: "Tell us what you need",
    formRequiredName: "Full name is required",
    formRequiredEmail: "Email is required",
    formInvalidEmail: "Invalid email",
    formTurnstileRequired: "Complete the security check",
    intentWebOnly: "Web",
    intentCustomSaas: "Software / SaaS",
    intentAutomation: "Automation",
    intentOther: "Other inquiry",
    intentWebDesc: "Landing pages, corporate sites, and eCommerce.",
    intentSaasDesc: "Custom web apps and platforms.",
    intentAutoDesc: "AI, integrations, and process optimization.",
    intentOtherDesc: "If your project does not fit the categories above.",
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
    contactTitle: "Y a-t-il quelque chose dans votre activité qui pourrait mieux fonctionner ?",
    contactLead:
      "Dites-nous ce qui se passe. Expliquez avec le plus de détails possible ce dont vous avez besoin, le problème à résoudre, votre façon de travailler aujourd'hui et ce que vous aimeriez accomplir. Plus vous partagez d'informations, mieux nous pourrons comprendre votre situation et préparer une première proposition adaptée à votre projet.",
    contactTrust:
      "Conversation directe avec le studio, sans engagement. Logiciel sur mesure, SaaS, automatisation et IA appliquée — pas de templates génériques ni de marketing.",
    contactNext:
      "Nous examinerons personnellement votre demande et répondrons en général sous 24 heures ouvrées.",
    formWhatLooking: "Que recherchez-vous ?",
    formName: "Nom complet *",
    formEmail: "Adresse e-mail *",
    formBusiness: "Entreprise ou activité (facultatif)",
    formSector: "Secteur",
    formMessage: "Message *",
    formMessageHelp: "Dites-nous ce qui se passe et ce que vous souhaitez accomplir.",
    formMessagePlaceholder:
      "Dites-nous ce qui se passe, ce que vous voulez améliorer, comment vous travaillez aujourd'hui, quels outils vous utilisez, quel problème vous voulez résoudre ou toute information qui nous aide à mieux comprendre votre projet.",
    formMessageEnough: "✓ Informations suffisantes pour évaluer le projet.",
    formMessageTooShort: "Minimum 80 caractères pour évaluer le projet",
    formSubmit: "Envoyer la demande",
    formSending: "Envoi de la demande...",
    formSuccessTitle: "Demande envoyée avec succès.",
    formSuccessLead: "Merci d'avoir contacté Motans Studio.",
    formSuccessFollow:
      "Nous examinerons personnellement votre demande et répondrons en général sous 24 heures ouvrées.",
    formSuccessBody:
      "Merci, {name}. Nous vous répondrons à {email} sous 24 h ouvrées.",
    formSendAnother: "Envoyer une autre demande",
    formErrorGeneric: "Une erreur est survenue. Réessayez.",
    formMessageTooLong: "Maximum 5000 caractères",
    formRequiredIntent: "Indiquez ce que vous recherchez",
    formRequiredName: "Le nom complet est obligatoire",
    formRequiredEmail: "L'e-mail est obligatoire",
    formInvalidEmail: "Email invalide",
    formTurnstileRequired: "Complétez la vérification de sécurité",
    intentWebOnly: "Web",
    intentCustomSaas: "Logiciel / SaaS",
    intentAutomation: "Automatisation",
    intentOther: "Autre demande",
    intentWebDesc: "Landing pages, sites corporate et eCommerce.",
    intentSaasDesc: "Applications web et plateformes sur mesure.",
    intentAutoDesc: "IA, intégrations et optimisation des processus.",
    intentOtherDesc: "Si votre projet ne correspond pas aux catégories ci-dessus.",
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
    contactTitle: "Gibt es in Ihrem Unternehmen etwas, das besser laufen könnte?",
    contactLead:
      "Erzählen Sie uns, was gerade passiert. Beschreiben Sie möglichst genau, was Sie brauchen, welches Problem Sie lösen möchten, wie Sie heute arbeiten und was Sie erreichen wollen. Je mehr Informationen Sie teilen, desto besser können wir Ihre Situation verstehen und einen ersten Vorschlag für Ihr Projekt vorbereiten.",
    contactTrust:
      "Direktes Gespräch mit dem Studio, ohne Verpflichtung. Individuelle Software, SaaS, Automatisierung und angewandte KI — keine generischen Templates und kein Marketing.",
    contactNext:
      "Wir prüfen Ihre Anfrage persönlich und antworten in der Regel innerhalb von 24 Werktagenstunden.",
    formWhatLooking: "Was suchen Sie?",
    formName: "Vollständiger Name *",
    formEmail: "E-Mail-Adresse *",
    formBusiness: "Unternehmen oder Betrieb (optional)",
    formSector: "Branche",
    formMessage: "Nachricht *",
    formMessageHelp: "Erzählen Sie uns, was passiert und was Sie erreichen möchten.",
    formMessagePlaceholder:
      "Erzählen Sie uns, was passiert, was Sie verbessern möchten, wie Sie heute arbeiten, welche Tools Sie nutzen, welches Problem Sie lösen wollen oder alles, was uns hilft, Ihr Projekt besser zu verstehen.",
    formMessageEnough: "✓ Genug Informationen zur Bewertung des Projekts.",
    formMessageTooShort: "Mindestens 80 Zeichen zur Bewertung des Projekts",
    formSubmit: "Anfrage senden",
    formSending: "Anfrage wird gesendet...",
    formSuccessTitle: "Anfrage erfolgreich gesendet.",
    formSuccessLead: "Danke, dass Sie Motans Studio kontaktiert haben.",
    formSuccessFollow:
      "Wir prüfen Ihre Anfrage persönlich und antworten in der Regel innerhalb von 24 Werktagenstunden.",
    formSuccessBody:
      "Danke, {name}. Wir antworten unter {email} innerhalb von 24 Werktagenstunden.",
    formSendAnother: "Weitere Anfrage senden",
    formErrorGeneric: "Es ist ein Fehler aufgetreten. Bitte erneut versuchen.",
    formMessageTooLong: "Maximal 5000 Zeichen",
    formRequiredIntent: "Bitte angeben, was Sie suchen",
    formRequiredName: "Vollständiger Name ist erforderlich",
    formRequiredEmail: "E-Mail ist erforderlich",
    formInvalidEmail: "Ungültige E-Mail",
    formTurnstileRequired: "Sicherheitsprüfung abschließen",
    intentWebOnly: "Web",
    intentCustomSaas: "Software / SaaS",
    intentAutomation: "Automatisierung",
    intentOther: "Andere Anfrage",
    intentWebDesc: "Landingpages, Unternehmenswebsites und eCommerce.",
    intentSaasDesc: "Individuelle Web-Apps und Plattformen.",
    intentAutoDesc: "KI, Integrationen und Prozessoptimierung.",
    intentOtherDesc: "Wenn Ihr Projekt nicht in die Kategorien passt.",
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
    contactTitle: "C'è qualcosa nella tua azienda che potrebbe funzionare meglio?",
    contactLead:
      "Raccontaci cosa sta succedendo. Spiegaci con il maggior dettaglio possibile di cosa hai bisogno, quale problema vuoi risolvere, come lavorate oggi e cosa vorresti ottenere. Più informazioni condividi, meglio potremo capire la tua situazione e preparare una prima proposta adattata al tuo progetto.",
    contactTrust:
      "Conversazione diretta con lo studio, senza impegno. Software su misura, SaaS, automazione e IA applicata — non template generici né marketing.",
    contactNext:
      "Esamineremo personalmente la tua richiesta e di solito risponderemo entro 24 ore lavorative.",
    formWhatLooking: "Cosa cerchi?",
    formName: "Nome completo *",
    formEmail: "Indirizzo email *",
    formBusiness: "Azienda o attività (facoltativo)",
    formSector: "Settore",
    formMessage: "Messaggio *",
    formMessageHelp: "Raccontaci cosa sta succedendo e cosa vorresti ottenere.",
    formMessagePlaceholder:
      "Raccontaci cosa sta succedendo, cosa vuoi migliorare, come lavorate oggi, quali strumenti usate, quale problema vuoi risolvere o qualsiasi informazione che ci aiuti a capire meglio il tuo progetto.",
    formMessageEnough: "✓ Informazioni sufficienti per valutare il progetto.",
    formMessageTooShort: "Minimo 80 caratteri per valutare il progetto",
    formSubmit: "Invia richiesta",
    formSending: "Invio della richiesta...",
    formSuccessTitle: "Richiesta inviata correttamente.",
    formSuccessLead: "Grazie per aver contattato Motans Studio.",
    formSuccessFollow:
      "Esamineremo personalmente la tua richiesta e di solito risponderemo entro 24 ore lavorative.",
    formSuccessBody:
      "Grazie, {name}. Ti risponderemo a {email} entro 24 ore lavorative.",
    formSendAnother: "Invia un'altra richiesta",
    formErrorGeneric: "Si è verificato un errore. Riprova.",
    formMessageTooLong: "Massimo 5000 caratteri",
    formRequiredIntent: "Indica cosa cerchi",
    formRequiredName: "Il nome completo è obbligatorio",
    formRequiredEmail: "L'email è obbligatoria",
    formInvalidEmail: "Email non valida",
    formTurnstileRequired: "Completa la verifica di sicurezza",
    intentWebOnly: "Web",
    intentCustomSaas: "Software / SaaS",
    intentAutomation: "Automazione",
    intentOther: "Altra richiesta",
    intentWebDesc: "Landing page, siti corporate ed eCommerce.",
    intentSaasDesc: "App web e piattaforme su misura.",
    intentAutoDesc: "IA, integrazioni e ottimizzazione dei processi.",
    intentOtherDesc: "Se il progetto non rientra nelle categorie sopra.",
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
    contactTitle: "Há algo no seu negócio que poderia funcionar melhor?",
    contactLead:
      "Conte-nos o que está a acontecer. Explique com o máximo de detalhe possível o que precisa, que problema quer resolver, como trabalham atualmente e o que gostaria de alcançar. Quanto mais informação partilhar, melhor poderemos perceber a sua situação e preparar uma primeira proposta adaptada ao seu projeto.",
    contactTrust:
      "Conversa direta com o estúdio, sem compromisso. Software à medida, SaaS, automatização e IA aplicada — sem templates genéricos nem marketing.",
    contactNext:
      "Vamos analisar pessoalmente o seu pedido e normalmente responderemos em menos de 24 horas úteis.",
    formWhatLooking: "O que procura?",
    formName: "Nome completo *",
    formEmail: "Endereço de email *",
    formBusiness: "Empresa ou negócio (opcional)",
    formSector: "Setor",
    formMessage: "Mensagem *",
    formMessageHelp: "Conte-nos o que está a acontecer e o que gostaria de alcançar.",
    formMessagePlaceholder:
      "Conte-nos o que está a acontecer, o que quer melhorar, como trabalham atualmente, que ferramentas usam, que problema quer resolver ou qualquer informação que nos ajude a perceber melhor o seu projeto.",
    formMessageEnough: "✓ Informação suficiente para avaliar o projeto.",
    formMessageTooShort: "Mínimo 80 caracteres para avaliar o projeto",
    formSubmit: "Enviar pedido",
    formSending: "A enviar pedido...",
    formSuccessTitle: "Pedido enviado com sucesso.",
    formSuccessLead: "Obrigado por contactar a Motans Studio.",
    formSuccessFollow:
      "Vamos analisar pessoalmente o seu pedido e normalmente responderemos em menos de 24 horas úteis.",
    formSuccessBody:
      "Obrigado, {name}. Responderemos em {email} em menos de 24 h úteis.",
    formSendAnother: "Enviar outro pedido",
    formErrorGeneric: "Ocorreu um erro. Tente novamente.",
    formMessageTooLong: "Máximo 5000 caracteres",
    formRequiredIntent: "Indique o que procura",
    formRequiredName: "O nome completo é obrigatório",
    formRequiredEmail: "O email é obrigatório",
    formInvalidEmail: "Email inválido",
    formTurnstileRequired: "Conclua a verificação de segurança",
    intentWebOnly: "Web",
    intentCustomSaas: "Software / SaaS",
    intentAutomation: "Automatização",
    intentOther: "Outra consulta",
    intentWebDesc: "Landing pages, sites corporativos e eCommerce.",
    intentSaasDesc: "Aplicações web e plataformas à medida.",
    intentAutoDesc: "IA, integrações e otimização de processos.",
    intentOtherDesc: "Se o projeto não se encaixa nas categorias acima.",
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
