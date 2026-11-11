import type { ReactNode } from "react";
import { Badge } from "../../components/Badge";
import { Card, type CardSize, type CardVariant } from "../../components/Card";
import { Link } from "../../components/Link";
import type { SpecimenItem } from "../types";
import styles from "./demo.module.css";

function CardContent({ compact = false }: { compact?: boolean }) {
  return (
    <>
      <span className={styles.metricLabel}>Kanji N3</span>
      <span className={styles.metric}>142 cards due</span>
      {compact ? null : (
        <div className={styles.cardMeta}>
          <Badge variant="warning" size="sm">
            12-day streak
          </Badge>
          <span>98% recall</span>
        </div>
      )}
      <Link href="#/components/progress" variant="standalone" size="sm">
        Study deck
      </Link>
    </>
  );
}

export function CardDemo() {
  return (
    <div className={styles.deckShelf}>
      <Card variant="interactive">
        <CardContent />
      </Card>
      <Card variant="raised">
        <span className={styles.metricLabel}>Spanish Verbs</span>
        <span className={styles.metric}>18 cards due</span>
        <div className={styles.cardMeta}>
          <Badge size="sm">98 cards</Badge>
          <span>Last studied 04 Nov 2026</span>
        </div>
        <Link href="#/components/table" variant="standalone" size="sm">
          Open history
        </Link>
      </Card>
    </div>
  );
}

const variants: CardVariant[] = ["flat", "raised", "interactive", "selected"];
const sizes: CardSize[] = ["sm", "md", "lg"];

export const cardVariants: SpecimenItem[] = variants.flatMap((variant) =>
  sizes.map((size): SpecimenItem => {
    const content: ReactNode = <CardContent compact={size === "sm"} />;
    return {
      label: `${variant} / ${size}`,
      content: (
        <Card variant={variant} size={size}>
          {content}
        </Card>
      ),
    };
  }),
);

export const cardStates: SpecimenItem[] = [
  {
    label: "Default",
    content: (
      <Card>
        <CardContent compact />
      </Card>
    ),
  },
  {
    label: "Hover",
    content: (
      <Card variant="interactive" data-state="hover">
        <CardContent compact />
      </Card>
    ),
  },
  {
    label: "Selected",
    content: (
      <Card variant="selected">
        <CardContent compact />
      </Card>
    ),
  },
  {
    label: "Focus visible",
    content: (
      <Card variant="interactive" data-state="focus">
        <CardContent compact />
      </Card>
    ),
  },
  {
    label: "Disabled",
    content: (
      <Card variant="interactive" disabled>
        <CardContent compact />
      </Card>
    ),
  },
];
