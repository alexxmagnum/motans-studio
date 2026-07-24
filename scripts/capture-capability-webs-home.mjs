/**
 * Captura hero home dark → public/capabilities/webs-client-desktop.png
 * Requiere dev server en http://localhost:3001
 */
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = join(__dirname, "..", "public", "capabilities", "webs-client-desktop.png");
const baseUrl = process.env.MS_SITE_SCREENSHOT_BASE ?? "http://localhost:3001";

async function main() {
  const { chromium } = await import("playwright");
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });

  await page.goto(`${baseUrl}/`, { waitUntil: "networkidle", timeout: 90_000 });
  await page.waitForTimeout(1200);

  const hero = page.locator(".msh-hero__viewport");
  await hero.waitFor({ state: "visible", timeout: 15_000 });
  await hero.screenshot({ path: outPath, type: "png" });

  await browser.close();
  console.log(`[capability-webs] saved ${outPath}`);
}

main().catch((error) => {
  console.error("[capability-webs] failed:", error);
  process.exit(1);
});
