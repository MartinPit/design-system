import { cx } from "../cx";
import styles from "./Skeleton.module.css";

export type SkeletonVariant = "text" | "block" | "circle";
export type SkeletonSize = "sm" | "md";

export interface SkeletonProps {
  variant?: SkeletonVariant;
  size?: SkeletonSize;
  lines?: number;
  width?: string;
  animated?: boolean;
  className?: string;
}

export function Skeleton({
  variant = "text",
  size = "md",
  lines = 1,
  width,
  animated = true,
  className,
}: SkeletonProps) {
  const staticClass = animated ? undefined : styles.static;

  if (variant === "text" && lines > 1) {
    return (
      <span
        className={cx(styles.stack, className)}
        aria-hidden="true"
      >
        {Array.from({ length: lines }, (_, index) => (
          <span
            key={index}
            className={cx(
              styles.skeleton,
              styles.text,
              styles[size],
              staticClass,
            )}
            style={{ width: index === lines - 1 ? "62%" : width }}
          />
        ))}
      </span>
    );
  }

  return (
    <span
      className={cx(
        styles.skeleton,
        styles[variant],
        styles[size],
        staticClass,
        className,
      )}
      style={{ width: variant === "text" ? width : undefined }}
      aria-hidden="true"
    />
  );
}
