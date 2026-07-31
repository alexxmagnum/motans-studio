# Motans Studio

Sitio público de Motans Studio (Next.js 15, App Router).

Proyecto autónomo — no depende del monorepo MS_MANAGER.

## Requisitos

- Node.js 20+
- pnpm 9+

## Arranque local

```bash
pnpm install
cp .env.example .env.local
# Añade RESEND_API_KEY=re_... en .env.local
pnpm dev
```

Abre [http://localhost:3001](http://localhost:3001).

## Scripts

| Comando | Descripción |
|---------|-------------|
| `pnpm dev` | Dev server (limpia caché `.next`) |
| `pnpm build` | Build de producción Next.js |
| `pnpm start` | Sirve el build (`next start`, puerto 3001) |
| `pnpm typecheck` | TypeScript |
| `pnpm test` | Tests foundation |

## Variables de entorno

Ver `.env.example`:

### Formulario de contacto (Resend)

| Variable | Obligatoria | Descripción |
|----------|-------------|-------------|
| `RESEND_API_KEY` | **Sí** (prod) | API key de Resend. Solo servidor. Nunca `NEXT_PUBLIC_*`. |
| `RESEND_FROM_EMAIL` | No | Remitente verificado, p. ej. `Motans Studio <hola@motansstudio.com>`. Si falta, se usa `onboarding@resend.dev` (pruebas). |

El correo de destino del formulario es `inf.motans@gmail.com` (identidad del site).

### Otras

- `NEXT_PUBLIC_MS_SITE_ORIGIN` — origen canónico (SEO)
- `NEXT_PUBLIC_MOTANOS_CLIENT_URL` — URL opcional del panel MotanOS

## Packages locales (vendor)

- `packages/branding` → `@motanos/branding`
- `packages/i18n` → `@motanos/i18n`
- `packages/design-system` → `@motanos/design-system/locale` (solo locale)

Dependencias vía `file:` (sin `workspace:*`).

## Deploy (Vercel)

1. Conecta este repositorio en Vercel.
2. Framework: **Next.js** (no uses Output Directory `out` — ya no hay static export).
3. Build Command: `pnpm build`.
4. En **Settings → Environment Variables** (Production), añade:
   - `RESEND_API_KEY` = tu clave `re_...`
   - `RESEND_FROM_EMAIL` = remitente con dominio verificado en Resend (recomendado en prod)
   - `NEXT_PUBLIC_MS_SITE_ORIGIN` = `https://www.motansstudio.com` (opcional si ya es el default)
5. Redeploy tras guardar las variables.
6. Prueba el formulario en `/#contacto`.

### Notas Resend

- En la cuenta gratuita, sin dominio verificado, Resend solo entrega a la dirección del propietario de la cuenta.
- Para enviar a `inf.motans@gmail.com` desde un `from` propio, verifica el dominio en [Resend Domains](https://resend.com/domains).
