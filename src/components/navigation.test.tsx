import { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { SegmentedControl } from "./SegmentedControl";
import { Tabs } from "./Tabs";
import { Switch } from "./Switch";

function TabsHarness() {
  const [value, setValue] = useState("due");
  return (
    <Tabs
      value={value}
      onChange={setValue}
      items={[
        { id: "due", label: "Due", content: "142 cards due" },
        { id: "new", label: "New", content: "18 new cards" },
        { id: "suspended", label: "Suspended", content: "4 suspended" },
      ]}
    />
  );
}

describe("Tabs", () => {
  it("renders one selected tab and its panel", () => {
    render(<TabsHarness />);

    const due = screen.getByRole("tab", { name: "Due" });
    const panel = screen.getByRole("tabpanel");
    expect(due).toHaveAttribute("aria-selected", "true");
    expect(due).toHaveAttribute("aria-controls", panel.id);
    expect(screen.getByRole("tab", { name: "New" })).not.toHaveAttribute(
      "aria-controls",
    );
    expect(panel).toHaveTextContent("142 cards due");
  });

  it("keeps the tablist reachable when no tab is selected", () => {
    render(
      <Tabs
        value="none"
        label="Empty selection"
        items={[
          { id: "due", label: "Due" },
          { id: "new", label: "New" },
        ]}
      />,
    );

    const tabs = screen.getAllByRole("tab");
    expect(tabs[0]).toHaveAttribute("tabindex", "0");
    expect(tabs[1]).toHaveAttribute("tabindex", "-1");
    expect(tabs[0]).not.toHaveAttribute("aria-controls");
    expect(screen.queryByRole("tabpanel")).not.toBeInTheDocument();
  });

  it("moves selection with arrow keys and Home and End", async () => {
    render(<TabsHarness />);
    const due = screen.getByRole("tab", { name: "Due" });
    due.focus();

    await userEvent.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "New" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByRole("tab", { name: "New" })).toHaveFocus();

    await userEvent.keyboard("{End}");
    expect(screen.getByRole("tab", { name: "Suspended" })).toHaveAttribute(
      "aria-selected",
      "true",
    );

    await userEvent.keyboard("{Home}");
    expect(screen.getByRole("tab", { name: "Due" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });
});

describe("SegmentedControl", () => {
  it("switches the selected segment", async () => {
    render(
      <SegmentedControl
        label="View"
        options={[
          { value: "grid", label: "Grid" },
          { value: "list", label: "List" },
        ]}
      />,
    );

    await userEvent.click(screen.getByRole("button", { name: "List" }));

    expect(screen.getByRole("button", { name: "List" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });
});

describe("Switch keyboard", () => {
  it("toggles with Space", async () => {
    render(<Switch label="Daily reminders" />);
    const control = screen.getByRole("switch", { name: "Daily reminders" });
    control.focus();

    await userEvent.keyboard(" ");
    expect(control).toHaveAttribute("aria-checked", "true");

    await userEvent.keyboard(" ");
    expect(control).toHaveAttribute("aria-checked", "false");
  });
});
