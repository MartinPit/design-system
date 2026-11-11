import { useEffect } from "react";
import { Shell } from "./docs/Shell";
import { useHashRoute } from "./docs/useHashRoute";
import { OverviewPage } from "./docs/Overview";
import { FoundationsPage } from "./docs/foundations/FoundationsPage";
import { ComponentPage } from "./docs/ComponentPage";
import { AccessibilityPage } from "./docs/Accessibility";
import { findComponent } from "./docs/registry";
import { foundationPages } from "./docs/routes";
import type { DocsRoute } from "./docs/routes";

function effectiveRoute(route: DocsRoute): DocsRoute {
  if (route.kind === "components" && !findComponent(route.slug)) {
    return { kind: "overview" };
  }
  return route;
}

function routeTitle(route: DocsRoute): string {
  switch (route.kind) {
    case "foundations": {
      const page = foundationPages.find((item) => item.slug === route.slug);
      return page ? `Foundations / ${page.name}` : "Foundations";
    }
    case "components": {
      const component = findComponent(route.slug);
      return component ? `Components / ${component.name}` : "Overview";
    }
    case "accessibility":
      return "Accessibility";
    case "overview":
    default:
      return "Overview";
  }
}

function RouteView({ route }: { route: DocsRoute }) {
  switch (route.kind) {
    case "foundations":
      return <FoundationsPage slug={route.slug} />;
    case "components": {
      const component = findComponent(route.slug);
      return component ? (
        <ComponentPage doc={component} />
      ) : (
        <OverviewPage />
      );
    }
    case "accessibility":
      return <AccessibilityPage />;
    case "overview":
    default:
      return <OverviewPage />;
  }
}

export default function App() {
  const rawRoute = useHashRoute();
  const route = effectiveRoute(rawRoute);

  useEffect(() => {
    document.title = `${routeTitle(route)} — Tidal`;
  }, [route]);

  useEffect(() => {
    if (!window.location.hash) {
      window.history.replaceState(null, "", "#/overview");
    }
  }, []);

  useEffect(() => {
    try {
      window.scrollTo(0, 0);
    } catch {
      // jsdom does not implement scrolling; the browser path does.
    }
  }, [route]);

  return (
    <Shell route={route}>
      <RouteView route={route} />
    </Shell>
  );
}
