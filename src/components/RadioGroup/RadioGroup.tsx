import {
  forwardRef,
  useId,
  type FieldsetHTMLAttributes,
  type ReactNode,
} from "react";
import { cx } from "../../lib/cx";
import { useControllableState } from "../../hooks/useControllableState";
import type { FieldSize } from "../Field/Field";
import styles from "./RadioGroup.module.css";

export interface RadioOption {
  value: string;
  label: ReactNode;
  hint?: string;
  disabled?: boolean;
}

export interface RadioGroupProps
  extends Omit<FieldsetHTMLAttributes<HTMLFieldSetElement>, "onChange"> {
  label: string;
  options: RadioOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  orientation?: "vertical" | "horizontal";
  size?: FieldSize;
  hint?: string;
  error?: string;
  /** Forces a visual state for the documentation state grid. */
  "data-state"?: "hover" | "focus";
}

export const RadioGroup = forwardRef<HTMLFieldSetElement, RadioGroupProps>(
  function RadioGroup(
    {
      label,
      options,
      value,
      defaultValue,
      onChange,
      orientation = "vertical",
      size = "md",
      hint,
      error,
      id: idProp,
      className,
      ...rest
    },
    ref,
  ) {
    const autoId = useId();
    const id = idProp ?? autoId;
    const name = rest.name ?? id;
    const [selected, setSelected] = useControllableState<string>({
      value,
      defaultValue: defaultValue ?? "",
      onChange,
    });
    const describedBy = error
      ? `${id}-error`
      : hint
        ? `${id}-hint`
        : undefined;

    return (
      <fieldset
        ref={ref}
        id={id}
        className={cx(styles.group, className)}
        aria-describedby={describedBy}
        aria-invalid={error ? true : undefined}
        {...rest}
      >
        <legend className={styles.legend}>{label}</legend>
        <div
          className={cx(
            styles.options,
            orientation === "horizontal" && styles.horizontal,
          )}
        >
          {options.map((option) => (
            <label
              key={option.value}
              className={cx(
                styles.row,
                option.disabled && styles.rowDisabled,
              )}
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={selected === option.value}
                disabled={option.disabled}
                className={styles.input}
                onChange={() => setSelected(option.value)}
              />
              <span
                className={cx(styles.dot, styles[size])}
                aria-hidden="true"
              />
              <span className={styles.text}>
                <span className={styles.label}>{option.label}</span>
                {option.hint ? (
                  <span className={styles.hint}>{option.hint}</span>
                ) : null}
              </span>
            </label>
          ))}
        </div>
        {error ? (
          <p id={`${id}-error`} className={styles.error}>
            {error}
          </p>
        ) : hint ? (
          <p id={`${id}-hint`} className={styles.hintText}>
            {hint}
          </p>
        ) : null}
      </fieldset>
    );
  },
);
