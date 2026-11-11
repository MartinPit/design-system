import type { SVGProps } from "react";

export function Flame(props: SVGProps<SVGSVGElement>) {
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
      <path d="M12 3c1 3-2 4-2 7 0 1.5 1 2.5 2 3 1-2 3-2.5 3-5 2 2 4 4.5 4 8a7 7 0 0 1-14 0c0-4 2-7 5-9" />
    </svg>
  );
}
