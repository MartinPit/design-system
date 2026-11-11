import { forwardRef, type AnchorHTMLAttributes } from "react";
import { cx } from "../../lib/cx";
import styles from "./Link.module.css";

export type LinkVariant = "inline" | "standalone";
export type LinkSize = "inherit" | "sm";

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: LinkVariant;
  size?: LinkSize;
  disabled?: boolean;
  /** Forces a visual state for the documentation state grid. */
  "data-state"?: "hover" | "focus" | "visited";
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  {
    variant = "inline",
    size = "inherit",
    disabled = false,
    className,
    children,
    tabIndex,
    ...rest
  },
  ref,
) {
  return (
    <a
      ref={ref}
      className={cx(styles.link, styles[variant], styles[size], className)}
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : tabIndex}
      {...rest}
      {...(disabled ? { href: undefined, onClick: undefined } : {})}
    >
      {children}
      {variant === "standalone" ? (
        <span className={styles.mark} aria-hidden="true">
          {" "}
          →
        </span>
      ) : null}
    </a>
  );
});
