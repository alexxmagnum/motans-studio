import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { test } from "node:test";
import ts from "typescript";

const __dirname = dirname(fileURLToPath(import.meta.url));
const appRoot = join(__dirname, "..");

const loadTypescriptModule = async (filePath, importMap = {}) => {
  const source = readFileSync(filePath, "utf-8");
  let rewritten = source;
  for (const [specifier, resolvedUrl] of Object.entries(importMap)) {
    rewritten = rewritten.replaceAll(
      `from "${specifier}"`,
      `from ${JSON.stringify(resolvedUrl)}`,
    );
    rewritten = rewritten.replaceAll(
      `from '${specifier}'`,
      `from ${JSON.stringify(resolvedUrl)}`,
    );
  }
  const transpiled = ts.transpileModule(rewritten, {
    compilerOptions: {
      module: ts.ModuleKind.ES2022,
      target: ts.ScriptTarget.ES2022,
      strict: true,
    },
    fileName: pathToFileURL(filePath).href,
  });
  const moduleUrl = `data:text/javascript;charset=utf-8,${encodeURIComponent(transpiled.outputText)}`;
  return import(moduleUrl);
};

test("MotanOS locale options expose six languages (shared with carta)", async () => {
  const i18nPath = join(appRoot, "packages", "i18n", "src", "index.ts");
  const optionsPath = join(
    appRoot,
    "packages",
    "design-system",
    "src",
    "locale",
    "motanosLocaleOptions.ts",
  );
  const i18nMod = await loadTypescriptModule(i18nPath);
  const i18nUrl = `data:text/javascript;charset=utf-8,${encodeURIComponent(
    [
      `export const supportedLanguageCodes = ${JSON.stringify([...i18nMod.supportedLanguageCodes])};`,
      `export const defaultLanguage = ${JSON.stringify(i18nMod.defaultLanguage)};`,
    ].join("\n"),
  )}`;
  const mod = await loadTypescriptModule(optionsPath, {
    "@motanos/i18n": i18nUrl,
  });
  assert.equal(mod.MOTANOS_LOCALE_OPTIONS.length, 6);
  assert.deepEqual(
    mod.MOTANOS_LOCALE_OPTIONS.map((l) => l.code),
    ["es", "en", "fr", "de", "it", "pt"],
  );
});

test("shell uses carta language switcher (public-menu-lang)", () => {
  const shell = readFileSync(join(appRoot, "components", "MotansStudioSiteShell.tsx"), "utf8");
  const selector = readFileSync(join(appRoot, "components", "MsSiteLanguageSelector.tsx"), "utf8");
  const mobileNav = readFileSync(join(appRoot, "components", "MsSiteMobileNav.tsx"), "utf8");
  assert.ok(shell.includes("MsSiteLanguageSelector"));
  assert.ok(selector.includes("MotanosLocaleLanguageSwitcher"));
  assert.ok(shell.includes('panelId="ms-site-lang-header"'));
  assert.ok(mobileNav.includes('panelId="ms-site-lang-mobile"'));
});

test("layout injects MotanOS locale styles from design-system", () => {
  const layout = readFileSync(join(appRoot, "app", "layout.tsx"), "utf8");
  assert.ok(layout.includes("MsSiteMotanosLangStyles"));
});
