import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { SegmentedControl } from "./SegmentedControl";
import { Tabs } from "./Tabs";

describe("SegmentedControl", () => {
  it("switches the local view", async () => {
    const user = userEvent.setup();
    const change = vi.fn();
    render(
      <SegmentedControl
        label="Deck layout"
        defaultValue="list"
        onValueChange={change}
        options={[
          { value: "list", label: "List" },
          { value: "grid", label: "Grid" },
        ]}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Grid" }));

    expect(change).toHaveBeenCalledWith("grid");
    expect(screen.getByRole("button", { name: "Grid" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });
});

describe("Tabs", () => {
  const tabs = [
    { id: "due", label: "Due", content: "142 cards due" },
    { id: "all", label: "All cards", content: "1,204 cards" },
    { id: "archived", label: "Archived", content: "38 cards", disabled: true },
  ];

  it("moves selection with the arrow keys and skips disabled tabs", async () => {
    const user = userEvent.setup();
    render(<Tabs tabs={tabs} defaultValue="due" />);

    const due = screen.getByRole("tab", { name: "Due" });
    const all = screen.getByRole("tab", { name: "All cards" });
    due.focus();
    await user.keyboard("{ArrowRight}");

    expect(all).toHaveFocus();
    expect(all).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel")).toHaveTextContent("1,204 cards");

    await user.keyboard("{ArrowRight}");
    expect(due).toHaveFocus();
  });

  it("wraps with End and Home", async () => {
    const user = userEvent.setup();
    render(<Tabs tabs={tabs} defaultValue="due" variant="pill" />);

    screen.getByRole("tab", { name: "Due" }).focus();
    await user.keyboard("{End}");
    expect(screen.getByRole("tab", { name: "All cards" })).toHaveFocus();

    await user.keyboard("{Home}");
    expect(screen.getByRole("tab", { name: "Due" })).toHaveFocus();
  });
});
