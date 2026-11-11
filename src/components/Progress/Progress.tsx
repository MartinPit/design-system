import { cx } from "../cx";
import styles from "./Progress.module.css";

export type ProgressVariant = "bar" | "ring";
export type ProgressSize = "sm" | "md" | "lg";

export interface ProgressProps {
  label: string;
  value?: number;
  variant?: ProgressVariant;
  size?: ProgressSize;
  indeterminate?: boolean;
  showValue?: boolean;
  className?: string;
}

const ringSize = { sm: 56, md: 80, lg: 104 } as const;

export function Progress({
  label,
  value = 0,
  variant = "bar",
  size = "md",
  indeterminate = false,
  showValue = true,
  className,
}: ProgressProps) {
  const clamped = Math.min(100, Math.max(0, value));
  const complete = !indeterminate && clamped >= 100;
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - clamped / 100);
  const dimension = ringSize[size];

  return (
    <div
      className={cx(
        styles.root,
        styles[variant],
        styles[size],
        complete && styles.complete,
        indeterminate && styles.indeterminate,
        className,
      )}
    >
      <div className={styles.header}>
        <span className={styles.label}>{label}</span>
        {showValue && !indeterminate ? (
          <span className={styles.value}>{clamped}%</span>
        ) : null}
      </div>

      {variant === "bar" ? (
        <div
          role="progressbar"
          aria-label={label}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={indeterminate ? undefined : clamped}
          className={styles.track}
        >
          <span
            className={styles.fill}
            style={{ width: indeterminate ? undefined : `${clamped}%` }}
          />
        </div>
      ) : (
        <div className={styles.ringWrap} style={{ width: dimension, height: dimension }}>
          <svg
            role="progressbar"
            aria-label={label}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={indeterminate ? undefined : clamped}
            viewBox="0 0 100 100"
            className={styles.ring}
          >
            <circle className={styles.ringTrack} cx="50" cy="50" r={radius} />
            <circle
              className={styles.ringFill}
              cx="50"
              cy="50"
              r={radius}
              strokeDasharray={circumference}
              strokeDashoffset={indeterminate ? circumference * 0.65 : offset}
              transform="rotate(-90 50 50)"
            />
          </svg>
          {!indeterminate ? (
            <span className={styles.ringValue}>{clamped}%</span>
          ) : null}
        </div>
      )}
    </div>
  );
}
