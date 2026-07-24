import type { ReactElement } from "react";
import Link from "next/link";
import { MS_STUDIO_HOME_CONTINUITY } from "../../lib/msStudioHomeFoundation.js";

type MsStudioHomeContinuityProps = {
  /** `home` — ancla tras el hero; `page` — /servicios con H1 (legacy editorial). */
  readonly variant?: "home" | "page";
};

type ContinuityItem = (typeof MS_STUDIO_HOME_CONTINUITY.items)[number];

function hasCta(
  item: ContinuityItem,
): item is ContinuityItem & { readonly cta: string; readonly href: string } {
  return "cta" in item && "href" in item && typeof item.cta === "string" && typeof item.href === "string";
}

function itemOfferings(item: ContinuityItem): readonly string[] {
  if ("offerings" in item && Array.isArray(item.offerings)) {
    return item.offerings;
  }
  if ("line" in item && typeof item.line === "string") {
    return [item.line];
  }
  return [];
}

/** Catálogo editorial de capacidades — continuidad premium tras el hero. */
export function MsStudioHomeContinuity({
  variant = "home",
}: MsStudioHomeContinuityProps): ReactElement {
  const section = MS_STUDIO_HOME_CONTINUITY;
  const isPage = variant === "page";
  const HeadingTag = isPage ? "h1" : "h2";
  const ItemHeadingTag = isPage ? "h2" : "h3";
  const titleId = isPage ? "ms-servicios-editorial-title" : "msh-continuity-title";

  return (
    <section
      id={variant === "home" ? section.anchorId : undefined}
      className={`msh-continuity${isPage ? " msh-continuity--page" : ""}`}
      aria-labelledby={titleId}
    >
      <div className="msh-continuity__shell">
        <p className="msh-continuity__kicker">{section.kicker}</p>
        <HeadingTag id={titleId} className="msh-continuity__title">
          {section.title}
        </HeadingTag>
        <p className="msh-continuity__lead">{section.lead}</p>

        <div
          className={
            isPage
              ? "msh-continuity__catalog"
              : "msh-continuity__catalog msh-continuity__catalog--cards ms-dp-trio"
          }
        >
          {section.items.map((item) => (
            <article
              key={item.id}
              id={`build-${item.id}`}
              className={[
                "msh-continuity__item",
                isPage ? `msh-continuity__item--${item.layout}` : "ms-dp-trio__item",
                isPage ? `msh-continuity__item--${item.id}` : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {isPage ? (
                <span className="msh-continuity__item-backdrop" aria-hidden="true">
                  {item.backdropWord}
                </span>
              ) : (
                <p className="ms-dp-section__kicker">{item.backdropWord}</p>
              )}
              <ItemHeadingTag className={isPage ? "msh-continuity__item-title" : undefined}>
                {item.title}
              </ItemHeadingTag>
              {itemOfferings(item).map((line) => (
                <p key={line} className={isPage ? "msh-continuity__item-line" : undefined}>
                  {line}
                </p>
              ))}
              {hasCta(item) ? (
                <Link href={item.href} className="msh-continuity__link">
                  {item.cta} →
                </Link>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
