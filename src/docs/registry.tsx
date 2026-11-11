import type { ComponentType } from "react";
import type { PropRow } from "./ui";
import type { SpecimenItem } from "./types";
import {
  ButtonDemo,
  buttonStates,
  buttonVariants,
} from "./demos/ButtonDemo";
import {
  IconButtonDemo,
  iconButtonStates,
  iconButtonVariants,
} from "./demos/IconButtonDemo";
import {
  LinkDemo,
  linkStates,
  linkVariants,
} from "./demos/LinkDemo";
import {
  TextFieldDemo,
  textFieldStates,
  textFieldVariants,
} from "./demos/TextFieldDemo";
import {
  TextAreaDemo,
  textAreaStates,
  textAreaVariants,
} from "./demos/TextAreaDemo";
import {
  SelectDemo,
  selectStates,
  selectVariants,
} from "./demos/SelectDemo";
import {
  CheckboxDemo,
  checkboxStates,
  checkboxVariants,
} from "./demos/CheckboxDemo";
import {
  RadioGroupDemo,
  radioStates,
  radioVariants,
} from "./demos/RadioGroupDemo";
import {
  SwitchDemo,
  switchStates,
  switchVariants,
} from "./demos/SwitchDemo";
import {
  SliderDemo,
  sliderStates,
  sliderVariants,
} from "./demos/SliderDemo";
import {
  SearchFieldDemo,
  searchFieldStates,
  searchFieldVariants,
} from "./demos/SearchFieldDemo";
import {
  SegmentedControlDemo,
  segmentedStates,
  segmentedVariants,
} from "./demos/SegmentedControlDemo";
import {
  TabsDemo,
  tabsStates,
  tabsVariants,
} from "./demos/TabsDemo";

export type ComponentGroupName = "Actions" | "Forms" | "Navigation";

export interface ComponentSpec {
  id: string;
  name: string;
  job: string;
  group: ComponentGroupName;
  Demo: ComponentType;
  variants: SpecimenItem[];
  states: SpecimenItem[];
  props: PropRow[];
  dos: string[];
  donts: string[];
  a11y: string;
}

export const components: ComponentSpec[] = [
  {
    id: "button",
    name: "Button",
    job: "Commit an action: start a session, save a card, delete a deck.",
    group: "Actions",
    Demo: ButtonDemo,
    variants: buttonVariants,
    states: buttonStates,
    props: [
      {
        name: "variant",
        type: '"primary" | "secondary" | "ghost" | "danger"',
        defaultValue: '"primary"',
        description: "Visual weight. Danger is reserved for destructive actions.",
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        defaultValue: '"md"',
        description: "Control height and horizontal padding.",
      },
      {
        name: "loading",
        type: "boolean",
        defaultValue: "false",
        description: "Shows the tick spinner, sets aria-busy and disables the control.",
      },
      {
        name: "disabled",
        type: "boolean",
        defaultValue: "false",
        description: "Native disabled state. Also blocks the click handler.",
      },
      {
        name: "type",
        type: '"button" | "submit" | "reset"',
        defaultValue: '"button"',
        description: "Defaults to button so a specimen never submits a form.",
      },
      {
        name: "...rest",
        type: "ButtonHTMLAttributes",
        defaultValue: "—",
        description: "Native attributes and a forwarded ref reach the button.",
      },
    ],
    dos: [
      "Use one primary button per decision point: Start session, Save card.",
      "Keep the label constant while loading; the spinner and aria-busy carry the change.",
    ],
    donts: [
      "Do not use a Button for navigation; use Link so the browser keeps its affordances.",
      "Do not stack primary, secondary and danger at equal weight — one action leads.",
    ],
    a11y:
      "Loading sets aria-busy and disables the control while keeping its label, so the action's name does not change mid-request. The focus ring is a 2px ink outline with a 2px offset.",
  },
  {
    id: "icon-button",
    name: "IconButton",
    job: "A compact action: shuffle a deck, add a card, search, close.",
    group: "Actions",
    Demo: IconButtonDemo,
    variants: iconButtonVariants,
    states: iconButtonStates,
    props: [
      {
        name: "variant",
        type: '"solid" | "ghost"',
        defaultValue: '"solid"',
        description: "Solid for the primary tool, ghost for the surrounding tools.",
      },
      {
        name: "size",
        type: '"sm" | "md"',
        defaultValue: '"md"',
        description: "30px or 38px square target.",
      },
      {
        name: "aria-label",
        type: "string",
        defaultValue: "required",
        description: "Required. The icon is aria-hidden and carries no name.",
      },
      {
        name: "...rest",
        type: "ButtonHTMLAttributes",
        defaultValue: "—",
        description: "Native attributes and a forwarded ref reach the button.",
      },
    ],
    dos: [
      "Name the action, not the glyph: Shuffle deck, not Shuffle icon.",
      "Use the ghost variant when several compact tools sit in a row.",
    ],
    donts: [
      "Do not ship an icon-only control without an accessible name.",
      "Do not use an IconButton where a labelled Button fits; icons alone demand recall.",
    ],
    a11y:
      "aria-label is required by the type signature, and every icon is aria-hidden. The target is at least 30px square, above the 24px WCAG 2.2 minimum.",
  },
  {
    id: "link",
    name: "Link",
    job: "Navigate away: back to the design index or across the documentation.",
    group: "Actions",
    Demo: LinkDemo,
    variants: linkVariants,
    states: linkStates,
    props: [
      {
        name: "variant",
        type: '"inline" | "standalone"',
        defaultValue: '"inline"',
        description: "Inline sits in prose; standalone is an uppercase label link.",
      },
      {
        name: "size",
        type: '"inherit" | "sm"',
        defaultValue: '"inherit"',
        description: "Inherit the surrounding text size, or step down one size.",
      },
      {
        name: "disabled",
        type: "boolean",
        defaultValue: "false",
        description: "Drops href, sets aria-disabled and leaves the tab order.",
      },
      {
        name: "href",
        type: "string",
        defaultValue: "—",
        description: "Native anchor destination. Omit for a disabled link.",
      },
    ],
    dos: [
      "Write the destination into the sentence: read the colour foundation.",
      "Use the standalone variant for a single onward route at the end of a section.",
    ],
    donts: [
      "Do not open navigation in a new tab without saying so.",
      "Do not use a Link to submit or delete; use Button.",
    ],
    a11y:
      "A disabled link has no href, keeps aria-disabled and is removed from the tab order. Visited links shift to text-safe violet rather than the decorative gradient magenta.",
  },
  {
    id: "text-field",
    name: "TextField",
    job: "Enter a deck name or another short card field.",
    group: "Forms",
    Demo: TextFieldDemo,
    variants: textFieldVariants,
    states: textFieldStates,
    props: [
      {
        name: "label",
        type: "string",
        defaultValue: "required",
        description: "Visible uppercase label and accessible name.",
      },
      {
        name: "hint",
        type: "string",
        defaultValue: "—",
        description: "Supporting text, wired through aria-describedby.",
      },
      {
        name: "error",
        type: "string",
        defaultValue: "—",
        description: "Replaces the hint, sets aria-invalid and colours the border.",
      },
      {
        name: "size",
        type: '"sm" | "md"',
        defaultValue: '"md"',
        description: "Control height and type size.",
      },
      {
        name: "hideLabel",
        type: "boolean",
        defaultValue: "false",
        description: "Visually hides the label while keeping it for assistive technology.",
      },
      {
        name: "...rest",
        type: "InputHTMLAttributes",
        defaultValue: "—",
        description: "Native input attributes and a forwarded ref reach the input.",
      },
    ],
    dos: [
      "Keep the label short and noun-like: Deck name, Answer, Language.",
      "Show an error beside the field and keep the value so it can be corrected.",
    ],
    donts: [
      "Do not use placeholder text as the only label; it disappears while typing.",
      "Do not show a hint and an error at the same time; the error replaces the hint.",
    ],
    a11y:
      "The visible label is the accessible name and stays bound with htmlFor. Hint and error text are connected with aria-describedby; an error also sets aria-invalid.",
  },
  {
    id: "text-area",
    name: "TextArea",
    job: "Write a card's answer or a longer deck description.",
    group: "Forms",
    Demo: TextAreaDemo,
    variants: textAreaVariants,
    states: textAreaStates,
    props: [
      {
        name: "label",
        type: "string",
        defaultValue: "required",
        description: "Visible uppercase label and accessible name.",
      },
      {
        name: "maxLength",
        type: "number",
        defaultValue: "—",
        description: "Native limit; also switches the counter on.",
      },
      {
        name: "showCounter",
        type: "boolean",
        defaultValue: "maxLength !== undefined",
        description: "Shows the counted characters in the label row.",
      },
      {
        name: "rows",
        type: "number",
        defaultValue: "4",
        description: "Initial visible line count.",
      },
      {
        name: "hint",
        type: "string",
        defaultValue: "—",
        description: "Supporting text, replaced by the error when present.",
      },
      {
        name: "error",
        type: "string",
        defaultValue: "—",
        description: "Sets aria-invalid and renders error text.",
      },
      {
        name: "...rest",
        type: "TextareaHTMLAttributes",
        defaultValue: "—",
        description: "Native attributes and a forwarded ref reach the textarea.",
      },
    ],
    dos: [
      "Reserve TextArea for answers and notes; use TextField for a deck name.",
      "Keep the counter quiet and monospaced so it does not compete with the answer.",
    ],
    donts: [
      "Do not impose a character limit without showing the count before the limit is hit.",
      "Do not let the field resize horizontally and break the catalogue column.",
    ],
    a11y:
      "The counter is aria-hidden decoration; maxLength is the enforcement and the value stays on the textarea. Label, hint and error follow the same describedby rules as TextField.",
  },
  {
    id: "select",
    name: "Select",
    job: "Choose a deck, language, or sort order.",
    group: "Forms",
    Demo: SelectDemo,
    variants: selectVariants,
    states: selectStates,
    props: [
      {
        name: "label",
        type: "string",
        defaultValue: "required",
        description: "Visible uppercase label and accessible name.",
      },
      {
        name: "options",
        type: "{ value: string; label: string; disabled?: boolean }[]",
        defaultValue: "required",
        description: "The choices, rendered as native option elements.",
      },
      {
        name: "placeholder",
        type: "string",
        defaultValue: "—",
        description: "A disabled empty option shown before a choice is made.",
      },
      {
        name: "size",
        type: '"sm" | "md"',
        defaultValue: '"md"',
        description: "Control height and type size.",
      },
      {
        name: "error",
        type: "string",
        defaultValue: "—",
        description: "Sets aria-invalid and renders error text.",
      },
      {
        name: "...rest",
        type: "SelectHTMLAttributes",
        defaultValue: "—",
        description: "Native attributes and a forwarded ref reach the select.",
      },
    ],
    dos: [
      "Keep the list short and ordered by use: recent decks first.",
      "Show a placeholder only when no default deck is sensible.",
    ],
    donts: [
      "Do not rebuild the menu as a custom popover; native select keeps the platform behaviour.",
      "Do not use a select for two mutually exclusive views; SegmentedControl is faster.",
    ],
    a11y:
      "The component keeps the native select element, so the platform owns the open state and type-ahead. Label and error are wired, and the chevron is aria-hidden.",
  },
  {
    id: "checkbox",
    name: "Checkbox",
    job: "Toggle a filter or select rows in a list.",
    group: "Forms",
    Demo: CheckboxDemo,
    variants: checkboxVariants,
    states: checkboxStates,
    props: [
      {
        name: "label",
        type: "ReactNode",
        defaultValue: "required",
        description: "Visible label; clicking it toggles the native input.",
      },
      {
        name: "indeterminate",
        type: "boolean",
        defaultValue: "false",
        description: "Draws the mixed state with a dash.",
      },
      {
        name: "size",
        type: '"sm" | "md"',
        defaultValue: '"md"',
        description: "16px or 20px box.",
      },
      {
        name: "hint",
        type: "string",
        defaultValue: "—",
        description: "Supporting text under the label.",
      },
      {
        name: "error",
        type: "string",
        defaultValue: "—",
        description: "Sets the invalid border and describes the error.",
      },
      {
        name: "...rest",
        type: "InputHTMLAttributes",
        defaultValue: "—",
        description: "checked, defaultChecked and other native props pass through.",
      },
    ],
    dos: [
      "Use a checkbox when several filters can be true at once.",
      "Use indeterminate for a parent filter whose children are partly selected.",
    ],
    donts: [
      "Do not use a checkbox for an immediate setting that saves on change; use Switch.",
      "Do not use a checkbox where exactly one choice is allowed; use RadioGroup.",
    ],
    a11y:
      "The native input stays in the tab order and the drawn box is aria-hidden. indeterminate is applied to the input property, so assistive technology reports the mixed state.",
  },
  {
    id: "radio-group",
    name: "RadioGroup",
    job: "Pick one study mode from a short set.",
    group: "Forms",
    Demo: RadioGroupDemo,
    variants: radioVariants,
    states: radioStates,
    props: [
      {
        name: "label",
        type: "string",
        defaultValue: "required",
        description: "Rendered as the fieldset legend.",
      },
      {
        name: "options",
        type: "{ value; label; hint?; disabled? }[]",
        defaultValue: "required",
        description: "One choice per option, with an optional hint.",
      },
      {
        name: "value / defaultValue",
        type: "string",
        defaultValue: '""',
        description: "Controlled or uncontrolled selection.",
      },
      {
        name: "onChange",
        type: "(value: string) => void",
        defaultValue: "—",
        description: "Called with the selected value.",
      },
      {
        name: "orientation",
        type: '"vertical" | "horizontal"',
        defaultValue: '"vertical"',
        description: "Stack the choices or let them wrap in a row.",
      },
      {
        name: "size",
        type: '"sm" | "md"',
        defaultValue: '"md"',
        description: "16px or 20px marker.",
      },
      {
        name: "error",
        type: "string",
        defaultValue: "—",
        description: "Sets aria-invalid on the group and renders error text.",
      },
    ],
    dos: [
      "Keep the set short and visible; four modes is already a lot.",
      "Give a mode a hint when its effect on scheduling is not obvious.",
    ],
    donts: [
      "Do not hide the choices behind a select; the comparison is the point.",
      "Do not allow zero selection when a mode is required.",
    ],
    a11y:
      "A fieldset and legend name the group. Native radio behaviour supplies arrow-key movement and single selection, and the marker is decorative.",
  },
  {
    id: "switch",
    name: "Switch",
    job: "Turn reminders or a local preference on and off.",
    group: "Forms",
    Demo: SwitchDemo,
    variants: switchVariants,
    states: switchStates,
    props: [
      {
        name: "label",
        type: "ReactNode",
        defaultValue: "required",
        description: "Visible label, bound to the control with htmlFor.",
      },
      {
        name: "checked / defaultChecked",
        type: "boolean",
        defaultValue: "false",
        description: "Controlled or uncontrolled on state.",
      },
      {
        name: "onChange",
        type: "(checked: boolean) => void",
        defaultValue: "—",
        description: "Called when the switch toggles.",
      },
      {
        name: "size",
        type: '"sm" | "md"',
        defaultValue: '"md"',
        description: "32px or 42px track.",
      },
      {
        name: "hint",
        type: "string",
        defaultValue: "—",
        description: "Supporting text, described by the switch.",
      },
      {
        name: "disabled",
        type: "boolean",
        defaultValue: "false",
        description: "Blocks toggling and dims the control.",
      },
    ],
    dos: [
      "Use a switch for a setting that applies immediately.",
      "State the setting positively: Daily reminders, not Disable reminders.",
    ],
    donts: [
      "Do not use a switch to submit a form or choose one of several options.",
      "Do not change the label when the switch toggles; move the state, not the name.",
    ],
    a11y:
      "A native button carries role=switch and aria-checked; Space and Enter both toggle. The label is associated with htmlFor and the hint is described by the control.",
  },
  {
    id: "slider",
    name: "Slider",
    job: "Set a daily goal or a session length.",
    group: "Forms",
    Demo: SliderDemo,
    variants: sliderVariants,
    states: sliderStates,
    props: [
      {
        name: "label",
        type: "string",
        defaultValue: "required",
        description: "Visible uppercase label and accessible name.",
      },
      {
        name: "value / defaultValue",
        type: "number",
        defaultValue: "0",
        description: "Controlled or uncontrolled value.",
      },
      {
        name: "onChange",
        type: "(value: number) => void",
        defaultValue: "—",
        description: "Called with the numeric value.",
      },
      {
        name: "min / max / step",
        type: "number",
        defaultValue: "0 / 100 / 1",
        description: "Native range bounds and increment.",
      },
      {
        name: "formatValue",
        type: "(value: number) => string",
        defaultValue: "String",
        description: "Formats the visible output, for example “40 cards”.",
      },
      {
        name: "hint",
        type: "string",
        defaultValue: "—",
        description: "Supporting text under the control.",
      },
    ],
    dos: [
      "Show the numeric result beside the label so the setting is exact.",
      "Use a step that matches the decision: 10 cards, 5 minutes.",
    ],
    donts: [
      "Do not use a slider for a precise value that needs typing.",
      "Do not leave the output formatted as a bare number when the unit matters.",
    ],
    a11y:
      "The native range input keeps arrow-key, Home/End and assistive-technology support. The output is visual; the authoritative value stays on the input, with hint text described.",
  },
  {
    id: "search-field",
    name: "SearchField",
    job: "Find a deck or a card across the collection.",
    group: "Forms",
    Demo: SearchFieldDemo,
    variants: searchFieldVariants,
    states: searchFieldStates,
    props: [
      {
        name: "label",
        type: "string",
        defaultValue: "required",
        description: "Visible label; can be hidden but never omitted.",
      },
      {
        name: "value / defaultValue",
        type: "string",
        defaultValue: '""',
        description: "Controlled or uncontrolled query.",
      },
      {
        name: "onChange",
        type: "(value: string) => void",
        defaultValue: "—",
        description: "Called with the current query.",
      },
      {
        name: "onClear",
        type: "() => void",
        defaultValue: "—",
        description: "Called after the clear button or Escape empties the field.",
      },
      {
        name: "shortcut",
        type: "string",
        defaultValue: "—",
        description: "A decorative key hint shown while the field is empty.",
      },
      {
        name: "hint / error",
        type: "string",
        defaultValue: "—",
        description: "Standard field supporting and error text.",
      },
    ],
    dos: [
      "Search decks and cards with one field; keep the label specific.",
      "Clear on Escape and with a named button once there is a query.",
    ],
    donts: [
      "Do not use a placeholder as the label; it disappears on the first keystroke.",
      "Do not show the shortcut hint while a query is present; the clear button owns that space.",
    ],
    a11y:
      "The field is type=search with a real label. Escape clears only when content exists; the clear control is a named button, and the shortcut hint is aria-hidden.",
  },
  {
    id: "segmented-control",
    name: "SegmentedControl",
    job: "Switch a local view: list or grid, day or week.",
    group: "Navigation",
    Demo: SegmentedControlDemo,
    variants: segmentedVariants,
    states: segmentedStates,
    props: [
      {
        name: "label",
        type: "string",
        defaultValue: "required",
        description: "Accessible name for the group.",
      },
      {
        name: "options",
        type: "{ value; label; disabled? }[]",
        defaultValue: "required",
        description: "Two to four mutually exclusive segments.",
      },
      {
        name: "value / defaultValue",
        type: "string",
        defaultValue: "first option",
        description: "Controlled or uncontrolled selection.",
      },
      {
        name: "onChange",
        type: "(value: string) => void",
        defaultValue: "—",
        description: "Called with the chosen segment.",
      },
      {
        name: "size",
        type: '"sm" | "md"',
        defaultValue: '"md"',
        description: "28px or 34px control height.",
      },
      {
        name: "disabled",
        type: "boolean",
        defaultValue: "false",
        description: "Disables every segment.",
      },
    ],
    dos: [
      "Use two to four short labels that fit on one line.",
      "Keep the options local: a view, a range, a sort order.",
    ],
    donts: [
      "Do not use a segmented control for navigation between pages; use Tabs with panels.",
      "Do not mix a segmented control and a select for the same setting.",
    ],
    a11y:
      "Each segment is a toggle button with aria-pressed inside a labelled group. Arrow keys, Home and End move between enabled segments, and disabled segments are skipped.",
  },
  {
    id: "tabs",
    name: "Tabs",
    job: "Move between the sections of a deck.",
    group: "Navigation",
    Demo: TabsDemo,
    variants: tabsVariants,
    states: tabsStates,
    props: [
      {
        name: "items",
        type: "{ id; label; content?; disabled? }[]",
        defaultValue: "required",
        description: "Tabs and their panels, in order.",
      },
      {
        name: "value / defaultValue",
        type: "string",
        defaultValue: "first item",
        description: "Controlled or uncontrolled selected tab.",
      },
      {
        name: "onChange",
        type: "(id: string) => void",
        defaultValue: "—",
        description: "Called when the selected tab changes.",
      },
      {
        name: "variant",
        type: '"underline" | "pill"',
        defaultValue: '"underline"',
        description: "Underline for page sections; pill for a compact switcher.",
      },
      {
        name: "label",
        type: "string",
        defaultValue: '"Sections"',
        description: "Accessible name for the tablist.",
      },
    ],
    dos: [
      "Keep the number of tabs small and the labels one line long.",
      "Let the panel carry the dense content; the tab row stays quiet.",
    ],
    donts: [
      "Do not use tabs for a sequence the user must complete in order.",
      "Do not put a primary action inside a tab label.",
    ],
    a11y:
      "The component renders tablist, tab and tabpanel with roving tabIndex. Arrow keys, Home and End move selection and focus, and each panel is labelled by its tab.",
  },
];

export const componentGroups: { name: ComponentGroupName; items: ComponentSpec[] }[] =
  (["Actions", "Forms", "Navigation"] as const)
    .map((name) => ({
      name,
      items: components.filter((component) => component.group === name),
    }))
    .filter((group) => group.items.length > 0);

export function getComponent(id: string): ComponentSpec | undefined {
  return components.find((component) => component.id === id);
}
