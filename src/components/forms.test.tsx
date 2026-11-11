import { createRef } from "react";
import { render, screen } from "@testing-library/react";
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
  it("accepts a deck name through its labelled input", async () => {
    const onChange = vi.fn();
    render(<TextField label="Deck name" onChange={onChange} />);

    await userEvent.type(screen.getByLabelText("Deck name"), "Kanji N3");

    expect(onChange).toHaveBeenCalled();
  });

  it("announces its error text", () => {
    render(<TextField label="Deck name" error="A deck needs a name" />);

    expect(screen.getByLabelText("Deck name")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
    expect(screen.getByText("A deck needs a name")).toBeInTheDocument();
  });
});

describe("TextArea", () => {
  it("counts the answer characters it holds", async () => {
    render(<TextArea label="Answer" maxLength={40} />);

    await userEvent.type(screen.getByLabelText("Answer"), "la llave");

    expect(screen.getByText("8 / 40")).toBeInTheDocument();
  });
});

describe("Select", () => {
  it("chooses a deck from its options", async () => {
    render(
      <Select
        label="Deck"
        options={[
          { value: "kanji", label: "Kanji N3" },
          { value: "verbs", label: "Spanish Verbs" },
        ]}
      />,
    );

    await userEvent.selectOptions(screen.getByLabelText("Deck"), "verbs");

    expect(screen.getByLabelText("Deck")).toHaveValue("verbs");
  });
});

describe("Checkbox", () => {
  it("toggles with its visible label", async () => {
    render(<Checkbox label="Due today" />);

    const checkbox = screen.getByRole("checkbox", { name: "Due today" });
    await userEvent.click(checkbox);

    expect(checkbox).toBeChecked();
  });
});

describe("RadioGroup", () => {
  it("selects one study mode", async () => {
    render(
      <RadioGroup
        label="Study mode"
        options={[
          { value: "recall", label: "Recall" },
          { value: "review", label: "Review" },
        ]}
      />,
    );

    await userEvent.click(screen.getByRole("radio", { name: "Review" }));

    expect(screen.getByRole("radio", { name: "Review" })).toBeChecked();
  });
});

describe("Switch", () => {
  it("turns reminders on through its label", async () => {
    render(<Switch label="Daily reminders" />);

    const control = screen.getByRole("switch", { name: "Daily reminders" });
    expect(control).toHaveAttribute("aria-checked", "false");

    await userEvent.click(control);

    expect(control).toHaveAttribute("aria-checked", "true");
  });

  it("forwards ref, native attributes and composes onClick", async () => {
    const ref = createRef<HTMLButtonElement>();
    const onClick = vi.fn();
    render(
      <Switch
        ref={ref}
        label="Daily reminders"
        data-testid="reminders"
        onClick={onClick}
      />,
    );

    const control = screen.getByRole("switch", { name: "Daily reminders" });
    expect(ref.current).toBe(control);
    expect(control).toHaveAttribute("data-testid", "reminders");

    await userEvent.click(control);
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(control).toHaveAttribute("aria-checked", "true");
  });
});

describe("Slider", () => {
  it("reports a daily goal value", () => {
    render(<Slider label="Daily goal" defaultValue={20} formatValue={(v) => `${v} cards`} />);

    expect(screen.getByLabelText("Daily goal")).toHaveValue("20");
    expect(screen.getByText("20 cards")).toBeInTheDocument();
  });
});

describe("SearchField", () => {
  it("finds a deck and clears the query", async () => {
    render(<SearchField label="Find a deck" />);

    const input = screen.getByLabelText("Find a deck");
    await userEvent.type(input, "biol");
    expect(input).toHaveValue("biol");

    await userEvent.click(screen.getByRole("button", { name: "Clear search" }));
    expect(input).toHaveValue("");
  });
});
