import { useState } from "react";
import { Badge } from "../../components/Badge";
import { Card } from "../../components/Card";
import { DropdownMenu } from "../../components/DropdownMenu";
import type { DropdownMenuItem } from "../../components/DropdownMenu";
import { Specimen, State } from "../specimen";
import styles from "./demo.module.css";

const items: DropdownMenuItem[] = [
  { id: "edit", label: "Edit deck" },
  { id: "duplicate", label: "Duplicate deck" },
  { id: "share", label: "Share deck" },
  { id: "delete", label: "Delete deck", danger: true, separatorBefore: true },
];

export function Demo() {
  const [lastAction, setLastAction] = useState("No action yet");
  return (
    <div className={styles.stack}>
      <Card variant="raised" className={styles.emptyFrame}>
        <div className={styles.deckHead}>
          <div>
            <h3 className={styles.deckName}>Spanish Verbs</h3>
            <p className={styles.meta}>84 cards due · la llave</p>
          </div>
          <DropdownMenu
            label="Deck actions"
            items={items.map((item) => ({
              ...item,
              onSelect: () => setLastAction(item.label),
            }))}
          />
        </div>
        <div className={styles.cardFoot}>
          <Badge variant="accent">Row actions</Badge>
          <span className={styles.inlineNote}>{lastAction}</span>
        </div>
      </Card>
      <p className={styles.inlineNote}>
        Arrow keys move, Home and End jump, Escape closes and returns focus to
        the trigger.
      </p>
    </div>
  );
}

const stageEnd = {
  minHeight: "17rem",
  width: "100%",
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "flex-end",
} as const;

const stageStart = {
  minHeight: "17rem",
  width: "100%",
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "flex-start",
} as const;

export function Variants() {
  return (
    <div className={styles.stateStack}>
      <Specimen label="Default, open" wide>
        <div style={stageEnd}>
          <DropdownMenu label="Deck actions" items={items} defaultOpen />
        </div>
      </Specimen>
      <Specimen label="With separators, aligned start" wide>
        <div style={stageStart}>
          <DropdownMenu
            label="Deck actions"
            items={items}
            defaultOpen
            align="start"
          />
        </div>
      </Specimen>
    </div>
  );
}

export function States() {
  const menuState = (preview?: "hover" | "focus") => (
    <div style={stageEnd}>
      <DropdownMenu
        label="Deck actions"
        items={items}
        defaultOpen
        preview={preview}
      />
    </div>
  );

  return (
    <div className={styles.stateStack}>
      <State label="Closed">
        <DropdownMenu label="Deck actions" items={items} />
      </State>
      <State label="Open">{menuState()}</State>
      <State label="Hover item">{menuState("hover")}</State>
      <State label="Focus item">{menuState("focus")}</State>
      <State label="Disabled and danger items">
        <div style={stageEnd}>
          <DropdownMenu
            label="Deck actions"
            items={[
              { id: "edit", label: "Edit deck" },
              { id: "archive", label: "Archive deck", disabled: true },
              {
                id: "delete",
                label: "Delete deck",
                danger: true,
                separatorBefore: true,
              },
            ]}
            defaultOpen
          />
        </div>
      </State>
    </div>
  );
}
