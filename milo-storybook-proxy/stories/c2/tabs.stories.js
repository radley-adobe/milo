import { ACROBAT, CC_PRO_TEST_FRAGMENTS, LIVE, renderPageSections, renderSections } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/tabs';
import variants from 'virtual:variants/c2/tabs';
import { panel, PLANS, tabName, tabs } from './sections/tab-panel.js';

const description = `
A row of tabs that each show a [Tab Panel](?path=/docs/sections-tab-panel--docs). It's authored as a first row with a list of the tab labels, then one row per setting, and each panel is a section whose section metadata names its tab.

- Each setting's row holds its name and its value: \`id\`, \`active tab\`, \`pretext\` or \`remember\`
- The block finds the sections on the page, or in its fragment, whose \`tab\` row names one of its tabs, and moves each into that tab's panel, in page order. Sections with the same \`tab\` row share a panel. A section whose \`tab\` row names no tab stays where it is.
- Without an \`id\`, a section's \`tab\` row holds its tab's label. Labels match in lowercase, with spaces as hyphens and other punctuation removed.
- With an \`id\`, a section's \`tab\` row holds the id and the tab's number, such as \`compare-plans, 2\`. A panel can hold another Tabs block with its own \`id\` and panels, as on the Acrobat plans page.
- \`active tab\` is the tab that shows first: its number with an \`id\`, or its label without one. Otherwise the first tab shows.
- \`pretext\` is the tab list's accessible name
- \`remember\` set to \`on\` shows the tab last selected on the page again when the page reloads in the same browser tab
- With an \`id\`, \`?tab=<id>-<number>\` in the page's URL selects that tab, and \`?<id>=<value>\` selects the tab whose panel section has a \`deeplink\` row with that value
- By default, the tabs are 32px high on a rounded track tinted black at 4% opacity, and the selected tab is a black pill that slides to the next tab selected. The block adds \`pill\` for this style.
- \`quiet\` shows the tabs as text at \`heading-4\` size, 24px apart, with a blue line under the selected tab
- \`radio\` shows a radio button for each tab, 16px apart, in a rounded light gray bar. A paragraph above the list shows at the start of the bar and names the group. Without one, \`pretext\` names it.
- \`dark\` gives the block Milo's dark colors, for a black section: a dark gray track or bar, and a white selected pill or radio button
- \`center\` centers the tab list from 768px, and \`right\` aligns it to the right. With \`quiet\`, \`center\` centers it below 768px too.
- The tab list scrolls sideways when its tabs don't fit. Selecting or focusing a tab scrolls it into view.
- The block has a white background, apart from \`quiet\`, \`radio\` and \`dark\` pills. \`background-transparent\` removes it.
- \`staggered-intro-merch-cards\` fades the merch cards in the shown panel in and moves them up into place, one after another, 0.1s apart, when the page loads and when a tab is selected. With reduced motion, nothing moves.
- The tab list has the \`tablist\` role, and each panel the \`tabpanel\` role, named by its tab. The left and right arrow keys move focus between the tabs, in reverse on a right-to-left page, and Enter or Space selects one. With \`radio\`, the list is a \`radiogroup\` and the arrow keys select the next or previous tab.
- Selecting a tab sends a \`milo:tab:changed\` event, which the Actions tab logs
- The block adds \`tablist-<id>-section\` to its section, where \`<id>\` is its \`id\`, or its number among the page's Tabs blocks
- A panel section's \`tab-background\` row gives its tab that background color when a reader selects it. A \`link\` row makes the tab open that page instead.
`;

// Authored markup for the block's section, with the section metadata settings in `metadata`, and
// one panel section per tab, each with the settings in `panelMetadata`.
const authored = (args, metadata, panelMetadata) => [
  tabs(args, metadata),
  ...(args.tabs ?? []).map((item, i) => panel({ ...item, tab: tabName(args, i), ...panelMetadata })),
].join('\n');

// A story that renders the block and its panels from its args. Show code gives the authored
// markup.
const tabsStory = (metadata, panelMetadata) => ({
  render: (args) => renderSections(authored(args, metadata, panelMetadata), { foundation: 'c2' }),
  parameters: { docs: { source: { language: 'html', transform: (code, { args }) => authored(args, metadata, panelMetadata) } } },
});

// The section metadata of the light stories: none for the block's section, which has no container
// on the Acrobat plans page either, and each panel 24px below the tab list, 32px from 1280px.
const LIGHT = [{}, { style: 'spacing-xs-top' }];

export default {
  title: 'Blocks/Tabs',
  parameters: { cssprops, liveExamples: [LIVE.acrobat, LIVE.acrobatPlans, LIVE.pdfEssentials], docs: { description: { component: description } } },
  argTypes: {
    // tabs.css nests its variants in `.tabs`, as `&.quiet`, and the Variants control lists only
    // the classes of selectors such as `.tabs.staggered-intro-merch-cards`, so this adds the
    // nested ones. `pill` is left out, because the block adds or removes it itself.
    variants: { ...variants, options: [...new Set([...variants.options, 'background-transparent', 'center', 'dark', 'quiet', 'radio', 'right'])].sort() },
    tabs: {
      control: 'object',
      description: 'One tab each, in order: its `label`, and the `heading` and `body` of the Rich Content block in its panel section. Leave `heading` and `body` empty for an empty panel.',
    },
    radioLabel: { control: 'text', description: 'Label before the radio buttons, authored as a paragraph above the list. Only `radio` shows it. Leave empty for none.' },
    id: { control: 'text', description: 'Authored in an `id` row. Each panel section\'s `tab` row then holds the id and the tab\'s number. Leave empty to match each panel to its tab by label.' },
    activeTab: { control: { type: 'number', min: 1 }, description: 'Number of the tab that shows first, authored in an `active tab` row as the number with an `id`, or as the tab\'s label without one. Leave empty for the first tab.' },
    pretext: { control: 'text', description: 'Accessible name of the tab list, authored in a `pretext` row. Leave empty for none.' },
  },
};

// The Acrobat plans page's tabs, one per audience, with each panel's Acrobat Pro plan. The tabs
// are pills, the block's default.
export const Default = {
  ...tabsStory(...LIGHT),
  args: { variants: [], ...PLANS },
};

// The same tabs as text, as the Acrobat plans page shows them.
export const Quiet = {
  ...tabsStory(...LIGHT),
  args: { ...Default.args, variants: ['quiet'] },
};

// The same tabs as radio buttons, with the label the Acrobat plans page gives its billing
// options.
export const Radio = {
  ...tabsStory(...LIGHT),
  args: { ...Default.args, variants: ['radio'], radioLabel: 'Choose your plan:' },
};

// The same tabs in a dark section with a black background, as on the Creative Cloud Pro product
// page. The section's dark colors apply to its panels too. A container keeps the text off the
// background's edges.
export const Dark = {
  ...tabsStory({ style: 'container, dark, spacing-sm', background: '#000' }, { style: 'spacing-xs-top' }),
  args: { ...Default.args, variants: ['dark'] },
};

// The same tabs, centered from 768px.
export const Center = {
  ...tabsStory(...LIGHT),
  args: { ...Default.args, variants: ['center'] },
};

// The same tabs, aligned to the right from 768px.
export const Right = {
  ...tabsStory(...LIGHT),
  args: { ...Default.args, variants: ['right'] },
};

// The tabs and their panels, which are the sections after them. Each panel of the first tabs
// holds a second tabs block and its panels.
export const AcrobatPlans = {
  name: 'adobe.com: Acrobat plans',
  render: () => renderPageSections(`${ACROBAT}/plans`, 'tabs', { count: 11, foundation: 'c2' }),
  parameters: { controls: { include: ['variants'] } },
};

export const CreativeCloudProProduct = {
  name: 'adobe.com: Creative Cloud Pro product',
  render: () => renderPageSections(`${CC_PRO_TEST_FRAGMENTS}/cpro-product`, 'tabs', { count: 4, foundation: 'c2' }),
  parameters: { controls: { include: ['variants'] } },
};
