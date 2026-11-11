import {
  forwardRef,
  useId,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";
import { cx } from "../../lib/cx";
import { useControllableState } from "../../hooks/useControllableState";
import styles from "./Switch.module.css";

export type SwitchSize = "sm" | "md";

export interface SwitchProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type" | "onChange"> {
  label: ReactNode;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  size?: SwitchSize;
  hint?: string;
  /** Forces a visual state for the documentation state grid. */
  "data-state"?: "hover" | "focus";
}

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(function Switch(
  {
    label,
    checked,
    defaultChecked = false,
    onChange,
    size = "md",
    disabled = false,
    hint,
    id: idProp,
    className,
    onClick,
    "aria-describedby": ariaDescribedBy,
    "data-state": dataState,
    ...rest
  },
  ref,
) {
  const autoId = useId();
  const id = idProp ?? autoId;
  const [on, setOn] = useControllableState({
    value: checked,
    defaultValue: defaultChecked,
    onChange,
  });
  const describedBy =
    [hint ? `${id}-hint` : undefined, ariaDescribedBy]
      .filter(Boolean)
      .join(" ") || undefined;

  return (
    <div className={cx(styles.wrap, className)}>
      <div className={styles.row}>
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
        <button
          {...rest}
          ref={ref}
          id={id}
          type="button"
          role="switch"
          aria-checked={on}
          aria-describedby={describedBy}
          disabled={disabled}
          data-state={dataState}
          className={cx(styles.switch, styles[size])}
          onClick={(event) => {
            onClick?.(event);
            if (!event.defaultPrevented) setOn(!on);
          }}
        >
          <span className={styles.track} aria-hidden="true">
            <span className={styles.knob} />
          </span>
        </button>
      </div>
      {hint ? (
        <p id={`${id}-hint`} className={styles.hint}>
          {hint}
        </p>
      ) : null}
    </div>
  );
});
