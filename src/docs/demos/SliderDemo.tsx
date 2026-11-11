import { useState } from "react";
import { Slider } from "../../components/Slider";
import { Specimen, SpecimenGrid, State, StateGrid } from "../specimen";
import styles from "./demo.module.css";

export function Demo() {
  const [goal, setGoal] = useState(20);
  return (
    <div className={styles.form}>
      <Slider
        label="Daily goal"
        min={5}
        max={60}
        step={5}
        value={goal}
        onChange={(event) => setGoal(Number(event.target.value))}
        formatValue={(value) => `${value} cards / day`}
        hint="A small goal you keep beats a large one you skip."
      />
      <p className={styles.inlineNote}>
        {goal <= 20
          ? "A gentle pace. The streak stays reachable."
          : goal >= 50
            ? "Ambitious. Watch the recall figure, not the count."
            : "A steady pace for a working week."}
      </p>
    </div>
  );
}

export function Variants() {
  return (
    <SpecimenGrid columns={2}>
      <Specimen label="With value" wide>
        <Slider label="Session length" defaultValue={15} min={5} max={45} />
      </Specimen>
      <Specimen label="Without value" wide>
        <Slider
          label="Session length"
          defaultValue={15}
          min={5}
          max={45}
          showValue={false}
        />
      </Specimen>
      <Specimen label="Formatted value" wide>
        <Slider
          label="Daily goal"
          defaultValue={25}
          min={5}
          max={60}
          step={5}
          formatValue={(value) => `${value} cards`}
        />
      </Specimen>
    </SpecimenGrid>
  );
}

export function States() {
  return (
    <StateGrid>
      <State label="Default">
        <Slider label="Daily goal" defaultValue={20} min={0} max={60} />
      </State>
      <State label="Hover">
        <Slider
          label="Daily goal"
          defaultValue={20}
          min={0}
          max={60}
          preview="hover"
        />
      </State>
      <State label="Dragging">
        <Slider
          label="Daily goal"
          defaultValue={35}
          min={0}
          max={60}
          preview="dragging"
        />
      </State>
      <State label="Focus">
        <Slider
          label="Daily goal"
          defaultValue={20}
          min={0}
          max={60}
          preview="focus"
        />
      </State>
      <State label="Disabled">
        <Slider label="Daily goal" defaultValue={20} min={0} max={60} disabled />
      </State>
    </StateGrid>
  );
}
