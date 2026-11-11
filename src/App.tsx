import type { ComponentType } from "react";
import type { Route } from "./docs/routes";
import { useHashRoute } from "./docs/routes";
import { Shell } from "./docs/Shell";
import { getComponent } from "./docs/registry";
import { OverviewPage } from "./docs/pages/OverviewPage";
import { ColourPage } from "./docs/pages/ColourPage";
import { TypePage } from "./docs/pages/TypePage";
import { SpacePage } from "./docs/pages/SpacePage";
import { ShapePage } from "./docs/pages/ShapePage";
import { ElevationPage } from "./docs/pages/ElevationPage";
import { MotionPage } from "./docs/pages/MotionPage";
import { IconsPage } from "./docs/pages/IconsPage";
import { AccessibilityPage } from "./docs/pages/AccessibilityPage";
import { ComponentPage } from "./docs/pages/ComponentPage";

const foundations: Record<string, ComponentType> = {
  colour: ColourPage,
  type: TypePage,
  space: SpacePage,
  shape: ShapePage,
  elevation: ElevationPage,
  motion: MotionPage,
  icons: IconsPage,
};

function RouteView({ route }: { route: Route }) {
  if (route.kind === "foundation") {
    const Page = foundations[route.slug];
    return Page ? <Page /> : <OverviewPage />;
  }

  if (route.kind === "component") {
    const spec = getComponent(route.id);
    return spec ? <ComponentPage spec={spec} /> : <OverviewPage />;
  }

  if (route.kind === "accessibility") {
    return <AccessibilityPage />;
  }

  return <OverviewPage />;
}

export default function App() {
  const route = useHashRoute();

  return (
    <Shell route={route}>
      <RouteView route={route} />
    </Shell>
  );
}
