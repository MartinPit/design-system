import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { Icon } from "../../icons/Icon";
import type { IconName } from "../../icons/Icon";
import { cx } from "../cx";
import styles from "./Toast.module.css";

export type ToastVariant = "success" | "danger" | "info";

export interface ToastProps {
  open: boolean;
  message: ReactNode;
  title?: string;
  variant?: ToastVariant;
  onDismiss: () => void;
  /** Milliseconds before auto-dismiss. Zero keeps it until dismissed. */
  duration?: number;
  /** Keeps the toast in the document flow for a state grid. */
  inline?: boolean;
  /** Freezes the timer, e.g. for a paused state specimen. */
  paused?: boolean;
  action?: ReactNode;
}

const icons: Record<ToastVariant, IconName> = {
  success: "check",
  danger: "alert",
  info: "info",
};

export function Toast({
  open,
  message,
  title,
  variant = "info",
  onDismiss,
  duration = 6000,
  inline = false,
  paused: pausedProp = false,
  action,
}: ToastProps) {
  const [hoverPaused, setHoverPaused] = useState(false);
  const paused = pausedProp || hoverPaused;
  const dismissRef = useRef(onDismiss);

  useEffect(() => {
    dismissRef.current = onDismiss;
  }, [onDismiss]);

  useEffect(() => {
    if (!open || duration <= 0 || paused) return;
    const timer = window.setTimeout(() => dismissRef.current(), duration);
    return () => window.clearTimeout(timer);
  }, [open, duration, paused]);

  if (!open) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={cx(
        styles.toast,
        styles[variant],
        inline && styles.inline,
      )}
      onMouseEnter={() => setHoverPaused(true)}
      onMouseLeave={() => setHoverPaused(false)}
      onFocus={() => setHoverPaused(true)}
      onBlur={() => setHoverPaused(false)}
    >
      <span className={styles.icon} aria-hidden="true">
        <Icon name={icons[variant]} size={18} />
      </span>
      <div className={styles.content}>
        {title ? <p className={styles.title}>{title}</p> : null}
        <div className={styles.message}>{message}</div>
        {action ? <div className={styles.action}>{action}</div> : null}
      </div>
      <button
        type="button"
        className={styles.dismiss}
        aria-label="Dismiss notification"
        onClick={onDismiss}
      >
        <Icon name="close" size={15} />
      </button>
    </div>
  );
}
