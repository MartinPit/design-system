import {
  forwardRef,
  useId,
  useRef,
  useState,
} from "react";
import type { HTMLAttributes, KeyboardEvent, ReactNode } from "react";
import { cx } from "../cx";
import { useFocusWalk } from "../useFocusWalk";
import styles from "./Tabs.module.css";

export type TabsVariant = "underline" | "pill";

export interface TabItem {
  id: string;
  label: string;
  content?: ReactNode;
  disabled?: boolean;
}

export interface TabsProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  tabs: TabItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (id: string) => void;
  variant?: TabsVariant;
  label?: string;
  /** Docs-only: forces one contact state into a state grid. */
  preview?: "hover" | "focus";
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(function Tabs(
  {
    tabs,
    value,
    defaultValue,
    onValueChange,
    variant = "underline",
    className,
    label,
    preview,
    ...rest
  },
  ref,
) {
  const baseId = useId();
  const firstEnabled = tabs.find((tab) => !tab.disabled)?.id ?? tabs[0]?.id ?? "";
  const initial = defaultValue ?? firstEnabled;
  const [internal, setInternal] = useState(
    tabs.some((tab) => tab.id === initial && !tab.disabled) ? initial : firstEnabled,
  );
  const selected = value ?? internal;
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const walk = useFocusWalk(tabs, tabRefs);

  const selectedIndex = tabs.findIndex((tab) => tab.id === selected);
  const activeTab =
    tabs[selectedIndex] ?? tabs.find((tab) => !tab.disabled) ?? tabs[0];

  function select(id: string) {
    if (value === undefined) setInternal(id);
    onValueChange?.(id);
  }

  function moveSelection(from: number, direction: 1 | -1) {
    const index = walk.moveFocus(from, direction);
    if (index !== null) select(tabs[index]!.id);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    switch (event.key) {
      case "ArrowRight":
        event.preventDefault();
        moveSelection(index, 1);
        break;
      case "ArrowLeft":
        event.preventDefault();
        moveSelection(index, -1);
        break;
      case "Home": {
        event.preventDefault();
        const first = walk.focusFirst();
        if (first !== null) select(tabs[first]!.id);
        break;
      }
      case "End": {
        event.preventDefault();
        const last = walk.focusLast();
        if (last !== null) select(tabs[last]!.id);
        break;
      }
      default:
        break;
    }
  }

  return (
    <div ref={ref} className={cx(styles.root, className)} {...rest}>
      <div
        role="tablist"
        aria-label={label}
        aria-orientation="horizontal"
        className={cx(styles.list, styles[variant])}
      >
        {tabs.map((tab, index) => {
          const isSelected = tab.id === selected;
          return (
            <button
              key={tab.id}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${tab.id}`}
              aria-selected={isSelected}
              aria-controls={`${baseId}-panel-${tab.id}`}
              tabIndex={isSelected ? 0 : -1}
              disabled={tab.disabled}
              data-preview={preview && index === 0 ? preview : undefined}
              className={cx(styles.tab, isSelected && styles.selected)}
              onClick={() => select(tab.id)}
              onKeyDown={(event) => handleKeyDown(event, index)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      {activeTab ? (
        <div
          role="tabpanel"
          id={`${baseId}-panel-${activeTab.id}`}
          aria-labelledby={`${baseId}-tab-${activeTab.id}`}
          tabIndex={0}
          className={styles.panel}
        >
          {activeTab.content}
        </div>
      ) : null}
    </div>
  );
});
