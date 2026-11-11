import type { ReactNode } from "react";
import { Icon } from "../../icons/Icon";
import { cx } from "../cx";
import styles from "./Tag.module.css";

export type TagVariant = "static" | "removable";
export type TagSize = "sm" | "md";

export interface TagProps {
  children: ReactNode;
  variant?: TagVariant;
  size?: TagSize;
  onRemove?: () => void;
  removeLabel?: string;
  disabled?: boolean;
  /** Docs-only: forces a contact state into a state grid. */
  preview?: "hover" | "focus";
  className?: string;
}

export function Tag({
  children,
  variant = "static",
  size = "md",
  onRemove,
  removeLabel = "Remove tag",
  disabled = false,
  preview,
  className,
}: TagProps) {
  const removable = variant === "removable" || Boolean(onRemove);

  return (
    <span
      className={cx(
        styles.tag,
        styles[size],
        removable && styles.removable,
        disabled && styles.disabled,
        className,
      )}
    >
      <span className={styles.label}>{children}</span>
      {removable ? (
        <button
          type="button"
          className={styles.remove}
          aria-label={removeLabel}
          data-preview={preview}
          disabled={disabled}
          onClick={onRemove}
        >
          <Icon name="close" size={13} />
        </button>
      ) : null}
    </span>
  );
}
