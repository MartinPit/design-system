import {
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { cx } from "../../lib/cx";
import { ChevronDown } from "../../icons";
import styles from "./Table.module.css";

export type TableVariant = "default" | "striped" | "compact";

export interface TableColumn<T> {
  key: string;
  header: string;
  sortable?: boolean;
  align?: "start" | "end";
  render: (row: T) => ReactNode;
}

export interface TableProps<T> {
  columns: TableColumn<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  caption: string;
  variant?: TableVariant;
  sort?: { key: string; direction: "asc" | "desc" };
  onSort?: (key: string) => void;
  selectedKeys?: string[];
  onSelectionChange?: (keys: string[]) => void;
  getRowLabel?: (row: T) => string;
  loading?: boolean;
  empty?: ReactNode;
  className?: string;
  "data-state"?: "hover";
}

export function Table<T>({
  columns,
  rows,
  rowKey,
  caption,
  variant = "default",
  sort,
  onSort,
  selectedKeys = [],
  onSelectionChange,
  getRowLabel,
  loading = false,
  empty = "No records match this view.",
  className,
  "data-state": dataState,
}: TableProps<T>) {
  const selectable = onSelectionChange !== undefined;
  const selected = new Set(selectedKeys);
  const allSelected =
    rows.length > 0 && rows.every((row) => selected.has(rowKey(row)));
  const someSelected = selectedKeys.length > 0 && !allSelected;
  const selectAll = useRef<HTMLInputElement>(null);
  const columnCount = columns.length + (selectable ? 1 : 0);

  useEffect(() => {
    if (selectAll.current) selectAll.current.indeterminate = someSelected;
  }, [someSelected]);

  function toggleAll() {
    onSelectionChange?.(allSelected ? [] : rows.map(rowKey));
  }

  function toggleRow(key: string) {
    const next = new Set(selected);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    onSelectionChange?.(Array.from(next));
  }

  return (
    <div
      className={cx(styles.scroll, styles[variant], className)}
      data-state={dataState}
      role="region"
      aria-label={`${caption}, scrollable`}
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- horizontal scroll must be keyboard reachable
      tabIndex={0}
    >
      <table className={styles.table} aria-busy={loading || undefined}>
        <caption className={styles.caption}>{caption}</caption>
        <thead>
          <tr>
            {selectable ? (
              <th scope="col" className={styles.checkCell}>
                <input
                  ref={selectAll}
                  type="checkbox"
                  aria-label="Select all rows"
                  checked={allSelected}
                  onChange={toggleAll}
                />
              </th>
            ) : null}
            {columns.map((column) => {
              const active = sort?.key === column.key;
              const ariaSort = active
                ? sort.direction === "asc"
                  ? "ascending"
                  : "descending"
                : column.sortable
                  ? "none"
                  : undefined;
              return (
                <th
                  key={column.key}
                  scope="col"
                  aria-sort={ariaSort}
                  className={cx(
                    column.align === "end" && styles.alignEnd,
                    styles.headCell,
                  )}
                >
                  {column.sortable && onSort ? (
                    <button
                      type="button"
                      className={styles.sortButton}
                      onClick={() => onSort(column.key)}
                    >
                      {column.header}
                      <ChevronDown
                        className={cx(
                          styles.sortIcon,
                          active && sort.direction === "asc" && styles.asc,
                        )}
                      />
                    </button>
                  ) : (
                    column.header
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columnCount} className={styles.stateCell}>
                <span className={styles.loading} role="status">
                  <span className={styles.loadingBar} aria-hidden="true" />
                  Loading rows
                </span>
              </td>
            </tr>
          ) : rows.length === 0 ? (
            <tr>
              <td colSpan={columnCount} className={styles.stateCell}>
                <div className={styles.empty}>{empty}</div>
              </td>
            </tr>
          ) : (
            rows.map((row) => {
              const key = rowKey(row);
              const isSelected = selected.has(key);
              return (
                <tr
                  key={key}
                  aria-selected={selectable ? isSelected : undefined}
                  className={isSelected ? styles.selectedRow : undefined}
                >
                  {selectable ? (
                    <td className={styles.checkCell}>
                      <input
                        type="checkbox"
                        aria-label={
                          getRowLabel
                            ? `Select ${getRowLabel(row)}`
                            : `Select row ${key}`
                        }
                        checked={isSelected}
                        onChange={() => toggleRow(key)}
                      />
                    </td>
                  ) : null}
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={cx(column.align === "end" && styles.alignEnd)}
                    >
                      {column.render(row)}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
