import { useState } from "react";
import {
  Table,
  type TableColumn,
  type TableVariant,
} from "../../components/Table";
import type { SpecimenItem } from "../types";
import styles from "./demo.module.css";

interface StudyRow {
  id: string;
  deck: string;
  studied: string;
  due: number;
  recall: number;
}

const rows: StudyRow[] = [
  { id: "kanji", deck: "Kanji N3", studied: "11 Nov 2026", due: 142, recall: 98 },
  { id: "verbs", deck: "Spanish Verbs", studied: "10 Nov 2026", due: 18, recall: 92 },
  { id: "biology", deck: "Biology 101", studied: "08 Nov 2026", due: 36, recall: 88 },
  { id: "letters", deck: "Greek Alphabet", studied: "04 Nov 2026", due: 0, recall: 81 },
];

const columns: TableColumn<StudyRow>[] = [
  { key: "deck", header: "Deck", sortable: true, render: (row) => row.deck },
  {
    key: "studied",
    header: "Last studied",
    render: (row) => row.studied,
  },
  {
    key: "due",
    header: "Due",
    align: "end",
    sortable: true,
    render: (row) => `${row.due} cards`,
  },
  {
    key: "recall",
    header: "Recall",
    align: "end",
    render: (row) => `${row.recall}%`,
  },
];

function sortedRows(sort: { key: string; direction: "asc" | "desc" }) {
  return [...rows].sort((a, b) => {
    if (sort.key === "due") {
      return sort.direction === "asc" ? a.due - b.due : b.due - a.due;
    }
    const left = a.deck.toLowerCase();
    const right = b.deck.toLowerCase();
    return sort.direction === "asc"
      ? left.localeCompare(right)
      : right.localeCompare(left);
  });
}

export function TableDemo() {
  const [sort, setSort] = useState<{
    key: string;
    direction: "asc" | "desc";
  }>({ key: "deck", direction: "asc" });
  const [selected, setSelected] = useState<string[]>([]);

  function changeSort(key: string) {
    setSort((current) =>
      current.key === key
        ? {
            key,
            direction: current.direction === "asc" ? "desc" : "asc",
          }
        : { key, direction: "asc" },
    );
  }

  return (
    <div className={styles.tableWrap}>
      <Table<StudyRow>
        caption="Study history"
        columns={columns}
        rows={sortedRows(sort)}
        rowKey={(row) => row.id}
        sort={sort}
        onSort={changeSort}
        selectedKeys={selected}
        onSelectionChange={setSelected}
        getRowLabel={(row) => row.deck}
      />
      <p className={styles.caption}>
        {selected.length > 0
          ? `${selected.length} rows selected`
          : "Sortable by deck and due count."}
      </p>
    </div>
  );
}

const variants: TableVariant[] = ["default", "striped", "compact"];

export const tableVariants: SpecimenItem[] = variants.map((variant) => ({
  label: variant,
  content: (
    <Table<StudyRow>
      caption={`Study history, ${variant}`}
      columns={columns.slice(0, 3)}
      rows={rows.slice(0, 3)}
      rowKey={(row) => row.id}
      variant={variant}
    />
  ),
}));

export const tableStates: SpecimenItem[] = [
  {
    label: "Header",
    content: (
      <Table<StudyRow>
        caption="Study history, header state"
        columns={columns.slice(0, 3)}
        rows={rows.slice(0, 2)}
        rowKey={(row) => row.id}
      />
    ),
  },
  {
    label: "Sorted ascending",
    content: (
      <Table<StudyRow>
        caption="Study history, ascending"
        columns={columns}
        rows={sortedRows({ key: "deck", direction: "asc" })}
        rowKey={(row) => row.id}
        sort={{ key: "deck", direction: "asc" }}
        onSort={() => undefined}
      />
    ),
  },
  {
    label: "Sorted descending",
    content: (
      <Table<StudyRow>
        caption="Study history, descending"
        columns={columns}
        rows={sortedRows({ key: "due", direction: "desc" })}
        rowKey={(row) => row.id}
        sort={{ key: "due", direction: "desc" }}
        onSort={() => undefined}
      />
    ),
  },
  {
    label: "Row hover",
    content: (
      <Table<StudyRow>
        caption="Study history, row hover"
        columns={columns.slice(0, 3)}
        rows={rows.slice(0, 2)}
        rowKey={(row) => row.id}
        data-state="hover"
      />
    ),
  },
  {
    label: "Selected row",
    content: (
      <Table<StudyRow>
        caption="Study history, selected row"
        columns={columns.slice(0, 3)}
        rows={rows.slice(0, 2)}
        rowKey={(row) => row.id}
        selectedKeys={["kanji"]}
        onSelectionChange={() => undefined}
      />
    ),
  },
  {
    label: "Empty",
    content: (
      <Table<StudyRow>
        caption="Study history, empty"
        columns={columns.slice(0, 3)}
        rows={[]}
        rowKey={(row) => row.id}
        empty="No cards match this filter. Clear the deck filter and try again."
      />
    ),
  },
  {
    label: "Loading",
    content: (
      <Table<StudyRow>
        caption="Study history, loading"
        columns={columns.slice(0, 3)}
        rows={[]}
        rowKey={(row) => row.id}
        loading
      />
    ),
  },
];
