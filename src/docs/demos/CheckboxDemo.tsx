import { Checkbox } from "../../components/Checkbox";
import type { SpecimenItem } from "../types";
import styles from "./demo.module.css";

export function CheckboxDemo() {
  return (
    <div className={styles.stack}>
      <Checkbox label="Due today" hint="142 cards due across 3 decks." defaultChecked />
      <Checkbox label="New cards" />
      <Checkbox label="Suspended" disabled />
    </div>
  );
}

export const checkboxVariants: SpecimenItem[] = [
  {
    label: "Single / sm",
    content: <Checkbox label="Due today" size="sm" defaultChecked />,
  },
  {
    label: "Single / md",
    content: <Checkbox label="Due today" defaultChecked />,
  },
  {
    label: "Indeterminate / sm",
    content: <Checkbox label="All decks" size="sm" indeterminate />,
  },
  {
    label: "Indeterminate / md",
    content: <Checkbox label="All decks" indeterminate />,
  },
];

export const checkboxStates: SpecimenItem[] = [
  { label: "Unchecked", content: <Checkbox label="Due today" /> },
  {
    label: "Checked",
    content: <Checkbox label="Due today" defaultChecked />,
  },
  {
    label: "Indeterminate",
    content: <Checkbox label="Due today" indeterminate />,
  },
  {
    label: "Hover",
    content: <Checkbox label="Due today" data-state="hover" />,
  },
  {
    label: "Focus",
    content: <Checkbox label="Due today" data-state="focus" />,
  },
  {
    label: "Disabled",
    content: <Checkbox label="Due today" defaultChecked disabled />,
  },
  {
    label: "Error",
    content: <Checkbox label="Due today" error="Select at least one deck" />,
  },
];
