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
import {
  BreadcrumbDemo,
  breadcrumbStates,
  breadcrumbVariants,
} from "./demos/BreadcrumbDemo";
import {
  PaginationDemo,
  paginationStates,
  paginationVariants,
} from "./demos/PaginationDemo";
import {
  CardDemo,
  cardStates,
  cardVariants,
} from "./demos/CardDemo";
import {
  BadgeDemo,
  badgeStates,
  badgeVariants,
} from "./demos/BadgeDemo";
import {
  TagDemo,
  tagStates,
  tagVariants,
} from "./demos/TagDemo";
import {
  AvatarDemo,
  avatarStates,
  avatarVariants,
} from "./demos/AvatarDemo";
import {
  TableDemo,
  tableStates,
  tableVariants,
} from "./demos/TableDemo";
import {
  ProgressDemo,
  progressStates,
  progressVariants,
} from "./demos/ProgressDemo";
import {
  SkeletonDemo,
  skeletonStates,
  skeletonVariants,
} from "./demos/SkeletonDemo";
import {
  EmptyStateDemo,
  emptyStateStates,
  emptyStateVariants,
} from "./demos/EmptyStateDemo";
import {
  TooltipDemo,
  tooltipStates,
  tooltipVariants,
} from "./demos/TooltipDemo";
import {
  DialogDemo,
  dialogStates,
  dialogVariants,
} from "./demos/DialogDemo";
import {
  DropdownMenuDemo,
  dropdownStates,
  dropdownVariants,
} from "./demos/DropdownMenuDemo";
import {
  ToastDemo,
  toastStates,
  toastVariants,
} from "./demos/ToastDemo";

export type ComponentGroupName =
  | "Actions"
  | "Forms"
  | "Navigation"
  | "Display"
  | "Overlay";

export interface ComponentSpec {
  id: string;
  name: string;
  job: string;
  group: ComponentGroupName;
  Demo: ComponentType;
  variants: SpecimenItem[];
  states: SpecimenItem[];
  statesNote?: string;
  wide?: boolean;
  compromise?: string;
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
  {
    id: "breadcrumb",
    name: "Breadcrumb",
    job: "Show depth inside the catalogue: decks, then cards.",
    group: "Navigation",
    Demo: BreadcrumbDemo,
    variants: breadcrumbVariants,
    states: breadcrumbStates,
    statesNote: "Current page and forced focus",
    compromise:
      "A collapsed trail hides the middle items visually. The first link and the current page stay, and the full path belongs in the page title or heading.",
    props: [
      {
        name: "items",
        type: "{ label: string; href?: string }[]",
        defaultValue: "required",
        description: "The trail in order; the last item is the current page.",
      },
      {
        name: "maxItems",
        type: "number",
        defaultValue: "—",
        description: "Collapses to first, ellipsis and last beyond this count.",
      },
      {
        name: "label",
        type: "string",
        defaultValue: '"Breadcrumb"',
        description: "Accessible name for the navigation landmark.",
      },
      {
        name: "...rest",
        type: "HTMLAttributes",
        defaultValue: "—",
        description: "Native attributes reach the nav element.",
      },
    ],
    dos: [
      "Keep the trail to the deck hierarchy: Decks / Kanji N3 / Cards.",
      "Mark the last item with aria-current rather than making it a link.",
    ],
    donts: [
      "Do not use a breadcrumb as the primary navigation for the docs shell.",
      "Do not collapse a trail of only two items; there is nothing to hide.",
    ],
    a11y:
      "The trail is a labelled navigation landmark with an ordered list. The current page is a span with aria-current=page, and separators are aria-hidden.",
  },
  {
    id: "pagination",
    name: "Pagination",
    job: "Move through a long card list.",
    group: "Navigation",
    Demo: PaginationDemo,
    variants: paginationVariants,
    states: paginationStates,
    statesNote: "Current, bounds and forced focus",
    compromise:
      "Compact mode drops the numbered context to save space. The summary still names the page and total, and the buttons keep the same order.",
    props: [
      {
        name: "page",
        type: "number",
        defaultValue: "required",
        description: "The current page, one-based.",
      },
      {
        name: "pageCount",
        type: "number",
        defaultValue: "required",
        description: "Total pages; bounds drive the arrow disabled states.",
      },
      {
        name: "onPageChange",
        type: "(page: number) => void",
        defaultValue: "—",
        description: "Called with the requested page.",
      },
      {
        name: "variant",
        type: '"numbered" | "compact"',
        defaultValue: '"numbered"',
        description: "Numbered list or a page summary with arrows.",
      },
      {
        name: "size",
        type: '"sm" | "md"',
        defaultValue: '"md"',
        description: "30px or 26px controls.",
      },
    ],
    dos: [
      "Disable the previous and next arrows at the bounds rather than hiding them.",
      "Keep the current page marked with aria-current and a filled keyline.",
    ],
    donts: [
      "Do not paginate a list that fits one screen; use a filter instead.",
      "Do not reset the page when the sort order changes without saying so.",
    ],
    a11y:
      "The control is a labelled navigation landmark. Page buttons carry aria-current=page, arrows have accessible names and bounds disable them rather than removing them.",
  },
  {
    id: "card",
    name: "Card",
    job: "Show a deck or a study card.",
    group: "Display",
    Demo: CardDemo,
    variants: cardVariants,
    states: cardStates,
    statesNote: "Surface states; interactive cards use focus-within",
    compromise:
      "The interactive card is not itself a button. It expects a real link or button inside, which keeps nested actions valid and lets the browser own activation.",
    props: [
      {
        name: "variant",
        type: '"flat" | "raised" | "interactive" | "selected"',
        defaultValue: '"flat"',
        description: "Surface treatment; selected adds the lavender inset.",
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        defaultValue: '"md"',
        description: "Padding and content rhythm.",
      },
      {
        name: "disabled",
        type: "boolean",
        defaultValue: "false",
        description: "Dims the card and sets aria-disabled.",
      },
      {
        name: "...rest",
        type: "HTMLAttributes",
        defaultValue: "—",
        description: "Native attributes reach the card container.",
      },
    ],
    dos: [
      "Use the selected surface for one deck in a shelf, not for every card.",
      "Put a named action inside an interactive card so Enter and Space have a target.",
    ],
    donts: [
      "Do not nest a link inside another link to make the whole card clickable.",
      "Do not add a blurred shadow; raised cards use the print offset.",
    ],
    a11y:
      "Cards are containers, not controls. An interactive card gets its focus ring from the real action inside via focus-within, so the card never becomes an unnamed button.",
  },
  {
    id: "badge",
    name: "Badge",
    job: "Mark a due count, a tier, or a status.",
    group: "Display",
    Demo: BadgeDemo,
    variants: badgeVariants,
    states: badgeStates,
    statesNote: "Static only — no hover or focus states",
    props: [
      {
        name: "variant",
        type: '"neutral" | "accent" | "success" | "warning" | "danger"',
        defaultValue: '"neutral"',
        description: "Semantic tone; the word inside still carries the meaning.",
      },
      {
        name: "size",
        type: '"sm" | "md"',
        defaultValue: '"md"',
        description: "Padding and label height.",
      },
      {
        name: "...rest",
        type: "HTMLAttributes",
        defaultValue: "—",
        description: "Native attributes reach the span.",
      },
    ],
    dos: [
      "Write the status into the badge: 142 due, Sync failed, 98% recall.",
      "Use one badge per fact; the mono label already adds enough weight.",
    ],
    donts: [
      "Do not rely on colour alone to distinguish the variants.",
      "Do not turn a badge into a button; use Tag for a removable filter.",
    ],
    a11y:
      "Badges are static text. Colour reinforces the label but never replaces it, and the contrast of every semantic colour is shown on the Colour foundation page.",
  },
  {
    id: "tag",
    name: "Tag",
    job: "Label a deck or remove an active filter.",
    group: "Display",
    Demo: TagDemo,
    variants: tagVariants,
    states: tagStates,
    statesNote: "Forced hover and focus; remove is the focus target",
    compromise:
      "A static tag is not focusable. Only the removable variant puts the remove action in the tab order, which keeps a label from pretending to be a control.",
    props: [
      {
        name: "variant",
        type: '"static" | "removable"',
        defaultValue: '"static"',
        description: "A label, or a label with a remove button.",
      },
      {
        name: "size",
        type: '"sm" | "md"',
        defaultValue: '"md"',
        description: "28px or 24px tag height.",
      },
      {
        name: "disabled",
        type: "boolean",
        defaultValue: "false",
        description: "Dims the tag and disables its remove action.",
      },
      {
        name: "onRemove",
        type: "() => void",
        defaultValue: "—",
        description: "Called when the remove button is pressed.",
      },
      {
        name: "removeLabel",
        type: "string",
        defaultValue: '"Remove tag"',
        description: "Accessible name for the remove button.",
      },
    ],
    dos: [
      "Name the remove action with the tag: Remove Kanji N3.",
      "Use tags for filters the learner can clear, one per deck or language.",
    ],
    donts: [
      "Do not use a tag for a status that cannot be removed; use Badge.",
      "Do not let the remove target shrink below 24px.",
    ],
    a11y:
      "The remove control is a real button with a specific aria-label and a 24px target. The static variant adds no tab stops; the tag label stays as plain text.",
  },
  {
    id: "avatar",
    name: "Avatar",
    job: "Show a learner or the owner of a deck.",
    group: "Display",
    Demo: AvatarDemo,
    variants: avatarVariants,
    states: avatarStates,
    statesNote: "Image, initials fallback and focus",
    compromise:
      "The image is alt text empty because the labelled wrapper carries the name. Initials are decorative once that name exists, so assistive technology hears the person once.",
    props: [
      {
        name: "src",
        type: "string",
        defaultValue: "—",
        description: "Image source; a load failure falls back to initials.",
      },
      {
        name: "initials",
        type: "string",
        defaultValue: "required",
        description: "Two or three characters used as the fallback.",
      },
      {
        name: "label",
        type: "string",
        defaultValue: "initials",
        description: "Accessible name for the person or the profile action.",
      },
      {
        name: "size",
        type: '"xs" | "sm" | "md" | "lg"',
        defaultValue: '"md"',
        description: "24, 32, 40 or 56px seal.",
      },
      {
        name: "interactive",
        type: "boolean",
        defaultValue: "false",
        description: "Renders a labelled button instead of an image span.",
      },
    ],
    dos: [
      "Give every avatar a person's name, not just a file name.",
      "Use the interactive variant only when it opens the profile.",
    ],
    donts: [
      "Do not rely on the image alone; initials are the fallback.",
      "Do not add a gradient to an avatar; it is a seal, not the system mark.",
    ],
    a11y:
      "The resting avatar is role=img with an accessible name. The image is alt=\"\", the initials are aria-hidden, and the interactive variant is a native button.",
  },
  {
    id: "table",
    name: "Table",
    job: "Show study history and card lists.",
    group: "Display",
    Demo: TableDemo,
    variants: tableVariants,
    states: tableStates,
    statesNote: "Sorted, selected, empty and loading states",
    wide: true,
    compromise:
      "On narrow screens the table scrolls horizontally instead of collapsing into cards. The caption and header row stay attached, and the state cells wrap their text.",
    props: [
      {
        name: "columns",
        type: "TableColumn<T>[]",
        defaultValue: "required",
        description: "Header, renderer, alignment and sortable flag.",
      },
      {
        name: "rows",
        type: "T[]",
        defaultValue: "required",
        description: "The records for the current page.",
      },
      {
        name: "rowKey",
        type: "(row: T) => string",
        defaultValue: "required",
        description: "Stable key for selection and React reconciliation.",
      },
      {
        name: "caption",
        type: "string",
        defaultValue: "required",
        description: "Accessible table name; visually hidden.",
      },
      {
        name: "sort / onSort",
        type: "{ key; direction } / (key) => void",
        defaultValue: "—",
        description: "Controlled sorting; headers expose aria-sort.",
      },
      {
        name: "selectedKeys / onSelectionChange",
        type: "string[] / (keys) => void",
        defaultValue: "[] / —",
        description: "Enables the selection column when a handler is supplied.",
      },
      {
        name: "loading / empty",
        type: "boolean / ReactNode",
        defaultValue: "false / text",
        description: "Loading row or the empty-state message.",
      },
    ],
    dos: [
      "Name the table with a caption even when the heading above repeats it.",
      "Keep numeric columns end-aligned and tabular.",
    ],
    donts: [
      "Do not hide the header row on mobile; let the table scroll.",
      "Do not use a table for a layout grid.",
    ],
    a11y:
      "The table has a caption, scope=col headers, aria-sort on sortable columns and named row checkboxes. Selected rows expose aria-selected, and loading sets aria-busy.",
  },
  {
    id: "progress",
    name: "Progress",
    job: "Show session recall or the daily goal.",
    group: "Display",
    Demo: ProgressDemo,
    variants: progressVariants,
    states: progressStates,
    statesNote: "Determinate, indeterminate and complete",
    wide: true,
    compromise:
      "Indeterminate progress has no numeric value by design. aria-valuenow is omitted rather than invented, and the visible label carries the activity.",
    props: [
      {
        name: "label",
        type: "string",
        defaultValue: "required",
        description: "Visible and accessible name for the measure.",
      },
      {
        name: "value / max",
        type: "number",
        defaultValue: "0 / 100",
        description: "Determinate value and its ceiling.",
      },
      {
        name: "variant",
        type: '"bar" | "ring"',
        defaultValue: '"bar"',
        description: "Linear measure or a sealed ring.",
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        defaultValue: '"md"',
        description: "Bar thickness or ring diameter.",
      },
      {
        name: "indeterminate",
        type: "boolean",
        defaultValue: "false",
        description: "Removes aria-valuenow and animates the track.",
      },
      {
        name: "showValue",
        type: "boolean",
        defaultValue: "true",
        description: "Shows the rounded percentage beside the label.",
      },
    ],
    dos: [
      "Use a ring for one recall figure and a bar for a goal with a limit.",
      "Keep the label visible; the value is not self-describing.",
    ],
    donts: [
      "Do not publish aria-valuenow for an indeterminate measure.",
      "Do not use progress for a decorative divider.",
    ],
    a11y:
      "The measure is role=progressbar with a label and min/max. aria-valuenow appears only for determinate and complete states; indeterminate uses animation that becomes static under reduced motion.",
  },
  {
    id: "skeleton",
    name: "Skeleton",
    job: "Hold the shape of a deck while it loads.",
    group: "Display",
    Demo: SkeletonDemo,
    variants: skeletonVariants,
    states: skeletonStates,
    statesNote: "Animated and reduced-motion static",
    wide: true,
    compromise:
      "Skeletons are hidden from assistive technology. Pair them with a status announcement when the wait matters, or the screen reader hears silence.",
    props: [
      {
        name: "variant",
        type: '"text" | "block" | "circle"',
        defaultValue: '"text"',
        description: "The silhouette being held.",
      },
      {
        name: "size",
        type: '"sm" | "md"',
        defaultValue: '"md"',
        description: "Small or default height.",
      },
      {
        name: "lines",
        type: "number",
        defaultValue: "1",
        description: "Number of text bars.",
      },
      {
        name: "animate",
        type: "boolean",
        defaultValue: "true",
        description: "Opacity pulse; prefers-reduced-motion forces it static.",
      },
      {
        name: "width",
        type: "string",
        defaultValue: "100%",
        description: "Optional width for a text line or block.",
      },
    ],
    dos: [
      "Match the skeleton to the final layout so the page does not jump.",
      "Use a circle only for an avatar or seal placeholder.",
    ],
    donts: [
      "Do not animate a shimmer; the archive pulse is opacity only.",
      "Do not leave a skeleton on screen without a load status.",
    ],
    a11y:
      "Every skeleton is aria-hidden. The pulse is disabled under prefers-reduced-motion, leaving a static paper-3 shape; the surrounding region owns any loading announcement.",
  },
  {
    id: "empty-state",
    name: "EmptyState",
    job: "Explain an empty deck, no results, or the first run.",
    group: "Display",
    Demo: EmptyStateDemo,
    variants: emptyStateVariants,
    states: emptyStateStates,
    statesNote: "With and without an action",
    wide: true,
    props: [
      {
        name: "title",
        type: "string",
        defaultValue: "required",
        description: "The short statement of what is missing.",
      },
      {
        name: "body",
        type: "string",
        defaultValue: "required",
        description: "One sentence on what to do next.",
      },
      {
        name: "action",
        type: "ReactNode",
        defaultValue: "—",
        description: "One onward action, normally a Button.",
      },
      {
        name: "mark",
        type: "boolean",
        defaultValue: "false",
        description: "Shows the gradient form; one per viewport.",
      },
    ],
    dos: [
      "Say what is missing and what to do: no cards, add the first card.",
      "Use the mark only when this empty state is the page's one gradient event.",
    ],
    donts: [
      "Do not show an empty state while data is still loading.",
      "Do not put the gradient behind text; it sits above the copy.",
    ],
    a11y:
      "The title is a rubric heading and the body carries the instruction. The optional gradient mark is aria-hidden, and the action is the only focus stop in the block.",
  },
  {
    id: "tooltip",
    name: "Tooltip",
    job: "Explain an icon or a truncated label.",
    group: "Overlay",
    Demo: TooltipDemo,
    variants: tooltipVariants,
    states: tooltipStates,
    statesNote: "Forced open states; hidden is the default",
    compromise:
      "Tooltips are supplementary. The trigger must still have a name and the meaning must survive without the tooltip, because touch and keyboard users may never see it.",
    props: [
      {
        name: "label",
        type: "string",
        defaultValue: "required",
        description: "The explanatory text; never interactive content.",
      },
      {
        name: "children",
        type: "ReactElement",
        defaultValue: "required",
        description: "The trigger; it receives aria-describedby while visible.",
      },
      {
        name: "side",
        type: '"top" | "bottom" | "left" | "right"',
        defaultValue: '"top"',
        description: "Preferred placement.",
      },
      {
        name: "open / defaultOpen",
        type: "boolean",
        defaultValue: "false",
        description: "Controlled or initial visibility for specimens.",
      },
      {
        name: "inline",
        type: "boolean",
        defaultValue: "false",
        description: "Places the tooltip in flow for state grids.",
      },
    ],
    dos: [
      "Use a tooltip for a short explanation of an icon-only action.",
      "Add the description to the trigger with aria-describedby while visible.",
    ],
    donts: [
      "Do not put a link or button inside a tooltip.",
      "Do not make the tooltip the only place a control is named.",
    ],
    a11y:
      "The tooltip opens on hover and focus, sets aria-describedby on its trigger, and Escape hides it and removes the description. The tooltip itself never takes focus.",
  },
  {
    id: "dialog",
    name: "Dialog",
    job: "Confirm a delete or rename a deck.",
    group: "Overlay",
    Demo: DialogDemo,
    variants: dialogVariants,
    states: dialogStates,
    statesNote: "Inline previews; the live demo is the real modal",
    wide: true,
    compromise:
      "The inline preview is documentation-only. It omits the modal layer and focus trap so several states can be inspected side by side; only the live demo and the real component trap focus.",
    props: [
      {
        name: "open / onClose",
        type: "boolean / () => void",
        defaultValue: "false / —",
        description: "Visibility and the close request from Escape or the close button.",
      },
      {
        name: "title",
        type: "string",
        defaultValue: "required",
        description: "The dialog heading and accessible name.",
      },
      {
        name: "description",
        type: "string",
        defaultValue: "—",
        description: "Supporting sentence, wired with aria-describedby.",
      },
      {
        name: "footer",
        type: "ReactNode",
        defaultValue: "—",
        description: "Action row, normally one secondary and one danger button.",
      },
      {
        name: "size",
        type: '"sm" | "md"',
        defaultValue: '"md"',
        description: "420px or 620px maximum width.",
      },
      {
        name: "inline",
        type: "boolean",
        defaultValue: "false",
        description: "Renders the surface in place for documentation previews.",
      },
    ],
    dos: [
      "Open from a named trigger and return focus to it on Escape or close.",
      "Keep the destructive action last and label it with the consequence.",
    ],
    donts: [
      "Do not nest a dialog inside another dialog.",
      "Do not use a dialog for a passive message that needs no decision.",
    ],
    a11y:
      "The modal is role=dialog with aria-modal and a labelled title. Focus moves into the panel, Tab cycles inside, Escape closes, and focus returns to the trigger. The close button is named.",
  },
  {
    id: "dropdown-menu",
    name: "DropdownMenu",
    job: "Row actions: rename, duplicate, archive, delete.",
    group: "Overlay",
    Demo: DropdownMenuDemo,
    variants: dropdownVariants,
    states: dropdownStates,
    statesNote: "Inline menus in the grid; the live menu floats",
    wide: true,
    compromise:
      "The menu does not implement type-ahead. Four short actions do not need it, and adding it would grow the surface beyond what the catalogue uses.",
    props: [
      {
        name: "items",
        type: "{ id; label; danger?; disabled?; separatorBefore? }[]",
        defaultValue: "required",
        description: "Menu actions in order.",
      },
      {
        name: "triggerLabel",
        type: "string",
        defaultValue: '"Actions"',
        description: "Visible trigger name and menu label fallback.",
      },
      {
        name: "onSelect",
        type: "(id: string) => void",
        defaultValue: "—",
        description: "Called when an enabled action is chosen.",
      },
      {
        name: "align",
        type: '"start" | "end"',
        defaultValue: '"start"',
        description: "Which trigger edge the menu follows.",
      },
      {
        name: "open / defaultOpen",
        type: "boolean",
        defaultValue: "false",
        description: "Controlled or initial visibility.",
      },
      {
        name: "inline",
        type: "boolean",
        defaultValue: "false",
        description: "Places the menu in flow for state grids.",
      },
    ],
    dos: [
      "Use a menu for actions on one row or deck, not for navigation.",
      "Keep the destructive action last and separated.",
    ],
    donts: [
      "Do not put a form inside a menu.",
      "Do not use a menu where a single visible button would do.",
    ],
    a11y:
      "The trigger is a labelled button with aria-haspopup=menu and aria-expanded. The menu uses role=menu and menuitem; arrow keys, Home, End and Escape work, Escape returns focus, and outside pointer-down closes it.",
  },
  {
    id: "toast",
    name: "Toast",
    job: "Confirm a save or report a failed sync.",
    group: "Overlay",
    Demo: ToastDemo,
    variants: toastVariants,
    states: toastStates,
    statesNote: "Timed states described; hover and focus pause",
    wide: true,
    compromise:
      "Danger toasts still use role=status rather than role=alert. A failed sync does not interrupt the current task; the label, text and crimson edge carry the urgency.",
    props: [
      {
        name: "title",
        type: "string",
        defaultValue: "required",
        description: "The result in one line.",
      },
      {
        name: "description",
        type: "string",
        defaultValue: "—",
        description: "Supporting detail, such as the card and deck.",
      },
      {
        name: "variant",
        type: '"success" | "danger" | "info"',
        defaultValue: '"success"',
        description: "Edge colour and the label above the title.",
      },
      {
        name: "duration",
        type: "number",
        defaultValue: "6000",
        description: "Auto-dismiss delay; 0 disables the timer.",
      },
      {
        name: "paused",
        type: "boolean",
        defaultValue: "false",
        description: "External pause, for example when the page is hidden.",
      },
      {
        name: "onDismiss",
        type: "() => void",
        defaultValue: "—",
        description: "Called by the named dismiss button or the timer.",
      },
    ],
    dos: [
      "Put the result first: Card saved, then the card and deck.",
      "Pause the timer on hover and focus and keep a named dismiss button.",
    ],
    donts: [
      "Do not use a toast for an error that blocks the next step; use a Dialog.",
      "Do not stack more than two; the region should stay quiet.",
    ],
    a11y:
      "The toast is role=status with aria-atomic. Hover and focus pause the timer visibly, the dismiss button is named, and the reveal becomes opacity-only under reduced motion.",
  },
];

export const componentGroups: { name: ComponentGroupName; items: ComponentSpec[] }[] =
  (["Actions", "Forms", "Navigation", "Display", "Overlay"] as const)
    .map((name) => ({
      name,
      items: components.filter((component) => component.group === name),
    }))
    .filter((group) => group.items.length > 0);

export function getComponent(id: string): ComponentSpec | undefined {
  return components.find((component) => component.id === id);
}
