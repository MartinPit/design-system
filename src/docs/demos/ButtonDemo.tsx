import { useEffect, useState } from "react";
import { Button } from "../../components/Button";
import { Specimen, SpecimenGrid, State, StateGrid } from "../specimen";
import styles from "./demo.module.css";

export function Demo() {
  const [state, setState] = useState<"idle" | "saving" | "saved">("idle");

  useEffect(() => {
    if (state !== "saving") return;
    const timer = window.setTimeout(() => setState("saved"), 900);
    return () => window.clearTimeout(timer);
  }, [state]);

  return (
    <div className={styles.stack}>
      <div className={styles.deck}>
        <div className={styles.deckHead}>
          <h3 className={styles.deckName}>Kanji N3</h3>
          <span className={styles.count}>142 cards due</span>
        </div>
        <p className={styles.muted}>12-day streak · 98% recall this week</p>
      </div>
      <div className={styles.row}>
        <Button
          onClick={() => setState("saving")}
          loading={state === "saving"}
        >
          {state === "saved" ? "Saved" : "Save card"}
        </Button>
        <Button variant="secondary">Start session</Button>
        <Button variant="ghost">Skip today</Button>
      </div>
      <p className={styles.inlineNote}>
        {state === "saved"
          ? "Saved locally. The next sync will carry it."
          : "A primary action commits; everything else waits behind it."}
      </p>
    </div>
  );
}

export function Variants() {
  return (
    <SpecimenGrid columns={2}>
      <Specimen label="Primary">
        <Button>Start session</Button>
      </Specimen>
      <Specimen label="Secondary">
        <Button variant="secondary">Save card</Button>
      </Specimen>
      <Specimen label="Ghost">
        <Button variant="ghost">Skip today</Button>
      </Specimen>
      <Specimen label="Danger">
        <Button variant="danger">Delete deck</Button>
      </Specimen>
      <Specimen label="Small">
        <Button size="sm">Review</Button>
      </Specimen>
      <Specimen label="Large">
        <Button size="lg">Start session</Button>
      </Specimen>
    </SpecimenGrid>
  );
}

export function States() {
  return (
    <StateGrid>
      <State label="Default">
        <Button>Save card</Button>
      </State>
      <State label="Hover">
        <Button preview="hover">Save card</Button>
      </State>
      <State label="Active">
        <Button preview="active">Save card</Button>
      </State>
      <State label="Focus">
        <Button preview="focus">Save card</Button>
      </State>
      <State label="Disabled">
        <Button disabled>Save card</Button>
      </State>
      <State label="Loading">
        <Button loading>Save card</Button>
      </State>
    </StateGrid>
  );
}
