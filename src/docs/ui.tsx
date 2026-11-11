import { useId, type ReactNode } from "react";
import { cx } from "../lib/cx";
import styles from "./ui.module.css";

export { GradientForm } from "../components/GradientForm";

export function Page({ children }: { children: ReactNode }) {
  return <div className={styles.page}>{children}</div>;
}

export function PageHead({
  eyebrow,
  title,
  job,
  sheet,
}: {
  eyebrow: ReactNode;
  title: string;
  job?: ReactNode;
  sheet?: string;
}) {
  return (
    <header className={styles.pageHead}>
      <div>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h1 className={styles.title}>{title}</h1>
        {job ? <p className={styles.job}>{job}</p> : null}
      </div>
      {sheet ? <p className={styles.sheet}>{sheet}</p> : null}
    </header>
  );
}

export function Section({
  index,
  title,
  note,
  children,
  id,
}: {
  index: string;
  title: ReactNode;
  note?: ReactNode;
  children: ReactNode;
  id?: string;
}) {
  const autoId = useId();
  const headingId = `${id ?? autoId}-title`;

  return (
    <section className={styles.section} id={id} aria-labelledby={headingId}>
      <div className={styles.sectionHead}>
        <span className={styles.sectionIndex} aria-hidden="true">
          {index}
        </span>
        <h2 id={headingId} className={styles.sectionTitle}>
          {title}
        </h2>
        {note ? <span className={styles.sectionNote}>{note}</span> : null}
      </div>
      {children}
    </section>
  );
}

export function Stage({
  tag = "Live specimen",
  children,
}: {
  tag?: string;
  children: ReactNode;
}) {
  return (
    <div className={styles.stage}>
      <span className={styles.stageTag}>{tag}</span>
      <div className={styles.stageBody}>{children}</div>
    </div>
  );
}

export function SpecimenGrid({
  children,
  wide = false,
}: {
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <div className={cx(styles.grid, wide && styles.gridWide)}>{children}</div>
  );
}

export function Specimen({
  label,
  wide = false,
  children,
}: {
  label: string;
  wide?: boolean;
  children: ReactNode;
}) {
  return (
    <div className={cx(styles.cell, wide && styles.cellWide)}>
      <span className={styles.cellLabel}>{label}</span>
      <div className={styles.cellBody}>{children}</div>
    </div>
  );
}

export interface PropRow {
  name: string;
  type: string;
  defaultValue: string;
  description: string;
}

export function PropsTable({
  rows,
  caption,
}: {
  rows: PropRow[];
  caption: string;
}) {
  return (
    <div
      className={styles.tableScroll}
      role="region"
      aria-label={`${caption}, scrollable`}
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- horizontal scroll must be keyboard reachable
      tabIndex={0}
    >
      <table className={styles.table}>
        <caption className={styles.caption}>{caption}</caption>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Type</th>
            <th scope="col">Default</th>
            <th scope="col">Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name}>
              <th scope="row" className={styles.propName}>
                <code>{row.name}</code>
              </th>
              <td className={styles.propType}>
                <code>{row.type}</code>
              </td>
              <td className={styles.propDefault}>
                <code>{row.defaultValue}</code>
              </td>
              <td>{row.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function DoDont({ dos, donts }: { dos: string[]; donts: string[] }) {
  return (
    <div className={styles.verdicts}>
      <div className={cx(styles.verdict, styles.verdictDo)}>
        <p className={styles.verdictHead}>
          <span className={styles.verdictMark} aria-hidden="true" />
          Do
        </p>
        <ul className={styles.verdictList}>
          {dos.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <div className={cx(styles.verdict, styles.verdictDont)}>
        <p className={styles.verdictHead}>
          <span className={styles.verdictMark} aria-hidden="true" />
          Don&rsquo;t
        </p>
        <ul className={styles.verdictList}>
          {donts.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function A11yNote({ children }: { children: ReactNode }) {
  return (
    <div className={styles.a11y}>
      <p className={styles.a11yLabel}>
        <span className={styles.a11yBadge}>AA</span>
        Accessibility note
      </p>
      <p className={styles.a11yBody}>{children}</p>
    </div>
  );
}

export function LabelStrip({
  left,
  right,
}: {
  left: ReactNode;
  right: ReactNode;
}) {
  return (
    <span className={styles.strip}>
      <span className={styles.stripPart}>{left}</span>
      <span className={styles.stripPart}>{right}</span>
    </span>
  );
}

export function Seal({
  number,
  size = "md",
}: {
  number: ReactNode;
  size?: "sm" | "md";
}) {
  return (
    <span
      className={cx(styles.seal, styles[`seal${size === "sm" ? "Sm" : "Md"}`])}
      aria-hidden="true"
    >
      <span className={styles.sealRing} />
      <span className={styles.sealTop}>Arc</span>
      <span className={styles.sealNumber}>{number}</span>
      <span className={styles.sealBottom}>Arcana</span>
    </span>
  );
}

export function Monogram({
  letter,
  size = "md",
}: {
  letter: string;
  size?: "sm" | "md";
}) {
  return (
    <span
      className={cx(styles.monogram, styles[`monogram${size === "sm" ? "Sm" : "Md"}`])}
      aria-hidden="true"
    >
      {letter}
    </span>
  );
}

export function Redactions({ count = 5 }: { count?: number }) {
  return (
    <span className={styles.redactions} aria-hidden="true">
      {Array.from({ length: count }, (_, index) => (
        <span key={index} className={styles.redaction} />
      ))}
    </span>
  );
}

export function Figure({
  caption,
  children,
  className,
}: {
  caption: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <figure className={cx(styles.figure, className)}>
      <div className={styles.figureBody}>{children}</div>
      <figcaption className={styles.figcaption}>{caption}</figcaption>
    </figure>
  );
}
