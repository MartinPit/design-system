import { forwardRef, useId, useState } from "react";
import type { ChangeEvent, TextareaHTMLAttributes } from "react";
import { cx } from "../cx";
import type { PreviewState } from "../preview";
import fieldCss from "../field.module.css";
import styles from "./TextArea.module.css";

export interface TextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  hint?: string;
  error?: string;
  showCount?: boolean;
  /** Docs-only: forces a contact state into a state grid. */
  preview?: PreviewState;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  function TextArea(
    {
      label,
      hint,
      error,
      showCount = false,
      preview,
      maxLength,
      value,
      defaultValue,
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
    const errorId = error ? `${fieldId}-error` : undefined;
    const countId = showCount ? `${fieldId}-count` : undefined;
    const describedBy =
      [hintId, errorId, countId].filter(Boolean).join(" ") || undefined;

    const [count, setCount] = useState(
      () => String(value ?? defaultValue ?? "").length,
    );

    function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
      setCount(event.target.value.length);
      onChange?.(event);
    }

    return (
      <div
        className={cx(
          fieldCss.field,
          error && fieldCss.invalid,
          className,
        )}
      >
        <label className={fieldCss.label} htmlFor={fieldId}>
          {label}
        </label>
        <textarea
          ref={ref}
          id={fieldId}
          data-preview={preview}
          value={value}
          defaultValue={defaultValue}
          maxLength={maxLength}
          onChange={handleChange}
          className={cx(fieldCss.control, styles.textarea)}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          {...rest}
        />
        {hint || showCount ? (
          <div className={fieldCss.meta}>
            {hint ? (
              <p className={fieldCss.hint} id={hintId}>
                {hint}
              </p>
            ) : (
              <span />
            )}
            {showCount ? (
              <span id={countId}>
                {count}
                {maxLength ? ` / ${maxLength}` : ""}
              </span>
            ) : null}
          </div>
        ) : null}
        {error ? (
          <p className={fieldCss.error} id={errorId}>
            {error}
          </p>
        ) : null}
      </div>
    );
  },
);
