import {
  forwardRef,
  useId,
  type InputHTMLAttributes,
  type KeyboardEvent,
} from "react";
import { cx } from "../../lib/cx";
import { useControllableState } from "../../hooks/useControllableState";
import { Close, Search } from "../../icons";
import { Field, fieldDescribedBy, type FieldSize } from "../Field/Field";
import fieldStyles from "../Field/Field.module.css";
import styles from "./SearchField.module.css";

export interface SearchFieldProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "size" | "type" | "value" | "defaultValue" | "onChange"
  > {
  label: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onClear?: () => void;
  shortcut?: string;
  hint?: string;
  error?: string;
  size?: FieldSize;
  hideLabel?: boolean;
  /** Forces a visual state for the documentation state grid. */
  "data-state"?: "hover" | "focus";
}

export const SearchField = forwardRef<HTMLInputElement, SearchFieldProps>(
  function SearchField(
    {
      label,
      value,
      defaultValue = "",
      onChange,
      onClear,
      shortcut,
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
    const [query, setQuery] = useControllableState({
      value,
      defaultValue,
      onChange,
    });

    function clear() {
      setQuery("");
      onClear?.();
    }

    function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
      if (event.key === "Escape" && query !== "") {
        event.preventDefault();
        clear();
      }
    }

    return (
      <Field
        id={id}
        label={label}
        hint={hint}
        error={error}
        hideLabel={hideLabel}
        className={className}
      >
        <div className={styles.wrap}>
          <Search className={styles.icon} />
          <input
            ref={ref}
            id={id}
            type="search"
            className={cx(
              fieldStyles.control,
              fieldStyles[`control${size === "sm" ? "Sm" : "Md"}`],
              styles.input,
              error && fieldStyles.controlError,
            )}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={handleKeyDown}
            aria-invalid={error ? true : undefined}
            aria-describedby={fieldDescribedBy(id, hint, error)}
            {...rest}
          />
          {query !== "" ? (
            <button
              type="button"
              className={styles.clear}
              aria-label="Clear search"
              onClick={clear}
            >
              <Close />
            </button>
          ) : shortcut ? (
            <kbd className={styles.shortcut} aria-hidden="true">
              {shortcut}
            </kbd>
          ) : null}
        </div>
      </Field>
    );
  },
);
