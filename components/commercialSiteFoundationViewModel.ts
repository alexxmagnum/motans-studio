import { COMMERCIAL_SITE_FOUNDATION_SHELL } from "../app/commercialSiteFoundationShell.js";
import {
  COMMERCIAL_SITE_SECTIONS,
  isCommercialSiteSectionCtaBlocked,
} from "../lib/commercialSiteSections.js";

export type CommercialSiteFoundationViewModelSection = {
  id: string;
  label: string;
  description: string;
  routeAnchor: string;
  status: string;
  allowedMessage: string;
  forbiddenClaims: readonly string[];
  ctaState: string;
  ctaBlocked: boolean;
};

export type CommercialSiteFoundationViewModelBlockedAction = {
  id: string;
  label: string;
  reason: string;
  disabled: boolean;
};

export type CommercialSiteFoundationViewModel = {
  title: string;
  notice: string;
  headline: string;
  tagline: string;
  pitch: string;
  benefit: string;
  differentiator: string;
  vertical: string;
  digitalMenuClaim: string;
  customerWebClaim: string;
  sections: readonly CommercialSiteFoundationViewModelSection[];
  limits: readonly string[];
  rules: readonly string[];
  blockedActions: readonly CommercialSiteFoundationViewModelBlockedAction[];
  markets: typeof COMMERCIAL_SITE_FOUNDATION_SHELL.markets;
  scopeNotice: string;
  rendererNote: string;
};

export const createCommercialSiteFoundationViewModel =
  (): CommercialSiteFoundationViewModel => {
    return {
      title: COMMERCIAL_SITE_FOUNDATION_SHELL.title,
      notice: COMMERCIAL_SITE_FOUNDATION_SHELL.notice,
      headline: COMMERCIAL_SITE_FOUNDATION_SHELL.message.headline,
      tagline: COMMERCIAL_SITE_FOUNDATION_SHELL.message.tagline,
      pitch: COMMERCIAL_SITE_FOUNDATION_SHELL.message.pitch,
      benefit: COMMERCIAL_SITE_FOUNDATION_SHELL.message.benefit,
      differentiator: COMMERCIAL_SITE_FOUNDATION_SHELL.message.differentiator,
      vertical: COMMERCIAL_SITE_FOUNDATION_SHELL.message.vertical,
      digitalMenuClaim:
        COMMERCIAL_SITE_FOUNDATION_SHELL.message.digitalMenuClaim,
      customerWebClaim:
        COMMERCIAL_SITE_FOUNDATION_SHELL.message.customerWebClaim,
      sections: COMMERCIAL_SITE_SECTIONS.map((section) => ({
        id: section.id,
        label: section.label,
        description: section.description,
        routeAnchor: section.routeAnchor,
        status: section.status,
        allowedMessage: section.allowedMessage,
        forbiddenClaims: section.forbiddenClaims,
        ctaState: section.ctaState,
        ctaBlocked: isCommercialSiteSectionCtaBlocked(section),
      })),
      limits: COMMERCIAL_SITE_FOUNDATION_SHELL.limits,
      rules: COMMERCIAL_SITE_FOUNDATION_SHELL.rules,
      blockedActions: COMMERCIAL_SITE_FOUNDATION_SHELL.blockedActions.map(
        (action) => ({
          id: action.id,
          label: action.label,
          reason: action.reason,
          disabled: action.disabled,
        }),
      ),
      markets: COMMERCIAL_SITE_FOUNDATION_SHELL.markets,
      scopeNotice:
        "Foundation only — no real commercial operations. El site comercial vende MotanOS, no una carta digital suelta. CTA y solicitudes son placeholders no persistentes.",
      rendererNote:
        "Renderer implementation pending. Framework visual not selected in this phase.",
    };
  };

export const COMMERCIAL_SITE_FOUNDATION_VIEW_MODEL =
  createCommercialSiteFoundationViewModel();
