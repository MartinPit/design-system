import { forwardRef, useId } from "react";
import type {
  ChangeEvent,
  FieldsetHTMLAttributes,
  ReactNode,
} from "react";
import { cx } from "../cx";
import fieldCss from "../field.module.css";
import styles from "./RadioGroup.module.css";

export type RadioGroupOrientation = "vertical" | "horizontal";
export type RadioGroupSize = "sm" | "md";

export interface RadioOption {
  value: string;
  label: ReactNode;
  disabled?: boolean;
}

export interface RadioGroupProps
  extends Omit<FieldsetHTMLAttributes<HTMLFieldSetElement>, "onChange" | "name"> {
  legend: string;
  name: string;
  options: RadioOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  orientation?: RadioGroupOrientation;
  size?: RadioGroupSize;
  error?: string;
  hint?: string;
  disabled?: boolean;
  /** Docs-only: forces one contact state into a state grid. */
  preview?: "hover" | "focus";
}

export const RadioGroup = forwardRef<HTMLFieldSetElement, RadioGroupProps>(
  function RadioGroup(
    {
      legend,
      name,
      options,
      value,
      defaultValue,
      onValueChange,
      orientation = "vertical",
      size = "md",
      error,
      hint,
      disabled = false,
      className,
      id,
      preview,
      ...rest
    },
    ref,
  ) {
    const generated = useId();
    const groupId = id ?? generated;
    const errorId = error ? `${groupId}-error` : undefined;
    const hintId = hint ? `${groupId}-hint` : undefined;
    const describedBy =
      [hintId, errorId].filter(Boolean).join(" ") || undefined;

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
      onValueChange?.(event.target.value);
    }

    return (
      <fieldset
        ref={ref}
        className={cx(
          styles.group,
          fieldCss.field,
          error && fieldCss.invalid,
          className,
        )}
        aria-describedby={describedBy}
        aria-invalid={error ? true : undefined}
        disabled={disabled}
        {...rest}
      >
        <legend className={cx(fieldCss.label, styles.legend)}>{legend}</legend>
        <div
          className={cx(
            styles.options,
            orientation === "horizontal" && styles.horizontal,
            styles[size],
          )}
        >
          {options.map((option, index) => (
            <label
              key={option.value}
              className={cx(
                styles.option,
                (disabled || option.disabled) && styles.disabled,
              )}
              data-preview={
                preview && index === 0 ? preview : undefined
              }
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                className={styles.input}
                checked={value !== undefined ? value === option.value : undefined}
                defaultChecked={
                  value === undefined ? defaultValue === option.value : undefined
                }
                onChange={handleChange}
                disabled={disabled || option.disabled}
              />
              <span className={styles.dot} aria-hidden="true" />
              <span className={styles.text}>{option.label}</span>
            </label>
          ))}
        </div>
        {hint ? (
          <p className={fieldCss.hint} id={hintId}>
            {hint}
          </p>
        ) : null}
        {error ? (
          <p className={fieldCss.error} id={errorId}>
            {error}
          </p>
        ) : null}
      </fieldset>
    );
  },
);
