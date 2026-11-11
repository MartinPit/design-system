import { useRef, type KeyboardEvent } from "react";
import { cx } from "../../lib/cx";
import { useControllableState } from "../../hooks/useControllableState";
import styles from "./SegmentedControl.module.css";

export interface SegmentOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export type SegmentedControlSize = "sm" | "md";

export interface SegmentedControlProps {
  label: string;
  options: SegmentOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  size?: SegmentedControlSize;
  disabled?: boolean;
  className?: string;
  /** Forces a visual state for the documentation state grid. */
  "data-state"?: "hover" | "focus";
}

export function SegmentedControl({
  label,
  options,
  value,
  defaultValue,
  onChange,
  size = "md",
  disabled = false,
  className,
  "data-state": dataState,
}: SegmentedControlProps) {
  const [selected, setSelected] = useControllableState<string>({
    value,
    defaultValue: defaultValue ?? options[0]?.value ?? "",
    onChange,
  });
  const buttons = useRef<Record<string, HTMLButtonElement | null>>({});

  function move(from: string, direction: 1 | -1 | "first" | "last") {
    const enabled = options.filter((option) => !option.disabled);
    if (enabled.length === 0) return;
    const index = enabled.findIndex((option) => option.value === from);
    let next = enabled[0];
    if (direction === "last") next = enabled[enabled.length - 1];
    else if (direction !== "first") {
      next = enabled[(index + direction + enabled.length) % enabled.length];
    }
    setSelected(next.value);
    buttons.current[next.value]?.focus();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, from: string) {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      move(from, 1);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      move(from, -1);
    } else if (event.key === "Home") {
      event.preventDefault();
      move(from, "first");
    } else if (event.key === "End") {
      event.preventDefault();
      move(from, "last");
    }
  }

  return (
    <div
      role="group"
      aria-label={label}
      data-state={dataState}
      className={cx(styles.group, styles[size], className)}
    >
      {options.map((option) => (
        <button
          key={option.value}
          ref={(node) => {
            buttons.current[option.value] = node;
          }}
          type="button"
          className={styles.segment}
          aria-pressed={selected === option.value}
          disabled={disabled || option.disabled}
          onClick={() => setSelected(option.value)}
          onKeyDown={(event) => handleKeyDown(event, option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
