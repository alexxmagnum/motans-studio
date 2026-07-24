import type React from "react";
import { MS_SITE_HERO_HOSTELERIA_JOURNEY } from "../lib/msSite1703Foundation.js";
import { MsMotanosStampHeroBand } from "./MsMotanosStampHeroBand.js";
import { MsVideoCard } from "./MsVideoCard.js";

export function MsHeroHosteleriaJourneyPanel(): React.ReactElement {
  const { video } = MS_SITE_HERO_HOSTELERIA_JOURNEY;

  return (
    <aside className="ms-hero-journey" aria-label={video.title}>
      <div className="ms-hero-journey__stack">
        <MsMotanosStampHeroBand />
        <MsVideoCard card={video} className="ms-hero-journey__video-card" />
      </div>
    </aside>
  );
}
