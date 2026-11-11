import type { ReactNode, SVGProps } from "react";

export type IconName =
  | "search"
  | "close"
  | "chevron-down"
  | "chevron-right"
  | "check"
  | "minus"
  | "arrow-right"
  | "arrow-up-right"
  | "shuffle"
  | "play"
  | "menu"
  | "moon"
  | "sun"
  | "sparkle"
  | "filter"
  | "keyboard"
  | "copy"
  | "layers";

const paths: Record<IconName, ReactNode> = {
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m16.5 16.5 4.5 4.5" />
    </>
  ),
  close: (
    <>
      <path d="m6 6 12 12" />
      <path d="M18 6 6 18" />
    </>
  ),
  "chevron-down": <path d="m6 9 6 6 6-6" />,
  "chevron-right": <path d="m9 6 6 6-6 6" />,
  check: <path d="m5 12.5 5 5L19 7" />,
  minus: <path d="M6 12h12" />,
  "arrow-right": (
    <>
      <path d="M4 12h16" />
      <path d="m14 6 6 6-6 6" />
    </>
  ),
  "arrow-up-right": (
    <>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </>
  ),
  shuffle: (
    <>
      <path d="M3 7h3.5c2.5 0 4 2 5.5 5s3 5 5.5 5H21" />
      <path d="M3 17h3.5c1.2 0 2.2-.5 3-1.4" />
      <path d="M14 8.4c.8-.9 1.8-1.4 3-1.4h4" />
      <path d="m18 4 3 3-3 3" />
      <path d="m18 14 3 3-3 3" />
    </>
  ),
  play: <path d="M8 5.5v13l11-6.5-11-6.5Z" />,
  menu: (
    <>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </>
  ),
  moon: <path d="M20 14.5A8.2 8.2 0 0 1 9.5 4a8.3 8.3 0 1 0 10.5 10.5Z" />,
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </>
  ),
  sparkle: (
    <>
      <path d="M12 3.5 13.8 9l5.7 1.8-5.7 1.8L12 18.2l-1.8-5.6L4.5 10.8 10.2 9 12 3.5Z" />
      <path d="M19 16.5v3M17.5 18h3" />
    </>
  ),
  filter: <path d="M4 6h16l-6.2 7.2V19l-3.6 2v-7.8L4 6Z" />,
  keyboard: (
    <>
      <rect x="3" y="7" width="18" height="11" rx="2" />
      <path d="M7 11h.01M11 11h.01M15 11h.01M18 11h.01M8 14.5h8" />
    </>
  ),
  copy: (
    <>
      <rect x="8" y="8" width="12" height="12" rx="2" />
      <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
    </>
  ),
  layers: (
    <>
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3 13 9 5 9-5" />
    </>
  ),
};

export interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number;
  /** Provide only when the icon carries meaning on its own. */
  label?: string;
}

export const iconNames = Object.keys(paths) as IconName[];

export function Icon({ name, size = 24, label, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
      {...rest}
    >
      {paths[name]}
    </svg>
  );
}
