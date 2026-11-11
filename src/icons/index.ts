import type { ComponentType, SVGProps } from "react";
import { ArrowLeft } from "./ArrowLeft";
import { Book } from "./Book";
import { Check } from "./Check";
import { ChevronDown } from "./ChevronDown";
import { ChevronRight } from "./ChevronRight";
import { Clock } from "./Clock";
import { Close } from "./Close";
import { Flame } from "./Flame";
import { Grid } from "./Grid";
import { List } from "./List";
import { Play } from "./Play";
import { Plus } from "./Plus";
import { Search } from "./Search";
import { Shuffle } from "./Shuffle";

export type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export const icons: ReadonlyArray<{ name: string; Icon: IconComponent }> = [
  { name: "Arrow left", Icon: ArrowLeft },
  { name: "Book", Icon: Book },
  { name: "Check", Icon: Check },
  { name: "Chevron down", Icon: ChevronDown },
  { name: "Chevron right", Icon: ChevronRight },
  { name: "Clock", Icon: Clock },
  { name: "Close", Icon: Close },
  { name: "Flame", Icon: Flame },
  { name: "Grid", Icon: Grid },
  { name: "List", Icon: List },
  { name: "Play", Icon: Play },
  { name: "Plus", Icon: Plus },
  { name: "Search", Icon: Search },
  { name: "Shuffle", Icon: Shuffle },
];

export {
  ArrowLeft,
  Book,
  Check,
  ChevronDown,
  ChevronRight,
  Clock,
  Close,
  Flame,
  Grid,
  List,
  Play,
  Plus,
  Search,
  Shuffle,
};
