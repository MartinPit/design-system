import type { HTMLAttributes } from "react";
import { cx } from "../../lib/cx";
import styles from "./Card.module.css";

export type CardVariant = "flat" | "raised" | "interactive" | "selected";
export type CardSize = "sm" | "md" | "lg";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  size?: CardSize;
  disabled?: boolean;
  "data-state"?: "hover" | "focus";
}

export function Card({
  variant = "flat",
  size = "md",
  disabled = false,
  className,
  children,
  "data-state": dataState,
  ...rest
}: CardProps) {
  return (
    <div
      className={cx(
        styles.card,
        styles[variant],
        styles[size],
        disabled && styles.disabled,
        className,
      )}
      data-state={dataState}
      {...rest}
      aria-disabled={disabled || undefined}
      inert={disabled || undefined}
    >
      {children}
    </div>
  );
}
