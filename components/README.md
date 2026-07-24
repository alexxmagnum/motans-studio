# components

Objetivo: contener componentes locales de interfaz del site comercial.

## Estado heredado

Por fases previas ya existen componentes reales foundation:

- `LeadForm.tsx`.
- `AssistedRequestForm.tsx`.
- `commercialSiteFoundationViewModel.ts`.

`LeadForm` y `AssistedRequestForm` son superficies heredadas de captacion foundation. Reconocerlas no autoriza modificar sus campos, ampliar payload, conectar nuevos endpoints ni convertirlas en alta/onboarding real.

## Permitido en futuros bloques

Solo con charter explicito posterior:

- crear componentes visuales de landing si existe decision UX/copy/security previa;
- ajustar composiciones publicas sin tocar formularios ni `apiClient`;
- reforzar microcopy no activacional si el bloque lo autoriza;
- mantener componentes como venta/captacion controlada, no como operativa MotanOS cliente.

## Sigue prohibido sin charter explicito

- Crear componentes React nuevos de landing productiva.
- Crear CTA activacional.
- Crear formularios conectados nuevos.
- Modificar `LeadForm.tsx` o `AssistedRequestForm.tsx`.
- Introducir `fetch`, nuevos clientes API o logica de activacion.
- Prometer checkout, pagos, Takeaway, Delivery, Reservas, execute o live-read.
- Vender Carta Digital como producto suelto.

## Gates obligatorios

Cualquier cambio en componentes visuales publicos requiere branding/UI visual y copy/claims review.
Cualquier cambio en formularios, payload, red o datos personales requiere arquitectura/seguridad, privacidad y backend boundary especifico.
