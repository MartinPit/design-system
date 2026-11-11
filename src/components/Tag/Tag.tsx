import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../../lib/cx";
import { Close } from "../../icons";
import styles from "./Tag.module.css";

export type TagVariant = "static" | "removable";
export type TagSize = "sm" | "md";

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: TagVariant;
  size?: TagSize;
  disabled?: boolean;
  onRemove?: () => void;
  removeLabel?: string;
  children: ReactNode;
  "data-state"?: "hover" | "focus";
}

export function Tag({
  variant = "static",
  size = "md",
  disabled = false,
  onRemove,
  removeLabel,
  className,
  children,
  "data-state": dataState,
  ...rest
}: TagProps) {
  const removable = variant === "removable";

  return (
    <span
      className={cx(
        styles.tag,
        styles[size],
        disabled && styles.disabled,
        className,
      )}
      data-state={dataState}
      {...rest}
    >
      <span className={styles.label}>{children}</span>
      {removable ? (
        <button
          type="button"
          className={styles.remove}
          aria-label={removeLabel ?? "Remove tag"}
          disabled={disabled}
          onClick={onRemove}
        >
          <Close aria-hidden="true" />
        </button>
      ) : null}
    </span>
  );
}
