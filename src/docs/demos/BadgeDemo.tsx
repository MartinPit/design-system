import { Badge } from "../../components/Badge";
import { Specimen, SpecimenGrid, State, StateGrid } from "../specimen";
import styles from "./demo.module.css";

export function Demo() {
  return (
    <div className={styles.stack}>
      <div className={styles.panel}>
        <div className={styles.tagRow}>
          <Badge variant="warning">142 due</Badge>
          <Badge variant="success">98% recall</Badge>
          <Badge variant="accent">Kanji N3</Badge>
          <Badge variant="neutral">Archived</Badge>
          <Badge variant="danger">Sync failed</Badge>
        </div>
        <p className={styles.muted} style={{ marginBlockStart: "var(--space-4)" }}>
          A badge is a label. It never carries an action or a dismissal.
        </p>
      </div>
    </div>
  );
}

export function Variants() {
  return (
    <SpecimenGrid columns={2}>
      <Specimen label="Neutral">
        <Badge variant="neutral">Archived</Badge>
      </Specimen>
      <Specimen label="Accent">
        <Badge variant="accent">Kanji N3</Badge>
      </Specimen>
      <Specimen label="Success">
        <Badge variant="success">98% recall</Badge>
      </Specimen>
      <Specimen label="Warning">
        <Badge variant="warning">142 due</Badge>
      </Specimen>
      <Specimen label="Danger">
        <Badge variant="danger">Sync failed</Badge>
      </Specimen>
      <Specimen label="Small">
        <Badge variant="accent" size="sm">
          12-day streak
        </Badge>
      </Specimen>
    </SpecimenGrid>
  );
}

export function States() {
  return (
    <StateGrid>
      <State label="Neutral">
        <Badge variant="neutral">Archived</Badge>
      </State>
      <State label="Accent">
        <Badge variant="accent">Kanji N3</Badge>
      </State>
      <State label="Success">
        <Badge variant="success">98% recall</Badge>
      </State>
      <State label="Warning">
        <Badge variant="warning">142 due</Badge>
      </State>
      <State label="Danger">
        <Badge variant="danger">Sync failed</Badge>
      </State>
    </StateGrid>
  );
}
