import { describe, it } from "node:test";
import assert from "node:assert";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import {
  COMMERCIAL_SITE_BLOCKED_ACTIONS,
  COMMERCIAL_SITE_FOUNDATION_LIMITS,
  COMMERCIAL_SITE_FOUNDATION_MESSAGE,
  COMMERCIAL_SITE_FOUNDATION_RULES,
  COMMERCIAL_SITE_FOUNDATION_STATUS,
} from "../lib/commercialSiteFoundation";
import { COMMERCIAL_SITE_SECTIONS } from "../lib/commercialSiteSections";

type GuardedSource = {
  readonly name: string;
  readonly text: string;
};

type ForbiddenPattern = {
  readonly id: string;
  readonly pattern: RegExp;
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const appDir = join(__dirname, "..", "app");

const readSource = (relativePath: string): GuardedSource => ({
  name: relativePath,
  text: readFileSync(join(appDir, relativePath), "utf-8"),
});

const collectStrings = (value: unknown): string[] => {
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

const assertNoForbiddenPatterns = (source: GuardedSource, patterns: readonly ForbiddenPattern[]): void => {
  for (const { id, pattern } of patterns) {
    assert.doesNotMatch(source.text, pattern, `${source.name} should not contain forbidden claim: ${id}`);
  }
};

const componentsDir = join(__dirname, "..", "components");
const libDir = join(__dirname, "..", "lib");

const VISIBLE_COPY_SOURCES: readonly GuardedSource[] = [
  readSource("page.tsx"),
  readSource(join("planes", "page.tsx")),
  readSource(join("servicios", "page.tsx")),
  readSource(join("motanos", "page.tsx")),
  readSource(join("motanos", "hosteleria", "page.tsx")),
  readSource(join("..", "components", "hosteleria", "MsHosteleriaLandingV1.tsx")),
  readSource(join("..", "lib", "msHosteleriaLandingFoundation.ts")),
  readSource(join("contacto", "page.tsx")),
  { name: "MsHosteleriaOwnerStartPaths.tsx", text: readFileSync(join(componentsDir, "MsHosteleriaOwnerStartPaths.tsx"), "utf-8") },
  { name: "msSiteOwnerOnboardingPathFoundation.ts", text: readFileSync(join(libDir, "msSiteOwnerOnboardingPathFoundation.ts"), "utf-8") },
  { name: "MsClaimsMatrix.tsx", text: readFileSync(join(componentsDir, "MsClaimsMatrix.tsx"), "utf-8") },
  { name: "MsTrustStrip.tsx", text: readFileSync(join(componentsDir, "MsTrustStrip.tsx"), "utf-8") },
  { name: "msSite1702Foundation.ts", text: readFileSync(join(libDir, "msSite1702Foundation.ts"), "utf-8") },
];

const FOUNDATION_COPY_SOURCE: GuardedSource = {
  name: "commercial-site foundation messages and section allowed copy",
  text: [
    ...collectStrings(COMMERCIAL_SITE_FOUNDATION_MESSAGE),
    ...COMMERCIAL_SITE_SECTIONS.flatMap((section) => [
      section.label,
      section.description,
      section.allowedMessage,
    ]),
  ].join("\n"),
};

const FOUNDATION_FORBIDDEN_CLAIMS_SOURCE: GuardedSource = {
  name: "commercial-site section forbidden-claims policy",
  text: COMMERCIAL_SITE_SECTIONS.flatMap((section) => section.forbiddenClaims).join("\n"),
};

const VISIBLE_COPY_FORBIDDEN_PATTERNS: readonly ForbiddenPattern[] = [
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

const PRICING_FORBIDDEN_PATTERNS: readonly ForbiddenPattern[] = [
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

const CTA_ACTIVATIONAL_PATTERNS: readonly ForbiddenPattern[] = [
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
  it("keeps visible home and plans copy free from forbidden product claims", () => {
    for (const source of VISIBLE_COPY_SOURCES) {
      assertNoForbiddenPatterns(source, VISIBLE_COPY_FORBIDDEN_PATTERNS);
    }
  });

  it("keeps visible CTA copy non-activational", () => {
    for (const source of VISIBLE_COPY_SOURCES) {
      assertNoForbiddenPatterns(source, CTA_ACTIVATIONAL_PATTERNS);
    }
  });

  it("keeps plans copy free from final pricing, hardcoded prices and unapproved free/unlimited claims", () => {
    assertNoForbiddenPatterns(readSource(join("planes", "page.tsx")), PRICING_FORBIDDEN_PATTERNS);
  });

  it("keeps commercial foundation copy claims-safe", () => {
    assertNoForbiddenPatterns(FOUNDATION_COPY_SOURCE, VISIBLE_COPY_FORBIDDEN_PATTERNS);
    assertNoForbiddenPatterns(FOUNDATION_COPY_SOURCE, CTA_ACTIVATIONAL_PATTERNS);
  });

  it("keeps commercial foundation forbidden-claims policy explicit", () => {
    assert.match(FOUNDATION_FORBIDDEN_CLAIMS_SOURCE.text, /carta digital como producto/i);
    assert.match(FOUNDATION_FORBIDDEN_CLAIMS_SOURCE.text, /web cliente.*fuente real/i);
    assert.match(FOUNDATION_FORBIDDEN_CLAIMS_SOURCE.text, /delivery\/takeaway como activos/i);
    assert.match(FOUNDATION_FORBIDDEN_CLAIMS_SOURCE.text, /checkout/i);
  });

  it("keeps commercial foundation status flags closed for real activation surfaces", () => {
    assert.strictEqual(COMMERCIAL_SITE_FOUNDATION_STATUS.digitalMenuBelongsToMotanOS, true);
    assert.strictEqual(COMMERCIAL_SITE_FOUNDATION_STATUS.digitalMenuSoldStandalone, false);
    assert.strictEqual(COMMERCIAL_SITE_FOUNDATION_STATUS.allowsRealLeadCapture, true);
    assert.strictEqual(COMMERCIAL_SITE_FOUNDATION_STATUS.allowsRealAssistedRequests, true);
    assert.strictEqual(COMMERCIAL_SITE_FOUNDATION_STATUS.publishableMinimally, true);
    assert.strictEqual(COMMERCIAL_SITE_FOUNDATION_STATUS.allowsCheckout, false);
    assert.strictEqual(COMMERCIAL_SITE_FOUNDATION_STATUS.allowsPayments, false);
    assert.strictEqual(COMMERCIAL_SITE_FOUNDATION_STATUS.allowsFinalPricing, false);
    assert.strictEqual(COMMERCIAL_SITE_FOUNDATION_STATUS.allowsTenantCreation, false);
    assert.strictEqual(COMMERCIAL_SITE_FOUNDATION_STATUS.allowsRealOnboarding, false);
    assert.strictEqual(COMMERCIAL_SITE_FOUNDATION_STATUS.deliveryActive, false);
    assert.strictEqual(COMMERCIAL_SITE_FOUNDATION_STATUS.takeawayActive, false);
    assert.strictEqual(COMMERCIAL_SITE_FOUNDATION_STATUS.productionReady, false);
  });

  it("keeps blocked commercial actions disabled and explicitly non-real", () => {
    for (const action of COMMERCIAL_SITE_BLOCKED_ACTIONS) {
      if (action.reason === "enabled_via_public_api") {
        assert.strictEqual(action.disabled, false, `${action.id} must be enabled for public intake`);
        continue;
      }
      assert.strictEqual(action.reason, "blocked", `${action.id} must remain blocked`);
      assert.strictEqual(action.disabled, true, `${action.id} must remain disabled`);
    }
  });

  it("keeps foundation rules and limits explicit about blocked checkout, pricing and future modules", () => {
    const rulesAndLimits = [...COMMERCIAL_SITE_FOUNDATION_RULES, ...COMMERCIAL_SITE_FOUNDATION_LIMITS].join("\n");

    assert.match(rulesAndLimits, /No checkout/i);
    assert.match(rulesAndLimits, /No payments/i);
    assert.match(rulesAndLimits, /No final pricing/i);
    assert.match(rulesAndLimits, /No future modules promised as active/i);
  });
});
