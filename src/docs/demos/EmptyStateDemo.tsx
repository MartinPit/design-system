import { useState } from "react";
import { Button } from "../../components/Button";
import { EmptyState } from "../../components/EmptyState";
import { Specimen, SpecimenGrid, State } from "../specimen";
import styles from "./demo.module.css";

export function Demo() {
  const [mode, setMode] = useState<"due" | "search">("due");
  return (
    <div className={styles.stack}>
      <div className={styles.emptyFrame}>
        <EmptyState
          title={mode === "due" ? "No cards due" : "No cards match"}
          description={
            mode === "due"
              ? "You cleared Kanji N3 for today. The next review is tomorrow at 08:00."
              : "Try a shorter query, or search the deck name instead of the card."
          }
          action={
            <Button
              variant="secondary"
              onClick={() => setMode(mode === "due" ? "search" : "due")}
            >
              {mode === "due" ? "Search all cards" : "Back to due cards"}
            </Button>
          }
        />
      </div>
      <p className={styles.inlineNote}>
        An empty state names what is empty and gives one next step.
      </p>
    </div>
  );
}

export function Variants() {
  return (
    <SpecimenGrid columns={2}>
      <Specimen label="With action" wide>
        <EmptyState
          title="No cards due"
          description="The next review is tomorrow at 08:00."
          action={<Button size="sm">Browse all cards</Button>}
        />
      </Specimen>
      <Specimen label="Without action" wide>
        <EmptyState
          title="No cards match"
          description="Try a shorter query, or search the deck name instead."
        />
      </Specimen>
    </SpecimenGrid>
  );
}

export function States() {
  return (
    <div className={styles.stateStack}>
      <State label="Empty deck">
        <EmptyState
          title="No cards yet"
          description="Add the first card to Kanji N3 and it will appear here."
          action={<Button size="sm">Add a card</Button>}
        />
      </State>
      <State label="No results">
        <EmptyState
          title="No cards match"
          description="Try a shorter query, or search the deck name instead."
        />
      </State>
      <State label="First run">
        <EmptyState
          title="Your first session"
          description="Decks live here once you add a card. Start with Kanji N3."
          action={<Button size="sm" variant="secondary">Add Kanji N3</Button>}
        />
      </State>
    </div>
  );
}
