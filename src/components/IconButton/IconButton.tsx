import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";
import { cx } from "../cx";
import type { PreviewState } from "../preview";
import { Icon } from "../../icons/Icon";
import type { IconName } from "../../icons/Icon";
import styles from "./IconButton.module.css";

export type IconButtonVariant = "solid" | "ghost";
export type IconButtonSize = "sm" | "md";

export interface IconButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "aria-label"> {
  /** The only accessible name; the icon itself is decorative. */
  label: string;
  icon: IconName;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  /** Docs-only: forces a contact state into a state grid. */
  preview?: PreviewState;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    {
      label,
      icon,
      variant = "ghost",
      size = "md",
      preview,
      className,
      ...rest
    },
    ref,
  ) {
    return (
      <button
        ref={ref}
        type="button"
        data-preview={preview}
        aria-label={label}
        title={label}
        className={cx(styles.button, styles[variant], styles[size], className)}
        {...rest}
      >
        <Icon name={icon} size={size === "sm" ? 18 : 20} />
      </button>
    );
  },
);
