/**
 * Navegación landing home — scroll spy solo en secciones de la home.
 */

export const MS_SITE_LANDING_NAV_SECTIONS = [{ id: "inicio", navHref: "/" }] as const;

const LEGACY_SERVICIOS_HREFS = ["/#servicios", "#servicios"] as const;
const LEGACY_CONTACTO_HREFS = ["/#contacto", "#contacto"] as const;

export function isMsSiteNavItemActive(href: string, activePath: string | undefined): boolean {
  if (!activePath) {
    return href === "/";
  }

  if (href === "/") {
    return activePath === "/" || activePath === "/#inicio" || activePath === "#inicio";
  }

  if (href === "/servicios") {
    return (
      activePath === "/servicios" ||
      activePath.startsWith("/servicios/") ||
      LEGACY_SERVICIOS_HREFS.includes(activePath as (typeof LEGACY_SERVICIOS_HREFS)[number])
    );
  }

  if (href === "/contacto") {
    return (
      activePath === "/contacto" ||
      activePath.startsWith("/contacto/") ||
      LEGACY_CONTACTO_HREFS.includes(activePath as (typeof LEGACY_CONTACTO_HREFS)[number])
    );
  }

  if (href.startsWith("/#")) {
    const hashHref = href.slice(1);
    return activePath === href || activePath === hashHref;
  }

  return activePath === href || activePath.startsWith(`${href}/`);
}
