# lib

Objetivo: contener helpers, contratos foundation y utilidades internas del site comercial.

## Estado heredado

Por fases previas ya existen piezas foundation:

- `apiClient.ts`, usado por formularios de conversion foundation.
- `commercialSiteFoundation.ts`.
- `commercialSiteSections.ts`.
- `hosteleriaLanding/**`, con content model, hardening, preview adapter, shell-slot y route boundary metadata no productivos.

`apiClient.ts` existe como cliente de captacion foundation hacia endpoints publicos ya heredados. Reconocerlo no autoriza ampliarlo, cambiar sus endpoints, enviar datos adicionales ni activar onboarding, tenant, negocio, usuario, pagos o checkout.

## Permitido en futuros bloques

Solo con charter explicito posterior:

- ajustar contratos foundation no productivos;
- preparar modelos/metadata/documentacion tecnica para un future technical cut;
- validar claims, CTA no activacional y limites de landing;
- mantener `hosteleriaLanding/**` como TS foundation no productivo.

## Sigue prohibido sin charter explicito

- Ampliar `apiClient.ts`.
- Crear clientes API nuevos.
- Conectar endpoints nuevos.
- Usar `service_role`, secrets o variables privadas en cliente.
- Usar datos reales nuevos.
- Integrar MS Manager como runtime cliente.
- Activar tenant, negocio, usuario, onboarding, checkout o pagos.
- Abrir Takeaway, Delivery, Reservas, execute o live-read.

## Gates obligatorios

Cualquier cambio en `apiClient.ts`, red, endpoints, secrets, datos personales o payload requiere arquitectura/seguridad, privacidad y backend boundary especifico.
Cualquier cambio en pricing, planes, ofertas o packaging requiere gate producto/pricing y fuente controlada.
