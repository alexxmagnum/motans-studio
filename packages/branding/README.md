# @motanos/branding

Corporate brand SSOT for Motans Studio / MotanOS.

## Source authority (bit-exact)

```text
apps/motanos-client/public/brand/
```

## Package assets

```text
public/motans/
  MotanOS.stamp.png
  motans-m.png
  motans-ms.webp
  motans-ms.png
```

## Pending

- Ninguno para `motans-ms.png` (export operador aplicado).

## Enforcement

```bash
node scripts/ops/branding-legacy-enforcement.mjs
node scripts/ops/branding-ssot-check.mjs
```

Corporate `/brand/*` literals in app source are blocked except documented CSS fallbacks.

## Tenant branding

Never store tenant/restaurant logos in this package. See `docs/architecture/MOTANOS_BRANDING_BOUNDARY.md`.
