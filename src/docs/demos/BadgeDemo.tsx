import { Badge, type BadgeSize, type BadgeVariant } from "../../components/Badge";
import type { SpecimenItem } from "../types";
import styles from "./demo.module.css";

export function BadgeDemo() {
  return (
    <div className={styles.row}>
      <Badge variant="warning">142 due</Badge>
      <Badge variant="accent">New</Badge>
      <Badge variant="success">98% recall</Badge>
      <Badge variant="neutral">Suspended</Badge>
      <Badge variant="danger">Sync failed</Badge>
    </div>
  );
}

const variants: BadgeVariant[] = [
  "neutral",
  "accent",
  "success",
  "warning",
  "danger",
];
const sizes: BadgeSize[] = ["sm", "md"];

export const badgeVariants: SpecimenItem[] = variants.flatMap((variant) =>
  sizes.map((size) => ({
    label: `${variant} / ${size}`,
    content: (
      <Badge variant={variant} size={size}>
        {variant}
      </Badge>
    ),
  })),
);

export const badgeStates: SpecimenItem[] = [
  {
    label: "Neutral",
    content: <Badge>142 due</Badge>,
  },
  {
    label: "Accent",
    content: <Badge variant="accent">New</Badge>,
  },
  {
    label: "Success",
    content: <Badge variant="success">98% recall</Badge>,
  },
  {
    label: "Warning",
    content: <Badge variant="warning">12-day streak</Badge>,
  },
  {
    label: "Danger",
    content: <Badge variant="danger">Sync failed</Badge>,
  },
];
