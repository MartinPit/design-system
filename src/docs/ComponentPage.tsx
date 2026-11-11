import { PageHeader, Section, PropsTable, DoDont, Note } from "./page";
import { Stage } from "./specimen";
import type { ComponentDoc, PropRow } from "./types";
import styles from "./ComponentPage.module.css";

export function ComponentPage({ doc }: { doc: ComponentDoc }) {
  const { Demo, Variants, States } = doc;

  return (
    <>
      <PageHeader
        eyebrow={`Components / ${doc.group}`}
        title={doc.name}
        lede={doc.job}
        meta={
          <>
            <span className={styles.chip}>{doc.id}</span>
            <span className={styles.chip}>Live specimen</span>
            <span className={styles.chip}>AA contract</span>
          </>
        }
      />

      <Section title="Live demo" lead="The real component, with real deck copy.">
        <Stage>
          <Demo />
        </Stage>
      </Section>

      <Section title="Variants" lead="Every visual variant rendered at once.">
        <Variants />
      </Section>

      <Section
        title="States"
        lead="The full state set side by side. Hover and focus are forced for the grid, not left to the pointer."
      >
        <States />
      </Section>

      <Section title="Props" lead="The public surface. Native attributes pass through.">
        <PropsTable rows={doc.props as PropRow[]} />
      </Section>

      <Section title="Usage">
        <DoDont dos={doc.dos} donts={doc.donts} />
      </Section>

      <Section title="Accessibility">
        <Note>{doc.a11y}</Note>
      </Section>
    </>
  );
}
