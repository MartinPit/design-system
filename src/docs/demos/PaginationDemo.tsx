import { useState } from "react";
import { Pagination } from "../../components/Pagination";
import { Specimen, SpecimenGrid, State, StateGrid } from "../specimen";
import styles from "./demo.module.css";

export function Demo() {
  const [page, setPage] = useState(3);
  return (
    <div className={styles.stack}>
      <div className={styles.panel}>
        <div className={styles.deckHead}>
          <p className={styles.cardMeta}>Kanji N3 · all cards</p>
          <span className={styles.meta}>142 cards</span>
        </div>
        <Pagination
          page={page}
          pageCount={12}
          onPageChange={setPage}
          label="All cards pagination"
        />
      </div>
      <p className={styles.inlineNote}>
        Page {page} of 12 · 12 cards per page.
      </p>
    </div>
  );
}

export function Variants() {
  return (
    <SpecimenGrid columns={2}>
      <Specimen label="Numbered" wide>
        <Pagination
          page={3}
          pageCount={12}
          onPageChange={() => undefined}
          label="Numbered pagination"
        />
      </Specimen>
      <Specimen label="Compact" wide>
        <Pagination
          page={3}
          pageCount={12}
          onPageChange={() => undefined}
          variant="compact"
          label="Compact pagination"
        />
      </Specimen>
      <Specimen label="Small" wide>
        <Pagination
          page={3}
          pageCount={12}
          onPageChange={() => undefined}
          size="sm"
          label="Small pagination"
        />
      </Specimen>
    </SpecimenGrid>
  );
}

export function States() {
  return (
    <StateGrid>
      <State label="Current">
        <Pagination
          page={3}
          pageCount={12}
          onPageChange={() => undefined}
          label="Current pagination"
        />
      </State>
      <State label="Hover">
        <Pagination
          page={3}
          pageCount={12}
          onPageChange={() => undefined}
          preview="hover"
          label="Hover pagination"
        />
      </State>
      <State label="Focus">
        <Pagination
          page={3}
          pageCount={12}
          onPageChange={() => undefined}
          preview="focus"
          label="Focus pagination"
        />
      </State>
      <State label="Boundary">
        <Pagination
          page={1}
          pageCount={12}
          onPageChange={() => undefined}
          label="Boundary pagination"
        />
      </State>
    </StateGrid>
  );
}
