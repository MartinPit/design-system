import { useState } from "react";
import { DropdownMenu } from "../../components/DropdownMenu";
import type { SpecimenItem } from "../types";
import styles from "./demo.module.css";

const items = [
  { id: "rename", label: "Rename deck" },
  { id: "duplicate", label: "Duplicate deck" },
  { id: "archive", label: "Archive deck", separatorBefore: true },
  { id: "delete", label: "Delete deck", danger: true },
];

const withSeparators = [
  ...items.slice(0, 2),
  { id: "export", label: "Export as CSV", separatorBefore: true },
  { id: "delete", label: "Delete deck", danger: true, separatorBefore: true },
];

export function DropdownMenuDemo() {
  const [action, setAction] = useState<string | null>(null);

  return (
    <div className={styles.stack}>
      <DropdownMenu
        triggerLabel="Deck actions"
        items={items}
        onSelect={setAction}
      />
      <p className={styles.caption}>
        {action ? `Selected: ${action}` : "No action selected."}
      </p>
    </div>
  );
}

export const dropdownVariants: SpecimenItem[] = [
  {
    label: "Default",
    content: <DropdownMenu triggerLabel="Deck actions" items={items} />,
  },
  {
    label: "Small trigger",
    content: (
      <DropdownMenu triggerLabel="Deck actions" items={items} size="sm" />
    ),
  },
  {
    label: "With separators",
    content: (
      <div className={styles.menuCell}>
        <DropdownMenu
          triggerLabel="Deck actions"
          items={withSeparators}
          inline
          defaultOpen
        />
      </div>
    ),
  },
];

export const dropdownStates: SpecimenItem[] = [
  {
    label: "Closed",
    content: <DropdownMenu triggerLabel="Deck actions" items={items} />,
  },
  {
    label: "Open",
    content: (
      <div className={styles.menuCell}>
        <DropdownMenu
          triggerLabel="Deck actions"
          items={items}
          inline
          defaultOpen
        />
      </div>
    ),
  },
  {
    label: "Hover",
    content: (
      <DropdownMenu
        triggerLabel="Deck actions"
        items={items}
        data-state="hover"
      />
    ),
  },
  {
    label: "Focus visible",
    content: (
      <DropdownMenu
        triggerLabel="Deck actions"
        items={items}
        data-state="focus"
      />
    ),
  },
  {
    label: "Disabled item",
    content: (
      <div className={styles.menuCell}>
        <DropdownMenu
          triggerLabel="Deck actions"
          items={[
            { id: "rename", label: "Rename deck" },
            { id: "duplicate", label: "Duplicate deck", disabled: true },
            { id: "delete", label: "Delete deck", danger: true },
          ]}
          inline
          defaultOpen
        />
      </div>
    ),
  },
  {
    label: "Danger item",
    content: (
      <div className={styles.menuCell}>
        <DropdownMenu
          triggerLabel="Deck actions"
          items={[
            { id: "rename", label: "Rename deck" },
            { id: "delete", label: "Delete deck", danger: true, separatorBefore: true },
          ]}
          inline
          defaultOpen
        />
      </div>
    ),
  },
];
