import { useEffect, useState } from "react";
import { parseRoute } from "./routes";
import type { DocsRoute } from "./routes";

function currentHash(): string {
  return typeof window === "undefined" ? "" : window.location.hash;
}

export function useHashRoute(): DocsRoute {
  const [hash, setHash] = useState(currentHash);

  useEffect(() => {
    function handleChange() {
      setHash(currentHash());
    }
    window.addEventListener("hashchange", handleChange);
    return () => window.removeEventListener("hashchange", handleChange);
  }, []);

  return parseRoute(hash);
}
