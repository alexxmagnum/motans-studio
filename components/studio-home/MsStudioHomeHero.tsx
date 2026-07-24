"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactElement } from "react";
import { MS_STUDIO_HOME_HERO, MS_STUDIO_HOME_SCULPTURE, MS_STUDIO_HOME_MOTANOS_PUBLIC_VISIBLE } from "../../lib/msStudioHomeFoundation.js";
import { MS_SITE_HOME_VIDEO_SPLASH_MP4 } from "../../lib/msSiteHomeVideoSplashFoundation.js";
import { useMsSiteLocale } from "../MsSiteLocaleProvider.js";

const PANEL = MS_STUDIO_HOME_SCULPTURE;

function applyVideoSound(video: HTMLVideoElement): void {
  video.muted = false;
  video.volume = 1;
  video.defaultMuted = false;
}

function playWithSound(video: HTMLVideoElement): Promise<void> {
  applyVideoSound(video);
  video.playsInline = true;
  return video.play();
}

type HeroBadgePhase = "hidden" | "enter" | "visible";

/** Hero split — textos fijos + vídeo con sonido siempre activado. */
export function MsStudioHomeHero(): ReactElement {
  const hero = MS_STUDIO_HOME_HERO;
  const { ui } = useMsSiteLocale();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playbackLocked = useRef(false);
  const badgeRevealed = useRef(false);
  const [badgePhase, setBadgePhase] = useState<HeroBadgePhase>("hidden");

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    let disposed = false;
    let gestureArmed = false;
    let endTimer: number | undefined;

    const revealBadge = (): void => {
      if (disposed || badgeRevealed.current) {
        return;
      }
      badgeRevealed.current = true;
      if (endTimer !== undefined) {
        window.clearTimeout(endTimer);
      }
      setBadgePhase("enter");
    };

    const detachGesture = (): void => {
      window.removeEventListener("click", onGesture, true);
      window.removeEventListener("pointerdown", onGesture, true);
      window.removeEventListener("touchstart", onGesture, true);
      window.removeEventListener("keydown", onGesture, true);
      gestureArmed = false;
    };

    const onGesture = (): void => {
      if (disposed || playbackLocked.current) {
        detachGesture();
        return;
      }
      if (video.ended) {
        video.currentTime = 0;
      }
      void playWithSound(video)
        .then(() => {
          if (!disposed) {
            playbackLocked.current = true;
            detachGesture();
          }
        })
        .catch(() => undefined);
    };

    const armGestureFallback = (): void => {
      if (gestureArmed) {
        return;
      }
      gestureArmed = true;
      window.addEventListener("click", onGesture, true);
      window.addEventListener("pointerdown", onGesture, true);
      window.addEventListener("touchstart", onGesture, true);
      window.addEventListener("keydown", onGesture, true);
    };

    const start = (): void => {
      if (disposed || playbackLocked.current) {
        return;
      }

      video.loop = false;
      applyVideoSound(video);

      void playWithSound(video)
        .then(() => {
          if (!disposed) {
            playbackLocked.current = true;
            detachGesture();
          }
        })
        .catch(() => {
          armGestureFallback();
        });
    };

    const onReady = (): void => {
      start();
    };

    const onEnded = (): void => {
      revealBadge();
    };

    const onMetadata = (): void => {
      if (badgeRevealed.current || !Number.isFinite(video.duration) || video.duration <= 0) {
        return;
      }
      endTimer = window.setTimeout(revealBadge, video.duration * 1000 + 500);
    };

    video.addEventListener("loadeddata", onReady);
    video.addEventListener("canplay", onReady);
    video.addEventListener("ended", onEnded);
    video.addEventListener("loadedmetadata", onMetadata);

    if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
      start();
    }

    if (video.readyState >= HTMLMediaElement.HAVE_METADATA) {
      onMetadata();
    }

    return () => {
      disposed = true;
      playbackLocked.current = false;
      badgeRevealed.current = false;
      if (endTimer !== undefined) {
        window.clearTimeout(endTimer);
      }
      detachGesture();
      video.removeEventListener("loadeddata", onReady);
      video.removeEventListener("canplay", onReady);
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("loadedmetadata", onMetadata);
    };
  }, []);

  return (
    <section
      id={hero.anchorId}
      className="msh-hero msh-hero--copy-fixed"
      aria-labelledby="msh-hero-title"
    >
      <div className="msh-hero__viewport">
        <div className="msh-hero__content">
          <h1 id="msh-hero-title" className="msh-hero__title">
            <span className="msh-hero__title-line">{ui.heroTitleLine1}</span>
            <span className="msh-hero__title-line">{ui.heroTitleLine2}</span>
            <span className="msh-hero__title-line">
              {ui.heroTitleBefore}
              <span className="msh-hero__title-accent msh-hero__title-accent--gradient">
                {ui.heroAccent}
              </span>
              {ui.heroTitleAfter}
            </span>
          </h1>

          <p className="msh-hero__subtitle">{ui.heroSubtitle}</p>

          <ul className="msh-hero__tags" aria-label="Capabilities">
            {[ui.tagWebs, ui.tagSaas, ui.tagAutomation, ui.tagAi].map((tag) => (
              <li key={tag} className="msh-hero__tag">
                {tag}
              </li>
            ))}
          </ul>

          <div className="msh-hero__actions">
            <Link href={hero.cta.href} className="msh-btn msh-btn--cta msh-btn--cta-hero-primary">
              {ui.ctaKnowStudio}
              <span className="msh-btn__arrow" aria-hidden="true">
                →
              </span>
            </Link>
            {MS_STUDIO_HOME_MOTANOS_PUBLIC_VISIBLE ? (
              <Link href={hero.secondaryCta.href} className="msh-btn msh-btn--cta msh-btn--cta-hero-secondary">
                {hero.secondaryCta.label}
                <span className="msh-btn__arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            ) : (
              <Link
                href={hero.secondaryCtaStudio.href}
                className="msh-btn msh-btn--cta msh-btn--cta-hero-secondary"
              >
                {ui.hablemos}
                <span className="msh-btn__arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            )}
          </div>
        </div>

        <div className="msh-hero__visual">
          <div className="msh-hero__sculpture-anchor">
            <div className="msh-hero__floor-stage" aria-hidden={badgePhase === "hidden"}>
              <p
                className={[
                  "msh-hero__badge",
                  "msh-hero__badge--floor",
                  `msh-hero__badge--floor--${badgePhase}`,
                ].join(" ")}
                onAnimationEnd={(event) => {
                  if (event.currentTarget !== event.target) {
                    return;
                  }
                  setBadgePhase((phase) => (phase === "enter" ? "visible" : phase));
                }}
              >
                <span className="msh-hero__badge-text">{hero.badge}</span>
              </p>
            </div>

            <figure className="msh-hero__figure msh-hero__figure--hero-video">
              <video
                ref={videoRef}
                className="msh-hero__hero-video"
                src={MS_SITE_HOME_VIDEO_SPLASH_MP4}
                width={PANEL.width}
                height={PANEL.height}
                preload="auto"
                autoPlay
                playsInline
                disablePictureInPicture
                tabIndex={-1}
                aria-label="Motans Studio — presentación visual"
              />
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
