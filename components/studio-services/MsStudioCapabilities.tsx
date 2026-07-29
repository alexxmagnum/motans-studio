"use client";

import type { ReactElement } from "react";
import Link from "next/link";
import {
  MS_SITE_BRAND_ASSETS,
  MS_SITE_PUBLIC_MOTANOS_VISIBLE,
} from "../../lib/msSite1701Foundation.js";
import {
  MS_STUDIO_CAPABILITIES,
  type MsStudioCapabilitiesVisualVariant,
} from "../../lib/msStudioServicesFoundation.js";
import { useMsSiteLocale } from "../MsSiteLocaleProvider.js";
import { MsStudioCapabilitiesVisual } from "./MsStudioCapabilitiesVisual.js";
import { MsCapMotanosStampInteractive } from "./MsCapMotanosStampInteractive.js";
import { MsStudioSectionEyebrow } from "../studio-home/MsStudioSectionEyebrow.js";

type MsStudioCapabilitiesProps = {
  readonly asPage?: boolean;
  /** Oculta el intro rail (home: Continuity ya introduce). */
  readonly hideIntro?: boolean;
  /** Excluye bloques por id. MotanOS se excluye siempre si la superficie pública lo tiene congelado. */
  readonly excludeBlockIds?: readonly MsStudioCapabilitiesVisualVariant[];
  /** Ancla de sección; `null` = sin id. Default: `servicios` si no asPage. */
  readonly sectionId?: string | null;
};

/** Qué hacemos — página /servicios (mismo bloque que antes en #servicios). */
export function MsStudioCapabilities({
  asPage = false,
  hideIntro = false,
  excludeBlockIds = [],
  sectionId,
}: MsStudioCapabilitiesProps): ReactElement {
  const page = MS_STUDIO_CAPABILITIES;
  const { ui } = useMsSiteLocale();
  const sectionTitleId = "msh-servicios-title";
  const SectionHeading = asPage ? "h1" : "h2";
  const exclude = new Set<MsStudioCapabilitiesVisualVariant>([
    ...excludeBlockIds,
    ...(MS_SITE_PUBLIC_MOTANOS_VISIBLE ? [] : (["motanos"] as const)),
  ]);
  const blocks = page.blocks.filter((block) => !exclude.has(block.id));
  const resolvedSectionId =
    sectionId === null ? undefined : sectionId !== undefined ? sectionId : asPage ? undefined : "servicios";

  const localizedById: Record<
    string,
    { readonly kicker: string; readonly title: string; readonly description: string }
  > = {
    webs: {
      kicker: ui.capWebsKicker,
      title: ui.capWebsTitle,
      description: ui.capWebsDesc,
    },
    "plataformas-saas": {
      kicker: ui.capSaasKicker,
      title: ui.capSaasTitle,
      description: ui.capSaasDesc,
    },
    automatizacion: {
      kicker: ui.capAutoKicker,
      title: ui.capAutoTitle,
      description: ui.capAutoDesc,
    },
  };

  return (
    <section className="mscap mscap--v13" id={resolvedSectionId}>
      {hideIntro ? null : (
        <div className="mscap-rail mscap-home-intro" aria-labelledby={sectionTitleId}>
          <MsStudioSectionEyebrow>{ui.capKicker}</MsStudioSectionEyebrow>
          <SectionHeading id={sectionTitleId} className="msh-hero__title mscap-home-intro__title">
            <span className="msh-hero__title-line">{ui.capTitleBefore}</span>
            <span className="msh-hero__title-line">
              {ui.capTitleBeforeAccent}
              <span className="msh-hero__title-accent msh-hero__title-accent--gradient">
                {ui.capAccent}
              </span>
              {ui.capTitleAfter}
            </span>
          </SectionHeading>
          <p className="msh-hero__subtitle mscap-home-intro__lead">{ui.capLead}</p>
        </div>
      )}

      <div className="mscap__blocks">
        {blocks.map((block, index) => {
          const localized = localizedById[block.id];
          return (
            <article
              key={block.id}
              id={block.id}
              className={[
                "mscap-block",
                `mscap-block--${block.id}`,
                block.layout === "end" && block.id !== "motanos" ? "mscap-block--reverse" : "",
              ].join(" ")}
              aria-labelledby={`mscap-${block.id}-title`}
            >
              {block.id === "motanos" ? (
                <div className="mscap-rail mscap-block__row mscap-block__row--motanos">
                  <div className="mscap-block__thumb">
                    <MsStudioCapabilitiesVisual variant={block.id} priority={index === 0} expandable />
                  </div>
                  <div className="mscap-block__copy mscap-block__copy--motanos">
                    <h3
                      id={`mscap-${block.id}-title`}
                      className="mscap-block__stamp-wrap mscap-block__stamp-wrap--motanos"
                    >
                      <MsCapMotanosStampInteractive
                        stampSrc={MS_SITE_BRAND_ASSETS.logoMotanOSProduct.path}
                        label={MS_SITE_BRAND_ASSETS.logoMotanOSProduct.alt}
                      />
                    </h3>
                    <div className="mscap-motanos-body">
                      {block.subtitle ? (
                        <p className="mscap-block__subtitle">{block.subtitle}</p>
                      ) : null}
                      <p className="mscap-block__line msh-hero__subtitle">{block.description}</p>
                      <Link
                        href={block.href}
                        className="mscap-block__cta msh-btn msh-btn--cta msh-btn--cta-hero-secondary"
                      >
                        {block.cta}
                        <span className="mscap-block__cta-arrow" aria-hidden="true">
                          →
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mscap-rail mscap-block__row">
                  <div className="mscap-block__copy">
                    <p className="mscap-block__kicker">{localized?.kicker ?? block.kicker}</p>
                    <h3 id={`mscap-${block.id}-title`} className="mscap-block__title msh-hero__title">
                      <span className="msh-hero__title-line">{localized?.title ?? block.title}</span>
                    </h3>
                    <p className="mscap-block__line msh-hero__subtitle">
                      {localized?.description ?? block.description}
                    </p>
                  </div>

                  <div className="mscap-block__thumb">
                    <MsStudioCapabilitiesVisual variant={block.id} priority={index === 0} expandable />
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
