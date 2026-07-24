/**
 * Convierte capturas reales a WebP optimizado para la seccion Que hacemos.
 */
import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const capDir = join(__dirname, "..", "public", "capabilities");

const jobs = [
  { in: "webs-client-desktop.png", out: "webs-demo.webp", width: 1400 },
  { in: "saas-owner-desktop.png", out: "saas-demo.webp", width: 1400 },
  { in: "automation-staff-focus.png", out: "automation-demo.webp", width: 1200 },
  { in: "motanos-carta-desktop.png", out: "motanos-carta.webp", width: 780 },
];

for (const job of jobs) {
  const input = join(capDir, job.in);
  if (!existsSync(input)) {
    console.error(`[capabilities] missing ${job.in}`);
    process.exit(1);
  }
  const target = join(capDir, job.out);
  await sharp(readFileSync(input))
    .resize({ width: job.width, withoutEnlargement: true })
    .webp({ quality: 84, effort: 6 })
    .toFile(target);
  console.log(`[capabilities] ${job.out}`);
}
