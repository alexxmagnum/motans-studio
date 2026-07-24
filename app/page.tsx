import type React from "react";
import type { Metadata } from "next";
import { MsSiteStructuredData } from "../components/MsSiteStructuredData.js";
import { MsStudioHomeHero } from "../components/studio-home/MsStudioHomeHero.js";
import { MsStudioCapabilities } from "../components/studio-services/MsStudioCapabilities.js";
import { MsStudioHomeProcess } from "../components/studio-home/MsStudioHomeProcess.js";
import { MsStudioHomeFinalCta } from "../components/studio-home/MsStudioHomeFinalCta.js";
import { createMsSitePageMetadata } from "../lib/msSite1703SeoFoundation.js";
import { MS_SITE_PUBLIC_MOTANOS_VISIBLE } from "../lib/msSite1701Foundation.js";

export const metadata: Metadata = createMsSitePageMetadata("home");

/** Arranque con sonido lo antes posible (p. ej. si el usuario llegó con un clic desde otro sitio). */
const MS_HOME_HERO_VIDEO_SOUND_BOOT = `
(function () {
  function boot() {
    var video = document.querySelector(".msh-hero__hero-video");
    if (!video) return;
    video.muted = false;
    video.defaultMuted = false;
    video.volume = 1;
    var playAttempt = video.play();
    if (playAttempt && playAttempt.catch) playAttempt.catch(function () {});
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
`;

export default function MotansStudioHomePage(): React.ReactElement {
  return (
    <div className="ms-page ms-page--landing ms-page--studio-home">
      <script dangerouslySetInnerHTML={{ __html: MS_HOME_HERO_VIDEO_SOUND_BOOT }} />
      <MsSiteStructuredData />
      <MsStudioHomeHero />
      {/* Continuity + MotanosLab conservados; no montados mientras MotanOS está oculto en público. */}
      <MsStudioCapabilities
        hideIntro
        excludeBlockIds={MS_SITE_PUBLIC_MOTANOS_VISIBLE ? [] : ["motanos"]}
        sectionId="capacidades"
      />
      <MsStudioHomeProcess />
      <MsStudioHomeFinalCta />
    </div>
  );
}
