/**
 * In-memory rate limit for the contact Route Handler (per serverless instance).
 */

import {
  CONTACT_RATE_LIMIT_MAX,
  CONTACT_RATE_LIMIT_WINDOW_MS,
} from "./contactFormLimits.js";

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

export function getClientIpFromRequest(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first.slice(0, 128);
  }
  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp.slice(0, 128);
  return "unknown";
}

export function isContactRateLimited(ip: string): boolean {
  const now = Date.now();
  const key = ip || "unknown";
  const current = buckets.get(key);

  if (!current || now > current.resetAt) {
    buckets.set(key, {
      count: 1,
      resetAt: now + CONTACT_RATE_LIMIT_WINDOW_MS,
    });
    return false;
  }

  if (current.count >= CONTACT_RATE_LIMIT_MAX) {
    return true;
  }

  current.count += 1;
  return false;
}

export async function verifyTurnstileToken(input: {
  readonly token: string;
  readonly ip: string;
}): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim();

  // Widget not configured — do not block legitimate leads.
  if (!secret || !siteKey) {
    return true;
  }

  if (!input.token) {
    return false;
  }

  try {
    const body = new URLSearchParams();
    body.set("secret", secret);
    body.set("response", input.token);
    if (input.ip && input.ip !== "unknown") {
      body.set("remoteip", input.ip);
    }

    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
        signal: AbortSignal.timeout(8_000),
      },
    );

    if (!response.ok) {
      return false;
    }

    const payload = (await response.json()) as { success?: unknown };
    return payload.success === true;
  } catch {
    return false;
  }
}
