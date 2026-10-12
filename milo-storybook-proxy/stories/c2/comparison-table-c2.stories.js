import { LIVE, renderBlock } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/comparison-table-c2';
import variants from 'virtual:variants/c2/comparison-table-c2';
import { sectionMetadata } from './authored.js';
import { ACROBAT_PLANS, ACROBAT_TABLES, comparisonTable } from './sections/compare-plans.js';

const description = `
A table that compares plans feature by feature, authored as a header row with a heading and a card per plan, then tables separated by rows holding \`+++\`.

- Paragraphs holding only \`-\` split a card into parts: the plan's name as a heading, details such as a price, then links, bold for a filled button and italic for an outlined one
- After a table's heading row, each row holds a feature's name, then text or an icon per plan. An empty cell shows a dash.
- \`primary\` in a plan's cell of a table's heading row gives the plan's card a border
- \`static-header\` keeps the cards from sticking
- Underlined \`label | position | text\` in a feature's name shows a tooltip at the \`top\`, \`bottom\`, \`left\` or \`right\`
- Below 900px, the first two plans show, and with more, a menu on each card's heading switches its plan
- Clicking a table's heading expands or collapses it, and only the first starts expanded
- From 900px, the cards stick, and scrolling down while they're stuck shrinks them to their first part
- The cards fade out as the block's end scrolls up, except with reduced motion
`;

// Authored markup for the block from a story's args, followed by section metadata when `metadata`
// sets any.
const authored = (args, metadata) => [comparisonTable(args), sectionMetadata(metadata)].filter(Boolean).join('\n');

// A story that renders the block from its args. Show code gives the authored markup.
const blockStory = (metadata) => ({
  render: (args) => renderBlock(authored(args, metadata), { foundation: 'c2' }),
  parameters: { docs: { source: { language: 'html', transform: (code, { args }) => authored(args, metadata) } } },
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
      description: 'One card per plan, in order: a `label` and `title`, a `price` and its `priceNote`, and a link from `ctaLabel` and `ctaHref`.',
    },
    primary: { control: 'number', description: 'Number of the plan, from 1, whose card gets a border. Leave empty for none.' },
    tables: {
      control: 'object',
      description: 'One table each, in order: a `heading` and `rows`, each a `feature` name and `values`, one per plan: `true` for a checkmark, or text. Leave empty for none.',
    },
  },
};

// The first two of the Acrobat plans page's tables, with two rows in the first, so the block fits a
// 1280 × 720 window.
const [trusted, ai] = ACROBAT_TABLES;
const TABLES = [{ ...trusted, rows: [trusted.rows[0], trusted.rows[2]] }, ai];

// Plans and features from the Acrobat plans page, in the width of a container section, on the
// light gray background of the page's section, so the block reads in both themes.
export const Default = {
  ...blockStory({ style: 'container', background: '#f8f8f8' }),
  args: {
    variants: [],
    staticHeader: false,
    heading: 'Compare plans',
    body: '',
    plans: ACROBAT_PLANS,
    primary: 3,
    tables: TABLES,
  },
};
