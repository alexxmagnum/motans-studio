/**
 * Capture hosteleria cinema hero — desktop + mobile.
 * Usage: node scripts/capture-hosteleria-cinema-hero.mjs [baseUrl]
 */
import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "..", ".screenshots");
const baseUrl = process.argv[2] ?? "http://localhost:3001";
const route = "/motanos/hosteleria";

async function main() {
  const { chromium } = await import("playwright");
  await mkdir(outDir, { recursive: true });

  const browser = await chromium.launch();
  const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await desktop.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" });
  await desktop.waitForSelector(".msh-portada-hero");
  const desktopPath = join(outDir, "hosteleria-portada-hero-desktop.png");
  await desktop.locator(".msh-portada-hero").screenshot({ path: desktopPath });
  console.log(`[capture] desktop → ${desktopPath}`);

  const mobile = await browser.newPage({
    viewport: { width: 390, height: 844 },
    isMobile: true,
  });
  await mobile.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" });
  await mobile.waitForSelector(".msh-portada-hero");
  const mobilePath = join(outDir, "hosteleria-portada-hero-mobile.png");
  await mobile.locator(".msh-portada-hero").screenshot({ path: mobilePath });
  console.log(`[capture] mobile → ${mobilePath}`);

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
