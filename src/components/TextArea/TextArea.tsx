import {
  forwardRef,
  useId,
  type ChangeEvent,
  type TextareaHTMLAttributes,
} from "react";
import { cx } from "../../lib/cx";
import { useControllableState } from "../../hooks/useControllableState";
import { Field, fieldDescribedBy } from "../Field/Field";
import fieldStyles from "../Field/Field.module.css";
import styles from "./TextArea.module.css";

export interface TextAreaProps
  extends Omit<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    "value" | "defaultValue"
  > {
  label: string;
  hint?: string;
  error?: string;
  hideLabel?: boolean;
  showCounter?: boolean;
  value?: string;
  defaultValue?: string;
  /** Forces a visual state for the documentation state grid. */
  "data-state"?: "hover" | "focus";
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  function TextArea(
    {
      label,
      hint,
      error,
      hideLabel,
      showCounter,
      id: idProp,
      className,
      value,
      defaultValue,
      onChange,
      maxLength,
      rows = 4,
      ...rest
    },
    ref,
  ) {
    const autoId = useId();
    const id = idProp ?? autoId;
    const [text, setText] = useControllableState({
      value,
      defaultValue: defaultValue ?? "",
    });
    const counter = showCounter ?? maxLength !== undefined;

    function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
      setText(event.target.value);
      onChange?.(event);
    }

    return (
      <Field
        id={id}
        label={label}
        hint={hint}
        error={error}
        hideLabel={hideLabel}
        required={rest.required}
        className={className}
        aside={
          counter ? (
            <span className={styles.counter} aria-hidden="true">
              {text.length}
              {maxLength !== undefined ? ` / ${maxLength}` : ""}
            </span>
          ) : null
        }
      >
        <textarea
          ref={ref}
          id={id}
          rows={rows}
          maxLength={maxLength}
          value={text}
          onChange={handleChange}
          className={cx(
            fieldStyles.control,
            fieldStyles.controlMd,
            styles.textarea,
            error && fieldStyles.controlError,
          )}
          aria-invalid={error ? true : undefined}
          aria-describedby={fieldDescribedBy(id, hint, error)}
          {...rest}
        />
      </Field>
    );
  },
);
