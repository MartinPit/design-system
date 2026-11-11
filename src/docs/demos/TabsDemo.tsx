import { useState } from "react";
import { Tabs } from "../../components/Tabs";
import { Specimen, SpecimenGrid, State, StateGrid } from "../specimen";
import styles from "./demo.module.css";

const deckTabs = [
  {
    id: "due",
    label: "Due",
    content: (
      <p className={styles.muted}>
        142 cards due. First card: <em>to remember</em>.
      </p>
    ),
  },
  {
    id: "all",
    label: "All cards",
    content: <p className={styles.muted}>1,204 cards across Kanji N3.</p>,
  },
  {
    id: "archived",
    label: "Archived",
    content: <p className={styles.muted}>38 cards you have retired.</p>,
  },
];

export function Demo() {
  const [tab, setTab] = useState("due");
  return (
    <div className={styles.stack}>
      <Tabs
        tabs={deckTabs}
        value={tab}
        onValueChange={setTab}
        label="Deck sections"
      />
      <p className={styles.inlineNote}>
        Arrow keys move selection; a disabled tab is skipped and the loop wraps.
      </p>
    </div>
  );
}

export function Variants() {
  return (
    <SpecimenGrid columns={2}>
      <Specimen label="Underline">
        <Tabs tabs={deckTabs.slice(0, 2)} defaultValue="due" />
      </Specimen>
      <Specimen label="Pill">
        <Tabs tabs={deckTabs.slice(0, 2)} defaultValue="all" variant="pill" />
      </Specimen>
      <Specimen label="With disabled tab">
        <Tabs tabs={deckTabs} defaultValue="due" />
      </Specimen>
      <Specimen label="Pill, with disabled tab">
        <Tabs tabs={deckTabs} defaultValue="all" variant="pill" />
      </Specimen>
    </SpecimenGrid>
  );
}

export function States() {
  return (
    <StateGrid>
      <State label="Selected">
        <Tabs tabs={deckTabs.slice(0, 2)} defaultValue="due" />
      </State>
      <State label="Unselected">
        <Tabs tabs={deckTabs.slice(0, 2)} defaultValue="all" />
      </State>
      <State label="Hover">
        <Tabs tabs={deckTabs.slice(0, 2)} defaultValue="all" preview="hover" />
      </State>
      <State label="Focus">
        <Tabs tabs={deckTabs.slice(0, 2)} defaultValue="all" preview="focus" />
      </State>
      <State label="With disabled tab">
        <Tabs
          tabs={[
            deckTabs[0]!,
            { ...deckTabs[2]!, disabled: true, label: "Archived" },
          ]}
          defaultValue="due"
        />
      </State>
    </StateGrid>
  );
}
