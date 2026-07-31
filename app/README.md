# app

Objetivo: contener la app Next.js del sitio público de Motans Studio (producto principal: MotanOS).

## Estado heredado

Por fases previas ya existen superficies reales foundation:

- `layout.tsx`.
- `/` en `page.tsx`.
- `/planes` en `planes/page.tsx`.
- `/solicitud` en `solicitud/page.tsx`.
- `/legal` en `legal/page.tsx`.
- `commercialSiteFoundationShell.ts`.

Estas superficies existen como site comercial minimo/foundation. Reconocerlas no autoriza ampliarlas, duplicarlas ni convertirlas en activacion real.

## Permitido en futuros bloques

Solo con charter explicito posterior:

- ajustar una ruta existente con diff pequeno y rollback claro;
- preparar un first technical cut de landing sin crear activacion real;
- revisar copy/CTA con aprobacion de UX, seguridad y claims;
- mantener mensajes honestos sobre demo, contacto o solicitud asistida.

## Sigue prohibido sin charter explicito

- Crear nuevas rutas, `page.tsx` o `route.ts`.
- Crear route handlers.
- Convertir la landing en checkout, alta, tenant creation u onboarding real.
- Conectar CTA a acciones operativas reales.
- Prometer Takeaway, Delivery, Reservas, pagos, execute o live-read como activos.
- Vender Carta Digital como producto suelto.
- Usar web cliente como fuente real de carta.

## Gates obligatorios

Cualquier cambio en rutas, renderer, CTA visible o copy comercial requiere como minimo:

- branding/UI visual;
- producto/pricing si toca planes, modulos o packaging;
- arquitectura/seguridad si toca datos, endpoints, formularios o runtime;
- pagos/fiscalidad si aparece checkout, cobro o precio final.
