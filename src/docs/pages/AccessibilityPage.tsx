import { components } from "../registry";
import { routes } from "../routes";
import { Page, PageHead, Section } from "../ui";
import styles from "./pages.module.css";

const rules = [
  {
    label: "Contrast",
    body: "Body text meets 4.5:1 on the page ground; large text and control boundaries meet 3:1. Ink stops and text-safe accents carry colour; the bright gradient stops are fills only. Disabled text is the one documented exemption.",
  },
  {
    label: "Focus",
    body: "A 2px ink outline with a 2px offset on every focusable element. Focus is never removed, and overlays return it to the trigger when they close.",
  },
  {
    label: "Keyboard",
    body: "Every control is reachable and operable. Dialogs trap focus, menus use arrows and Home/End, tabs use arrows, tooltips open on focus, and Escape closes the overlay that owns it.",
  },
  {
    label: "Motion",
    body: "prefers-reduced-motion removes movement and shimmer, keeps at most one opacity change, and disables replay controls. Skeletons, progress and loading rows all have a static state.",
  },
  {
    label: "Structure",
    body: "Header, navigation, main and footer landmarks; a skip link first in tab order; one h1 per route; visible labels bound to every control; tables named by a caption.",
  },
  {
    label: "Targets",
    body: "At least 24px square under WCAG 2.2. Compact buttons are 30px, pagination 26px, tags and avatars 24px, and every icon-only action is inside a named control.",
  },
];

const deviations = [
  {
    card: "Lavender squares read as redaction.",
    rule: "Decorative only, always aria-hidden.",
    why: "They stand for withheld information, not live state. Encoding state in them would announce noise.",
  },
  {
    card: "The gradient is a large field and can touch type.",
    rule: "Fills only. Never behind text, never a button fill.",
    why: "Text on the bright stops cannot hold AA. Text over the form sits on a cream plate clipped to the same path.",
  },
  {
    card: "Amber, orange and magenta are used as ink.",
    rule: "Text uses the text-safe accent variants.",
    why: "The bright stops fail on cream at body sizes. The darker variants keep the warm family and pass 4.5:1.",
  },
  {
    card: "The seals are part of the identity.",
    rule: "Seals are aria-hidden unless they encode real state.",
    why: "A decorative numeral should not be read twice. If a seal becomes a metric, it gains a text label.",
  },
  {
    card: "Pure black sits on the gradient.",
    rule: "No pure black anywhere. Ink or a cream plate instead.",
    why: "Black on the gradient is harsh and fails the softness of the print reference. Ink keeps one temperature across the system.",
  },
  {
    card: "The card has a visibly rounded corner.",
    rule: "Structural containers are square. Controls take 2px; only seals and avatars are round.",
    why: "The archive grammar depends on sharp keylines. The organic form is the one permitted exception.",
  },
];

const traces = [
  {
    component: "Dialog",
    keys: "Tab / Shift+Tab",
    expected: "Cycles through the close button, fields and actions inside the panel.",
  },
  {
    component: "Dialog",
    keys: "Escape",
    expected: "Closes the dialog and returns focus to the trigger that opened it.",
  },
  {
    component: "DropdownMenu",
    keys: "Enter / Space / ArrowDown",
    expected: "Opens the menu and moves focus to the first enabled action.",
  },
  {
    component: "DropdownMenu",
    keys: "ArrowUp / ArrowDown / Home / End",
    expected: "Moves through enabled actions and wraps at both ends.",
  },
  {
    component: "DropdownMenu",
    keys: "Escape",
    expected: "Closes the menu and returns focus to the trigger.",
  },
  {
    component: "Tooltip",
    keys: "Focus / hover",
    expected: "Shows the tooltip and sets aria-describedby on the trigger.",
  },
  {
    component: "Tooltip",
    keys: "Escape",
    expected: "Hides the tooltip and removes aria-describedby without moving focus.",
  },
  {
    component: "Tabs",
    keys: "ArrowLeft / ArrowRight / Home / End",
    expected: "Selects and focuses the next tab, wrapping at both ends.",
  },
  {
    component: "Tabs",
    keys: "Tab",
    expected: "Leaves the tablist for the active tabpanel.",
  },
  {
    component: "Toast",
    keys: "Tab / Enter / Space",
    expected: "Reaches the dismiss button; Enter or Space dismisses the toast.",
  },
  {
    component: "Toast",
    keys: "Hover / focus",
    expected: "Pauses the timer and shows Paused in the label strip.",
  },
];

export function AccessibilityPage() {
  const compromises = components.filter((component) => component.compromise);

  return (
    <Page>
      <PageHead
        eyebrow="Arcana / Closing note"
        title="Accessibility"
        job="The bar the system holds, the places where the seed card had to give way, and the keyboard contracts every overlay keeps."
        sheet={"Sheet 04\nWCAG 2.2 AA"}
      />

      <Section index="01" title="The bar we hold" note="WCAG 2.2 AA">
        <dl className={styles.a11yRules}>
          {rules.map((rule) => (
            <div key={rule.label}>
              <dt>{rule.label}</dt>
              <dd>{rule.body}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section
        index="02"
        title="Deliberate deviations"
        note="Card A → system rule"
      >
        <div className={styles.tableScroll}>
          <table className={styles.deviationTable}>
            <caption>
              Visual traits from the seed card and the rule that replaces them
            </caption>
            <thead>
              <tr>
                <th scope="col">Card trait</th>
                <th scope="col">System rule</th>
                <th scope="col">Why</th>
              </tr>
            </thead>
            <tbody>
              {deviations.map((row) => (
                <tr key={row.card}>
                  <td>{row.card}</td>
                  <td>{row.rule}</td>
                  <td>{row.why}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section
        index="03"
        title="Component compromises"
        note={`${compromises.length} documented`}
      >
        <dl className={styles.a11yRules}>
          {compromises.map((component) => (
            <div key={component.id}>
              <dt>
                <a href={routes.component(component.id)}>{component.name}</a>
              </dt>
              <dd>{component.compromise}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section index="04" title="Keyboard traces" note="Tested contracts">
        <div className={styles.tableScroll}>
          <table className={styles.deviationTable}>
            <caption>
              Keyboard contracts for Dialog, DropdownMenu, Tooltip, Tabs and
              Toast
            </caption>
            <thead>
              <tr>
                <th scope="col">Component</th>
                <th scope="col">Keys</th>
                <th scope="col">Expected behaviour</th>
              </tr>
            </thead>
            <tbody>
              {traces.map((trace, index) => (
                <tr key={`${trace.component}-${index}`}>
                  <td>{trace.component}</td>
                  <td>{trace.keys}</td>
                  <td>{trace.expected}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section index="05" title="Audit" note="Automated and manual">
        <div className={styles.auditGrid}>
          <div className={styles.auditItem}>
            <p className={styles.auditLabel}>axe-core · Chromium</p>
            <p className={styles.auditValue}>0 violations</p>
            <p className={styles.auditNote}>
              All 36 routes at 360 and 1440 widths; Overview, Dialog, Table and
              Accessibility also at 768 and 1024. Four findings from the first
              pass were fixed: scrollable tables are focusable regions, repeated
              breadcrumb and pagination landmarks have unique labels, and the
              forced hover segment and disabled tag meet contrast.
            </p>
          </div>
          <div className={styles.auditItem}>
            <p className={styles.auditLabel}>Manual contrast</p>
            <p className={styles.auditValue}>AA throughout</p>
            <p className={styles.auditNote}>
              Ink on paper is 12.38:1, secondary text 6.58:1, muted text 5.21:1,
              and the interactive rule 3.28:1. Disabled ink is 3.00:1 and is
              exempt. The gradient carries no text.
            </p>
          </div>
          <div className={styles.auditItem}>
            <p className={styles.auditLabel}>Motion</p>
            <p className={styles.auditValue}>Static fallbacks</p>
            <p className={styles.auditNote}>
              Skeleton pulse, indeterminate progress, toast reveal and overlay
              entrances all resolve to a static or opacity-only state under
              prefers-reduced-motion.
            </p>
          </div>
          <div className={styles.auditItem}>
            <p className={styles.auditLabel}>Viewport</p>
            <p className={styles.auditValue}>360–1440</p>
            <p className={styles.auditNote}>
              No horizontal page scroll. State grids wrap, table scroll stays
              inside its keyline box, and the Contents disclosure closes on
              navigation below 768.
            </p>
          </div>
        </div>
      </Section>
    </Page>
  );
}
