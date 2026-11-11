import type { HTMLAttributes } from "react";
import { cx } from "../../lib/cx";
import { ArrowLeft, ChevronRight } from "../../icons";
import styles from "./Pagination.module.css";

export type PaginationVariant = "numbered" | "compact";
export type PaginationSize = "sm" | "md";

export interface PaginationProps extends HTMLAttributes<HTMLElement> {
  page: number;
  pageCount: number;
  onPageChange?: (page: number) => void;
  variant?: PaginationVariant;
  size?: PaginationSize;
  label?: string;
  "data-state"?: "hover" | "focus";
}

function pageEntries(page: number, pageCount: number): Array<number | "gap"> {
  if (pageCount <= 7) {
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }

  const entries: Array<number | "gap"> = [1];
  const start = Math.max(2, Math.min(page - 1, pageCount - 4));
  const end = Math.min(pageCount - 1, Math.max(page + 1, 5));

  if (start > 2) entries.push("gap");
  for (let number = start; number <= end; number += 1) entries.push(number);
  if (end < pageCount - 1) entries.push("gap");
  entries.push(pageCount);
  return entries;
}

export function Pagination({
  page,
  pageCount,
  onPageChange,
  variant = "numbered",
  size = "md",
  label = "Pagination",
  className,
  "data-state": dataState,
  ...rest
}: PaginationProps) {
  const pages = pageEntries(page, pageCount);
  const canGoBack = page > 1;
  const canGoForward = page < pageCount;

  function go(next: number) {
    if (next < 1 || next > pageCount || next === page) return;
    onPageChange?.(next);
  }

  return (
    <nav
      aria-label={label}
      className={cx(styles.root, styles[size], className)}
      data-state={dataState}
      {...rest}
    >
      <ul className={styles.list}>
        <li>
          <button
            type="button"
            className={cx(styles.step, styles.arrow)}
            aria-label="Previous page"
            disabled={!canGoBack}
            onClick={() => go(page - 1)}
          >
            <ArrowLeft aria-hidden="true" />
          </button>
        </li>

        {variant === "numbered" ? (
          pages.map((entry, index) =>
            entry === "gap" ? (
              <li key={`gap-${index}`} className={styles.gap} aria-hidden="true">
                …
              </li>
            ) : (
              <li key={entry}>
                <button
                  type="button"
                  className={cx(styles.step, entry === page && styles.current)}
                  aria-label={`Page ${entry}`}
                  aria-current={entry === page ? "page" : undefined}
                  onClick={() => go(entry)}
                >
                  {entry}
                </button>
              </li>
            ),
          )
        ) : (
          <li className={styles.summary} aria-live="polite">
            Page {page} of {pageCount}
          </li>
        )}

        <li>
          <button
            type="button"
            className={cx(styles.step, styles.arrow)}
            aria-label="Next page"
            disabled={!canGoForward}
            onClick={() => go(page + 1)}
          >
            <ChevronRight aria-hidden="true" />
          </button>
        </li>
      </ul>
    </nav>
  );
}
