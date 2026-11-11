import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  type HTMLAttributes,
} from "react";
import { cx } from "../../lib/cx";
import styles from "./Avatar.module.css";

export type AvatarSize = "xs" | "sm" | "md" | "lg";

export interface AvatarProps
  extends Omit<HTMLAttributes<HTMLElement>, "children"> {
  src?: string;
  initials: string;
  label?: string;
  size?: AvatarSize;
  interactive?: boolean;
  "data-state"?: "focus";
}

export const Avatar = forwardRef<HTMLElement, AvatarProps>(function Avatar(
  {
    src,
    initials,
    label,
    size = "md",
    interactive = false,
    className,
    "data-state": dataState,
    ...rest
  },
  ref,
) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const node = useRef<HTMLElement | null>(null);
  useImperativeHandle(ref, () => node.current as HTMLElement);

  const showImage = Boolean(src) && failedSrc !== src;
  const baseName = label ?? initials;
  const name =
    interactive && !showImage && label ? `${initials} — ${label}` : baseName;
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
        ref={(element) => {
          node.current = element;
        }}
        type="button"
        className={cx(styles.avatar, styles[size], styles.interactive, className)}
        aria-label={name}
        data-state={dataState}
        {...rest}
      >
        {content}
      </button>
    );
  }

  return (
    <span
      ref={(element) => {
        node.current = element;
      }}
      className={cx(styles.avatar, styles[size], className)}
      role="img"
      aria-label={name}
      data-state={dataState}
      {...rest}
    >
      {content}
    </span>
  );
});
