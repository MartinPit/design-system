import { IconButton } from "../../components/IconButton";
import { Tooltip } from "../../components/Tooltip";
import { Button } from "../../components/Button";
import { Specimen, SpecimenGrid, State, StateGrid } from "../specimen";
import styles from "./demo.module.css";

export function Demo() {
  return (
    <div className={styles.stack}>
      <div className={styles.tooltipRow}>
        <Tooltip label="Shuffle the deck">
          <IconButton label="Shuffle deck" icon="shuffle" variant="solid" />
        </Tooltip>
        <Tooltip label="Mute the pronunciation" placement="bottom">
          <IconButton label="Mute audio" icon="moon" variant="solid" />
        </Tooltip>
        <Tooltip label="Filter by due cards" placement="right">
          <Button variant="secondary" size="sm">
            Filters
          </Button>
        </Tooltip>
      </div>
      <p className={styles.inlineNote}>
        Hover or focus a trigger. Escape dismisses the tooltip without moving
        focus.
      </p>
    </div>
  );
}

const centered = {
  display: "flex",
  justifyContent: "center",
  width: "100%",
  paddingBlock: "3rem 1rem",
} as const;

export function Variants() {
  return (
    <SpecimenGrid columns={2}>
      <Specimen label="Top" wide>
        <div style={centered}>
          <Tooltip label="Shuffle the deck" defaultOpen>
            <button type="button" className={styles.tooltipTrigger}>
              Shuffle
            </button>
          </Tooltip>
        </div>
      </Specimen>
      <Specimen label="Bottom" wide>
        <div style={centered}>
          <Tooltip
            label="Mute the pronunciation"
            placement="bottom"
            defaultOpen
          >
            <button type="button" className={styles.tooltipTrigger}>
              Mute
            </button>
          </Tooltip>
        </div>
      </Specimen>
      <Specimen label="Left" wide>
        <div style={centered}>
          <Tooltip label="Back to the deck" placement="left" defaultOpen>
            <button type="button" className={styles.tooltipTrigger}>
              Back
            </button>
          </Tooltip>
        </div>
      </Specimen>
      <Specimen label="Right" wide>
        <div style={centered}>
          <Tooltip label="Open the filters" placement="right" defaultOpen>
            <button type="button" className={styles.tooltipTrigger}>
              Filters
            </button>
          </Tooltip>
        </div>
      </Specimen>
    </SpecimenGrid>
  );
}

export function States() {
  return (
    <StateGrid>
      <State label="Hidden">
        <div style={centered}>
          <Tooltip label="Shuffle the deck">
            <button type="button" className={styles.tooltipTrigger}>
              Shuffle
            </button>
          </Tooltip>
        </div>
      </State>
      <State label="Visible">
        <div style={centered}>
          <Tooltip label="Shuffle the deck" placement="bottom" defaultOpen>
            <button type="button" className={styles.tooltipTrigger}>
              Shuffle
            </button>
          </Tooltip>
        </div>
      </State>
      <State label="Focus-triggered">
        <div style={centered}>
          <Tooltip label="Shuffle the deck" placement="bottom" defaultOpen>
            <button type="button" className={styles.tooltipTrigger}>
              Shuffle
            </button>
          </Tooltip>
        </div>
      </State>
    </StateGrid>
  );
}
