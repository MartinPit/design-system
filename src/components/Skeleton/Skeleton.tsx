import type { CSSProperties } from "react";
import { cx } from "../../lib/cx";
import styles from "./Skeleton.module.css";

export type SkeletonVariant = "text" | "block" | "circle";
export type SkeletonSize = "sm" | "md";

export interface SkeletonProps {
  variant?: SkeletonVariant;
  size?: SkeletonSize;
  lines?: number;
  animate?: boolean;
  width?: string;
  className?: string;
  style?: CSSProperties;
}

export function Skeleton({
  variant = "text",
  size = "md",
  lines = 1,
  animate = true,
  width,
  className,
  style,
}: SkeletonProps) {
  const lineStyle: CSSProperties = {
    ...(width ? { width } : {}),
    ...style,
  };

  return (
    <span
      className={cx(styles.root, styles[size], className)}
      aria-hidden="true"
      style={lineStyle}
    >
      {Array.from({ length: Math.max(1, lines) }, (_, index) => (
        <span
          key={index}
          className={cx(
            styles.line,
            styles[variant],
            animate && styles.animated,
          )}
        />
      ))}
    </span>
  );
}
