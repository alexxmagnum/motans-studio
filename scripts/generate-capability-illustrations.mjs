/**
 * Genera ilustraciones WebP premium para la sección Qué hacemos.
 * Fuente: public/capabilities/source/*.svg
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const sourceDir = join(__dirname, "..", "public", "capabilities", "source");
const outDir = join(__dirname, "..", "public", "capabilities");

const assets = [
  { name: "webs", out: "webs-premium.webp" },
  { name: "saas", out: "saas-premium.webp" },
  { name: "automation", out: "automation-premium.webp" },
  { name: "motanos", out: "motanos-premium.webp" },
];

for (const asset of assets) {
  const svg = readFileSync(join(sourceDir, `${asset.name}.svg`));
  const target = join(outDir, asset.out);
  await sharp(svg).webp({ quality: 82, effort: 6 }).toFile(target);
  console.log(`[capabilities] ${asset.out}`);
}
