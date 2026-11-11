import type { SVGProps } from "react";

export function Shuffle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M3 7h4l10 10h4M3 17h4l10-10h4" />
      <path d="M18 4l3 3-3 3M18 14l3 3-3 3" />
    </svg>
  );
}
