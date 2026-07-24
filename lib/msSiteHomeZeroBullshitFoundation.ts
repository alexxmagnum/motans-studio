/**
 * MOTANS_STUDIO_HOME_REBUILD_V2_ZERO_BULLSHIT — copy y estructura SSOT de la Home.
 */

import { MS_SITE_ROUTES } from "./msSite1701Foundation.js";

export const MS_SITE_HOME_ZERO_BULLSHIT_BLOCK_ID =
  "MOTANS_STUDIO_HOME_REBUILD_V2_ZERO_BULLSHIT" as const;

export const MS_SITE_HOME_V2_HERO = {
  anchorId: "inicio",
  /** Una sola idea fuerte — las opciones van en los botones, no en 4 H1. */
  title: "¿Qué necesitas hacer crecer?",
  hints: ["Web", "App", "MotanOS", "Restaurante"] as const,
  lead: "Motans Studio diseña y desarrolla sistemas digitales reales.",
  actions: [
    { id: "web", label: "Quiero una web", href: "#contacto", btn: "primary" as const },
    { id: "motanos", label: "Quiero MotanOS", href: "#motanos", btn: "secondary" as const },
    { id: "app", label: "Quiero una app", href: "#contacto", btn: "ghost" as const },
    { id: "talk", label: "Quiero hablar", href: "#contacto", btn: "primary" as const },
  ] as const,
} as const;

export const MS_SITE_HOME_V2_WHAT = {
  anchorId: "servicios",
  kicker: "Servicios",
  title: "Qué hacemos",
  items: [
    {
      id: "webs",
      title: "Webs",
      line: "Rápidas, claras y hechas para traer clientes.",
    },
    {
      id: "apps",
      title: "Aplicaciones",
      line: "Herramientas internas y software hecho para tu negocio.",
    },
    {
      id: "motanos",
      title: "MotanOS",
      line: "Para restaurantes y negocios que quieren orden en el día a día.",
      href: "#motanos",
    },
  ] as const,
} as const;

export const MS_SITE_HOME_V2_CASES = {
  anchorId: "casos",
  title: "Casos reales",
  items: [
    {
      id: "restaurante",
      title: "Restaurante",
      problem: "Pedidos por WhatsApp, papel y boca.",
      result: "Un solo flujo desde la mesa.",
    },
    {
      id: "local",
      title: "Negocio local",
      problem: "Poca presencia online.",
      result: "Web nueva que explica y convierte.",
    },
    {
      id: "software",
      title: "Software",
      problem: "Todo en Excel y mensajes.",
      result: "Una app para centralizarlo.",
    },
  ] as const,
} as const;

export const MS_SITE_HOME_V2_MOTANOS = {
  anchorId: "motanos",
  title: "MotanOS",
  lead: "Así funciona en un restaurante:",
  steps: [
    "Cliente escanea QR",
    "Hace pedido",
    "Equipo valida",
    "Cocina recibe",
    "Servicio completado",
  ] as const,
  cta: { label: "Ver MotanOS", href: MS_SITE_ROUTES.motanos },
} as const;
