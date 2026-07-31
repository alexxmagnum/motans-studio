"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactElement,
} from "react";

export type MsContactSelectOption = {
  readonly value: string;
  readonly label: string;
};

type MsContactSectorSelectProps = {
  readonly id: string;
  readonly label: string;
  readonly value: string;
  readonly options: readonly MsContactSelectOption[];
  readonly disabled?: boolean;
  readonly onChange: (value: string) => void;
};

export function MsContactSectorSelect({
  id,
  label,
  value,
  options,
  disabled = false,
  onChange,
}: MsContactSectorSelectProps): ReactElement {
  const listboxId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const selected =
    options.find((opt) => opt.value === value) ?? options[0] ?? {
      value: "",
      label: "",
    };

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        close();
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [close, open]);

  useEffect(() => {
    if (!open) return;
    const index = Math.max(
      0,
      options.findIndex((opt) => opt.value === value),
    );
    setActiveIndex(index);
  }, [open, options, value]);

  const selectAt = (index: number) => {
    const opt = options[index];
    if (!opt) return;
    onChange(opt.value);
    close();
  };

  const onTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;
    if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setOpen(true);
    } else if (event.key === "Escape") {
      close();
    }
  };

  const onListKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      close();
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((i) => Math.min(options.length - 1, i + 1));
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((i) => Math.max(0, i - 1));
      return;
    }
    if (event.key === "Home") {
      event.preventDefault();
      setActiveIndex(0);
      return;
    }
    if (event.key === "End") {
      event.preventDefault();
      setActiveIndex(options.length - 1);
      return;
    }
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      selectAt(activeIndex);
    }
  };

  return (
    <div className="ms-cselect" ref={rootRef}>
      <label className="ms-cselect__label" id={`${id}-label`} htmlFor={id}>
        {label}
      </label>
      <button
        type="button"
        id={id}
        className={`ms-cselect__trigger${open ? " is-open" : ""}${value ? " is-selected" : ""}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={`${id}-label`}
        aria-controls={listboxId}
        disabled={disabled}
        onClick={() => {
          if (!disabled) setOpen((v) => !v);
        }}
        onKeyDown={onTriggerKeyDown}
      >
        <span className="ms-cselect__value">{selected.label}</span>
        <span className="ms-cselect__chevron" aria-hidden="true">
          ▾
        </span>
      </button>
      {open ? (
        <ul
          id={listboxId}
          className="ms-cselect__list"
          role="listbox"
          tabIndex={-1}
          aria-labelledby={`${id}-label`}
          onKeyDown={onListKeyDown}
          ref={(node) => {
            node?.focus();
          }}
        >
          {options.map((opt, index) => {
            const isActive = index === activeIndex;
            const isSelected = opt.value === value;
            return (
              <li
                key={opt.value || "__empty"}
                id={`${id}-opt-${index}`}
                role="option"
                aria-selected={isSelected}
                className={`ms-cselect__option${isActive ? " is-active" : ""}${isSelected ? " is-selected" : ""}`}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => selectAt(index)}
              >
                {opt.label}
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
