import { forwardRef, useState } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cx } from "../cx";
import styles from "./Switch.module.css";

export type SwitchSize = "sm" | "md";

export interface SwitchProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange" | "role"> {
  label: ReactNode;
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  size?: SwitchSize;
  /** Docs-only: forces a contact state into a state grid. */
  preview?: "hover" | "focus";
}

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  function Switch(
    {
      label,
      checked,
      defaultChecked = false,
      onCheckedChange,
      size = "md",
      preview,
      className,
      disabled,
      ...rest
    },
    ref,
  ) {
    const [internal, setInternal] = useState(defaultChecked);
    const isControlled = checked !== undefined;
    const isOn = isControlled ? checked : internal;

    function toggle() {
      const next = !isOn;
      if (!isControlled) setInternal(next);
      onCheckedChange?.(next);
    }

    return (
      <button
        ref={ref}
        type="button"
        role="switch"
        data-preview={preview}
        aria-checked={isOn}
        className={cx(styles.root, styles[size], className)}
        disabled={disabled}
        onClick={toggle}
        {...rest}
      >
        <span className={styles.track} aria-hidden="true">
          <span className={styles.knob} />
        </span>
        <span className={styles.label}>{label}</span>
      </button>
    );
  },
);
