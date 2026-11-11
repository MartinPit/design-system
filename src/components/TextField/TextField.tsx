import { forwardRef, useId, type InputHTMLAttributes } from "react";
import { cx } from "../../lib/cx";
import { Field, fieldDescribedBy, type FieldSize } from "../Field/Field";
import fieldStyles from "../Field/Field.module.css";
import styles from "./TextField.module.css";

export interface TextFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label: string;
  hint?: string;
  error?: string;
  size?: FieldSize;
  hideLabel?: boolean;
  /** Forces a visual state for the documentation state grid. */
  "data-state"?: "hover" | "focus";
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField(
    {
      label,
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
        <input
          ref={ref}
          id={id}
          className={cx(
            fieldStyles.control,
            fieldStyles[`control${size === "sm" ? "Sm" : "Md"}`],
            error && fieldStyles.controlError,
            styles.input,
          )}
          aria-invalid={error ? true : undefined}
          aria-describedby={fieldDescribedBy(id, hint, error)}
          {...rest}
        />
      </Field>
    );
  },
);
