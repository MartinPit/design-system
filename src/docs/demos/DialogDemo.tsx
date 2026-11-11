import { useState } from "react";
import { Badge } from "../../components/Badge";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { Dialog } from "../../components/Dialog";
import { Specimen, State } from "../specimen";
import styles from "./demo.module.css";

function DialogFooter({ onClose }: { onClose: () => void }) {
  return (
    <div className={styles.dialogFooter}>
      <Button variant="secondary" onClick={onClose}>
        Cancel
      </Button>
      <Button variant="danger" onClick={onClose}>
        Delete 1,204 cards
      </Button>
    </div>
  );
}

export function Demo() {
  const [open, setOpen] = useState(false);
  const [deleted, setDeleted] = useState(false);
  return (
    <div className={styles.stack}>
      <Card variant="raised" className={styles.emptyFrame}>
        <div className={styles.deckHead}>
          <h3 className={styles.deckName}>Kanji N3</h3>
          <Badge variant="warning">142 due</Badge>
        </div>
        <p className={styles.muted}>
          {deleted
            ? "Deck deleted in the specimen. Reload to restore it."
            : "A destructive action asks once, in a dialog, with the count."}
        </p>
        <div className={styles.cardFoot}>
          <span className={styles.meta}>1,204 cards</span>
          <Button
            variant="danger"
            size="sm"
            onClick={() => {
              setDeleted(false);
              setOpen(true);
            }}
          >
            Delete deck
          </Button>
        </div>
      </Card>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="Delete Kanji N3?"
        description="This removes 1,204 cards, the 12-day streak and the study history. It cannot be undone."
        footer={
          <div className={styles.dialogFooter}>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                setDeleted(true);
                setOpen(false);
              }}
            >
              Delete 1,204 cards
            </Button>
            <Button variant="ghost" disabled>
              Archive instead
            </Button>
          </div>
        }
      >
        <p>Type is irrelevant here; the count and the consequence are not.</p>
      </Dialog>
    </div>
  );
}

export function Variants() {
  return (
    <div className={styles.stack}>
      <Specimen label="Small · 24rem" wide>
        <Dialog
          inline
          open
          size="sm"
          onClose={() => undefined}
          title="Rename deck"
          description="Small dialogs hold one field or one confirmation."
          footer={
            <div className={styles.dialogFooter}>
              <Button size="sm" variant="secondary">
                Cancel
              </Button>
              <Button size="sm">Save name</Button>
            </div>
          }
        >
          <p className={styles.muted}>Kanji N3</p>
        </Dialog>
      </Specimen>
      <Specimen label="Medium · 34rem" wide>
        <Dialog
          inline
          open
          size="md"
          onClose={() => undefined}
          title="Delete Kanji N3?"
          description="Medium dialogs hold the consequence and the actions."
          footer={<DialogFooter onClose={() => undefined} />}
        >
          <p className={styles.muted}>
            1,204 cards, 12-day streak and study history.
          </p>
        </Dialog>
      </Specimen>
    </div>
  );
}

export function States() {
  return (
    <div className={styles.stateStack}>
      <State label="Closed">
        <Button variant="danger" size="sm">
          Delete deck
        </Button>
      </State>
      <State label="Open">
        <Dialog
          inline
          open
          onClose={() => undefined}
          title="Delete Kanji N3?"
          description="This removes 1,204 cards and cannot be undone."
          footer={<DialogFooter onClose={() => undefined} />}
        >
          <p className={styles.muted}>The trigger sits behind the scrim.</p>
        </Dialog>
      </State>
      <State label="Focus-trapped">
        <Dialog
          inline
          open
          size="sm"
          onClose={() => undefined}
          title="Focus stays here"
          description="Tab cycles through these two actions; Escape returns to the trigger."
          footer={
            <div className={styles.dialogFooter}>
              <Button size="sm" variant="secondary">
                Cancel
              </Button>
              <Button size="sm">Continue</Button>
            </div>
          }
        />
      </State>
      <State label="Disabled action">
        <Dialog
          inline
          open
          size="sm"
          onClose={() => undefined}
          title="Archive Kanji N3?"
          description="The archive action is unavailable until the deck syncs."
          footer={
            <div className={styles.dialogFooter}>
              <Button size="sm" variant="secondary">
                Cancel
              </Button>
              <Button size="sm" disabled>
                Archive
              </Button>
            </div>
          }
        />
      </State>
    </div>
  );
}
