import {
  COMMERCIAL_SITE_BLOCKED_ACTIONS,
  COMMERCIAL_SITE_FOUNDATION_LIMITS,
  COMMERCIAL_SITE_FOUNDATION_MESSAGE,
  COMMERCIAL_SITE_FOUNDATION_RULES,
  COMMERCIAL_SITE_FOUNDATION_STATUS,
  COMMERCIAL_SITE_MARKET_STATUS,
} from "../lib/commercialSiteFoundation.js";
import {
  COMMERCIAL_SITE_SECTIONS,
  isCommercialSiteSectionCtaBlocked,
} from "../lib/commercialSiteSections.js";

export const COMMERCIAL_SITE_FOUNDATION_SHELL = {
  title: COMMERCIAL_SITE_FOUNDATION_STATUS.title,
  notice: COMMERCIAL_SITE_FOUNDATION_STATUS.notice,
  message: { ...COMMERCIAL_SITE_FOUNDATION_MESSAGE },
  sections: COMMERCIAL_SITE_SECTIONS.map((section) => ({
    ...section,
    ctaBlocked: isCommercialSiteSectionCtaBlocked(section),
  })),
  limits: [...COMMERCIAL_SITE_FOUNDATION_LIMITS],
  rules: [...COMMERCIAL_SITE_FOUNDATION_RULES],
  blockedActions: [...COMMERCIAL_SITE_BLOCKED_ACTIONS],
  markets: { ...COMMERCIAL_SITE_MARKET_STATUS },
} as const;
