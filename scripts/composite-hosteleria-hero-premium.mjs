/**
 * Premium hero compositor — uses user-provided assets pixel-perfect:
 * - hero/sources/motanos-stamp-official.png
 * - hero/sources/motanos-carta-capture.png
 * Pixels unchanged; carta only scaled inside phone screen bezel.
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

const STAMP_PATH = join(publicDir, "hero", "sources", "motanos-stamp-official.png");
const CARTA_PATH = join(publicDir, "hero", "sources", "motanos-carta-capture.png");
const OUT_PATH = join(outDir, "hosteleria-hero-premium-campaign.png");

function backgroundSvg() {
  return Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="warm" cx="72%" cy="68%" r="55%">
      <stop offset="0%" stop-color="#3d2a1a" stop-opacity="0.55"/>
      <stop offset="45%" stop-color="#1a1410" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#050505" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="vignette" cx="50%" cy="50%" r="72%">
      <stop offset="55%" stop-color="#000000" stop-opacity="0"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0.72"/>
    </radialGradient>
    <linearGradient id="wood" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2a1c14"/>
      <stop offset="40%" stop-color="#3d2a1c"/>
      <stop offset="100%" stop-color="#1a120d"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="#060606"/>
  <rect width="${Math.round(W * 0.52)}" height="${H}" fill="#000000"/>
  <rect width="${W}" height="${H}" fill="url(#warm)"/>
  <ellipse cx="1880" cy="920" rx="720" ry="380" fill="#2a1a10" opacity="0.35"/>
  <path d="M 980 ${H - 40} L ${W + 40} ${H - 180} L ${W + 40} ${H + 20} L 900 ${H + 20} Z" fill="url(#wood)" opacity="0.92"/>
  <rect width="${W}" height="${H}" fill="url(#vignette)"/>
</svg>`);
}

function sceneElementsSvg() {
  return Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="blur" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="2.4"/>
    </filter>
    <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="18" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>
  <!-- warm practical light -->
  <ellipse cx="1960" cy="700" rx="320" ry="220" fill="#c48a4a" opacity="0.11" filter="url(#softGlow)"/>
  <ellipse cx="1820" cy="1040" rx="480" ry="120" fill="#8a5a30" opacity="0.12"/>

  <!-- plate -->
  <ellipse cx="1680" cy="1010" rx="118" ry="28" fill="#141414" opacity="0.85"/>
  <ellipse cx="1680" cy="998" rx="92" ry="22" fill="#22201e" stroke="#3a3530" stroke-width="1.2"/>

  <!-- wine glass -->
  <g opacity="0.55" stroke="#8a7a6a" stroke-width="2" fill="none">
    <path d="M 1540 930 C 1540 900, 1578 878, 1588 858 C 1596 842, 1590 828, 1584 820"/>
    <path d="M 1584 820 L 1584 990"/>
    <path d="M 1568 990 L 1600 990"/>
    <ellipse cx="1588" cy="930" rx="26" ry="8" opacity="0.35" fill="#c9b29a"/>
  </g>

  <!-- QR card on table -->
  <g transform="translate(1760 940) rotate(-8)">
    <rect x="0" y="0" width="96" height="112" rx="8" fill="#f4f0ea" opacity="0.92"/>
    <rect x="10" y="10" width="76" height="76" fill="#111"/>
    <g fill="#f4f0ea">
      <rect x="14" y="14" width="22" height="22"/>
      <rect x="60" y="14" width="22" height="22"/>
      <rect x="14" y="60" width="22" height="22"/>
      <rect x="42" y="42" width="8" height="8"/>
      <rect x="54" y="42" width="8" height="8"/>
      <rect x="42" y="54" width="8" height="8"/>
      <rect x="66" y="54" width="8" height="8"/>
      <rect x="54" y="66" width="8" height="8"/>
    </g>
    <text x="48" y="104" text-anchor="middle" font-family="Georgia, serif" font-size="9" fill="#4a4038">Mesa 4</text>
  </g>

  <!-- kitchen ticket (blurred) -->
  <g transform="translate(2060 860) rotate(14)" opacity="0.42" filter="url(#blur)">
    <rect x="0" y="0" width="148" height="188" rx="6" fill="#efe8dc"/>
    <text x="16" y="34" font-family="monospace" font-size="11" fill="#5a4a3a">COCINA</text>
    <text x="16" y="62" font-family="monospace" font-size="10" fill="#3a3028">2x Croquetas</text>
    <text x="16" y="82" font-family="monospace" font-size="10" fill="#3a3028">Mesa 4</text>
    <rect x="16" y="98" width="88" height="18" rx="4" fill="#d8cfc2"/>
  </g>
</svg>`);
}

function phoneFrameSvg(screenW, screenH, bezel = 14, radius = 36) {
  const fw = screenW + bezel * 2;
  const fh = screenH + bezel * 2 + 8;
  return Buffer.from(`<svg width="${fw}" height="${fh}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="frame" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3a3a3a"/>
      <stop offset="50%" stop-color="#1e1e1e"/>
      <stop offset="100%" stop-color="#121212"/>
    </linearGradient>
    <filter id="shadow" x="-40%" y="-40%" width="180%" height="180%">
      <feDropShadow dx="0" dy="28" stdDeviation="24" flood-color="#000" flood-opacity="0.65"/>
    </filter>
  </defs>
  <rect x="0" y="0" width="${fw}" height="${fh}" rx="${radius}" fill="url(#frame)" filter="url(#shadow)"/>
  <rect x="${bezel}" y="${bezel + 4}" width="${screenW}" height="${screenH}" rx="${Math.max(18, radius - 12)}" fill="#000"/>
  <rect x="${fw / 2 - 34}" y="${bezel + 2}" width="68" height="6" rx="3" fill="#0a0a0a" opacity="0.8"/>
</svg>`);
}

async function main() {
  await mkdir(outDir, { recursive: true });

  const cartaMeta = await sharp(CARTA_PATH).metadata();
  const screenH = 700;
  const screenW = Math.round((cartaMeta.width / cartaMeta.height) * screenH);
  const bezel = 14;

  const cartaScreen = await sharp(CARTA_PATH)
    .resize(screenW, screenH, { fit: "fill" })
    .png()
    .toBuffer();

  const frameMeta = await sharp(phoneFrameSvg(screenW, screenH, bezel)).metadata();
  const frameW = frameMeta.width;
  const frameH = frameMeta.height;

  const phone = await sharp(phoneFrameSvg(screenW, screenH, bezel))
    .composite([{ input: cartaScreen, left: bezel, top: bezel + 4 }])
    .png()
    .toBuffer();

  const phoneRotated = await sharp(phone)
    .rotate(-7, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  const phoneMeta = await sharp(phoneRotated).metadata();
  const phoneLeft = W - phoneMeta.width - 220;
  const phoneTop = H - phoneMeta.height - 80;

  const stampTargetW = Math.round(W * 0.36);
  const stamp = await sharp(STAMP_PATH)
    .resize(stampTargetW, null, { fit: "inside" })
    .png()
    .toBuffer();
  const stampMeta = await sharp(stamp).metadata();
  const stampLeft = Math.round(W * 0.065);
  const stampTop = Math.round(H * 0.48 - stampMeta.height / 2);

  const layers = [
    { input: await sharp(backgroundSvg()).png().toBuffer(), left: 0, top: 0 },
    { input: await sharp(sceneElementsSvg()).png().toBuffer(), left: 0, top: 0 },
    { input: stamp, left: stampLeft, top: stampTop },
    { input: phoneRotated, left: phoneLeft, top: phoneTop },
  ];

  await sharp({
    create: { width: W, height: H, channels: 4, background: { r: 6, g: 6, b: 6, alpha: 1 } },
  })
    .composite(layers)
    .png({ compressionLevel: 9, quality: 95 })
    .toFile(OUT_PATH);

  const webpOut = OUT_PATH.replace(/\.png$/, ".webp");
  await sharp(OUT_PATH).webp({ quality: 88 }).toFile(webpOut);

  console.log(`[hero-composite] PNG: ${OUT_PATH}`);
  console.log(`[hero-composite] WebP: ${webpOut}`);
  console.log(`[hero-composite] ${W}x${H} | stamp ${stampMeta.width}x${stampMeta.height} | phone ${phoneMeta.width}x${phoneMeta.height}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
