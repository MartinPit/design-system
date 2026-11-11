import { useState } from "react";
import { TextArea } from "../../components/TextArea";
import { Specimen, SpecimenGrid, State, StateGrid } from "../specimen";
import styles from "./demo.module.css";

export function Demo() {
  const [answer, setAnswer] = useState("to remember");
  return (
    <div className={styles.form}>
      <TextArea
        label="Answer"
        hint="Write it as you would say it aloud."
        maxLength={120}
        showCount
        value={answer}
        onChange={(event) => setAnswer(event.target.value)}
      />
      <p className={styles.inlineNote}>
        The counter is text, not a progress bar. It never replaces the limit.
      </p>
    </div>
  );
}

export function Variants() {
  return (
    <SpecimenGrid columns={2}>
      <Specimen label="With counter" wide>
        <TextArea
          label="Answer"
          maxLength={120}
          showCount
          defaultValue="to remember"
        />
      </Specimen>
      <Specimen label="With error" wide>
        <TextArea
          label="Answer"
          error="An answer of one word is hard to recall."
        />
      </Specimen>
    </SpecimenGrid>
  );
}

export function States() {
  return (
    <StateGrid>
      <State label="Default">
        <TextArea label="Answer" placeholder="la llave" />
      </State>
      <State label="Focus">
        <TextArea label="Answer" defaultValue="to remember" preview="focus" />
      </State>
      <State label="Filled">
        <TextArea label="Answer" defaultValue="to remember" />
      </State>
      <State label="Error">
        <TextArea label="Answer" error="Add an answer." />
      </State>
      <State label="Disabled">
        <TextArea label="Answer" defaultValue="to remember" disabled />
      </State>
      <State label="Read-only">
        <TextArea label="Answer" defaultValue="to remember" readOnly />
      </State>
    </StateGrid>
  );
}
