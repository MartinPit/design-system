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
        <Note label="Audited 2026.11">
          The final pass ran axe-core over all 36 routes at 360, 768, 1024 and
          1440: 144 page/viewport pairs, zero violations. The keyboard walkthrough
          covered Dialog, DropdownMenu, Tooltip, Tabs, Toast and Select. The rules
          and fallbacks below are the ones implemented in the built page.
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

      <Section
        title="Glass limits"
        lead="Glass is a material, not a licence to put type anywhere."
      >
        <Prose>
          <ul>
            <li>
              <strong>L1</strong> is 6% white with a 12px blur and a 1px edge;
              <strong> L2</strong> is 12% white with an 18px blur and an inset
              highlight. Raised panels use the 28px radius.
            </li>
            <li>
              Cream text may sit on glass only when the glass is over violet or
              darker ground. Glass over periwinkle, cyan or mint is for
              ornament, not body copy.
            </li>
            <li>
              Overlays never trust the ground: Dialog, DropdownMenu and Toast
              use opaque <code>--abyss</code> surfaces; Tooltip is near-opaque
              abyss. A scrim at <code>rgb(10 7 34 / 0.55)</code> carries the
              dialog backdrop.
            </li>
            <li>
              When <code>backdrop-filter</code> is unsupported the opaque
              gradient fallback replaces the glass; the information and the
              contrast do not change.
            </li>
          </ul>
        </Prose>
      </Section>

      <Section
        title="Keyboard trace"
        lead="The five interaction models that are easiest to get wrong."
      >
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- a scroll container must be reachable by keyboard */}
        <div tabIndex={0} className={styles.traceWrap}>
          <table className={styles.trace}>
            <thead>
              <tr>
                <th scope="col">Pattern</th>
                <th scope="col">Keys</th>
                <th scope="col">Expected</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Dialog</th>
                <td>
                  <kbd>Tab</kbd> / <kbd>Shift</kbd>+<kbd>Tab</kbd>
                  <br />
                  <kbd>Escape</kbd>
                </td>
                <td>
                  Cycle inside the dialog and wrap at both ends. Escape closes
                  and returns focus to the trigger.
                </td>
              </tr>
              <tr>
                <th scope="row">DropdownMenu</th>
                <td>
                  <kbd>↓</kbd> <kbd>↑</kbd> <kbd>Home</kbd> <kbd>End</kbd>
                  <br />
                  <kbd>Enter</kbd> / <kbd>Space</kbd> / <kbd>Escape</kbd>
                </td>
                <td>
                  Move between enabled items, skipping disabled ones. Selection
                  closes the menu; Escape closes and returns focus to the
                  trigger.
                </td>
              </tr>
              <tr>
                <th scope="row">Tooltip</th>
                <td>
                  <kbd>Tab</kbd> / hover
                  <br />
                  <kbd>Escape</kbd>
                </td>
                <td>
                  Show on focus or hover and describe the trigger with
                  aria-describedby. Escape dismisses without moving focus; focus
                  again reopens it.
                </td>
              </tr>
              <tr>
                <th scope="row">Tabs</th>
                <td>
                  <kbd>←</kbd> <kbd>→</kbd> <kbd>Home</kbd> <kbd>End</kbd>
                </td>
                <td>
                  Roving tabindex: one tab in the tab order, arrows select and
                  move focus, Home and End jump to the first and last enabled
                  tabs, and the panel is labelled by its tab.
                </td>
              </tr>
              <tr>
                <th scope="row">Toast</th>
                <td>
                  <kbd>Tab</kbd>
                  <br />
                  <kbd>Enter</kbd> / <kbd>Space</kbd>
                </td>
                <td>
                  The dismiss control is reachable in order. Hover or focus
                  pauses the timer; dismiss removes the status without moving
                  the user away from the card.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section
        title="Deliberate deviations from Card B"
        lead="The card is a reference, not a screenshot to reproduce."
      >
        <Prose>
          <ul>
            <li>
              The black wordmark becomes cream where it sits in the abyss zone;
              black on the bright end would invert the card’s hierarchy.
            </li>
            <li>
              Type never crosses the periwinkle or cyan middle without a scrim or
              a dark panel. The card can be more decorative than a working page.
            </li>
            <li>
              Glass stays at or below 12% white behind cream text. The card’s
              specular bubbles are ornament; they are never the only boundary of
              a control.
            </li>
            <li>
              The seigaiha field is decorative, masked, pointer-transparent and
              hidden from assistive technology. It appears at the header, the
              sidebar edge, the system mark and empty states, never behind body
              text.
            </li>
            <li>
              The orb is aria-hidden ornament with one slow shimmer, not a
              control. Reduced motion stops the shimmer and every hover lift.
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
