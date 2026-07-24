/**
 * Demos super premium: PNG en source/premium/ -> WebP optimizado.
 * Carta MotanOS: captura mobile Casa Motans.
 */
import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const premiumDir = join(__dirname, "..", "public", "capabilities", "source", "premium");
const capDir = join(__dirname, "..", "public", "capabilities");

const pngJobs = [
  { in: "webs-premium-demo.png", out: "webs-premium-demo.webp", width: 1536 },
  { in: "saas-premium-demo.png", out: "saas-premium-demo.webp", width: 1536 },
  { in: "automation-premium-demo.png", out: "automation-premium-demo.webp", width: 1536 },
];

for (const job of pngJobs) {
  const input = join(premiumDir, job.in);
  if (!existsSync(input)) {
    console.error(`[capabilities] missing ${input}`);
    process.exit(1);
  }
  await sharp(readFileSync(input))
    .resize({ width: job.width, withoutEnlargement: true })
    .webp({ quality: 88, effort: 6 })
    .toFile(join(capDir, job.out));
  console.log(`[capabilities] ${job.out}`);
}

const cartaIn = join(premiumDir, "motanos-carta-mobile.png");
if (!existsSync(cartaIn)) {
  console.error("[capabilities] missing motanos-carta-mobile.png");
  process.exit(1);
}
await sharp(readFileSync(cartaIn))
  .resize({ width: 734, withoutEnlargement: true })
  .webp({ quality: 88, effort: 6 })
  .toFile(join(capDir, "motanos-carta.webp"));
console.log("[capabilities] motanos-carta.webp");
