import { Avatar, type AvatarSize } from "../../components/Avatar";
import avatarSrc from "../../assets/avatar-arcana.svg";
import type { SpecimenItem } from "../types";
import styles from "./demo.module.css";

export function AvatarDemo() {
  return (
    <div className={styles.row}>
      <Avatar src={avatarSrc} initials="MN" label="Martin Novak" size="lg" />
      <Avatar initials="AL" label="Ana Lima" size="lg" />
      <Avatar initials="JK" label="Jae Kim" size="md" />
      <Avatar initials="RS" label="Rui Silva" size="sm" />
      <Avatar
        initials="MN"
        label="Open Martin Novak's profile"
        size="md"
        interactive
      />
    </div>
  );
}

const sizes: AvatarSize[] = ["xs", "sm", "md", "lg"];

export const avatarVariants: SpecimenItem[] = sizes.flatMap((size) => [
  {
    label: `Image / ${size}`,
    content: (
      <Avatar
        src={avatarSrc}
        initials="MN"
        label="Martin Novak"
        size={size}
      />
    ),
  },
  {
    label: `Initials / ${size}`,
    content: <Avatar initials="AL" label="Ana Lima" size={size} />,
  },
]);

export const avatarStates: SpecimenItem[] = [
  {
    label: "Image",
    content: <Avatar src={avatarSrc} initials="MN" label="Martin Novak" />,
  },
  {
    label: "Initials fallback",
    content: <Avatar initials="AL" label="Ana Lima" />,
  },
  {
    label: "Focus visible",
    content: (
      <Avatar
        initials="MN"
        label="Open Martin Novak's profile"
        interactive
        data-state="focus"
      />
    ),
  },
];
