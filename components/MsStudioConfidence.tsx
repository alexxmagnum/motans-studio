import type React from "react";
import Link from "next/link";
import { MS_SITE_CONFIDENCE } from "../lib/msSite1703Foundation.js";

export interface MsStudioConfidenceProps {
  readonly line?: string;
  readonly cta?: string;
}

export function MsStudioConfidence({
  line = MS_SITE_CONFIDENCE.line,
  cta = MS_SITE_CONFIDENCE.cta,
}: MsStudioConfidenceProps): React.ReactElement {
  return (
    <section className="ms-chapter ms-confidence" aria-label="Confianza">
      <div className="ms-confidence-card">
        <p className="ms-confidence-card__line">{line}</p>
        <Link href="#contacto" className="ms-btn ms-btn--primary">
          {cta}
        </Link>
      </div>
    </section>
  );
}
