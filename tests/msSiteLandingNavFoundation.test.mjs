import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it } from "node:test";

const __dirname = dirname(fileURLToPath(import.meta.url));
const libDir = join(__dirname, "..", "lib");

describe("msSiteLandingNavFoundation", () => {
  it("defines landing sections for scroll spy", () => {
    const foundation = readFileSync(join(libDir, "msSiteLandingNavFoundation.ts"), "utf-8");
    const architecture = readFileSync(
      join(libDir, "msStudioLandingArchitectureFoundation.ts"),
      "utf-8",
    );
    assert.ok(foundation.includes("MS_SITE_LANDING_NAV_SECTIONS"));
    assert.ok(foundation.includes("MS_STUDIO_LANDING_MOUNTED_SECTION_IDS"));
    assert.ok(architecture.includes('"inicio"'));
    assert.ok(architecture.includes('navHref: "/"'));
  });

  it("shell wires landing scroll spy on home", () => {
    const shell = readFileSync(join(__dirname, "..", "components", "MotansStudioSiteShell.tsx"), "utf-8");
    const hero = readFileSync(join(__dirname, "..", "components", "studio-home", "MsStudioHomeHero.tsx"), "utf-8");
    const nav = readFileSync(join(libDir, "msSite1701Foundation.ts"), "utf-8");
    assert.ok(shell.includes("useMsSiteLandingNavSpy"));
    assert.ok(shell.includes("MsSiteLegacyHashRedirect"));
    assert.ok(hero.includes("msh-hero__hero-video"));
    assert.ok(shell.includes('pathname === "/"'));
    assert.ok(nav.includes("MS_SITE_PUBLIC_NAV_ITEMS"));
    assert.ok(nav.includes("/#servicios"));
    assert.ok(nav.includes("/#contacto"));
    assert.ok(!nav.includes('href: "/#faq"'));
  });

  it("scroll spy defers hash until after hydration", () => {
    const spy = readFileSync(
      join(__dirname, "..", "components", "useMsSiteLandingNavSpy.ts"),
      "utf-8",
    );
    assert.ok(spy.includes('useState<string>("/")'));
    assert.ok(spy.includes("isHydrated"));
    assert.ok(!spy.includes("useState<string>(readInitialLandingNavHref"));
  });
});
