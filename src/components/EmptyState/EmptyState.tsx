import type { ReactNode } from "react";
import { Icon } from "../../icons/Icon";
import { cx } from "../cx";
import styles from "./EmptyState.module.css";

export interface EmptyStateProps {
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div className={cx(styles.root, className)}>
      <span className={styles.mark} aria-hidden="true">
        <span className={styles.pattern} />
        <Icon name="sparkle" size={22} />
      </span>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      {action ? <div className={styles.action}>{action}</div> : null}
    </div>
  );
}
