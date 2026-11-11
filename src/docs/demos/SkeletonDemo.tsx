import { Skeleton, type SkeletonSize } from "../../components/Skeleton";
import type { SpecimenItem } from "../types";
import styles from "./demo.module.css";

export function SkeletonDemo() {
  return (
    <div className={styles.skeletonStack}>
      <Skeleton variant="circle" size="md" />
      <Skeleton variant="text" lines={2} width="18rem" />
      <Skeleton variant="block" />
    </div>
  );
}

const sizes: SkeletonSize[] = ["sm", "md"];

export const skeletonVariants: SpecimenItem[] = sizes.flatMap((size) => [
  {
    label: `Text / ${size}`,
    content: <Skeleton variant="text" size={size} lines={2} />,
  },
  {
    label: `Block / ${size}`,
    content: <Skeleton variant="block" size={size} />,
  },
  {
    label: `Circle / ${size}`,
    content: <Skeleton variant="circle" size={size} />,
  },
]);

export const skeletonStates: SpecimenItem[] = [
  {
    label: "Animated",
    content: <Skeleton variant="block" />,
  },
  {
    label: "Reduced motion static",
    content: <Skeleton variant="block" animate={false} />,
  },
];
