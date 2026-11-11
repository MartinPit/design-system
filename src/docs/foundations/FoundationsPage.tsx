import { useState } from "react";
import type { CSSProperties } from "react";
import { Button } from "../../components/Button";
import { Icon, iconNames } from "../../icons/Icon";
import { PageHeader, Prose, Section } from "../page";
import { colorTokens, contrastOnAbyss, useResolvedTokens } from "../tokenData";
import { usePrefersReducedMotion } from "../usePrefersReducedMotion";
import styles from "./foundations.module.css";

const spaceTokens = [
  "--space-1",
  "--space-2",
  "--space-3",
  "--space-4",
  "--space-5",
  "--space-6",
  "--space-7",
  "--space-8",
  "--space-9",
];

const radii = [
  { token: "--radius-1", label: "Control edge" },
  { token: "--radius-2", label: "Field and tile" },
  { token: "--radius-3", label: "Panel" },
  { token: "--radius-4", label: "Raised panel" },
  { token: "--radius-pill", label: "Pill" },
];

const typeScale = [
  { token: "--text-2xs", use: "Metadata" },
  { token: "--text-xs", use: "Small label" },
  { token: "--text-sm", use: "Table and hint" },
  { token: "--text-md", use: "Body" },
  { token: "--text-lg", use: "Body large" },
  { token: "--text-xl", use: "Lede" },
  { token: "--text-2xl", use: "Heading 3" },
  { token: "--text-3xl", use: "Heading 2" },
  { token: "--text-4xl", use: "Heading 1" },
];

function tokenList(names: string[]): string[] {
  return names;
}

function ColourPage() {
  const names = tokenList(colorTokens.map((token) => token.name));
  const values = useResolvedTokens(names);
  const groups = ["Ground", "Text & status", "Surface & edge"] as const;

  return (
    <>
      <PageHeader
        eyebrow="Foundations / Colour"
        title="Colour"
        lede="One iridescent ground, then a small set of solids a UI can actually stand on. Values below are read from the live custom properties, so a swatch cannot lie."
      />

      <Section
        title="The ground"
        lead="A six-stop 32° linear with three radial blooms. It is fixed on desktop and scrolls on small screens."
      >
        <div className={styles.groundStrip} aria-hidden="true" />
        <div className={styles.tokenStripRow}>
          <span className={styles.mono}>32° · 6 stops</span>
          <span className={styles.mono}>mint bloom 86% 4%</span>
          <span className={styles.mono}>periwinkle bloom 72% 27%</span>
          <span className={styles.mono}>abyss bloom 8% 102%</span>
        </div>
        <Prose>
          <p>
            Cream text is allowed on abyss, indigo and violet. Ink is allowed
            on periwinkle, cyan and mint. Nothing else is: when type must cross
            the middle of the ground, it sits on the scrim or on a dark panel.
            That is the whole readability rule.
          </p>
        </Prose>
      </Section>

      {groups.map((group) => (
        <Section
          key={group}
          title={group}
          lead={
            group === "Ground"
              ? "The palette, in the order light travels across the card."
              : group === "Text & status"
                ? "Text and semantic states. Each swatch reports its strongest foreground on abyss."
                : "Glass, scrim and the two edge alphas. Alpha never assumes one end of the ground."
          }
        >
          <div className={styles.swatchGrid}>
            {colorTokens
              .filter((token) => token.group === group)
              .map((token) => {
                const value = values[token.name] ?? "";
                const contrast = value ? contrastOnAbyss(value) : null;
                return (
                  <div className={styles.swatchCard} key={token.name}>
                    <span
                      className={styles.swatch}
                      style={
                        { "--swatch": `var(${token.name})` } as CSSProperties
                      }
                      aria-hidden="true"
                    />
                    <span className={styles.swatchName}>{token.name}</span>
                    <span className={styles.swatchValue}>
                      {value || "resolving…"}
                    </span>
                    <span className={styles.swatchRole}>{token.role}</span>
                    {contrast ? (
                      <span className={styles.contrast}>
                        {contrast.label} {contrast.ratio.toFixed(1)}:1 on abyss
                      </span>
                    ) : null}
                  </div>
                );
              })}
          </div>
        </Section>
      ))}
    </>
  );
}

function TypePage() {
  const names = tokenList(typeScale.map((row) => row.token));
  const values = useResolvedTokens(names);

  return (
    <>
      <PageHeader
        eyebrow="Foundations / Type"
        title="Type"
        lede="Bodoni Moda carries authority. Source Serif 4 carries the reading. IBM Plex Mono carries the coordinates: small caps, timestamps, counts."
      />

      <Section title="Display">
        <div className={styles.typeDisplaySample}>Tidal</div>
        <div className={styles.specRow}>
          <span className={styles.mono}>--font-display</span>
          <span className={styles.specValue}>
            Bodoni Moda Variable · opsz 72 · wght 560 · line-height 0.9 ·
            tracking −0.02em
          </span>
        </div>
        <Prose>
          <p>
            Display only, never below 24px. Use it for the wordmark, page
            titles, deck names and card faces. It does not set body copy.
          </p>
        </Prose>
      </Section>

      <Section title="Text">
        <div className={styles.typeBodySample}>
          <p>
            A deck is a place you return to. <em>La llave</em> is not a fact you
            own; it is a door you learn to open again.
          </p>
        </div>
        <div className={styles.specRow}>
          <span className={styles.mono}>--font-text</span>
          <span className={styles.specValue}>
            Source Serif 4 Variable · 300 / 400 / 600 · measure 62ch · leading
            1.6
          </span>
        </div>
      </Section>

      <Section title="Label and numerals">
        <div className={styles.labelSpecimen}>
          <span className={styles.mono}>Member since</span>
          <span className={styles.monoStrong}>2026.11</span>
          <span className={styles.mono}>142 cards due</span>
          <span className={styles.monoStrong}>98% recall</span>
        </div>
        <div className={styles.specRow}>
          <span className={styles.mono}>--font-label</span>
          <span className={styles.specValue}>
            IBM Plex Mono · 400 / 500 · uppercase · tracking 0.18em · tabular
            numerals
          </span>
        </div>
      </Section>

      <Section title="Scale" lead="Nine steps. The display face is reserved for the top of the range.">
        <div className={styles.scaleTable}>
          {typeScale.map((row) => (
            <div className={styles.scaleRow} key={row.token}>
              <code className={styles.scaleToken}>{row.token}</code>
              <span className={styles.scaleValue}>
                {values[row.token] || "—"}
              </span>
              <span
                className={styles.scaleSample}
                style={{ fontSize: `var(${row.token})` }}
              >
                Recall
              </span>
              <span className={styles.scaleUse}>{row.use}</span>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}

function SpacePage() {
  const values = useResolvedTokens(spaceTokens);

  return (
    <>
      <PageHeader
        eyebrow="Foundations / Space"
        title="Space"
        lede="A four-pixel pulse. The scale is short enough to remember and wide enough to separate a deck from the cards inside it."
      />

      <Section title="The ruler">
        <div className={styles.ruler}>
          {spaceTokens.map((token) => (
            <div className={styles.rulerRow} key={token}>
              <code className={styles.rulerToken}>{token}</code>
              <div className={styles.rulerTrack}>
                <span
                  className={styles.rulerBar}
                  style={{ width: `var(${token})` }}
                />
              </div>
              <span className={styles.rulerValue}>{values[token] || "—"}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Inset, live" lead="The same token used as padding, not as decoration.">
        <div className={styles.insetDemo}>
          <div className={styles.insetInner}>
            <span className={styles.mono}>--space-5 inset</span>
            <p>
              This panel has 24px of breathing room. The gap between the label
              and the paragraph is <code>--space-2</code>.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}

function ShapePage() {
  const values = useResolvedTokens(radii.map((row) => row.token));

  return (
    <>
      <PageHeader
        eyebrow="Foundations / Shape"
        title="Shape"
        lede="A superellipse-adjacent corner language: controls at 14, panels at 20, raised surfaces at 28, pills at 999. The card is fully rounded; the system is quieter."
      />

      <Section title="Radii">
        <div className={styles.radiusGrid}>
          {radii.map((row) => (
            <div className={styles.radiusCard} key={row.token}>
              <span
                className={styles.radiusTile}
                style={{ borderRadius: `var(${row.token})` }}
                aria-hidden="true"
              />
              <code className={styles.scaleToken}>{row.token}</code>
              <span className={styles.scaleValue}>
                {values[row.token] || "—"}
              </span>
              <span className={styles.scaleUse}>{row.label}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Edges" lead="One alpha cannot clear both ends of the ground, so there are two.">
        <div className={styles.edgeGrid}>
          <div className={styles.edgeDark}>
            <span className={styles.mono}>--edge-on-dark</span>
            <div className={styles.edgeSample}>
              <span>Kanji N3</span>
              <span className={styles.edgeValue}>142 due</span>
            </div>
          </div>
          <div className={styles.edgeLight}>
            <span className={styles.mono}>--edge-on-light</span>
            <div className={styles.edgeSampleLight}>
              <span>Spanish Verbs</span>
              <span className={styles.edgeValueLight}>84 due</span>
            </div>
          </div>
        </div>
        <Prose>
          <p>
            Borders are not decoration. An interactive edge uses the alpha for
            the local ground: cream at 55% on dark, ink at 65% on light. Static
            dividers use <code>--color-border</code>.
          </p>
        </Prose>
      </Section>
    </>
  );
}

function ElevationPage() {
  return (
    <>
      <PageHeader
        eyebrow="Foundations / Elevation"
        title="Elevation"
        lede="Depth is glass, not shadow. Three levels, one opaque fallback, and an orb that is ornament rather than a control."
      />

      <Section title="Levels">
        <div className={styles.elevationStage}>
          <div className={styles.elevFlat}>
            <span className={styles.elevLabel}>L0</span>
            <p>Flat indigo. The page and the dark panel.</p>
          </div>
          <div className={styles.elevOne}>
            <span className={styles.elevLabel}>L1</span>
            <p>6% white, 12px blur. Sidebar, quiet chips.</p>
          </div>
          <div className={styles.elevTwo}>
            <span className={styles.elevLabel}>L2</span>
            <p>12% white, 18px blur. Raised controls and the card face.</p>
          </div>
        </div>
        <Prose>
          <p>
            Cream text only strikes 4.5:1 on glass over violet or darker. Glass
            is never the sole boundary of a control; a 1px edge or a solid fill
            says where the control ends.
          </p>
        </Prose>
      </Section>

      <Section title="Opaque fallback" lead="Used when backdrop-filter is unsupported or transparency is reduced.">
        <div className={styles.fallbackCard}>
          <span className={styles.elevLabel}>Fallback</span>
          <p>linear-gradient(155deg, #8E9BE8, #5A4AB0 52%, #241A5E)</p>
        </div>
      </Section>
    </>
  );
}

function MotionSample({
  token,
  name,
  description,
  value,
}: {
  token: string;
  name: string;
  description: string;
  value: string;
}) {
  const reduced = usePrefersReducedMotion();
  const [run, setRun] = useState(0);

  return (
    <div className={styles.motionRow}>
      <div className={styles.motionHead}>
        <code className={styles.scaleToken}>{token}</code>
        <span className={styles.motionName}>
          {name} · {value || "—"}
        </span>
        <span className={styles.motionDescription}>{description}</span>
      </div>
      <div className={styles.motionTrack} aria-hidden="true">
        {run > 0 && !reduced ? (
          <span
            key={run}
            className={styles.motionDot}
            style={
              {
                animationDuration: `var(${token})`,
                animationTimingFunction: "var(--ease-standard)",
              } as CSSProperties
            }
          />
        ) : (
          <span className={styles.motionDotIdle} />
        )}
      </div>
      <Button
        size="sm"
        variant="secondary"
        onClick={() => setRun((value) => value + 1)}
        disabled={reduced}
      >
        {reduced ? "Reduced motion" : "Play"}
      </Button>
    </div>
  );
}

function MotionPage() {
  const durations = useResolvedTokens(["--dur-1", "--dur-2", "--dur-3"]);

  return (
    <>
      <PageHeader
        eyebrow="Foundations / Motion"
        title="Motion"
        lede="Fast enough to feel like response, slow enough to be read as water. Controls at 160ms, disclosure at 240ms, page at 320ms."
      />

      <Section title="Durations">
        <div className={styles.motionList}>
          <MotionSample
            token="--dur-1"
            name="Control"
            value={durations["--dur-1"] ?? ""}
            description="Hover, press, switch, field focus."
          />
          <MotionSample
            token="--dur-2"
            name="Disclosure"
            value={durations["--dur-2"] ?? ""}
            description="Tabs, menus, the contents rail."
          />
          <MotionSample
            token="--dur-3"
            name="Page"
            value={durations["--dur-3"] ?? ""}
            description="Route change and panel entrance."
          />
        </div>
        <Prose>
          <p>
            Easing is <code>cubic-bezier(.16,.84,.28,1)</code>. Hover lifts by
            1px and returns; nothing bounces. Reduced motion removes the lift
            and the shimmer, leaving opacity changes only. The orb’s 6-second
            shimmer is the single exception to the short-duration rule.
          </p>
        </Prose>
      </Section>

      <Section title="Reduced motion" lead="Honoured at the system level, not as an afterthought.">
        <Prose>
          <p>
            The play controls disable themselves when{" "}
            <code>prefers-reduced-motion: reduce</code> is set. Scroll behaviour
            becomes instant, transitions collapse to 0.01ms and the orb holds
            still.
          </p>
        </Prose>
      </Section>
    </>
  );
}

function IconsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Foundations / Icons"
        title="Icons"
        lede="Inline SVG only. A 24px grid, 1.5px stroke, round caps and joins, currentColor. No icon font and no runtime library."
      />

      <Section title="The set" lead="Shown at 20 and 24 pixels with the name used in code.">
        <div className={styles.iconGrid}>
          {iconNames.map((name) => (
            <div className={styles.iconCard} key={name}>
              <div className={styles.iconSizes}>
                <Icon name={name} size={20} />
                <Icon name={name} size={24} />
              </div>
              <code className={styles.iconName}>{name}</code>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Rules">
        <Prose>
          <p>
            An icon inside a labelled control is decorative and gets{" "}
            <code>aria-hidden</code>. An icon that stands alone needs an
            accessible name on its control, not on the SVG. Stroke weight stays
            at 1.5px at both sizes; the mark does not glow.
          </p>
        </Prose>
      </Section>
    </>
  );
}

export function FoundationsPage({ slug }: { slug: string }) {
  switch (slug) {
    case "type":
      return <TypePage />;
    case "space":
      return <SpacePage />;
    case "shape":
      return <ShapePage />;
    case "elevation":
      return <ElevationPage />;
    case "motion":
      return <MotionPage />;
    case "icons":
      return <IconsPage />;
    case "colour":
    default:
      return <ColourPage />;
  }
}
