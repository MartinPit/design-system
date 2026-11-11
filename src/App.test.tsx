import { render, screen } from "@testing-library/react";
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
});
