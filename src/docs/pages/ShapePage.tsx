import { Button } from "../../components/Button";
import { Monogram, Page, PageHead, Seal, Section } from "../ui";
import styles from "./pages.module.css";

function FormOutline() {
  return (
    <svg
      viewBox="0 0 100 80"
      className={styles.formOutline}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M0 0H30C56 0 84 8 96 30C100 47 90 61 72 68C51 76 30 79 16 74C8 71 3 67 0 61Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export function ShapePage() {
  return (
    <Page>
      <PageHead
        eyebrow="Arcana / Foundations"
        title="Shape"
        job="Square structure, square controls, round seals. The organic form is the only curve that is allowed to be irregular."
        sheet={"Sheet 01.04\n3 radii"}
      />

      <Section index="01" title="Radii" note="Structural / control / seal">
        <div className={styles.radiusGrid}>
          <div className={styles.radiusItem}>
            <span className={`${styles.radiusTile} ${styles.radius0}`}>0</span>
            <code>--radius-0</code>
            <p>Every container, panel, grid and stage.</p>
          </div>
          <div className={styles.radiusItem}>
            <span className={`${styles.radiusTile} ${styles.radius1}`}>2px</span>
            <code>--radius-1</code>
            <p>Buttons, fields, switches and every control boundary.</p>
          </div>
          <div className={styles.radiusItem}>
            <span className={`${styles.radiusTile} ${styles.radiusPill}`}>
              999
            </span>
            <code>--radius-pill</code>
            <p>Seals, radio markers and avatars. Nothing else.</p>
          </div>
        </div>
      </Section>

      <Section index="02" title="Keyline grammar" note="When a 1px box is right">
        <div className={styles.grammarGrid}>
          <div className={styles.grammarItem}>
            <span className={styles.grammarLabel}>Structural container</span>
            <div className={styles.keylineExample}>
              <span>Kanji N3</span>
              <span className={styles.keylineMeta}>142 cards due</span>
            </div>
            <p>A 1px ink keyline around a square container. This is the default box.</p>
          </div>
          <div className={styles.grammarItem}>
            <span className={styles.grammarLabel}>Control boundary</span>
            <Button variant="secondary" size="sm">
              Start session
            </Button>
            <p>Controls add a 2px radius. The boundary is interactive, so it is darker and distinct.</p>
          </div>
          <div className={styles.grammarItem}>
            <span className={styles.grammarLabel}>Seal and monogram</span>
            <span className={styles.sealExample}>
              <Seal number="1" />
              <Monogram letter="K" />
            </span>
            <p>Seals are round and monochrome, with a double ring. Monogram tiles stay square.</p>
          </div>
        </div>
      </Section>

      <Section index="03" title="The organic form" note="Mark only">
        <div className={styles.formExample}>
          <FormOutline />
          <div>
            <p>
              The blob is the only asymmetric shape in the system. It can be the
              system mark, one decorative accent, or the fill behind an empty
              state. It is never a container, never a button, and never carries
              type.
            </p>
            <p className={styles.note}>
              A CSS <code>border-radius</code> approximation is ornament only and
              must not hold content. The real form is inline SVG.
            </p>
          </div>
        </div>
      </Section>
    </Page>
  );
}
