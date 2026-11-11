import tokensCss from "../styles/tokens.css?raw";
import { Orb } from "./Orb";
import pattern from "./pattern.module.css";
import styles from "./Overview.module.css";

const tokenCount = new Set(
  (tokensCss.match(/^\s*(--[\w-]+):/gm) ?? []).map((line) =>
    line.trim().replace(/:$/, ""),
  ),
).size;

const principles = [
  {
    number: "01",
    title: "Depth over decoration",
    body: "Glass layers and one orb. Shadows stay soft and low; nothing competes with the ground for attention.",
  },
  {
    number: "02",
    title: "One geometry, repeated",
    body: "Seigaiha appears at the header band, the sidebar edge, the empty state and this mark. It never sits behind body text.",
  },
  {
    number: "03",
    title: "Type is zoned by light",
    body: "Cream on abyss, indigo and violet. Ink on periwinkle, cyan and mint. The middle gets a scrim or a dark panel.",
  },
];

function SpiralMark() {
  return (
    <svg
      viewBox="0 0 48 48"
      width="30"
      height="30"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M24 41c-9.4 0-17-7.6-17-17S14.6 7 24 7s14 5.9 14 13-5.2 12-11 12-9-3.7-9-8 3.2-7 7-7 5.4 2.2 5.4 5" />
    </svg>
  );
}

function SystemMark() {
  return (
    <div className={styles.mark} aria-hidden="true">
      <div className={styles.markPattern}>
        <div className={pattern.tile} />
      </div>

      <div className={styles.markTop}>
        <span className={styles.disc}>
          <SpiralMark />
        </span>
        <span className={styles.markMeta}>
          Member since
          <b>2026.11</b>
        </span>
      </div>

      <Orb size={92} className={styles.markOrb} />

      <div className={styles.markBottom}>
        <span className={styles.markWord}>Tidal</span>
        <span className={styles.markNote}>
          A design system for a flashcards app
        </span>
      </div>
    </div>
  );
}

export function OverviewPage() {
  return (
    <>
      <header className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>
            A design system for a flashcards app
          </p>
          <h1 className={styles.title}>Tidal</h1>
          <p className={styles.lede}>
            Built from Card B: an iridescent membership token with a seigaiha
            field, a Didone wordmark and a glass orb. Decks as collections,
            study history as provenance, recall as membership in a body of
            knowledge.
          </p>
          <p className={styles.character}>
            Indigo to mint, luminous and layered. A fine seigaiha field over one
            iridescent ground; cream type lives in the abyss corner, ink on the
            bright end. Depth is glass, not shadow. Ornament is restrained by
            one repeating geometry.
          </p>
          <div className={styles.heroMeta}>
            <span>Seed card B</span>
            <span>v1.0</span>
            <span>2026.11</span>
          </div>
        </div>
        <SystemMark />
      </header>

      <section className={styles.principles} aria-labelledby="principles-title">
        <h2 className={styles.sectionTitle} id="principles-title">
          What holds it together
        </h2>
        <div className={styles.principleGrid}>
          {principles.map((principle) => (
            <article className={styles.principle} key={principle.number}>
              <span className={styles.principleNumber}>{principle.number}</span>
              <h3>{principle.title}</h3>
              <p>{principle.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.stats} aria-label="System facts">
        <div className={styles.stat}>
          <span className={styles.statValue}>27</span>
          <span className={styles.statLabel}>Components</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>{tokenCount}</span>
          <span className={styles.statLabel}>Tokens</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>AA</span>
          <span className={styles.statLabel}>Contrast floor</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>3</span>
          <span className={styles.statLabel}>Typefaces</span>
        </div>
      </section>

      <section className={styles.reading} aria-labelledby="reading-title">
        <div>
          <h2 className={styles.sectionTitle} id="reading-title">
            How to read this page
          </h2>
          <p className={styles.readingBody}>
            Every foundation value is read from the live custom property. Every
            component page is one contract, in the same order: live demo,
            variant matrix, state grid, props table, two do and two don’t, and
            one accessibility note. If a component is not here, it is not yet
            delivered.
          </p>
        </div>
        <div className={styles.readingLinks}>
          <a href="#/foundations/colour">Colour →</a>
          <a href="#/components/button">Button →</a>
          <a href="#/accessibility">Accessibility →</a>
        </div>
      </section>
    </>
  );
}
