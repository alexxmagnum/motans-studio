import { COMMERCIAL_SITE_FOUNDATION_VIEW_MODEL } from "../components/commercialSiteFoundationViewModel.js";

export type CommercialSiteLayoutConstraints = {
  allowsRealLeadCapture: boolean;
  allowsCheckout: boolean;
  allowsPayments: boolean;
  allowsBackendConnection: boolean;
  allowsRealPricing: boolean;
  allowsStandaloneDigitalMenuSale: boolean;
  allowsCustomerWebGeneration: boolean;
  allowsDeliveryTakeawayAsActive: boolean;
};

export type CommercialSiteRenderingRequirements = {
  showFoundationNotice: boolean;
  showNoStandaloneDigitalMenuMessage: boolean;
  showNoRealLeadCaptureMessage: boolean;
  showNoCheckoutMessage: boolean;
  showNoFinalPricingMessage: boolean;
  showFutureModulesAsFuture: boolean;
  showCustomerWebAsOptional: boolean;
  showMarketsSafely: boolean;
  showLegalPlaceholderWarning: boolean;
  disableBlockedCtas: boolean;
};

export type CommercialSiteShellLayoutContract = {
  id: string;
  title: string;
  purpose: string;
  frameworkAgnostic: boolean;
  rendererImplementationPending: boolean;
  constraints: CommercialSiteLayoutConstraints;
  renderingRequirements: CommercialSiteRenderingRequirements;
  suggestedComponents: readonly string[];
  suggestedLayoutOrder: readonly string[];
};

export const COMMERCIAL_SITE_SHELL_LAYOUT_CONTRACT: CommercialSiteShellLayoutContract =
  {
    id: "commercial-site-foundation-shell-layout",
    title: COMMERCIAL_SITE_FOUNDATION_VIEW_MODEL.title,
    purpose:
      "Framework-agnostic layout contract for the commercial site foundation. Defines structural constraints, rendering requirements and safe component suggestions before any framework or renderer is chosen.",
    frameworkAgnostic: true,
    rendererImplementationPending: true,
    constraints: {
      allowsRealLeadCapture: false,
      allowsCheckout: false,
      allowsPayments: false,
      allowsBackendConnection: false,
      allowsRealPricing: false,
      allowsStandaloneDigitalMenuSale: false,
      allowsCustomerWebGeneration: false,
      allowsDeliveryTakeawayAsActive: false,
    },
    renderingRequirements: {
      showFoundationNotice: true,
      showNoStandaloneDigitalMenuMessage: true,
      showNoRealLeadCaptureMessage: true,
      showNoCheckoutMessage: true,
      showNoFinalPricingMessage: true,
      showFutureModulesAsFuture: true,
      showCustomerWebAsOptional: true,
      showMarketsSafely: true,
      showLegalPlaceholderWarning: true,
      disableBlockedCtas: true,
    },
    suggestedComponents: [
      "CommercialSiteShellHeader",
      "CommercialHero",
      "CommercialSectionList",
      "CommercialSectionCard",
      "CommercialLimitsPanel",
      "CommercialBlockedActionsPanel",
      "CommercialMarketStatusPanel",
      "CommercialFinalCtaPlaceholder",
    ],
    suggestedLayoutOrder: [
      "hero",
      "problem",
      "solution",
      "not-just-qr",
      "motanos-hosteleria",
      "digital-menu-inside-motanos",
      "operations",
      "current-modules",
      "future-modules",
      "customer-web-optional",
      "plans-preview",
      "assisted-request",
      "markets",
      "final-cta",
      "legal-placeholder",
    ],
  };
