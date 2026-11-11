import { forwardRef, useId, type SelectHTMLAttributes } from "react";
import { cx } from "../../lib/cx";
import { ChevronDown } from "../../icons";
import { Field, fieldDescribedBy, type FieldSize } from "../Field/Field";
import fieldStyles from "../Field/Field.module.css";
import styles from "./Select.module.css";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  label: string;
  options: SelectOption[];
  placeholder?: string;
  hint?: string;
  error?: string;
  size?: FieldSize;
  hideLabel?: boolean;
  /** Forces a visual state for the documentation state grid. */
  "data-state"?: "hover" | "focus" | "open";
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  {
    label,
    options,
    placeholder,
    hint,
    error,
    size = "md",
    hideLabel,
    id: idProp,
    className,
    ...rest
  },
  ref,
) {
  const autoId = useId();
  const id = idProp ?? autoId;

  return (
    <Field
      id={id}
      label={label}
      hint={hint}
      error={error}
      hideLabel={hideLabel}
      required={rest.required}
      className={className}
    >
      <span className={styles.wrap}>
        <select
          ref={ref}
          id={id}
          className={cx(
            fieldStyles.control,
            fieldStyles[`control${size === "sm" ? "Sm" : "Md"}`],
            styles.select,
            error && fieldStyles.controlError,
          )}
          aria-invalid={error ? true : undefined}
          aria-describedby={fieldDescribedBy(id, hint, error)}
          {...rest}
        >
          {placeholder ? (
            <option value="" disabled>
              {placeholder}
            </option>
          ) : null}
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className={styles.chevron} />
      </span>
    </Field>
  );
});
