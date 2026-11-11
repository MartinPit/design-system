import { forwardRef } from "react";
import { cx } from "../cx";
import styles from "./Breadcrumb.module.css";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  collapsed?: boolean;
  label?: string;
  /** Docs-only: forces a contact state into a state grid. */
  preview?: "hover" | "focus";
  className?: string;
}

export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
  function Breadcrumb(
    { items, collapsed = false, label = "Breadcrumb", preview, className },
    ref,
  ) {
    const isCollapsed = collapsed && items.length > 3;
    const visible = isCollapsed
      ? [items[0]!, items[items.length - 1]!]
      : items;
    const hiddenCount = items.length - 2;

    return (
      <nav
        ref={ref}
        aria-label={label}
        className={cx(styles.root, className)}
      >
        <ol className={styles.list}>
          {visible.map((item, index) => {
            const isLast = index === visible.length - 1;
            return (
              <li className={styles.item} key={`${item.label}-${index}`}>
                {index > 0 ? (
                  <span className={styles.separator} aria-hidden="true">
                    /
                  </span>
                ) : null}
                {isLast ? (
                  <span className={styles.current} aria-current="page">
                    {item.label}
                  </span>
                ) : item.href ? (
                  <a
                    className={styles.link}
                    href={item.href}
                    data-preview={
                      preview && index === 0 ? preview : undefined
                    }
                  >
                    {item.label}
                  </a>
                ) : (
                  <span>{item.label}</span>
                )}
                {isCollapsed && index === 0 ? (
                  <>
                    <span className={styles.separator} aria-hidden="true">
                      /
                    </span>
                    <span className={styles.ellipsis}>
                      <span aria-hidden="true">…</span>
                      <span className="sr-only">
                        {hiddenCount} hidden breadcrumbs
                      </span>
                    </span>
                  </>
                ) : null}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  },
);
