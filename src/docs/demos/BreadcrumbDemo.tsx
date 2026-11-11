import { Breadcrumb } from "../../components/Breadcrumb";
import { Specimen, SpecimenGrid, State, StateGrid } from "../specimen";
import styles from "./demo.module.css";

const trail = [
  { label: "Decks", href: "#/components/breadcrumb" },
  { label: "Kanji N3", href: "#/components/breadcrumb" },
  { label: "Card 142" },
];

const longTrail = [
  { label: "Decks", href: "#/components/breadcrumb" },
  { label: "Kanji N3", href: "#/components/breadcrumb" },
  { label: "Cards", href: "#/components/breadcrumb" },
  { label: "Grammar", href: "#/components/breadcrumb" },
  { label: "Card 142" },
];

export function Demo() {
  return (
    <div className={styles.stack}>
      <div className={styles.panel}>
        <Breadcrumb items={trail} label="Deck breadcrumb" />
        <div className={styles.deckBody}>
          <p className={styles.cardMeta}>Card 142 · Kanji N3</p>
          <p className={styles.cardAnswer}>to remember</p>
          <p className={styles.muted}>Answer hidden until you turn the card.</p>
        </div>
      </div>
      <p className={styles.inlineNote}>
        The last item is the current page and is never a link.
      </p>
    </div>
  );
}

export function Variants() {
  return (
    <SpecimenGrid columns={2}>
      <Specimen label="Default" wide>
        <Breadcrumb items={trail} label="Default breadcrumb" />
      </Specimen>
      <Specimen label="Collapsed" wide>
        <Breadcrumb
          items={longTrail}
          collapsed
          label="Collapsed breadcrumb"
        />
      </Specimen>
    </SpecimenGrid>
  );
}

export function States() {
  return (
    <StateGrid>
      <State label="Default">
        <Breadcrumb items={trail.slice(0, 2)} label="Default trail" />
      </State>
      <State label="Hover">
        <Breadcrumb items={trail} preview="hover" label="Hover trail" />
      </State>
      <State label="Focus">
        <Breadcrumb items={trail} preview="focus" label="Focus trail" />
      </State>
      <State label="Current">
        <Breadcrumb items={trail} label="Current trail" />
      </State>
    </StateGrid>
  );
}
