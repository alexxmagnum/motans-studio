/** Selector idioma carta / site — clases public-menu-lang */
export const MOTANOS_LOCALE_LANGUAGE_SWITCHER_CSS = `
.public-menu-lang {
  position: relative;
  flex-shrink: 0;
}

.public-menu-lang__trigger {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  min-height: 2.5rem;
  padding: 0.26rem 0.56rem 0.26rem 0.46rem;
  border: 1px solid var(--public-menu-line, rgba(28, 24, 20, 0.12));
  border-radius: 0.5rem;
  background: var(--public-menu-surface, #fffdf9);
  color: var(--public-menu-ink, #1c1814);
  cursor: pointer;
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.65) inset;
  transition:
    border-color var(--motanos-interaction-duration) var(--motanos-interaction-ease),
    background var(--motanos-interaction-duration) var(--motanos-interaction-ease),
    box-shadow var(--motanos-interaction-duration) var(--motanos-interaction-ease),
    transform 120ms var(--motanos-interaction-ease);
}

.public-menu-lang__trigger:hover {
  border-color: rgba(45, 154, 244, 0.45);
  background: rgba(45, 154, 244, 0.06);
}

.public-menu-lang__trigger:focus-visible {
  outline: 2px solid var(--motanos-brand-focus, rgba(45, 154, 244, 0.5));
  outline-offset: 2px;
}

.public-menu-lang__trigger:active {
  transform: scale(0.97);
}

.public-menu-lang.is-open .public-menu-lang__trigger {
  border-color: rgba(45, 154, 244, 0.55);
  background: linear-gradient(
    135deg,
    rgba(45, 154, 244, 0.1) 0%,
    rgba(184, 230, 46, 0.08) 100%
  );
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.65) inset,
    0 6px 20px rgba(45, 154, 244, 0.12);
}

.public-menu-lang__flag,
.public-menu-lang__option-flag {
  flex-shrink: 0;
}

.public-menu-lang__flag-svg {
  display: block;
  overflow: hidden;
  border-radius: 0.2rem;
  box-shadow: 0 0 0 1px rgba(20, 18, 16, 0.12);
}

.public-menu-lang__flag.public-menu-lang__flag-svg {
  width: 1.55rem;
  height: 1.05rem;
}

.public-menu-lang__flag.public-menu-lang__flag-svg svg {
  display: block;
  width: 100%;
  height: 100%;
}

.public-menu-lang__code {
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  line-height: 1;
  color: var(--public-menu-ink, #1c1814);
}

.public-menu-lang.is-open .public-menu-lang__code {
  color: var(--motanos-brand-cyan, #2d9af4);
}

.public-menu-lang__chevron {
  width: 0.35rem;
  height: 0.35rem;
  border: solid currentColor;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg) translateY(-1px);
  opacity: 0.65;
  transition: transform var(--motanos-interaction-duration) var(--motanos-interaction-ease);
}

.public-menu-lang.is-open .public-menu-lang__chevron {
  transform: rotate(225deg) translateY(1px);
}

/* Cabecera negra — carta pública y QR mesa */
.motanos-os--guest-menu .motanos-os__topbar .public-menu-header__menu-btn,
.motanos-os--guest-menu .motanos-os__topbar .public-menu-lang__trigger,
.qr-table-header .public-menu-header__menu-btn,
.qr-table-header .public-menu-lang__trigger {
  border-color: rgba(255, 255, 255, 0.28);
  background: rgba(255, 255, 255, 0.06);
  color: #ffffff;
  box-shadow: none;
}

.motanos-os--guest-menu .motanos-os__topbar .public-menu-header__menu-btn:hover,
.motanos-os--guest-menu .motanos-os__topbar .public-menu-lang__trigger:hover,
.qr-table-header .public-menu-header__menu-btn:hover,
.qr-table-header .public-menu-lang__trigger:hover {
  border-color: rgba(255, 255, 255, 0.5);
  background: rgba(255, 255, 255, 0.12);
}

.motanos-os--guest-menu .motanos-os__topbar .public-menu-lang.is-open .public-menu-lang__trigger,
.qr-table-header .public-menu-lang.is-open .public-menu-lang__trigger {
  border-color: rgba(255, 255, 255, 0.45);
  background: rgba(255, 255, 255, 0.14);
  box-shadow: none;
}

.motanos-os--guest-menu .motanos-os__topbar .public-menu-lang__code,
.qr-table-header .public-menu-lang__code {
  color: #ffffff;
}

.motanos-os--guest-menu .motanos-os__topbar .public-menu-lang.is-open .public-menu-lang__code,
.qr-table-header .public-menu-lang.is-open .public-menu-lang__code {
  color: #ffffff;
}

.motanos-os--guest-menu .motanos-os__topbar .public-menu-lang__chevron,
.qr-table-header .public-menu-lang__chevron {
  color: #ffffff;
  opacity: 0.85;
}

.motanos-os--guest-menu .motanos-os__topbar .public-menu-lang__flag-svg,
.qr-table-header .public-menu-lang__flag-svg {
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.22);
}

.public-menu-lang__panel {
  position: absolute;
  top: calc(100% + 0.45rem);
  right: 0;
  z-index: 85;
  width: min(17.5rem, calc(100vw - 1.5rem));
  padding: 0.55rem;
  border: 1px solid var(--public-menu-line, rgba(28, 24, 20, 0.12));
  border-radius: 0.85rem;
  background: var(--public-menu-surface-elevated, #fffdf9);
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.7) inset,
    0 16px 40px rgba(20, 18, 16, 0.14);
  animation: public-menu-lang-panel-enter var(--motanos-interaction-duration)
    var(--motanos-interaction-ease);
}

@keyframes public-menu-lang-panel-enter {
  from {
    opacity: 0;
    transform: translateY(-6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.public-menu-lang__soon {
  margin: 0 0 0.55rem;
  padding: 0 0.15rem;
  font-size: 0.7rem;
  line-height: 1.45;
  color: var(--public-menu-muted, #6b6258);
}

.public-menu-lang__grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.35rem;
}

.public-menu-lang__option {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0;
  width: 100%;
  min-height: 2.65rem;
  padding: 0.55rem 0.65rem;
  border: 1px solid var(--public-menu-line, rgba(28, 24, 20, 0.1));
  border-radius: 0.6rem;
  background: var(--public-menu-surface, #fffdf9);
  text-align: center;
  cursor: pointer;
  box-shadow: none;
  transition:
    border-color var(--motanos-interaction-duration) var(--motanos-interaction-ease),
    background var(--motanos-interaction-duration) var(--motanos-interaction-ease),
    transform 120ms var(--motanos-interaction-ease),
    box-shadow var(--motanos-interaction-duration) var(--motanos-interaction-ease);
}

.public-menu-lang__option:hover {
  border-color: rgba(4, 162, 251, 0.4);
  background: rgba(4, 162, 251, 0.06);
}

.public-menu-lang__option:active {
  transform: scale(0.98);
}

.public-menu-lang__option.is-active {
  border-color: transparent;
  color: #fff;
  background: linear-gradient(90deg, #04a2fb 0%, #52ebe6 42%, #a6e10b 100%);
  box-shadow: 0 8px 22px rgba(4, 162, 251, 0.28);
}

.public-menu-lang__option.is-primary:not(.is-active) {
  border-color: rgba(4, 162, 251, 0.22);
}

.public-menu-lang__option-head {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  min-width: 0;
  width: 100%;
}

.public-menu-lang__option-flag.public-menu-lang__flag-svg {
  width: 1.2rem;
  height: 0.8rem;
  flex-shrink: 0;
  border-radius: 0.12rem;
  overflow: hidden;
  box-shadow: 0 0 0 1px rgba(28, 24, 20, 0.12);
}

.public-menu-lang__option-flag.public-menu-lang__flag-svg svg {
  display: block;
  width: 100%;
  height: 100%;
}

.public-menu-lang__option-name {
  font-size: 0.8125rem;
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: 0.01em;
  color: var(--public-menu-ink, #1c1814);
  text-align: center;
}

.public-menu-lang__option.is-active .public-menu-lang__option-name {
  color: #fff;
  opacity: 1;
}


/* Site comercial — header oscuro (mismo tratamiento que QR/carta) */
.ms-header .public-menu-lang__trigger {
  border-color: rgba(255, 255, 255, 0.28);
  background: rgba(255, 255, 255, 0.06);
  color: #ffffff;
  box-shadow: none;
}

.ms-header .public-menu-lang__trigger:hover {
  border-color: rgba(255, 255, 255, 0.5);
  background: rgba(255, 255, 255, 0.12);
}

.ms-header .public-menu-lang.is-open .public-menu-lang__trigger {
  border-color: rgba(255, 255, 255, 0.45);
  background: rgba(255, 255, 255, 0.14);
  box-shadow: none;
}

.ms-header .public-menu-lang__code,
.ms-header .public-menu-lang.is-open .public-menu-lang__code {
  color: var(--motanos-brand-cyan, #2d9af4);
}

.ms-header .public-menu-lang__chevron {
  color: #ffffff;
  opacity: 0.85;
}

.ms-header .public-menu-lang__flag-svg {
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.22);
}

/* Panel idioma — Motans Studio (header oscuro) */
.ms-header .public-menu-lang__panel,
.ms-site--dark-premium .public-menu-lang__panel {
  border-color: rgba(255, 255, 255, 0.1);
  background: #0c0c0c;
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.04) inset,
    0 18px 48px rgba(0, 0, 0, 0.55);
}

.ms-header .public-menu-lang__option,
.ms-site--dark-premium .public-menu-lang__option {
  border-color: rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.04);
}

.ms-header .public-menu-lang__option:hover,
.ms-site--dark-premium .public-menu-lang__option:hover {
  border-color: rgba(4, 162, 251, 0.45);
  background: rgba(4, 162, 251, 0.1);
}

.ms-header .public-menu-lang__option-name,
.ms-site--dark-premium .public-menu-lang__option-name {
  color: rgba(255, 255, 255, 0.9);
}

.ms-header .public-menu-lang__option-flag.public-menu-lang__flag-svg,
.ms-site--dark-premium .public-menu-lang__option-flag.public-menu-lang__flag-svg {
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.18);
}

.ms-header .public-menu-lang__soon,
.ms-site--dark-premium .public-menu-lang__soon {
  color: rgba(255, 255, 255, 0.45);
}
`;

export const MOTANOS_LOCALE_LANGUAGE_INTERACTION_ROOT_CSS = `
:root {
  --motanos-interaction-duration: 220ms;
  --motanos-interaction-ease: cubic-bezier(0.22, 1, 0.36, 1);
}

@media (prefers-reduced-motion: reduce) {
  :root {
    --motanos-interaction-duration: 0ms;
  }
  .public-menu-lang__panel {
    animation: none;
  }
}
`;

export const MOTANOS_LOCALE_LANGUAGE_STYLES_CSS =
  MOTANOS_LOCALE_LANGUAGE_INTERACTION_ROOT_CSS + "\n\n" + MOTANOS_LOCALE_LANGUAGE_SWITCHER_CSS;
