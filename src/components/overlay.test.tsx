import { useState } from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button } from "./Button";
import { Dialog } from "./Dialog";
import { DropdownMenu } from "./DropdownMenu";
import { Toast } from "./Toast";
import { Tooltip } from "./Tooltip";

function DialogHarness() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        Delete deck
      </button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="Delete Kanji N3?"
        description="This removes 1,204 cards and their study history."
      >
        <p>Deleted cards cannot be restored.</p>
        <div>
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => setOpen(false)}>
            Delete deck
          </Button>
        </div>
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

    expect(
      screen.getByRole("dialog", { name: "Delete Kanji N3?" }),
    ).toBeInTheDocument();

    const dialog = screen.getByRole("dialog", { name: "Delete Kanji N3?" });
    const close = within(dialog).getByRole("button", { name: "Close dialog" });
    const cancel = within(dialog).getByRole("button", { name: "Cancel" });
    const confirm = within(dialog).getByRole("button", { name: "Delete deck" });

    expect(close).toHaveFocus();
    await user.tab();
    expect(cancel).toHaveFocus();
    await user.tab();
    expect(confirm).toHaveFocus();
    await user.tab();
    expect(close).toHaveFocus();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
});

const menuItems = [
  { id: "edit", label: "Edit deck" },
  { id: "duplicate", label: "Duplicate deck" },
  { id: "archive", label: "Archive deck", disabled: true },
  { id: "delete", label: "Delete deck", danger: true },
];

describe("DropdownMenu", () => {
  it("moves with the arrow keys and returns focus on Escape", async () => {
    const user = userEvent.setup();
    render(<DropdownMenu label="Deck actions" items={menuItems} />);

    const trigger = screen.getByRole("button", { name: "Deck actions" });
    await user.click(trigger);

    const edit = screen.getByRole("menuitem", { name: "Edit deck" });
    const duplicate = screen.getByRole("menuitem", { name: "Duplicate deck" });
    const remove = screen.getByRole("menuitem", { name: "Delete deck" });

    expect(edit).toHaveFocus();
    await user.keyboard("{ArrowDown}");
    expect(duplicate).toHaveFocus();
    await user.keyboard("{End}");
    expect(remove).toHaveFocus();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("selects an item and closes the menu", async () => {
    const user = userEvent.setup();
    const edit = vi.fn();
    render(
      <DropdownMenu
        label="Deck actions"
        items={[{ id: "edit", label: "Edit deck", onSelect: edit }]}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Deck actions" }));
    await user.click(screen.getByRole("menuitem", { name: "Edit deck" }));

    expect(edit).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });
});

describe("Tooltip", () => {
  it("opens on focus, describes the trigger and closes on Escape", async () => {
    const user = userEvent.setup();
    render(
      <Tooltip label="Shuffle the deck">
        <button type="button">Shuffle</button>
      </Tooltip>,
    );

    await user.tab();
    const trigger = screen.getByRole("button", { name: "Shuffle" });
    const tooltip = screen.getByRole("tooltip");

    expect(trigger).toHaveFocus();
    expect(tooltip).toHaveTextContent("Shuffle the deck");
    expect(trigger).toHaveAttribute("aria-describedby", tooltip.id);

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("also opens on hover", async () => {
    const user = userEvent.setup();
    render(
      <Tooltip label="142 cards due">
        <button type="button">Due</button>
      </Tooltip>,
    );

    await user.hover(screen.getByRole("button", { name: "Due" }));
    expect(screen.getByRole("tooltip")).toHaveTextContent("142 cards due");
  });
});

function ToastHarness() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        Save card
      </button>
      <Toast
        open={open}
        onDismiss={() => setOpen(false)}
        message="Card saved to Kanji N3."
        variant="success"
        duration={0}
      />
    </>
  );
}

describe("Toast", () => {
  it("announces and dismisses", async () => {
    const user = userEvent.setup();
    render(<ToastHarness />);

    await user.click(screen.getByRole("button", { name: "Save card" }));
    expect(screen.getByRole("status")).toHaveTextContent(
      "Card saved to Kanji N3.",
    );

    await user.click(screen.getByRole("button", { name: "Dismiss notification" }));
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });
});
