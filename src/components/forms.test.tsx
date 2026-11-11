import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Checkbox } from "./Checkbox";
import { RadioGroup } from "./RadioGroup";
import { SearchField } from "./SearchField";
import { Select } from "./Select";
import { Slider } from "./Slider";
import { Switch } from "./Switch";
import { TextArea } from "./TextArea";
import { TextField } from "./TextField";

describe("TextField", () => {
  it("accepts a deck name and exposes its hint", async () => {
    const user = userEvent.setup();
    render(<TextField label="Deck name" hint="Shown on the deck card" />);

    const input = screen.getByLabelText("Deck name");
    await user.type(input, "Kanji N3");

    expect(input).toHaveValue("Kanji N3");
    expect(screen.getByText("Shown on the deck card")).toBeInTheDocument();
  });
});

describe("TextArea", () => {
  it("accepts an answer and counts characters", async () => {
    const user = userEvent.setup();
    render(<TextArea label="Answer" maxLength={120} showCount />);

    await user.type(screen.getByLabelText("Answer"), "to remember");

    expect(screen.getByLabelText("Answer")).toHaveValue("to remember");
    expect(screen.getByText("11 / 120")).toBeInTheDocument();
  });
});

describe("Select", () => {
  it("chooses a deck", async () => {
    const user = userEvent.setup();
    render(
      <Select label="Deck" defaultValue="kanji">
        <option value="kanji">Kanji N3</option>
        <option value="spanish">Spanish Verbs</option>
      </Select>,
    );

    await user.selectOptions(screen.getByLabelText("Deck"), "spanish");

    expect(screen.getByLabelText("Deck")).toHaveValue("spanish");
  });

  it("is reachable by keyboard and keeps the native select model", async () => {
    const user = userEvent.setup();
    render(
      <Select label="Deck" defaultValue="kanji">
        <option value="kanji">Kanji N3</option>
        <option value="spanish">Spanish Verbs</option>
      </Select>,
    );

    await user.tab();
    const select = screen.getByLabelText("Deck");
    expect(select).toHaveFocus();
    expect(select.tagName).toBe("SELECT");
    expect(select).not.toHaveAttribute("aria-describedby");
  });
});

describe("Checkbox", () => {
  it("toggles a due-only filter", async () => {
    const user = userEvent.setup();
    render(<Checkbox label="Only due cards" />);

    const box = screen.getByRole("checkbox", { name: "Only due cards" });
    await user.click(box);

    expect(box).toBeChecked();
  });
});

describe("RadioGroup", () => {
  it("picks one study mode", async () => {
    const user = userEvent.setup();
    const change = vi.fn();
    render(
      <RadioGroup
        legend="Study mode"
        name="mode"
        onValueChange={change}
        options={[
          { value: "recall", label: "Recall" },
          { value: "typing", label: "Typing" },
        ]}
      />,
    );

    await user.click(screen.getByRole("radio", { name: "Typing" }));

    expect(change).toHaveBeenCalledWith("typing");
  });
});

describe("Switch", () => {
  it("toggles with the space key", async () => {
    const user = userEvent.setup();
    render(<Switch label="Study reminders" />);

    const control = screen.getByRole("switch", { name: "Study reminders" });
    control.focus();
    await user.keyboard(" ");

    expect(control).toBeChecked();
  });
});

describe("Slider", () => {
  it("reports the chosen daily goal", () => {
    render(<Slider label="Daily goal" defaultValue={20} min={0} max={100} step={10} />);

    const slider = screen.getByLabelText("Daily goal");
    fireEvent.change(slider, { target: { value: "30" } });

    expect(slider).toHaveValue("30");
    expect(screen.getByText("30")).toBeInTheDocument();
  });
});

describe("SearchField", () => {
  it("clears the query", async () => {
    const user = userEvent.setup();
    render(<SearchField label="Search cards" />);

    const input = screen.getByLabelText("Search cards");
    await user.type(input, "llave");
    await user.click(screen.getByRole("button", { name: "Clear search" }));

    expect(input).toHaveValue("");
  });
});
