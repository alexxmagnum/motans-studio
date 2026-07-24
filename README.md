# Motans Studio

Sitio público de Motans Studio (Next.js 15, export estático).

Proyecto autónomo — no depende del monorepo MS_MANAGER.

## Requisitos

- Node.js 20+
- pnpm 9+

## Arranque local

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Abre [http://localhost:3001](http://localhost:3001).

## Scripts

| Comando | Descripción |
|---------|-------------|
| `pnpm dev` | Dev server (limpia caché `.next`) |
| `pnpm build` | Build estático → `out/` |
| `pnpm preview` | Sirve `out/` en el puerto 3001 |
| `pnpm typecheck` | TypeScript |
| `pnpm test` | Tests foundation |

## Variables de entorno

Ver `.env.example`:

- `NEXT_PUBLIC_API_URL` — API pública (leads / solicitudes)
- `NEXT_PUBLIC_MS_SITE_ORIGIN` — origen canónico (SEO)
- `NEXT_PUBLIC_MOTANOS_CLIENT_URL` — URL opcional del panel MotanOS

## Packages locales (vendor)

- `packages/branding` → `@motanos/branding`
- `packages/i18n` → `@motanos/i18n`
- `packages/design-system` → `@motanos/design-system/locale` (solo locale)

Dependencias vía `file:` (sin `workspace:*`).

## Deploy (Vercel)

1. Conecta este repositorio en Vercel.
2. Framework: Next.js.
3. Build: `pnpm build` (output `out/` con `output: "export"`).
4. Configura las env públicas anteriores.
5. Output Directory: `out` (si Vercel no lo detecta solo).
