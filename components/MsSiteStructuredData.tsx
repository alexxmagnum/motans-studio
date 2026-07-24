import type React from "react";
import { MS_SITE_HOME_JSON_LD } from "../lib/msSite1703SeoFoundation.js";

export function MsSiteStructuredData(): React.ReactElement {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(MS_SITE_HOME_JSON_LD) }}
    />
  );
}
