import { forwardRef, useEffect, useId, useRef, useState } from "react";
import type { ChangeEvent, InputHTMLAttributes } from "react";
import { cx } from "../cx";
import type { PreviewState } from "../preview";
import { Icon } from "../../icons/Icon";
import fieldCss from "../field.module.css";
import styles from "./SearchField.module.css";

export interface SearchFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label: string;
  hint?: string;
  shortcut?: string;
  onClear?: () => void;
  /** Docs-only: forces a contact state into a state grid. */
  preview?: PreviewState;
}

export const SearchField = forwardRef<HTMLInputElement, SearchFieldProps>(
  function SearchField(
    {
      label,
      hint,
      shortcut,
      onClear,
      preview,
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
    const innerRef = useRef<HTMLInputElement | null>(null);
    const [query, setQuery] = useState(() => String(value ?? defaultValue ?? ""));

    useEffect(() => {
      if (value !== undefined) setQuery(String(value));
    }, [value]);

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
      setQuery(event.target.value);
      onChange?.(event);
    }

    function clear() {
      setQuery("");
      onClear?.();
      innerRef.current?.focus();
    }

    return (
      <div className={cx(fieldCss.field, className)}>
        <label className={fieldCss.label} htmlFor={fieldId}>
          {label}
        </label>
        <div className={styles.shell}>
          <Icon name="search" size={18} className={styles.searchIcon} />
          <input
            ref={(node) => {
              innerRef.current = node;
              if (typeof ref === "function") ref(node);
              else if (ref) ref.current = node;
            }}
            id={fieldId}
            type="search"
            data-preview={preview}
            value={value ?? query}
            onChange={handleChange}
            className={styles.input}
            aria-describedby={hintId}
            {...rest}
          />
          {query ? (
            <button
              type="button"
              className={styles.clear}
              aria-label="Clear search"
              onClick={clear}
            >
              <Icon name="close" size={15} />
            </button>
          ) : null}
          {shortcut ? <kbd className={styles.shortcut}>{shortcut}</kbd> : null}
        </div>
        {hint ? (
          <p className={fieldCss.hint} id={hintId}>
            {hint}
          </p>
        ) : null}
      </div>
    );
  },
);
