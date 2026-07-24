/**
 * MS_SITE_17_03C — Capture browser screenshots for visual sign-off.
 * Requires dev server at http://localhost:3001
 */
import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "..", "docs-screenshots", "MS_SITE_17_03C");
const baseUrl = process.env.MS_SITE_SCREENSHOT_BASE ?? "http://localhost:3001";

const routes = [
  { path: "/", file: "home.png" },
  { path: "/servicios", file: "servicios.png" },
  { path: "/motanos", file: "motanos.png" },
  { path: "/motanos/hosteleria", file: "hosteleria.png" },
  { path: "/contacto", file: "contacto.png" },
];

async function main() {
  let chromium;
  try {
    ({ chromium } = await import("playwright"));
  } catch {
    console.error(
      "[03C screenshots] Install playwright: pnpm add -D playwright --filter @motanos/commercial-site",
    );
    process.exit(1);
  }

  await mkdir(outDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  for (const route of routes) {
    const url = `${baseUrl}${route.path}`;
    await page.goto(url, { waitUntil: "networkidle", timeout: 60_000 });
    await page.waitForTimeout(800);
    const target = join(outDir, route.file);
    await page.screenshot({ path: target, fullPage: true });
    console.log(`[03C screenshots] ${route.path} → ${target}`);
  }

  await browser.close();
  console.log(`[03C screenshots] Done. Output: ${outDir}`);
}

main().catch((err) => {
  console.error("[03C screenshots] Failed:", err);
  process.exit(1);
});
