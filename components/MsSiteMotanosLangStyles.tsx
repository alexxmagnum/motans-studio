import type React from "react";
import { MOTANOS_LOCALE_LANGUAGE_STYLES_CSS } from "@motanos/design-system/locale";

/** Estilos del selector de idioma (mismo componente/clases que la carta). */
export function MsSiteMotanosLangStyles(): React.ReactElement {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: MOTANOS_LOCALE_LANGUAGE_STYLES_CSS,
      }}
    />
  );
}
