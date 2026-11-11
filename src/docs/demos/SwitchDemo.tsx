import { Switch } from "../../components/Switch";
import type { SpecimenItem } from "../types";
import styles from "./demo.module.css";

export function SwitchDemo() {
  return (
    <div className={styles.stack}>
      <Switch
        label="Daily reminders"
        defaultChecked
        hint="One notification at 08:00, local time."
      />
      <Switch label="Reduce motion" hint="Uses opacity only; no movement." />
    </div>
  );
}

export const switchVariants: SpecimenItem[] = [
  {
    label: "Off / sm",
    content: <Switch label="Reminders" size="sm" />,
  },
  {
    label: "On / sm",
    content: <Switch label="Reminders" size="sm" defaultChecked />,
  },
  {
    label: "Off / md",
    content: <Switch label="Reminders" />,
  },
  {
    label: "On / md",
    content: <Switch label="Reminders" defaultChecked />,
  },
];

export const switchStates: SpecimenItem[] = [
  { label: "Off", content: <Switch label="Reminders" /> },
  {
    label: "On",
    content: <Switch label="Reminders" defaultChecked />,
  },
  {
    label: "Hover",
    content: <Switch label="Reminders" data-state="hover" />,
  },
  {
    label: "Focus",
    content: <Switch label="Reminders" data-state="focus" />,
  },
  {
    label: "Disabled",
    content: <Switch label="Reminders" defaultChecked disabled />,
  },
];
