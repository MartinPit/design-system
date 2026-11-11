import {
  forwardRef,
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import { cx } from "../../lib/cx";
import { Check } from "../../icons";
import type { FieldSize } from "../Field/Field";
import styles from "./Checkbox.module.css";

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  label: ReactNode;
  hint?: string;
  error?: string;
  size?: FieldSize;
  indeterminate?: boolean;
  /** Forces a visual state for the documentation state grid. */
  "data-state"?: "hover" | "focus";
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(
    {
      label,
      hint,
      error,
      size = "md",
      indeterminate = false,
      "data-state": dataState,
      id: idProp,
      className,
      ...rest
    },
    ref,
  ) {
    const autoId = useId();
    const id = idProp ?? autoId;
    const innerRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => innerRef.current as HTMLInputElement, []);

    useEffect(() => {
      if (innerRef.current) innerRef.current.indeterminate = indeterminate;
    }, [indeterminate]);

    const describedBy = error
      ? `${id}-error`
      : hint
        ? `${id}-hint`
        : undefined;

    return (
      <div className={cx(styles.wrap, className)} data-state={dataState}>
        <label className={styles.row} htmlFor={id}>
          <span className={styles.boxWrap}>
            <input
              ref={innerRef}
              id={id}
              type="checkbox"
              className={styles.input}
              aria-invalid={error ? true : undefined}
              aria-describedby={describedBy}
              {...rest}
            />
            <span
              className={cx(styles.box, styles[size])}
              data-indeterminate={indeterminate || undefined}
              aria-hidden="true"
            >
              {indeterminate ? (
                <span className={styles.dash} />
              ) : (
                <Check className={styles.check} />
              )}
            </span>
          </span>
          <span className={styles.text}>
            <span className={styles.label}>{label}</span>
            {hint && !error ? (
              <span id={`${id}-hint`} className={styles.hint}>
                {hint}
              </span>
            ) : null}
          </span>
        </label>
        {error ? (
          <p id={`${id}-error`} className={styles.error}>
            {error}
          </p>
        ) : null}
      </div>
    );
  },
);
