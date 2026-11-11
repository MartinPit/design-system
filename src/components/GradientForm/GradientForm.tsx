import { useId, type SVGProps } from "react";

export function GradientForm(props: SVGProps<SVGSVGElement>) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const linear = `grad-linear-${uid}`;
  const bloom = `grad-bloom-${uid}`;
  const path =
    "M0 0H30C56 0 84 8 96 30C100 47 90 61 72 68C51 76 30 79 16 74C8 71 3 67 0 61Z";

  return (
    <svg
      viewBox="0 0 100 80"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <defs>
        <linearGradient id={linear} x1="0" y1="0" x2="0.914" y2="0.407">
          <stop offset="0" stopColor="var(--grad-amber)" />
          <stop offset="0.28" stopColor="var(--grad-orange)" />
          <stop offset="0.55" stopColor="var(--grad-magenta)" />
          <stop offset="1" stopColor="var(--grad-crimson)" />
        </linearGradient>
        <radialGradient id={bloom} cx="14%" cy="86%" r="72%">
          <stop offset="0" stopColor="var(--grad-violet)" stopOpacity="0.92" />
          <stop
            offset="0.55"
            stopColor="var(--grad-magenta)"
            stopOpacity="0.55"
          />
          <stop offset="1" stopColor="var(--grad-magenta)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <path d={path} fill={`url(#${linear})`} />
      <path d={path} fill={`url(#${bloom})`} />
    </svg>
  );
}
