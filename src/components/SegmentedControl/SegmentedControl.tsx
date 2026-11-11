import { forwardRef, useState } from "react";
import { cx } from "../cx";
import styles from "./SegmentedControl.module.css";

export type SegmentedControlSize = "sm" | "md";

export interface SegmentOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SegmentedControlProps {
  /** Names the group for assistive technology. */
  label?: string;
  options: SegmentOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  size?: SegmentedControlSize;
  className?: string;
  /** Docs-only: forces one contact state into a state grid. */
  preview?: "hover" | "focus";
}

export const SegmentedControl = forwardRef<HTMLDivElement, SegmentedControlProps>(
  function SegmentedControl(
    {
      label,
      options,
      value,
      defaultValue,
      onValueChange,
      size = "md",
      className,
      preview,
    },
    ref,
  ) {
    const [internal, setInternal] = useState(
      () => defaultValue ?? options[0]?.value ?? "",
    );
    const selected = value ?? internal;

    function select(next: string) {
      if (value === undefined) setInternal(next);
      onValueChange?.(next);
    }

    return (
      <div
        ref={ref}
        role="group"
        aria-label={label}
        className={cx(styles.group, styles[size], className)}
      >
        {options.map((option, index) => {
          const isSelected = option.value === selected;
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={isSelected}
              disabled={option.disabled}
              data-preview={preview && index === 0 ? preview : undefined}
              className={cx(styles.segment, isSelected && styles.selected)}
              onClick={() => select(option.value)}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    );
  },
);
