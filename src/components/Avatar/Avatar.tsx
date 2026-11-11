import { useState } from "react";
import { cx } from "../cx";
import styles from "./Avatar.module.css";

export type AvatarSize = "xs" | "sm" | "md" | "lg";

export interface AvatarProps {
  name: string;
  src?: string;
  size?: AvatarSize;
  interactive?: boolean;
  onClick?: () => void;
  /** Docs-only: forces a contact state into a state grid. */
  preview?: "hover" | "focus";
  className?: string;
}

function initials(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "?";
  if (words.length === 1) return words[0]!.slice(0, 2).toUpperCase();
  return `${words[0]![0] ?? ""}${words[words.length - 1]![0] ?? ""}`.toUpperCase();
}

export function Avatar({
  name,
  src,
  size = "md",
  interactive = false,
  onClick,
  preview,
  className,
}: AvatarProps) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(src) && !failed;

  const content = showImage ? (
    <img
      className={styles.image}
      src={src}
      alt={interactive ? "" : name}
      onError={() => setFailed(true)}
    />
  ) : (
    <span className={styles.initials}>
      {initials(name)}
    </span>
  );

  if (interactive) {
    return (
      <button
        type="button"
        className={cx(styles.root, styles[size], styles.interactive, className)}
        aria-label={showImage ? name : undefined}
        data-preview={preview}
        onClick={onClick}
      >
        {content}
        {showImage ? null : <span className="sr-only">{name}</span>}
      </button>
    );
  }

  return (
    <span
      className={cx(styles.root, styles[size], className)}
      role={showImage ? undefined : "img"}
      aria-label={showImage ? undefined : name}
    >
      {content}
    </span>
  );
}
