import { useCallback, useState } from "react";

interface ControllableOptions<T> {
  value?: T;
  defaultValue: T;
  onChange?: (next: T) => void;
}

/** Controlled when `value` is supplied, otherwise owns the state. */
export function useControllableState<T>({
  value,
  defaultValue,
  onChange,
}: ControllableOptions<T>): [T, (next: T) => void] {
  const [internal, setInternal] = useState(defaultValue);
  const isControlled = value !== undefined;
  const current = isControlled ? value : internal;

  const set = useCallback(
    (next: T) => {
      if (!isControlled) setInternal(next);
      onChange?.(next);
    },
    [isControlled, onChange],
  );

  return [current, set];
}
