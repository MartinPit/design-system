import {
  forwardRef,
  type HTMLAttributes,
} from "react";
import { cx } from "../../lib/cx";
import { useRovingFocus } from "../../lib/useRovingFocus";
import { useControllableState } from "../../hooks/useControllableState";
import styles from "./SegmentedControl.module.css";

export interface SegmentOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export type SegmentedControlSize = "sm" | "md";

export interface SegmentedControlProps
  extends Omit<
    HTMLAttributes<HTMLDivElement>,
    "onChange" | "value" | "defaultValue" | "children"
  > {
  label: string;
  options: SegmentOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  size?: SegmentedControlSize;
  disabled?: boolean;
  /** Forces a visual state for the documentation state grid. */
  "data-state"?: "hover" | "focus";
}

export const SegmentedControl = forwardRef<
  HTMLDivElement,
  SegmentedControlProps
>(function SegmentedControl(
  {
    label,
    options,
    value,
    defaultValue,
    onChange,
    size = "md",
    disabled = false,
    className,
    "data-state": dataState,
    ...rest
  },
  ref,
) {
  const [selected, setSelected] = useControllableState<string>({
    value,
    defaultValue: defaultValue ?? options[0]?.value ?? "",
    onChange,
  });
  const roving = useRovingFocus<HTMLButtonElement>({
    ids: options.map((option) => option.value),
    isDisabled: (id) =>
      disabled || Boolean(options.find((option) => option.value === id)?.disabled),
    onMove: setSelected,
  });

  return (
    <div
      ref={ref}
      role="group"
      aria-label={label}
      data-state={dataState}
      className={cx(styles.group, styles[size], className)}
      {...rest}
    >
      {options.map((option) => (
        <button
          key={option.value}
          ref={roving.getRef(option.value)}
          type="button"
          className={styles.segment}
          aria-pressed={selected === option.value}
          disabled={disabled || option.disabled}
          onClick={() => setSelected(option.value)}
          onKeyDown={(event) => roving.handleKeyDown(event, option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
});
