import { describe, expect, it } from "vitest";
import { parseHash } from "./routes";

describe("parseHash", () => {
  it("resolves each documented route", () => {
    expect(parseHash("#/overview")).toEqual({ kind: "overview" });
    expect(parseHash("#/foundations/colour")).toEqual({
      kind: "foundation",
      slug: "colour",
    });
    expect(parseHash("#/components/text-field")).toEqual({
      kind: "component",
      id: "text-field",
    });
    expect(parseHash("#/accessibility")).toEqual({ kind: "accessibility" });
  });

  it("keeps component ids for the registry to validate", () => {
    expect(parseHash("#/components/does-not-exist")).toEqual({
      kind: "component",
      id: "does-not-exist",
    });
  });

  it("falls back to the overview for an unknown hash", () => {
    expect(parseHash("#/nowhere")).toEqual({ kind: "overview" });
  });
});
