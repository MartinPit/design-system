import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("documentation shell", () => {
  it("renders the overview with landmarks and one h1", () => {
    window.location.hash = "";
    render(<App />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Arcana" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("navigation", { name: "Documentation" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("keeps the current route when the skip link is activated", async () => {
    const user = userEvent.setup();
    window.location.hash = "#/components/button";
    render(<App />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Button" }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("link", { name: "Skip to content" }));

    expect(window.location.hash).toBe("#/components/button");
    expect(screen.getByRole("main")).toHaveFocus();
    expect(
      screen.getByRole("heading", { level: 1, name: "Button" }),
    ).toBeInTheDocument();
  });
});
