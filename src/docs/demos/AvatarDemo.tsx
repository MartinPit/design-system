import { Avatar } from "../../components/Avatar";
import { Specimen, SpecimenGrid, State, StateGrid } from "../specimen";
import styles from "./demo.module.css";

const portrait =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'%3E%3Crect width='80' height='80' fill='%233e2a8f'/%3E%3Ccircle cx='40' cy='30' r='13' fill='%23a9f0d8'/%3E%3Cpath d='M12 80c0-17 13-27 28-27s28 10 28 27' fill='%237a87de'/%3E%3C/svg%3E";

export function Demo() {
  return (
    <div className={styles.stack}>
      <div className={styles.panel}>
        <div className={styles.avatarRow}>
          <Avatar name="Mina Park" src={portrait} size="lg" />
          <div className={styles.avatarIdentity}>
            <p className={styles.avatarName}>Mina Park</p>
            <p className={styles.meta}>Kanji N3 · deck owner</p>
          </div>
          <Avatar name="Sam Okafor" size="md" />
          <Avatar name="Yuki Tanaka" size="sm" />
          <Avatar name="Biology 101" size="xs" />
        </div>
      </div>
      <p className={styles.inlineNote}>
        The image has a name; the initials fallback carries the same name.
      </p>
    </div>
  );
}

export function Variants() {
  return (
    <SpecimenGrid columns={2}>
      <Specimen label="Image">
        <Avatar name="Mina Park" src={portrait} size="lg" />
      </Specimen>
      <Specimen label="Initials">
        <Avatar name="Sam Okafor" size="lg" />
      </Specimen>
      <Specimen label="Extra small">
        <Avatar name="Yuki Tanaka" size="xs" />
      </Specimen>
      <Specimen label="Small">
        <Avatar name="Yuki Tanaka" size="sm" />
      </Specimen>
      <Specimen label="Medium">
        <Avatar name="Yuki Tanaka" size="md" />
      </Specimen>
      <Specimen label="Interactive">
        <Avatar name="Mina Park" size="md" interactive />
      </Specimen>
    </SpecimenGrid>
  );
}

export function States() {
  return (
    <StateGrid>
      <State label="Image">
        <Avatar name="Mina Park" src={portrait} size="md" />
      </State>
      <State label="Fallback">
        <Avatar name="Sam Okafor" size="md" />
      </State>
      <State label="Hover">
        <Avatar name="Mina Park" size="md" interactive preview="hover" />
      </State>
      <State label="Focus">
        <Avatar name="Mina Park" size="md" interactive preview="focus" />
      </State>
    </StateGrid>
  );
}
