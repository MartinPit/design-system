import { IconButton } from "../../components/IconButton";
import { Close, Plus, Search, Shuffle } from "../../icons";
import type { SpecimenItem } from "../types";
import styles from "./demo.module.css";

export function IconButtonDemo() {
  return (
    <div className={styles.row}>
      <IconButton aria-label="Shuffle deck">
        <Shuffle />
      </IconButton>
      <IconButton aria-label="Add a card" variant="ghost">
        <Plus />
      </IconButton>
      <IconButton aria-label="Search cards" variant="ghost">
        <Search />
      </IconButton>
      <IconButton aria-label="Close session" variant="ghost">
        <Close />
      </IconButton>
    </div>
  );
}

export const iconButtonVariants: SpecimenItem[] = [
  {
    label: "Solid / sm",
    content: (
      <IconButton aria-label="Shuffle deck" size="sm">
        <Shuffle />
      </IconButton>
    ),
  },
  {
    label: "Solid / md",
    content: (
      <IconButton aria-label="Shuffle deck">
        <Shuffle />
      </IconButton>
    ),
  },
  {
    label: "Ghost / sm",
    content: (
      <IconButton aria-label="Add a card" variant="ghost" size="sm">
        <Plus />
      </IconButton>
    ),
  },
  {
    label: "Ghost / md",
    content: (
      <IconButton aria-label="Add a card" variant="ghost">
        <Plus />
      </IconButton>
    ),
  },
];

export const iconButtonStates: SpecimenItem[] = [
  {
    label: "Default",
    content: (
      <IconButton aria-label="Shuffle deck">
        <Shuffle />
      </IconButton>
    ),
  },
  {
    label: "Hover",
    content: (
      <IconButton aria-label="Shuffle deck" data-state="hover">
        <Shuffle />
      </IconButton>
    ),
  },
  {
    label: "Active",
    content: (
      <IconButton aria-label="Shuffle deck" data-state="active">
        <Shuffle />
      </IconButton>
    ),
  },
  {
    label: "Focus visible",
    content: (
      <IconButton aria-label="Shuffle deck" data-state="focus">
        <Shuffle />
      </IconButton>
    ),
  },
  {
    label: "Disabled",
    content: (
      <IconButton aria-label="Shuffle deck" disabled>
        <Shuffle />
      </IconButton>
    ),
  },
];
