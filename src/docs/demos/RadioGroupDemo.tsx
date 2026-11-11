import {
  RadioGroup,
  type RadioOption,
} from "../../components/RadioGroup";
import type { SpecimenItem } from "../types";
import styles from "./demo.module.css";

const modes: RadioOption[] = [
  { value: "recall", label: "Recall", hint: "Answer before the card turns." },
  { value: "review", label: "Review", hint: "See the answer first." },
  { value: "cram", label: "Cram", hint: "Does not affect the schedule." },
];

export function RadioGroupDemo() {
  return (
    <div className={styles.field}>
      <RadioGroup
        label="Study mode"
        options={modes}
        defaultValue="recall"
        hint="Cram sessions are not written to study history."
      />
    </div>
  );
}

export const radioVariants: SpecimenItem[] = [
  {
    label: "Vertical / sm",
    content: (
      <RadioGroup
        label="Study mode"
        options={modes.slice(0, 2)}
        defaultValue="recall"
        size="sm"
      />
    ),
  },
  {
    label: "Vertical / md",
    content: (
      <RadioGroup
        label="Study mode"
        options={modes.slice(0, 2)}
        defaultValue="recall"
      />
    ),
  },
  {
    label: "Horizontal / sm",
    content: (
      <RadioGroup
        label="Study mode"
        options={modes.slice(0, 2)}
        defaultValue="review"
        orientation="horizontal"
        size="sm"
      />
    ),
  },
  {
    label: "Horizontal / md",
    content: (
      <RadioGroup
        label="Study mode"
        options={modes.slice(0, 2)}
        defaultValue="review"
        orientation="horizontal"
      />
    ),
  },
];

export const radioStates: SpecimenItem[] = [
  {
    label: "Unselected",
    content: (
      <RadioGroup label="Study mode" options={modes.slice(0, 2)} />
    ),
  },
  {
    label: "Selected",
    content: (
      <RadioGroup
        label="Study mode"
        options={modes.slice(0, 2)}
        defaultValue="recall"
      />
    ),
  },
  {
    label: "Hover",
    content: (
      <RadioGroup
        label="Study mode"
        options={modes.slice(0, 2)}
        defaultValue="recall"
        data-state="hover"
      />
    ),
  },
  {
    label: "Focus",
    content: (
      <RadioGroup
        label="Study mode"
        options={modes.slice(0, 2)}
        defaultValue="recall"
        data-state="focus"
      />
    ),
  },
  {
    label: "Disabled",
    content: (
      <RadioGroup
        label="Study mode"
        options={modes.map((mode) => ({ ...mode, disabled: true }))}
        defaultValue="recall"
      />
    ),
  },
  {
    label: "Error",
    content: (
      <RadioGroup
        label="Study mode"
        options={modes.slice(0, 2)}
        error="Choose a study mode"
      />
    ),
  },
];
