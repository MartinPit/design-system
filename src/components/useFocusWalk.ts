import type { MutableRefObject } from "react";

interface FocusWalkItem {
  disabled?: boolean;
}

/**
 * Shared roving-focus walk for Tabs and DropdownMenu.
 * Focuses the target and returns its index, or null when nothing is enabled.
 */
export function useFocusWalk<T extends HTMLElement>(
  items: readonly FocusWalkItem[],
  refs: MutableRefObject<Array<T | null>>,
) {
  function focusAt(index: number): number {
    refs.current[index]?.focus();
    return index;
  }

  function moveFocus(from: number, direction: 1 | -1): number | null {
    if (items.length === 0) return null;
    let index = from;
    for (let step = 0; step < items.length; step += 1) {
      index = (index + direction + items.length) % items.length;
      if (!items[index]?.disabled) return focusAt(index);
    }
    return null;
  }

  function focusFirst(): number | null {
    const index = items.findIndex((item) => !item.disabled);
    return index >= 0 ? focusAt(index) : null;
  }

  function focusLast(): number | null {
    for (let index = items.length - 1; index >= 0; index -= 1) {
      if (!items[index]?.disabled) return focusAt(index);
    }
    return null;
  }

  return { moveFocus, focusFirst, focusLast };
}
