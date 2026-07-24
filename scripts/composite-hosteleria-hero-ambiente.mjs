/**
 * Hero ambiente v2 — sala legible, sin móvil, sin UI de producto.
 * Salida: hosteleria-hero-ambiente.png/webp
 */
import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const outDir = join(root, "public", "hero");

const W = 2560;
const H = 1200;
const OUT_PATH = join(outDir, "hosteleria-hero-ambiente.png");

function ambienteSvg() {
  return Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="room" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#f3ede4"/>
      <stop offset="38%" stop-color="#ddd2c4"/>
      <stop offset="72%" stop-color="#9a8878"/>
      <stop offset="100%" stop-color="#4a382c"/>
    </linearGradient>
    <radialGradient id="window" cx="78%" cy="32%" r="38%">
      <stop offset="0%" stop-color="#fff8ee" stop-opacity="0.55"/>
      <stop offset="55%" stop-color="#e8c89a" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#3d2a1c" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="wood" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#1e1410"/>
      <stop offset="38%" stop-color="#4a3428"/>
      <stop offset="72%" stop-color="#3a2a20"/>
      <stop offset="100%" stop-color="#120c08"/>
    </linearGradient>
    <radialGradient id="vignette" cx="50%" cy="46%" r="74%">
      <stop offset="58%" stop-color="#000" stop-opacity="0"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0.42"/>
    </radialGradient>
    <filter id="blur" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="2.2"/>
    </filter>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#room)"/>
  <rect width="${W}" height="${H}" fill="url(#window)"/>

  <rect x="1760" y="96" width="300" height="460" rx="3" fill="#faf6ef" opacity="0.72"/>
  <rect x="1760" y="96" width="8" height="460" fill="#d4c4a8" opacity="0.5"/>

  <path d="M -40 ${H - 72} L ${W + 40} ${H - 210} L ${W + 40} ${H + 40} L -40 ${H + 40} Z" fill="url(#wood)" opacity="0.97"/>

  <ellipse cx="1240" cy="${H - 104}" rx="460" ry="92" fill="#6a4020" opacity="0.16"/>

  <ellipse cx="940" cy="${H - 114}" rx="112" ry="27" fill="#141210" opacity="0.92"/>
  <ellipse cx="940" cy="${H - 126}" rx="86" ry="21" fill="#2a2420" stroke="#524840" stroke-width="1.2"/>

  <g opacity="0.62" stroke="#6a5a4a" stroke-width="2.4" fill="none">
    <path d="M 780 ${H - 218} C 780 ${H - 248}, 816 ${H - 268}, 826 ${H - 286}"/>
    <path d="M 826 ${H - 286} L 826 ${H - 114}"/>
    <path d="M 810 ${H - 114} L 842 ${H - 114}"/>
    <ellipse cx="830" cy="${H - 232}" rx="24" ry="7" opacity="0.45" fill="#c9b29a"/>
  </g>

  <ellipse cx="1380" cy="${H - 120}" rx="104" ry="26" fill="#141210" opacity="0.78"/>
  <ellipse cx="1380" cy="${H - 132}" rx="80" ry="20" fill="#2a2420" stroke="#524840" stroke-width="1"/>

  <g opacity="0.5" stroke="#6a5a4a" stroke-width="2" fill="none">
    <path d="M 1280 ${H - 206} L 1300 ${H - 262} L 1300 ${H - 118}"/>
    <path d="M 1288 ${H - 118} L 1312 ${H - 118}"/>
  </g>

  <ellipse cx="1680" cy="${H - 116}" rx="88" ry="22" fill="#141210" opacity="0.55"/>
  <ellipse cx="1680" cy="${H - 126}" rx="68" ry="17" fill="#2a2420" stroke="#524840" stroke-width="1"/>

  <g opacity="0.38" stroke="#6a5a4a" stroke-width="1.8" fill="none">
    <path d="M 1600 ${H - 200} L 1616 ${H - 248} L 1616 ${H - 114}"/>
    <path d="M 1608 ${H - 114} L 1624 ${H - 114}"/>
  </g>

  <g transform="translate(1780 ${H - 348}) rotate(10)" opacity="0.34" filter="url(#blur)">
    <rect x="0" y="0" width="136" height="172" rx="5" fill="#efe8dc"/>
    <text x="16" y="30" font-family="monospace" font-size="10" fill="#5a4a3a">COCINA</text>
    <text x="16" y="54" font-family="monospace" font-size="9" fill="#3a3028">2x Croquetas</text>
    <text x="16" y="70" font-family="monospace" font-size="9" fill="#3a3028">Mesa 4</text>
  </g>

  <g opacity="0.35" stroke="#8a7a6a" stroke-width="1.6" fill="none">
    <path d="M 380 88 L 380 292"/>
    <circle cx="380" cy="80" r="13" fill="#e0d4c0" opacity="0.65"/>
    <path d="M 560 104 L 560 308"/>
    <circle cx="560" cy="96" r="11" fill="#e0d4c0" opacity="0.55"/>
    <path d="M 740 118 L 740 318"/>
    <circle cx="740" cy="110" r="10" fill="#e0d4c0" opacity="0.45"/>
  </g>

  <rect width="${W}" height="${H}" fill="url(#vignette)"/>
</svg>`);
}

async function main() {
  await mkdir(outDir, { recursive: true });

  await sharp(ambienteSvg())
    .sharpen({ sigma: 0.65, m1: 0.5, m2: 0.35 })
    .png({ compressionLevel: 9 })
    .toFile(OUT_PATH);

  const webpOut = OUT_PATH.replace(/\.png$/, ".webp");
  await sharp(OUT_PATH).webp({ quality: 93 }).toFile(webpOut);

  console.log(`[ambiente-v2] PNG: ${OUT_PATH}`);
  console.log(`[ambiente-v2] WebP: ${webpOut}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
