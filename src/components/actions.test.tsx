import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button } from "./Button";
import { IconButton } from "./IconButton";
import { Link } from "./Link";

describe("Button", () => {
  it("commits the action it names", async () => {
    const user = userEvent.setup();
    const save = vi.fn();
    render(<Button onClick={save}>Save card</Button>);

    await user.click(screen.getByRole("button", { name: "Save card" }));

    expect(save).toHaveBeenCalledTimes(1);
  });

  it("blocks the action while loading", async () => {
    const user = userEvent.setup();
    const save = vi.fn();
    render(
      <Button loading onClick={save}>
        Save card
      </Button>,
    );

    const button = screen.getByRole("button", { name: /save card/i });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
    await user.click(button);
    expect(save).not.toHaveBeenCalled();
  });
});

describe("IconButton", () => {
  it("exposes its accessible name", async () => {
    const user = userEvent.setup();
    const shuffle = vi.fn();
    render(<IconButton label="Shuffle deck" icon="shuffle" onClick={shuffle} />);

    await user.click(screen.getByRole("button", { name: "Shuffle deck" }));

    expect(shuffle).toHaveBeenCalledTimes(1);
  });
});

describe("Link", () => {
  it("renders a real anchor with its destination", () => {
    render(<Link href="#/components/button">Read the Button docs</Link>);

    expect(
      screen.getByRole("link", { name: "Read the Button docs" }),
    ).toHaveAttribute("href", "#/components/button");
  });
});
