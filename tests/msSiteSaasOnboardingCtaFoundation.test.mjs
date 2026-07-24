import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, test } from "node:test";

const __dirname = dirname(fileURLToPath(import.meta.url));
const foundation = readFileSync(
  join(__dirname, "..", "lib", "msSiteSaasOnboardingCtaFoundation.ts"),
  "utf-8",
);
const component = readFileSync(
  join(__dirname, "..", "components", "MsMotanosAccountActions.tsx"),
  "utf-8",
);
const motanosPage = readFileSync(join(__dirname, "..", "app", "motanos", "page.tsx"), "utf-8");

describe("msSiteSaasOnboardingCtaFoundation", () => {
  test("exposes auth labels and login path", () => {
    assert.ok(foundation.includes('createAccount: "Crear cuenta"'));
    assert.ok(foundation.includes('myAccount: "Mi cuenta"'));
    assert.ok(foundation.includes('MS_SITE_SAAS_ONBOARDING_LOGIN_PATH = "/login"'));
    assert.ok(foundation.includes("buildMotanosClientLoginUrl"));
  });

  test("motanos page renders account actions", () => {
    assert.ok(motanosPage.includes("MsMotanosAccountActions"));
    assert.ok(component.includes("msh-btn--cta"));
    assert.ok(component.includes("msh-btn__arrow"));
    assert.ok(component.includes("buildMotanosClientRegisterUrl"));
    assert.ok(component.includes("buildMotanosClientLoginUrl"));
  });
});
