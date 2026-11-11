import { typeScale } from "../tokenData";
import { Page, PageHead, Section } from "../ui";
import styles from "./pages.module.css";

const familyClass: Record<
  (typeof typeScale)[number]["family"],
  string | undefined
> = {
  display: styles.specDisplay,
  text: styles.specText,
  label: styles.specLabel,
};

export function TypePage() {
  return (
    <Page>
      <PageHead
        eyebrow="Arcana / Foundations"
        title="Type"
        job="A geometric display, a quiet text face, and a mono label. Uppercase carries the tracking; lowercase stays tight."
        sheet={"Sheet 01.02\n3 families"}
      />

      <Section index="01" title="Typefaces" note="Installed, not simulated">
        <div className={styles.faceList}>
          <div className={styles.faceRow}>
            <div className={styles.faceMeta}>
              <code>--font-display</code>
              <span>Schibsted Grotesk</span>
              <span>700 / 800</span>
            </div>
            <p className={styles.faceDisplay}>Borrowed knowledge</p>
          </div>
          <div className={styles.faceRow}>
            <div className={styles.faceMeta}>
              <code>--font-text</code>
              <span>Instrument Sans</span>
              <span>400 / 500 / 600</span>
            </div>
            <p className={styles.faceText}>
              Review the cards you failed yesterday before adding new ones.
            </p>
          </div>
          <div className={styles.faceRow}>
            <div className={styles.faceMeta}>
              <code>--font-label</code>
              <span>Fragment Mono</span>
              <span>400 / 500</span>
            </div>
            <p className={styles.faceLabel}>Due today · 142 cards</p>
          </div>
        </div>
      </Section>

      <Section index="02" title="Scale" note="Real sizes, real families">
        <div className={styles.typeScale}>
          {typeScale.map((item) => (
            <div key={item.token} className={styles.typeRow}>
              <div className={styles.typeMeta}>
                <code>{item.token}</code>
                <span>{item.value}</span>
                <span>
                  {item.family} / {item.weight}
                </span>
              </div>
              <div className={styles.typeSample}>
                <p
                  className={familyClass[item.family]}
                  style={{
                    fontSize: `var(${item.token})`,
                    fontWeight: item.weight,
                  }}
                >
                  {item.sample}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section index="03" title="Rules" note="Tracking and case">
        <ol className={styles.ruleList}>
          <li>
            <span>01</span>
            <p>
              Uppercase only for labels. Apply{" "}
              <code>--tracking-label</code> at 0.09em, never to sentence case.
            </p>
          </li>
          <li>
            <span>02</span>
            <p>
              Negative tracking only above 24px. Display sizes use{" "}
              <code>--tracking-display</code> at -0.02em.
            </p>
          </li>
          <li>
            <span>03</span>
            <p>
              Tabular numerals in labels, counters and metrics. Mono is the
              measuring face.
            </p>
          </li>
          <li>
            <span>04</span>
            <p>
              No faux-rounded glyphs and no synthetic weights. Use the supplied
              families at their real weights.
            </p>
          </li>
        </ol>
      </Section>
    </Page>
  );
}
