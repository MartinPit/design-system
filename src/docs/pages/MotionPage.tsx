import { useState } from "react";
import { Button } from "../../components/Button";
import { cx } from "../../lib/cx";
import { motionSamples } from "../tokenData";
import { useReducedMotion } from "../useTokenValues";
import { Page, PageHead, Section } from "../ui";
import styles from "./pages.module.css";

function MotionSample({
  token,
  label,
  value,
  reduced,
}: {
  token: string;
  label: string;
  value: string;
  reduced: boolean;
}) {
  const [run, setRun] = useState(0);

  return (
    <div className={styles.motionRow}>
      <div className={styles.motionMeta}>
        <code>{token}</code>
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div className={styles.motionStage} aria-hidden="true">
        <span
          key={run}
          className={cx(styles.motionBlock, run > 0 && styles.motionRun)}
          style={{ animationDuration: `var(${token})` }}
        />
      </div>
      <Button
        size="sm"
        variant="secondary"
        onClick={() => setRun((count) => count + 1)}
        disabled={reduced}
        aria-label={`Play ${value} ${label} sample`}
      >
        Play
      </Button>
    </div>
  );
}

export function MotionPage() {
  const reduced = useReducedMotion();

  return (
    <Page>
      <PageHead
        eyebrow="Arcana / Foundations"
        title="Motion"
        job="Short, mechanical and directional. A stamp, a reveal, a slide — never a bounce, never a shimmer."
        sheet={"Sheet 01.06\n3 durations"}
      />

      <Section index="01" title="Durations" note="One easing curve">
        <div className={styles.motionList}>
          {motionSamples.map((sample) => (
            <MotionSample
              key={sample.token}
              token={sample.token}
              label={sample.label}
              value={sample.value}
              reduced={reduced}
            />
          ))}
        </div>
        <p className={styles.note} role="status">
          {reduced
            ? "Reduced motion is on. Movement samples are disabled; pages reveal with opacity only."
            : "Easing is cubic-bezier(.2, .8, .2, 1) for every duration. Play a sample to replay it."}
        </p>
      </Section>

      <Section index="02" title="Rules" note="What moves">
        <ol className={styles.ruleList}>
          <li>
            <span>01</span>
            <p>
              120ms for control feedback, 180ms for disclosure, 240ms for page
              and stamp. Nothing runs longer.
            </p>
          </li>
          <li>
            <span>02</span>
            <p>
              Reveal is opacity plus <code>translateY(6px)</code>. No scale, no
              rotation, no elastic easing.
            </p>
          </li>
          <li>
            <span>03</span>
            <p>
              Reduced motion removes movement and shimmer, keeps a single
              opacity change, and disables replay controls.
            </p>
          </li>
        </ol>
      </Section>
    </Page>
  );
}
