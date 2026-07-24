import { MS_SITE_ROUTES } from "./msSite1701Foundation.js";

export const MS_SITE_PAGE_BACK_BLOCK_ID = "MS_SITE_PAGE_BACK_V1" as const;

export const MS_SITE_PAGE_BACK_LABEL = "Volver" as const;

export type MsSitePageBackTarget = {
  readonly href: string;
  readonly label: string;
};

const MS_SITE_PAGE_BACK_BY_PATH: Record<string, MsSitePageBackTarget> = {
  [MS_SITE_ROUTES.servicios]: {
    href: MS_SITE_ROUTES.home,
    label: MS_SITE_PAGE_BACK_LABEL,
  },
  [MS_SITE_ROUTES.contacto]: {
    href: MS_SITE_ROUTES.home,
    label: MS_SITE_PAGE_BACK_LABEL,
  },
  [MS_SITE_ROUTES.planes]: {
    href: MS_SITE_ROUTES.home,
    label: MS_SITE_PAGE_BACK_LABEL,
  },
  [MS_SITE_ROUTES.motanos]: {
    href: MS_SITE_ROUTES.home,
    label: MS_SITE_PAGE_BACK_LABEL,
  },
  [MS_SITE_ROUTES.hosteleria]: {
    href: MS_SITE_ROUTES.motanos,
    label: "Volver a MotanOS",
  },
  [MS_SITE_ROUTES.solicitud]: {
    href: MS_SITE_ROUTES.planes,
    label: "Volver a planes",
  },
  [MS_SITE_ROUTES.legal]: {
    href: MS_SITE_ROUTES.home,
    label: MS_SITE_PAGE_BACK_LABEL,
  },
};

export function getMsSitePageBack(pathname: string): MsSitePageBackTarget | null {
  if (pathname === MS_SITE_ROUTES.home) {
    return null;
  }

  return (
    MS_SITE_PAGE_BACK_BY_PATH[pathname] ?? {
      href: MS_SITE_ROUTES.home,
      label: MS_SITE_PAGE_BACK_LABEL,
    }
  );
}
