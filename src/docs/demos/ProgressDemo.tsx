import { Progress } from "../../components/Progress";
import { Specimen, SpecimenGrid, State, StateGrid } from "../specimen";
import styles from "./demo.module.css";

export function Demo() {
  return (
    <div className={styles.progressGrid}>
      <Progress label="Session recall" value={98} variant="ring" size="lg" />
      <div className={styles.progressStack}>
        <Progress label="Daily goal · 20 of 30" value={67} />
        <Progress label="Cards synced" value={100} />
        <Progress label="Deck loading" indeterminate />
      </div>
    </div>
  );
}

export function Variants() {
  return (
    <SpecimenGrid columns={2}>
      <Specimen label="Bar, small" wide>
        <Progress label="Daily goal" value={67} size="sm" />
      </Specimen>
      <Specimen label="Bar, medium" wide>
        <Progress label="Daily goal" value={67} />
      </Specimen>
      <Specimen label="Bar, large" wide>
        <Progress label="Daily goal" value={67} size="lg" />
      </Specimen>
      <Specimen label="Ring, small">
        <Progress label="Recall" value={98} variant="ring" size="sm" />
      </Specimen>
      <Specimen label="Ring, medium">
        <Progress label="Recall" value={98} variant="ring" />
      </Specimen>
      <Specimen label="Ring, large">
        <Progress label="Recall" value={98} variant="ring" size="lg" />
      </Specimen>
    </SpecimenGrid>
  );
}

export function States() {
  return (
    <StateGrid>
      <State label="Determinate">
        <Progress label="Recall" value={64} />
      </State>
      <State label="Indeterminate">
        <Progress label="Loading" indeterminate />
      </State>
      <State label="Complete">
        <Progress label="Recall" value={100} />
      </State>
      <State label="Ring">
        <Progress label="Recall" value={64} variant="ring" size="sm" />
      </State>
    </StateGrid>
  );
}
