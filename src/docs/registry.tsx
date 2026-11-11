import type { ComponentDoc, ComponentGroup } from "./types";
import * as ButtonDemo from "./demos/ButtonDemo";
import * as IconButtonDemo from "./demos/IconButtonDemo";
import * as LinkDemo from "./demos/LinkDemo";
import * as TextFieldDemo from "./demos/TextFieldDemo";
import * as TextAreaDemo from "./demos/TextAreaDemo";
import * as SelectDemo from "./demos/SelectDemo";
import * as CheckboxDemo from "./demos/CheckboxDemo";
import * as RadioGroupDemo from "./demos/RadioGroupDemo";
import * as SwitchDemo from "./demos/SwitchDemo";
import * as SliderDemo from "./demos/SliderDemo";
import * as SearchFieldDemo from "./demos/SearchFieldDemo";
import * as SegmentedControlDemo from "./demos/SegmentedControlDemo";
import * as TabsDemo from "./demos/TabsDemo";

const button: ComponentDoc = {
  id: "button",
  name: "Button",
  group: "Actions",
  job: "Commit an action: start a session, save a card, delete a deck.",
  Demo: ButtonDemo.Demo,
  Variants: ButtonDemo.Variants,
  States: ButtonDemo.States,
  props: [
    {
      name: "variant",
      type: '"primary" | "secondary" | "ghost" | "danger"',
      default: '"primary"',
      description: "Visual weight and intent. Danger is the only red action.",
    },
    {
      name: "size",
      type: '"sm" | "md" | "lg"',
      default: '"md"',
      description: "Control height and label size.",
    },
    {
      name: "loading",
      type: "boolean",
      default: "false",
      description: "Shows a spinner, sets aria-busy and blocks the click.",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Removes the action from the tab order.",
    },
    {
      name: "children",
      type: "ReactNode",
      default: "—",
      description: "Always a verb-led label, sentence case in copy.",
    },
  ],
  dos: [
    "Use one primary button per surface; let the deck card own it.",
    "Keep the label stable while loading so the button does not jump width.",
  ],
  donts: [
    "Don't put a second primary beside the first to make both feel important.",
    "Don't use danger for a reversible action such as skipping a card.",
  ],
  a11y:
    "Loading sets aria-busy and disables the button, so a double press cannot save twice. The label is the accessible name; the spinner is decorative.",
};

const iconButton: ComponentDoc = {
  id: "icon-button",
  name: "IconButton",
  group: "Actions",
  job: "A compact action where an icon is the whole label: shuffle, mute, close.",
  Demo: IconButtonDemo.Demo,
  Variants: IconButtonDemo.Variants,
  States: IconButtonDemo.States,
  props: [
    {
      name: "label",
      type: "string",
      default: "—",
      description: "Required accessible name and tooltip.",
    },
    {
      name: "icon",
      type: "IconName",
      default: "—",
      description: "One of the inline stroke icons.",
    },
    {
      name: "variant",
      type: '"solid" | "ghost"',
      default: '"ghost"',
      description: "Solid for a toolbar, ghost for a quiet row action.",
    },
    {
      name: "size",
      type: '"sm" | "md"',
      default: '"md"',
      description: "32px or 42px square hit area.",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Removes the action from the tab order.",
    },
  ],
  dos: [
    "Give every icon button a label that names the action, not the symbol.",
    "Keep one icon size per toolbar so the row reads as a set.",
  ],
  donts: [
    "Don't ship an icon-only control without an accessible name.",
    "Don't use an icon button for a destructive action that needs confirmation.",
  ],
  a11y:
    "The icon is aria-hidden; the label is the only accessible name. The control is a real button, so Space and Enter activate it and the dual-band focus ring follows the circle.",
};

const link: ComponentDoc = {
  id: "link",
  name: "Link",
  group: "Actions",
  job: "Navigate away: back to the index, or across the documentation.",
  Demo: LinkDemo.Demo,
  Variants: LinkDemo.Variants,
  States: LinkDemo.States,
  props: [
    {
      name: "href",
      type: "string",
      default: "—",
      description: "The destination. A Link always renders an anchor.",
    },
    {
      name: "variant",
      type: '"inline" | "standalone"',
      default: '"inline"',
      description: "Inline stays in the sentence; standalone becomes a labelled route.",
    },
    {
      name: "size",
      type: '"inherit" | "sm"',
      default: '"inherit"',
      description: "Inherit the surrounding text size or step down once.",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Keeps the text, removes the destination and the tab stop.",
    },
  ],
  dos: [
    "Keep inline links underlined; the underline is what distinguishes them from emphasis.",
    "Write the destination into the link text: “Read the Tabs reference”.",
  ],
  donts: [
    "Don't use a link to trigger a local state change; use a Button.",
    "Don't place two inline links side by side without a separator or sentence around them.",
  ],
  a11y:
    "Inline links keep their underline at rest, not only on hover. Visited uses the info blue, which clears 8.7:1 on abyss. A disabled link keeps aria-disabled and leaves the tab order.",
};

const textField: ComponentDoc = {
  id: "text-field",
  name: "TextField",
  group: "Forms",
  job: "Enter a short value: a deck name, a card prompt, a search term.",
  Demo: TextFieldDemo.Demo,
  Variants: TextFieldDemo.Variants,
  States: TextFieldDemo.States,
  props: [
    {
      name: "label",
      type: "string",
      default: "—",
      description: "Required visible label, programmatically tied to the input.",
    },
    {
      name: "hint",
      type: "string",
      default: "—",
      description: "Secondary guidance, linked through aria-describedby.",
    },
    {
      name: "error",
      type: "string",
      default: "—",
      description: "Marks the field invalid and links the message.",
    },
    {
      name: "size",
      type: '"sm" | "md"',
      default: '"md"',
      description: "Control height; the label stays the same.",
    },
    {
      name: "value / defaultValue",
      type: "string",
      default: "—",
      description: "Controlled or uncontrolled, passed to the native input.",
    },
  ],
  dos: [
    "Write a hint that explains the consequence, not the format alone.",
    "Show the error next to the field and keep the label visible.",
  ],
  donts: [
    "Don't use placeholder text as the only label.",
    "Don't clear the value when the user corrects an error.",
  ],
  a11y:
    "The label is always rendered and associated. Error and hint join aria-describedby, and error adds aria-invalid. Focus is visible on the input, not only on its wrapper.",
};

const textArea: ComponentDoc = {
  id: "text-area",
  name: "TextArea",
  group: "Forms",
  job: "Write a card answer or a note longer than one line.",
  Demo: TextAreaDemo.Demo,
  Variants: TextAreaDemo.Variants,
  States: TextAreaDemo.States,
  props: [
    {
      name: "label",
      type: "string",
      default: "—",
      description: "Required visible label, tied to the textarea.",
    },
    {
      name: "hint",
      type: "string",
      default: "—",
      description: "Guidance linked through aria-describedby.",
    },
    {
      name: "error",
      type: "string",
      default: "—",
      description: "Invalid style plus a linked message.",
    },
    {
      name: "showCount",
      type: "boolean",
      default: "false",
      description: "Shows the character count, optionally against maxLength.",
    },
    {
      name: "maxLength",
      type: "number",
      default: "—",
      description: "Native limit and the denominator of the counter.",
    },
    {
      name: "rows",
      type: "number",
      default: "4",
      description: "Native row hint; the control is vertically resizable.",
    },
  ],
  dos: [
    "Put the counter beside the hint, not inside the textarea.",
    "Size the field for the answer you expect; do not make a one-word answer a five-line box.",
  ],
  donts: [
    "Don't use a counter as a fake progress bar.",
    "Don't hide the limit until the user hits it.",
  ],
  a11y:
    "The counter is part of aria-describedby, so it is read with the field. The error keeps its association when the value changes. Resizing is vertical only and cannot break the page layout.",
};

const select: ComponentDoc = {
  id: "select",
  name: "Select",
  group: "Forms",
  job: "Choose one value from a known list: deck, language, sort order.",
  Demo: SelectDemo.Demo,
  Variants: SelectDemo.Variants,
  States: SelectDemo.States,
  props: [
    {
      name: "label",
      type: "string",
      default: "—",
      description: "Required visible label, tied to the native select.",
    },
    {
      name: "hint",
      type: "string",
      default: "—",
      description: "Guidance linked through aria-describedby.",
    },
    {
      name: "error",
      type: "string",
      default: "—",
      description: "Invalid style plus a linked message.",
    },
    {
      name: "size",
      type: '"sm" | "md"',
      default: '"md"',
      description: "Control height; the chevron stays 18px.",
    },
    {
      name: "children",
      type: "ReactNode",
      default: "—",
      description: "Native option elements; keep the chosen default meaningful.",
    },
  ],
  dos: [
    "Use Select when the list is stable and short enough to scan.",
    "Keep the first option a real choice, or an explicit “Select a deck” prompt.",
  ],
  donts: [
    "Don't use Select for two options; a SegmentedControl or Switch is quicker.",
    "Don't hide validation until submit if the field is already invalid.",
  ],
  a11y:
    "The native select keeps the platform keyboard model and the open popup is drawn by the platform. The label is programmatic and the error is linked; the chevron is decorative.",
};

const checkbox: ComponentDoc = {
  id: "checkbox",
  name: "Checkbox",
  group: "Forms",
  job: "Toggle a filter or select several rows without committing.",
  Demo: CheckboxDemo.Demo,
  Variants: CheckboxDemo.Variants,
  States: CheckboxDemo.States,
  props: [
    {
      name: "label",
      type: "ReactNode",
      default: "—",
      description: "The visible label; the whole row is the target.",
    },
    {
      name: "size",
      type: '"sm" | "md"',
      default: '"md"',
      description: "Box and label size.",
    },
    {
      name: "indeterminate",
      type: "boolean",
      default: "false",
      description: "Mixed state for a parent that is partly selected.",
    },
    {
      name: "error",
      type: "string",
      default: "—",
      description: "Invalid style plus a linked message.",
    },
    {
      name: "checked / defaultChecked",
      type: "boolean",
      default: "false",
      description: "Controlled or uncontrolled, passed to the native input.",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Removes the filter from the tab order.",
    },
  ],
  dos: [
    "Use a checkbox when the choice can stand alone or several can be true.",
    "Show the indeterminate state on the parent of a partially selected set.",
  ],
  donts: [
    "Don't use a checkbox for an immediate setting that saves on change.",
    "Don't depend on colour alone to show that the filter is active.",
  ],
  a11y:
    "The native checkbox keeps its role and value; the custom box is aria-hidden. Indeterminate is set as a DOM property, not just a visual dash. Focus is drawn on the box with the dual-band ring.",
};

const radioGroup: ComponentDoc = {
  id: "radio-group",
  name: "RadioGroup",
  group: "Forms",
  job: "Pick exactly one study mode from a small visible set.",
  Demo: RadioGroupDemo.Demo,
  Variants: RadioGroupDemo.Variants,
  States: RadioGroupDemo.States,
  props: [
    {
      name: "legend",
      type: "string",
      default: "—",
      description: "The group question; rendered as the fieldset legend.",
    },
    {
      name: "name",
      type: "string",
      default: "—",
      description: "Native radio name; one group, one name.",
    },
    {
      name: "options",
      type: "RadioOption[]",
      default: "—",
      description: "Value, visible label and optional disabled flag.",
    },
    {
      name: "value / defaultValue",
      type: "string",
      default: "—",
      description: "Controlled or uncontrolled selection.",
    },
    {
      name: "onValueChange",
      type: "(value: string) => void",
      default: "—",
      description: "Runs when a different radio is chosen.",
    },
    {
      name: "orientation",
      type: '"vertical" | "horizontal"',
      default: '"vertical"',
      description: "Layout only; the keyboard model does not change.",
    },
    {
      name: "size",
      type: '"sm" | "md"',
      default: '"md"',
      description: "Dot and label size.",
    },
    {
      name: "error",
      type: "string",
      default: "—",
      description: "Invalid style plus a linked message.",
    },
  ],
  dos: [
    "Keep every option visible; a radio group is a decision, not a menu.",
    "Lead with the recommended mode if one is genuinely the default.",
  ],
  donts: [
    "Don't use radios for multiple selection; use checkboxes.",
    "Don't make the legend a placeholder or repeat it in every option.",
  ],
  a11y:
    "A fieldset and legend name the group. Native arrow keys move between radios, and the error is linked to the fieldset. The visible label is the radio’s accessible name.",
};

const switchControl: ComponentDoc = {
  id: "switch",
  name: "Switch",
  group: "Forms",
  job: "Turn a persistent setting on or off: reminders, audio, a dark surface.",
  Demo: SwitchDemo.Demo,
  Variants: SwitchDemo.Variants,
  States: SwitchDemo.States,
  props: [
    {
      name: "label",
      type: "ReactNode",
      default: "—",
      description: "The visible setting name and the accessible name.",
    },
    {
      name: "checked / defaultChecked",
      type: "boolean",
      default: "false",
      description: "Controlled or uncontrolled state.",
    },
    {
      name: "onCheckedChange",
      type: "(checked: boolean) => void",
      default: "—",
      description: "Runs after the state flips.",
    },
    {
      name: "size",
      type: '"sm" | "md"',
      default: '"md"',
      description: "Track and label size.",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Keeps the state visible but removes the control.",
    },
  ],
  dos: [
    "Use a switch when the change takes effect immediately.",
    "Keep the label next to the track so the state has a subject.",
  ],
  donts: [
    "Don't use a switch for a choice that needs a Save button.",
    "Don't rely on the track colour alone; aria-checked carries the state.",
  ],
  a11y:
    "The control is a button with role=switch and aria-checked, so Space and Enter both toggle it. The visible label is the accessible name, and disabled keeps the state readable.",
};

const slider: ComponentDoc = {
  id: "slider",
  name: "Slider",
  group: "Forms",
  job: "Set a value on a short scale: daily goal or session length.",
  Demo: SliderDemo.Demo,
  Variants: SliderDemo.Variants,
  States: SliderDemo.States,
  props: [
    {
      name: "label",
      type: "string",
      default: "—",
      description: "Required visible label, tied to the range input.",
    },
    {
      name: "min / max / step",
      type: "number",
      default: "0 / 100 / 1",
      description: "Native range bounds and increment.",
    },
    {
      name: "showValue",
      type: "boolean",
      default: "true",
      description: "Shows the live value beside the label.",
    },
    {
      name: "formatValue",
      type: "(value: number) => string",
      default: "—",
      description: "Formats the output, e.g. “20 cards / day”.",
    },
    {
      name: "hint",
      type: "string",
      default: "—",
      description: "Guidance linked through aria-describedby.",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Removes the range from the tab order.",
    },
  ],
  dos: [
    "Show the live value so the thumb has a readable meaning.",
    "Use steps that match the decision: 5 cards, not 1.",
  ],
  donts: [
    "Don't use a slider for an exact number that needs typing.",
    "Don't hide the bounds; the user should know where the scale ends.",
  ],
  a11y:
    "The native range input keeps the arrow-key model and announces its value. The label is programmatic, the output is visible, and the track fill is not the only indication of value.",
};

const searchField: ComponentDoc = {
  id: "search-field",
  name: "SearchField",
  group: "Forms",
  job: "Find a deck or a card without leaving the current page.",
  Demo: SearchFieldDemo.Demo,
  Variants: SearchFieldDemo.Variants,
  States: SearchFieldDemo.States,
  props: [
    {
      name: "label",
      type: "string",
      default: "—",
      description: "Required visible label, tied to the search input.",
    },
    {
      name: "hint",
      type: "string",
      default: "—",
      description: "What the search covers, linked to the input.",
    },
    {
      name: "shortcut",
      type: "string",
      default: "—",
      description: "A keyboard hint shown inside the field, e.g. ⌘K.",
    },
    {
      name: "onClear",
      type: "() => void",
      default: "—",
      description: "Runs when the clear control empties the field.",
    },
    {
      name: "value / defaultValue",
      type: "string",
      default: '""',
      description: "Controlled or uncontrolled query.",
    },
  ],
  dos: [
    "Keep the clear control inside the field and give it its own name.",
    "Announce result counts in a live region when the list changes.",
  ],
  donts: [
    "Don't use placeholder text as the only label.",
    "Don't trigger a search on every keystroke without debouncing the request.",
  ],
  a11y:
    "The input is type=search with a visible label. The clear button is labelled “Clear search” and returns focus to the field. The shortcut is a hint, not the only way to reach the field.",
};

const segmentedControl: ComponentDoc = {
  id: "segmented-control",
  name: "SegmentedControl",
  group: "Navigation",
  job: "Switch a local view: list or grid, due or all, without leaving the page.",
  Demo: SegmentedControlDemo.Demo,
  Variants: SegmentedControlDemo.Variants,
  States: SegmentedControlDemo.States,
  props: [
    {
      name: "label",
      type: "string",
      default: "—",
      description: "Names the group for assistive technology.",
    },
    {
      name: "options",
      type: "SegmentOption[]",
      default: "—",
      description: "Value, label and optional disabled flag.",
    },
    {
      name: "value / defaultValue",
      type: "string",
      default: "first option",
      description: "Controlled or uncontrolled selection.",
    },
    {
      name: "onValueChange",
      type: "(value: string) => void",
      default: "—",
      description: "Runs when a segment is chosen.",
    },
    {
      name: "size",
      type: '"sm" | "md"',
      default: '"md"',
      description: "Segment height and label size.",
    },
  ],
  dos: [
    "Use two to four segments that describe views of the same thing.",
    "Keep the selected segment filled so the current view is obvious.",
  ],
  donts: [
    "Don't use a segmented control for navigation between pages.",
    "Don't mix a local view with a command such as Delete in the same group.",
  ],
  a11y:
    "The group has an accessible label and each segment is a button with aria-pressed. The selected segment is filled, not only tinted. Disabled segments stay in the DOM but leave the tab order.",
};

const tabs: ComponentDoc = {
  id: "tabs",
  name: "Tabs",
  group: "Navigation",
  job: "Move between sections of one deck: due, all, archived.",
  Demo: TabsDemo.Demo,
  Variants: TabsDemo.Variants,
  States: TabsDemo.States,
  props: [
    {
      name: "tabs",
      type: "TabItem[]",
      default: "—",
      description: "id, label, optional panel content and disabled flag.",
    },
    {
      name: "value / defaultValue",
      type: "string",
      default: "first enabled",
      description: "Controlled or uncontrolled selected tab.",
    },
    {
      name: "onValueChange",
      type: "(id: string) => void",
      default: "—",
      description: "Runs when selection changes by click or key.",
    },
    {
      name: "variant",
      type: '"underline" | "pill"',
      default: '"underline"',
      description: "Deck sections take underline; a local toolbar may take pill.",
    },
    {
      name: "label",
      type: "string",
      default: "—",
      description: "Names the tab list for assistive technology.",
    },
  ],
  dos: [
    "Keep tab labels short and stable; the panel may change, the label should not.",
    "Use underline for page sections and pill for a compact local switcher.",
  ],
  donts: [
    "Don't nest a tab list inside another tab list.",
    "Don't hide important page content behind a tab the user cannot find.",
  ],
  a11y:
    "The tab list uses roving tabindex: one tab is in the tab order, ArrowLeft and ArrowRight move selection, Home and End jump to the ends, and disabled tabs are skipped with wrapping. The panel is labelled by its tab and is focusable.",
};

export const componentGroups: ComponentGroup[] = [
  { id: "actions", label: "Actions", items: [button, iconButton, link] },
  {
    id: "forms",
    label: "Forms",
    items: [
      textField,
      textArea,
      select,
      checkbox,
      radioGroup,
      switchControl,
      slider,
      searchField,
    ],
  },
  {
    id: "navigation",
    label: "Navigation",
    items: [segmentedControl, tabs],
  },
];

export const allComponents: ComponentDoc[] = componentGroups.flatMap(
  (group) => group.items,
);

export function findComponent(id: string): ComponentDoc | undefined {
  return allComponents.find((component) => component.id === id);
}
