import { tokenCount } from "../tokenData";
import {
  Figure,
  GradientForm,
  LabelStrip,
  Monogram,
  Page,
  Redactions,
  Seal,
  Section,
} from "../ui";
import styles from "./pages.module.css";

function SeedCard() {
  return (
    <div className={styles.seedCard} aria-hidden="true">
      <GradientForm className={styles.seedForm} />
      <div className={styles.seedIdentity}>
        <Monogram letter="B" size="sm" />
        <Redactions />
        <span className={styles.seedName}>Gifted magician</span>
      </div>
      <div className={styles.seedFoot}>
        <span className={styles.sealRow}>
          <Seal number="1" size="sm" />
          <Seal number="3" size="sm" />
        </span>
        <LabelStrip left="ARC" right="13 Jul 2026" />
      </div>
      <div className={styles.seedBottom}>
        <span>Browser</span>
        <span>Company</span>
      </div>
    </div>
  );
}

export function OverviewPage() {
  return (
    <Page>
      <section className={styles.hero} aria-labelledby="system-name">
        <div className={styles.heroCopy}>
          <p className={styles.heroEyebrow}>
            A design system for a flashcards app
          </p>
          <h1 id="system-name" className={styles.heroTitle}>
            Arcana
          </h1>
          <p className={styles.heroLine}>
            A cream archive for decks, cards and the memory that accumulates
            around them. Purple ink, square keylines, seals and ruled labels,
            with one warm gradient event allowed per page. Decks are
            collections; study history is provenance.
          </p>
          <div className={styles.heroMeta}>
            <LabelStrip left="ARC" right="11 Nov 2026" />
            <span className={styles.heroVersion}>v1.0 / seed card A</span>
          </div>
        </div>
        <div className={styles.seedWrap}>
          <Figure caption="Fig. A — the seed card, redrawn as vector.">
            <SeedCard />
          </Figure>
        </div>
      </section>

      <dl className={styles.stats} aria-label="System facts">
        <div>
          <dt>Components in inventory</dt>
          <dd>27</dd>
        </div>
        <div>
          <dt>Documented in Phase A</dt>
          <dd>13</dd>
        </div>
        <div>
          <dt>Colour tokens</dt>
          <dd>{tokenCount}</dd>
        </div>
        <div>
          <dt>Contrast target</dt>
          <dd>AA</dd>
        </div>
      </dl>

      <Section index="01" title="Three principles" note="The whole system in three rules">
        <div className={styles.principles}>
          <article className={styles.principle}>
            <span className={styles.principleIndex}>01</span>
            <h3>One colour event</h3>
            <p>
              The gradient form is the only flamboyant gesture. One per
              viewport, never behind type, never a button fill. Everything else
              is cream, ink and a keyline.
            </p>
          </article>
          <article className={styles.principle}>
            <span className={styles.principleIndex}>02</span>
            <h3>Structure is square</h3>
            <p>
              Containers have no radius and a 1px boundary. Only controls take
              2px, and only seals and avatars are round. The blob is the single
              organic shape.
            </p>
          </article>
          <article className={styles.principle}>
            <span className={styles.principleIndex}>03</span>
            <h3>Label the archive</h3>
            <p>
              Uppercase mono labels, tabular numerals and DD MMM YYYY dates.
              Metadata is part of the object, not an afterthought.
            </p>
          </article>
        </div>
      </Section>

      <Section index="02" title="How to read this page" note="Six-part specimens">
        <div className={styles.reading}>
          <p>
            Every component sheet carries the same six parts: a live demo, a
            variant matrix, a state grid with every state visible at once, a
            props table, two do and two don&rsquo;t, and one accessibility
            note. Foundations show the real token, not a reproduction.
          </p>
          <p className={styles.readingMeta}>
            Use the contents rail to move. Decks and cards in specimens use the
            working vocabulary: Kanji N3, Spanish Verbs, Biology 101; to
            remember, la llave; 142 cards due, 12-day streak, 98% recall.
          </p>
        </div>
      </Section>
    </Page>
  );
}
