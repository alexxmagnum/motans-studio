"use client";

import { useEffect, useState, type ReactElement } from "react";
import Image from "next/image";
import type { MS_HOSTELERIA_LANDING } from "../../lib/msHosteleriaLandingFoundation.js";
import {
  createMovementController,
  type ChoreographyEventId,
  type MovementSnapshot,
} from "../../lib/motanOsHosteleriaMovementEngine.js";

type HeroCopy = (typeof MS_HOSTELERIA_LANDING)["hero"];

function zoneClassForEvent(event: ChoreographyEventId | null): string {
  if (!event) return "";
  if (event.startsWith("A")) return `msh-portada-hero__zones--event-${event}`;
  if (event === "B01") return "msh-portada-hero__zones--event-B01";
  if (event === "B02" || event === "B03") return `msh-portada-hero__zones--event-${event}`;
  if (event === "C01" || event === "C02") return `msh-portada-hero__zones--event-${event}`;
  if (event.startsWith("D")) return `msh-portada-hero__zones--event-${event}`;
  return "";
}

export function MsHosteleriaPortadaHero({
  copy,
}: {
  readonly copy: HeroCopy;
}): ReactElement {
  const [snapshot, setSnapshot] = useState<MovementSnapshot | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reducedMotion = media.matches;

    let controller = createMovementController(setSnapshot, { reducedMotion });

    const onChange = (): void => {
      reducedMotion = media.matches;
      controller.dispose();
      controller = createMovementController(setSnapshot, { reducedMotion });
    };

    media.addEventListener("change", onChange);

    return () => {
      media.removeEventListener("change", onChange);
      controller.dispose();
    };
  }, []);

  const phase = snapshot?.phase ?? "silence";
  const activeEvent = snapshot?.activeEvent ?? null;
  const scene = snapshot?.state;

  return (
    <section
      className={[
        "msh-portada-hero",
        `msh-portada-hero--phase-${phase}`,
        zoneClassForEvent(activeEvent),
        scene ? `msh-portada-hero--mesa-a-${scene.mesaA}` : "",
        scene ? `msh-portada-hero--mesa-b-${scene.mesaB}` : "",
        scene ? `msh-portada-hero--mesa-c-${scene.mesaC}` : "",
        scene ? `msh-portada-hero--entrada-${scene.entrada}` : "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-label="MotanOS Hostelería"
    >
      <div className="msh-portada-hero__media">
        <Image
          src={copy.keyVisualSrc}
          alt=""
          fill
          priority
          sizes="100vw"
          className="msh-portada-hero__image"
          decoding="async"
          draggable={false}
        />
      </div>

      <div className="msh-portada-hero__state-layers" aria-hidden="true">
        {/* TODO(IMPLEMENTATION_REQUIRED): capas fotográficas por zona (MOTANOS_MOVEMENT_CHOREOGRAPHY_v1.0).
            Solo existe hosteleria-frame-master-v1.webp; las transiciones de estado requieren assets
            independientes en public/hero/layers/ producidos según FRAME_MASTER_PRODUCTION_v1. */}
        <div className="msh-portada-hero__zone msh-portada-hero__zone--mesa-a" />
        <div className="msh-portada-hero__zone msh-portada-hero__zone--mesa-b" />
        <div className="msh-portada-hero__zone msh-portada-hero__zone--mesa-c" />
        <div className="msh-portada-hero__zone msh-portada-hero__zone--barra" />
        <div className="msh-portada-hero__zone msh-portada-hero__zone--pass" />
        <div className="msh-portada-hero__zone msh-portada-hero__zone--entrada" />
        <div className="msh-portada-hero__zone msh-portada-hero__zone--sala-cross" />
      </div>

      <div className="msh-portada-hero__overlay" aria-hidden="true" />
      <div className="msh-portada-hero__light" aria-hidden="true" />

      <div className="msh-portada-hero__stamp" aria-hidden="true">
        <Image
          src={copy.stampSrc}
          alt=""
          width={copy.stampWidth}
          height={copy.stampHeight}
          className="msh-portada-hero__stamp-img"
          decoding="async"
          draggable={false}
        />
      </div>

      <div className="msh-portada-hero__copy">
        <h1 className="msh-portada-hero__headline">{copy.headline}</h1>
        <p className="msh-portada-hero__line">{copy.line}</p>
        <a href={copy.ctaHref} className="msh-landing__btn msh-portada-hero__cta">
          {copy.ctaLabel}
        </a>
      </div>
    </section>
  );
}
