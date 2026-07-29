# Auditoría completa — Motans Studio (sitio comercial)

**Fecha:** 2026-07-26  
**Alcance:** landing `/`, shell, footer, consentimiento, legales, SEO, responsive, performance, conversión, calidad técnica  
**Modo:** solo lectura — **ningún código de producto fue modificado**  
**Entorno inspeccionado:** export estático `out/` servido en `http://127.0.0.1:3001` + revisión de código + `pnpm typecheck` / `pnpm build` / `pnpm test` + Playwright (Chrome) + Lighthouse  

Evidencias visuales y runtime: `docs/audit-evidence/`

---

# 1. Resumen ejecutivo

La web tiene **dirección editorial real** en Hero, Qué hacemos, Por qué y Proceso: no parece una plantilla genérica de ThemeForest ni un portfolio junior. El problema no es “falta de estilo en todo”, sino **una narrativa a medias**: tres actos del scroll (`entrega`, `tecnologías`, `faq`) son **chasis vacío** con copy “detalle en una próxima fase”, y el nav primario enlaza a FAQ vacío. Eso rompe la promesa premium en el momento en que el visitante ya estaba convencido.

El footer **no está hoy sin estilos** en el entorno auditado: CSS cargado, grid activo, `list-style: none` aplicado. Los síntomas reportados (HTML crudo / bullets) **no se reproducen** en el build actual; sí hay defectos de contenido (doble “Aviso legal”, redes `href="#"`, versión `0.1.0`). El favicon `/favicon.ico` **sí da 404**. Los legales son plantillas con **36 marcadores `[EDITAR]`**. El consentimiento guarda preferencias y tiene puente de integraciones, pero **no bloquea scripts** porque no hay scripts de terceros cableados. El formulario apunta a API pública (`NEXT_PUBLIC_API_URL` o `localhost:3002`) y puede fallar en producción sin backend.

**Veredicto:** lista para enseñar a un cliente cercano *con contexto de WIP*; **no** lista para captar leads en frío; **no** lista para producción.

## Notas (0–10) — sin regalar

| Área | Nota | Comentario breve |
|------|------|------------------|
| Dirección de arte | **7.0** | Hero/Offer/Why/Process tienen criterio; slots vacíos y cierre diluyen |
| UI | **6.5** | Buen detalle en secciones editoriales; Inter + negro plano en zonas |
| UX | **5.0** | FAQ en nav vacío, doble CTA, banner cookies grande |
| Responsive | **6.0** | Bien en 360–1440; overflow real en 320 y 1280 (vídeo/header) |
| Copy | **7.0** | Editorial sólido; genérico en CTA final; intents de form limitados |
| Conversión | **4.0** | Sin prueba social/casos; narrativa incompleta; lead sin garantía de API |
| Confianza | **3.5** | Legales `[EDITAR]`, placeholders, redes falsas, versión 0.1.0 |
| Accesibilidad | **5.5** | Skip link + LH alto; focus trap incomplete; autoplay; menú `<details>` |
| Performance | **6.5** | Desktop excelente; móvil LCP ~3.8s; vídeo `preload=auto` + fonts Google |
| SEO | **5.0** | Metadata/canonical/JSON-LD ok; sin favicon/OG image; LH SEO engañoso |
| Arquitectura | **6.5** | Foundations claras; legado muerto y tests obsoletos |
| Calidad técnica | **5.0** | typecheck/build OK; **23 FAIL** en suite; lint inexistente |
| Legal y consentimiento | **3.0** | UI sí; cumplimiento/contenido no |
| Preparación para producción | **3.5** | Bloqueos claros |

**Nota global: 5.0 / 10**

---

# 2. Qué está bien

1. **Posicionamiento studio-first** con MotanOS congelado (`MS_SITE_PUBLIC_MOTANOS_VISIBLE = false`) — coherente con no vender producto no listo.
2. **Narrativa editorial** en Offer / Why / Process: layouts asimétricos, copy de criterio, UX/UI como estándar transversal (no servicio suelto).
3. **Hero experience** con splash de vídeo, badge de suelo, mute, reduced-motion, y brand mark sin wordmark bajo el logo en el shell actual.
4. **Arquitectura por foundations** (`msStudio*Foundation`, legal, consent, SEO, landing architecture) — mantenible si se limpia el legado.
5. **Shell único** con locale, nav spy, mobile nav, footer, consent provider.
6. **Rutas legales** montadas + hub + banner explícito de plantilla (honesto, aunque no publicable).
7. **SEO base**: title/description/canonical/OG text/JSON-LD Organization+WebSite+WebPage; `robots.ts` + `sitemap.ts`.
8. **Skip link**, `lang="es"`, landmarks básicos, preferencias cookies con Escape.
9. **Build estático** Next 15 `output: "export"` genera 20 rutas; home ~135 kB First Load JS.
10. **Dirección visual** azul→verde de marca consistente en CTAs, acentos y splash.

---

# 3. Problemas críticos

| ID | Hallazgo |
|----|----------|
| C1 | Secciones **Entrega / Tecnologías / FAQ** son placeholders visibles (“próxima fase”) y **FAQ está en nav primaria** |
| C2 | Páginas legales publicables con **36× `[EDITAR]`** + banner de plantilla — no aptas para producción |
| C3 | **`/favicon.ico` → 404**; metadata sin `icons` ni imagen OG/Twitter |
| C4 | Consentimiento **no gatea scripts** (solo storage + UI + hook vacío) — no afirmar cumplimiento de cookies de terceros |
| C5 | Lead form depende de API externa; sin backend real el flujo de conversión **falla** |
| C6 | Suite de tests: **23 fallos** — señal de drift y falsa confianza CI |
| C7 | Overflow horizontal en **320px** (header actions + vídeo `118vw`) |
| C8 | Confianza destruida por **redes `href="#"`**, doble “Aviso legal”, versión `0.1.0` / “Sistema Operativo” |

---

# 4. Problemas altos

| ID | Hallazgo |
|----|----------|
| H1 | Overflow horizontal en **1280px** (figure/vídeo del hero se sale ~34px) |
| H2 | Banner de cookies grande: tapa CTAs del hero en primera visita |
| H3 | Modal de preferencias: Escape sí; **sin focus trap** completo |
| H4 | CTA final (`#hablemos`) + Contacto (`#contacto`) — doble cierre sin diferenciación fuerte |
| H5 | Intents del formulario (“Solo web” / “App / SaaS”) **estrechan** el posicionamiento frente al copy de producto completo |
| H6 | CSS/legado muerto (`msSite1701Global`, SuperPremium, ZeroBullshit, hostelería…) y `components/home/*` casi todo muerto — riesgo de regresión |
| H7 | Fuentes vía `@import` Google Fonts (Inter + Instrument Serif) — bloqueo/privacidad/perf |
| H8 | Vídeo hero `preload="auto"` + autoplay — coste LCP móvil |
| H9 | Redirects de Next **no aplican** en export; `/servicios` y `/contacto` solo client-redirect |
| H10 | Twitter card `summary_large_image` **sin imagen** |
| H11 | Header móvil en 320: Hablemos + locale + Menú compactados → overflow |
| H12 | Sin headers de seguridad en `next.config` / `vercel.json` (CSP, etc.) — revisar en despliegue |

---

# 5. Problemas medios

| ID | Hallazgo |
|----|----------|
| M1 | Negro plano dominante en tramos largos — sensación de profundidad irregular |
| M2 | Offer visuals son demos/mockups; el panel IA es UI inventada (aceptable si se asume “demo”) |
| M3 | Why “Encaja / No encaja” es fuerte para cualificación — conservar, no diluir |
| M4 | Process editorial fuerte pero sin tiempos orientativos (conversión) |
| M5 | Footer tech list genérica (Next/React…) — no prueba capacidad |
| M6 | Contact form en “card” (`msh-contact__form-card`) — leve contradicción con “no cards” editorial |
| M7 | `MsStudioFooter` importa CSS **y** `layout.tsx` también — doble import redundante |
| M8 | Legacy `.ms-footer` aún en CSS globales cargados — confusión de mantenimiento |
| M9 | i18n UI parcial; mucho copy editorial solo ES en foundations |
| M10 | Autoplay con intento de sonido + gesture fallback — revisar a11y/autoplay policies |
| M11 | No hay casos, muestras propias ni “qué ocurre después de contactar” concreto |
| M12 | Sitemap incluye `/servicios` `/contacto` que solo redirigen |
| M13 | Lighthouse SEO 100 **no** valida favicon/OG image — no confundir con SEO listo |
| M14 | Build falló una vez con `PageNotFoundError: /_document` (flaky); reintento OK |

---

# 6. Problemas bajos

| ID | Hallazgo |
|----|----------|
| L1 | Lint: script `"No lint configured yet"` |
| L2 | `console.error` en `apiClient` en fallos de red |
| L3 | Status “Operativo” + versión semver en footer — tono interno |
| L4 | Menú móvil basado en `<details>`/`<summary>` — a11y aceptable pero no ideal |
| L5 | Posible truncado percibido del subtítulo hero cuando el banner de cookies está abierto |
| L6 | Espaciado vertical grande entre bloques en móvil |
| L7 | Assets MotanOS/hostelería en `public/` siguen pesando el repo aunque rutas congeladas |
| L8 | Tests de claims hostelería siguen midiendo foundations de producto congelado |

---

# 7. Auditoría por sección

## 7.1 Hero

1. **Objetivo:** marca + promesa + CTA + presencia visual de producto/estudio.  
2. **¿Cumple?** Parcialmente sí en desktop; en móvil el splash es protagonista (bien).  
3. **Visual:** splash M potente; negro + neón funciona; riesgo de “efecto demo 3D” si no se ancla a trabajo real.  
4. **Copy:** claro y diferenciador (“exigentes”, “operar”).  
5. **UX:** mute presente; banner cookies tapa CTAs.  
6. **Responsive:** 118vw del vídeo → overflow en 320; spill en 1280.  
7. **Técnico:** client component + listeners + autoplay; LCP móvil ligado al vídeo.  
8. **Mantener:** composición experience, badge suelo, mute, brand sin wordmark bajo logo.  
9. **Mejorar:** contención overflow, LCP (`preload`/poster), no degradar desktop.  
10. **Prioridad:** Alta (overflow) / Media (perf).

**Comprobaciones pedidas:**  
- Texto bajo logo: **ausente** en DOM del shell (`brandNameDisplay: absent`).  
- Splash móvil: **protagonista** (evidencia `vp390-top.png`).  
- Silenciar: visible, no tapa el titular en móvil (está sobre el vídeo).

## 7.2 Qué hacemos (Offer)

1. Objetivo: transformar “servicios” en capacidades de producto.  
2. Cumple: sí a nivel copy/layout editorial.  
3. Visual: mockups webp; panel IA decorativo.  
4. Copy: fuerte (audiencia/problema/resultado).  
5. UX: reveal on scroll + CTA al contacto.  
6. Responsive: layouts split/panorama — revisar densidad en 320–400 (no overflow medido en offer tras consent).  
7. Técnico: client + IntersectionObserver.  
8. Mantener: estructura de capacidades y tono.  
9. Mejorar: anclar visuals a trabajo real cuando existan.  
10. Prioridad: Media.

## 7.3 Por qué Motans Studio (Why)

1. Objetivo: criterio, filtro de cliente, manifiesto.  
2. Cumple: sí — de las mejores secciones.  
3. Visual: tipografía display + bloques asimétricos.  
4. Copy: “No competimos por hacer webs” alinea con brief.  
5. UX: “Encaja / No encaja” cualifica sin ser agresivo.  
6. Responsive: listas sin bullets (CSS why).  
7. Técnico: foundation + CSS dedicado.  
8. **Mantener sin tocar a la ligera.**  
9. Mejorar: prueba ligera de capacidad (sin inventar clientes).  
10. Prioridad: Baja–Media.

## 7.4 Cómo trabajamos (Process)

1. Objetivo: método sin timeline corporativo.  
2. Cumple: sí editorialmente.  
3. Visual: billboard/offset/aside — ritmo bueno.  
4. Copy: claro; falta “qué pasa en la primera semana” para conversión.  
5. UX: sin fricción.  
6. Responsive: revisar longitudes de línea en tablet.  
7. Técnico: foundation + CSS.  
8. Mantener: layouts distintos.  
9. Mejorar: un ancla de tiempos orientativos realista (sin SLAs inventados).  
10. Prioridad: Media (conversión).

## 7.5 Qué recibe el cliente (Entrega)

1. Objetivo: ownership / entregables.  
2. **No cumple** — slot vacío.  
3–7. Placeholder `msh-landing-slot`.  
8. Mantener el **hueco narrativo** (sí debe existir la sección).  
9. Implementar contenido real.  
10. **Crítica.**

## 7.6 Tecnologías

1. Objetivo: criterio técnico sin catálogo.  
2. **No cumple** — slot vacío.  
8–9. Banda editorial breve > lista infinita.  
10. **Crítica** (o sacar de scroll hasta tener contenido).

## 7.7 FAQ

1. Objetivo: objeciones y confianza.  
2. **No cumple** — y está en nav.  
10. **Crítica** (quitar de nav o rellenar).

## 7.8 Contacto

1. Objetivo: lead.  
2. Parcial: UI existe; backend no garantizado.  
3. Form en card.  
4. Copy “Hablemos” correcto; intents estrechos.  
5. Pide nombre/email/intent; mensaje opcional — razonable.  
6. OK en viewports auditados.  
7. `apiClient` → `localhost:3002` fallback.  
8. Mantener bloque premium.  
9. Ampliar intents + mensaje post-envío + API prod.  
10. Alta.

## 7.9 Footer

1. Objetivo: cierre de marca + legal + utilidades.  
2. Visualmente **sí cierra** en el build actual (no destruye).  
3. Duplicado legal, densidad, redes falsas.  
4. Tagline bueno.  
5. “Configurar cookies” funciona si hay provider.  
6. Stack en móvil OK; legal bar larga.  
7. CSS presente (ver §9).  
8. Mantener estructura premium.  
9. Limpiar duplicados/href/#/tono 0.1.0.  
10. Alta (contenido) / ya no crítica de CSS.

---

# 8. Auditoría transversal

## 8.1 Arquitectura

**Bien:** App Router, foundations, shell client, páginas legales server, static export.  
**Frágil:** demasiados CSS globales importados en `layout.tsx`; legado MotanOS/home.  
**Roto:** tests desalineados con `app/page.tsx`.  
**Simplificar:** matar CSS/componentes no montados; unificar nav SSOT (`MS_STUDIO_LANDING_*` vs `MS_SITE_NAV_ITEMS`).  
**No tocar a ciegas:** Offer/Why/Process foundations y CSS editoriales.

**RSC vs client:** shell, hero, offer, consent, form, footer son client — justificado para interacción, pero el home empuja JS (~19.4 kB page + 135 kB FL).

## 8.2 Responsive

| Breakpoint | Overflow X | Notas |
|------------|------------|-------|
| 320 | **Sí** (scrollWidth 360) | `msh-header__actions` + figure vídeo 118vw |
| 360–430 | No | Hero móvil aceptable |
| 768 | No | Grid footer 2 col |
| 1024 | No | Transición desktop |
| 1280 | **Sí** (1314) | Vídeo/figure hero |
| 1440–1920 | No | Hero split sólido |

Errores reales: 320, 1280. Discutible: densidad header móvil. Opcional: ritmo vertical.

## 8.3 Accesibilidad (WCAG 2.2 AA — razonable)

| Hallazgo | Severidad |
|----------|-----------|
| Skip link + `lang` + landmarks | OK |
| Preferencias: Escape + restore focus; **sin focus trap** | Alto |
| Banner cookies sin modal role (panel sí en prefs) | Medio |
| Vídeo autoplay; control de sonido presente | Medio |
| `prefers-reduced-motion` en hero/offer | OK |
| Contraste general dark OK (LH 97) | — |
| Enlaces sociales `aria-disabled` + `href="#"` | Medio |
| Menú móvil `<details>` | Bajo–Medio |
| Zoom 200/400% | No medido exhaustivamente en esta pasada |

## 8.4 Rendimiento

**Lighthouse (serve estático local):**

| | Mobile | Desktop |
|--|--------|---------|
| Performance | **80** | **98** |
| Accessibility | 97 | 97 |
| Best Practices | 96 | 96 |
| SEO (LH) | 100 | 100 |
| FCP | 3.5 s | 0.9 s |
| LCP | 3.8 s | 1.0 s |
| CLS | 0 | 0.008 |
| TBT | 0 ms | 0 ms |

**Nota:** LH SEO 100 **no** implica favicon/OG correctos.  
Costes: vídeo splash, `@import` fonts, CSS global grande (~227 KB layout.css en dev; export con CSS en chunks).

## 8.5 SEO

- Title/description/canonical: OK  
- JSON-LD: OK (Organization logo apunta a PNG de marca)  
- Favicon: **roto**  
- OG/Twitter image: **ausente**  
- Sitemap: incluye redirects client  
- H1: copy de producto (no “Motans Studio” literal en H1) — OK si brand está en logo+eyebrow  
- hreflang: no (locale client-only) — aceptable si no hay URLs por idioma  

**Favicon Next 15:** añadir `app/icon.png` (o `app/favicon.ico`) desde `public/brand/motans-m.png` / mark existente, **o** `metadata.icons` en `createMsSitePageMetadata`. Evitar duplicar PNG+ICO sin necesidad; con App Router basta `app/icon.png` para eliminar el 404 habitual de `/favicon.ico` en muchos hosts, o colocar `app/favicon.ico` explícito.

## 8.6 Legal

Rutas OK. Contenido **no publicable** sin abogado + datos reales (NIF, domicilio, bases jurídicas, tabla cookies, transferencias, SLAs). Banner ya lo admite — correcto para WIP, bloqueante para prod.

## 8.7 Cookies / consentimiento

- Banner: Aceptar / Rechazar / Configurar — OK  
- Persistencia `localStorage` `motans-studio-consent-v1` + versionado — OK  
- Reapertura desde footer — OK  
- Escape en prefs — OK  
- Focus trap — incompleto  
- Sync pestañas — no observado  
- `registerMsSiteConsentIntegration` — **sin callers**  
- **Conclusión:** preferencia visual/persistida; **no** hay enforcement de scripts no consentidos porque no hay scripts.

## 8.8 Conversión

Falta: casos reales, muestras, FAQ, entrega, “qué pasa después”, prueba de capacidad, intents alineados.  
CTA principal claro (“Hablemos”).  
Cualificación: Why “No encaja” ayuda.  
Riesgo: visitante premium ve placeholders → sale.

## 8.9 Seguridad / privacidad

**En repo:** no secretos hardcodeados obvios; `.env.example` documenta API; form POST JSON a API pública; `mailto:` expuesto (normal).  
**No verificado en despliegue:** CSP, HSTS, source maps, WAF.  
`vercel.json` sin headers de seguridad.  
`target=_blank` no es patrón dominante en landing.

---

# 9. Causa raíz del footer “roto”

## Estado actual (evidencia 2026-07-26)

En el export servido:

- Markup: `footer.ms-studio-footer` con BEM `__shell`, `__list`, etc. (`components/MsStudioFooter.tsx`).
- CSS: `app/msStudioFooter.css` importado en `app/layout.tsx` (líneas 21–23) **y** de nuevo en el componente (línea 5).
- Bundle: selectores `.ms-studio-footer` presentes (dev: 47 hits en `layout.css`; runtime Playwright: **36 reglas** aplicadas).
- Computed (390/768/1440):
  - `backgroundColor: rgb(0, 0, 0)`
  - `listStyle: outside none none` / `liListStyle: none`
  - `shellDisplay: grid` (1 / 2 / 4 columnas según breakpoint)
- Capturas: `docs/audit-evidence/vp1440-footer.png`, `vp390-footer.png` — footer **estilizado**, no HTML crudo.

**Conclusión:** el síntoma “footer sin estilos / bullets de lista” **no se reproduce ahora**. No hay mismatch className↔selector en el código actual.

## Causas probables del síntoma reportado (históricas / confusión)

1. **Periodo de transición Fase 6** en el que existía CSS nuevo pero el visitante veía cache/dev corrupto (durante esta auditoría el `next dev` llegó a devolver **500** tras un build concurrente).
2. **Confusión con legado `.ms-footer`** aún definido en `msSite1703Global.css` / `msSite1703Obsessive.css` / `msSiteDarkPremium.css` — **no aplica** al footer actual (clase distinta), pero puede confundir al depurar.
3. **Confusión visual con otras listas** (legales con bullets intencionados, o slots vacíos con tipografía básica).
4. Si en algún entorno **fallara la carga de CSS global**, el HTML semántico del footer (varios `<ul>`) mostraría bullets de user-agent — eso explicaría el reporte, pero requiere CSS no cargado (no es el caso actual).

## Problemas reales del footer (sí corregir)

| Problema | Archivos |
|----------|----------|
| Doble “Aviso legal” (`footerLegal` → `/legal` + item → `/legal/aviso-legal`) | `MsStudioFooter.tsx` ~126–136; `msSiteUiI18nFoundation.ts` (`footerLegal: "Aviso legal"`); `msSiteFooterFoundation.ts` |
| Redes `href: "#"` + `prepared: true` | `msSiteFooterFoundation.ts` 61–63 |
| Nav a `#faq` vacío | `msSiteFooterFoundation.ts` 36 |
| Doble import CSS | `layout.tsx` + `MsStudioFooter.tsx` |
| Tono “Versión 0.1.0 / Sistema Operativo” | foundation footer |

**Prioridad CSS footer:** baja (ya aplica). **Prioridad contenido footer:** alta.

---

# 10. Evidencias

## Archivos revisados (núcleo)

- `app/page.tsx`, `app/layout.tsx`, `app/sitemap.ts`, `app/robots.ts`, `next.config.ts`, `vercel.json`
- `components/MotansStudioSiteShell.tsx`, `MsStudioFooter.tsx`, `MsSiteConsent*`, `LeadForm.tsx`, `studio-home/*`, `home/MsHomeContact.tsx`, `MsSiteLegalDocument.tsx`
- `lib/msStudio{Home,Offer,Why,Process,LandingArchitecture}Foundation.ts`, `msSite{Footer,Consent,Legal,1703Seo,1701}Foundation.ts`, `apiClient.ts`
- CSS: `msStudio{Home,Offer,Why,Process,Footer,Hero*}.css`, `msSite{Consent,Legal,DarkPremium,1703*}.css`
- `public/brand/*`, `public/capabilities/*`

## Rutas HTTP comprobadas

| Ruta | Status |
|------|--------|
| `/` | 200 |
| `/favicon.ico` | **404** |
| `/brand/motans-ms.png` | 200 |
| `/legal`, `/legal/aviso-legal` | 200 |
| `/robots.txt`, `/sitemap.xml` | 200 |

## Comandos ejecutados

| Comando | Resultado |
|---------|-----------|
| `pnpm typecheck` | **PASS** |
| `pnpm build` | **PASS** (tras un fallo flaky `_document`; export 20 rutas) |
| `pnpm test` | **PASS parcial** — **23 FAIL** (tests obsoletos vs landing actual) |
| `pnpm lint` | “No lint configured yet” |
| Playwright Chrome vs `serve out -l 3001` | runtime-audit + overflow + screenshots |
| Lighthouse mobile | Perf 80 / A11y 97 / BP 96 / SEO 100 |
| Lighthouse desktop | Perf 98 / A11y 97 / BP 96 / SEO 100 |

## Consola / Network

- 404 favicon (confirmado por fetch y por ausencia de `<link rel="icon">` en HTML).
- Durante `next dev` inestable: 500 en `/` (no reproducible en export estático).
- Sin errores de hidratación graves observados en la pasada Playwright sobre export.

## Breakpoints

320, 360, 375, 390, 400, 430, 768, 1024, 1280, 1440, 1920 — ver §8.2 y `docs/audit-evidence/runtime-audit.json`.

## Capturas (reales)

- `docs/audit-evidence/vp390-top.png`, `vp390-footer.png`
- `docs/audit-evidence/vp768-*.png`, `vp1440-*.png`
- `docs/audit-evidence/consent-banner.png`, `consent-prefs.png`, `legal-aviso.png`
- JSON: `runtime-audit.json`, `lighthouse-*.json`

---

# 11. Backlog priorizado

| ID | Hallazgo | Área | Severidad | Impacto | Causa | Solución recomendada | Archivos probables | Esfuerzo | Riesgo regresión | Bloquea prod |
|----|----------|------|-----------|---------|-------|----------------------|--------------------|----------|------------------|--------------|
| B01 | FAQ/Entrega/Tech vacíos | Landing | Crítica | Confianza/UX | Chasis sin contenido | Rellenar o retirar de nav/scroll | `MsStudioLandingSectionSlot.tsx`, architecture foundation, page.tsx | L | Medio | **Sí** |
| B02 | Legales `[EDITAR]` | Legal | Crítica | Cumplimiento | Plantilla | Datos reales + revisión legal | `msSiteLegalFoundation.ts` | L | Bajo | **Sí** |
| B03 | Favicon 404 | SEO | Crítica | Marca/SEO | Sin `app/icon` | Añadir `app/icon.png` o `favicon.ico` + metadata.icons | `app/`, branding assets, seo foundation | XS | Bajo | **Sí** |
| B04 | Sin OG image | SEO | Alta | Social share | Metadata incompleta | Imagen 1200×630 + metadata | seo foundation, `public/` | S | Bajo | **Sí** |
| B05 | Consent sin gate scripts | Legal | Alta | Cumplimiento futuro | Solo UI | No cargar analytics sin `hasCategory`; o documentar “solo necesarias” | consent foundation/provider | M | Medio | Condicional |
| B06 | Form sin API prod | Conversión | Crítica | Leads | Fallback localhost | `NEXT_PUBLIC_API_URL` prod + monitorización | `apiClient.ts`, `.env` | S | Bajo | **Sí** |
| B07 | Overflow 320 | Responsive | Crítica | Móvil | Header + 118vw | Compactar actions; contener vídeo | `msStudioHeroMobileFix.css`, header CSS | S | Medio | **Sí** |
| B08 | Overflow 1280 | Responsive | Alta | Desktop mid | Figure vídeo | Cap max-width/overflow hidden en visual | hero CSS | S | Medio | No |
| B09 | Doble Aviso legal | Footer | Alta | Confianza | Label hub = aviso | Hub “Legal” / “Información legal” | footer + i18n | XS | Bajo | No |
| B10 | Social `href="#"` | Footer | Alta | Confianza | Placeholders | Quitar o URLs reales / `span` | footer foundation | XS | Bajo | No |
| B11 | Tests 23 FAIL | QA | Alta | CI | Tests legacy | Actualizar o aislar suites MotanOS | `tests/*` | M | Bajo | **Sí** (si CI exige green) |
| B12 | Focus trap consent | A11y | Alta | Teclado | Incomplete | Trap + return focus | `MsSiteConsentUi.tsx` | S | Bajo | No |
| B13 | Intents form estrechos | Copy | Alta | Posicionamiento | Legacy MotanOS intents | Ampliar (automatización, IA, integración…) | `msSite1703Foundation.ts`, i18n | S | Bajo | No |
| B14 | Vídeo LCP móvil | Perf | Media | LCP 3.8s | preload auto | poster + preload metadata | Hero + splash foundation | S | Medio | No |
| B15 | Google Fonts @import | Perf/Priv | Media | Bloqueo/third-party | CSS import | self-host / `next/font` | `msStudioHome.css`, dark premium | M | Medio | No |
| B16 | CSS/componentes muertos | Arch | Media | Mantenimiento | Acumulación fases | Quarantine/delete controlado | app CSS, `components/home` | L | Alto | No |
| B17 | Headers seguridad | Security | Media | Hardening | Ausentes | CSP/HSTS en Vercel | `vercel.json` | S | Medio | No |
| B18 | FAQ en nav | UX | Crítica | Expectativa | Architecture nav | Quitar hasta existir FAQ | landing architecture, 1701 nav | XS | Bajo | **Sí** |
| B19 | Banner cookies tapa CTA | UX | Media | Conversión | Tamaño panel | Compactar banner | `msSiteConsent.css` | S | Bajo | No |
| B20 | Version 0.1.0 en footer | Marca | Baja | Percepción | Foundation | Ocultar o “2026” sin semver interno | footer foundation | XS | Bajo | No |

---

# 12. Plan de mejora por fases

## Fase 7A — Correcciones críticas de lanzamiento (bloqueantes)

1. Quitar FAQ de nav **o** publicar FAQ mínimo real.  
2. Favicon + icon metadata.  
3. Overflow 320 (header + vídeo).  
4. Footer: duplicado legal + eliminar `href="#"`.  
5. Confirmar API de leads en el entorno de producción.  
6. No indexar legales plantilla **o** completar datos mínimos antes de go-live.

## Fase 7B — Completar narrativa

1. Sección Entrega (ownership, código, docs, handoff).  
2. Tecnologías (criterio, no catálogo infinito).  
3. FAQ (precios orientativos, plazos, para quién, qué no hacemos).  
4. Ajuste intents del formulario.

## Fase 7C — Coherencia visual / responsive

1. Overflow 1280 hero.  
2. Compactar consent banner.  
3. Pulido móvil header.  
4. No rediseñar Offer/Why/Process salvo bugs.

## Fase 7D — Confianza y conversión

1. Casos/muestras reales (sin inventar).  
2. “Qué ocurre después de contactar”.  
3. Refinar CTA final vs contacto.  
4. OG image de marca.

## Fase 7E — Accesibilidad

1. Focus trap consent.  
2. Revisión teclado menú/locale.  
3. Autoplay/sonido y reduced motion (regresión).  
4. Zoom 200/400%.

## Fase 7F — SEO / performance / legal técnico

1. OG/Twitter images.  
2. Self-host fonts; vídeo LCP.  
3. Cablear analytics **solo** con consent gate.  
4. Revisión legal profesional.

## Fase 7G — QA y producción

1. Actualizar tests al chasis actual.  
2. Lint mínimo.  
3. Headers seguridad en Vercel.  
4. Lighthouse + pase manual breakpoints + checklist leads.

---

# 13. Veredicto final

| Pregunta | Respuesta |
|----------|-----------|
| ¿Lista para enseñar a clientes? | **Solo con contexto** (“en construcción / preview”). Sin aviso, los slots vacíos y legales `[EDITAR]` restan seriedad. |
| ¿Lista para captar leads? | **No** de forma fiable (API + narrativa incompleta + confianza). |
| ¿Lista para producción? | **No**. |
| ¿Qué impide lanzarla? | Placeholders en scroll/nav, legales incompletos, favicon/OG, overflow 320, leads sin API garantizada, tests en rojo, redes falsas. |
| ¿Qué puede esperar? | Dirección de arte de Hero–Process; shell; i18n UI; consent UI; export estático. |
| ¿Siguiente trabajo exacto? | **Fase 7A** empezando por: (1) FAQ fuera de nav o FAQ real, (2) favicon, (3) overflow 320, (4) limpieza footer legal/social, (5) verificar API leads — **tras aprobación expresa**. |

---

## Contadores de hallazgos

| Severidad | Cantidad (aprox. única) |
|-----------|-------------------------|
| Críticos | **8** (C1–C8) |
| Altos | **12** (H1–H12) |
| Medios | **14** (M1–M14) |
| Bajos | **8** (L1–L8) |
| **Total** | **42** |

---

*Fin del informe. Sin implementación hasta aprobación explícita.*
