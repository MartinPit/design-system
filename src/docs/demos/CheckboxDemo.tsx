import { useState } from "react";
import { Checkbox } from "../../components/Checkbox";
import { Specimen, SpecimenGrid, State, StateGrid } from "../specimen";
import styles from "./demo.module.css";

export function Demo() {
  const [dueOnly, setDueOnly] = useState(true);
  const [hidden, setHidden] = useState(false);
  return (
    <div className={styles.stack}>
      <div className={styles.panel}>
        <div className={styles.stack}>
          <Checkbox
            label="Only due cards"
            hint="142 of 1,204 cards are due today."
            checked={dueOnly}
            onChange={(event) => setDueOnly(event.target.checked)}
          />
          <Checkbox
            label="Hide suspended cards"
            checked={hidden}
            onChange={(event) => setHidden(event.target.checked)}
          />
        </div>
      </div>
      <p className={styles.inlineNote}>
        Two filters, neither of them a commit. The list updates behind the
        panel.
      </p>
    </div>
  );
}

export function Variants() {
  return (
    <SpecimenGrid columns={2}>
      <Specimen label="Single">
        <Checkbox label="Only due cards" defaultChecked />
      </Specimen>
      <Specimen label="Indeterminate">
        <Checkbox
          label="Some decks selected"
          indeterminate
          aria-label="Some decks selected"
        />
      </Specimen>
      <Specimen label="Small">
        <Checkbox label="Show answers" size="sm" />
      </Specimen>
      <Specimen label="With error">
        <Checkbox label="Accept the study plan" error="Required to continue." />
      </Specimen>
    </SpecimenGrid>
  );
}

export function States() {
  return (
    <StateGrid>
      <State label="Unchecked">
        <Checkbox label="Only due cards" />
      </State>
      <State label="Checked">
        <Checkbox label="Only due cards" defaultChecked />
      </State>
      <State label="Indeterminate">
        <Checkbox label="All decks" indeterminate />
      </State>
      <State label="Hover">
        <Checkbox label="Only due cards" preview="hover" />
      </State>
      <State label="Focus">
        <Checkbox label="Only due cards" preview="focus" />
      </State>
      <State label="Disabled">
        <Checkbox label="Only due cards" disabled defaultChecked />
      </State>
      <State label="Error">
        <Checkbox label="Only due cards" error="Select a filter." />
      </State>
    </StateGrid>
  );
}
