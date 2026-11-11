import {
  useEffect,
  useId,
  useRef,
  type KeyboardEvent,
} from "react";
import { cx } from "../../lib/cx";
import { getFocusable } from "../../lib/focus";
import { useControllableState } from "../../hooks/useControllableState";
import { ChevronDown } from "../../icons";
import { Button } from "../Button";
import styles from "./DropdownMenu.module.css";

export interface DropdownMenuItem {
  id: string;
  label: string;
  danger?: boolean;
  disabled?: boolean;
  separatorBefore?: boolean;
}

export interface DropdownMenuProps {
  items: DropdownMenuItem[];
  triggerLabel?: string;
  label?: string;
  onSelect?: (id: string) => void;
  align?: "start" | "end";
  size?: "sm" | "md";
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  inline?: boolean;
  className?: string;
  "data-state"?: "hover" | "focus";
}

export function DropdownMenu({
  items,
  triggerLabel = "Actions",
  label,
  onSelect,
  align = "start",
  size = "md",
  open,
  defaultOpen = false,
  onOpenChange,
  inline = false,
  className,
  "data-state": dataState,
}: DropdownMenuProps) {
  const menuId = useId();
  const trigger = useRef<HTMLButtonElement>(null);
  const root = useRef<HTMLDivElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useControllableState({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });

  useEffect(() => {
    if (!expanded || inline) return;
    const node = menu.current;
    if (!node) return;
    getFocusable(node)[0]?.focus();
  }, [expanded, inline]);

  useEffect(() => {
    if (!expanded || inline) return;
    function handlePointerDown(event: PointerEvent) {
      if (!root.current?.contains(event.target as Node)) {
        setExpanded(false);
      }
    }
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [expanded, inline, setExpanded]);

  function closeAndReturnFocus() {
    setExpanded(false);
    trigger.current?.focus();
  }

  function handleMenuKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const node = menu.current;
    if (!node) return;
    const menuItems = Array.from(
      node.querySelectorAll<HTMLButtonElement>('[role="menuitem"]:not(:disabled)'),
    );
    if (menuItems.length === 0) return;
    const current = menuItems.indexOf(
      document.activeElement as HTMLButtonElement,
    );

    if (event.key === "ArrowDown") {
      event.preventDefault();
      menuItems[(current + 1 + menuItems.length) % menuItems.length].focus();
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      menuItems[(current - 1 + menuItems.length) % menuItems.length].focus();
    } else if (event.key === "Home") {
      event.preventDefault();
      menuItems[0].focus();
    } else if (event.key === "End") {
      event.preventDefault();
      menuItems[menuItems.length - 1].focus();
    } else if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      closeAndReturnFocus();
    } else if (event.key === "Tab") {
      setExpanded(false);
    }
  }

  return (
    <div
      ref={root}
      className={cx(styles.root, align === "end" && styles.end, className)}
      data-state={dataState}
    >
      <Button
        ref={trigger}
        variant="secondary"
        size={size}
        aria-haspopup="menu"
        aria-expanded={expanded}
        aria-controls={expanded ? menuId : undefined}
        onClick={() => setExpanded(!expanded)}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" && !expanded) {
            event.preventDefault();
            setExpanded(true);
          }
        }}
      >
        {triggerLabel}
        <ChevronDown className={styles.chevron} />
      </Button>

      {expanded ? (
        <div
          ref={menu}
          id={menuId}
          role="menu"
          aria-label={label ?? triggerLabel}
          tabIndex={-1}
          className={cx(
            styles.menu,
            styles[size],
            inline && styles.menuInline,
          )}
          onKeyDown={handleMenuKeyDown}
        >
          {items.map((item) => (
            <div key={item.id} className={styles.itemWrap}>
              {item.separatorBefore ? (
                <div role="separator" className={styles.separator} />
              ) : null}
              <button
                type="button"
                role="menuitem"
                className={cx(styles.item, item.danger && styles.danger)}
                disabled={item.disabled}
                onClick={() => {
                  onSelect?.(item.id);
                  closeAndReturnFocus();
                }}
              >
                {item.label}
              </button>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
