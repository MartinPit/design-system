import { forwardRef } from "react";
import type { AnchorHTMLAttributes, MouseEvent } from "react";
import { cx } from "../cx";
import type { PreviewState } from "../preview";
import styles from "./Link.module.css";

export type LinkVariant = "inline" | "standalone";
export type LinkSize = "inherit" | "sm";

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: LinkVariant;
  size?: LinkSize;
  disabled?: boolean;
  /** Docs-only: forces a contact state into a state grid. */
  preview?: PreviewState;
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  {
    variant = "inline",
    size = "inherit",
    disabled = false,
    preview,
    className,
    onClick,
    tabIndex,
    href,
    children,
    ...rest
  },
  ref,
) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (disabled) {
      event.preventDefault();
      return;
    }
    onClick?.(event);
  }

  return (
    <a
      ref={ref}
      href={href}
      data-preview={preview}
      className={cx(styles.link, styles[variant], styles[size], className)}
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : tabIndex}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </a>
  );
});
