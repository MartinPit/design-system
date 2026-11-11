import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
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

describe("Breadcrumb", () => {
  it("marks the current page and links the ancestors", () => {
    render(
      <Breadcrumb
        items={[
          { label: "Decks", href: "#/components/card" },
          { label: "Kanji N3", href: "#/components/card" },
          { label: "Card 142" },
        ]}
      />,
    );

    expect(screen.getByRole("link", { name: "Kanji N3" })).toHaveAttribute(
      "href",
      "#/components/card",
    );
    expect(screen.getByText("Card 142")).toHaveAttribute(
      "aria-current",
      "page",
    );
  });
});

describe("Pagination", () => {
  it("moves to the next page", async () => {
    const user = userEvent.setup();
    const change = vi.fn();
    render(
      <Pagination page={2} pageCount={12} onPageChange={change} />,
    );

    await user.click(screen.getByRole("button", { name: "Next page" }));
    expect(change).toHaveBeenCalledWith(3);
    expect(
      screen.getByRole("button", { name: "Page 2" }),
    ).toHaveAttribute("aria-current", "page");
  });
});

describe("Card", () => {
  it("activates an interactive card with Enter", async () => {
    const user = userEvent.setup();
    const activate = vi.fn();
    render(
      <Card variant="interactive" interactive onActivate={activate}>
        Kanji N3
      </Card>,
    );

    const card = screen.getByRole("button", { name: "Kanji N3" });
    card.focus();
    await user.keyboard("{Enter}");
    expect(activate).toHaveBeenCalledTimes(1);
  });
});

describe("Badge", () => {
  it("renders its status", () => {
    render(<Badge variant="success">98% recall</Badge>);
    expect(screen.getByText("98% recall")).toBeInTheDocument();
  });
});

describe("Tag", () => {
  it("removes a removable tag", async () => {
    const user = userEvent.setup();
    const remove = vi.fn();
    render(
      <Tag variant="removable" onRemove={remove} removeLabel="Remove Kanji N3">
        Kanji N3
      </Tag>,
    );

    await user.click(screen.getByRole("button", { name: "Remove Kanji N3" }));
    expect(remove).toHaveBeenCalledTimes(1);
  });
});

describe("Avatar", () => {
  it("falls back to initials when the image fails", () => {
    render(<Avatar name="Mina Park" src="/missing-portrait.jpg" />);

    fireEvent.error(screen.getByAltText("Mina Park"));

    expect(screen.getByRole("img", { name: "Mina Park" })).toHaveTextContent(
      "MP",
    );
  });
});

const columns = [
  { key: "card", header: "Card", sortable: true },
  { key: "deck", header: "Deck" },
  { key: "recall", header: "Recall", align: "end" as const },
];

const rows = [
  { card: "to remember", deck: "Kanji N3", recall: "98%" },
  { card: "la llave", deck: "Spanish Verbs", recall: "91%" },
];

describe("Table", () => {
  it("sorts a column and selects a row", async () => {
    const user = userEvent.setup();
    const sort = vi.fn();
    const select = vi.fn();
    render(
      <Table
        caption="Study history"
        columns={columns}
        rows={rows}
        getRowId={(row) => String(row.card)}
        getRowLabel={(row) => String(row.card)}
        selectable
        onSortChange={sort}
        onSelectionChange={select}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Card" }));
    expect(sort).toHaveBeenCalledWith({ key: "card", direction: "ascending" });

    await user.click(screen.getByRole("checkbox", { name: "Select to remember" }));
    expect(select).toHaveBeenCalledWith(["to remember"]);
  });

  it("shows an empty state", () => {
    render(
      <Table
        columns={columns}
        rows={[]}
        getRowId={(row) => String(row.card)}
        emptyMessage="No cards match these filters."
      />,
    );
    expect(
      screen.getByText("No cards match these filters."),
    ).toBeInTheDocument();
  });

  it("marks loading with aria-busy", () => {
    render(
      <Table
        columns={columns}
        rows={[]}
        loading
        getRowId={(row) => String(row.card)}
      />,
    );
    expect(screen.getByRole("table")).toHaveAttribute("aria-busy", "true");
  });
});

describe("Progress", () => {
  it("exposes a value only when determinate", () => {
    const { rerender } = render(
      <Progress label="Recall" value={98} variant="ring" />,
    );
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
    const { container } = render(<Skeleton variant="text" />);
    expect(container.querySelector('[aria-hidden="true"]')).toBeInTheDocument();
  });
});

describe("EmptyState", () => {
  it("renders a title, description and action", () => {
    render(
      <EmptyState
        title="No cards due"
        description="The next review is tomorrow at 08:00."
        action={<button type="button">Browse all cards</button>}
      />,
    );

    expect(
      screen.getByRole("heading", { name: "No cards due" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Browse all cards" }),
    ).toBeInTheDocument();
  });
});
