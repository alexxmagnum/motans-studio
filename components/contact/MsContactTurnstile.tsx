"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type ReactElement,
} from "react";

type TurnstileRenderOptions = {
  readonly sitekey: string;
  readonly callback: (token: string) => void;
  readonly "error-callback"?: () => void;
  readonly "expired-callback"?: () => void;
  readonly theme?: "dark" | "light" | "auto";
  readonly size?: "normal" | "compact" | "flexible";
};

type TurnstileApi = {
  render: (
    container: HTMLElement,
    options: TurnstileRenderOptions,
  ) => string;
  reset: (widgetId?: string) => void;
  remove: (widgetId?: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

type MsContactTurnstileProps = {
  readonly onToken: (token: string) => void;
  readonly onExpire: () => void;
  readonly resetSignal: number;
};

const SCRIPT_SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

let scriptPromise: Promise<void> | null = null;

function loadTurnstileScript(): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.resolve();
  }
  if (window.turnstile) {
    return Promise.resolve();
  }
  if (scriptPromise) {
    return scriptPromise;
  }
  scriptPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${SCRIPT_SRC}"]`,
    );
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () =>
        reject(new Error("turnstile_script")),
      );
      return;
    }
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("turnstile_script"));
    document.head.appendChild(script);
  });
  return scriptPromise;
}

export function MsContactTurnstile({
  onToken,
  onExpire,
  resetSignal,
}: MsContactTurnstileProps): ReactElement | null {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() ?? "";
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [failed, setFailed] = useState(false);
  const labelId = useId();

  useEffect(() => {
    if (!siteKey || !containerRef.current) {
      return;
    }

    let cancelled = false;

    void loadTurnstileScript()
      .then(() => {
        if (cancelled || !containerRef.current || !window.turnstile) {
          return;
        }
        if (widgetIdRef.current) {
          window.turnstile.remove(widgetIdRef.current);
          widgetIdRef.current = null;
        }
        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          theme: "dark",
          size: "flexible",
          callback: (token) => onToken(token),
          "expired-callback": () => onExpire(),
          "error-callback": () => {
            setFailed(true);
            onExpire();
          },
        });
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });

    return () => {
      cancelled = true;
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [onExpire, onToken, siteKey]);

  useEffect(() => {
    if (!siteKey || !widgetIdRef.current || !window.turnstile) {
      return;
    }
    window.turnstile.reset(widgetIdRef.current);
    onExpire();
  }, [onExpire, resetSignal, siteKey]);

  if (!siteKey) {
    return null;
  }

  return (
    <div className="ms-turnstile">
      <p id={labelId} className="ms-sr-only">
        Verificación de seguridad
      </p>
      <div
        ref={containerRef}
        className="ms-turnstile__widget"
        aria-labelledby={labelId}
      />
      {failed ? (
        <p className="ms-field__error" role="alert">
          No se pudo cargar la verificación. Recarga la página.
        </p>
      ) : null}
    </div>
  );
}

export function isTurnstileConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim());
}
