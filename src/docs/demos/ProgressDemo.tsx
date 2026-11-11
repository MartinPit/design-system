import { Progress, type ProgressSize } from "../../components/Progress";
import type { SpecimenItem } from "../types";
import styles from "./demo.module.css";

export function ProgressDemo() {
  return (
    <div className={styles.progressStack}>
      <Progress label="Daily goal" value={40} max={60} />
      <Progress label="Session recall" value={98} />
      <Progress label="Loading recall" indeterminate />
    </div>
  );
}

const sizes: ProgressSize[] = ["sm", "md", "lg"];

export const progressVariants: SpecimenItem[] = sizes.flatMap((size) => [
  {
    label: `Bar / ${size}`,
    content: <Progress label="Daily goal" value={40} max={60} size={size} />,
  },
  {
    label: `Ring / ${size}`,
    content: <Progress label="Recall" value={98} variant="ring" size={size} />,
  },
]);

export const progressStates: SpecimenItem[] = [
  {
    label: "Determinate",
    content: <Progress label="Session recall" value={98} />,
  },
  {
    label: "Indeterminate",
    content: <Progress label="Loading recall" indeterminate />,
  },
  {
    label: "Complete",
    content: <Progress label="Daily goal" value={60} max={60} />,
  },
];
