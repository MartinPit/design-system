import { Breadcrumb } from "../../components/Breadcrumb";
import type { SpecimenItem } from "../types";
import styles from "./demo.module.css";

const trail = [
  { label: "Decks", href: "#/overview" },
  { label: "Kanji N3", href: "#/components/card" },
  { label: "Cards" },
];

const longTrail = [
  { label: "Decks", href: "#/overview" },
  { label: "Kanji N3", href: "#/components/card" },
  { label: "Grammar", href: "#/components/card" },
  { label: "Particles", href: "#/components/card" },
  { label: "Cards" },
];

export function BreadcrumbDemo() {
  return (
    <div className={styles.stack}>
      <Breadcrumb items={trail} label="Deck breadcrumb" />
    </div>
  );
}

export const breadcrumbVariants: SpecimenItem[] = [
  {
    label: "Default",
    content: <Breadcrumb items={trail} label="Breadcrumb variant default" />,
  },
  {
    label: "Collapsed",
    content: (
      <Breadcrumb
        items={longTrail}
        maxItems={2}
        label="Breadcrumb variant collapsed"
      />
    ),
  },
];

export const breadcrumbStates: SpecimenItem[] = [
  {
    label: "Default",
    content: <Breadcrumb items={trail} label="Breadcrumb state default" />,
  },
  {
    label: "Current",
    content: (
      <Breadcrumb
        items={[
          { label: "Decks", href: "#/overview" },
          { label: "Biology 101" },
        ]}
        label="Breadcrumb state current"
      />
    ),
  },
  {
    label: "Hover",
    content: (
      <Breadcrumb
        items={trail}
        data-state="hover"
        label="Breadcrumb state hover"
      />
    ),
  },
  {
    label: "Focus visible",
    content: (
      <Breadcrumb
        items={trail}
        data-state="focus"
        label="Breadcrumb state focus"
      />
    ),
  },
];
