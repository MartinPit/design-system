import { useCallback, useEffect, useState } from "react";

export interface FoundationPage {
  slug: string;
  name: string;
}

export const foundationPages: FoundationPage[] = [
  { slug: "colour", name: "Colour" },
  { slug: "type", name: "Type" },
  { slug: "space", name: "Space" },
  { slug: "shape", name: "Shape" },
  { slug: "elevation", name: "Elevation" },
  { slug: "motion", name: "Motion" },
  { slug: "icons", name: "Icons" },
];

export type Route =
  | { kind: "overview" }
  | { kind: "foundation"; slug: string }
  | { kind: "component"; id: string }
  | { kind: "accessibility" };

export const routes = {
  overview: "#/overview",
  accessibility: "#/accessibility",
  foundation: (slug: string) => `#/foundations/${slug}`,
  component: (id: string) => `#/components/${id}`,
};

export function parseHash(hash: string): Route {
  const path = hash.replace(/^#\/?/, "").replace(/\/$/, "");
  const parts = path.split("/").filter(Boolean);

  if (parts[0] === "foundations" && parts[1]) {
    return { kind: "foundation", slug: parts[1] };
  }
  if (parts[0] === "components" && parts[1]) {
    return { kind: "component", id: parts[1] };
  }
  if (parts[0] === "accessibility") {
    return { kind: "accessibility" };
  }
  return { kind: "overview" };
}

export function useHashRoute(): Route {
  const [route, setRoute] = useState<Route>(() => parseHash(window.location.hash));
  const [key, setKey] = useState(0);

  useEffect(() => {
    const onChange = () => {
      setRoute(parseHash(window.location.hash));
      setKey((current) => current + 1);
    };
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
  }, [key]);

  return route;
}

export function useNavigate() {
  return useCallback((href: string) => {
    window.location.hash = href.replace(/^#/, "");
  }, []);
}
