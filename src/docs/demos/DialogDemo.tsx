import { useState } from "react";
import { Button } from "../../components/Button";
import { Dialog } from "../../components/Dialog";
import type { SpecimenItem } from "../types";
import styles from "./demo.module.css";

function DialogFooter({ disabled = false }: { disabled?: boolean }) {
  return (
    <>
      <Button variant="secondary" size="sm">
        Cancel
      </Button>
      <Button variant="danger" size="sm" disabled={disabled}>
        Delete deck
      </Button>
    </>
  );
}

export function DialogDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.row}>
      <Button variant="danger" onClick={() => setOpen(true)}>
        Delete deck
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="Delete Kanji N3?"
        description="142 cards due will be removed from the schedule."
        footer={<DialogFooter />}
      >
        <p>
          The deck and its study history are removed. This cannot be undone.
        </p>
      </Dialog>
    </div>
  );
}

export const dialogVariants: SpecimenItem[] = [
  {
    label: "sm",
    content: (
      <Dialog
        open
        inline
        size="sm"
        onClose={() => undefined}
        title="Delete Kanji N3?"
        description="142 cards due will be removed."
        footer={<DialogFooter />}
      >
        <p>This cannot be undone.</p>
      </Dialog>
    ),
  },
  {
    label: "md",
    content: (
      <Dialog
        open
        inline
        size="md"
        onClose={() => undefined}
        title="Rename deck"
        description="Change the name shown on the deck shelf."
        footer={
          <>
            <Button variant="secondary" size="sm">
              Cancel
            </Button>
            <Button size="sm">Save name</Button>
          </>
        }
      >
        <p>Kanji N3 · 160 cards · last studied 11 Nov 2026.</p>
      </Dialog>
    ),
  },
];

export const dialogStates: SpecimenItem[] = [
  {
    label: "Closed",
    content: (
      <>
        <div className={styles.row}>
          <Button variant="danger" size="sm">
            Delete deck
          </Button>
        </div>
        <p className={styles.caption}>
          The trigger stays in place; no layer is mounted.
        </p>
      </>
    ),
  },
  {
    label: "Open",
    content: (
      <Dialog
        open
        inline
        onClose={() => undefined}
        title="Delete Kanji N3?"
        description="142 cards due will be removed."
        footer={<DialogFooter />}
      >
        <p>This cannot be undone.</p>
      </Dialog>
    ),
  },
  {
    label: "Focus trapped",
    content: (
      <Dialog
        open
        inline
        onClose={() => undefined}
        title="Delete Kanji N3?"
        description="Tab cycles through Close, Cancel and Delete; Escape returns to the trigger."
        footer={<DialogFooter />}
      >
        <p>The modal layer keeps focus inside the panel.</p>
      </Dialog>
    ),
  },
  {
    label: "Disabled action",
    content: (
      <Dialog
        open
        inline
        onClose={() => undefined}
        title="Delete Kanji N3?"
        description="A pending sync holds the destructive action."
        footer={<DialogFooter disabled />}
      >
        <p>The deck cannot be deleted while a session is syncing.</p>
      </Dialog>
    ),
  },
];
