import { useState } from "react";
import { RadioGroup } from "../../components/RadioGroup";
import { Specimen, SpecimenGrid, State, StateGrid } from "../specimen";
import styles from "./demo.module.css";

const modes = [
  { value: "recall", label: "Recall" },
  { value: "typing", label: "Typing" },
  { value: "listening", label: "Listening" },
];

export function Demo() {
  const [mode, setMode] = useState("recall");
  return (
    <div className={styles.stack}>
      <div className={styles.panel}>
        <RadioGroup
          legend="Study mode"
          name="study-mode"
          options={modes}
          value={mode}
          onValueChange={setMode}
          hint="Recall is the default; typing is stricter."
        />
      </div>
      <p className={styles.inlineNote}>
        {mode === "recall"
          ? "You will see the prompt and say the answer."
          : mode === "typing"
            ? "You will type the answer before it is revealed."
            : "The card will be read aloud before you answer."}
      </p>
    </div>
  );
}

export function Variants() {
  return (
    <SpecimenGrid columns={2}>
      <Specimen label="Vertical">
        <RadioGroup
          legend="Study mode"
          name="variant-vertical"
          options={modes}
          defaultValue="recall"
        />
      </Specimen>
      <Specimen label="Horizontal">
        <RadioGroup
          legend="Study mode"
          name="variant-horizontal"
          options={modes}
          orientation="horizontal"
          defaultValue="typing"
        />
      </Specimen>
      <Specimen label="Small">
        <RadioGroup
          legend="Sort order"
          name="variant-small"
          options={[
            { value: "due", label: "Due first" },
            { value: "alpha", label: "A–Z" },
          ]}
          size="sm"
          defaultValue="due"
        />
      </Specimen>
      <Specimen label="With error">
        <RadioGroup
          legend="Study mode"
          name="variant-error"
          options={modes}
          error="Choose a mode to start."
        />
      </Specimen>
    </SpecimenGrid>
  );
}

export function States() {
  return (
    <StateGrid>
      <State label="Unselected">
        <RadioGroup
          legend="Study mode"
          name="state-unselected"
          options={modes}
        />
      </State>
      <State label="Selected">
        <RadioGroup
          legend="Study mode"
          name="state-selected"
          options={modes}
          defaultValue="typing"
        />
      </State>
      <State label="Hover">
        <RadioGroup
          legend="Study mode"
          name="state-hover"
          options={modes}
          defaultValue="typing"
          preview="hover"
        />
      </State>
      <State label="Focus">
        <RadioGroup
          legend="Study mode"
          name="state-focus"
          options={modes}
          defaultValue="typing"
          preview="focus"
        />
      </State>
      <State label="Disabled">
        <RadioGroup
          legend="Study mode"
          name="state-disabled"
          options={modes}
          defaultValue="recall"
          disabled
        />
      </State>
      <State label="Error">
        <RadioGroup
          legend="Study mode"
          name="state-error"
          options={modes}
          error="Choose a mode."
        />
      </State>
    </StateGrid>
  );
}
