export type DocsRoute =
  | { kind: "overview" }
  | { kind: "foundations"; slug: string }
  | { kind: "components"; slug: string }
  | { kind: "accessibility" };

export const foundationPages = [
  { slug: "colour", name: "Colour" },
  { slug: "type", name: "Type" },
  { slug: "space", name: "Space" },
  { slug: "shape", name: "Shape" },
  { slug: "elevation", name: "Elevation" },
  { slug: "motion", name: "Motion" },
  { slug: "icons", name: "Icons" },
] as const;

export type FoundationSlug = (typeof foundationPages)[number]["slug"];

export const foundationSlugs: readonly string[] = foundationPages.map(
  (page) => page.slug,
);

export function parseRoute(hash: string): DocsRoute {
  const path = hash.replace(/^#\/?/, "").replace(/\/+$/, "");
  const [section, slug] = path.split("/");

  if (section === "foundations" && slug && foundationSlugs.includes(slug)) {
    return { kind: "foundations", slug };
  }
  if (section === "components" && slug) {
    return { kind: "components", slug };
  }
  if (section === "accessibility") {
    return { kind: "accessibility" };
  }
  return { kind: "overview" };
}

export function routeHref(route: DocsRoute): string {
  switch (route.kind) {
    case "foundations":
      return `#/foundations/${route.slug}`;
    case "components":
      return `#/components/${route.slug}`;
    case "accessibility":
      return "#/accessibility";
    case "overview":
    default:
      return "#/overview";
  }
}
