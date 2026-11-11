import type { HTMLAttributes } from "react";
import { cx } from "../../lib/cx";
import styles from "./Badge.module.css";

export type BadgeVariant =
  | "neutral"
  | "accent"
  | "success"
  | "warning"
  | "danger";
export type BadgeSize = "sm" | "md";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
}

export function Badge({
  variant = "neutral",
  size = "md",
  className,
  children,
  ...rest
}: BadgeProps) {
  return (
    <span
      className={cx(styles.badge, styles[variant], styles[size], className)}
      {...rest}
    >
      {children}
    </span>
  );
}
