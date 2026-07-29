"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactElement } from "react";
import {
  MS_STUDIO_HOME_HERO,
  MS_STUDIO_HOME_MOTANOS_PUBLIC_VISIBLE,
  MS_STUDIO_HOME_SCULPTURE,
} from "../../lib/msStudioHomeFoundation.js";
import { MS_SITE_HOME_VIDEO_SPLASH_MP4 } from "../../lib/msSiteHomeVideoSplashFoundation.js";
import { useMsSiteLocale } from "../MsSiteLocaleProvider.js";
import { MsSiteNavAnchor } from "../MsSiteNavAnchor.js";

const PANEL = MS_STUDIO_HOME_SCULPTURE;

type HeroBadgePhase = "hidden" | "enter" | "visible";

function applySoundOn(video: HTMLVideoElement): void {
  video.muted = false;
  video.defaultMuted = false;
  video.volume = 1;
}

/**
 * Hero Experience:
 * - vídeo completo (sin recorte de la M)
 * - sonido con fallback por gesto
 * - “Motans Studio” en el suelo tras acabar el splash
 */
export function MsStudioHomeHero(): ReactElement {
  const hero = MS_STUDIO_HOME_HERO;
  const { ui } = useMsSiteLocale();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playbackLocked = useRef(false);
  const badgeRevealed = useRef(false);
  const [entered, setEntered] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [badgePhase, setBadgePhase] = useState<HeroBadgePhase>("hidden");

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setEntered(true);
      setBadgePhase("visible");
      badgeRevealed.current = true;
      return undefined;
    }
    const frame = window.requestAnimationFrame(() => setEntered(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

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
        endTimer = undefined;
      }
      setBadgePhase("enter");
    };

    const detachGesture = (): void => {
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
      applySoundOn(video);
      void video.play()
        .then(() => {
          if (!disposed) {
            playbackLocked.current = true;
            setSoundOn(true);
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
      setSoundOn(false);
      window.addEventListener("pointerdown", onGesture, true);
      window.addEventListener("touchstart", onGesture, true);
      window.addEventListener("keydown", onGesture, true);
    };

    const start = (): void => {
      if (disposed || playbackLocked.current) {
        return;
      }
      // Sin loop: el nombre sale al terminar el splash
      video.loop = false;
      video.playsInline = true;
      applySoundOn(video);
      void video.play()
        .then(() => {
          if (!disposed) {
            playbackLocked.current = true;
            setSoundOn(true);
            detachGesture();
          }
        })
        .catch(() => {
          video.muted = true;
          video.defaultMuted = true;
          void video.play().catch(() => undefined);
          armGestureFallback();
        });
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

    video.addEventListener("loadeddata", start);
    video.addEventListener("canplay", start);
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
      video.removeEventListener("loadeddata", start);
      video.removeEventListener("canplay", start);
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("loadedmetadata", onMetadata);
    };
  }, []);

  const toggleSound = (): void => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    if (soundOn) {
      video.muted = true;
      setSoundOn(false);
      return;
    }

    applySoundOn(video);
    if (video.ended) {
      video.currentTime = video.duration;
    } else {
      void video.play().catch(() => undefined);
    }
    setSoundOn(true);
    playbackLocked.current = true;
  };

  return (
    <section
      id={hero.anchorId}
      className={[
        "msh-hero",
        "msh-hero--copy-fixed",
        "msh-hero--experience",
        entered ? "msh-hero--experience-entered" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-labelledby="msh-hero-title"
    >
      <div className="msh-hero__viewport">
        <div className="msh-hero__visual">
          <div className="msh-hero__sculpture-anchor">
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
            <button
              type="button"
              className="msh-hero__sound"
              onClick={toggleSound}
              aria-pressed={soundOn}
              aria-label={soundOn ? ui.heroSoundOff : ui.heroSoundOn}
            >
              <span className="msh-hero__sound-dot" aria-hidden="true" />
              <span className="msh-hero__sound-label">
                {soundOn ? ui.heroSoundOff : ui.heroSoundOn}
              </span>
            </button>
          </div>
        </div>

        <div className="msh-hero__content">
          <p className="msh-hero__brand">
            <span className="msh-hero__brand-mark" aria-hidden="true" />
            <span className="msh-hero__brand-text">{hero.badge}</span>
          </p>

          <h1 id="msh-hero-title" className="msh-hero__title">
            <span className="msh-hero__title-line">{ui.heroTitleLine1}</span>
            <span className="msh-hero__title-line">{ui.heroTitleLine2}</span>
            {ui.heroTitleBefore || ui.heroAccent || ui.heroTitleAfter ? (
              <span className="msh-hero__title-line msh-hero__title-line--accent">
                {ui.heroTitleBefore}
                <span className="msh-hero__title-accent msh-hero__title-accent--gradient">
                  {ui.heroAccent}
                </span>
                {ui.heroTitleAfter}
              </span>
            ) : null}
          </h1>

          <p className="msh-hero__subtitle">{ui.heroSubtitle}</p>

          <div className="msh-hero__actions">
            <MsSiteNavAnchor
              href={hero.cta.href}
              className="msh-btn msh-btn--cta msh-btn--cta-hero-primary"
            >
              {ui.hablemos}
              <span className="msh-btn__arrow" aria-hidden="true">
                →
              </span>
            </MsSiteNavAnchor>

            {MS_STUDIO_HOME_MOTANOS_PUBLIC_VISIBLE ? (
              <Link
                href={hero.secondaryCta.href}
                className="msh-btn msh-btn--cta msh-btn--cta-hero-secondary"
              >
                {hero.secondaryCta.label}
                <span className="msh-btn__arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            ) : (
              <MsSiteNavAnchor
                href={hero.secondaryCtaStudio.href}
                className="msh-btn msh-btn--cta msh-btn--cta-hero-secondary"
              >
                {ui.ctaKnowStudio}
                <span className="msh-btn__arrow" aria-hidden="true">
                  →
                </span>
              </MsSiteNavAnchor>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
