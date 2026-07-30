/**
 * Node/runtime entry — public paths aligned with packages/branding SSOT.
 * TypeScript apps may import from index.ts; Node tests resolve here.
 */
export const MOTANS_CORPORATE_STAMP_PUBLIC_PATH = "/brand/MotanOS.stamp.png";
export const MOTANS_CORPORATE_ICON_M_PUBLIC_PATH = "/brand/motans-m.png";
export const MOTANS_CORPORATE_MARK_MS_WEBP_PUBLIC_PATH = "/brand/motans-ms.webp";
export const MOTANS_CORPORATE_MARK_MS_PNG_PUBLIC_PATH = "/brand/motans-ms.png";

export const MOTANS_CORPORATE_BRAND_ASSET_HASHES = {
  stamp: "c8fed4036b0631b59445c49c1d938925b296086b4279d9976e28facbd139efe2",
  iconM: "90356a71b00dbe825a453d6898db995e6e4f10817c8de39720aa46b22d06d49e",
  markMsWebp: "184d47269d69df0ce4a7502d45dbe3602e400fc8d88c619a77012cb9728c2a34",
  markMsPng: "b4418ccde9a64bba5b649a9e16d2420fb6656548571efed9254b2f6f80022fe8",
};

export const MOTANS_CORPORATE_BRAND_ASSETS = {
  stamp: {
    fileName: "MotanOS.stamp.png",
    packagePath: "public/motans/MotanOS.stamp.png",
    publicPath: MOTANS_CORPORATE_STAMP_PUBLIC_PATH,
    sha256: MOTANS_CORPORATE_BRAND_ASSET_HASHES.stamp,
    sizeBytes: 1_107_684,
    width: 1774,
    height: 887,
    allowedUse: ["splash", "auth", "onboarding", "loading"],
    alt: "MotanOS",
  },
  iconM: {
    fileName: "motans-m.png",
    packagePath: "public/motans/motans-m.png",
    publicPath: MOTANS_CORPORATE_ICON_M_PUBLIC_PATH,
    sha256: MOTANS_CORPORATE_BRAND_ASSET_HASHES.iconM,
    sizeBytes: 1_418_054,
    width: 1024,
    height: 1024,
    allowedUse: ["favicon", "app-icon", "compact-mark", "launcher"],
    alt: "Motans Studio",
  },
  markMsWebp: {
    fileName: "motans-ms.webp",
    packagePath: "public/motans/motans-ms.webp",
    publicPath: MOTANS_CORPORATE_MARK_MS_WEBP_PUBLIC_PATH,
    sha256: MOTANS_CORPORATE_BRAND_ASSET_HASHES.markMsWebp,
    sizeBytes: 64_832,
    allowedUse: ["site", "og", "metadata", "brand-header"],
    alt: "Motans Studio",
  },
  markMsPng: {
    fileName: "motans-ms.png",
    packagePath: "public/motans/motans-ms.png",
    publicPath: MOTANS_CORPORATE_MARK_MS_PNG_PUBLIC_PATH,
    sha256: MOTANS_CORPORATE_BRAND_ASSET_HASHES.markMsPng,
    sizeBytes: 448_895,
    width: 1024,
    height: 1024,
    allowedUse: ["fallback", "og", "metadata"],
    alt: "Motans Studio",
  },
};
