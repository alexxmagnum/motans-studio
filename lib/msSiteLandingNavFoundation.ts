/**
 * Navegación landing home — scroll spy + active state (Fase 1 chassis).
 */

import {
  MS_STUDIO_LANDING_MOUNTED_SECTION_IDS,
  MS_STUDIO_LANDING_SECTIONS,
} from "./msStudioLandingArchitectureFoundation.js";

/** Solo secciones montadas en el DOM — evita spy/anclas muertas. */
export const MS_SITE_LANDING_NAV_SECTIONS = MS_STUDIO_LANDING_SECTIONS.filter((section) =>
  (MS_STUDIO_LANDING_MOUNTED_SECTION_IDS as readonly string[]).includes(section.id),
).map((section) => ({
  id: section.id,
  navHref: section.navHref,
})) as readonly { readonly id: string; readonly navHref: string }[];

export function isMsSiteNavItemActive(href: string, activePath: string | undefined): boolean {
  if (!activePath) {
    return href === "/";
  }

  if (href === "/") {
    return activePath === "/" || activePath === "/#inicio" || activePath === "#inicio";
  }

  if (href.startsWith("/#")) {
    const hash = href.slice(1);
    return (
      activePath === href ||
      activePath === hash ||
      activePath === `/${hash}` ||
      activePath.endsWith(hash)
    );
  }

  if (href.startsWith("#")) {
    return activePath === href || activePath === `/${href}` || activePath === `/#${href.slice(1)}`;
  }

  // Rutas legacy /servicios /contacto — activas si el hash equivalente está en vista.
  if (href === "/servicios") {
    return (
      activePath === "/servicios" ||
      activePath === "/#servicios" ||
      activePath === "#servicios"
    );
  }

  if (href === "/contacto") {
    return (
      activePath === "/contacto" ||
      activePath === "/#contacto" ||
      activePath === "#contacto"
    );
  }

  return activePath === href || activePath.startsWith(`${href}/`);
}
