import { LIVE, renderSections } from '../../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/tabs';
import { panel, PLANS, tabName, tabs } from './tab-panel.js';

const description = `
A single panel of a [Tabs](?path=/docs/blocks-tabs--docs) block. A Tab Panel is a section with a \`tab\` row in its section metadata, and shows only while its tab is selected.

- The Tabs block finds the sections on the page, or in its fragment, whose \`tab\` row names one of its tabs, and moves each into that tab's panel below the tab list, in page order. Sections with the same \`tab\` row share a panel.
- When the block has an \`id\`, the \`tab\` row holds the id and the tab's number, such as \`compare-plans, 2\`. Without one, it holds the tab's label. Labels match in lowercase, with spaces as hyphens and other punctuation removed.
- A section whose \`tab\` row names no tab stays where it is on the page
- A panel is as wide as the block, and the section's \`style\` and \`background\` apply inside it. \`container\` gives the section 24px of side padding below 768px and 8.333% of the block's width from 768px, with its content up to 1920px wide. \`spacing-xs-top\` adds 24px of padding above the section's content, 32px from 1280px.
- \`tab-background\` gives the panel's tab that background color when a reader selects it
- With the block's \`id\`, \`deeplink\` lets \`?<id>=<value>\` in the page's URL select the panel's tab
- \`link\` makes the panel's tab open that page instead
- The panel has the \`tabpanel\` role and its tab's label as its accessible name. In a \`radio\` block it has no role.
- This panel holds a Rich Content block. Its \`heading-5\` class sets the heading to \`heading-5\` size.
- Storybook shows the block with \`dark\` in the dark theme, because the block's white background doesn't follow the theme
`;

// The block the story shows the panel in. The block's white background stays white in the dark
// theme, so in that theme the block has `dark`, which removes it.
const block = (theme) => tabs({ ...PLANS, variants: theme === 'dark' ? ['dark'] : [] });

// The other two panels the story shows with this one.
const others = PLANS.tabs.slice(1).map((item, i) => panel({ ...item, tab: tabName(PLANS, i + 1), style: 'container, spacing-xs-top' }));

export default {
  title: 'Sections/Tab Panel',
  parameters: { cssprops, liveExamples: [LIVE.acrobat, LIVE.acrobatPlans, LIVE.pdfEssentials], docs: { description: { component: description } } },
  argTypes: {
    tab: { control: 'text', description: 'The `tab` row: the block\'s `id` and the tab\'s number, or the tab\'s label when the block has no `id`. Leave empty, or name no tab, and the section stays below the block.' },
    heading: { control: 'text', description: 'Heading of the Rich Content block, authored as an `h3`. Leave empty for none.' },
    body: { control: 'text', description: 'Body copy of the Rich Content block. Leave empty for none.' },
    style: { control: 'text', description: 'The section\'s style: classes separated by a comma and a space. Leave empty for none.' },
    background: { control: 'text', description: 'The section\'s background color. Leave empty for none.' },
  },
};

const { heading, body } = PLANS.tabs[0];

// The first panel of the Acrobat plans page's tabs, with the Acrobat Pro plan for individuals, in
// the block with the other two panels. Show code gives the panel's section.
export const Default = {
  render: (args, { globals }) => renderSections([block(globals.theme), panel(args), ...others].join('\n'), { foundation: 'c2' }),
  parameters: { docs: { source: { language: 'html', transform: (code, { args }) => panel(args) } } },
  args: { tab: tabName(PLANS, 0), heading, body, style: 'container, spacing-xs-top', background: '' },
};
