import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import App from "../App";

function renderAt(hash: string) {
  window.location.hash = hash;
  return render(<App />);
}

afterEach(() => {
  window.location.hash = "";
});

describe("docs routing", () => {
  it("falls back to Overview for an unknown hash", () => {
    renderAt("#/components/not-delivered");

    expect(
      screen.getByRole("heading", { level: 1, name: "Tidal" }),
    ).toBeInTheDocument();
  });

  it("renders the full component contract in order", () => {
    renderAt("#/components/button");

    expect(
      screen.getByRole("heading", { level: 1, name: "Button" }),
    ).toBeInTheDocument();
    for (const title of [
      "Live demo",
      "Variants",
      "States",
      "Props",
      "Usage",
      "Accessibility",
    ]) {
      expect(
        screen.getByRole("heading", { level: 2, name: title }),
      ).toBeInTheDocument();
    }
  });

  it("renders a foundation page from the route", () => {
    renderAt("#/foundations/colour");

    expect(
      screen.getByRole("heading", { level: 1, name: "Colour" }),
    ).toBeInTheDocument();
  });

  it("lists only delivered components in the sidebar", () => {
    renderAt("#/overview");

    expect(
      screen.getByRole("link", { name: "TextField" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "Breadcrumb" }),
    ).not.toBeInTheDocument();
  });
});
