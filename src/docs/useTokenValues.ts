import { useEffect, useState } from "react";

/**
 * Reads CSS custom properties from the document root. The docs never keep a
 * second copy of a token value, so a swatch cannot drift from the stylesheet.
 */
export function useTokenValues(
  names: readonly string[],
): Record<string, string> {
  if (typeof document === "undefined") return {};

  const computed = getComputedStyle(document.documentElement);
  const values: Record<string, string> = {};
  for (const name of names) {
    values[name] = computed.getPropertyValue(name).trim();
  }
  return values;
}

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() => {
    if (typeof window.matchMedia !== "function") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const listener = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener("change", listener);
    return () => query.removeEventListener("change", listener);
  }, []);

  return reduced;
}
