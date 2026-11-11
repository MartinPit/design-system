import { useState } from "react";
import { Button } from "../../components/Button";
import { Tag } from "../../components/Tag";
import { Specimen, SpecimenGrid, State, StateGrid } from "../specimen";
import styles from "./demo.module.css";

const initialTags = ["Kanji N3", "Due today", "N3 grammar"];

export function Demo() {
  const [tags, setTags] = useState(initialTags);
  return (
    <div className={styles.stack}>
      <div className={styles.panel}>
        <p className={styles.cardMeta}>Filters</p>
        <div className={styles.tagRow} style={{ marginBlockStart: "var(--space-3)" }}>
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
          {tags.length === 0 ? (
            <span className={styles.meta}>No filters</span>
          ) : null}
        </div>
      </div>
      <div className={styles.row}>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => setTags(initialTags)}
          disabled={tags.length === initialTags.length}
        >
          Restore filters
        </Button>
        <span className={styles.inlineNote}>
          {tags.length} of {initialTags.length} filters active
        </span>
      </div>
    </div>
  );
}

export function Variants() {
  return (
    <SpecimenGrid columns={2}>
      <Specimen label="Static">
        <Tag>Kanji N3</Tag>
      </Specimen>
      <Specimen label="Removable">
        <Tag variant="removable" onRemove={() => undefined} removeLabel="Remove Spanish Verbs">
          Spanish Verbs
        </Tag>
      </Specimen>
      <Specimen label="Small">
        <Tag size="sm">Biology 101</Tag>
      </Specimen>
      <Specimen label="Small, removable">
        <Tag
          size="sm"
          variant="removable"
          onRemove={() => undefined}
          removeLabel="Remove due today"
        >
          Due today
        </Tag>
      </Specimen>
    </SpecimenGrid>
  );
}

export function States() {
  return (
    <StateGrid>
      <State label="Default">
        <Tag variant="removable" onRemove={() => undefined} removeLabel="Remove Kanji N3">
          Kanji N3
        </Tag>
      </State>
      <State label="Hover">
        <Tag
          variant="removable"
          onRemove={() => undefined}
          removeLabel="Remove Kanji N3"
          preview="hover"
        >
          Kanji N3
        </Tag>
      </State>
      <State label="Focus">
        <Tag
          variant="removable"
          onRemove={() => undefined}
          removeLabel="Remove Kanji N3"
          preview="focus"
        >
          Kanji N3
        </Tag>
      </State>
      <State label="Disabled">
        <Tag
          variant="removable"
          onRemove={() => undefined}
          removeLabel="Remove Kanji N3"
          disabled
        >
          Kanji N3
        </Tag>
      </State>
    </StateGrid>
  );
}
