import { forwardRef, useId } from "react";
import type { InputHTMLAttributes } from "react";
import { cx } from "../cx";
import type { PreviewState } from "../preview";
import fieldCss from "../field.module.css";
import styles from "./TextField.module.css";

export type TextFieldSize = "sm" | "md";

export interface TextFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label: string;
  hint?: string;
  error?: string;
  size?: TextFieldSize;
  /** Docs-only: forces a contact state into a state grid. */
  preview?: PreviewState;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField(
    { label, hint, error, size = "md", preview, id, className, ...rest },
    ref,
  ) {
    const generated = useId();
    const fieldId = id ?? generated;
    const hintId = hint ? `${fieldId}-hint` : undefined;
    const errorId = error ? `${fieldId}-error` : undefined;
    const describedBy =
      [hintId, errorId].filter(Boolean).join(" ") || undefined;

    return (
      <div
        className={cx(
          fieldCss.field,
          fieldCss[size],
          error && fieldCss.invalid,
          className,
        )}
      >
        <label className={fieldCss.label} htmlFor={fieldId}>
          {label}
        </label>
        <input
          ref={ref}
          id={fieldId}
          data-preview={preview}
          className={cx(fieldCss.control, styles.input)}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          {...rest}
        />
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
      </div>
    );
  },
);
