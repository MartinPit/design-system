import { PageHeader, Prose, Section, Note } from "./page";
import pattern from "./pattern.module.css";
import styles from "./Accessibility.module.css";

export function AccessibilityPage() {
  return (
    <>
      <PageHeader
        eyebrow="Reference / Accessibility"
        title="Accessibility"
        lede="The page stays AA because it is zoned, not because it fights the ground. Cream lives on the dark end; ink lives on the light end; the middle is mediated by a scrim or a panel."
      />

      <Section title="Status">
        <Note label="Phase A">
          The rules and fallbacks are implemented and visible below. A full audit
          — automated axe pass, keyboard walkthrough of every specimen and a
          documented contrast table — closes this page in Phase B.
        </Note>
      </Section>

      <Section
        title="Zoning and scrim"
        lead="A single rule decides where type may sit."
      >
        <div className={styles.zoneGrid}>
          <div className={styles.zoneDark}>
            <span className={styles.zoneLabel}>Cream · 17.6:1</span>
            <p>to remember</p>
          </div>
          <div className={styles.zoneMid}>
            <span className={styles.zoneLabel}>Cream · 9.7:1</span>
            <p>la llave</p>
          </div>
          <div className={styles.zoneLight}>
            <span className={styles.zoneLabel}>Ink · 6.1:1</span>
            <p>142 cards due</p>
          </div>
        </div>
        <Prose>
          <p>
            Cream is allowed on abyss, indigo and violet. Ink is allowed on
            periwinkle, cyan and mint. Type that must cross the middle of the
            ground sits on <code>--scrim</code> or on a dark panel; it never
            trusts the gradient to stay still.
          </p>
          <p>
            The scrim is <code>rgb(10 7 34 / 0.55)</code> and gives cream 8.04:1
            over the periwinkle end. It is a surface, not a text effect: the
            text keeps its own colour.
          </p>
        </Prose>
      </Section>

      <Section
        title="Dual-band focus"
        lead="One band cannot clear every part of the ground, so every focus ring has two."
      >
        <div className={styles.focusRow}>
          <button type="button" className={styles.focusExample}>
            Save card
          </button>
          <span className={styles.focusCaption}>
            <code>outline: 2px solid #F7F2E6; outline-offset: 3px</code>
            <br />
            <code>box-shadow: 0 0 0 5px #08060F</code>
          </span>
        </div>
        <Prose>
          <p>
            The cream band reads against dark ground; the ink halo reads against
            the bright end. Focus is never removed, and it is visible on links,
            buttons, fields, tabs, switches and the skip link. Under{" "}
            <code>forced-colors</code> the ring becomes a 3px Highlight outline
            and the halo is dropped.
          </p>
        </Prose>
      </Section>

      <Section
        title="Pattern opacity"
        lead="Seigaiha is always a decoration, never information."
      >
        <div className={styles.patternRow}>
          <div className={styles.patternTile}>
            <div className={pattern.tile} />
            <span>16% tint</span>
          </div>
          <div className={styles.patternTile}>
            <div className={pattern.tile} />
            <span>20% ceiling under cream</span>
          </div>
        </div>
        <Prose>
          <p>
            The stroke tile is masked and pointer-transparent, and it is hidden
            from assistive technology. It never sits behind body text. Where
            cream text must overlap it, opacity stays at or below 20%; behind
            dense type it fades out. <code>prefers-contrast: more</code> sets{" "}
            <code>--pattern-tint: transparent</code>, and{" "}
            <code>forced-colors</code> removes it entirely.
          </p>
        </Prose>
      </Section>

      <Section
        title="Reduced transparency and contrast"
        lead="Preferences change the material, not the information."
      >
        <Prose>
          <ul>
            <li>
              <code>prefers-reduced-transparency: reduce</code> replaces the
              glass alphas with near-opaque indigo and removes{" "}
              <code>backdrop-filter</code>. The opaque gradient fallback is used
              when the filter is unsupported.
            </li>
            <li>
              <code>prefers-contrast: more</code> raises borders to 55% cream,
              promotes muted text to full cream, uses the violet panel instead
              of glass and hides the pattern.
            </li>
            <li>
              <code>prefers-reduced-motion: reduce</code> removes the orb
              shimmer, hover lift and page transitions. Opacity changes remain.
            </li>
            <li>
              <code>forced-colors: active</code> drops the ground to Canvas,
              uses CanvasText and keeps a 3px Highlight focus outline.
            </li>
          </ul>
        </Prose>
      </Section>

      <Section title="Credit">
        <Prose>
          <p>
            Seigaiha (青海波) is a traditional Japanese wave motif. The tile on
            this page is an original stroke drawing for Tidal, not a copied
            asset. Visual direction comes from Card B in the project’s reference
            set: an iridescent membership token with a seigaiha field.
          </p>
        </Prose>
      </Section>
    </>
  );
}
