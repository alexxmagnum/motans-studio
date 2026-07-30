import sharp from "sharp";
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const srcMark = join(root, "public/brand/motans-m.png");

async function squarePng(size, out) {
  await sharp(srcMark)
    .resize(size, size, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 1 },
    })
    .png()
    .toFile(out);
  console.log("wrote", out);
}

function pngToIco(pngBuf) {
  const size = 32;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(1, 4);
  const entry = Buffer.alloc(16);
  entry.writeUInt8(size, 0);
  entry.writeUInt8(size, 1);
  entry.writeUInt8(0, 2);
  entry.writeUInt8(0, 3);
  entry.writeUInt16LE(1, 4);
  entry.writeUInt16LE(32, 6);
  entry.writeUInt32LE(pngBuf.length, 8);
  entry.writeUInt32LE(22, 12);
  return Buffer.concat([header, entry, pngBuf]);
}

const fakePath = join(root, "public/brand/motans-ms.png");
const fake = readFileSync(fakePath);
if (fake[0] === 0xff && fake[1] === 0xd8) {
  await sharp(fake).png().toFile(fakePath);
  console.log("converted motans-ms.png to real PNG");
}

await squarePng(192, join(root, "public/icon-192.png"));
await squarePng(512, join(root, "public/icon-512.png"));
await squarePng(180, join(root, "public/apple-touch-icon.png"));
await squarePng(192, join(root, "app/icon.png"));
await squarePng(180, join(root, "app/apple-icon.png"));

const png32 = await sharp(srcMark)
  .resize(32, 32, {
    fit: "contain",
    background: { r: 0, g: 0, b: 0, alpha: 1 },
  })
  .png()
  .toBuffer();

const ico = pngToIco(png32);
writeFileSync(join(root, "app/favicon.ico"), ico);
writeFileSync(join(root, "public/favicon.ico"), ico);
console.log("wrote favicon.ico", ico.length);

const svg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#000000"/>
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#04a2fb"/>
      <stop offset="42%" stop-color="#52ebe6"/>
      <stop offset="100%" stop-color="#a6e10b"/>
    </linearGradient>
  </defs>
  <rect x="72" y="292" width="220" height="3" fill="url(#g)" rx="2"/>
  <text x="72" y="250" font-family="Segoe UI, Helvetica Neue, Arial, sans-serif" font-size="72" font-weight="600" fill="#ffffff">Motans Studio</text>
  <text x="72" y="360" font-family="Segoe UI, Helvetica Neue, Arial, sans-serif" font-size="28" font-weight="400" fill="rgba(255,255,255,0.58)">Software a medida  ·  Web  ·  SaaS  ·  IA</text>
  <rect x="0" y="600" width="1200" height="30" fill="url(#g)" opacity="0.85"/>
</svg>`);

await sharp(svg).png().toFile(join(root, "public/brand/og-motans-studio.png"));
console.log("wrote OG 1200x630");

const meta = await sharp(join(root, "public/brand/og-motans-studio.png")).metadata();
console.log("OG size", meta.width, meta.height, meta.format);

for (const f of [
  "public/icon-192.png",
  "public/icon-512.png",
  "public/apple-touch-icon.png",
  "public/brand/og-motans-studio.png",
  "public/brand/motans-ms.png",
  "app/icon.png",
  "app/apple-icon.png",
  "app/favicon.ico",
  "public/favicon.ico",
]) {
  const b = readFileSync(join(root, f));
  const png = b[0] === 0x89 && b[1] === 0x50;
  const icoOk = b[0] === 0x00 && b[1] === 0x00 && b[2] === 0x01;
  console.log(f, png ? "PNG" : icoOk ? "ICO" : "OTHER", b.length);
}
