import type { ReactNode } from "react";
import { cx } from "../components/cx";
import type { PropRow } from "./types";
import styles from "./page.module.css";

export function PageHeader({
  eyebrow,
  title,
  lede,
  meta,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  meta?: ReactNode;
}) {
  return (
    <header className={styles.header}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.lede}>{lede}</p>
      {meta ? <div className={styles.meta}>{meta}</div> : null}
    </header>
  );
}

export function Section({
  title,
  children,
  lead,
  id,
}: {
  title: string;
  children: ReactNode;
  lead?: string;
  id?: string;
}) {
  const headingId = id ?? `section-${title.toLowerCase().replace(/\s+/g, "-")}`;
  return (
    <section className={styles.section} aria-labelledby={headingId}>
      <div className={styles.sectionHead}>
        <h2 className={styles.sectionTitle} id={headingId}>
          {title}
        </h2>
        {lead ? <p className={styles.sectionLead}>{lead}</p> : null}
      </div>
      {children}
    </section>
  );
}

export function Prose({ children }: { children: ReactNode }) {
  return <div className={styles.prose}>{children}</div>;
}

export function PropsTable({ rows }: { rows: PropRow[] }) {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col">Prop</th>
            <th scope="col">Type</th>
            <th scope="col">Default</th>
            <th scope="col">Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name}>
              <th scope="row">
                <code className={styles.propName}>{row.name}</code>
              </th>
              <td>
                <code className={styles.propType}>{row.type}</code>
              </td>
              <td>
                <code className={styles.propDefault}>{row.default}</code>
              </td>
              <td className={styles.propDescription}>{row.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function DoDont({
  dos,
  donts,
}: {
  dos: string[];
  donts: string[];
}) {
  return (
    <div className={styles.usage}>
      <div className={cx(styles.usageCard, styles.doCard)}>
        <p className={styles.usageLabel}>Do</p>
        <ul>
          {dos.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <div className={cx(styles.usageCard, styles.dontCard)}>
        <p className={styles.usageLabel}>Don’t</p>
        <ul>
          {donts.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function Note({
  label = "Accessibility",
  children,
}: {
  label?: string;
  children: ReactNode;
}) {
  return (
    <div className={styles.note}>
      <p className={styles.noteLabel}>{label}</p>
      <p className={styles.noteBody}>{children}</p>
    </div>
  );
}
