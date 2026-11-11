import { icons } from "../../icons";
import { Page, PageHead, Section } from "../ui";
import styles from "./pages.module.css";

function IconGrid({ size }: { size: 20 | 24 }) {
  return (
    <div className={styles.iconGrid}>
      {icons.map(({ name, Icon }) => (
        <div key={name} className={styles.iconCell}>
          <Icon width={size} height={size} />
          <span className={styles.iconName}>{name}</span>
          <span className={styles.iconSize}>{size} px</span>
        </div>
      ))}
    </div>
  );
}

export function IconsPage() {
  return (
    <Page>
      <PageHead
        eyebrow="Arcana / Foundations"
        title="Icons"
        job="A small catalogue of inline SVGs on a 24px grid. 1.5px stroke, square caps and joins, currentColor throughout."
        sheet={`Sheet 01.07\n${icons.length} glyphs`}
      />

      <Section index="01" title="At 24 px" note="Primary interface size">
        <IconGrid size={24} />
      </Section>

      <Section index="02" title="At 20 px" note="Compact controls">
        <IconGrid size={20} />
      </Section>

      <Section index="03" title="Rules" note="Draw once">
        <ol className={styles.ruleList}>
          <li>
            <span>01</span>
            <p>
              24px viewBox, 1.5px stroke. Do not scale a 24px glyph into a
              control below 20px.
            </p>
          </li>
          <li>
            <span>02</span>
            <p>
              Square caps and miter joins match the keyline grammar. Circles
              exist only where the reference has them.
            </p>
          </li>
          <li>
            <span>03</span>
            <p>
              Icons are <code>aria-hidden</code>. The name belongs on the
              control, not on the glyph.
            </p>
          </li>
        </ol>
      </Section>
    </Page>
  );
}
