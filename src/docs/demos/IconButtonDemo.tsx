import { useState } from "react";
import { IconButton } from "../../components/IconButton";
import { Specimen, SpecimenGrid, State, StateGrid } from "../specimen";
import styles from "./demo.module.css";

export function Demo() {
  const [muted, setMuted] = useState(false);
  return (
    <div className={styles.stack}>
      <div className={styles.deck}>
        <div className={styles.deckHead}>
          <h3 className={styles.deckName}>Spanish Verbs</h3>
          <span className={styles.meta}>Reviewing now</span>
        </div>
        <p className={styles.muted}>84 cards due · la llave is next</p>
        <div className={styles.iconRow}>
          <IconButton label="Shuffle deck" icon="shuffle" variant="solid" />
          <IconButton
            label={muted ? "Unmute audio" : "Mute audio"}
            icon={muted ? "moon" : "sun"}
            variant="solid"
            onClick={() => setMuted((value) => !value)}
          />
          <IconButton label="Study settings" icon="filter" />
          <IconButton label="Close deck" icon="close" />
        </div>
      </div>
      <p className={styles.inlineNote}>
        Compact actions keep a label in the accessible name, never only in the
        icon.
      </p>
    </div>
  );
}

export function Variants() {
  return (
    <SpecimenGrid columns={2}>
      <Specimen label="Solid, medium">
        <IconButton label="Shuffle deck" icon="shuffle" variant="solid" />
      </Specimen>
      <Specimen label="Ghost, medium">
        <IconButton label="Shuffle deck" icon="shuffle" />
      </Specimen>
      <Specimen label="Solid, small">
        <IconButton
          label="Close deck"
          icon="close"
          variant="solid"
          size="sm"
        />
      </Specimen>
      <Specimen label="Ghost, small">
        <IconButton label="Close deck" icon="close" size="sm" />
      </Specimen>
    </SpecimenGrid>
  );
}

export function States() {
  return (
    <StateGrid>
      <State label="Default">
        <IconButton label="Shuffle deck" icon="shuffle" variant="solid" />
      </State>
      <State label="Hover">
        <IconButton
          label="Shuffle deck"
          icon="shuffle"
          variant="solid"
          preview="hover"
        />
      </State>
      <State label="Focus">
        <IconButton
          label="Shuffle deck"
          icon="shuffle"
          variant="solid"
          preview="focus"
        />
      </State>
      <State label="Disabled">
        <IconButton label="Shuffle deck" icon="shuffle" disabled />
      </State>
    </StateGrid>
  );
}
