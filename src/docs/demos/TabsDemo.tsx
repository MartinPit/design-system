import { Tabs, type TabItem } from "../../components/Tabs";
import type { SpecimenItem } from "../types";
import styles from "./demo.module.css";

const sections: TabItem[] = [
  {
    id: "due",
    label: "Due",
    content: (
      <div className={styles.tabContent}>
        <span className={styles.metric}>142 cards due</span>
        <span className={styles.metricLabel}>
          Across Kanji N3, Spanish Verbs, Biology 101
        </span>
      </div>
    ),
  },
  {
    id: "new",
    label: "New",
    content: (
      <div className={styles.tabContent}>
        <span className={styles.metric}>18 new cards</span>
        <span className={styles.metricLabel}>Added since 04 Nov 2026</span>
      </div>
    ),
  },
  {
    id: "suspended",
    label: "Suspended",
    content: (
      <div className={styles.tabContent}>
        <span className={styles.metric}>4 suspended</span>
        <span className={styles.metricLabel}>Excluded from the schedule</span>
      </div>
    ),
  },
];

const shortSections: TabItem[] = sections.map((section) => ({
  ...section,
  content: undefined,
}));

export function TabsDemo() {
  return (
    <div className={styles.panel}>
      <Tabs items={sections} defaultValue="due" label="Deck sections" />
    </div>
  );
}

export const tabsVariants: SpecimenItem[] = [
  {
    label: "Underline",
    content: (
      <Tabs items={shortSections} defaultValue="due" label="Sections" />
    ),
  },
  {
    label: "Pill",
    content: (
      <Tabs
        items={shortSections}
        defaultValue="due"
        variant="pill"
        label="Sections"
      />
    ),
  },
];

export const tabsStates: SpecimenItem[] = [
  {
    label: "Selected",
    content: (
      <Tabs items={shortSections} defaultValue="due" label="Selected" />
    ),
  },
  {
    label: "Unselected",
    content: <Tabs items={shortSections} value="none" label="Unselected" />,
  },
  {
    label: "Hover",
    content: (
      <Tabs
        items={shortSections}
        defaultValue="due"
        data-state="hover"
        label="Hover"
      />
    ),
  },
  {
    label: "Focus",
    content: (
      <Tabs
        items={shortSections}
        defaultValue="due"
        data-state="focus"
        label="Focus"
      />
    ),
  },
  {
    label: "Disabled",
    content: (
      <Tabs
        items={[
          { id: "due", label: "Due" },
          { id: "new", label: "New", disabled: true },
          { id: "suspended", label: "Suspended" },
        ]}
        defaultValue="due"
        label="Disabled"
      />
    ),
  },
];
