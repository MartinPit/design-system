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

    expect(screen.getByRole("tab", { name: "Due" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByRole("tabpanel")).toHaveTextContent("142 cards due");
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
