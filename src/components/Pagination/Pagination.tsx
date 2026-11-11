import { forwardRef } from "react";
import { IconButton } from "../IconButton";
import { cx } from "../cx";
import styles from "./Pagination.module.css";

export type PaginationVariant = "numbered" | "compact";
export type PaginationSize = "sm" | "md";

export interface PaginationProps {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  variant?: PaginationVariant;
  size?: PaginationSize;
  label?: string;
  /** Docs-only: forces a contact state into a state grid. */
  preview?: "hover" | "focus";
  className?: string;
}

type PageEntry = number | "ellipsis";

function pageEntries(page: number, pageCount: number): PageEntry[] {
  if (pageCount <= 7) {
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }

  const start = Math.max(2, page - 1);
  const end = Math.min(pageCount - 1, page + 1);
  const entries: PageEntry[] = [1];
  if (start > 2) entries.push("ellipsis");
  for (let value = start; value <= end; value += 1) entries.push(value);
  if (end < pageCount - 1) entries.push("ellipsis");
  entries.push(pageCount);
  return entries;
}

export const Pagination = forwardRef<HTMLElement, PaginationProps>(
  function Pagination(
    {
      page,
      pageCount,
      onPageChange,
      variant = "numbered",
      size = "md",
      label = "Pagination",
      preview,
      className,
    },
    ref,
  ) {
    const canPrevious = page > 1;
    const canNext = page < pageCount;

    return (
      <nav
        ref={ref}
        aria-label={label}
        className={cx(styles.root, styles[size], className)}
      >
        <IconButton
          label="Previous page"
          icon="chevron-left"
          size={size === "sm" ? "sm" : "md"}
          disabled={!canPrevious}
          onClick={() => onPageChange(page - 1)}
        />

        {variant === "compact" ? (
          <span className={styles.summary}>
            Page {page} of {pageCount}
          </span>
        ) : (
          <ol className={styles.pages}>
            {pageEntries(page, pageCount).map((entry, index) =>
              entry === "ellipsis" ? (
                <li className={styles.ellipsis} key={`ellipsis-${index}`}>
                  <span aria-hidden="true">…</span>
                  <span className="sr-only">More pages</span>
                </li>
              ) : (
                <li key={entry}>
                  <button
                    type="button"
                    className={cx(
                      styles.page,
                      entry === page && styles.current,
                    )}
                    aria-label={`Page ${entry}`}
                    aria-current={entry === page ? "page" : undefined}
                    data-preview={
                      preview && entry === 1 ? preview : undefined
                    }
                    onClick={() => onPageChange(entry)}
                  >
                    {entry}
                  </button>
                </li>
              ),
            )}
          </ol>
        )}

        <IconButton
          label="Next page"
          icon="chevron-right"
          size={size === "sm" ? "sm" : "md"}
          disabled={!canNext}
          onClick={() => onPageChange(page + 1)}
        />
      </nav>
    );
  },
);
