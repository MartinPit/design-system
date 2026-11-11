import { useState } from "react";
import { SegmentedControl } from "../../components/SegmentedControl";
import { spaceScale } from "../tokenData";
import { Page, PageHead, Section } from "../ui";
import styles from "./pages.module.css";

const insetTokens = spaceScale.slice(1, 7);

export function SpacePage() {
  const [inset, setInset] = useState("--space-5");

  return (
    <Page>
      <PageHead
        eyebrow="Arcana / Foundations"
        title="Space"
        job="A 4px rhythm with generous gaps. Tight inside controls, wide between ideas; the page should breathe like a catalogue."
        sheet={"Sheet 01.03\n9 steps"}
      />

      <Section index="01" title="Scale" note="4 to 96 px">
        <div className={styles.ruler}>
          {spaceScale.map((step) => (
            <div key={step.token} className={styles.rulerRow}>
              <code>{step.token}</code>
              <span className={styles.rulerValue}>{step.value}</span>
              <span className={styles.rulerTrack}>
                <span
                  className={styles.rulerBar}
                  style={{ width: `var(${step.token})` }}
                />
              </span>
              <span className={styles.rulerRem}>{step.rem}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section index="02" title="Live inset" note="Applied, not illustrated">
        <div className={styles.insetControls}>
          <SegmentedControl
            label="Inset"
            options={insetTokens.map((step) => ({
              value: step.token,
              label: step.value,
            }))}
            value={inset}
            onChange={setInset}
            size="sm"
          />
          <code className={styles.insetCode}>{`padding: var(${inset})`}</code>
        </div>
        <div className={styles.insetStage} style={{ padding: `var(${inset})` }}>
          <div className={styles.insetCard}>
            <span className={styles.insetLabel}>Kanji N3</span>
            <span className={styles.insetMetric}>142 cards due</span>
            <span className={styles.insetMeta}>12-day streak · 98% recall</span>
          </div>
        </div>
        <p className={styles.note}>
          Use 8–12px inside a control, 16–24px between related items, 32–48px
          between groups, and 64–96px between sections. The scale is a
          constraint, not a menu: most layouts use four of the nine steps.
        </p>
      </Section>

      <Section index="03" title="Layout" note="Three fixed measures">
        <div className={styles.layoutFacts}>
          <div>
            <span>1200px</span>
            <p>Page maximum. The catalogue never runs full-bleed.</p>
          </div>
          <div>
            <span>260px</span>
            <p>Contents column at 1024 and above.</p>
          </div>
          <div>
            <span>64ch</span>
            <p>Prose measure. Full width is reserved for state grids.</p>
          </div>
        </div>
      </Section>
    </Page>
  );
}
