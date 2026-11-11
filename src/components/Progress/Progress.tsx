import { useId } from "react";
import { cx } from "../../lib/cx";
import styles from "./Progress.module.css";

export type ProgressVariant = "bar" | "ring";
export type ProgressSize = "sm" | "md" | "lg";

export interface ProgressProps {
  label: string;
  value?: number;
  max?: number;
  variant?: ProgressVariant;
  size?: ProgressSize;
  indeterminate?: boolean;
  showValue?: boolean;
  className?: string;
}

export function Progress({
  label,
  value = 0,
  max = 100,
  variant = "bar",
  size = "md",
  indeterminate = false,
  showValue = true,
  className,
}: ProgressProps) {
  const labelId = useId();
  const safeMax = max > 0 ? max : 100;
  const percent = Math.max(0, Math.min(100, (value / safeMax) * 100));
  const complete = !indeterminate && value >= safeMax;
  const circumference = 2 * Math.PI * 42;

  return (
    <div className={cx(styles.root, className)}>
      <div className={styles.head}>
        <span id={labelId} className={styles.label}>
          {label}
        </span>
        {showValue ? (
          <span className={styles.value}>
            {indeterminate ? "—" : `${Math.round(percent)}%`}
          </span>
        ) : null}
      </div>

      <div
        role="progressbar"
        aria-labelledby={labelId}
        aria-valuemin={0}
        aria-valuemax={safeMax}
        aria-valuenow={indeterminate ? undefined : value}
        className={cx(
          styles.track,
          styles[`${variant}${size === "sm" ? "Sm" : size === "lg" ? "Lg" : "Md"}`],
          indeterminate && styles.indeterminate,
        )}
        data-complete={complete || undefined}
      >
        {variant === "bar" ? (
          <span
            className={styles.fill}
            style={indeterminate ? undefined : { width: `${percent}%` }}
          />
        ) : (
          <span className={styles.ringFrame}>
            <svg viewBox="0 0 100 100" className={styles.ring} aria-hidden="true">
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="var(--paper-3)"
                strokeWidth="8"
              />
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                strokeDasharray={circumference}
                strokeDashoffset={
                  indeterminate ? circumference * 0.72 : circumference * (1 - percent / 100)
                }
                transform="rotate(-90 50 50)"
              />
            </svg>
            {indeterminate ? (
              <span className={styles.ringValue} aria-hidden="true">
                …
              </span>
            ) : null}
          </span>
        )}
      </div>
    </div>
  );
}
