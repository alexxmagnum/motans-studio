import type React from "react";
import Link from "next/link";
import { MotansStudioBrandMark } from "./MotansStudioBrandMark.js";
import { MS_SITE_MOTANOS_MOMENT } from "../lib/msSite1703Foundation.js";
import { MS_SITE_ROUTES } from "../lib/msSite1701Foundation.js";

export function MsMotanosMoment(): React.ReactElement {
  return (
    <section className="ms-moment" aria-labelledby="ms-moment-lead">
      <div className="ms-moment__inner">
        <MotansStudioBrandMark variant="lockup-product" height={72} />
        <p id="ms-moment-lead" className="ms-moment__lead ms-moment__statement">
          {MS_SITE_MOTANOS_MOMENT.line}
        </p>
        <p className="ms-moment__vertical">{MS_SITE_MOTANOS_MOMENT.vertical}</p>
        <Link href={MS_SITE_ROUTES.motanos} className="ms-btn ms-btn--accent">
          {MS_SITE_MOTANOS_MOMENT.cta}
        </Link>
      </div>
    </section>
  );
}
