import { ACROBAT, CC_PRO_TEST_FRAGMENTS, LIVE, renderPageSections, renderSections } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/tabs';
import variants from 'virtual:variants/c2/tabs';
import { panel, PLANS, tabName, tabs } from './sections/tab-panel.js';

const description = `
A row of tabs that each show a [Tab Panel](?path=/docs/sections-tab-panel--docs). It's authored as one row with a list of tab labels, then one row per setting with its name and value.

- Each panel holds the sections whose section metadata has a \`tab\` row naming its tab: the label, or, when the block has an \`id\`, the id and the tab's number, such as \`compare-plans, 2\`
- With an \`id\`, \`?tab=<id>-<number>\` in the URL selects that tab
- \`active tab\` sets the tab shown first: its number with an \`id\`, or its label without one
- \`pretext\` is the tab list's accessible name. With \`radio\`, a paragraph above the list takes its place.
- \`remember\` set to \`on\` keeps the selected tab across reloads in the same browser tab
- By default, the selected tab is a pill that slides to the next tab selected
- \`quiet\` shows the tabs as \`heading-4\` text, underlining the selected tab
- \`radio\` shows a radio button for each tab, after any paragraph above the list
- \`dark\` styles the block for a dark section
- \`center\` centers the tab list from 768px
- \`right\` aligns the tab list right from 768px
- \`background-transparent\` removes the block's background
- \`staggered-intro-merch-cards\` fades in and moves up the merch cards of each panel as it shows, the first eight one after another. With reduced motion, nothing moves.
- A tab list that doesn't fit scrolls sideways. \`quiet\` and \`radio\` lists scroll only below 768px.
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
// on the Acrobat plans page either, and for each panel a container, as the sections in the Acrobat
// plans page's panels have, with 24px of padding above its content, 32px from 1280px.
const LIGHT = [{}, { style: 'container, spacing-xs-top' }];

export default {
  title: 'Blocks/Tabs',
  parameters: { cssprops, liveExamples: [LIVE.acrobat, LIVE.acrobatPlans, LIVE.pdfEssentials], docs: { description: { component: description } } },
  argTypes: {
    // `pill` is left out, because the block adds or removes it itself.
    variants: { ...variants, options: variants.options.filter((name) => name !== 'pill') },
    tabs: {
      control: 'object',
      description: 'One tab each, in order: its `label`, and the `heading` and `body` of the Rich Content block in its panel section',
    },
    radioLabel: { control: 'text', description: 'Label before the radio buttons, authored as a paragraph above the list. Leave empty for none.' },
    id: { control: 'text', description: 'Value of the `id` row. Leave empty for none.' },
    activeTab: { control: { type: 'number', min: 1 }, description: 'Number of the tab that shows first (`active tab`)' },
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

// The same tabs on a black background, authored as on the Creative Cloud Pro product page: the
// block's section and each panel section have a black background, and each panel section the
// `dark` style. `spacing-sm`, which the page's block section doesn't have, holds the tab list and
// the panels off the background's top and bottom edges. Each panel's container keeps its text off
// the sides, as in the light stories.
export const Dark = {
  ...tabsStory({ style: 'spacing-sm', background: '#000' }, { style: 'container, spacing-xs-top, dark', background: '#000' }),
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

// The same tabs in a section with a light gray background, which shows behind the tabs in place of
// the block's white background.
export const BackgroundTransparent = {
  ...tabsStory({ background: '#f8f8f8' }, LIGHT[1]),
  args: { ...Default.args, variants: ['background-transparent'] },
};

// The tabs and their panels, which are the sections after them. Each panel of the first tabs
// holds a second tabs block and its panels.
export const AcrobatPlans = {
  name: 'adobe.com: Acrobat plans',
  render: () => renderPageSections(`${ACROBAT}/plans`, 'tabs', { count: 11, foundation: 'c2' }),
  parameters: { controls: { include: ['variants'] } },
};

export const CreativeCloudProProduct = {
  name: 'Redesign test: Creative Cloud Pro product',
  render: () => renderPageSections(`${CC_PRO_TEST_FRAGMENTS}/cpro-product`, 'tabs', { count: 4, foundation: 'c2' }),
  parameters: { controls: { include: ['variants'] } },
};
