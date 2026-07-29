import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

/** @type {import("eslint").Linter.Config[]} */
const eslintConfig = [
  {
    ignores: [
      ".next/**",
      "out/**",
      "node_modules/**",
      "packages/**",
      "docs/**",
      "scripts/**",
      "tests/**",
      "public/**",
      "next-env.d.ts",
      "eslint.config.mjs",
    ],
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      /* Static export + images.unoptimized: `<img>` is intentional for brand/media. */
      "@next/next/no-img-element": "off",
    },
  },
];

export default eslintConfig;
