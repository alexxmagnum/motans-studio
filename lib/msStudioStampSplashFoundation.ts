/** Splash inline del stamp MotanOS — adaptado de ClientAuthStampFlash (motanos-client). */

export const MS_STUDIO_STAMP_WORDMARK_HEIGHT_RATIO = 0.625;

export const MS_STUDIO_STAMP_BYLINE_REVEAL_STOPS = [
  5, 10, 14, 22, 29, 36, 43, 50, 57, 61, 69, 76, 83, 90, 96, 100,
] as const;

export const MS_STUDIO_STAMP_BYLINE_CHAR_COUNT = MS_STUDIO_STAMP_BYLINE_REVEAL_STOPS.length;

export const MS_STUDIO_STAMP_TYPE_MS = 78;
export const MS_STUDIO_STAMP_MOTION_MS = 1200;

/** Ratio visible mínimo para disparar el splash al entrar en pantalla. */
export const MS_STUDIO_STAMP_PLAY_RATIO = 0.28;

/** Por debajo de este ratio (o fuera de viewport) se recarga a pending. */
export const MS_STUDIO_STAMP_RESET_RATIO = 0.06;

export function msStudioStampBylineRevealPercent(revealChars: number): string {
  if (revealChars <= 0) {
    return "0%";
  }
  const index = Math.min(revealChars, MS_STUDIO_STAMP_BYLINE_CHAR_COUNT) - 1;
  return `${MS_STUDIO_STAMP_BYLINE_REVEAL_STOPS[index]}%`;
}
