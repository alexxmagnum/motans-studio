import { describe, it, before } from "node:test";
import assert from "node:assert";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import ts from "typescript";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const appDir = join(__dirname, "..", "app");
const foundationPath = join(__dirname, "..", "lib", "commercialSiteFoundation.ts");
const sectionsPath = join(__dirname, "..", "lib", "commercialSiteSections.ts");

let foundationModule;
let sectionsModule;

const transpileTypescript = (filePath) => {
  const source = readFileSync(filePath, "utf-8");
  return ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ES2022,
      target: ts.ScriptTarget.ES2022,
      strict: true,
    },
    fileName: pathToFileURL(filePath).href,
  }).outputText;
};

const toDataModuleUrl = (source) =>
  `data:text/javascript;base64,${Buffer.from(source, "utf-8").toString("base64")}`;

const loadTypescriptModule = (filePath) => import(toDataModuleUrl(transpileTypescript(filePath)));

const readSource = (relativePath) => ({
  name: relativePath,
  text: readFileSync(join(appDir, relativePath), "utf-8"),
});

const collectStrings = (value) => {
  if (typeof value === "string") {
    return [value];
  }

  if (Array.isArray(value)) {
    return value.flatMap(collectStrings);
  }

  if (value && typeof value === "object") {
    return Object.values(value).flatMap(collectStrings);
  }

  return [];
};

const assertNoForbiddenPatterns = (source, patterns) => {
  for (const { id, pattern } of patterns) {
    assert.doesNotMatch(source.text, pattern, `${source.name} should not contain forbidden claim: ${id}`);
  }
};

const getVisibleCopySources = () => [
  readSource("page.tsx"),
  readSource(join("planes", "page.tsx")),
  readSource(join("servicios", "page.tsx")),
  readSource(join("motanos", "page.tsx")),
  readSource(join("motanos", "hosteleria", "page.tsx")),
  readSource(join("..", "components", "hosteleria", "MsHosteleriaLandingV1.tsx")),
  readSource(join("..", "lib", "msHosteleriaLandingFoundation.ts")),
  readSource(join("contacto", "page.tsx")),
  readSource(join("..", "components", "MsStudioPathCards.tsx")),
  readSource(join("..", "components", "MsEcosystemBridge.tsx")),
  readSource(join("..", "components", "MsMotanosMoment.tsx")),
  readSource(join("..", "components", "MsMotanosAccountActions.tsx")),
  readSource(join("..", "components", "MsStudioConfidence.tsx")),
  readSource(join("..", "components", "MsServiceShowcase.tsx")),
  readSource(join("..", "components", "MsFeatureCards.tsx")),
  readSource(join("..", "components", "MsStudioFooter.tsx")),
  readSource(join("..", "components", "MsHeroHosteleriaJourneyPanel.tsx")),
  readSource(join("..", "components", "studio-home", "MsStudioHomeHero.tsx")),
  readSource(join("..", "components", "home", "MsHomeHero.tsx")),
  readSource(join("..", "components", "home", "MsHomeWhatWeDo.tsx")),
  readSource(join("..", "components", "home", "MsHomePlans.tsx")),
  readSource(join("..", "components", "home", "MsHomeContact.tsx")),
  readSource(join("..", "components", "home", "MsHomeCases.tsx")),
  readSource(join("..", "components", "home", "MsHomeMotanosFlow.tsx")),
  readSource(join("..", "lib", "msStudioHomeFoundation.ts")),
  readSource(join("..", "lib", "msSiteDarkPremiumFoundation.ts")),
  readSource(join("..", "components", "MsHosteleriaOwnerStartPaths.tsx")),
  readSource(join("..", "lib", "msSiteOwnerOnboardingPathFoundation.ts")),
  readSource(join("..", "lib", "msSite1703Foundation.ts")),
];

const getFoundationCopySource = () => ({
  name: "commercial-site foundation messages and section allowed copy",
  text: [
    ...collectStrings(foundationModule.COMMERCIAL_SITE_FOUNDATION_MESSAGE),
    ...sectionsModule.COMMERCIAL_SITE_SECTIONS.flatMap((section) => [
      section.label,
      section.description,
      section.allowedMessage,
    ]),
  ].join("\n"),
});

const getFoundationForbiddenClaimsSource = () => ({
  name: "commercial-site section forbidden-claims policy",
  text: sectionsModule.COMMERCIAL_SITE_SECTIONS.flatMap((section) => section.forbiddenClaims).join("\n"),
});

const VISIBLE_COPY_FORBIDDEN_PATTERNS = [
  {
    id: "standalone-digital-menu-product",
    pattern: /\b(carta\s+(digital|qr)\s+(independiente|como producto suelto)|vendemos\s+(una\s+)?carta\s+(digital|qr)|te vendemos\s+(una\s+)?carta\s+(digital|qr))\b/i,
  },
  {
    id: "customer-web-as-menu-source",
    pattern: /\b(web cliente|web del negocio|tu web)\b[^.:\n]{0,90}\b(fuente real|gobierna|controla)\b[^.:\n]{0,80}\b(carta|productos|precios|disponibilidad)\b/i,
  },
  {
    id: "public-menu-as-menu-source",
    pattern: /\bpublic-menu\b[^.:\n]{0,90}\b(fuente real|gobierna|controla|sustituye)\b[^.:\n]{0,80}\b(carta|productos|precios|disponibilidad|MotanOS)\b/i,
  },
  {
    id: "real-account-or-restaurant-activation",
    pattern: /\b(activar\s+mi\s+(cuenta|restaurante|negocio)|crear\s+mi\s+(cuenta|restaurante|negocio)|activa\s+tu\s+cuenta|crea\s+tu\s+(cuenta|restaurante|negocio)|alta automatica lista|cliente real operativo)\b/i,
  },
  {
    id: "real-menu-publishing",
    pattern: /\b(publica(r)?\s+(mi|tu)\s+carta real|publicar carta real ahora|carta real publicada)\b/i,
  },
  {
    id: "checkout-payments-or-charging-ready",
    pattern: /\b(checkout\s+(listo|activo|disponible)|paga(r)?\s+ahora|pagos?\s+(listos|activo|disponible)|cobro\s+(listo|activo|disponible)|empieza a cobrar hoy)\b/i,
  },
  {
    id: "blocked-future-modules-as-active",
    pattern: /\b(takeaway|delivery|reservas(?:\s+live)?)\b[^.:\n]{0,80}\b(incluido|incluida|incluidos|incluidas|listo|lista|listos|listas|activo|activa|activos|activas|disponible|ya disponible)\b/i,
  },
  {
    id: "execute-live-read-ready",
    pattern: /\b(execute|live-read|live read)\b[^.:\n]{0,80}\b(listo|lista|activo|activa|disponible)\b/i,
  },
  {
    id: "real-backend-api-connection",
    pattern: /\b(backend|api|apiClient)\b[^.:\n]{0,80}\b(real conectado|conectado a produccion|listo en produccion|activo en produccion)\b/i,
  },
  {
    id: "secrets-env-service-role-visible",
    pattern: /\b(service_role|SUPABASE_SERVICE_ROLE_KEY|secret|secrets|\.env)\b/i,
  },
];

const PRICING_FORBIDDEN_PATTERNS = [
  {
    id: "hardcoded-euro-or-dollar-price",
    pattern: /(?:€|\$)\s*\d+[,.]?\d*/i,
  },
  {
    id: "final-pricing-or-live-offer",
    pattern: /\b(precio\s+final|pricing\s+definitivo\s+aprobado|oferta\s+live|ofertas\s+live|contrata(r)?\s+ahora|paga(r)?\s+ahora)\b/i,
  },
  {
    id: "free-guaranteed-or-unlimited-without-approval",
    pattern: /\b(gratis|gratuito|garantizado|garantizada|ilimitado|ilimitada|ilimitados|ilimitadas)\b/i,
  },
];

const CTA_ACTIVATIONAL_PATTERNS = [
  {
    id: "activate-account-restaurant-or-module",
    pattern: />\s*(Activar\s+mi\s+(cuenta|restaurante|negocio|Takeaway|Delivery|Reservas)|Crear\s+mi\s+(cuenta|restaurante|negocio)|Publicar\s+(mi\s+)?carta|Pagar ahora|Contratar ahora|Empezar gratis)\s*</i,
  },
  {
    id: "activational-link-text",
    pattern: /\b(Activar mi cuenta|Crear restaurante|Publicar mi carta|Pagar ahora|Contratar ahora|Activar Takeaway|Activar Delivery|Activar Reservas)\b/i,
  },
];

describe("Commercial landing visible claims guard", () => {
  before(async () => {
    foundationModule = await loadTypescriptModule(foundationPath);
    sectionsModule = await loadTypescriptModule(sectionsPath);
  });

  it("keeps visible home and plans copy free from forbidden product claims", () => {
    for (const source of getVisibleCopySources()) {
      assertNoForbiddenPatterns(source, VISIBLE_COPY_FORBIDDEN_PATTERNS);
    }
  });

  it("keeps visible CTA copy non-activational", () => {
    for (const source of getVisibleCopySources()) {
      assertNoForbiddenPatterns(source, CTA_ACTIVATIONAL_PATTERNS);
    }
  });

  it("keeps plans copy free from final pricing, hardcoded prices and unapproved free/unlimited claims", () => {
    assertNoForbiddenPatterns(readSource(join("planes", "page.tsx")), PRICING_FORBIDDEN_PATTERNS);
  });

  it("keeps commercial foundation copy claims-safe", () => {
    const source = getFoundationCopySource();

    assertNoForbiddenPatterns(source, VISIBLE_COPY_FORBIDDEN_PATTERNS);
    assertNoForbiddenPatterns(source, CTA_ACTIVATIONAL_PATTERNS);
  });

  it("keeps commercial foundation forbidden-claims policy explicit", () => {
    const source = getFoundationForbiddenClaimsSource();

    assert.match(source.text, /carta digital como producto/i);
    assert.match(source.text, /web cliente.*fuente real/i);
    assert.match(source.text, /delivery\/takeaway como activos/i);
    assert.match(source.text, /checkout/i);
  });

  it("keeps commercial foundation status flags closed for real activation surfaces", () => {
    const status = foundationModule.COMMERCIAL_SITE_FOUNDATION_STATUS;

    assert.strictEqual(status.digitalMenuBelongsToMotanOS, true);
    assert.strictEqual(status.digitalMenuSoldStandalone, false);
    assert.strictEqual(status.allowsRealLeadCapture, true);
    assert.strictEqual(status.allowsRealAssistedRequests, true);
    assert.strictEqual(status.publishableMinimally, true);
    assert.strictEqual(status.allowsCheckout, false);
    assert.strictEqual(status.allowsPayments, false);
    assert.strictEqual(status.allowsFinalPricing, false);
    assert.strictEqual(status.allowsTenantCreation, false);
    assert.strictEqual(status.allowsRealOnboarding, false);
    assert.strictEqual(status.deliveryActive, false);
    assert.strictEqual(status.takeawayActive, false);
    assert.strictEqual(status.productionReady, false);
  });

  it("keeps blocked commercial actions disabled and explicitly non-real", () => {
    for (const action of foundationModule.COMMERCIAL_SITE_BLOCKED_ACTIONS) {
      if (action.reason === "enabled_via_public_api") {
        assert.strictEqual(action.disabled, false, `${action.id} must be enabled for public intake`);
        continue;
      }
      assert.strictEqual(action.reason, "blocked", `${action.id} must remain blocked`);
      assert.strictEqual(action.disabled, true, `${action.id} must remain disabled`);
    }
  });

  it("keeps foundation rules and limits explicit about blocked checkout, pricing and future modules", () => {
    const rulesAndLimits = [
      ...foundationModule.COMMERCIAL_SITE_FOUNDATION_RULES,
      ...foundationModule.COMMERCIAL_SITE_FOUNDATION_LIMITS,
    ].join("\n");

    assert.match(rulesAndLimits, /No checkout/i);
    assert.match(rulesAndLimits, /No payments/i);
    assert.match(rulesAndLimits, /No final pricing/i);
    assert.match(rulesAndLimits, /No future modules promised as active/i);
  });
});
