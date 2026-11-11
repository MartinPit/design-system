import { Button } from "../../components/Button";
import { EmptyState } from "../../components/EmptyState";
import type { SpecimenItem } from "../types";
import styles from "./demo.module.css";

export function EmptyStateDemo() {
  return (
    <div className={styles.emptyWrap}>
      <EmptyState
        title="No cards in this deck"
        body="Add the first card to start the collection. Cards can be reviewed as soon as they are saved."
        mark
        action={<Button size="sm">Add a card</Button>}
      />
    </div>
  );
}

export const emptyStateVariants: SpecimenItem[] = [
  {
    label: "With action",
    content: (
      <EmptyState
        title="No cards in this deck"
        body="Add the first card to start the collection."
        action={<Button size="sm">Add a card</Button>}
      />
    ),
  },
  {
    label: "Without action",
    content: (
      <EmptyState
        title="No search results"
        body="No card matches “la llave”. Clear the query and try another spelling."
      />
    ),
  },
];

export const emptyStateStates: SpecimenItem[] = [
  {
    label: "Empty deck",
    content: (
      <EmptyState
        title="No cards in this deck"
        body="Add the first card to start the collection."
      />
    ),
  },
  {
    label: "No results",
    content: (
      <EmptyState
        title="No search results"
        body="No card matches “la llave”. Clear the query and try again."
      />
    ),
  },
];
