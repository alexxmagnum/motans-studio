import type React from "react";
import type { MsSiteMotanosVideoCard } from "../lib/msSite1703Foundation.js";
import { MsVideoCard } from "./MsVideoCard.js";

export interface MsMotanosVideoCardsProps {
  readonly items: readonly MsSiteMotanosVideoCard[];
  readonly sectionTitle?: string | undefined;
  readonly sectionLead?: string | undefined;
}

export function MsMotanosVideoCards({
  items,
  sectionTitle,
  sectionLead,
}: MsMotanosVideoCardsProps): React.ReactElement {
  return (
    <section className="ms-video-cards" aria-labelledby="ms-motanos-videos-title">
      {sectionTitle ? (
        <header className="ms-video-cards__head">
          <h3 id="ms-motanos-videos-title">{sectionTitle}</h3>
          {sectionLead ? <p className="ms-video-cards__lead">{sectionLead}</p> : null}
        </header>
      ) : null}
      <ul className="ms-video-cards__grid">
        {items.map((card) => (
          <li key={card.id}>
            <MsVideoCard card={card} />
          </li>
        ))}
      </ul>
    </section>
  );
}
