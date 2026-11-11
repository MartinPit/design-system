import type { ReactNode } from "react";
import { cx } from "../components/cx";
import styles from "./specimen.module.css";

export function Stage({
  children,
  label,
  className,
}: {
  children: ReactNode;
  label?: string;
  className?: string;
}) {
  return (
    <div className={cx(styles.stage, className)}>
      {label ? <span className={styles.stageLabel}>{label}</span> : null}
      <div className={styles.stageBody}>{children}</div>
    </div>
  );
}

export function Specimen({
  label,
  children,
  wide = false,
  className,
}: {
  label: string;
  children: ReactNode;
  wide?: boolean;
  className?: string;
}) {
  return (
    <figure className={cx(styles.specimen, wide && styles.wide, className)}>
      <figcaption className={styles.label}>{label}</figcaption>
      <div className={styles.surface}>{children}</div>
    </figure>
  );
}

export function SpecimenGrid({
  children,
  columns = 3,
}: {
  children: ReactNode;
  columns?: 2 | 3 | 4;
}) {
  return (
    <div
      className={styles.grid}
      data-columns={columns}
    >
      {children}
    </div>
  );
}

export function StateGrid({ children }: { children: ReactNode }) {
  return <div className={styles.stateGrid}>{children}</div>;
}

export function State({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <figure className={styles.state}>
      <figcaption className={styles.stateLabel}>{label}</figcaption>
      <div className={styles.stateSurface}>{children}</div>
    </figure>
  );
}

export function Row({ children }: { children: ReactNode }) {
  return <div className={styles.row}>{children}</div>;
}

export function Caption({ children }: { children: ReactNode }) {
  return <p className={styles.caption}>{children}</p>;
}
