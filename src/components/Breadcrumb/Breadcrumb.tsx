import type { HTMLAttributes } from "react";
import { cx } from "../../lib/cx";
import styles from "./Breadcrumb.module.css";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  maxItems?: number;
  label?: string;
  "data-state"?: "hover" | "focus";
}

export function Breadcrumb({
  items,
  maxItems,
  label = "Breadcrumb",
  className,
  "data-state": dataState,
  ...rest
}: BreadcrumbProps) {
  const collapsed =
    maxItems !== undefined && items.length > maxItems && items.length > 2;
  const visible = collapsed
    ? [items[0], items[items.length - 1]]
    : items;

  return (
    <nav
      aria-label={label}
      className={cx(styles.root, className)}
      data-state={dataState}
      {...rest}
    >
      <ol className={styles.list}>
        {visible.map((item, index) => {
          const current = index === visible.length - 1;
          const isLast = index === visible.length - 1;
          return (
            <li key={`${item.label}-${index}`} className={styles.item}>
              {index > 0 ? (
                <span className={styles.separator} aria-hidden="true">
                  /
                </span>
              ) : null}
              {current || !item.href ? (
                <span
                  className={cx(styles.label, current && styles.current)}
                  aria-current={current ? "page" : undefined}
                >
                  {item.label}
                </span>
              ) : (
                <a href={item.href} className={styles.link}>
                  {item.label}
                </a>
              )}
              {collapsed && index === 0 && !isLast ? (
                <>
                  <span className={styles.separator} aria-hidden="true">
                    /
                  </span>
                  <span className={styles.ellipsis} aria-hidden="true">
                    …
                  </span>
                </>
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
