import { SearchField } from "../../components/SearchField";
import type { SpecimenItem } from "../types";
import styles from "./demo.module.css";

export function SearchFieldDemo() {
  return (
    <div className={styles.stack}>
      <SearchField
        label="Find a deck"
        placeholder="Search decks and cards"
        shortcut="/"
      />
    </div>
  );
}

export const searchFieldVariants: SpecimenItem[] = [
  {
    label: "With shortcut",
    content: (
      <SearchField
        label="Find a deck"
        placeholder="Search decks and cards"
        shortcut="/"
      />
    ),
  },
  {
    label: "With clear",
    content: (
      <SearchField
        label="Find a deck"
        defaultValue="la llave"
        placeholder="Search decks and cards"
      />
    ),
  },
];

export const searchFieldStates: SpecimenItem[] = [
  {
    label: "Empty",
    content: <SearchField label="Find a deck" shortcut="/" />,
  },
  {
    label: "Typing",
    content: (
      <SearchField label="Find a deck" defaultValue="kan" shortcut="/" />
    ),
  },
  {
    label: "Filled",
    content: <SearchField label="Find a deck" defaultValue="Kanji N3" />,
  },
  {
    label: "Focus",
    content: (
      <SearchField label="Find a deck" shortcut="/" data-state="focus" />
    ),
  },
  {
    label: "Disabled",
    content: <SearchField label="Find a deck" disabled />,
  },
];
