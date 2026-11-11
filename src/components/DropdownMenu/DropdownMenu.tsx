import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { IconButton } from "../IconButton";
import { cx } from "../cx";
import styles from "./DropdownMenu.module.css";

export interface DropdownMenuItem {
  id: string;
  label: string;
  onSelect?: () => void;
  disabled?: boolean;
  danger?: boolean;
  separatorBefore?: boolean;
}

export interface DropdownMenuProps {
  /** Accessible name of the trigger. */
  label: string;
  items: DropdownMenuItem[];
  align?: "start" | "end";
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Docs-only: forces a contact state on the first enabled item. */
  preview?: "hover" | "focus";
  className?: string;
}

export function DropdownMenu({
  label,
  items,
  align = "end",
  open,
  defaultOpen = false,
  onOpenChange,
  preview,
  className,
}: DropdownMenuProps) {
  const menuId = useId();
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isOpen = open ?? internalOpen;
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const wasOpen = useRef(defaultOpen);
  const firstEnabled = items.findIndex((item) => !item.disabled);

  const setOpen = useCallback(
    (next: boolean) => {
      if (open === undefined) setInternalOpen(next);
      onOpenChange?.(next);
    },
    [open, onOpenChange],
  );

  function closeAndRestore() {
    setOpen(false);
    triggerRef.current?.focus();
  }

  useEffect(() => {
    if (!isOpen) {
      wasOpen.current = false;
      return;
    }

    if (!wasOpen.current) {
      const first = items.findIndex((item) => !item.disabled);
      if (first >= 0) itemRefs.current[first]?.focus();
    }
    wasOpen.current = true;

    function handlePointerDown(event: PointerEvent) {
      if (
        event.target instanceof Node &&
        !wrapperRef.current?.contains(event.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isOpen, items, open, onOpenChange, setOpen]);

  function moveFocus(from: number, direction: 1 | -1) {
    const enabled = items
      .map((item, index) => ({ item, index }))
      .filter(({ item }) => !item.disabled);
    if (enabled.length === 0) return;
    const current = enabled.findIndex(({ index }) => index === from);
    const next =
      current === -1
        ? direction === 1
          ? enabled[0]
          : enabled[enabled.length - 1]
        : enabled[
            (current + direction + enabled.length) % enabled.length
          ];
    if (next) itemRefs.current[next.index]?.focus();
  }

  function handleMenuKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const activeIndex = itemRefs.current.findIndex(
      (item) => item === document.activeElement,
    );

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        moveFocus(activeIndex, 1);
        break;
      case "ArrowUp":
        event.preventDefault();
        moveFocus(activeIndex, -1);
        break;
      case "Home": {
        event.preventDefault();
        const first = items.findIndex((item) => !item.disabled);
        if (first >= 0) itemRefs.current[first]?.focus();
        break;
      }
      case "End": {
        event.preventDefault();
        for (let index = items.length - 1; index >= 0; index -= 1) {
          if (!items[index]?.disabled) {
            itemRefs.current[index]?.focus();
            break;
          }
        }
        break;
      }
      case "Escape":
        event.preventDefault();
        closeAndRestore();
        break;
      case "Tab":
        setOpen(false);
        break;
      default:
        break;
    }
  }

  function select(item: DropdownMenuItem) {
    if (item.disabled) return;
    item.onSelect?.();
    closeAndRestore();
  }

  function handleTriggerClick() {
    setOpen(!isOpen);
  }

  return (
    <div ref={wrapperRef} className={cx(styles.root, className)}>
      <IconButton
        ref={triggerRef}
        label={label}
        icon="more-horizontal"
        variant="solid"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={isOpen ? menuId : undefined}
        onClick={handleTriggerClick}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            setOpen(true);
          }
        }}
      />

      {isOpen ? (
        <div
          ref={menuRef}
          id={menuId}
          role="menu"
          aria-label={label}
          tabIndex={-1}
          className={cx(styles.menu, styles[align])}
          onKeyDown={handleMenuKeyDown}
        >
          {items.map((item, index) => (
            <div key={item.id}>
              {item.separatorBefore ? (
                <div className={styles.separator} role="separator" />
              ) : null}
              <button
                ref={(node) => {
                  itemRefs.current[index] = node;
                }}
                type="button"
                role="menuitem"
                tabIndex={-1}
                disabled={item.disabled}
                data-preview={
                  preview && index === firstEnabled ? preview : undefined
                }
                className={cx(
                  styles.item,
                  item.danger && styles.danger,
                )}
                onClick={() => select(item)}
              >
                <span>{item.label}</span>
                {item.danger ? (
                  <span className={styles.itemHint} aria-hidden="true">
                    Irreversible
                  </span>
                ) : null}
              </button>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
