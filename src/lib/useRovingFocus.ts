import { useRef, type KeyboardEvent } from "react";

interface RovingFocusOptions {
  ids: readonly string[];
  isDisabled: (id: string) => boolean;
  onMove: (id: string) => void;
}

/**
 * Shared arrow/Home/End walk for a composite control. The caller owns the
 * element refs through `getRef`, and `onMove` updates selection.
 */
export function useRovingFocus<T extends HTMLElement>({
  ids,
  isDisabled,
  onMove,
}: RovingFocusOptions) {
  const refs = useRef<Record<string, T | null>>({});

  function getRef(id: string) {
    return (node: T | null) => {
      refs.current[id] = node;
    };
  }

  function handleKeyDown(event: KeyboardEvent<HTMLElement>, from: string) {
    const enabled = ids.filter((id) => !isDisabled(id));
    if (enabled.length === 0) return;

    const index = enabled.indexOf(from);
    let next: string | undefined;
    const backwards = event.key === "ArrowLeft" || event.key === "ArrowUp";

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      next = index < 0 ? enabled[0] : enabled[(index + 1) % enabled.length];
    } else if (backwards) {
      next =
        index < 0
          ? enabled[enabled.length - 1]
          : enabled[(index - 1 + enabled.length) % enabled.length];
    } else if (event.key === "Home") {
      next = enabled[0];
    } else if (event.key === "End") {
      next = enabled[enabled.length - 1];
    }

    if (!next) return;
    event.preventDefault();
    onMove(next);
    refs.current[next]?.focus();
  }

  return { getRef, handleKeyDown };
}
