import { TextField } from "../../components/TextField";
import type { SpecimenItem } from "../types";
import styles from "./demo.module.css";

export function TextFieldDemo() {
  return (
    <div className={styles.stack}>
      <TextField
        label="Deck name"
        defaultValue="Kanji N3"
        hint="Use the language and level, for example Kanji N3."
      />
    </div>
  );
}

const sizes = ["sm", "md"] as const;

export const textFieldVariants: SpecimenItem[] = sizes.flatMap((size) => [
  {
    label: `${size} / label`,
    content: <TextField label="Deck name" size={size} defaultValue="Kanji N3" />,
  },
  {
    label: `${size} / hint`,
    content: (
      <TextField
        label="Deck name"
        size={size}
        defaultValue="Spanish Verbs"
        hint="Shown on the deck shelf."
      />
    ),
  },
  {
    label: `${size} / error`,
    content: (
      <TextField
        label="Deck name"
        size={size}
        defaultValue=""
        error="A deck needs a name"
      />
    ),
  },
]);

export const textFieldStates: SpecimenItem[] = [
  {
    label: "Default",
    content: <TextField label="Deck name" placeholder="Name this deck" />,
  },
  {
    label: "Hover",
    content: (
      <TextField
        label="Deck name"
        data-state="hover"
        placeholder="Name this deck"
      />
    ),
  },
  {
    label: "Focus",
    content: (
      <TextField
        label="Deck name"
        data-state="focus"
        placeholder="Name this deck"
      />
    ),
  },
  {
    label: "Filled",
    content: <TextField label="Deck name" defaultValue="Kanji N3" />,
  },
  {
    label: "Error",
    content: (
      <TextField
        label="Deck name"
        defaultValue=""
        error="A deck needs a name"
      />
    ),
  },
  {
    label: "Disabled",
    content: <TextField label="Deck name" defaultValue="Kanji N3" disabled />,
  },
  {
    label: "Read only",
    content: (
      <TextField label="Deck name" defaultValue="Kanji N3" readOnly />
    ),
  },
];
