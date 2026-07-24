/**
 * Cinema v3 — escena full-bleed, móvil en mesa (no mockup flotante), viñeta total.
 * Sin stamp. Salida: hosteleria-hero-cinema-v3.png/webp
 */
import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const publicDir = join(root, "public");
const outDir = join(publicDir, "hero");

const W = 2560;
const H = 1200;

const CARTA_PATH = join(publicDir, "hero", "sources", "motanos-carta-capture.png");
const OUT_PATH = join(outDir, "hosteleria-hero-cinema-v3.png");

function fullSceneSvg() {
  return Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="warm" cx="54%" cy="48%" r="48%">
      <stop offset="0%" stop-color="#5a3820" stop-opacity="0.42"/>
      <stop offset="55%" stop-color="#1e1208" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="vignette" cx="50%" cy="48%" r="68%">
      <stop offset="42%" stop-color="#000" stop-opacity="0"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0.78"/>
    </radialGradient>
    <linearGradient id="wood" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#1a1008"/>
      <stop offset="35%" stop-color="#3d2a1c"/>
      <stop offset="70%" stop-color="#2a1c14"/>
      <stop offset="100%" stop-color="#120c08"/>
    </linearGradient>
    <filter id="blur" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3"/>
    </filter>
    <filter id="softGlow" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="28" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>
  <rect width="${W}" height="${H}" fill="#040302"/>
  <rect width="${W}" height="${H}" fill="url(#warm)"/>
  <ellipse cx="1380" cy="520" rx="420" ry="300" fill="#c48a4a" opacity="0.09" filter="url(#softGlow)"/>
  <path d="M -40 ${H - 80} L ${W + 40} ${H - 220} L ${W + 40} ${H + 40} L -40 ${H + 40} Z" fill="url(#wood)" opacity="0.96"/>

  <ellipse cx="980" cy="${H - 118}" rx="100" ry="24" fill="#141414" opacity="0.88"/>
  <ellipse cx="980" cy="${H - 128}" rx="78" ry="18" fill="#22201e" stroke="#3a3530" stroke-width="1"/>

  <g opacity="0.45" stroke="#8a7a6a" stroke-width="1.8" fill="none">
    <path d="M 860 ${H - 210} C 860 ${H - 236}, 892 ${H - 252}, 900 ${H - 268}"/>
    <path d="M 900 ${H - 268} L 900 ${H - 118}"/>
    <path d="M 888 ${H - 118} L 912 ${H - 118}"/>
  </g>

  <g transform="translate(1120 ${H - 200}) rotate(-5)">
    <rect x="0" y="0" width="88" height="102" rx="7" fill="#f4f0ea" opacity="0.88"/>
    <rect x="9" y="9" width="70" height="68" fill="#111"/>
    <g fill="#f4f0ea">
      <rect x="13" y="13" width="18" height="18"/>
      <rect x="53" y="13" width="18" height="18"/>
      <rect x="13" y="53" width="18" height="18"/>
      <rect x="38" y="38" width="7" height="7"/>
      <rect x="49" y="38" width="7" height="7"/>
    </g>
    <text x="44" y="94" text-anchor="middle" font-family="Georgia, serif" font-size="8" fill="#4a4038">Mesa 4</text>
  </g>

  <g transform="translate(1680 ${H - 340}) rotate(10)" opacity="0.32" filter="url(#blur)">
    <rect x="0" y="0" width="130" height="165" rx="5" fill="#efe8dc"/>
    <text x="14" y="28" font-family="monospace" font-size="10" fill="#5a4a3a">COCINA</text>
    <text x="14" y="50" font-family="monospace" font-size="9" fill="#3a3028">2x Croquetas</text>
    <text x="14" y="66" font-family="monospace" font-size="9" fill="#3a3028">Mesa 4</text>
  </g>

  <rect width="${W}" height="${H}" fill="url(#vignette)"/>
</svg>`);
}

function phoneFrameSvg(screenW, screenH, bezel = 12, radius = 32) {
  const fw = screenW + bezel * 2;
  const fh = screenH + bezel * 2 + 6;
  return Buffer.from(`<svg width="${fw}" height="${fh}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="frame" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#353535"/>
      <stop offset="100%" stop-color="#101010"/>
    </linearGradient>
    <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="0" dy="18" stdDeviation="20" flood-color="#000" flood-opacity="0.75"/>
    </filter>
  </defs>
  <rect x="0" y="0" width="${fw}" height="${fh}" rx="${radius}" fill="url(#frame)" filter="url(#shadow)"/>
  <rect x="${bezel}" y="${bezel + 3}" width="${screenW}" height="${screenH}" rx="${Math.max(16, radius - 10)}" fill="#000"/>
</svg>`);
}

async function main() {
  await mkdir(outDir, { recursive: true });

  const cartaMeta = await sharp(CARTA_PATH).metadata();
  const screenH = 560;
  const screenW = Math.round((cartaMeta.width / cartaMeta.height) * screenH);
  const bezel = 12;

  const cartaScreen = await sharp(CARTA_PATH)
    .resize(screenW, screenH, { fit: "fill" })
    .png()
    .toBuffer();

  const phone = await sharp(phoneFrameSvg(screenW, screenH, bezel))
    .composite([{ input: cartaScreen, left: bezel, top: bezel + 3 }])
    .png()
    .toBuffer();

  const phoneRotated = await sharp(phone)
    .rotate(-11, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  const phoneMeta = await sharp(phoneRotated).metadata();

  const phoneLeft = Math.round(W * 0.54 - phoneMeta.width / 2);
  const phoneTop = H - phoneMeta.height - 88;

  const sceneBase = await sharp(fullSceneSvg()).png().toBuffer();

  await sharp(sceneBase)
    .composite([{ input: phoneRotated, left: phoneLeft, top: phoneTop }])
    .png({ compressionLevel: 9 })
    .toFile(OUT_PATH);

  const webpOut = OUT_PATH.replace(/\.png$/, ".webp");
  await sharp(OUT_PATH).webp({ quality: 90 }).toFile(webpOut);

  console.log(`[cinema-v3] PNG: ${OUT_PATH}`);
  console.log(`[cinema-v3] WebP: ${webpOut}`);
  console.log(`[cinema-v3] ${W}x${H} | phone ${phoneMeta.width}x${phoneMeta.height} @ (${phoneLeft},${phoneTop})`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
