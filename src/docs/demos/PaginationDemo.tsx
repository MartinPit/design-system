import { useState } from "react";
import { Pagination } from "../../components/Pagination";
import type { SpecimenItem } from "../types";
import styles from "./demo.module.css";

export function PaginationDemo() {
  const [page, setPage] = useState(3);

  return (
    <div className={styles.stack}>
      <Pagination
        page={page}
        pageCount={8}
        onPageChange={setPage}
        label="Card list pagination"
      />
      <p className={styles.caption}>
        Page {page} of 8 · 20 cards per page
      </p>
    </div>
  );
}

export const paginationVariants: SpecimenItem[] = [
  {
    label: "Numbered / sm",
    content: (
      <Pagination
        page={3}
        pageCount={8}
        size="sm"
        label="Pagination variant numbered sm"
      />
    ),
  },
  {
    label: "Numbered / md",
    content: (
      <Pagination
        page={3}
        pageCount={8}
        label="Pagination variant numbered md"
      />
    ),
  },
  {
    label: "Compact / sm",
    content: (
      <Pagination
        page={3}
        pageCount={8}
        variant="compact"
        size="sm"
        label="Pagination variant compact sm"
      />
    ),
  },
  {
    label: "Compact / md",
    content: (
      <Pagination
        page={3}
        pageCount={8}
        variant="compact"
        label="Pagination variant compact md"
      />
    ),
  },
];

export const paginationStates: SpecimenItem[] = [
  {
    label: "Current",
    content: (
      <Pagination page={3} pageCount={8} label="Pagination state current" />
    ),
  },
  {
    label: "Default",
    content: (
      <Pagination page={4} pageCount={8} label="Pagination state default" />
    ),
  },
  {
    label: "Hover",
    content: (
      <Pagination
        page={3}
        pageCount={8}
        data-state="hover"
        label="Pagination state hover"
      />
    ),
  },
  {
    label: "Focus visible",
    content: (
      <Pagination
        page={3}
        pageCount={8}
        data-state="focus"
        label="Pagination state focus"
      />
    ),
  },
  {
    label: "Disabled at bounds",
    content: (
      <Pagination
        page={1}
        pageCount={8}
        label="Pagination state bounds"
      />
    ),
  },
];
