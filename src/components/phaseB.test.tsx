import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Avatar } from "./Avatar";
import { Badge } from "./Badge";
import { Breadcrumb } from "./Breadcrumb";
import { Card } from "./Card";
import { EmptyState } from "./EmptyState";
import { Pagination } from "./Pagination";
import { Progress } from "./Progress";
import { Skeleton } from "./Skeleton";
import { Table } from "./Table";
import { Tag } from "./Tag";

interface StudyRow {
  id: string;
  deck: string;
  due: number;
}

const rows: StudyRow[] = [
  { id: "kanji", deck: "Kanji N3", due: 142 },
  { id: "verbs", deck: "Spanish Verbs", due: 18 },
];

describe("Breadcrumb", () => {
  it("names the trail and marks the current page", () => {
    render(
      <Breadcrumb
        items={[
          { label: "Decks", href: "#/overview" },
          { label: "Kanji N3" },
        ]}
      />,
    );

    expect(
      screen.getByRole("navigation", { name: "Breadcrumb" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Kanji N3")).toHaveAttribute(
      "aria-current",
      "page",
    );
  });
});

describe("Pagination", () => {
  it("reports the current page and bounds", () => {
    render(<Pagination page={3} pageCount={8} />);

    expect(screen.getByRole("button", { name: "Page 3" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(screen.getByRole("button", { name: "Previous page" })).toBeEnabled();
    expect(screen.getByRole("button", { name: "Next page" })).toBeEnabled();
  });
});

describe("Card", () => {
  it("renders its deck content", () => {
    render(<Card variant="raised">Kanji N3</Card>);

    expect(screen.getByText("Kanji N3")).toBeInTheDocument();
  });
});

describe("Badge", () => {
  it("renders its label", () => {
    render(<Badge variant="success">98% recall</Badge>);

    expect(screen.getByText("98% recall")).toBeInTheDocument();
  });
});

describe("Tag", () => {
  it("exposes a named remove action", () => {
    render(
      <Tag variant="removable" removeLabel="Remove Kanji N3">
        Kanji N3
      </Tag>,
    );

    expect(
      screen.getByRole("button", { name: "Remove Kanji N3" }),
    ).toBeInTheDocument();
  });
});

describe("Avatar", () => {
  it("falls back to initials with an accessible name", () => {
    render(<Avatar initials="MN" label="Martin Novak" />);

    expect(screen.getByRole("img", { name: "Martin Novak" })).toHaveTextContent(
      "MN",
    );
  });

  it("becomes a labelled button when interactive", () => {
    render(<Avatar initials="MN" label="Open profile" interactive />);

    expect(
      screen.getByRole("button", { name: "MN — Open profile" }),
    ).toBeInTheDocument();
  });
});

describe("Table", () => {
  it("renders a named table with sortable columns", () => {
    render(
      <Table<StudyRow>
        caption="Study history"
        rowKey={(row) => row.id}
        rows={rows}
        columns={[
          {
            key: "deck",
            header: "Deck",
            sortable: true,
            render: (row) => row.deck,
          },
          {
            key: "due",
            header: "Due",
            align: "end",
            render: (row) => row.due,
          },
        ]}
        sort={{ key: "deck", direction: "asc" }}
        onSort={() => undefined}
      />,
    );

    expect(
      screen.getByRole("table", { name: "Study history" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: "Deck" })).toHaveAttribute(
      "aria-sort",
      "ascending",
    );
  });
});

describe("Progress", () => {
  it("exposes a value only when determinate", () => {
    const { rerender } = render(<Progress label="Recall" value={98} />);
    expect(screen.getByRole("progressbar", { name: "Recall" })).toHaveAttribute(
      "aria-valuenow",
      "98",
    );

    rerender(<Progress label="Recall" indeterminate />);
    expect(
      screen.getByRole("progressbar", { name: "Recall" }),
    ).not.toHaveAttribute("aria-valuenow");
  });
});

describe("Skeleton", () => {
  it("is hidden from assistive technology", () => {
    const { container } = render(<Skeleton variant="block" />);

    expect(container.firstElementChild).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });
});

describe("EmptyState", () => {
  it("renders its title and body", () => {
    render(
      <EmptyState
        title="No cards in this deck"
        body="Add a card to start the collection."
      />,
    );

    expect(
      screen.getByRole("heading", { name: "No cards in this deck" }),
    ).toBeInTheDocument();
  });
});
