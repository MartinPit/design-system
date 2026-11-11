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
import * as BreadcrumbDemo from "./demos/BreadcrumbDemo";
import * as PaginationDemo from "./demos/PaginationDemo";
import * as CardDemo from "./demos/CardDemo";
import * as BadgeDemo from "./demos/BadgeDemo";
import * as TagDemo from "./demos/TagDemo";
import * as AvatarDemo from "./demos/AvatarDemo";
import * as TableDemo from "./demos/TableDemo";
import * as ProgressDemo from "./demos/ProgressDemo";
import * as SkeletonDemo from "./demos/SkeletonDemo";
import * as EmptyStateDemo from "./demos/EmptyStateDemo";
import * as TooltipDemo from "./demos/TooltipDemo";
import * as DialogDemo from "./demos/DialogDemo";
import * as DropdownMenuDemo from "./demos/DropdownMenuDemo";
import * as ToastDemo from "./demos/ToastDemo";

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

const breadcrumb: ComponentDoc = {
  id: "breadcrumb",
  name: "Breadcrumb",
  group: "Navigation",
  job: "Show depth inside the deck: collection, deck, card.",
  Demo: BreadcrumbDemo.Demo,
  Variants: BreadcrumbDemo.Variants,
  States: BreadcrumbDemo.States,
  props: [
    {
      name: "items",
      type: "BreadcrumbItem[]",
      default: "—",
      description: "Label plus optional href; the last item is the current page.",
    },
    {
      name: "collapsed",
      type: "boolean",
      default: "false",
      description: "Keeps the first and last item and hides the middle behind an ellipsis.",
    },
    {
      name: "label",
      type: "string",
      default: '"Breadcrumb"',
      description: "Accessible name of the navigation landmark.",
    },
  ],
  dos: [
    "Keep the current page as plain text with aria-current, not a link to itself.",
    "Collapse long trails at the middle and keep the deck and the current card.",
  ],
  donts: [
    "Don't use a breadcrumb for a flat list of filters; use Tags.",
    "Don't make the separator part of the link text.",
  ],
  a11y:
    "The trail is a labelled nav with an ordered list. The final item is marked aria-current=\"page\" and separators are aria-hidden. A collapsed trail announces the number of hidden items to screen readers.",
};

const pagination: ComponentDoc = {
  id: "pagination",
  name: "Pagination",
  group: "Navigation",
  job: "Move through a long card list without losing the page context.",
  Demo: PaginationDemo.Demo,
  Variants: PaginationDemo.Variants,
  States: PaginationDemo.States,
  props: [
    {
      name: "page",
      type: "number",
      default: "—",
      description: "The current page, one-based.",
    },
    {
      name: "pageCount",
      type: "number",
      default: "—",
      description: "Total pages. First and last are always reachable.",
    },
    {
      name: "onPageChange",
      type: "(page: number) => void",
      default: "—",
      description: "Runs from a page button or the previous/next controls.",
    },
    {
      name: "variant",
      type: '"numbered" | "compact"',
      default: '"numbered"',
      description: "Numbered pages for a table; compact for a narrow deck view.",
    },
    {
      name: "size",
      type: '"sm" | "md"',
      default: '"md"',
      description: "Control height; the numbered buttons stay circular.",
    },
  ],
  dos: [
    "Keep previous and next available at the boundaries as disabled controls.",
    "Mark the current page with aria-current and a filled pill.",
  ],
  donts: [
    "Don't hide the page count when the user is deep in a list.",
    "Don't reset scroll without moving focus to the new page's first item.",
  ],
  a11y:
    "Pagination is a labelled nav. Every page button has a name such as \"Page 3\"; the current page adds aria-current=\"page\". Disabled boundary controls stay visible so the range is legible.",
};

const card: ComponentDoc = {
  id: "card",
  name: "Card",
  group: "Display",
  job: "Show a deck or a study card as one collectable surface.",
  Demo: CardDemo.Demo,
  Variants: CardDemo.Variants,
  States: CardDemo.States,
  props: [
    {
      name: "variant",
      type: '"flat" | "raised" | "interactive" | "selected"',
      default: '"flat"',
      description: "Surface depth and selection state.",
    },
    {
      name: "size",
      type: '"sm" | "md" | "lg"',
      default: '"md"',
      description: "Padding and internal rhythm.",
    },
    {
      name: "interactive",
      type: "boolean",
      default: "false",
      description: "Adds button semantics, Enter/Space activation and a focus ring.",
    },
    {
      name: "onActivate",
      type: "() => void",
      default: "—",
      description: "Runs when an interactive card is clicked or activated by key.",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Keeps an interactive card visible but removes activation.",
    },
  ],
  dos: [
    "Use one interactive card per row when the whole surface opens a deck.",
    "Keep the deck name, due count and recall in the same visual order.",
  ],
  donts: [
    "Don't nest a button inside an interactive card without a clear target.",
    "Don't use the selected border as the only selected cue; add a state label.",
  ],
  a11y:
    "An interactive card is a keyboard-focusable button with Enter and Space activation; a disabled card keeps aria-disabled and leaves the tab order. The surface itself is not a link, so the action is explicit.",
};

const badge: ComponentDoc = {
  id: "badge",
  name: "Badge",
  group: "Display",
  job: "Mark a due count, recall figure or status without offering an action.",
  Demo: BadgeDemo.Demo,
  Variants: BadgeDemo.Variants,
  States: BadgeDemo.States,
  props: [
    {
      name: "variant",
      type: '"neutral" | "accent" | "success" | "warning" | "danger"',
      default: '"neutral"',
      description: "Semantic tone; the label carries the meaning, not colour alone.",
    },
    {
      name: "size",
      type: '"sm" | "md"',
      default: '"md"',
      description: "Type and padding step.",
    },
    {
      name: "children",
      type: "ReactNode",
      default: "—",
      description: "The value or status: 142 due, 98% recall, Archived.",
    },
  ],
  dos: [
    "Write the count into the badge so it survives a greyscale print.",
    "Keep neutral for archive and metadata, danger for failure only.",
  ],
  donts: [
    "Don't put a dismiss control in a Badge; use a removable Tag.",
    "Don't use a badge as a button.",
  ],
  a11y:
    "A badge is static text with no role. Colour is never the only carrier: the visible label says 142 due, 98% recall or Sync failed. Tone pairs are chosen to clear AA on the dark panel.",
};

const tag: ComponentDoc = {
  id: "tag",
  name: "Tag",
  group: "Display",
  job: "Label a deck or act as a removable filter.",
  Demo: TagDemo.Demo,
  Variants: TagDemo.Variants,
  States: TagDemo.States,
  props: [
    {
      name: "variant",
      type: '"static" | "removable"',
      default: '"static"',
      description: "Static label, or a tag with a remove control.",
    },
    {
      name: "size",
      type: '"sm" | "md"',
      default: '"md"',
      description: "Pill height and type step.",
    },
    {
      name: "onRemove",
      type: "() => void",
      default: "—",
      description: "Runs from the remove control; makes the tag removable.",
    },
    {
      name: "removeLabel",
      type: "string",
      default: '"Remove tag"',
      description: "Accessible name for the remove control, e.g. Remove Kanji N3.",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Keeps the filter visible but removes the remove control.",
    },
  ],
  dos: [
    "Name the removed filter in the remove control: Remove Kanji N3.",
    "Keep the tag text short enough to scan in a filter row.",
  ],
  donts: [
    "Don't use a tag for a commit action such as Start session.",
    "Don't remove the only indication that a filter is active.",
  ],
  a11y:
    "The tag text is readable; the remove control is a button with an explicit accessible name such as \"Remove Kanji N3\". Disabled tags keep their label but remove the control from the tab order.",
};

const avatar: ComponentDoc = {
  id: "avatar",
  name: "Avatar",
  group: "Display",
  job: "Show a learner or deck owner, with initials when no portrait exists.",
  Demo: AvatarDemo.Demo,
  Variants: AvatarDemo.Variants,
  States: AvatarDemo.States,
  props: [
    {
      name: "name",
      type: "string",
      default: "—",
      description: "The person's name; used for alt text, initials and the button label.",
    },
    {
      name: "src",
      type: "string",
      default: "—",
      description: "Optional portrait. A load failure falls back to initials.",
    },
    {
      name: "size",
      type: '"xs" | "sm" | "md" | "lg"',
      default: '"md"',
      description: "24, 32, 40 or 56 pixels.",
    },
    {
      name: "interactive",
      type: "boolean",
      default: "false",
      description: "Renders a real button with the person's name as its label.",
    },
    {
      name: "onClick",
      type: "() => void",
      default: "—",
      description: "Runs when an interactive avatar is activated.",
    },
  ],
  dos: [
    "Keep the height and width equal so initials never stretch the circle.",
    "Use the name for both the image alternative and the initials fallback.",
  ],
  donts: [
    "Don't use a decorative avatar as the only way to identify a person in text.",
    "Don't place an interactive avatar inside another interactive surface.",
  ],
  a11y:
    "A portrait uses the person's name as alt text. The initials fallback is role=\"img\" with the same name. An interactive avatar is a button with that name and the dual-band focus ring.",
};

const table: ComponentDoc = {
  id: "table",
  name: "Table",
  group: "Display",
  job: "Show study history and card lists with sortable columns and row selection.",
  Demo: TableDemo.Demo,
  Variants: TableDemo.Variants,
  States: TableDemo.States,
  props: [
    {
      name: "columns",
      type: "TableColumn[]",
      default: "—",
      description: "Key, header, optional sortable and alignment.",
    },
    {
      name: "rows",
      type: "TableRow[]",
      default: "—",
      description: "Records of cell content keyed by column.",
    },
    {
      name: "getRowId",
      type: "(row, index) => string",
      default: "—",
      description: "Stable id for selection and hover previews.",
    },
    {
      name: "getRowLabel",
      type: "(row, index) => string",
      default: "row id",
      description: "Names the row in the selection checkbox.",
    },
    {
      name: "sort / onSortChange",
      type: "TableSort | null / (sort) => void",
      default: "null",
      description: "Controlled sort state; the parent owns the row order.",
    },
    {
      name: "selectable / selectedIds / onSelectionChange",
      type: "boolean / string[] / (ids) => void",
      default: "false / —",
      description: "Row checkboxes with a select-all header.",
    },
    {
      name: "loading",
      type: "boolean",
      default: "false",
      description: "Sets aria-busy and renders skeleton rows.",
    },
    {
      name: "emptyMessage",
      type: "string",
      default: '"No cards to show."',
      description: "Shown when the row set is empty and not loading.",
    },
  ],
  dos: [
    "Keep the row order owned by the caller so sort and filter agree.",
    "Use a real caption, even when it is visually hidden.",
  ],
  donts: [
    "Don't sort a column without announcing the direction with aria-sort.",
    "Don't put an action menu behind a row click that also selects the row.",
  ],
  a11y:
    "The table uses a caption, scope=\"col\" headers and aria-sort on sortable columns. Every row checkbox is named for its card, the header checkbox reports indeterminate, and loading sets aria-busy. The table scrolls inside its own box.",
};

const progress: ComponentDoc = {
  id: "progress",
  name: "Progress",
  group: "Display",
  job: "Show session recall, daily goal or sync progress.",
  Demo: ProgressDemo.Demo,
  Variants: ProgressDemo.Variants,
  States: ProgressDemo.States,
  props: [
    {
      name: "label",
      type: "string",
      default: "—",
      description: "Visible label and accessible name of the progressbar.",
    },
    {
      name: "value",
      type: "number",
      default: "0",
      description: "Zero to one hundred; ignored visually when indeterminate.",
    },
    {
      name: "variant",
      type: '"bar" | "ring"',
      default: '"bar"',
      description: "A bar for a goal, a ring for a session figure.",
    },
    {
      name: "size",
      type: '"sm" | "md" | "lg"',
      default: '"md"',
      description: "Track height or ring diameter.",
    },
    {
      name: "indeterminate",
      type: "boolean",
      default: "false",
      description: "Loading state with no numeric value.",
    },
    {
      name: "showValue",
      type: "boolean",
      default: "true",
      description: "Shows the percentage beside the label.",
    },
  ],
  dos: [
    "Use determinate progress when the total is known; 142 of 142.",
    "Use the ring for a single session figure and the bar for a goal.",
  ],
  donts: [
    "Don't set aria-valuenow on an indeterminate progressbar.",
    "Don't animate the fill forever when the value is known.",
  ],
  a11y:
    "The control is role=\"progressbar\" with min 0 and max 100. aria-valuenow appears only when determinate; an indeterminate bar omits it by design. Both animations stop under reduced motion.",
};

const skeleton: ComponentDoc = {
  id: "skeleton",
  name: "Skeleton",
  group: "Display",
  job: "Hold the shape of a deck or a card while it loads.",
  Demo: SkeletonDemo.Demo,
  Variants: SkeletonDemo.Variants,
  States: SkeletonDemo.States,
  props: [
    {
      name: "variant",
      type: '"text" | "block" | "circle"',
      default: '"text"',
      description: "Line, block or avatar-shaped placeholder.",
    },
    {
      name: "size",
      type: '"sm" | "md"',
      default: '"md"',
      description: "Height and circle diameter.",
    },
    {
      name: "lines",
      type: "number",
      default: "1",
      description: "Number of text lines; the last line is shorter.",
    },
    {
      name: "width",
      type: "string",
      default: "100%",
      description: "One-off width for a text line.",
    },
    {
      name: "animated",
      type: "boolean",
      default: "true",
      description: "Set false for a static placeholder; reduced motion also stops the shimmer.",
    },
  ],
  dos: [
    "Match the skeleton to the real layout so content does not jump when it arrives.",
    "Pair the skeleton with a status message or a busy region elsewhere.",
  ],
  donts: [
    "Don't expose a skeleton to assistive technology as content.",
    "Don't use a skeleton for a long wait you could name.",
  ],
  a11y:
    "Every skeleton is aria-hidden. It is a visual placeholder only; loading state must be announced by a status region or aria-busy on the region that owns the content. Under reduced motion the shimmer becomes a static tint.",
};

const emptyState: ComponentDoc = {
  id: "empty-state",
  name: "EmptyState",
  group: "Display",
  job: "Explain an empty deck or a search with no results and offer one next step.",
  Demo: EmptyStateDemo.Demo,
  Variants: EmptyStateDemo.Variants,
  States: EmptyStateDemo.States,
  props: [
    {
      name: "title",
      type: "string",
      default: "—",
      description: "Names the empty condition, not the absence of a component.",
    },
    {
      name: "description",
      type: "string",
      default: "—",
      description: "What happened and when the next review is.",
    },
    {
      name: "action",
      type: "ReactNode",
      default: "—",
      description: "One real button or link; omit when there is no useful next step.",
    },
  ],
  dos: [
    "Use a specific title: No cards due, not Nothing here.",
    "Offer one next step that fits the condition.",
  ],
  donts: [
    "Don't stack two actions in an empty state.",
    "Don't use an empty state for an error; say what failed and how to retry.",
  ],
  a11y:
    "The title is a heading so it lands in the page outline. The action is a real button or link. The seigaiha mark is decorative and hidden from assistive technology.",
};

const tooltip: ComponentDoc = {
  id: "tooltip",
  name: "Tooltip",
  group: "Overlay",
  job: "Explain an icon or a shortened label without taking focus.",
  Demo: TooltipDemo.Demo,
  Variants: TooltipDemo.Variants,
  States: TooltipDemo.States,
  props: [
    {
      name: "label",
      type: "string",
      default: "—",
      description: "The explanation; it also becomes the description of the trigger.",
    },
    {
      name: "children",
      type: "ReactElement",
      default: "—",
      description: "The trigger element; focus and hover travel through it.",
    },
    {
      name: "placement",
      type: '"top" | "bottom" | "left" | "right"',
      default: '"top"',
      description: "Where the tooltip sits relative to the trigger.",
    },
    {
      name: "size",
      type: '"sm"',
      default: '"sm"',
      description: "Type and padding step.",
    },
  ],
  dos: [
    "Use a tooltip to explain an icon whose label is already present.",
    "Keep the text short; a tooltip is not a help panel.",
  ],
  donts: [
    "Don't put interactive content inside a tooltip.",
    "Don't make a tooltip the only way to learn a required control's name.",
  ],
  a11y:
    "The trigger receives aria-describedby while the tooltip is visible. Hover and focus both open it; Escape dismisses it without moving focus, and the next focus reopens it. The tooltip is never focusable.",
};

const dialog: ComponentDoc = {
  id: "dialog",
  name: "Dialog",
  group: "Overlay",
  job: "Confirm a destructive action or rename a deck without leaving the page.",
  Demo: DialogDemo.Demo,
  Variants: DialogDemo.Variants,
  States: DialogDemo.States,
  props: [
    {
      name: "open",
      type: "boolean",
      default: "false",
      description: "Controlled visibility; the trigger owns the state.",
    },
    {
      name: "onClose",
      type: "() => void",
      default: "—",
      description: "Escape, the close control and the scrim call it.",
    },
    {
      name: "title",
      type: "string",
      default: "—",
      description: "The accessible name of the dialog.",
    },
    {
      name: "description",
      type: "string",
      default: "—",
      description: "The consequence; linked with aria-describedby.",
    },
    {
      name: "footer",
      type: "ReactNode",
      default: "—",
      description: "Usually a secondary cancel and one primary or danger action.",
    },
    {
      name: "size",
      type: '"sm" | "md"',
      default: '"md"',
      description: "24rem or 34rem maximum width.",
    },
    {
      name: "closeLabel",
      type: "string",
      default: '"Close dialog"',
      description: "Accessible name of the close control.",
    },
  ],
  dos: [
    "Name the object and the consequence in the title and description.",
    "Keep the trigger mounted so focus can return to it.",
  ],
  donts: [
    "Don't stack a second dialog on top of the first.",
    "Don't use a dialog for a short confirmation that a toast can carry.",
  ],
  a11y:
    "The dialog is role=\"dialog\" with aria-modal and a labelled title. Focus moves to the first control, Tab is trapped and wraps, Escape closes, body scroll locks, and focus returns to the trigger. The scrim closes on pointer down outside the surface.",
};

const dropdown: ComponentDoc = {
  id: "dropdown-menu",
  name: "DropdownMenu",
  group: "Overlay",
  job: "Hold row actions: edit, duplicate, archive, delete.",
  Demo: DropdownMenuDemo.Demo,
  Variants: DropdownMenuDemo.Variants,
  States: DropdownMenuDemo.States,
  props: [
    {
      name: "label",
      type: "string",
      default: "—",
      description: "Accessible name of the icon trigger and the menu.",
    },
    {
      name: "items",
      type: "DropdownMenuItem[]",
      default: "—",
      description: "Label, callback, disabled, danger and separator flags.",
    },
    {
      name: "align",
      type: '"start" | "end"',
      default: '"end"',
      description: "Which edge of the trigger the menu aligns to.",
    },
    {
      name: "open / defaultOpen / onOpenChange",
      type: "boolean / boolean / (open) => void",
      default: "false",
      description: "Controlled or uncontrolled visibility for tests and specimens.",
    },
  ],
  dos: [
    "Use a menu for three or more related actions; two can stay inline.",
    "Put the destructive item last, after a separator, in danger colour.",
  ],
  donts: [
    "Don't put a form field inside a dropdown menu.",
    "Don't use a menu for navigation; use links.",
  ],
  a11y:
    "The trigger is a button with aria-haspopup=\"menu\" and aria-expanded. Opening focuses the first item; ArrowDown and ArrowUp move, Home and End jump, disabled items are skipped, Escape closes and returns focus to the trigger. Selection also returns focus.",
};

const toast: ComponentDoc = {
  id: "toast",
  name: "Toast",
  group: "Overlay",
  job: "Confirm a save or report a failed sync without interrupting the study flow.",
  Demo: ToastDemo.Demo,
  Variants: ToastDemo.Variants,
  States: ToastDemo.States,
  props: [
    {
      name: "open",
      type: "boolean",
      default: "false",
      description: "Controlled visibility; the caller owns the queue.",
    },
    {
      name: "message",
      type: "ReactNode",
      default: "—",
      description: "What happened, in one sentence.",
    },
    {
      name: "variant",
      type: '"success" | "danger" | "info"',
      default: '"info"',
      description: "Tone and icon; danger is a failed sync, not a validation error.",
    },
    {
      name: "onDismiss",
      type: "() => void",
      default: "—",
      description: "Runs from the dismiss control or the auto-dismiss timer.",
    },
    {
      name: "duration",
      type: "number",
      default: "6000",
      description: "Auto-dismiss delay in milliseconds; zero keeps it open.",
    },
    {
      name: "paused",
      type: "boolean",
      default: "false",
      description: "Freezes the timer; hover and focus also pause it.",
    },
    {
      name: "action",
      type: "ReactNode",
      default: "—",
      description: "One optional action such as Undo.",
    },
  ],
  dos: [
    "Keep the toast to one sentence and one optional action.",
    "Let hover and focus pause the timer; the user is reading it.",
  ],
  donts: [
    "Don't use a toast for an error that needs a decision; use a dialog.",
    "Don't stack more than three toasts.",
  ],
  a11y:
    "The toast is role=\"status\" with aria-live=\"polite\". Hover and focus pause the timer, the dismiss control is named \"Dismiss notification\", and the message never takes focus away from the card being studied.",
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
    items: [segmentedControl, tabs, breadcrumb, pagination],
  },
  {
    id: "display",
    label: "Display",
    items: [
      card,
      badge,
      tag,
      avatar,
      table,
      progress,
      skeleton,
      emptyState,
    ],
  },
  {
    id: "overlay",
    label: "Overlay",
    items: [tooltip, dialog, dropdown, toast],
  },
];

export const allComponents: ComponentDoc[] = componentGroups.flatMap(
  (group) => group.items,
);

export function findComponent(id: string): ComponentDoc | undefined {
  return allComponents.find((component) => component.id === id);
}
