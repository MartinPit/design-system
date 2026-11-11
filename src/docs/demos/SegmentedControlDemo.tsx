import { SegmentedControl } from "../../components/SegmentedControl";
import type { SpecimenItem } from "../types";
import styles from "./demo.module.css";

const views = [
  { value: "grid", label: "Grid" },
  { value: "list", label: "List" },
];

export function SegmentedControlDemo() {
  return (
    <div className={styles.row}>
      <SegmentedControl
        label="Deck view"
        options={views}
        defaultValue="grid"
      />
      <SegmentedControl
        label="Range"
        options={[
          { value: "day", label: "Day" },
          { value: "week", label: "Week" },
          { value: "month", label: "Month" },
        ]}
        defaultValue="week"
      />
    </div>
  );
}

export const segmentedVariants: SpecimenItem[] = [
  {
    label: "2 segments / sm",
    content: (
      <SegmentedControl
        label="View"
        options={views}
        defaultValue="grid"
        size="sm"
      />
    ),
  },
  {
    label: "2 segments / md",
    content: (
      <SegmentedControl label="View" options={views} defaultValue="grid" />
    ),
  },
  {
    label: "3 segments / md",
    content: (
      <SegmentedControl
        label="Range"
        options={[
          { value: "day", label: "Day" },
          { value: "week", label: "Week" },
          { value: "month", label: "Month" },
        ]}
        defaultValue="week"
      />
    ),
  },
  {
    label: "4 segments / md",
    content: (
      <SegmentedControl
        label="Sort"
        options={[
          { value: "due", label: "Due" },
          { value: "new", label: "New" },
          { value: "hard", label: "Hard" },
          { value: "all", label: "All" },
        ]}
        defaultValue="due"
      />
    ),
  },
];

export const segmentedStates: SpecimenItem[] = [
  {
    label: "Selected",
    content: (
      <SegmentedControl label="View" options={views} defaultValue="grid" />
    ),
  },
  {
    label: "Unselected",
    content: (
      <SegmentedControl label="View" options={views} value="none" />
    ),
  },
  {
    label: "Hover",
    content: (
      <SegmentedControl
        label="View"
        options={views}
        defaultValue="grid"
        data-state="hover"
      />
    ),
  },
  {
    label: "Focus",
    content: (
      <SegmentedControl
        label="View"
        options={views}
        defaultValue="grid"
        data-state="focus"
      />
    ),
  },
  {
    label: "Disabled",
    content: (
      <SegmentedControl label="View" options={views} defaultValue="grid" disabled />
    ),
  },
];
