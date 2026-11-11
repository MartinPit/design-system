import { useState } from "react";
import { SearchField } from "../../components/SearchField";
import { Specimen, SpecimenGrid, State, StateGrid } from "../specimen";
import styles from "./demo.module.css";

export function Demo() {
  const [query, setQuery] = useState("");
  const result =
    query.trim().length === 0
      ? "142 cards due across 3 decks"
      : `${query.length % 7} matches for “${query}”`;
  return (
    <div className={styles.form}>
      <SearchField
        label="Search cards"
        placeholder="Find a deck or a card"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onClear={() => setQuery("")}
        shortcut="⌘K"
      />
      <p className={styles.inlineNote}>{result}</p>
    </div>
  );
}

export function Variants() {
  return (
    <SpecimenGrid columns={2}>
      <Specimen label="With shortcut" wide>
        <SearchField label="Search cards" shortcut="⌘K" />
      </Specimen>
      <Specimen label="With clear" wide>
        <SearchField label="Search cards" defaultValue="la llave" />
      </Specimen>
      <Specimen label="With hint" wide>
        <SearchField
          label="Search cards"
          hint="Searches prompts, answers and deck names."
        />
      </Specimen>
    </SpecimenGrid>
  );
}

export function States() {
  return (
    <StateGrid>
      <State label="Empty">
        <SearchField label="Search cards" />
      </State>
      <State label="Typing">
        <SearchField label="Search cards" defaultValue="la" preview="focus" />
      </State>
      <State label="Filled">
        <SearchField label="Search cards" defaultValue="la llave" />
      </State>
      <State label="Focus">
        <SearchField label="Search cards" preview="focus" />
      </State>
      <State label="Disabled">
        <SearchField label="Search cards" defaultValue="kanji" disabled />
      </State>
    </StateGrid>
  );
}
