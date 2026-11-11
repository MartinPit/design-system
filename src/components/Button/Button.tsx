import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";
import { cx } from "../cx";
import type { PreviewState } from "../preview";
import styles from "./Button.module.css";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  /** Docs-only: forces a contact state into a state grid. */
  preview?: PreviewState;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = "primary",
      size = "md",
      loading = false,
      disabled,
      preview,
      className,
      children,
      ...rest
    },
    ref,
  ) {
    return (
      <button
        ref={ref}
        type="button"
        data-preview={preview}
        className={cx(
          styles.button,
          styles[variant],
          styles[size],
          className,
        )}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        data-loading={loading || undefined}
        {...rest}
      >
        {loading ? <span className={styles.spinner} aria-hidden="true" /> : null}
        <span className={styles.label}>{children}</span>
      </button>
    );
  },
);
