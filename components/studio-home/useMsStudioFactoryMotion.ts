"use client";

import { useEffect, type RefObject } from "react";

function buildJourneyPath(points: Array<{ x: number; y: number }>): string {
  if (points.length === 0) {
    return "";
  }
  return points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x.toFixed(1)} ${point.y.toFixed(1)}`)
    .join(" ");
}

/**
 * Activa fases progresivamente al entrar en viewport.
 * Dibuja la línea de recorrido entre tarjetas (móvil + desktop).
 * Con prefers-reduced-motion: marca todo activo de inmediato.
 */
export function useMsStudioFactoryMotion(rootRef: RefObject<HTMLElement | null>): void {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    const board = root.querySelector<HTMLElement>(".msh-factory__stageboard");
    const svg = root.querySelector<SVGSVGElement>("[data-factory-energy]");
    const track = root.querySelector<SVGPathElement>("[data-factory-path-track]");
    const beam = root.querySelector<SVGPathElement>("[data-factory-path-beam]");
    const pulse = root.querySelector<SVGPathElement>("[data-factory-path-pulse]");
    const motion = root.querySelector<SVGElement>("[data-factory-path-motion]");
    const grad = root.querySelector<SVGLinearGradientElement>("[data-factory-journey-grad]");
    const stages = [...root.querySelectorAll<HTMLElement>("[data-factory-stage]")];
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const setCurrent = (index: number) => {
      stages.forEach((stage, i) => {
        stage.classList.toggle("is-current", i === index);
      });
      root.style.setProperty("--factory-current", String(index));
    };

    const syncJourneyPath = (restartMotion = false) => {
      if (!board || !svg || !track || !beam || stages.length === 0) {
        return;
      }

      const boardRect = board.getBoundingClientRect();
      const width = Math.max(1, board.clientWidth);
      const height = Math.max(1, board.clientHeight);
      svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
      svg.setAttribute("width", String(width));
      svg.setAttribute("height", String(height));

      const isMobile = window.matchMedia("(max-width: 719px)").matches;
      const points = stages.map((stage) => {
        const rect = stage.getBoundingClientRect();
        const shell = stage.querySelector<HTMLElement>(".msh-factory__stage-shell");
        const shellRect = shell?.getBoundingClientRect() ?? rect;
        const indexEl = stage.querySelector<HTMLElement>(".msh-factory__stage-index");
        const indexRect = indexEl?.getBoundingClientRect();

        if (isMobile && indexRect) {
          return {
            x: indexRect.left + indexRect.width / 2 - boardRect.left,
            y: shellRect.top + shellRect.height / 2 - boardRect.top,
          };
        }

        return {
          x: shellRect.left + shellRect.width / 2 - boardRect.left,
          y: shellRect.top + shellRect.height / 2 - boardRect.top,
        };
      });

      const d = buildJourneyPath(points);
      const previous = track.getAttribute("d") ?? "";
      track.setAttribute("d", d);
      beam.setAttribute("d", d);
      pulse?.setAttribute("d", d);

      if (grad && points.length > 0) {
        const first = points[0]!;
        const last = points[points.length - 1]!;
        grad.setAttribute("x1", first.x.toFixed(1));
        grad.setAttribute("y1", first.y.toFixed(1));
        grad.setAttribute("x2", last.x.toFixed(1));
        grad.setAttribute("y2", last.y.toFixed(1));
      }

      if (
        restartMotion ||
        previous !== d
      ) {
        const motionEl = motion as SVGAnimationElement | null;
        if (motionEl && typeof motionEl.beginElement === "function") {
          try {
            motionEl.beginElement();
          } catch {
            /* ignore */
          }
        }
      }

      svg.classList.toggle("is-ready", d.length > 0);
    };

    const syncLine = () => {
      const activeCount = stages.filter((stage) => stage.classList.contains("is-active")).length;
      const ratio = stages.length === 0 ? 0 : activeCount / stages.length;
      root.style.setProperty("--factory-progress", String(ratio));
      if (activeCount > 0) {
        svg?.classList.add("is-lit");
      }
      if (activeCount === stages.length) {
        root.dataset.factoryMotion = "complete";
      }
    };

    const activateAll = () => {
      root.dataset.factoryMotion = "complete";
      stages.forEach((stage, index) => {
        stage.classList.add("is-active");
        stage.style.setProperty("--factory-stage-delay", "0ms");
        stage.setAttribute("data-factory-index", String(index));
      });
      setCurrent(Math.max(0, stages.length - 1));
      svg?.classList.add("is-lit");
      root.style.setProperty("--factory-progress", "1");
      syncJourneyPath();
    };

    if (reduceMotion || stages.length === 0) {
      activateAll();
      const onResize = () => syncJourneyPath();
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }

    root.dataset.factoryMotion = "ready";

    const activateStage = (stage: HTMLElement, index: number) => {
      if (!stage.classList.contains("is-active")) {
        stage.style.setProperty("--factory-stage-delay", `${Math.min(index, 4) * 70}ms`);
        stage.classList.add("is-active");
      }
      let highest = -1;
      stages.forEach((s, i) => {
        if (s.classList.contains("is-active")) {
          highest = i;
        }
      });
      if (highest >= 0) {
        setCurrent(highest);
      }
      syncLine();
    };

    const revealPast = () => {
      const limit = window.innerHeight * 0.78;
      stages.forEach((stage, index) => {
        if (stage.getBoundingClientRect().top < limit) {
          activateStage(stage, index);
        }
      });
      syncJourneyPath();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const toActivate = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => {
            const stage = entry.target as HTMLElement;
            return { stage, index: stages.indexOf(stage) };
          })
          .filter((item) => item.index >= 0)
          .sort((a, b) => a.index - b.index);

        for (const { stage, index } of toActivate) {
          activateStage(stage, index);
          observer.unobserve(stage);
        }
      },
      { root: null, rootMargin: "0px 0px -18% 0px", threshold: 0.4 },
    );

    revealPast();
    syncJourneyPath(true);
    requestAnimationFrame(() => {
      syncJourneyPath(true);
    });

    stages.forEach((stage) => {
      if (!stage.classList.contains("is-active")) {
        observer.observe(stage);
      }
    });

    const onScrollOrResize = () => revealPast();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    window.addEventListener("hashchange", revealPast);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      window.removeEventListener("hashchange", revealPast);
    };
  }, [rootRef]);
}
