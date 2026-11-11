import { Button, type ButtonSize, type ButtonVariant } from "../../components/Button";
import type { SpecimenItem } from "../types";
import styles from "./demo.module.css";

const copy: Record<ButtonVariant, string> = {
  primary: "Start session",
  secondary: "Save card",
  ghost: "Skip",
  danger: "Delete deck",
};

const variants: ButtonVariant[] = ["primary", "secondary", "ghost", "danger"];
const sizes: ButtonSize[] = ["sm", "md", "lg"];

export function ButtonDemo() {
  return (
    <div className={styles.row}>
      <Button>Start session</Button>
      <Button variant="secondary">Save card</Button>
      <Button variant="ghost">Skip</Button>
      <Button variant="danger">Delete deck</Button>
    </div>
  );
}

export const buttonVariants: SpecimenItem[] = variants.flatMap((variant) =>
  sizes.map((size) => ({
    label: `${variant} / ${size}`,
    content: (
      <Button variant={variant} size={size}>
        {copy[variant]}
      </Button>
    ),
  })),
);

export const buttonStates: SpecimenItem[] = [
  { label: "Default", content: <Button>Start session</Button> },
  {
    label: "Hover",
    content: <Button data-state="hover">Start session</Button>,
  },
  {
    label: "Active",
    content: <Button data-state="active">Start session</Button>,
  },
  {
    label: "Focus visible",
    content: <Button data-state="focus">Start session</Button>,
  },
  { label: "Disabled", content: <Button disabled>Start session</Button> },
  {
    label: "Loading",
    content: <Button loading>Start session</Button>,
  },
];
