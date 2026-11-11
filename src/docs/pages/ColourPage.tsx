import {
  contrastRatio,
  formatContrast,
  tokenCount,
  tokenGroups,
  tokenNames,
  type TokenDef,
} from "../tokenData";
import { useTokenValues } from "../useTokenValues";
import {
  Page,
  PageHead,
  Section,
} from "../ui";
import styles from "./pages.module.css";

function Swatch({
  token,
  value,
  ground,
}: {
  token: TokenDef;
  value: string;
  ground: string;
}) {
  const ratio = token.fillOnly ? null : contrastRatio(value, ground);

  return (
    <div className={styles.swatch}>
      <span
        className={styles.chip}
        style={{ background: `var(${token.name})` }}
      />
      <div className={styles.swatchHead}>
        <code>{token.name}</code>
        <span>{token.label}</span>
      </div>
      <p className={styles.swatchRole}>{token.role}</p>
      <p className={styles.swatchMeta}>
        <span>{value ? value.toUpperCase() : "—"}</span>
        <span>
          {token.fillOnly
            ? "Fill only"
            : token.exempt
              ? "Exempt"
              : formatContrast(ratio)}
        </span>
      </p>
    </div>
  );
}

const groups = tokenGroups.filter((group) => group.id !== "gradient");
const gradient = tokenGroups.find((group) => group.id === "gradient");

export function ColourPage() {
  const names = [...tokenNames, "--paper-1"];
  const values = useTokenValues(names);
  const ground = values["--paper-1"] ?? "";

  return (
    <Page>
      <PageHead
        eyebrow="Arcana / Foundations"
        title="Colour"
        job="Cream ground, purple ink, and one warm gradient. Every value on this page is read from the stylesheet at render time."
        sheet={`Sheet 01.01\n${tokenCount} tokens`}
      />

      <Section
        index="01"
        title="Palette"
        note="Resolved from CSS custom properties"
      >
        {groups.map((group) => (
          <div key={group.id} className={styles.tokenGroup}>
            <div className={styles.groupHead}>
              <h3>{group.title}</h3>
              <p>{group.note}</p>
            </div>
            <div className={styles.swatches}>
              {group.tokens.map((token) => (
                <Swatch
                  key={token.name}
                  token={token}
                  value={values[token.name] ?? ""}
                  ground={ground}
                />
              ))}
            </div>
          </div>
        ))}
      </Section>

      <Section
        index="02"
        title="The gradient"
        note="One event per viewport"
      >
        <div className={styles.gradientBar} aria-hidden="true" />
        <div className={styles.gradientLegend}>
          <code>--gradient-form</code>
          <span>114deg</span>
          <span>Amber 0% · Orange 28% · Magenta 55% · Crimson 100%</span>
        </div>
        {gradient ? (
          <div className={styles.swatches}>
            {gradient.tokens.map((token) => (
              <Swatch
                key={token.name}
                token={token}
                value={values[token.name] ?? ""}
                ground={ground}
              />
            ))}
          </div>
        ) : null}
        <p className={styles.note}>
          The gradient is a fill only. It never carries type, never becomes a
          button, and never runs behind text. The radial bloom sits at 14% / 86%
          and fades to transparent. Text-safe accent variants replace the bright
          stops whenever a warm colour has to become a word.
        </p>
      </Section>
    </Page>
  );
}
