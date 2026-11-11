import { forwardRef } from "react";
import type { HTMLAttributes, KeyboardEvent } from "react";
import { cx } from "../cx";
import styles from "./Card.module.css";

export type CardVariant = "flat" | "raised" | "interactive" | "selected";
export type CardSize = "sm" | "md" | "lg";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  size?: CardSize;
  interactive?: boolean;
  onActivate?: () => void;
  disabled?: boolean;
  /** Docs-only: forces a contact state into a state grid. */
  preview?: "hover" | "focus";
}

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  {
    variant = "flat",
    size = "md",
    interactive = false,
    onActivate,
    disabled = false,
    preview,
    className,
    children,
    onKeyDown,
    ...rest
  },
  ref,
) {
  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    onKeyDown?.(event);
    if (!interactive || disabled) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onActivate?.();
    }
  }

  const classes = cx(
    styles.card,
    styles[variant],
    styles[size],
    interactive && styles.isInteractive,
    disabled && styles.disabled,
    className,
  );

  if (interactive) {
    const { onClick, ...restProps } = rest;
    return (
      <div
        ref={ref}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled || undefined}
        data-preview={preview}
        className={classes}
        onKeyDown={handleKeyDown}
        onClick={(event) => {
          if (disabled) return;
          onActivate?.();
          onClick?.(event);
        }}
        {...restProps}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      data-preview={preview}
      className={classes}
      {...rest}
    >
      {children}
    </div>
  );
});
