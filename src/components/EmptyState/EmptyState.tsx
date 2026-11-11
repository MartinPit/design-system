import type { ReactNode } from "react";
import { cx } from "../../lib/cx";
import { GradientForm } from "../GradientForm";
import styles from "./EmptyState.module.css";

export interface EmptyStateProps {
  title: string;
  body: string;
  action?: ReactNode;
  mark?: boolean;
  className?: string;
}

export function EmptyState({
  title,
  body,
  action,
  mark = false,
  className,
}: EmptyStateProps) {
  return (
    <div className={cx(styles.root, className)}>
      {mark ? <GradientForm className={styles.mark} /> : null}
      <p className={styles.label}>No records</p>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.body}>{body}</p>
      {action ? <div className={styles.action}>{action}</div> : null}
    </div>
  );
}
