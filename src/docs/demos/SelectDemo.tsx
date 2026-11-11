import { Select, type SelectOption } from "../../components/Select";
import type { SpecimenItem } from "../types";
import styles from "./demo.module.css";

const decks: SelectOption[] = [
  { value: "kanji", label: "Kanji N3" },
  { value: "verbs", label: "Spanish Verbs" },
  { value: "biology", label: "Biology 101" },
];

export function SelectDemo() {
  return (
    <div className={styles.stack}>
      <Select
        label="Deck"
        options={decks}
        defaultValue="kanji"
        hint="Sort order and study history follow this deck."
      />
    </div>
  );
}

export const selectVariants: SpecimenItem[] = [
  {
    label: "sm / placeholder",
    content: (
      <Select
        label="Deck"
        size="sm"
        options={decks}
        placeholder="Choose a deck"
      />
    ),
  },
  {
    label: "sm / filled",
    content: (
      <Select
        label="Deck"
        size="sm"
        options={decks}
        defaultValue="verbs"
      />
    ),
  },
  {
    label: "md / placeholder",
    content: (
      <Select label="Deck" options={decks} placeholder="Choose a deck" />
    ),
  },
  {
    label: "md / filled",
    content: (
      <Select label="Deck" options={decks} defaultValue="biology" />
    ),
  },
];

export const selectStates: SpecimenItem[] = [
  {
    label: "Default",
    content: (
      <Select label="Deck" options={decks} placeholder="Choose a deck" />
    ),
  },
  {
    label: "Hover",
    content: (
      <Select
        label="Deck"
        options={decks}
        placeholder="Choose a deck"
        data-state="hover"
      />
    ),
  },
  {
    label: "Focus",
    content: (
      <Select
        label="Deck"
        options={decks}
        placeholder="Choose a deck"
        data-state="focus"
      />
    ),
  },
  {
    label: "Open",
    content: (
      <Select
        label="Deck"
        options={decks}
        defaultValue="kanji"
        data-state="open"
      />
    ),
  },
  {
    label: "Filled",
    content: <Select label="Deck" options={decks} defaultValue="kanji" />,
  },
  {
    label: "Error",
    content: (
      <Select
        label="Deck"
        options={decks}
        error="Choose a deck before saving"
      />
    ),
  },
  {
    label: "Disabled",
    content: (
      <Select label="Deck" options={decks} defaultValue="kanji" disabled />
    ),
  },
];
