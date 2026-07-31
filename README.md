# Motans Studio Website

Public website for **Motans Studio** (Next.js 15, App Router).

| | |
|---|---|
| **Brand** | Motans Studio |
| **Website** | [https://www.motansstudio.com](https://www.motansstudio.com) |
| **Email** | [info@motansstudio.com](mailto:info@motansstudio.com) |
| **Repository** | [alexxmagnum/motans-studio-website](https://github.com/alexxmagnum/motans-studio-website) |
| **Primary product** | MotanOS |

Branding reference: [`docs/BRANDING.md`](docs/BRANDING.md).

Standalone project — does not depend on the MS_MANAGER monorepo.

## Requirements

- Node.js 20+
- pnpm 9+

## Local development

```bash
pnpm install
cp .env.example .env.local
# Add RESEND_API_KEY=re_... in .env.local for the contact form
pnpm dev
```

Open [http://localhost:3001](http://localhost:3001).

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Dev server (clears `.next` cache) |
| `pnpm build` | Production Next.js build |
| `pnpm start` | Serve build (`next start`, port 3001) |
| `pnpm typecheck` | TypeScript |
| `pnpm test` | Foundation tests |

## Environment variables

See `.env.example`.

### Contact form (Resend)

| Variable | Required | Description |
|----------|----------|-------------|
| `RESEND_API_KEY` | **Yes** (production) | Resend API key. Server-only. Never `NEXT_PUBLIC_*`. |
| `RESEND_FROM_EMAIL` | **Yes** (production) | Verified sender, e.g. `Motans Studio <info@motansstudio.com>`. |

**Email policy**

- **Production:** always send as `Motans Studio <info@motansstudio.com>` (domain verified in Resend). Destination is `info@motansstudio.com`.
- **Local development only:** if `RESEND_FROM_EMAIL` is empty, the app falls back to Resend’s `onboarding@resend.dev`. That address is **not** production branding and must never be used as the public Motans Studio contact.

### Other

- `NEXT_PUBLIC_MS_SITE_ORIGIN` — canonical origin (SEO); default `https://www.motansstudio.com`
- `NEXT_PUBLIC_MOTANOS_CLIENT_URL` — optional MotanOS client panel URL for CTAs

## Local packages (vendor)

Technical package names are unchanged (do not rename):

- `packages/branding` → `@motanos/branding`
- `packages/i18n` → `@motanos/i18n`
- `packages/design-system` → `@motanos/design-system/locale` (locale only)

Dependencies use `file:` (not `workspace:*`).

## Production (Vercel)

1. Connect this repository in Vercel.
2. Framework: **Next.js** (do not set Output Directory `out`).
3. Build Command: `pnpm build`.
4. In **Settings → Environment Variables** (Production), set:
   - `RESEND_API_KEY` = your `re_...` key
   - `RESEND_FROM_EMAIL` = `Motans Studio <info@motansstudio.com>` (domain must be verified in Resend)
   - `NEXT_PUBLIC_MS_SITE_ORIGIN` = `https://www.motansstudio.com` (optional if already the code default)
5. Redeploy after saving variables.
6. Test the form at `/#contacto`.

### Resend notes

- On the free tier without a verified domain, Resend only delivers to the account owner address.
- To send to `info@motansstudio.com` from a branded `from`, verify the domain at [Resend Domains](https://resend.com/domains).
