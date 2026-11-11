import { Slider } from "../../components/Slider";
import type { SpecimenItem } from "../types";
import styles from "./demo.module.css";

export function SliderDemo() {
  return (
    <div className={styles.stack}>
      <Slider
        label="Daily goal"
        defaultValue={40}
        min={0}
        max={200}
        step={10}
        formatValue={(value) => `${value} cards`}
        hint="The goal resets at midnight, local time."
      />
    </div>
  );
}

export const sliderVariants: SpecimenItem[] = [
  {
    label: "Cards / day",
    content: (
      <Slider
        label="Daily goal"
        defaultValue={40}
        min={0}
        max={200}
        step={10}
        formatValue={(value) => `${value} cards`}
      />
    ),
  },
  {
    label: "Minutes / session",
    content: (
      <Slider
        label="Session length"
        defaultValue={20}
        min={5}
        max={60}
        step={5}
        formatValue={(value) => `${value} min`}
      />
    ),
  },
];

export const sliderStates: SpecimenItem[] = [
  {
    label: "Default",
    content: (
      <Slider
        label="Daily goal"
        defaultValue={40}
        formatValue={(value) => `${value} cards`}
      />
    ),
  },
  {
    label: "Hover",
    content: (
      <Slider
        label="Daily goal"
        defaultValue={40}
        formatValue={(value) => `${value} cards`}
        data-state="hover"
      />
    ),
  },
  {
    label: "Dragging",
    content: (
      <Slider
        label="Daily goal"
        defaultValue={60}
        formatValue={(value) => `${value} cards`}
        data-state="dragging"
      />
    ),
  },
  {
    label: "Focus",
    content: (
      <Slider
        label="Daily goal"
        defaultValue={40}
        formatValue={(value) => `${value} cards`}
        data-state="focus"
      />
    ),
  },
  {
    label: "Disabled",
    content: (
      <Slider
        label="Daily goal"
        defaultValue={40}
        formatValue={(value) => `${value} cards`}
        disabled
      />
    ),
  },
];
