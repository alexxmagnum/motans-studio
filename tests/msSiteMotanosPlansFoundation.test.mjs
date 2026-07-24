import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, test } from "node:test";

const __dirname = dirname(fileURLToPath(import.meta.url));
const foundation = readFileSync(join(__dirname, "..", "lib", "msSiteMotanosPlansFoundation.ts"), "utf-8");

describe("msSiteMotanosPlansFoundation", () => {
  test("home plans section uses anchor planes", () => {
    assert.ok(foundation.includes('anchorId: "planes"'));
    assert.ok(foundation.includes("Precio próximamente"));
    assert.ok(!foundation.includes("€"));
  });

  test("three conceptual plans exported", () => {
    assert.ok(foundation.includes("MotanOS Base"));
    assert.ok(foundation.includes("MotanOS Pro"));
    assert.ok(foundation.includes("MotanOS Premium"));
  });

  test("planes page content exported", () => {
    assert.ok(foundation.includes("MS_SITE_PLANES_PAGE"));
    assert.ok(foundation.includes("Solicitar asesoramiento"));
  });

  test("planes page uses premium section component", () => {
    const plansPage = readFileSync(join(__dirname, "..", "app", "planes", "page.tsx"), "utf-8");
    assert.ok(plansPage.includes("MsMotanosPlansSection"));
    assert.ok(plansPage.includes('variant="page"'));
    assert.ok(!plansPage.includes("MARKETS"));
  });
});
