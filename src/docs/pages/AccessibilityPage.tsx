import { Page, PageHead, Section } from "../ui";
import styles from "./pages.module.css";

const rules = [
  {
    label: "Contrast",
    body: "Body text meets 4.5:1 on the page ground; large text and control boundaries meet 3:1. Ink stops and text-safe accents carry colour; the bright gradient stops are fills only.",
  },
  {
    label: "Focus",
    body: "A 2px ink outline with a 2px offset on every focusable element. Focus is never removed, and the outline is never hidden behind a container.",
  },
  {
    label: "Keyboard",
    body: "Every control is reachable and operable. Tabs and segments move with arrow keys, Home and End; a Switch toggles with Space and Enter; Escape clears a populated search field.",
  },
  {
    label: "Motion",
    body: "prefers-reduced-motion removes movement and shimmer, keeps at most one opacity change, and disables replay controls. No parallax, no auto-playing loops.",
  },
  {
    label: "Structure",
    body: "Header, navigation, main and footer landmarks; a skip link first in tab order; one h1 per route; visible labels bound to every control.",
  },
  {
    label: "Targets",
    body: "At least 24px square under WCAG 2.2. The compact controls in this system are 30px or larger, and the two smallest icons still sit inside a 30px button.",
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

export function AccessibilityPage() {
  return (
    <Page>
      <PageHead
        eyebrow="Arcana / Closing note"
        title="Accessibility"
        job="The bar the system documents, and the places where the card had to give way. This is a Phase A stub: rules and deliberate deviations, not audit results."
        sheet={"Sheet 04\nPhase A stub"}
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

      <Section index="03" title="Phase B" note="Provisional">
        <div className={styles.phaseB}>
          <p className={styles.phaseLabel}>Not yet audited</p>
          <ul>
            <li>
              axe run over the built documentation page at 360, 768, 1024 and
              1440.
            </li>
            <li>
              Per-component contrast table, checked against the live computed
              values.
            </li>
            <li>
              Keyboard traces for the overlay components once Dialog,
              DropdownMenu and Toast ship.
            </li>
            <li>
              Reduced-motion audit of every animated surface and every state
              grid.
            </li>
            <li>
              Focus return, live-region and error-announcement checks on the
              Phase B forms.
            </li>
          </ul>
          <p className={styles.phaseFoot}>
            What already holds: skip link, landmarks, one h1 per route, visible
            focus, reduced-motion handling, and keyboard tests for Tabs and
            Switch. The full audit and the completed page belong to Phase B.
          </p>
        </div>
      </Section>
    </Page>
  );
}
