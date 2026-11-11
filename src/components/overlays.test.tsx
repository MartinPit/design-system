import { useState } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button } from "./Button";
import { Dialog } from "./Dialog";
import { DropdownMenu } from "./DropdownMenu";
import { Select } from "./Select";
import { Toast } from "./Toast";
import { Tooltip } from "./Tooltip";

function DialogHarness() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Delete deck</Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="Delete Kanji N3?"
        description="142 cards due will be removed from the schedule."
        footer={
          <>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger">Delete deck</Button>
          </>
        }
      >
        <p>This cannot be undone.</p>
      </Dialog>
    </>
  );
}

describe("Dialog", () => {
  it("traps focus, closes on Escape and returns focus to the trigger", async () => {
    const user = userEvent.setup();
    render(<DialogHarness />);

    const trigger = screen.getByRole("button", { name: "Delete deck" });
    await user.click(trigger);

    const dialog = screen.getByRole("dialog", { name: "Delete Kanji N3?" });
    expect(dialog).toBeInTheDocument();

    for (let step = 0; step < 6; step += 1) {
      await user.tab();
      expect(dialog.contains(document.activeElement)).toBe(true);
    }

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
});

describe("DropdownMenu", () => {
  it("moves with arrow keys and closes on Escape with focus returned", async () => {
    const user = userEvent.setup();
    render(
      <DropdownMenu
        triggerLabel="Deck actions"
        items={[
          { id: "rename", label: "Rename deck" },
          { id: "duplicate", label: "Duplicate deck" },
          { id: "delete", label: "Delete deck", danger: true },
        ]}
      />,
    );

    const trigger = screen.getByRole("button", { name: /Deck actions/i });
    await user.click(trigger);

    expect(screen.getByRole("menu")).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: "Rename deck" })).toHaveFocus();

    await user.keyboard("{ArrowDown}");
    expect(
      screen.getByRole("menuitem", { name: "Duplicate deck" }),
    ).toHaveFocus();

    await user.keyboard("{End}");
    expect(screen.getByRole("menuitem", { name: "Delete deck" })).toHaveFocus();

    await user.keyboard("{ArrowDown}");
    expect(screen.getByRole("menuitem", { name: "Rename deck" })).toHaveFocus();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
});

describe("Tooltip", () => {
  it("shows on focus, describes the trigger and dismisses on Escape", async () => {
    const user = userEvent.setup();
    render(
      <Tooltip label="Shuffle the deck">
        <Button>Shuffle</Button>
      </Tooltip>,
    );

    const trigger = screen.getByRole("button", { name: "Shuffle" });
    await user.tab();
    expect(trigger).toHaveFocus();

    const tooltip = await screen.findByRole("tooltip");
    expect(tooltip).toHaveTextContent("Shuffle the deck");
    expect(trigger).toHaveAttribute("aria-describedby", tooltip.id);

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    expect(trigger).not.toHaveAttribute("aria-describedby");
  });
});

describe("Toast", () => {
  it("announces itself and dismisses through its named button", async () => {
    const user = userEvent.setup();
    const onDismiss = vi.fn();
    render(
      <Toast
        title="Card saved"
        description="to remember · Kanji N3"
        duration={0}
        onDismiss={onDismiss}
      />,
    );

    const status = screen.getByRole("status");
    expect(status).toHaveTextContent("Card saved");

    fireEvent.mouseEnter(status);
    expect(status).toHaveTextContent("Paused");
    fireEvent.mouseLeave(status);
    expect(status).toHaveTextContent("Just now");

    fireEvent.focus(status);
    expect(status).toHaveTextContent("Paused");

    await user.click(
      screen.getByRole("button", { name: "Dismiss notification" }),
    );
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });
});

describe("Select keyboard", () => {
  it("keeps native keyboard handling and focus", async () => {
    const user = userEvent.setup();
    const onKeyDown = vi.fn();
    render(
      <Select
        label="Deck"
        defaultValue="kanji"
        options={[
          { value: "kanji", label: "Kanji N3" },
          { value: "verbs", label: "Spanish Verbs" },
        ]}
        onKeyDown={onKeyDown}
      />,
    );

    const select = screen.getByLabelText("Deck");
    await user.tab();
    expect(select).toHaveFocus();

    await user.keyboard("{ArrowDown}");
    expect(onKeyDown).toHaveBeenCalled();
    expect(select).toHaveFocus();
  });
});
