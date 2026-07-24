/**
 * Escena portada v2 — solo ambiente (mesa, móvil, QR). Sin stamp; la marca va en HTML.
 * Assets: hero/sources/motanos-carta-capture.png
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
const H = 1400;
const SCENE_X = 920;

const CARTA_PATH = join(publicDir, "hero", "sources", "motanos-carta-capture.png");
const OUT_PATH = join(outDir, "hosteleria-hero-scene-v2.png");

function scenePanelSvg(panelW, panelH) {
  return Buffer.from(`<svg width="${panelW}" height="${panelH}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="fadeL" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#000" stop-opacity="1"/>
      <stop offset="22%" stop-color="#000" stop-opacity="0.85"/>
      <stop offset="48%" stop-color="#000" stop-opacity="0"/>
    </linearGradient>
    <radialGradient id="warm" cx="68%" cy="58%" r="58%">
      <stop offset="0%" stop-color="#4a3020" stop-opacity="0.5"/>
      <stop offset="55%" stop-color="#1a1008" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="wood" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2a1c14"/>
      <stop offset="50%" stop-color="#3d2a1c"/>
      <stop offset="100%" stop-color="#14100c"/>
    </linearGradient>
    <filter id="blur" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="2.6"/>
    </filter>
    <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="22" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>
  <rect width="${panelW}" height="${panelH}" fill="#030303"/>
  <rect width="${panelW}" height="${panelH}" fill="url(#warm)"/>
  <path d="M 0 ${panelH - 60} L ${panelW + 80} ${panelH - 200} L ${panelW + 80} ${panelH + 40} L -40 ${panelH + 40} Z" fill="url(#wood)" opacity="0.94"/>
  <ellipse cx="1080" cy="760" rx="340" ry="240" fill="#c48a4a" opacity="0.1" filter="url(#softGlow)"/>
  <ellipse cx="920" cy="1120" rx="520" ry="110" fill="#6a4020" opacity="0.14"/>

  <ellipse cx="760" cy="1088" rx="108" ry="26" fill="#141414" opacity="0.9"/>
  <ellipse cx="760" cy="1076" rx="84" ry="20" fill="#22201e" stroke="#3a3530" stroke-width="1.2"/>

  <g opacity="0.5" stroke="#8a7a6a" stroke-width="2" fill="none">
    <path d="M 620 1010 C 620 982, 654 962, 664 944 C 672 930, 666 918, 660 912"/>
    <path d="M 660 912 L 660 1068"/>
    <path d="M 646 1068 L 674 1068"/>
    <ellipse cx="664" cy="1012" rx="24" ry="7" opacity="0.35" fill="#c9b29a"/>
  </g>

  <g transform="translate(840 1020) rotate(-7)">
    <rect x="0" y="0" width="92" height="108" rx="8" fill="#f4f0ea" opacity="0.9"/>
    <rect x="10" y="10" width="72" height="72" fill="#111"/>
    <g fill="#f4f0ea">
      <rect x="14" y="14" width="20" height="20"/>
      <rect x="56" y="14" width="20" height="20"/>
      <rect x="14" y="56" width="20" height="20"/>
      <rect x="40" y="40" width="8" height="8"/>
      <rect x="52" y="40" width="8" height="8"/>
      <rect x="40" y="52" width="8" height="8"/>
      <rect x="64" y="52" width="8" height="8"/>
    </g>
    <text x="46" y="100" text-anchor="middle" font-family="Georgia, serif" font-size="9" fill="#4a4038">Mesa 4</text>
  </g>

  <g transform="translate(1140 930) rotate(12)" opacity="0.38" filter="url(#blur)">
    <rect x="0" y="0" width="140" height="178" rx="6" fill="#efe8dc"/>
    <text x="16" y="32" font-family="monospace" font-size="11" fill="#5a4a3a">COCINA</text>
    <text x="16" y="58" font-family="monospace" font-size="10" fill="#3a3028">2x Croquetas</text>
    <text x="16" y="76" font-family="monospace" font-size="10" fill="#3a3028">Mesa 4</text>
    <rect x="16" y="92" width="84" height="18" rx="4" fill="#d8cfc2"/>
  </g>

  <rect width="${panelW}" height="${panelH}" fill="url(#fadeL)"/>
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
      <feDropShadow dx="0" dy="32" stdDeviation="28" flood-color="#000" flood-opacity="0.7"/>
    </filter>
  </defs>
  <rect x="0" y="0" width="${fw}" height="${fh}" rx="${radius}" fill="url(#frame)" filter="url(#shadow)"/>
  <rect x="${bezel}" y="${bezel + 4}" width="${screenW}" height="${screenH}" rx="${Math.max(18, radius - 12)}" fill="#000"/>
  <rect x="${fw / 2 - 34}" y="${bezel + 2}" width="68" height="6" rx="3" fill="#0a0a0a" opacity="0.8"/>
</svg>`);
}

async function main() {
  await mkdir(outDir, { recursive: true });

  const panelW = W - SCENE_X + 120;
  const cartaMeta = await sharp(CARTA_PATH).metadata();
  const screenH = 820;
  const screenW = Math.round((cartaMeta.width / cartaMeta.height) * screenH);
  const bezel = 14;

  const cartaScreen = await sharp(CARTA_PATH)
    .resize(screenW, screenH, { fit: "fill" })
    .png()
    .toBuffer();

  const phone = await sharp(phoneFrameSvg(screenW, screenH, bezel))
    .composite([{ input: cartaScreen, left: bezel, top: bezel + 4 }])
    .png()
    .toBuffer();

  const phoneRotated = await sharp(phone)
    .rotate(-8, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  const phoneMeta = await sharp(phoneRotated).metadata();

  const sceneBase = await sharp(scenePanelSvg(panelW, H)).png().toBuffer();
  const phoneLeftOnPanel = Math.round(panelW * 0.52 - phoneMeta.width / 2);
  const phoneTopOnPanel = H - phoneMeta.height - 100;

  const sceneWithPhone = await sharp(sceneBase)
    .composite([{ input: phoneRotated, left: phoneLeftOnPanel, top: phoneTopOnPanel }])
    .png()
    .toBuffer();

  await sharp({
    create: { width: W, height: H, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 1 } },
  })
    .composite([{ input: sceneWithPhone, left: SCENE_X, top: 0 }])
    .png({ compressionLevel: 9 })
    .toFile(OUT_PATH);

  const webpOut = OUT_PATH.replace(/\.png$/, ".webp");
  await sharp(OUT_PATH).webp({ quality: 90 }).toFile(webpOut);

  console.log(`[scene-v2] PNG: ${OUT_PATH}`);
  console.log(`[scene-v2] WebP: ${webpOut}`);
  console.log(`[scene-v2] ${W}x${H} | scene @ x=${SCENE_X} | phone ${phoneMeta.width}x${phoneMeta.height}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
