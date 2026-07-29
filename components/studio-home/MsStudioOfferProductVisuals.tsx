import type { ReactElement } from "react";
import type { MsStudioOfferVisualKind } from "../../lib/msStudioOfferFoundation.js";

/** Dashboard operativo — aplicación web completa. */
function ProductWeb(): ReactElement {
  const rows = [
    { name: "Norte Distribución", status: "Activo", statusTone: "ok", value: "€48.2k", trend: "+12%" },
    { name: "Café Atlántico", status: "Revisión", statusTone: "warn", value: "€12.9k", trend: "+4%" },
    { name: "Grupo Helios", status: "Activo", statusTone: "ok", value: "€91.4k", trend: "+18%" },
    { name: "Mercado Sur", status: "Pausa", statusTone: "mute", value: "€6.1k", trend: "−2%" },
    { name: "LogiPrime", status: "Activo", statusTone: "ok", value: "€33.7k", trend: "+9%" },
    { name: "Vista Mar", status: "Activo", statusTone: "ok", value: "€21.0k", trend: "+7%" },
  ] as const;

  return (
    <div className="msh-prod msh-prod--web" aria-hidden="true">
      <div className="msh-prod-web">
        <aside className="msh-prod-web__side">
          <div className="msh-prod-web__brand">
            <span className="msh-prod-web__logo" />
            <div>
              <strong>OpsDesk</strong>
              <em>Operaciones</em>
            </div>
          </div>
          <nav className="msh-prod-web__nav">
            {["Resumen", "Clientes", "Pedidos", "Equipos", "Informes", "Ajustes"].map((item, i) => (
              <span key={item} className={i === 1 ? "is-active" : undefined}>
                <i />
                {item}
              </span>
            ))}
          </nav>
          <div className="msh-prod-web__side-foot">
            <span className="msh-prod-web__avatar" />
            <div>
              <strong>Ana Ruiz</strong>
              <em>Admin</em>
            </div>
          </div>
        </aside>

        <div className="msh-prod-web__main">
          <header className="msh-prod-web__top">
            <div className="msh-prod-web__search">
              <i />
              <span>Buscar cliente, pedido o equipo…</span>
            </div>
            <div className="msh-prod-web__filters">
              <button type="button" className="is-on">
                Este mes
              </button>
              <button type="button">Trimestre</button>
              <button type="button">Año</button>
            </div>
            <button type="button" className="msh-prod-web__cta">
              Nuevo cliente
            </button>
          </header>

          <div className="msh-prod-web__kpis">
            {[
              { label: "Ingresos", value: "€214k", delta: "+14,2%", up: true },
              { label: "Pedidos", value: "1.284", delta: "+8,1%", up: true },
              { label: "Conversión", value: "3,8%", delta: "+0,4%", up: true },
              { label: "Tiempo medio", value: "2,1h", delta: "−18m", up: true },
            ].map((kpi) => (
              <div key={kpi.label} className="msh-prod-web__kpi">
                <em>{kpi.label}</em>
                <strong>{kpi.value}</strong>
                <span className={kpi.up ? "is-up" : undefined}>{kpi.delta}</span>
              </div>
            ))}
          </div>

          <div className="msh-prod-web__body">
            <div className="msh-prod-web__table-wrap">
              <div className="msh-prod-web__table-head">
                <strong>Clientes activos</strong>
                <span>24 resultados</span>
              </div>
              <div className="msh-prod-web__table">
                <div className="msh-prod-web__tr is-head">
                  <span>Cliente</span>
                  <span>Estado</span>
                  <span>Volumen</span>
                  <span>Tendencia</span>
                </div>
                {rows.map((row) => (
                  <div key={row.name} className="msh-prod-web__tr">
                    <span className="msh-prod-web__client">
                      <i />
                      {row.name}
                    </span>
                    <span className={`msh-prod-web__badge is-${row.statusTone}`}>{row.status}</span>
                    <span>{row.value}</span>
                    <span className="msh-prod-web__trend">{row.trend}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="msh-prod-web__chart-panel">
              <div className="msh-prod-web__chart-head">
                <strong>Actividad semanal</strong>
                <em>Live</em>
              </div>
              <div className="msh-prod-web__chart">
                <div className="msh-prod-web__chart-grid" />
                <svg className="msh-prod-web__spark" viewBox="0 0 280 120" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="mshOfferWebFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgba(4,162,251,0.35)" />
                      <stop offset="100%" stopColor="rgba(4,162,251,0)" />
                    </linearGradient>
                  </defs>
                  <path
                    className="msh-prod-web__spark-fill"
                    d="M0 90 C30 86 45 40 70 48 C95 56 110 20 140 28 C170 36 185 70 210 52 C235 34 255 30 280 18 V120 H0 Z"
                    fill="url(#mshOfferWebFill)"
                  />
                  <path
                    className="msh-prod-web__spark-line"
                    d="M0 90 C30 86 45 40 70 48 C95 56 110 20 140 28 C170 36 185 70 210 52 C235 34 255 30 280 18"
                  />
                  <circle className="msh-prod-web__spark-dot" cx="280" cy="18" r="3.5" />
                </svg>
                <div className="msh-prod-web__chart-cursor" />
              </div>
              <div className="msh-prod-web__legend">
                <span>
                  <i className="is-a" /> Pedidos
                </span>
                <span>
                  <i className="is-b" /> Ingresos
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Ecosistema SaaS multi-ventana. */
function ProductSaas(): ReactElement {
  return (
    <div className="msh-prod msh-prod--saas" aria-hidden="true">
      <div className="msh-prod-saas">
        <div className="msh-prod-saas__window msh-prod-saas__window--workspace">
          <header className="msh-prod-saas__chrome">
            <div className="msh-prod-saas__dots">
              <i />
              <i />
              <i />
            </div>
            <strong>Lattice · Workspace</strong>
            <em>Producción</em>
          </header>
          <div className="msh-prod-saas__workspace">
            <aside>
              {["Overview", "Módulos", "Equipos", "Billing", "Security"].map((item, i) => (
                <span key={item} className={i === 0 ? "is-active" : undefined}>
                  {item}
                </span>
              ))}
            </aside>
            <div className="msh-prod-saas__canvas">
              <div className="msh-prod-saas__module-grid">
                {["CRM", "Inventario", "Facturación", "Soporte", "Analytics", "API"].map((mod, i) => (
                  <div key={mod} className={`msh-prod-saas__mod${i === 2 || i === 4 ? " is-hot" : ""}`}>
                    <strong>{mod}</strong>
                    <em>{i % 2 === 0 ? "Activo" : "Conectado"}</em>
                    <span />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="msh-prod-saas__window msh-prod-saas__window--users">
          <header className="msh-prod-saas__chrome">
            <strong>Usuarios</strong>
            <em>18</em>
          </header>
          <ul className="msh-prod-saas__users">
            {[
              ["María Gómez", "Owner"],
              ["Luis Ortega", "Admin"],
              ["Eva Santos", "Editor"],
              ["Jon Pérez", "Viewer"],
            ].map(([name, role]) => (
              <li key={name}>
                <span className="msh-prod-saas__uavatar" />
                <div>
                  <strong>{name}</strong>
                  <em>{role}</em>
                </div>
                <i className="is-online" />
              </li>
            ))}
          </ul>
        </div>

        <div className="msh-prod-saas__window msh-prod-saas__window--billing">
          <header className="msh-prod-saas__chrome">
            <strong>Facturación</strong>
          </header>
          <div className="msh-prod-saas__billing">
            <em>Plan Growth</em>
            <strong>€890<span>/mes</span></strong>
            <div className="msh-prod-saas__meter">
              <i style={{ width: "68%" }} />
            </div>
            <span>12.4k / 18k eventos</span>
          </div>
        </div>

        <div className="msh-prod-saas__window msh-prod-saas__window--perms">
          <header className="msh-prod-saas__chrome">
            <strong>Permisos</strong>
          </header>
          <div className="msh-prod-saas__perms">
            {["Lectura", "Escritura", "Admin", "Billing"].map((col) => (
              <span key={col} className="is-head">
                {col}
              </span>
            ))}
            {["Owner", "Admin", "Editor"].map((role) =>
              [true, true, role !== "Editor", role === "Owner"].map((on, idx) => (
                <span key={`${role}-${idx}`} className={on ? "is-on" : undefined} />
              )),
            )}
          </div>
        </div>

        <div className="msh-prod-saas__window msh-prod-saas__window--analytics">
          <header className="msh-prod-saas__chrome">
            <strong>Analytics</strong>
            <em>7d</em>
          </header>
          <div className="msh-prod-saas__bars">
            {[40, 62, 48, 78, 55, 88, 70].map((h, i) => (
              <span key={i} style={{ ["--h" as string]: `${h}%` }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Lienzo de automatización tipo n8n/Make. */
function ProductAutomation(): ReactElement {
  return (
    <div className="msh-prod msh-prod--auto" aria-hidden="true">
      <div className="msh-prod-auto">
        <header className="msh-prod-auto__bar">
          <div className="msh-prod-auto__brand">
            <span className="msh-prod-auto__logo" />
            <strong>Flowline</strong>
            <em>Pedido → ERP → Cliente</em>
          </div>
          <div className="msh-prod-auto__actions">
            <span className="is-live">En ejecución</span>
            <button type="button">Historial</button>
            <button type="button" className="is-primary">
              Publicar
            </button>
          </div>
        </header>

        <div className="msh-prod-auto__canvas">
          <div className="msh-prod-auto__grid" />

          <svg className="msh-prod-auto__wires" viewBox="0 0 1000 520" preserveAspectRatio="none">
            <path className="msh-prod-auto__wire" d="M150 120 C220 120 240 120 300 120" />
            <path className="msh-prod-auto__wire" d="M420 120 C480 120 500 180 560 220" />
            <path className="msh-prod-auto__wire" d="M420 120 C480 120 500 80 560 70" />
            <path className="msh-prod-auto__wire" d="M700 70 C760 70 780 120 840 160" />
            <path className="msh-prod-auto__wire" d="M700 220 C760 220 780 200 840 160" />
            <path className="msh-prod-auto__wire" d="M840 160 C900 160 920 260 860 320" />
            <path className="msh-prod-auto__wire" d="M700 320 C760 320 800 320 860 320" />
            <path className="msh-prod-auto__wire" d="M560 320 C500 320 480 280 420 240" />
            <path className="msh-prod-auto__flow" pathLength="1" d="M150 120 C220 120 240 120 300 120" />
            <path className="msh-prod-auto__flow" pathLength="1" d="M420 120 C480 120 500 180 560 220" />
            <path className="msh-prod-auto__flow is-d2" pathLength="1" d="M420 120 C480 120 500 80 560 70" />
            <path className="msh-prod-auto__flow is-d3" pathLength="1" d="M700 70 C760 70 780 120 840 160" />
            <path className="msh-prod-auto__flow is-d4" pathLength="1" d="M700 220 C760 220 780 200 840 160" />
            <path className="msh-prod-auto__flow is-d5" pathLength="1" d="M840 160 C900 160 920 260 860 320" />
          </svg>

          <div className="msh-prod-auto__node" style={{ left: "14%", top: "18%" }}>
            <em>Trigger</em>
            <strong>Nuevo pedido</strong>
            <span>Webhook · HTTPS</span>
          </div>
          <div className="msh-prod-auto__node is-accent" style={{ left: "34%", top: "18%" }}>
            <em>Transform</em>
            <strong>Normalizar datos</strong>
            <span>Map · Validate</span>
          </div>
          <div className="msh-prod-auto__node" style={{ left: "54%", top: "10%" }}>
            <em>Filter</em>
            <strong>¿Importe &gt; 200?</strong>
            <span>Branch</span>
          </div>
          <div className="msh-prod-auto__node" style={{ left: "54%", top: "36%" }}>
            <em>CRM</em>
            <strong>Actualizar cliente</strong>
            <span>PATCH /contacts</span>
          </div>
          <div className="msh-prod-auto__node is-hot" style={{ left: "78%", top: "22%" }}>
            <em>ERP</em>
            <strong>Crear factura</strong>
            <span>Sync · 240ms</span>
            <i className="msh-prod-auto__pulse" />
          </div>
          <div className="msh-prod-auto__node" style={{ left: "54%", top: "58%" }}>
            <em>Delay</em>
            <strong>Esperar 10 min</strong>
            <span>Queue</span>
          </div>
          <div className="msh-prod-auto__node is-ok" style={{ left: "78%", top: "58%" }}>
            <em>Notify</em>
            <strong>Email al cliente</strong>
            <span>Enviado</span>
          </div>
          <div className="msh-prod-auto__node" style={{ left: "34%", top: "42%" }}>
            <em>Log</em>
            <strong>Registrar evento</strong>
            <span>Audit trail</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Workspace de IA profesional. */
function ProductAi(): ReactElement {
  return (
    <div className="msh-prod msh-prod--ai" aria-hidden="true">
      <div className="msh-prod-ai">
        <aside className="msh-prod-ai__docs">
          <header>
            <strong>Atlas</strong>
            <em>Workspace</em>
          </header>
          <div className="msh-prod-ai__doc-list">
            {[
              ["Informe Q2.pdf", "Hace 2 h"],
              ["Contrato marco.docx", "Ayer"],
              ["Pipeline CRM.csv", "Hace 3 d"],
              ["Notas reunión.md", "Hoy"],
            ].map(([name, when], i) => (
              <div key={name} className={i === 0 ? "is-active" : undefined}>
                <span className="msh-prod-ai__file" />
                <div>
                  <strong>{name}</strong>
                  <em>{when}</em>
                </div>
              </div>
            ))}
          </div>
          <button type="button">+ Añadir fuente</button>
        </aside>

        <div className="msh-prod-ai__chat">
          <header className="msh-prod-ai__chat-head">
            <strong>Resumen operativo</strong>
            <span className="is-live">Analizando</span>
          </header>
          <div className="msh-prod-ai__thread">
            <div className="msh-prod-ai__msg is-user">
              Resume los riesgos del informe Q2 y propón 3 acciones para el equipo comercial.
            </div>
            <div className="msh-prod-ai__msg is-system">
              <p>
                He detectado 3 riesgos con impacto alto en margen y 2 oportunidades de upsell en
                cuentas Enterprise.
              </p>
              <div className="msh-prod-ai__actions-inline">
                <span>Ver riesgos</span>
                <span>Exportar brief</span>
                <span>Crear tareas</span>
              </div>
            </div>
            <div className="msh-prod-ai__msg is-system is-typing">
              <i />
              <i />
              <i />
            </div>
          </div>
          <div className="msh-prod-ai__composer">
            <span>Pregunta sobre tus documentos…</span>
            <button type="button">Enviar</button>
          </div>
        </div>

        <aside className="msh-prod-ai__side">
          <section>
            <em>Análisis</em>
            <strong>Confianza 94%</strong>
            <div className="msh-prod-ai__meter">
              <i />
            </div>
          </section>
          <section>
            <em>Hallazgos</em>
            <ul>
              <li>Retrasos en 4 cuentas clave</li>
              <li>Ticket medio +11% MoM</li>
              <li>Churn latent en retail</li>
            </ul>
          </section>
          <section>
            <em>Acciones</em>
            <div className="msh-prod-ai__todo">
              <label>
                <i className="is-on" /> Priorizar Helios
              </label>
              <label>
                <i /> Revisar pricing Sur
              </label>
              <label>
                <i /> Brief semanal
              </label>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}

/** Red de integraciones detallada. */
function ProductIntegrations(): ReactElement {
  const nodes = [
    { id: "crm", label: "CRM", meta: "Synced", x: 16, y: 20, tone: "ok" },
    { id: "erp", label: "ERP", meta: "2.1k/min", x: 84, y: 20, tone: "ok" },
    { id: "mail", label: "Email", meta: "Online", x: 14, y: 52, tone: "ok" },
    { id: "pay", label: "Payments", meta: "Lag 40ms", x: 86, y: 52, tone: "warn" },
    { id: "wh", label: "Warehouse", meta: "Online", x: 26, y: 82, tone: "ok" },
    { id: "bi", label: "BI", meta: "Streaming", x: 74, y: 82, tone: "ok" },
    { id: "sup", label: "Support", meta: "Online", x: 50, y: 12, tone: "ok" },
    { id: "hr", label: "HRIS", meta: "Idle", x: 50, y: 88, tone: "mute" },
  ] as const;

  return (
    <div className="msh-prod msh-prod--integ" aria-hidden="true">
      <div className="msh-prod-integ">
        <header className="msh-prod-integ__bar">
          <div>
            <strong>Nexus</strong>
            <em>Integraciones · 12 conectores</em>
          </div>
          <div className="msh-prod-integ__stats">
            <span>
              <i className="is-ok" /> 11 online
            </span>
            <span>
              <i className="is-warn" /> 1 latency
            </span>
            <span>Sync cada 30s</span>
          </div>
        </header>

        <div className="msh-prod-integ__stage">
          <div className="msh-prod-integ__orbits">
            <span />
            <span />
            <span />
          </div>

          <svg className="msh-prod-integ__links" viewBox="0 0 100 100" preserveAspectRatio="none">
            {nodes.map((n) => (
              <path
                key={n.id}
                className="msh-prod-integ__link"
                d={`M50 50 Q ${(n.x + 50) / 2} ${(n.y + 50) / 2 - 8} ${n.x} ${n.y}`}
              />
            ))}
            {nodes.map((n) => (
              <path
                key={`${n.id}-flow`}
                className={`msh-prod-integ__flow${n.tone === "warn" ? " is-warn" : ""}`}
                pathLength="1"
                d={`M50 50 Q ${(n.x + 50) / 2} ${(n.y + 50) / 2 - 8} ${n.x} ${n.y}`}
              />
            ))}
          </svg>

          <div className="msh-prod-integ__hub">
            <strong>API Hub</strong>
            <em>Graph · REST · Webhooks</em>
            <span className="msh-prod-integ__hub-pulse" />
          </div>

          {nodes.map((n) => (
            <div
              key={n.id}
              className={`msh-prod-integ__node is-${n.tone}`}
              style={{ left: `${n.x}%`, top: `${n.y}%` }}
            >
              <strong>{n.label}</strong>
              <em>{n.meta}</em>
              <i />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function MsStudioOfferProductVisual({
  kind,
}: {
  readonly kind: MsStudioOfferVisualKind;
}): ReactElement {
  switch (kind) {
    case "web":
      return <ProductWeb />;
    case "saas":
      return <ProductSaas />;
    case "automation":
      return <ProductAutomation />;
    case "ai":
      return <ProductAi />;
    case "integrations":
      return <ProductIntegrations />;
  }
}
