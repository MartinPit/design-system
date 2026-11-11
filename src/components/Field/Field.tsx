import type { ReactNode } from "react";
import { cx } from "../../lib/cx";
import styles from "./Field.module.css";

export type FieldSize = "sm" | "md";

export function fieldDescribedBy(
  id: string,
  hint?: string,
  error?: string,
): string | undefined {
  if (error) return `${id}-error`;
  if (hint) return `${id}-hint`;
  return undefined;
}

interface FieldProps {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  hideLabel?: boolean;
  children: ReactNode;
  className?: string;
  aside?: ReactNode;
}

export function Field({
  id,
  label,
  hint,
  error,
  required,
  hideLabel,
  children,
  className,
  aside,
}: FieldProps) {
  return (
    <div className={cx(styles.field, className)}>
      <div className={styles.labelRow}>
        <label
          htmlFor={id}
          className={cx(styles.label, hideLabel && styles.labelHidden)}
        >
          {label}
          {required ? (
            <span className={styles.required} aria-hidden="true">
              {" "}
              *
            </span>
          ) : null}
        </label>
        {aside}
      </div>
      {children}
      {error ? (
        <p id={`${id}-error`} className={styles.error}>
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className={styles.hint}>
          {hint}
        </p>
      ) : null}
    </div>
  );
}
