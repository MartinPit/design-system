import { Page, PageHead, Section } from "../ui";
import styles from "./pages.module.css";

const levels = [
  {
    name: "Flat",
    token: "none",
    className: undefined,
    note: "The default. A keyline does the work.",
  },
  {
    name: "Shadow 1",
    token: "--shadow-1",
    className: styles.shadow1,
    note: "Raised sheet, hover lift, small objects.",
  },
  {
    name: "Shadow 2",
    token: "--shadow-2",
    className: styles.shadow2,
    note: "Seed card, one hero object per view.",
  },
];

export function ElevationPage() {
  return (
    <Page>
      <PageHead
        eyebrow="Arcana / Foundations"
        title="Elevation"
        job="Print, not light. Shadows are offset impressions on paper: hard edges, no blur, no glow, no glass."
        sheet={"Sheet 01.05\n2 levels"}
      />

      <Section index="01" title="Levels" note="Side by side">
        <div className={styles.elevationGrid}>
          {levels.map((level) => (
            <div key={level.name} className={styles.elevationItem}>
              <div className={`${styles.elevationSample} ${level.className ?? ""}`}>
                <span>Kanji N3</span>
                <span className={styles.elevationMeta}>142 cards due</span>
              </div>
              <div className={styles.elevationFoot}>
                <code>{level.token}</code>
                <strong>{level.name}</strong>
                <p>{level.note}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section index="02" title="Rules" note="Hard edges only">
        <ol className={styles.ruleList}>
          <li>
            <span>01</span>
            <p>
              Offset only. <code>--shadow-1</code> is 4px 4px 0;{" "}
              <code>--shadow-2</code> is 8px 8px 0. Never add a blur radius.
            </p>
          </li>
          <li>
            <span>02</span>
            <p>
              Shadows are ink at 10–14% opacity, never black. The ground stays
              warm.
            </p>
          </li>
          <li>
            <span>03</span>
            <p>
              One raised object per view is enough. If everything floats,
              nothing does.
            </p>
          </li>
        </ol>
      </Section>
    </Page>
  );
}
