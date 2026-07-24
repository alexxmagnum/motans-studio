import type React from "react";

export interface MsFeatureCardItem {
  readonly id: string;
  readonly title: string;
  readonly line: string;
}

export interface MsFeatureCardsProps {
  readonly items: readonly MsFeatureCardItem[];
  readonly variant?: "studio" | "product";
  readonly columns?: 2 | 3;
}

export function MsFeatureCards({
  items,
  variant = "studio",
  columns = 2,
}: MsFeatureCardsProps): React.ReactElement {
  return (
    <ul
      className={`ms-feature-card-grid ms-feature-card-grid--cols-${columns} ms-feature-card-grid--${variant}`}
    >
      {items.map((item) => (
        <li key={item.id} className="ms-feature-card">
          <span className="ms-feature-card__mark" aria-hidden="true" />
          <h3 className="ms-feature-card__title">{item.title}</h3>
          <p className="ms-feature-card__line">{item.line}</p>
        </li>
      ))}
    </ul>
  );
}
