# Motans Studio — Branding reference

Source of truth for contributors. Align all public-facing copy, metadata, and docs with this file.

Runtime identity SSOT in code: `lib/msSiteIdentityFoundation.ts`.

## Official identity

| Field | Value |
|-------|--------|
| **Brand** | Motans Studio |
| **Website** | https://www.motansstudio.com |
| **Official email** | info@motansstudio.com |
| **Primary product** | MotanOS |
| **Repository** | https://github.com/alexxmagnum/motans-studio-website |
| **npm package name** | `motans-studio-website` |

## Copyright / legal entity

Use the values from `MS_SITE_IDENTITY` in `lib/msSiteIdentityFoundation.ts` (legal name, tax ID, address). Do not invent alternate entities or emails.

## Branding rules

1. Public brand is always **Motans Studio** (not “Motanos Studio”, not MotanOS as the company name).
2. **MotanOS** is the primary product. Product copy, routes such as `/motanos`, and package names `@motanos/*` may remain MotanOS — that is intentional.
3. Canonical origin is `https://www.motansstudio.com` (with `www`).
4. Only official email: `info@motansstudio.com`.
5. Never use: `hola@motansstudio.com`, `inf.motans@gmail.com`, any `@gmail.com`, or `info@motans.studio`.
6. Do not rename assets, localStorage keys, env var names, routes, or `@motanos/*` packages for cosmetic branding.

## Development email policy

- Contact form destination remains `info@motansstudio.com` (from identity SSOT).
- If `RESEND_FROM_EMAIL` is unset locally, the API may fall back to Resend’s `onboarding@resend.dev` so local sends can work without a verified domain.
- `onboarding@resend.dev` is **only** a Resend development fallback. It is not Motans Studio branding.

## Production email policy

- Set `RESEND_FROM_EMAIL=Motans Studio <info@motansstudio.com>`.
- Domain `motansstudio.com` must be verified in Resend.
- Public contact, footer, legal pages, and JSON-LD must show `info@motansstudio.com` only.

## Historical artifacts

Snapshots under `docs/audit-evidence/` and `.screenshots/` may contain obsolete emails or domains (e.g. `info@motans.studio`). They are historical evidence only — see the README in those folders. Do not treat them as current branding.
