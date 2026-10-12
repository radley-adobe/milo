import { LIVE, renderBlock } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/comparison-table-c2';
import variants from 'virtual:variants/c2/comparison-table-c2';
import { sectionMetadata } from './authored.js';
import { ACROBAT_PLANS, ACROBAT_TABLES, comparisonTable } from './sections/compare-plans.js';

const description = `
A table that compares plans feature by feature. It's authored as a header row with a column for each plan, then the features in tables separated by rows holding \`+++\`.

- The header row's first cell holds a heading, shown at \`heading-4\` size, and an optional paragraph. Each other cell is a plan's card. An empty cell is removed.
- Paragraphs holding only \`-\` split a plan's cell into parts. In the first part, a heading shows at \`heading-5\` size, a bold paragraph at \`heading-4\` size, and a paragraph with no italics, link or image as a gray label. The last part holds the plan's links, and the parts between them hold details such as a price.
- In a plan's third part, a bold link shows as a large filled blue button and an italic link as a large outlined button. The first paragraph without a button shows above them in label size.
- \`primary\` in a plan's cell of a table's first row gives that plan's card a border in \`--s2a-color-border-knockout\`, black in the light theme and white in the dark one, and makes its label black
- Each table's first row is its heading, a button that expands and collapses the table. The first table starts expanded and the others collapsed.
- Every other row is a feature: its name, then one cell per plan. A cell holds text or an icon, such as a checkmark. An empty cell shows a dash.
- In a feature's name, underlined text authored as \`label | position | text\` shows the label with a dotted underline and a tooltip of the text on hover or focus. The position is \`top\`, \`bottom\`, \`left\` or \`right\`. Without one, the tooltip shows at the right from 900px and below the label under 900px. Underlined text with no tooltip text gets only the dotted underline.
- From 900px, the plan cards sit in a row to the right of the heading, and every feature row lines up below them: the name in the first column and each plan's value below its card. Columns are at least 100px wide and 16px apart. The cards have 16px of padding, 24px from 1440px.
- From 900px, the cards stick 24px below the global navigation as the page scrolls. Scrolling down while they're stuck shrinks each card to its first part, and scrolling up shows the rest again.
- \`static-header\` turns the sticking and shrinking off, so the cards scroll with the page
- Below 900px, the cards sit in two columns above the tables, each row shows the feature's name above two values, and only the first two plans show. With more than two plans, each card's heading opens a menu that chooses the plan its column shows.
- In browsers with scroll-driven animations, the cards fade out as the end of the block scrolls up the window, unless reduced motion is set
- The cards are white and the text dark in either theme and in a \`dark\` section, so the block needs a light background
- Each table has the \`table\` role, with a hidden first row of column headers named after the plans. Screen readers hear the \`primary-feature\` placeholder for a checkmark and \`not-a-feature\` for an empty cell.
- The block has 40px of padding above and below, 80px from 900px. It doesn't change its section.
`;

// Authored markup for the block from a story's args, followed by section metadata when `style`
// sets the section's style.
const authored = (args, style) => [comparisonTable(args), sectionMetadata({ style })].filter(Boolean).join('\n');

// A story that renders the block from its args. Show code gives the authored markup.
const blockStory = (style) => ({
  render: (args) => renderBlock(authored(args, style), { foundation: 'c2' }),
  parameters: { docs: { source: { language: 'html', transform: (code, { args }) => authored(args, style) } } },
});

export default {
  title: 'Blocks/Comparison Table C2',
  parameters: { cssprops, liveExamples: [LIVE.acrobatPlans], docs: { description: { component: description } } },
  argTypes: {
    variants,
    staticHeader: { control: 'boolean', description: 'Let the cards scroll with the page instead of sticking and shrinking (`static-header`)' },
    heading: { control: 'text', description: 'Heading in the header row\'s first cell, authored as an `h2`. Leave empty for none.' },
    body: { control: 'text', description: 'Paragraph below the heading. Leave empty for none.' },
    plans: {
      control: 'object',
      description: 'One plan card each, in order: a `label` above its `title`, a `price` in bold and its `priceNote`, and a bold link from `ctaLabel` and `ctaHref`. Leave a value empty to leave it out. Below 900px, the first two show, and with more than two, each card\'s heading chooses the plan it shows.',
    },
    primary: { control: 'number', description: 'Number of the plan, from 1, whose card gets a black border. Leave empty for none.' },
    tables: {
      control: 'object',
      description: 'One table each, in order: a `heading`, and `rows`, each a `feature` name and `values`, one per plan: `true` for a checkmark, text, or empty for a dash. A feature name can hold a tooltip as `<u>label | right | text</u>`. Leave `tables` empty for none.',
    },
  },
};

// Plans and features from the Acrobat plans page, in the width of a container section.
export const Default = {
  ...blockStory('container'),
  args: {
    variants: [],
    staticHeader: false,
    heading: 'Compare plans',
    body: '',
    plans: ACROBAT_PLANS,
    primary: 3,
    tables: ACROBAT_TABLES,
  },
};
