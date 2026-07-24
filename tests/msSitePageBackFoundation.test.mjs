import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "node:test";

const __dirname = dirname(fileURLToPath(import.meta.url));
const appRoot = join(__dirname, "..");

test("msSitePageBackFoundation — block id and home hidden", () => {
  const foundation = readFileSync(join(appRoot, "lib", "msSitePageBackFoundation.ts"), "utf-8");
  assert.match(foundation, /MS_SITE_PAGE_BACK_V1/);
  assert.match(foundation, /pathname === MS_SITE_ROUTES\.home/);
  assert.match(foundation, /return null/);
});

test("msSitePageBackFoundation — routes resolve parent", () => {
  const foundation = readFileSync(join(appRoot, "lib", "msSitePageBackFoundation.ts"), "utf-8");
  assert.match(foundation, /\[MS_SITE_ROUTES\.servicios\]/);
  assert.match(foundation, /\[MS_SITE_ROUTES\.hosteleria\].*motanos/s);
  assert.match(foundation, /Volver a MotanOS/);
  assert.match(foundation, /\[MS_SITE_ROUTES\.solicitud\]/);
  assert.match(foundation, /Volver a planes/);
});

test("msSitePageBackFoundation — layout wires global back link", () => {
  const layout = readFileSync(join(appRoot, "app", "layout.tsx"), "utf-8");
  assert.match(layout, /MsSitePageBackLink/);
  assert.match(layout, /<main id="main-content">/);
});

test("msSitePageBackFoundation — component has arrow back affordance", () => {
  const component = readFileSync(
    join(appRoot, "components", "MsSitePageBackLink.tsx"),
    "utf-8",
  );
  assert.match(component, /ms-page-back/);
  assert.match(component, /←/);
  assert.match(component, /getMsSitePageBack/);
});

test("msSitePageBackFoundation — styles present", () => {
  const css = readFileSync(join(appRoot, "app", "msStudioHome.css"), "utf-8");
  assert.match(css, /\.ms-page-back-wrap/);
  assert.match(css, /position:\s*fixed/);
  assert.match(css, /\.ms-page-back-spacer/);
  assert.match(css, /\.ms-page-back__arrow/);
});
