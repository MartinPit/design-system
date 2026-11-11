import { useState } from "react";
import { SegmentedControl } from "../../components/SegmentedControl";
import { Specimen, SpecimenGrid, State, StateGrid } from "../specimen";
import styles from "./demo.module.css";

export function Demo() {
  const [layout, setLayout] = useState("list");
  return (
    <div className={styles.stack}>
      <div className={styles.segmentedRow}>
        <SegmentedControl
          label="Deck layout"
          value={layout}
          onValueChange={setLayout}
          options={[
            { value: "list", label: "List" },
            { value: "grid", label: "Grid" },
          ]}
        />
        <span className={styles.meta}>
          {layout === "list" ? "14 rows" : "9 tiles"}
        </span>
      </div>
      <p className={styles.inlineNote}>
        The control changes a local view. It does not navigate and does not
        submit.
      </p>
    </div>
  );
}

export function Variants() {
  return (
    <SpecimenGrid columns={2}>
      <Specimen label="Two segments">
        <SegmentedControl
          label="Deck layout"
          options={[
            { value: "list", label: "List" },
            { value: "grid", label: "Grid" },
          ]}
        />
      </Specimen>
      <Specimen label="Three segments">
        <SegmentedControl
          label="Study view"
          options={[
            { value: "due", label: "Due" },
            { value: "new", label: "New" },
            { value: "all", label: "All" },
          ]}
          defaultValue="new"
        />
      </Specimen>
      <Specimen label="Small">
        <SegmentedControl
          label="Deck layout"
          size="sm"
          options={[
            { value: "list", label: "List" },
            { value: "grid", label: "Grid" },
          ]}
        />
      </Specimen>
      <Specimen label="With disabled segment">
        <SegmentedControl
          label="Study view"
          options={[
            { value: "due", label: "Due" },
            { value: "all", label: "All" },
            { value: "archived", label: "Archived", disabled: true },
          ]}
        />
      </Specimen>
    </SpecimenGrid>
  );
}

export function States() {
  return (
    <StateGrid>
      <State label="Selected">
        <SegmentedControl
          label="Deck layout"
          defaultValue="list"
          options={[
            { value: "list", label: "List" },
            { value: "grid", label: "Grid" },
          ]}
        />
      </State>
      <State label="Unselected segment">
        <SegmentedControl
          label="Deck layout"
          defaultValue="grid"
          options={[
            { value: "list", label: "List" },
            { value: "grid", label: "Grid" },
          ]}
        />
      </State>
      <State label="Hover">
        <SegmentedControl
          label="Deck layout"
          defaultValue="grid"
          preview="hover"
          options={[
            { value: "list", label: "List" },
            { value: "grid", label: "Grid" },
          ]}
        />
      </State>
      <State label="Focus">
        <SegmentedControl
          label="Deck layout"
          defaultValue="grid"
          preview="focus"
          options={[
            { value: "list", label: "List" },
            { value: "grid", label: "Grid" },
          ]}
        />
      </State>
      <State label="Disabled">
        <SegmentedControl
          label="Deck layout"
          options={[
            { value: "list", label: "List", disabled: true },
            { value: "grid", label: "Grid", disabled: true },
          ]}
        />
      </State>
    </StateGrid>
  );
}
