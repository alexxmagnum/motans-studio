# tests

Objetivo: contener pruebas locales del site comercial y validaciones de boundaries comerciales.

## Estado heredado

Por fases previas ya existen tests foundation:

- SEO/legal/performance foundation del site comercial.
- Validaciones de no hardcodear precios monetarios.
- Validaciones de no presentar Delivery/Takeaway/App como activos.
- Tests de `hosteleriaLanding/**` para content model, hardening, preview adapter, shell-slot y route boundary metadata no productivos.

Estos tests verifican boundaries existentes. Reconocerlos no autoriza crear flujos E2E reales, activar formularios nuevos ni conectar datos reales.

## Permitido en futuros bloques

Solo con charter explicito posterior:

- anadir tests de forbidden claims;
- validar CTA no activacional;
- validar que no haya pricing final hardcodeado;
- validar que Carta Digital no se venda como producto suelto;
- validar que web cliente no sea fuente real de carta;
- validar que `public-menu` sea salida/no fuente;
- validar que Takeaway, Delivery, Reservas, execute, live-read, checkout y pagos sigan bloqueados;
- validar que no aparezcan secrets, `.env`, `service_role` ni claims de backend/API real conectado.

## Sigue prohibido sin charter explicito

- Crear tests que ejecuten activacion real.
- Crear tests que dependan de datos reales, tenants reales o negocios reales.
- Crear tests E2E de checkout, pagos, onboarding real, Takeaway, Delivery o Reservas live.
- Crear tests que requieran modificar formularios reales o `apiClient`.
- Convertir tests foundation en autorizacion para UI productiva.

## Gates obligatorios

Cualquier test que toque red, formularios, PII, endpoints, pagos, tenants o activacion necesita arquitectura/seguridad y backend boundary previo.
Cualquier test que fije copy comercial visible debe respetar copy/claims approval y no prometer capacidades no operativas.
