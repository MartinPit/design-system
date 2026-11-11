import {
  forwardRef,
  useId,
  type InputHTMLAttributes,
} from "react";
import { cx } from "../../lib/cx";
import { useControllableState } from "../../hooks/useControllableState";
import styles from "./Slider.module.css";

export interface SliderProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "size" | "type" | "value" | "defaultValue" | "onChange"
  > {
  label: string;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  formatValue?: (value: number) => string;
  hint?: string;
  hideLabel?: boolean;
  /** Forces a visual state for the documentation state grid. */
  "data-state"?: "hover" | "focus" | "dragging";
}

export const Slider = forwardRef<HTMLInputElement, SliderProps>(
  function Slider(
    {
      label,
      value,
      defaultValue = 0,
      onChange,
      formatValue = String,
      hint,
      hideLabel,
      "data-state": dataState,
      id: idProp,
      className,
      min = 0,
      max = 100,
      step = 1,
      disabled,
      ...rest
    },
    ref,
  ) {
    const autoId = useId();
    const id = idProp ?? autoId;
    const [current, setCurrent] = useControllableState({
      value,
      defaultValue,
      onChange,
    });

    return (
      <div className={cx(styles.wrap, className)}>
        <div className={styles.head}>
          <label
            htmlFor={id}
            className={cx(styles.label, hideLabel && styles.labelHidden)}
          >
            {label}
          </label>
          <output htmlFor={id} className={styles.output}>
            {formatValue(current)}
          </output>
        </div>
        <input
          ref={ref}
          id={id}
          type="range"
          className={styles.input}
          data-state={dataState}
          min={min}
          max={max}
          step={step}
          value={current}
          disabled={disabled}
          aria-describedby={hint ? `${id}-hint` : undefined}
          onChange={(event) => setCurrent(Number(event.target.value))}
          {...rest}
        />
        {hint ? (
          <p id={`${id}-hint`} className={styles.hint}>
            {hint}
          </p>
        ) : null}
      </div>
    );
  },
);
