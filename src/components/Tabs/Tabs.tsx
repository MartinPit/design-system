import {
  useId,
  useRef,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { cx } from "../../lib/cx";
import { useControllableState } from "../../hooks/useControllableState";
import styles from "./Tabs.module.css";

export interface TabItem {
  id: string;
  label: string;
  content?: ReactNode;
  disabled?: boolean;
}

export type TabsVariant = "underline" | "pill";

export interface TabsProps {
  items: TabItem[];
  value?: string;
  defaultValue?: string;
  onChange?: (id: string) => void;
  variant?: TabsVariant;
  label?: string;
  className?: string;
  /** Forces a visual state for the documentation state grid. */
  "data-state"?: "hover" | "focus";
}

export function Tabs({
  items,
  value,
  defaultValue,
  onChange,
  variant = "underline",
  label = "Sections",
  className,
  "data-state": dataState,
}: TabsProps) {
  const baseId = useId();
  const [current, setCurrent] = useControllableState<string>({
    value,
    defaultValue: defaultValue ?? items[0]?.id ?? "",
    onChange,
  });
  const tabs = useRef<Record<string, HTMLButtonElement | null>>({});
  const selected = items.find((item) => item.id === current && !item.disabled);

  function move(from: string, direction: 1 | -1 | "first" | "last") {
    const enabled = items.filter((item) => !item.disabled);
    if (enabled.length === 0) return;
    const index = enabled.findIndex((item) => item.id === from);
    let next = enabled[0];
    if (direction === "last") next = enabled[enabled.length - 1];
    else if (direction !== "first") {
      next = enabled[(index + direction + enabled.length) % enabled.length];
    }
    setCurrent(next.id);
    tabs.current[next.id]?.focus();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, from: string) {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      move(from, 1);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      move(from, -1);
    } else if (event.key === "Home") {
      event.preventDefault();
      move(from, "first");
    } else if (event.key === "End") {
      event.preventDefault();
      move(from, "last");
    }
  }

  return (
    <div className={cx(styles.wrap, className)}>
      <div
        role="tablist"
        aria-label={label}
        data-state={dataState}
        className={cx(styles.tablist, styles[variant])}
      >
        {items.map((item) => {
          const isSelected = item.id === selected?.id;
          const hasPanel = item.content !== undefined;
          return (
            <button
              key={item.id}
              ref={(node) => {
                tabs.current[item.id] = node;
              }}
              id={`${baseId}-tab-${item.id}`}
              type="button"
              role="tab"
              aria-selected={isSelected}
              aria-controls={
                hasPanel ? `${baseId}-panel-${item.id}` : undefined
              }
              tabIndex={isSelected ? 0 : -1}
              disabled={item.disabled}
              className={styles.tab}
              onClick={() => setCurrent(item.id)}
              onKeyDown={(event) => handleKeyDown(event, item.id)}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      {selected?.content !== undefined ? (
        <div
          className={styles.panel}
          id={`${baseId}-panel-${selected.id}`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${selected.id}`}
          tabIndex={0}
        >
          {selected.content}
        </div>
      ) : null}
    </div>
  );
}
