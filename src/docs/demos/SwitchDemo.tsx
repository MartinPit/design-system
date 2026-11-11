import { useState } from "react";
import { Switch } from "../../components/Switch";
import { Specimen, SpecimenGrid, State, StateGrid } from "../specimen";
import styles from "./demo.module.css";

export function Demo() {
  const [reminders, setReminders] = useState(true);
  return (
    <div className={styles.stack}>
      <div className={styles.panel}>
        <div className={styles.stack}>
          <Switch
            label="Study reminders"
            checked={reminders}
            onCheckedChange={setReminders}
          />
          <p className={styles.muted}>
            {reminders
              ? "A reminder arrives at 19:00, only when cards are due."
              : "No reminders. The deck waits for you."}
          </p>
        </div>
      </div>
      <p className={styles.inlineNote}>
        Space or Enter toggles. The visible label is the accessible name.
      </p>
    </div>
  );
}

export function Variants() {
  return (
    <SpecimenGrid columns={2}>
      <Specimen label="On">
        <Switch label="Study reminders" defaultChecked />
      </Specimen>
      <Specimen label="Off">
        <Switch label="Study reminders" />
      </Specimen>
      <Specimen label="Small, on">
        <Switch label="Study reminders" size="sm" defaultChecked />
      </Specimen>
      <Specimen label="Small, off">
        <Switch label="Study reminders" size="sm" />
      </Specimen>
    </SpecimenGrid>
  );
}

export function States() {
  return (
    <StateGrid>
      <State label="On">
        <Switch label="Reminders" defaultChecked />
      </State>
      <State label="Off">
        <Switch label="Reminders" />
      </State>
      <State label="Hover">
        <Switch label="Reminders" preview="hover" />
      </State>
      <State label="Focus">
        <Switch label="Reminders" preview="focus" />
      </State>
      <State label="Disabled">
        <Switch label="Reminders" defaultChecked disabled />
      </State>
    </StateGrid>
  );
}
