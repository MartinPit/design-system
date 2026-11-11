import type { ComponentType } from "react";

export interface PropRow {
  name: string;
  type: string;
  default: string;
  description: string;
}

export interface ComponentDoc {
  id: string;
  name: string;
  job: string;
  group: string;
  Demo: ComponentType;
  Variants: ComponentType;
  States: ComponentType;
  props: PropRow[];
  dos: string[];
  donts: string[];
  a11y: string;
}

export interface ComponentGroup {
  id: string;
  label: string;
  items: ComponentDoc[];
}
