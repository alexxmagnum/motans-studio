import type React from "react";
import type { MsSiteMotanosVideoCard } from "../lib/msSite1703Foundation.js";

export interface MsVideoCardProps {
  readonly card: MsSiteMotanosVideoCard;
  readonly showCopy?: boolean | undefined;
  readonly className?: string | undefined;
}

function VideoMedia({ card }: { readonly card: MsSiteMotanosVideoCard }): React.ReactElement {
  if (card.videoSrc) {
    return (
      <video
        className="ms-video-card__video"
        controls
        preload="metadata"
        playsInline
        aria-label={`${card.title} — ${card.subtitle}`}
      >
        <source src={card.videoSrc} type="video/mp4" />
        <track kind="captions" />
      </video>
    );
  }

  return (
    <div className="ms-video-card__placeholder" role="img" aria-label={`${card.badge}: ${card.title}`}>
      <span className="ms-video-card__badge">{card.badge}</span>
      <span className="ms-video-card__play" aria-hidden="true">
        <svg viewBox="0 0 48 48" width="48" height="48" focusable="false">
          <circle cx="24" cy="24" r="23" fill="rgba(0,0,0,0.35)" />
          <path d="M20 16v16l14-8z" fill="#ffffff" />
        </svg>
      </span>
      <span className="ms-video-card__placeholder-note">Próximamente en demo</span>
    </div>
  );
}

export function MsVideoCard({
  card,
  showCopy = true,
  className,
}: MsVideoCardProps): React.ReactElement {
  const rootClass = ["ms-video-card", className].filter(Boolean).join(" ");

  return (
    <article className={rootClass}>
      <VideoMedia card={card} />
      {showCopy ? (
        <div className="ms-video-card__copy">
          <p className="ms-video-card__eyebrow">{card.subtitle}</p>
          <h3 className="ms-video-card__title">{card.title}</h3>
          <p className="ms-video-card__line">{card.description}</p>
        </div>
      ) : null}
    </article>
  );
}
