import { useState } from "react";
import { Tag } from "../../components/Tag";
import type { SpecimenItem } from "../types";
import styles from "./demo.module.css";

const initial = ["Kanji N3", "Spanish Verbs", "Biology 101"];

export function TagDemo() {
  const [tags, setTags] = useState(initial);

  return (
    <div className={styles.stack}>
      <div className={styles.row}>
        {tags.map((tag) => (
          <Tag
            key={tag}
            variant="removable"
            removeLabel={`Remove ${tag}`}
            onRemove={() => setTags((current) => current.filter((item) => item !== tag))}
          >
            {tag}
          </Tag>
        ))}
      </div>
      <p className={styles.caption}>
        {tags.length > 0
          ? `${tags.length} deck filters active`
          : "No deck filters active."}
      </p>
    </div>
  );
}

export const tagVariants: SpecimenItem[] = [
  {
    label: "Static / sm",
    content: <Tag size="sm">Kanji N3</Tag>,
  },
  {
    label: "Static / md",
    content: <Tag>Kanji N3</Tag>,
  },
  {
    label: "Removable / sm",
    content: (
      <Tag variant="removable" size="sm" removeLabel="Remove Kanji N3">
        Kanji N3
      </Tag>
    ),
  },
  {
    label: "Removable / md",
    content: (
      <Tag variant="removable" removeLabel="Remove Kanji N3">
        Kanji N3
      </Tag>
    ),
  },
];

export const tagStates: SpecimenItem[] = [
  {
    label: "Default",
    content: <Tag>Kanji N3</Tag>,
  },
  {
    label: "Hover",
    content: (
      <Tag variant="removable" removeLabel="Remove Kanji N3" data-state="hover">
        Kanji N3
      </Tag>
    ),
  },
  {
    label: "Focus visible",
    content: (
      <Tag variant="removable" removeLabel="Remove Kanji N3" data-state="focus">
        Kanji N3
      </Tag>
    ),
  },
  {
    label: "Disabled",
    content: (
      <Tag
        variant="removable"
        removeLabel="Remove Kanji N3"
        disabled
      >
        Kanji N3
      </Tag>
    ),
  },
];
