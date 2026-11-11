import { forwardRef, useEffect, useId, useState } from "react";
import type { ChangeEvent, CSSProperties, InputHTMLAttributes } from "react";
import { cx } from "../cx";
import type { PreviewState } from "../preview";
import fieldCss from "../field.module.css";
import styles from "./Slider.module.css";

export interface SliderProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label: string;
  hint?: string;
  showValue?: boolean;
  formatValue?: (value: number) => string;
  /** Docs-only: forces a contact state into a state grid. */
  preview?: PreviewState;
}

export const Slider = forwardRef<HTMLInputElement, SliderProps>(
  function Slider(
    {
      label,
      hint,
      showValue = true,
      formatValue,
      preview,
      value,
      defaultValue,
      min = 0,
      max = 100,
      onChange,
      id,
      className,
      ...rest
    },
    ref,
  ) {
    const generated = useId();
    const fieldId = id ?? generated;
    const hintId = hint ? `${fieldId}-hint` : undefined;
    const [current, setCurrent] = useState(() =>
      Number(value ?? defaultValue ?? min ?? 0),
    );

    useEffect(() => {
      if (value !== undefined) setCurrent(Number(value));
    }, [value]);

    const numericMin = Number(min);
    const numericMax = Number(max);
    const ratio =
      numericMax > numericMin
        ? ((current - numericMin) / (numericMax - numericMin)) * 100
        : 0;
    const fill = `${Math.min(100, Math.max(0, ratio))}%`;

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
      setCurrent(Number(event.target.value));
      onChange?.(event);
    }

    return (
      <div className={cx(fieldCss.field, className)}>
        <div className={styles.heading}>
          <label className={fieldCss.label} htmlFor={fieldId}>
            {label}
          </label>
          {showValue ? (
            <output className={styles.value} htmlFor={fieldId}>
              {formatValue ? formatValue(current) : current}
            </output>
          ) : null}
        </div>
        <div
          className={styles.trackWrap}
          style={{ "--fill": fill } as CSSProperties}
        >
          <input
            ref={ref}
            id={fieldId}
            type="range"
            data-preview={preview}
            className={styles.input}
            value={value}
            defaultValue={defaultValue}
            min={min}
            max={max}
            onChange={handleChange}
            aria-describedby={hintId}
            {...rest}
          />
        </div>
        {hint ? (
          <p className={fieldCss.hint} id={hintId}>
            {hint}
          </p>
        ) : null}
      </div>
    );
  },
);
