"use client";

import { useEffect, type RefObject } from "react";

/**
 * Activa fases progresivamente al entrar en viewport.
 * Marca is-current en la última fase revelada (recorrido Idea → Evolución).
 * Con prefers-reduced-motion: marca todo activo de inmediato.
 */
export function useMsStudioFactoryMotion(rootRef: RefObject<HTMLElement | null>): void {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    const stages = [...root.querySelectorAll<HTMLElement>("[data-factory-stage]")];
    const line = root.querySelector<HTMLElement>("[data-factory-energy]");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const setCurrent = (index: number) => {
      stages.forEach((stage, i) => {
        stage.classList.toggle("is-current", i === index);
      });
      root.style.setProperty("--factory-current", String(index));
    };

    const activateAll = () => {
      root.dataset.factoryMotion = "complete";
      stages.forEach((stage, index) => {
        stage.classList.add("is-active");
        stage.style.setProperty("--factory-stage-delay", "0ms");
        stage.setAttribute("data-factory-index", String(index));
      });
      setCurrent(Math.max(0, stages.length - 1));
      line?.classList.add("is-lit");
      root.style.setProperty("--factory-progress", "1");
    };

    if (reduceMotion || stages.length === 0) {
      activateAll();
      return;
    }

    root.dataset.factoryMotion = "ready";

    const syncLine = () => {
      const activeCount = stages.filter((stage) => stage.classList.contains("is-active")).length;
      const ratio = activeCount / stages.length;
      root.style.setProperty("--factory-progress", String(ratio));
      if (activeCount > 0) {
        line?.classList.add("is-lit");
      }
      if (activeCount === stages.length) {
        root.dataset.factoryMotion = "complete";
      }
    };

    const activateStage = (stage: HTMLElement, index: number) => {
      if (!stage.classList.contains("is-active")) {
        stage.style.setProperty("--factory-stage-delay", `${Math.min(index, 4) * 70}ms`);
        stage.classList.add("is-active");
      }
      // Current = highest active index (scroll journey forward)
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
    };

    const observer = new IntersectionObserver(
      (entries) => {
        // Activate in index order so the beam “walks” card → card
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
