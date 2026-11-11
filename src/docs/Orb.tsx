import { cx } from "../components/cx";
import styles from "./Orb.module.css";

export function Orb({
  size = 120,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cx(styles.orb, className)}
      style={{ width: size, height: size }}
    >
      <span className={styles.shimmer} />
    </span>
  );
}
