import type { ReactElement } from "react";

export type MsStudioTitleAccentParts = {
  readonly before: string;
  readonly accent: string;
  readonly after: string;
};

/** Separa la última palabra (acento Motans) y la puntuación final. */
export function splitMsStudioTitleAccent(title: string): MsStudioTitleAccentParts {
  const trimmed = title.trim();
  const match = trimmed.match(/^(.*?)(\S+?)([.!?:…¿¡]*)\s*$/u);
  if (!match?.[2]) {
    return { before: "", accent: trimmed, after: "" };
  }
  return {
    before: match[1] ?? "",
    accent: match[2],
    after: match[3] ?? "",
  };
}

type MsStudioTitleWithAccentProps = {
  readonly text: string;
  readonly accentClassName?: string;
};

/** Última palabra del título con degradado Motans (como “trabajo” / “evoluciona”). */
export function MsStudioTitleWithAccent({
  text,
  accentClassName = "msh-title-accent",
}: MsStudioTitleWithAccentProps): ReactElement {
  const { before, accent, after } = splitMsStudioTitleAccent(text);
  return (
    <>
      {before}
      <span className={accentClassName}>{accent}</span>
      {after}
    </>
  );
}
