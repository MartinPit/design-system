import { useState } from "react";
import { Badge } from "../../components/Badge";
import { Card } from "../../components/Card";
import { Progress } from "../../components/Progress";
import { Specimen, SpecimenGrid, State, StateGrid } from "../specimen";
import styles from "./demo.module.css";

export function Demo() {
  const [selected, setSelected] = useState(false);
  return (
    <div className={styles.workspace}>
      <Card variant="raised" className={styles.tile}>
        <div className={styles.deckHead}>
          <h3 className={styles.deckName}>Kanji N3</h3>
          <Badge variant="warning">142 due</Badge>
        </div>
        <p className={styles.muted}>12-day streak · 98% recall this week</p>
        <div className={styles.deckBody}>
          <Progress label="Weekly recall" value={98} showValue />
        </div>
      </Card>

      <Card
        variant={selected ? "selected" : "interactive"}
        interactive
        onActivate={() => setSelected((value) => !value)}
        className={styles.tile}
      >
        <p className={styles.cardMeta}>Card 142 · Kanji N3</p>
        <p className={styles.cardAnswer}>to remember</p>
        <p className={styles.muted}>
          {selected
            ? "Selected. Press again to close the card."
            : "Press Enter to select this card."}
        </p>
      </Card>
    </div>
  );
}

export function Variants() {
  return (
    <SpecimenGrid columns={2}>
      <Specimen label="Flat">
        <Card variant="flat">
          <p className={styles.deckName}>Biology 101</p>
        </Card>
      </Specimen>
      <Specimen label="Raised">
        <Card variant="raised">
          <p className={styles.deckName}>Spanish Verbs</p>
        </Card>
      </Specimen>
      <Specimen label="Interactive">
        <Card variant="interactive" interactive onActivate={() => undefined}>
          <p className={styles.deckName}>Kanji N3</p>
        </Card>
      </Specimen>
      <Specimen label="Selected">
        <Card variant="selected">
          <p className={styles.deckName}>Kanji N3</p>
        </Card>
      </Specimen>
      <Specimen label="Small">
        <Card variant="flat" size="sm">
          <p className={styles.meta}>142 cards due</p>
        </Card>
      </Specimen>
      <Specimen label="Large">
        <Card variant="flat" size="lg">
          <p className={styles.deckName}>Kanji N3</p>
        </Card>
      </Specimen>
    </SpecimenGrid>
  );
}

export function States() {
  return (
    <StateGrid>
      <State label="Default">
        <Card variant="flat" size="sm">
          <p className={styles.meta}>Kanji N3</p>
        </Card>
      </State>
      <State label="Hover">
        <Card
          variant="interactive"
          size="sm"
          interactive
          preview="hover"
          onActivate={() => undefined}
        >
          <p className={styles.meta}>Kanji N3</p>
        </Card>
      </State>
      <State label="Selected">
        <Card variant="selected" size="sm">
          <p className={styles.meta}>Kanji N3</p>
        </Card>
      </State>
      <State label="Focus">
        <Card
          variant="interactive"
          size="sm"
          interactive
          preview="focus"
          onActivate={() => undefined}
        >
          <p className={styles.meta}>Kanji N3</p>
        </Card>
      </State>
      <State label="Disabled">
        <Card variant="interactive" size="sm" interactive disabled>
          <p className={styles.meta}>Kanji N3</p>
        </Card>
      </State>
    </StateGrid>
  );
}
