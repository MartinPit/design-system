import { cloneElement, useId, useState } from "react";
import type {
  FocusEvent,
  KeyboardEvent,
  MouseEvent,
  ReactElement,
} from "react";
import { cx } from "../cx";
import styles from "./Tooltip.module.css";

export type TooltipPlacement = "top" | "bottom" | "left" | "right";
export type TooltipSize = "sm";

interface TooltipTriggerProps {
  "aria-describedby"?: string;
  onMouseEnter?: (event: MouseEvent<HTMLElement>) => void;
  onMouseLeave?: (event: MouseEvent<HTMLElement>) => void;
  onFocus?: (event: FocusEvent<HTMLElement>) => void;
  onBlur?: (event: FocusEvent<HTMLElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLElement>) => void;
}

export interface TooltipProps {
  label: string;
  children: ReactElement<TooltipTriggerProps>;
  placement?: TooltipPlacement;
  size?: TooltipSize;
  defaultOpen?: boolean;
  className?: string;
}

export function Tooltip({
  label,
  children,
  placement = "top",
  size = "sm",
  defaultOpen = false,
  className,
}: TooltipProps) {
  const id = useId();
  const [open, setOpen] = useState(defaultOpen);
  const [dismissed, setDismissed] = useState(false);

  function show() {
    setDismissed(false);
    setOpen(true);
  }

  function hide() {
    setOpen(false);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === "Escape" && open) {
      event.preventDefault();
      setOpen(false);
      setDismissed(true);
    }
  }

  const describedBy =
    [children.props["aria-describedby"], open ? id : undefined]
      .filter(Boolean)
      .join(" ") || undefined;

  const trigger = cloneElement(children, {
    "aria-describedby": describedBy,
    onMouseEnter: (event: MouseEvent<HTMLElement>) => {
      children.props.onMouseEnter?.(event);
      show();
    },
    onMouseLeave: (event: MouseEvent<HTMLElement>) => {
      children.props.onMouseLeave?.(event);
      hide();
    },
    onFocus: (event: FocusEvent<HTMLElement>) => {
      children.props.onFocus?.(event);
      if (!dismissed) show();
    },
    onBlur: (event: FocusEvent<HTMLElement>) => {
      children.props.onBlur?.(event);
      hide();
      setDismissed(false);
    },
    onKeyDown: (event: KeyboardEvent<HTMLElement>) => {
      children.props.onKeyDown?.(event);
      handleKeyDown(event);
    },
  });

  return (
    <span className={cx(styles.root, className)}>
      {trigger}
      {open ? (
        <span
          role="tooltip"
          id={id}
          className={cx(styles.tooltip, styles[placement], styles[size])}
        >
          {label}
        </span>
      ) : null}
    </span>
  );
}
