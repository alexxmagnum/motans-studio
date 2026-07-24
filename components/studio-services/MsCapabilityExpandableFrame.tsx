"use client";

import { useCallback, useEffect, useRef, type MouseEvent, type ReactElement } from "react";
import type { MsStudioCapabilityScreen } from "../../lib/msStudioServicesFoundation.js";
import { MsCapabilityProductFrame } from "./MsCapabilityProductFrame.js";

export interface MsCapabilityExpandableFrameProps {
  readonly screen: MsStudioCapabilityScreen;
  readonly priority?: boolean;
}

/** Marco clicable — ampliar al clic; volver al cerrar (imagen, fondo, × o Escape). */
export function MsCapabilityExpandableFrame({
  screen,
  priority = false,
}: MsCapabilityExpandableFrameProps): ReactElement {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openLightbox = useCallback(() => {
    dialogRef.current?.showModal();
  }, []);

  const closeLightbox = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  const onPanelClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      const target = event.target;
      if (
        target === event.currentTarget ||
        (target instanceof HTMLElement && target.classList.contains("mscap-lightbox__img"))
      ) {
        closeLightbox();
      }
    },
    [closeLightbox],
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }

    const onCancel = (): void => {
      dialog.close();
    };

    dialog.addEventListener("cancel", onCancel);
    return () => {
      dialog.removeEventListener("cancel", onCancel);
    };
  }, []);

  return (
    <>
      <div className="mscap-frame-expand">
        <MsCapabilityProductFrame screen={screen} priority={priority} />
        <button
          type="button"
          className="mscap-frame-expand__hit"
          onClick={openLightbox}
          aria-label={`Ampliar imagen: ${screen.alt}`}
        >
          <span className="mscap-frame-expand__hint" aria-hidden="true">
            Ampliar
          </span>
        </button>
      </div>

      <dialog
        ref={dialogRef}
        className="mscap-lightbox"
        aria-label={screen.alt}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            closeLightbox();
          }
        }}
      >
        <div className="mscap-lightbox__panel" onClick={onPanelClick}>
          <button
            type="button"
            className="mscap-lightbox__close"
            onClick={(event) => {
              event.stopPropagation();
              closeLightbox();
            }}
            aria-label="Cerrar imagen ampliada"
          >
            ×
          </button>
          <img
            src={screen.src}
            alt={screen.alt}
            width={screen.width}
            height={screen.height}
            className="mscap-lightbox__img"
            decoding="async"
            draggable={false}
            onClick={closeLightbox}
          />
          <span className="mscap-lightbox__hint" aria-hidden="true">
            Cerrar
          </span>
        </div>
      </dialog>
    </>
  );
}
