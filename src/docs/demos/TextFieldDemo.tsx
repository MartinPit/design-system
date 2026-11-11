import { useState } from "react";
import { TextField } from "../../components/TextField";
import { Specimen, SpecimenGrid, State, StateGrid } from "../specimen";
import styles from "./demo.module.css";

export function Demo() {
  const [name, setName] = useState("Kanji N3");
  return (
    <div className={styles.form}>
      <TextField
        label="Deck name"
        hint="Shown on the deck card and in study history."
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <p className={styles.inlineNote}>
        {name.trim()
          ? `“${name}” is ready to save.`
          : "A deck needs a name before it can be saved."}
      </p>
    </div>
  );
}

export function Variants() {
  return (
    <SpecimenGrid columns={2}>
      <Specimen label="With hint">
        <TextField label="Deck name" hint="Kanji N3, Spanish Verbs, Biology 101" />
      </Specimen>
      <Specimen label="With error">
        <TextField
          label="Deck name"
          defaultValue=""
          error="Give the deck a name."
        />
      </Specimen>
      <Specimen label="Small">
        <TextField label="Card count" defaultValue="142" size="sm" />
      </Specimen>
      <Specimen label="Filled">
        <TextField label="Deck name" defaultValue="Biology 101" />
      </Specimen>
    </SpecimenGrid>
  );
}

export function States() {
  return (
    <StateGrid>
      <State label="Default">
        <TextField label="Deck name" placeholder="Kanji N3" />
      </State>
      <State label="Focus">
        <TextField label="Deck name" defaultValue="Kanji N3" preview="focus" />
      </State>
      <State label="Filled">
        <TextField label="Deck name" defaultValue="Kanji N3" />
      </State>
      <State label="Error">
        <TextField
          label="Deck name"
          defaultValue=""
          error="Give the deck a name."
        />
      </State>
      <State label="Disabled">
        <TextField label="Deck name" defaultValue="Kanji N3" disabled />
      </State>
      <State label="Read-only">
        <TextField label="Deck name" defaultValue="Kanji N3" readOnly />
      </State>
    </StateGrid>
  );
}
