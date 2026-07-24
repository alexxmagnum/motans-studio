"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type AnimationEvent,
  type CSSProperties,
  type ReactElement,
} from "react";
import {
  MS_STUDIO_STAMP_BYLINE_CHAR_COUNT,
  MS_STUDIO_STAMP_MOTION_MS,
  MS_STUDIO_STAMP_PLAY_RATIO,
  MS_STUDIO_STAMP_RESET_RATIO,
  MS_STUDIO_STAMP_TYPE_MS,
  MS_STUDIO_STAMP_WORDMARK_HEIGHT_RATIO,
  msStudioStampBylineRevealPercent,
} from "../../lib/msStudioStampSplashFoundation.js";

type StampPhase = "pending" | "motion" | "typing" | "done";

export interface MsCapMotanosStampInteractiveProps {
  readonly stampSrc: string;
  readonly label: string;
}

/** MotanOS emerge al entrar en pantalla; se recarga al salir para volver a estar disponible. */
export function MsCapMotanosStampInteractive({
  stampSrc,
  label,
}: MsCapMotanosStampInteractiveProps): ReactElement {
  const rootRef = useRef<HTMLButtonElement>(null);
  const timersRef = useRef<number[]>([]);
  const reducedMotionRef = useRef(false);
  const typingStartedRef = useRef(false);
  const phaseRef = useRef<StampPhase>("pending");
  const isVisibleEnoughRef = useRef(false);
  const [phase, setPhase] = useState<StampPhase>("pending");
  const [motionDone, setMotionDone] = useState(false);
  const [revealChars, setRevealChars] = useState(0);
  const [pulse, setPulse] = useState(false);

  const clearTimers = useCallback(() => {
    for (const id of timersRef.current) {
      window.clearTimeout(id);
    }
    timersRef.current = [];
  }, []);

  const schedule = useCallback((fn: () => void, ms: number) => {
    timersRef.current.push(window.setTimeout(fn, ms));
  }, []);

  const finishSettled = useCallback(() => {
    setMotionDone(true);
    setPhase("done");
    setRevealChars(MS_STUDIO_STAMP_BYLINE_CHAR_COUNT);
  }, []);

  const resetToPending = useCallback(() => {
    clearTimers();
    typingStartedRef.current = false;
    setMotionDone(false);
    setRevealChars(0);
    setPulse(false);
    setPhase("pending");
  }, [clearTimers]);

  const startTyping = useCallback(() => {
    if (typingStartedRef.current) {
      return;
    }
    typingStartedRef.current = true;
    setPhase("typing");
  }, []);

  const runSplash = useCallback(() => {
    clearTimers();
    typingStartedRef.current = false;
    setMotionDone(false);
    setRevealChars(0);
    setPulse(true);
    schedule(() => setPulse(false), 680);

    if (reducedMotionRef.current) {
      finishSettled();
      return;
    }

    setPhase("motion");
  }, [clearTimers, finishSettled, schedule]);

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotionRef.current) {
      finishSettled();
    }
  }, [finishSettled]);

  useEffect(() => {
    const node = rootRef.current;
    if (!node || reducedMotionRef.current) {
      return;
    }

    const handleVisibility = (entry: IntersectionObserverEntry) => {
      const ratio = entry.intersectionRatio;
      const leftViewport = !entry.isIntersecting || ratio <= MS_STUDIO_STAMP_RESET_RATIO;
      const readyToPlay = entry.isIntersecting && ratio >= MS_STUDIO_STAMP_PLAY_RATIO;

      if (leftViewport) {
        isVisibleEnoughRef.current = false;
        if (phaseRef.current !== "pending") {
          resetToPending();
        }
        return;
      }

      if (readyToPlay && phaseRef.current === "pending" && !isVisibleEnoughRef.current) {
        isVisibleEnoughRef.current = true;
        runSplash();
        return;
      }

      if (readyToPlay) {
        isVisibleEnoughRef.current = true;
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) {
          handleVisibility(entry);
        }
      },
      {
        threshold: [0, MS_STUDIO_STAMP_RESET_RATIO, MS_STUDIO_STAMP_PLAY_RATIO, 0.5, 0.75],
        rootMargin: "0px",
      },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [runSplash, resetToPending]);

  useEffect(() => {
    if (phase !== "motion" || motionDone) {
      return;
    }

    schedule(() => setMotionDone(true), MS_STUDIO_STAMP_MOTION_MS + 40);
    return clearTimers;
  }, [phase, motionDone, schedule, clearTimers]);

  useEffect(() => {
    if (!motionDone || phase !== "motion") {
      return;
    }
    startTyping();
  }, [motionDone, phase, startTyping]);

  useEffect(() => {
    if (phase !== "typing") {
      return;
    }

    let index = 0;
    const revealNext = () => {
      index += 1;
      setRevealChars(index);
      if (index < MS_STUDIO_STAMP_BYLINE_CHAR_COUNT) {
        schedule(revealNext, MS_STUDIO_STAMP_TYPE_MS);
        return;
      }
      finishSettled();
    };

    schedule(revealNext, MS_STUDIO_STAMP_TYPE_MS);
    return clearTimers;
  }, [phase, schedule, clearTimers, finishSettled]);

  useEffect(() => () => clearTimers(), [clearTimers]);

  const onMotionEnd = useCallback((event: AnimationEvent<HTMLSpanElement>) => {
    if (event.animationName !== "mscap-stamp-wordmark-emerge") {
      return;
    }
    setMotionDone(true);
  }, []);

  const bylineReveal = msStudioStampBylineRevealPercent(revealChars);
  const motionActive = phase === "motion" && !motionDone;
  const settled = motionDone && phase !== "pending";
  const bylineActive = motionDone && (phase === "typing" || phase === "done");

  return (
    <button
      ref={rootRef}
      type="button"
      className={[
        "mscap-stamp-splash",
        `mscap-stamp-splash--${phase}`,
        pulse ? "mscap-stamp-splash--pulse" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={runSplash}
      aria-label={label}
    >
      <span className="mscap-stamp-splash__stage">
        <span className="mscap-stamp-splash__track">
          <span
            className={[
              "mscap-stamp-splash__wordmark",
              motionActive ? "mscap-stamp-splash__wordmark--zoom" : "",
              settled ? "mscap-stamp-splash__wordmark--settled" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            onAnimationEnd={motionActive ? onMotionEnd : undefined}
          >
            <img
              src={stampSrc}
              alt=""
              aria-hidden="true"
              className="mscap-stamp-splash__stamp-art"
              width={1774}
              height={887}
              decoding="async"
              draggable={false}
            />
          </span>

          <span
            className={[
              "mscap-stamp-splash__crop mscap-stamp-splash__crop--byline",
              bylineActive ? "mscap-stamp-splash__crop--active" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            aria-hidden={!bylineActive}
            style={
              {
                "--byline-reveal": bylineActive ? bylineReveal : "0%",
                "--stamp-wordmark-ratio": MS_STUDIO_STAMP_WORDMARK_HEIGHT_RATIO,
              } as CSSProperties
            }
          >
            <img
              src={stampSrc}
              alt=""
              aria-hidden="true"
              className="mscap-stamp-splash__stamp-art"
              width={1774}
              height={887}
              decoding="async"
              draggable={false}
            />
          </span>
        </span>
      </span>
    </button>
  );
}
