import { Link } from "../../components/Link";
import { Specimen, SpecimenGrid, State, StateGrid } from "../specimen";
import styles from "./demo.module.css";

export function Demo() {
  return (
    <div className={styles.stack}>
      <p className={styles.muted}>
        <Link href="#/components/button">Back to Button</Link> or read the{" "}
        <Link href="#/foundations/colour">colour rules</Link> before you style
        the deck surface.
      </p>
      <Link href="#/components/tabs" variant="standalone">
        Open the Tabs reference
      </Link>
    </div>
  );
}

export function Variants() {
  return (
    <SpecimenGrid columns={2}>
      <Specimen label="Inline">
        <Link href="#/components/link">Review study history</Link>
      </Specimen>
      <Specimen label="Standalone">
        <Link href="#/components/link" variant="standalone">
          Review study history
        </Link>
      </Specimen>
      <Specimen label="Small">
        <Link href="#/components/link" size="sm">
          Kanji N3
        </Link>
      </Specimen>
      <Specimen label="Inherit">
        <Link href="#/components/link">Spanish Verbs</Link>
      </Specimen>
    </SpecimenGrid>
  );
}

export function States() {
  return (
    <StateGrid>
      <State label="Default">
        <Link href="#/components/link">Open deck</Link>
      </State>
      <State label="Hover">
        <Link href="#/components/link" preview="hover">
          Open deck
        </Link>
      </State>
      <State label="Focus">
        <Link href="#/components/link" preview="focus">
          Open deck
        </Link>
      </State>
      <State label="Visited">
        <Link href="#/components/link" preview="visited">
          Open deck
        </Link>
      </State>
      <State label="Disabled">
        <Link href="#/components/link" disabled>
          Open deck
        </Link>
      </State>
    </StateGrid>
  );
}
