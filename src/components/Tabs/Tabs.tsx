import {
  forwardRef,
  useId,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { cx } from "../../lib/cx";
import { useRovingFocus } from "../../lib/useRovingFocus";
import { useControllableState } from "../../hooks/useControllableState";
import styles from "./Tabs.module.css";

export interface TabItem {
  id: string;
  label: string;
  content?: ReactNode;
  disabled?: boolean;
}

export type TabsVariant = "underline" | "pill";

export interface TabsProps
  extends Omit<
    HTMLAttributes<HTMLDivElement>,
    "onChange" | "value" | "defaultValue" | "children"
  > {
  items: TabItem[];
  value?: string;
  defaultValue?: string;
  onChange?: (id: string) => void;
  variant?: TabsVariant;
  label?: string;
  /** Forces a visual state for the documentation state grid. */
  "data-state"?: "hover" | "focus";
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(function Tabs(
  {
    items,
    value,
    defaultValue,
    onChange,
    variant = "underline",
    label = "Sections",
    className,
    "data-state": dataState,
    ...rest
  },
  ref,
) {
  const baseId = useId();
  const [current, setCurrent] = useControllableState<string>({
    value,
    defaultValue: defaultValue ?? items[0]?.id ?? "",
    onChange,
  });
  const selected = items.find((item) => item.id === current && !item.disabled);
  const activeTab = selected ?? items.find((item) => !item.disabled);
  const roving = useRovingFocus<HTMLButtonElement>({
    ids: items.map((item) => item.id),
    isDisabled: (id) => Boolean(items.find((item) => item.id === id)?.disabled),
    onMove: setCurrent,
  });

  return (
    <div
      ref={ref}
      className={cx(styles.wrap, className)}
      {...rest}
    >
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
              ref={roving.getRef(item.id)}
              id={`${baseId}-tab-${item.id}`}
              type="button"
              role="tab"
              aria-selected={isSelected}
              aria-controls={
                isSelected && hasPanel
                  ? `${baseId}-panel-${item.id}`
                  : undefined
              }
              tabIndex={item.id === activeTab?.id ? 0 : -1}
              disabled={item.disabled}
              className={styles.tab}
              onClick={() => setCurrent(item.id)}
              onKeyDown={(event) => roving.handleKeyDown(event, item.id)}
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
});
