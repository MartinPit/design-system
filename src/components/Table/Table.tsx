import { useState } from "react";
import type { ReactNode } from "react";
import { Icon } from "../../icons/Icon";
import { Checkbox } from "../Checkbox";
import { Skeleton } from "../Skeleton";
import { cx } from "../cx";
import styles from "./Table.module.css";

export type TableVariant = "default" | "striped" | "compact";
export type SortDirection = "ascending" | "descending";

export interface TableColumn {
  key: string;
  header: string;
  sortable?: boolean;
  align?: "start" | "end" | "center";
  width?: string;
}

export interface TableSort {
  key: string;
  direction: SortDirection;
}

export type TableRow = Record<string, ReactNode>;

export interface TableProps {
  caption?: string;
  columns: TableColumn[];
  rows: TableRow[];
  getRowId: (row: TableRow, index: number) => string;
  getRowLabel?: (row: TableRow, index: number) => string;
  variant?: TableVariant;
  selectable?: boolean;
  selectedIds?: string[];
  onSelectionChange?: (ids: string[]) => void;
  sort?: TableSort | null;
  defaultSort?: TableSort | null;
  onSortChange?: (sort: TableSort) => void;
  loading?: boolean;
  emptyMessage?: string;
  /** Docs-only: forces a row's hover style into a state grid. */
  previewRowId?: string;
  className?: string;
}

export function Table({
  caption,
  columns,
  rows,
  getRowId,
  getRowLabel,
  variant = "default",
  selectable = false,
  selectedIds,
  onSelectionChange,
  sort,
  defaultSort = null,
  onSortChange,
  loading = false,
  emptyMessage = "No cards to show.",
  previewRowId,
  className,
}: TableProps) {
  const [internalSort, setInternalSort] = useState<TableSort | null>(defaultSort);
  const [internalSelected, setInternalSelected] = useState<string[]>([]);
  const activeSort = sort !== undefined ? sort : internalSort;
  const selected = selectedIds ?? internalSelected;
  const columnCount = columns.length + (selectable ? 1 : 0);
  const rowIds = rows.map((row, index) => getRowId(row, index));
  const allSelected = rowIds.length > 0 && rowIds.every((id) => selected.includes(id));
  const someSelected = rowIds.some((id) => selected.includes(id)) && !allSelected;

  function handleSort(column: TableColumn) {
    if (!column.sortable) return;
    const direction: SortDirection =
      activeSort?.key === column.key && activeSort.direction === "ascending"
        ? "descending"
        : "ascending";
    const next = { key: column.key, direction };
    if (sort === undefined) setInternalSort(next);
    onSortChange?.(next);
  }

  function updateSelection(ids: string[]) {
    if (selectedIds === undefined) setInternalSelected(ids);
    onSelectionChange?.(ids);
  }

  function toggleAll() {
    updateSelection(allSelected ? [] : rowIds);
  }

  function toggleRow(id: string) {
    updateSelection(
      selected.includes(id)
        ? selected.filter((value) => value !== id)
        : [...selected, id],
    );
  }

  return (
    <div className={cx(styles.wrap, className)}>
      <table
        className={cx(
          styles.table,
          variant === "striped" && styles.striped,
          variant === "compact" && styles.compact,
        )}
        aria-busy={loading || undefined}
      >
        {caption ? <caption className="sr-only">{caption}</caption> : null}
        <thead>
          <tr>
            {selectable ? (
              <th scope="col" className={styles.selectCell}>
                <Checkbox
                  size="sm"
                  label={<span className="sr-only">Select all rows</span>}
                  checked={allSelected}
                  indeterminate={someSelected}
                  disabled={loading || rows.length === 0}
                  onChange={toggleAll}
                />
              </th>
            ) : null}
            {columns.map((column) => {
              const isSorted = activeSort?.key === column.key;
              return (
                <th
                  key={column.key}
                  scope="col"
                  style={{ width: column.width }}
                  aria-sort={
                    column.sortable
                      ? isSorted
                        ? activeSort?.direction
                        : "none"
                      : undefined
                  }
                  className={cx(
                    styles[column.align ?? "start"],
                    isSorted && styles.sorted,
                  )}
                >
                  {column.sortable ? (
                    <button
                      type="button"
                      className={styles.sortButton}
                      onClick={() => handleSort(column)}
                    >
                      <span>{column.header}</span>
                      <Icon
                        name={
                          isSorted && activeSort?.direction === "descending"
                            ? "arrow-down"
                            : "arrow-up"
                        }
                        size={14}
                        className={cx(
                          styles.sortIcon,
                          !isSorted && styles.sortIdle,
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
            Array.from({ length: 3 }, (_, index) => (
              <tr key={`skeleton-${index}`}>
                {selectable ? (
                  <td className={styles.selectCell}>
                    <Skeleton variant="circle" size="sm" />
                  </td>
                ) : null}
                {columns.map((column) => (
                  <td key={column.key}>
                    <Skeleton variant="text" size="sm" />
                  </td>
                ))}
              </tr>
            ))
          ) : rows.length === 0 ? (
            <tr>
              <td className={styles.empty} colSpan={columnCount}>
                <Icon name="layers" size={20} />
                <span>{emptyMessage}</span>
              </td>
            </tr>
          ) : (
            rows.map((row, index) => {
              const id = getRowId(row, index);
              const isSelected = selected.includes(id);
              return (
                <tr
                  key={id}
                  className={cx(
                    isSelected && styles.selectedRow,
                    id === previewRowId && styles.previewRow,
                  )}
                >
                  {selectable ? (
                    <td className={styles.selectCell}>
                      <Checkbox
                        size="sm"
                        label={
                          <span className="sr-only">
                            Select {getRowLabel?.(row, index) ?? id}
                          </span>
                        }
                        checked={isSelected}
                        onChange={() => toggleRow(id)}
                      />
                    </td>
                  ) : null}
                  {columns.map((column) => (
                    <td key={column.key} className={styles[column.align ?? "start"]}>
                      {row[column.key]}
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
