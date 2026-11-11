import { useEffect, useId, useRef } from "react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import { Icon } from "../../icons/Icon";
import { cx } from "../cx";
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
  closeLabel?: string;
  /** Renders the dialog surface in flow for a variant specimen. */
  inline?: boolean;
}

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

export function Dialog({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size = "md",
  closeLabel = "Close dialog",
  inline = false,
}: DialogProps) {
  const titleId = useId();
  const descriptionId = useId();
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open || inline) return;

    const previous = document.activeElement;
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusables = dialog?.querySelectorAll<HTMLElement>(focusableSelector);
    (focusables?.[0] ?? dialog)?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onCloseRef.current();
        return;
      }
      if (event.key !== "Tab") return;

      const items = Array.from(
        dialog?.querySelectorAll<HTMLElement>(focusableSelector) ?? [],
      ).filter((item) => {
        const computed = getComputedStyle(item);
        return (
          !item.hasAttribute("hidden") &&
          computed.display !== "none" &&
          computed.visibility !== "hidden"
        );
      });
      if (items.length === 0) {
        event.preventDefault();
        dialog?.focus();
        return;
      }

      const first = items[0]!;
      const last = items[items.length - 1]!;
      const active = document.activeElement;

      if (event.shiftKey) {
        if (active === first || !dialog?.contains(active)) {
          event.preventDefault();
          last.focus();
        }
      } else if (active === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      if (previous instanceof HTMLElement) previous.focus();
    };
  }, [open, inline]);

  if (!open) return null;

  const dialog = (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal={inline ? undefined : true}
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      tabIndex={-1}
      className={cx(styles.dialog, styles[size])}
    >
      <div className={styles.header}>
        <div>
          <h2 className={styles.title} id={titleId}>
            {title}
          </h2>
          {description ? (
            <p className={styles.description} id={descriptionId}>
              {description}
            </p>
          ) : null}
        </div>
        <button
          type="button"
          className={styles.close}
          aria-label={closeLabel}
          onClick={onClose}
        >
          <Icon name="close" size={18} />
        </button>
      </div>

      <div className={styles.body}>{children}</div>

      {footer ? <div className={styles.footer}>{footer}</div> : null}
    </div>
  );

  if (inline) {
    return <div className={styles.inlineFrame}>{dialog}</div>;
  }

  return createPortal(
    <div
      className={styles.backdrop}
      onPointerDown={(event) => {
        if (event.target === event.currentTarget) onCloseRef.current();
      }}
    >
      {dialog}
    </div>,
    document.body,
  );
}
