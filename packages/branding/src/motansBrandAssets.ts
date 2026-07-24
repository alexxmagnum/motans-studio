/**
 * Motans corporate brand assets — SSOT registry.
 * Binaries: packages/branding/public/motans/
 * Source authority: apps/motanos-client/public/brand (bit-exact copy).
 */

export const MOTANS_CORPORATE_BRAND_ASSET_HASHES = {
  stamp: "c8fed4036b0631b59445c49c1d938925b296086b4279d9976e28facbd139efe2",
  iconM: "90356a71b00dbe825a453d6898db995e6e4f10817c8de39720aa46b22d06d49e",
  markMsWebp: "184d47269d69df0ce4a7502d45dbe3602e400fc8d88c619a77012cb9728c2a34",
  markMsPng: "115614534901feb3cd538cd3bf1308aaf247e9560500f8bdf1d1681560a18acd",
} as const;

export const MOTANS_CORPORATE_BRAND_ASSETS = {
  stamp: {
    fileName: "MotanOS.stamp.png",
    packagePath: "public/motans/MotanOS.stamp.png",
    publicPath: "/brand/MotanOS.stamp.png",
    sha256: MOTANS_CORPORATE_BRAND_ASSET_HASHES.stamp,
    sizeBytes: 1_107_684,
    width: 1774,
    height: 887,
    allowedUse: ["splash", "auth", "onboarding", "loading"] as const,
    alt: "MotanOS",
  },
  iconM: {
    fileName: "motans-m.png",
    packagePath: "public/motans/motans-m.png",
    publicPath: "/brand/motans-m.png",
    sha256: MOTANS_CORPORATE_BRAND_ASSET_HASHES.iconM,
    sizeBytes: 1_418_054,
    width: 1024,
    height: 1024,
    allowedUse: ["favicon", "app-icon", "compact-mark", "launcher"] as const,
    alt: "Motans Studio",
  },
  markMsWebp: {
    fileName: "motans-ms.webp",
    packagePath: "public/motans/motans-ms.webp",
    publicPath: "/brand/motans-ms.webp",
    sha256: MOTANS_CORPORATE_BRAND_ASSET_HASHES.markMsWebp,
    sizeBytes: 64_832,
    allowedUse: ["site", "og", "metadata", "brand-header"] as const,
    alt: "Motans Studio",
  },
  markMsPng: {
    fileName: "motans-ms.png",
    packagePath: "public/motans/motans-ms.png",
    publicPath: "/brand/motans-ms.png",
    sha256: MOTANS_CORPORATE_BRAND_ASSET_HASHES.markMsPng,
    sizeBytes: 80_774,
    width: 1024,
    height: 1024,
    allowedUse: ["fallback", "og", "metadata"] as const,
    alt: "Motans Studio",
  },
} as const;

export type MotansCorporateBrandAssetKey = keyof typeof MOTANS_CORPORATE_BRAND_ASSETS;

/** Runtime public paths — served from each app's `/public/brand/`. */
export const MOTANS_CORPORATE_STAMP_PUBLIC_PATH =
  MOTANS_CORPORATE_BRAND_ASSETS.stamp.publicPath;
export const MOTANS_CORPORATE_ICON_M_PUBLIC_PATH =
  MOTANS_CORPORATE_BRAND_ASSETS.iconM.publicPath;
export const MOTANS_CORPORATE_MARK_MS_WEBP_PUBLIC_PATH =
  MOTANS_CORPORATE_BRAND_ASSETS.markMsWebp.publicPath;
export const MOTANS_CORPORATE_MARK_MS_PNG_PUBLIC_PATH =
  MOTANS_CORPORATE_BRAND_ASSETS.markMsPng.publicPath;
