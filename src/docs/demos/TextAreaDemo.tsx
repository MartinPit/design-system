import { TextArea } from "../../components/TextArea";
import type { SpecimenItem } from "../types";
import styles from "./demo.module.css";

export function TextAreaDemo() {
  return (
    <div className={styles.stack}>
      <TextArea
        label="Answer"
        defaultValue="to remember"
        maxLength={120}
        hint="One answer per card. Keep it short enough to recall."
      />
    </div>
  );
}

export const textAreaVariants: SpecimenItem[] = [
  {
    label: "Default",
    content: <TextArea label="Answer" defaultValue="to remember" />,
  },
  {
    label: "With counter",
    content: (
      <TextArea label="Answer" defaultValue="to remember" maxLength={120} />
    ),
  },
  {
    label: "With error",
    content: (
      <TextArea
        label="Answer"
        defaultValue=""
        error="An answer cannot be empty"
      />
    ),
  },
];

export const textAreaStates: SpecimenItem[] = [
  {
    label: "Default",
    content: <TextArea label="Answer" placeholder="Write the answer" />,
  },
  {
    label: "Hover",
    content: (
      <TextArea
        label="Answer"
        data-state="hover"
        placeholder="Write the answer"
      />
    ),
  },
  {
    label: "Focus",
    content: (
      <TextArea
        label="Answer"
        data-state="focus"
        placeholder="Write the answer"
      />
    ),
  },
  {
    label: "Filled",
    content: <TextArea label="Answer" defaultValue="to remember" />,
  },
  {
    label: "Error",
    content: (
      <TextArea
        label="Answer"
        defaultValue=""
        error="An answer cannot be empty"
      />
    ),
  },
  {
    label: "Disabled",
    content: <TextArea label="Answer" defaultValue="to remember" disabled />,
  },
  {
    label: "Read only",
    content: <TextArea label="Answer" defaultValue="to remember" readOnly />,
  },
];
