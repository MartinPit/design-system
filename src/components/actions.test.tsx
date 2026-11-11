import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button } from "./Button";
import { IconButton } from "./IconButton";
import { Link } from "./Link";

describe("Button", () => {
  it("commits its action through the native button", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Start session</Button>);

    await userEvent.click(screen.getByRole("button", { name: "Start session" }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("reports a loading button as busy and disabled", () => {
    render(<Button loading>Saving card</Button>);

    const button = screen.getByRole("button", { name: "Saving card" });
    expect(button).toHaveAttribute("aria-busy", "true");
    expect(button).toBeDisabled();
  });
});

describe("IconButton", () => {
  it("exposes its compact action by accessible name", () => {
    render(<IconButton aria-label="Shuffle deck">S</IconButton>);

    expect(
      screen.getByRole("button", { name: "Shuffle deck" }),
    ).toBeInTheDocument();
  });
});

describe("Link", () => {
  it("renders a navigable anchor", () => {
    render(<Link href="#/components/button">Read the Button spec</Link>);

    const link = screen.getByRole("link", { name: "Read the Button spec" });
    expect(link).toHaveAttribute("href", "#/components/button");
  });

  it("removes a disabled link from the tab order", () => {
    render(<Link disabled>Unavailable</Link>);

    expect(screen.getByText("Unavailable")).toHaveAttribute(
      "aria-disabled",
      "true",
    );
    expect(screen.getByText("Unavailable")).not.toHaveAttribute("href");
  });
});
