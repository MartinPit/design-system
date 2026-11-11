import type { ReactNode } from "react";
import { cx } from "../cx";
import styles from "./Badge.module.css";

export type BadgeVariant =
  | "neutral"
  | "accent"
  | "success"
  | "warning"
  | "danger";
export type BadgeSize = "sm" | "md";

export interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  children: ReactNode;
  className?: string;
}

export function Badge({
  variant = "neutral",
  size = "md",
  children,
  className,
}: BadgeProps) {
  return (
    <span className={cx(styles.badge, styles[variant], styles[size], className)}>
      {children}
    </span>
  );
}
