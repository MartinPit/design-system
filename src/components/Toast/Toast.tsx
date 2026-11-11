import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { cx } from "../../lib/cx";
import { Close } from "../../icons";
import { IconButton } from "../IconButton";
import styles from "./Toast.module.css";

export type ToastVariant = "success" | "danger" | "info";

export interface ToastProps {
  title: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
  paused?: boolean;
  onDismiss?: () => void;
  action?: ReactNode;
  className?: string;
}

export function Toast({
  title,
  description,
  variant = "success",
  duration = 6000,
  paused = false,
  onDismiss,
  action,
  className,
}: ToastProps) {
  const [hoverPaused, setHoverPaused] = useState(false);
  const [focusPaused, setFocusPaused] = useState(false);
  const dismiss = useRef(onDismiss);
  const isPaused = paused || hoverPaused || focusPaused;

  useEffect(() => {
    dismiss.current = onDismiss;
  }, [onDismiss]);

  useEffect(() => {
    if (duration <= 0 || isPaused) return;
    const timer = window.setTimeout(() => dismiss.current?.(), duration);
    return () => window.clearTimeout(timer);
  }, [duration, isPaused]);

  return (
    <div
      role="status"
      aria-atomic="true"
      tabIndex={-1}
      className={cx(styles.toast, styles[variant], className)}
      data-paused={isPaused || undefined}
      onMouseEnter={() => setHoverPaused(true)}
      onMouseLeave={() => setHoverPaused(false)}
      onFocus={() => setFocusPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setFocusPaused(false);
        }
      }}
    >
      <div className={styles.head}>
        <span className={styles.label}>
          {variant}
          <span className={styles.separator} aria-hidden="true">
            /
          </span>
          {isPaused ? "Paused" : "Just now"}
        </span>
        <IconButton
          variant="ghost"
          size="sm"
          aria-label="Dismiss notification"
          onClick={onDismiss}
        >
          <Close />
        </IconButton>
      </div>
      <div className={styles.body}>
        <p className={styles.title}>{title}</p>
        {description ? (
          <p className={styles.description}>{description}</p>
        ) : null}
        {action ? <div className={styles.action}>{action}</div> : null}
      </div>
    </div>
  );
}
