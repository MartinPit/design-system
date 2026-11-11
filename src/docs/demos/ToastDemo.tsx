import { useState } from "react";
import { Button } from "../../components/Button";
import { Toast, type ToastVariant } from "../../components/Toast";
import type { SpecimenItem } from "../types";
import styles from "./demo.module.css";

export function ToastDemo() {
  const [visible, setVisible] = useState(true);

  return (
    <div className={styles.toastStack}>
      {visible ? (
        <Toast
          title="Card saved"
          description="to remember · Kanji N3"
          duration={0}
          onDismiss={() => setVisible(false)}
          action={
            <Button variant="ghost" size="sm">
              Undo
            </Button>
          }
        />
      ) : (
        <div className={styles.row}>
          <span className={styles.caption}>Notification dismissed.</span>
          <Button variant="secondary" size="sm" onClick={() => setVisible(true)}>
            Show again
          </Button>
        </div>
      )}
    </div>
  );
}

const variants: ToastVariant[] = ["success", "danger", "info"];

export const toastVariants: SpecimenItem[] = variants.map((variant) => ({
  label: variant,
  content: (
    <Toast
      variant={variant}
      title={
        variant === "success"
          ? "Card saved"
          : variant === "danger"
            ? "Sync failed"
            : "Study session scheduled"
      }
      description={
        variant === "success"
          ? "to remember · Kanji N3"
          : variant === "danger"
            ? "142 cards due could not be synced."
            : "Reminder set for 08:00, local time."
      }
      duration={0}
    />
  ),
}));

export const toastStates: SpecimenItem[] = [
  {
    label: "Visible",
    content: (
      <Toast
        title="Card saved"
        description="to remember · Kanji N3"
        duration={0}
      />
    ),
  },
  {
    label: "Paused",
    content: (
      <Toast
        title="Card saved"
        description="Timer paused while hovered or focused."
        duration={0}
        paused
      />
    ),
  },
  {
    label: "Entering",
    content: (
      <div className={styles.stack}>
        <Toast
          title="Card saved"
          description="to remember · Kanji N3"
          duration={0}
        />
        <p className={styles.caption}>
          Reveal: opacity + translateY(6px), 180ms; replays on mount.
        </p>
      </div>
    ),
  },
  {
    label: "Dismissed",
    content: (
      <p className={styles.caption}>
        Dismissed — removed from the region; no visual residue.
      </p>
    ),
  },
];
