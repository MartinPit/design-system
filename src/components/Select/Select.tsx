import { forwardRef, useId } from "react";
import type { SelectHTMLAttributes } from "react";
import { cx } from "../cx";
import type { PreviewState } from "../preview";
import fieldCss from "../field.module.css";
import { Icon } from "../../icons/Icon";
import styles from "./Select.module.css";

export type SelectSize = "sm" | "md";

export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  label: string;
  hint?: string;
  error?: string;
  size?: SelectSize;
  /** Docs-only: forces a contact state into a state grid. */
  preview?: PreviewState;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select(
    { label, hint, error, size = "md", preview, id, className, children, ...rest },
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
        <div className={styles.wrap}>
          <select
            ref={ref}
            id={fieldId}
            data-preview={preview}
            className={cx(fieldCss.control, styles.select)}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy}
            {...rest}
          >
            {children}
          </select>
          <Icon name="chevron-down" size={18} className={styles.chevron} />
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
      </div>
    );
  },
);
