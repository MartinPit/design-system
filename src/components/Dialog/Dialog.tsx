import {
  useEffect,
  useId,
  useRef,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { cx } from "../../lib/cx";
import { getFocusable } from "../../lib/focus";
import { Close } from "../../icons";
import { IconButton } from "../IconButton";
import styles from "./Dialog.module.css";

export type DialogSize = "sm" | "md";

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children?: ReactNode;
  footer?: ReactNode;
  size?: DialogSize;
  eyebrow?: string;
  inline?: boolean;
  className?: string;
}

export function Dialog({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size = "md",
  eyebrow = "Confirm",
  inline = false,
  className,
}: DialogProps) {
  const titleId = useId();
  const descriptionId = useId();
  const panel = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open || inline) return;
    const panelNode = panel.current;
    previousFocus.current = document.activeElement as HTMLElement | null;
    if (!panelNode) return;

    const first = getFocusable(panelNode)[0];
    (first ?? panelNode).focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
      previousFocus.current?.focus();
    };
  }, [open, inline]);

  if (!open) return null;

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.stopPropagation();
      onClose();
      return;
    }

    if (event.key !== "Tab") return;
    const panelNode = panel.current;
    if (!panelNode) return;

    const focusable = getFocusable(panelNode);
    if (focusable.length === 0) {
      event.preventDefault();
      panelNode.focus();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement;

    if (event.shiftKey) {
      if (active === first || !panelNode.contains(active)) {
        event.preventDefault();
        last.focus();
      }
    } else if (active === last) {
      event.preventDefault();
      first.focus();
    }
  }

  const surface = (
    <div
      ref={panel}
      className={cx(styles.dialog, styles[size], inline && styles.inline, className)}
      role={inline ? "group" : "dialog"}
      aria-modal={inline ? undefined : true}
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      tabIndex={-1}
      onKeyDown={handleKeyDown}
    >
      <div className={styles.header}>
        <div>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h2 id={titleId} className={styles.title}>
            {title}
          </h2>
        </div>
        <IconButton
          variant="ghost"
          size="sm"
          aria-label="Close dialog"
          onClick={onClose}
        >
          <Close />
        </IconButton>
      </div>

      {description ? (
        <p id={descriptionId} className={styles.description}>
          {description}
        </p>
      ) : null}

      {children ? <div className={styles.body}>{children}</div> : null}

      {footer ? <div className={styles.footer}>{footer}</div> : null}
    </div>
  );

  if (inline) {
    return <div className={styles.inlineFrame}>{surface}</div>;
  }

  return createPortal(
    <div className={styles.overlay}>{surface}</div>,
    document.body,
  );
}
