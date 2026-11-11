import { Button } from "../../components/Button";
import { IconButton } from "../../components/IconButton";
import { Tooltip, type TooltipSide } from "../../components/Tooltip";
import { Shuffle } from "../../icons";
import type { SpecimenItem } from "../types";
import styles from "./demo.module.css";

export function TooltipDemo() {
  return (
    <div className={styles.row}>
      <Tooltip label="Shuffle the deck">
        <IconButton aria-label="Shuffle deck">
          <Shuffle />
        </IconButton>
      </Tooltip>
      <Tooltip label="Search cards in this deck" side="bottom">
        <Button variant="secondary" size="sm">
          Search
        </Button>
      </Tooltip>
    </div>
  );
}

const sides: TooltipSide[] = ["top", "bottom", "left", "right"];

export const tooltipVariants: SpecimenItem[] = sides.map((side) => ({
  label: side,
  content: (
    <div className={styles.tooltipStage}>
      <Tooltip label={`${side} tooltip`} side={side} defaultOpen>
        <Button variant="secondary" size="sm">
          {side}
        </Button>
      </Tooltip>
    </div>
  ),
}));

export const tooltipStates: SpecimenItem[] = [
  {
    label: "Hidden",
    content: (
      <div className={styles.stack}>
        <Tooltip label="Shuffle the deck">
          <IconButton aria-label="Shuffle deck">
            <Shuffle />
          </IconButton>
        </Tooltip>
        <p className={styles.caption}>Hover or focus the trigger.</p>
      </div>
    ),
  },
  {
    label: "Visible",
    content: (
      <Tooltip label="Shuffle the deck" defaultOpen inline>
        <IconButton aria-label="Shuffle deck">
          <Shuffle />
        </IconButton>
      </Tooltip>
    ),
  },
  {
    label: "Focus triggered",
    content: (
      <Tooltip label="Shuffle the deck" defaultOpen inline>
        <Button variant="secondary" size="sm" data-state="focus">
          Focus trigger
        </Button>
      </Tooltip>
    ),
  },
];
