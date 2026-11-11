import { useState } from "react";
import type { ReactNode } from "react";
import { Skeleton } from "../../components/Skeleton";
import { Table } from "../../components/Table";
import type { TableColumn, TableSort } from "../../components/Table";
import { Specimen, State } from "../specimen";
import styles from "./demo.module.css";

interface HistoryRow {
  id: string;
  card: string;
  deck: string;
  reviewed: string;
  recall: number;
}

const history: HistoryRow[] = [
  { id: "card-142", card: "to remember", deck: "Kanji N3", reviewed: "2026.11.11", recall: 98 },
  { id: "card-88", card: "la llave", deck: "Spanish Verbs", reviewed: "2026.11.10", recall: 91 },
  { id: "card-31", card: "mitochondria", deck: "Biology 101", reviewed: "2026.11.08", recall: 84 },
  { id: "card-204", card: "however", deck: "Spanish Verbs", reviewed: "2026.11.06", recall: 76 },
];

const columns: TableColumn[] = [
  { key: "card", header: "Card", sortable: true },
  { key: "deck", header: "Deck", sortable: true },
  { key: "reviewed", header: "Last reviewed", sortable: true },
  { key: "recall", header: "Recall", align: "end", sortable: true },
];

function sortHistory(rows: HistoryRow[], sort: TableSort | null): HistoryRow[] {
  if (!sort) return rows;
  return [...rows].sort((first, second) => {
    const key = sort.key as keyof HistoryRow;
    const a = first[key];
    const b = second[key];
    const result =
      typeof a === "number" && typeof b === "number"
        ? a - b
        : String(a).localeCompare(String(b));
    return sort.direction === "ascending" ? result : -result;
  });
}

function historyRows(rows: HistoryRow[]): Array<Record<string, ReactNode>> {
  return rows.map((row) => ({
    card: row.card,
    deck: row.deck,
    reviewed: row.reviewed,
    recall: <span className={styles.count}>{row.recall}%</span>,
  }));
}

export function Demo() {
  const [sort, setSort] = useState<TableSort | null>({
    key: "reviewed",
    direction: "descending",
  });
  const [selected, setSelected] = useState<string[]>([]);
  const rows = historyRows(sortHistory(history, sort));

  return (
    <div className={styles.stack}>
      <Table
        caption="Study history"
        columns={columns}
        rows={rows}
        getRowId={(row) => String(row.card)}
        getRowLabel={(row) => String(row.card)}
        sort={sort}
        onSortChange={setSort}
        selectable
        selectedIds={selected}
        onSelectionChange={setSelected}
      />
      <div className={styles.tableFoot}>
        <span className={styles.inlineNote}>
          {selected.length} selected · sorted by {sort?.key ?? "none"}{" "}
          {sort?.direction}
        </span>
        <span className={styles.meta}>4 of 1,204 cards</span>
      </div>
    </div>
  );
}

export function Variants() {
  return (
    <div className={styles.stack}>
      <Specimen label="Default" wide>
        <Table
          caption="Default study history"
          columns={columns}
          rows={historyRows(history)}
          getRowId={(row) => String(row.card)}
        />
      </Specimen>
      <Specimen label="Striped" wide>
        <Table
          caption="Striped study history"
          columns={columns}
          rows={historyRows(history)}
          getRowId={(row) => String(row.card)}
          variant="striped"
        />
      </Specimen>
      <Specimen label="Compact" wide>
        <Table
          caption="Compact study history"
          columns={columns}
          rows={historyRows(history)}
          getRowId={(row) => String(row.card)}
          variant="compact"
        />
      </Specimen>
    </div>
  );
}

export function States() {
  const states = [
    {
      label: "Header",
      node: (
        <Table
          columns={columns}
          rows={historyRows(history).slice(0, 2)}
          getRowId={(row) => String(row.card)}
        />
      ),
    },
    {
      label: "Sorted ascending",
      node: (
        <Table
          columns={columns}
          rows={historyRows(sortHistory(history, { key: "deck", direction: "ascending" })).slice(0, 2)}
          getRowId={(row) => String(row.card)}
          sort={{ key: "deck", direction: "ascending" }}
        />
      ),
    },
    {
      label: "Sorted descending",
      node: (
        <Table
          columns={columns}
          rows={historyRows(sortHistory(history, { key: "recall", direction: "descending" })).slice(0, 2)}
          getRowId={(row) => String(row.card)}
          sort={{ key: "recall", direction: "descending" }}
        />
      ),
    },
    {
      label: "Row hover",
      node: (
        <Table
          columns={columns}
          rows={historyRows(history).slice(0, 2)}
          getRowId={(row) => String(row.card)}
          previewRowId="card-88"
        />
      ),
    },
    {
      label: "Selected row",
      node: (
        <Table
          columns={columns}
          rows={historyRows(history).slice(0, 2)}
          getRowId={(row) => String(row.card)}
          selectable
          selectedIds={["card-142"]}
        />
      ),
    },
    {
      label: "Empty",
      node: (
        <Table
          columns={columns}
          rows={[]}
          getRowId={(row) => String(row.card)}
          emptyMessage="No cards match these filters."
        />
      ),
    },
    {
      label: "Loading",
      node: (
        <Table
          columns={columns}
          rows={[]}
          loading
          getRowId={(row) => String(row.card)}
        />
      ),
    },
  ];

  return (
    <div className={styles.stateStack}>
      {states.map((state) => (
        <State key={state.label} label={state.label}>
          {state.node}
        </State>
      ))}
      <State label="Skeleton block">
        <div style={{ width: "100%" }}>
          <Skeleton variant="block" />
        </div>
      </State>
    </div>
  );
}
