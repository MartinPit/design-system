import { Link } from "../../components/Link";
import type { SpecimenItem } from "../types";
import styles from "./demo.module.css";

export function LinkDemo() {
  return (
    <div className={styles.stack}>
      <p className={styles.linkCopy}>
        Return to the <Link href="#/overview">design index</Link> to compare the
        two systems, or read the{" "}
        <Link href="#/foundations/colour">colour foundation</Link> before
        choosing a surface.
      </p>
      <Link href="#/components/button" variant="standalone">
        Read the Button spec
      </Link>
    </div>
  );
}

export const linkVariants: SpecimenItem[] = [
  {
    label: "Inline / inherit",
    content: <Link href="#/overview">design index</Link>,
  },
  {
    label: "Inline / sm",
    content: (
      <Link href="#/overview" size="sm">
        design index
      </Link>
    ),
  },
  {
    label: "Standalone / inherit",
    content: (
      <Link href="#/components/tabs" variant="standalone">
        Read the Tabs spec
      </Link>
    ),
  },
  {
    label: "Standalone / sm",
    content: (
      <Link href="#/components/tabs" variant="standalone" size="sm">
        Read the Tabs spec
      </Link>
    ),
  },
];

export const linkStates: SpecimenItem[] = [
  {
    label: "Default",
    content: <Link href="#/overview">design index</Link>,
  },
  {
    label: "Hover",
    content: (
      <Link href="#/overview" data-state="hover">
        design index
      </Link>
    ),
  },
  {
    label: "Focus visible",
    content: (
      <Link href="#/overview" data-state="focus">
        design index
      </Link>
    ),
  },
  {
    label: "Visited",
    content: (
      <Link href="#/overview" data-state="visited">
        design index
      </Link>
    ),
  },
  {
    label: "Disabled",
    content: <Link disabled>design index</Link>,
  },
];
