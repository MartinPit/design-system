export interface TokenDef {
  name: string;
  label: string;
  role: string;
  fillOnly?: boolean;
  exempt?: boolean;
}

export interface TokenGroup {
  id: string;
  title: string;
  note: string;
  tokens: TokenDef[];
}

export const tokenGroups: TokenGroup[] = [
  {
    id: "paper",
    title: "Paper",
    note: "Warm cream ground. Three surface layers, one well.",
    tokens: [
      { name: "--paper-0", label: "Raised", role: "Sheets, input fields, cards" },
      { name: "--paper-1", label: "Page", role: "Document ground" },
      { name: "--paper-2", label: "Sunken", role: "Stripes, hover fills" },
      { name: "--paper-3", label: "Well", role: "Tracks, disabled fill" },
    ],
  },
  {
    id: "rules",
    title: "Rules",
    note: "Two weights of keyline: ornament and control boundary.",
    tokens: [
      {
        name: "--rule-ornament",
        label: "Ornament",
        role: "Decorative and structural keylines",
      },
      {
        name: "--rule-interactive",
        label: "Interactive",
        role: "Control boundary, 3:1 or better",
      },
    ],
  },
  {
    id: "lavender",
    title: "Lavender",
    note: "Decorative only. Never carries meaning on its own.",
    tokens: [
      {
        name: "--lavender-200",
        label: "Redaction",
        role: "Redaction squares, quiet tint",
      },
      {
        name: "--lavender-400",
        label: "Selection",
        role: "Hover and selection tint",
      },
    ],
  },
  {
    id: "ink",
    title: "Ink",
    note: "Purple carries all text. Five stops, one disabled exemption.",
    tokens: [
      { name: "--ink-900", label: "Heavy", role: "Display headings" },
      { name: "--ink-700", label: "Primary", role: "Body text, keylines" },
      { name: "--ink-500", label: "Secondary", role: "Ledes, metadata" },
      { name: "--ink-300", label: "Muted", role: "Quiet body" },
      {
        name: "--ink-200",
        label: "Disabled",
        role: "Disabled text (exempt)",
        exempt: true,
      },
    ],
  },
  {
    id: "accent",
    title: "Accent",
    note: "Text-safe versions of the gradient. Fills keep the brighter stops.",
    tokens: [
      { name: "--accent-amber", label: "Amber", role: "Warning-adjacent text" },
      { name: "--accent-orange", label: "Orange", role: "Warm accent text" },
      { name: "--accent-magenta", label: "Magenta", role: "Links, required marks" },
      { name: "--accent-violet", label: "Violet", role: "Visited links" },
      { name: "--accent-crimson", label: "Crimson", role: "Danger-adjacent text" },
    ],
  },
  {
    id: "semantic",
    title: "Semantic",
    note: "Archival states. Muted enough to sit beside ink.",
    tokens: [
      { name: "--success", label: "Success", role: "Saved, recall met" },
      { name: "--warning", label: "Warning", role: "Due soon, attention" },
      { name: "--danger", label: "Danger", role: "Errors, destructive action" },
      { name: "--info", label: "Info", role: "Neutral system note" },
    ],
  },
  {
    id: "gradient",
    title: "Gradient stops",
    note: "Fills only. The form is the sole gradient event on a page.",
    tokens: [
      { name: "--grad-amber", label: "Amber", role: "Linear, 0%", fillOnly: true },
      { name: "--grad-orange", label: "Orange", role: "Linear, 28%", fillOnly: true },
      { name: "--grad-magenta", label: "Magenta", role: "Linear, 55%", fillOnly: true },
      { name: "--grad-crimson", label: "Crimson", role: "Linear, 100%", fillOnly: true },
      { name: "--grad-violet", label: "Violet", role: "Radial bloom", fillOnly: true },
    ],
  },
];

export const tokenNames = tokenGroups.flatMap((group) =>
  group.tokens.map((token) => token.name),
);

export const tokenCount = tokenNames.length;

export const typeScale = [
  {
    token: "--text-hero",
    label: "Hero",
    value: "clamp(2.5rem, 6vw, 4.5rem)",
    sample: "Arcana",
    family: "display" as const,
    weight: 700,
  },
  {
    token: "--text-5xl",
    label: "Display",
    value: "3.25rem",
    sample: "Borrowed knowledge",
    family: "display" as const,
    weight: 700,
  },
  {
    token: "--text-4xl",
    label: "Title",
    value: "2.5rem",
    sample: "Kanji N3",
    family: "display" as const,
    weight: 700,
  },
  {
    token: "--text-3xl",
    label: "Heading",
    value: "1.875rem",
    sample: "142 cards due",
    family: "display" as const,
    weight: 600,
  },
  {
    token: "--text-2xl",
    label: "Subheading",
    value: "1.5rem",
    sample: "Spanish Verbs",
    family: "display" as const,
    weight: 600,
  },
  {
    token: "--text-xl",
    label: "Lede",
    value: "1.25rem",
    sample: "A deck is a collection with provenance.",
    family: "text" as const,
    weight: 400,
  },
  {
    token: "--text-md",
    label: "Body",
    value: "1rem",
    sample: "Review the cards you failed yesterday before adding new ones.",
    family: "text" as const,
    weight: 400,
  },
  {
    token: "--text-sm",
    label: "Small",
    value: "0.875rem",
    sample: "Last reviewed 04 Nov 2026",
    family: "text" as const,
    weight: 400,
  },
  {
    token: "--text-xs",
    label: "Caption",
    value: "0.75rem",
    sample: "98% recall across 12 sessions",
    family: "text" as const,
    weight: 400,
  },
  {
    token: "--text-2xs",
    label: "Label",
    value: "0.6875rem",
    sample: "Due today",
    family: "label" as const,
    weight: 500,
  },
];

export const spaceScale = [
  { token: "--space-1", value: "4", rem: "0.25rem" },
  { token: "--space-2", value: "8", rem: "0.5rem" },
  { token: "--space-3", value: "12", rem: "0.75rem" },
  { token: "--space-4", value: "16", rem: "1rem" },
  { token: "--space-5", value: "24", rem: "1.5rem" },
  { token: "--space-6", value: "32", rem: "2rem" },
  { token: "--space-7", value: "48", rem: "3rem" },
  { token: "--space-8", value: "64", rem: "4rem" },
  { token: "--space-9", value: "96", rem: "6rem" },
];

export const motionSamples = [
  { token: "--dur-1", label: "Control feedback", value: "120ms" },
  { token: "--dur-2", label: "Disclosure", value: "180ms" },
  { token: "--dur-3", label: "Page and stamp", value: "240ms" },
];

const HEX = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;
const RGB = /^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)/i;

function parseChannel(value: string): [number, number, number] | null {
  const hex = HEX.exec(value.trim());
  if (hex) {
    const raw = hex[1];
    if (raw.length === 3) {
      return [
        parseInt(raw[0] + raw[0], 16),
        parseInt(raw[1] + raw[1], 16),
        parseInt(raw[2] + raw[2], 16),
      ];
    }
    return [
      parseInt(raw.slice(0, 2), 16),
      parseInt(raw.slice(2, 4), 16),
      parseInt(raw.slice(4, 6), 16),
    ];
  }
  const rgb = RGB.exec(value.trim());
  if (rgb) {
    return [Number(rgb[1]), Number(rgb[2]), Number(rgb[3])];
  }
  return null;
}

function luminance(value: string): number | null {
  const channels = parseChannel(value);
  if (!channels) return null;
  const [r, g, b] = channels.map((channel) => {
    const c = channel / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** WCAG contrast ratio, or null when a value cannot be parsed. */
export function contrastRatio(a: string, b: string): number | null {
  const la = luminance(a);
  const lb = luminance(b);
  if (la === null || lb === null) return null;
  const lighter = Math.max(la, lb);
  const darker = Math.min(la, lb);
  return (lighter + 0.05) / (darker + 0.05);
}

export function formatContrast(ratio: number | null): string {
  return ratio === null ? "—" : `${ratio.toFixed(2)}:1`;
}
