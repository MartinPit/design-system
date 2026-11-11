import { useState } from "react";

export interface ColorToken {
  name: string;
  role: string;
  group: "Ground" | "Text & status" | "Surface & edge";
}

export const colorTokens: ColorToken[] = [
  { name: "--abyss", role: "Page base, lower-left text zone", group: "Ground" },
  { name: "--indigo", role: "Dark ground and panel", group: "Ground" },
  { name: "--violet", role: "Mid-dark raised ground", group: "Ground" },
  { name: "--periwinkle", role: "Mid-light iridescence", group: "Ground" },
  { name: "--cyan", role: "Light iridescence, accent", group: "Ground" },
  { name: "--mint", role: "Lightest end, primary accent", group: "Ground" },
  { name: "--ink", role: "Text on periwinkle, cyan and mint", group: "Text & status" },
  { name: "--cream", role: "Text on abyss, indigo and violet", group: "Text & status" },
  { name: "--success", role: "Saved, synced, recalled", group: "Text & status" },
  { name: "--warning", role: "Due soon, almost out of time", group: "Text & status" },
  { name: "--danger", role: "Delete, fail, destructive action", group: "Text & status" },
  { name: "--info", role: "Reference, visited, neutral notice", group: "Text & status" },
  { name: "--glass-1", role: "Level 1 glass, 12px blur", group: "Surface & edge" },
  { name: "--glass-2", role: "Level 2 glass, 18px blur", group: "Surface & edge" },
  { name: "--scrim", role: "Type crossing the middle of the ground", group: "Surface & edge" },
  { name: "--edge-on-dark", role: "Interactive edge on dark ground", group: "Surface & edge" },
  { name: "--edge-on-light", role: "Interactive edge on light ground", group: "Surface & edge" },
  { name: "--pattern-tint", role: "Seigaiha stroke tint", group: "Surface & edge" },
];

export interface Rgba {
  r: number;
  g: number;
  b: number;
  a: number;
}

export function parseColor(value: string): Rgba | null {
  const input = value.trim().toLowerCase();
  if (!input || input === "transparent") return null;

  if (input.startsWith("#")) {
    const hex = input.slice(1);
    if (hex.length === 3 || hex.length === 4) {
      const r = Number.parseInt(hex[0] + hex[0], 16);
      const g = Number.parseInt(hex[1] + hex[1], 16);
      const b = Number.parseInt(hex[2] + hex[2], 16);
      const a =
        hex.length === 4
          ? Number.parseInt(hex[3] + hex[3], 16) / 255
          : 1;
      if ([r, g, b].some(Number.isNaN)) return null;
      return { r, g, b, a };
    }
    if (hex.length === 6 || hex.length === 8) {
      const r = Number.parseInt(hex.slice(0, 2), 16);
      const g = Number.parseInt(hex.slice(2, 4), 16);
      const b = Number.parseInt(hex.slice(4, 6), 16);
      const a =
        hex.length === 8 ? Number.parseInt(hex.slice(6, 8), 16) / 255 : 1;
      if ([r, g, b].some(Number.isNaN)) return null;
      return { r, g, b, a };
    }
    return null;
  }

  const match = input.match(/^rgba?\(([^)]+)\)$/);
  if (!match) return null;
  const parts = match[1]!
    .split(/[\s,/]+/)
    .filter(Boolean)
    .map((part) => Number.parseFloat(part));
  if (parts.length < 3 || parts.some(Number.isNaN)) return null;
  const [r, g, b, a = 1] = parts;
  return { r: r!, g: g!, b: b!, a };
}

function composite(foreground: Rgba, background: Rgba): Rgba {
  const a = foreground.a + background.a * (1 - foreground.a);
  if (a === 0) return { r: 0, g: 0, b: 0, a: 0 };
  return {
    r:
      (foreground.r * foreground.a +
        background.r * background.a * (1 - foreground.a)) /
      a,
    g:
      (foreground.g * foreground.a +
        background.g * background.a * (1 - foreground.a)) /
      a,
    b:
      (foreground.b * foreground.a +
        background.b * background.a * (1 - foreground.a)) /
      a,
    a,
  };
}

function channel(value: number): number {
  const srgb = value / 255;
  return srgb <= 0.03928
    ? srgb / 12.92
    : Math.pow((srgb + 0.055) / 1.055, 2.4);
}

function luminance(color: Rgba): number {
  return (
    0.2126 * channel(color.r) +
    0.7152 * channel(color.g) +
    0.0722 * channel(color.b)
  );
}

export function contrastRatio(foreground: Rgba, background: Rgba): number {
  const fg = luminance(foreground);
  const bg = luminance(background);
  const light = Math.max(fg, bg);
  const dark = Math.min(fg, bg);
  return (light + 0.05) / (dark + 0.05);
}

export function contrastOnAbyss(value: string): {
  label: string;
  ratio: number;
} | null {
  const base = parseColor("#0a0722");
  const raw = parseColor(value);
  if (!base || !raw) return null;
  const solid = raw.a < 1 ? composite(raw, base) : raw;
  const cream = parseColor("#f7f2e6");
  const ink = parseColor("#08060f");
  if (!cream || !ink) return null;
  const creamRatio = contrastRatio(cream, solid);
  const inkRatio = contrastRatio(ink, solid);
  return creamRatio >= inkRatio
    ? { label: "Cream", ratio: creamRatio }
    : { label: "Ink", ratio: inkRatio };
}

export function useResolvedTokens(names: readonly string[]): Record<string, string> {
  const [values] = useState<Record<string, string>>(() => {
    const computed = getComputedStyle(document.documentElement);
    const next: Record<string, string> = {};
    for (const name of names) {
      next[name] = computed.getPropertyValue(name).trim();
    }
    return next;
  });

  return values;
}
