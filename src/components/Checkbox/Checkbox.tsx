import { forwardRef, useCallback, useEffect, useId, useRef } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
import { cx } from "../cx";
import type { PreviewState } from "../preview";
import { Icon } from "../../icons/Icon";
import fieldCss from "../field.module.css";
import styles from "./Checkbox.module.css";

export type CheckboxSize = "sm" | "md";

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label: ReactNode;
  size?: CheckboxSize;
  indeterminate?: boolean;
  error?: string;
  hint?: string;
  /** Docs-only: forces a contact state into a state grid. */
  preview?: PreviewState;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(
    {
      label,
      size = "md",
      indeterminate = false,
      error,
      hint,
      preview,
      id,
      className,
      disabled,
      ...rest
    },
    ref,
  ) {
    const generated = useId();
    const fieldId = id ?? generated;
    const errorId = error ? `${fieldId}-error` : undefined;
    const hintId = hint ? `${fieldId}-hint` : undefined;
    const describedBy =
      [hintId, errorId].filter(Boolean).join(" ") || undefined;
    const innerRef = useRef<HTMLInputElement | null>(null);

    const setRef = useCallback(
      (node: HTMLInputElement | null) => {
        innerRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      },
      [ref],
    );

    useEffect(() => {
      if (innerRef.current) innerRef.current.indeterminate = indeterminate;
    }, [indeterminate]);

    return (
      <div className={cx(styles.root, className)}>
        <label
          className={cx(
            styles.row,
            styles[size],
            disabled && styles.disabled,
          )}
          htmlFor={fieldId}
        >
          <span className={styles.control}>
            <input
              ref={setRef}
              id={fieldId}
              type="checkbox"
              data-preview={preview}
              className={styles.input}
              disabled={disabled}
              aria-invalid={error ? true : undefined}
              aria-describedby={describedBy}
              {...rest}
            />
            <span className={styles.box} aria-hidden="true">
              <Icon
                name={indeterminate ? "minus" : "check"}
                size={14}
                className={styles.mark}
              />
            </span>
          </span>
          <span className={styles.text}>{label}</span>
        </label>
        {hint ? (
          <p className={cx(fieldCss.hint, styles.hint)} id={hintId}>
            {hint}
          </p>
        ) : null}
        {error ? (
          <p className={cx(fieldCss.error, styles.error)} id={errorId}>
            {error}
          </p>
        ) : null}
      </div>
    );
  },
);
