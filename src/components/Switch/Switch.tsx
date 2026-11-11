import { useId, type ReactNode } from "react";
import { cx } from "../../lib/cx";
import { useControllableState } from "../../hooks/useControllableState";
import styles from "./Switch.module.css";

export type SwitchSize = "sm" | "md";

export interface SwitchProps {
  label: ReactNode;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  size?: SwitchSize;
  disabled?: boolean;
  hint?: string;
  id?: string;
  className?: string;
  /** Forces a visual state for the documentation state grid. */
  "data-state"?: "hover" | "focus";
}

export function Switch({
  label,
  checked,
  defaultChecked = false,
  onChange,
  size = "md",
  disabled = false,
  hint,
  id: idProp,
  className,
  "data-state": dataState,
}: SwitchProps) {
  const autoId = useId();
  const id = idProp ?? autoId;
  const [on, setOn] = useControllableState({
    value: checked,
    defaultValue: defaultChecked,
    onChange,
  });

  return (
    <div className={cx(styles.wrap, className)}>
      <div className={styles.row}>
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
        <button
          id={id}
          type="button"
          role="switch"
          aria-checked={on}
          disabled={disabled}
          data-state={dataState}
          aria-describedby={hint ? `${id}-hint` : undefined}
          className={cx(styles.switch, styles[size])}
          onClick={() => setOn(!on)}
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
}
