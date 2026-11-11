import {
  Children,
  cloneElement,
  useId,
  type FocusEvent,
  type KeyboardEvent,
  type MouseEvent,
  type ReactElement,
} from "react";
import { cx } from "../../lib/cx";
import { useControllableState } from "../../hooks/useControllableState";
import styles from "./Tooltip.module.css";

export type TooltipSide = "top" | "bottom" | "left" | "right";

interface TriggerProps {
  "aria-describedby"?: string;
  onMouseEnter?: (event: MouseEvent<HTMLElement>) => void;
  onMouseLeave?: (event: MouseEvent<HTMLElement>) => void;
  onFocus?: (event: FocusEvent<HTMLElement>) => void;
  onBlur?: (event: FocusEvent<HTMLElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLElement>) => void;
}

export interface TooltipProps {
  label: string;
  children: ReactElement;
  side?: TooltipSide;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  inline?: boolean;
  id?: string;
  className?: string;
}

function compose<E>(
  existing: ((event: E) => void) | undefined,
  handler: (event: E) => void,
) {
  return (event: E) => {
    existing?.(event);
    handler(event);
  };
}

export function Tooltip({
  label,
  children,
  side = "top",
  open,
  defaultOpen = false,
  onOpenChange,
  inline = false,
  id: idProp,
  className,
}: TooltipProps) {
  const autoId = useId();
  const id = idProp ?? autoId;
  const [visible, setVisible] = useControllableState({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });

  const child = Children.only(children) as ReactElement<TriggerProps>;
  const describedBy = [
    child.props["aria-describedby"],
    visible ? id : undefined,
  ]
    .filter(Boolean)
    .join(" ");

  const trigger = cloneElement(child, {
    "aria-describedby": describedBy || undefined,
    onMouseEnter: compose(child.props.onMouseEnter, () => setVisible(true)),
    onMouseLeave: compose(child.props.onMouseLeave, (event) => {
      if (!event.currentTarget.contains(document.activeElement)) {
        setVisible(false);
      }
    }),
    onFocus: compose(child.props.onFocus, () => setVisible(true)),
    onBlur: compose(child.props.onBlur, (event) => {
      if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
        setVisible(false);
      }
    }),
    onKeyDown: compose(child.props.onKeyDown, (event) => {
      if (event.key === "Escape" && visible) {
        event.stopPropagation();
        setVisible(false);
      }
    }),
  });

  return (
    <span
      className={cx(
        styles.wrapper,
        inline && styles.wrapperInline,
        className,
      )}
    >
      {trigger}
      {visible ? (
        <span
          role="tooltip"
          id={id}
          className={cx(
            styles.tooltip,
            styles[side],
            inline && styles.inline,
          )}
        >
          {label}
        </span>
      ) : null}
    </span>
  );
}
