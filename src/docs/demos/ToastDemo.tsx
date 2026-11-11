import { useState } from "react";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { Toast } from "../../components/Toast";
import type { ToastVariant } from "../../components/Toast";
import { Specimen, SpecimenGrid, State } from "../specimen";
import styles from "./demo.module.css";

interface ToastState {
  open: boolean;
  variant: ToastVariant;
  message: string;
}

const messages: Array<{ variant: ToastVariant; label: string; message: string }> = [
  { variant: "success", label: "Save card", message: "Card saved to Kanji N3." },
  {
    variant: "danger",
    label: "Fail sync",
    message: "Could not sync 12 cards. They are safe on this device.",
  },
  {
    variant: "info",
    label: "Pause session",
    message: "Session paused. The timer resumes when you return.",
  },
];

export function Demo() {
  const [toast, setToast] = useState<ToastState>({
    open: false,
    variant: "success",
    message: "",
  });
  return (
    <div className={styles.stack}>
      <Card variant="raised" className={styles.emptyFrame}>
        <div className={styles.deckHead}>
          <h3 className={styles.deckName}>Kanji N3</h3>
          <span className={styles.count}>142 cards due</span>
        </div>
        <p className={styles.muted}>
          Toasts confirm what the interface already did. They never ask a
          question.
        </p>
        <div className={styles.toastRow} style={{ marginBlockStart: "var(--space-4)" }}>
          {messages.map((item) => (
            <Button
              key={item.variant}
              size="sm"
              variant={item.variant === "danger" ? "danger" : "secondary"}
              onClick={() =>
                setToast({ open: true, variant: item.variant, message: item.message })
              }
            >
              {item.label}
            </Button>
          ))}
        </div>
      </Card>

      <Toast
        open={toast.open}
        variant={toast.variant}
        title={toast.variant === "danger" ? "Sync failed" : "Saved"}
        message={toast.message}
        onDismiss={() => setToast((current) => ({ ...current, open: false }))}
        duration={6000}
      />
    </div>
  );
}

export function Variants() {
  return (
    <SpecimenGrid columns={2}>
      <Specimen label="Success" wide>
        <Toast
          inline
          open
          duration={0}
          variant="success"
          title="Saved"
          message="Card saved to Kanji N3."
          onDismiss={() => undefined}
        />
      </Specimen>
      <Specimen label="Danger" wide>
        <Toast
          inline
          open
          duration={0}
          variant="danger"
          title="Sync failed"
          message="Could not sync 12 cards. They are safe on this device."
          onDismiss={() => undefined}
        />
      </Specimen>
      <Specimen label="Info" wide>
        <Toast
          inline
          open
          duration={0}
          variant="info"
          title="Paused"
          message="Session paused. The timer resumes when you return."
          onDismiss={() => undefined}
        />
      </Specimen>
      <Specimen label="With action" wide>
        <Toast
          inline
          open
          duration={0}
          variant="success"
          title="Saved"
          message="Card saved to Kanji N3."
          onDismiss={() => undefined}
          action={
            <Button size="sm" variant="secondary">
              Undo
            </Button>
          }
        />
      </Specimen>
    </SpecimenGrid>
  );
}

export function States() {
  return (
    <div className={styles.stateStack}>
      <State label="Entering">
        <div style={{ width: "100%", display: "grid", gap: "var(--space-2)" }}>
          <Toast
            inline
            open
            duration={0}
            title="Saved"
            message="Card saved to Kanji N3."
            onDismiss={() => undefined}
          />
          <p className={styles.inlineNote}>
            Rises 8px and fades in over 240ms. Reduced motion removes the
            entrance.
          </p>
        </div>
      </State>
      <State label="Visible">
        <Toast
          inline
          open
          duration={0}
          title="Saved"
          message="Card saved to Kanji N3."
          onDismiss={() => undefined}
        />
      </State>
      <State label="Paused on hover or focus">
        <Toast
          inline
          open
          duration={0}
          paused
          title="Saved"
          message="The timer is frozen while the pointer or focus is here."
          onDismiss={() => undefined}
        />
      </State>
      <State label="Dismissed">
        <p className={styles.inlineNote}>
          Removed from the live region after the dismiss control or the timer.
        </p>
      </State>
    </div>
  );
}
