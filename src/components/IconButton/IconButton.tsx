import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cx } from "../../lib/cx";
import styles from "./IconButton.module.css";

export type IconButtonVariant = "solid" | "ghost";
export type IconButtonSize = "sm" | "md";

export interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  "aria-label": string;
  /** Forces a visual state for the documentation state grid. */
  "data-state"?: "hover" | "active" | "focus";
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    { variant = "solid", size = "md", type = "button", className, ...rest },
    ref,
  ) {
    return (
      <button
        ref={ref}
        type={type}
        className={cx(styles.button, styles[variant], styles[size], className)}
        {...rest}
      />
    );
  },
);
