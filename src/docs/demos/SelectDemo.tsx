import { useState } from "react";
import { Select } from "../../components/Select";
import { Caption, Specimen, SpecimenGrid, State, StateGrid } from "../specimen";
import styles from "./demo.module.css";

const decks = [
  { value: "kanji", label: "Kanji N3" },
  { value: "spanish", label: "Spanish Verbs" },
  { value: "biology", label: "Biology 101" },
];

export function Demo() {
  const [deck, setDeck] = useState("kanji");
  const name = decks.find((item) => item.value === deck)?.label ?? "Kanji N3";
  return (
    <div className={styles.form}>
      <Select
        label="Deck"
        value={deck}
        onChange={(event) => setDeck(event.target.value)}
      >
        {decks.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </Select>
      <p className={styles.inlineNote}>{name} · 142 cards due</p>
    </div>
  );
}

export function Variants() {
  return (
    <SpecimenGrid columns={2}>
      <Specimen label="Default">
        <Select label="Deck" defaultValue="kanji">
          {decks.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </Select>
      </Specimen>
      <Specimen label="Small">
        <Select label="Sort order" defaultValue="due" size="sm">
          <option value="due">Due first</option>
          <option value="alpha">A–Z</option>
        </Select>
      </Specimen>
      <Specimen label="With error">
        <Select label="Deck" error="Choose a deck to continue." defaultValue="">
          <option value="">Select a deck</option>
          {decks.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </Select>
      </Specimen>
      <Specimen label="Filled">
        <Select label="Deck" defaultValue="biology">
          {decks.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </Select>
      </Specimen>
    </SpecimenGrid>
  );
}

export function States() {
  return (
    <StateGrid>
      <State label="Default">
        <Select label="Deck" defaultValue="">
          <option value="">Select a deck</option>
          {decks.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </Select>
      </State>
      <State label="Focus">
        <Select label="Deck" defaultValue="kanji" preview="focus">
          {decks.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </Select>
      </State>
      <State label="Filled">
        <Select label="Deck" defaultValue="spanish">
          {decks.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </Select>
      </State>
      <State label="Error">
        <Select label="Deck" error="Choose a deck." defaultValue="">
          <option value="">Select a deck</option>
        </Select>
      </State>
      <State label="Disabled">
        <Select label="Deck" defaultValue="kanji" disabled>
          {decks.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </Select>
      </State>
      <State label="Open">
        <Caption>The native popup is drawn by the platform.</Caption>
      </State>
    </StateGrid>
  );
}
