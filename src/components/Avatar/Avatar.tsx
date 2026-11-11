import { useState } from "react";
import { cx } from "../../lib/cx";
import styles from "./Avatar.module.css";

export type AvatarSize = "xs" | "sm" | "md" | "lg";

export interface AvatarProps {
  src?: string;
  initials: string;
  label?: string;
  size?: AvatarSize;
  interactive?: boolean;
  onClick?: () => void;
  className?: string;
  "data-state"?: "focus";
}

export function Avatar({
  src,
  initials,
  label,
  size = "md",
  interactive = false,
  onClick,
  className,
  "data-state": dataState,
}: AvatarProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const showImage = Boolean(src) && failedSrc !== src;
  const baseName = label ?? initials;
  const name = interactive && !showImage ? `${initials} — ${baseName}` : baseName;
  const content = (
    <>
      {showImage ? (
        <img
          src={src}
          alt=""
          className={styles.image}
          onError={() => setFailedSrc(src ?? null)}
        />
      ) : (
        <span className={styles.initials} aria-hidden="true">
          {initials}
        </span>
      )}
    </>
  );

  if (interactive) {
    return (
      <button
        type="button"
        className={cx(styles.avatar, styles[size], styles.interactive, className)}
        aria-label={name}
        data-state={dataState}
        onClick={onClick}
      >
        {content}
      </button>
    );
  }

  return (
    <span
      className={cx(styles.avatar, styles[size], className)}
      role="img"
      aria-label={name}
      data-state={dataState}
    >
      {content}
    </span>
  );
}
