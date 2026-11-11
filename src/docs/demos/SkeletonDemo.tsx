import { useState } from "react";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { Skeleton } from "../../components/Skeleton";
import { Specimen, SpecimenGrid, State, StateGrid } from "../specimen";
import styles from "./demo.module.css";

export function Demo() {
  const [loading, setLoading] = useState(true);
  return (
    <div className={styles.stack}>
      <Card variant="raised" className={styles.emptyFrame}>
        {loading ? (
          <div className={styles.stack}>
            <div className={styles.row}>
              <Skeleton variant="circle" />
              <div style={{ flex: 1 }}>
                <Skeleton variant="text" lines={2} />
              </div>
            </div>
            <Skeleton variant="block" />
            <Skeleton variant="text" lines={2} size="sm" />
          </div>
        ) : (
          <div className={styles.deckBody}>
            <div className={styles.deckHead}>
              <h3 className={styles.deckName}>Kanji N3</h3>
              <span className={styles.count}>142 cards due</span>
            </div>
            <p className={styles.muted}>12-day streak · 98% recall this week</p>
            <Skeleton variant="text" animated={false} width="70%" />
          </div>
        )}
        <div style={{ marginBlockStart: "var(--space-4)" }}>
          <Button size="sm" variant="secondary" onClick={() => setLoading((value) => !value)}>
            {loading ? "Finish loading" : "Show skeleton"}
          </Button>
        </div>
      </Card>
      <p className={styles.inlineNote}>
        Skeletons hold the shape of the content that is coming. They are always
        hidden from assistive technology.
      </p>
    </div>
  );
}

export function Variants() {
  return (
    <SpecimenGrid columns={2}>
      <Specimen label="Text" wide>
        <Skeleton variant="text" />
      </Specimen>
      <Specimen label="Text, three lines" wide>
        <Skeleton variant="text" lines={3} />
      </Specimen>
      <Specimen label="Block" wide>
        <Skeleton variant="block" />
      </Specimen>
      <Specimen label="Circle">
        <Skeleton variant="circle" />
      </Specimen>
      <Specimen label="Small text" wide>
        <Skeleton variant="text" size="sm" width="60%" />
      </Specimen>
      <Specimen label="Small circle">
        <Skeleton variant="circle" size="sm" />
      </Specimen>
    </SpecimenGrid>
  );
}

export function States() {
  return (
    <StateGrid>
      <State label="Animated text">
        <Skeleton variant="text" />
      </State>
      <State label="Static (reduced motion)">
        <Skeleton variant="text" animated={false} />
      </State>
      <State label="Paragraph">
        <div style={{ width: "100%" }}>
          <Skeleton variant="text" lines={3} />
        </div>
      </State>
      <State label="Block">
        <div style={{ width: "100%" }}>
          <Skeleton variant="block" />
        </div>
      </State>
      <State label="Circle">
        <Skeleton variant="circle" />
      </State>
    </StateGrid>
  );
}
