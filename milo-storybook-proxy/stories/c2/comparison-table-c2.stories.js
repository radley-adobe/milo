import { LIVE, renderBlock } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/comparison-table-c2';
import variants from 'virtual:variants/c2/comparison-table-c2';
import { sectionMetadata } from './authored.js';
import { ACROBAT_PLANS, ACROBAT_TABLES, comparisonTable } from './sections/compare-plans.js';

const description = `
A table that compares plans feature by feature. It's authored as a header row with a column for each plan, then the features in tables separated by rows holding \`+++\`.

- The header row's first cell holds a heading and an optional paragraph. Each other cell is a plan's card.
- Paragraphs holding only \`-\` split a plan's cell into parts. In the first part, a heading is the plan's name, a plain paragraph shows as a label and a bold paragraph shows larger. The last part holds the plan's links, and the parts between them details such as a price.
- In a plan's last part, a bold link shows as a filled button and an italic link as an outlined button. The first paragraph without a button shows above them. Other italic text in a card shows smaller and not in italics.
- \`primary\` in a plan's cell of a table's first row gives that plan's card a border
- Each table's first row is its heading, a button that expands and collapses the table. The first table starts expanded and the others collapsed.
- Every other row is a feature: its name, then one cell per plan. A cell holds text or an icon, such as a checkmark (\`icon-checkmark\`) or a cross (\`icon-close\`). An empty cell shows a dash. A paragraph after one holding only \`-\` shows below the value.
- In a feature's name, underlined text authored as \`label | position | text\` shows the label with a tooltip of the text on hover. The position is \`top\`, \`bottom\`, \`left\` or \`right\`. Left empty, the tooltip shows at the right from 900px and below the label under 900px.
- From 900px, the plan cards sit in a row to the right of the heading, with each plan's values below its card, and stick below the global navigation as the page scrolls. Scrolling down while they're stuck shrinks each card to its first part, and scrolling up shows the rest again.
- \`static-header\` turns the sticking and shrinking off, so the cards scroll with the page
- Below 900px, only the first two plans show, in two columns, with each feature's name above its two values. With more than two plans, each card's heading opens a menu that chooses the plan its column shows.
- The cards fade out as the end of the block scrolls up the window, unless reduced motion is set
- The cards and text keep their light-theme colors in the dark theme and in a \`dark\` section, so the block needs a light background
- The block doesn't change its section
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
      description: 'One plan card each, in order: a `label` above its `title`, a `price` in bold and its `priceNote`, and a bold link from `ctaLabel` and `ctaHref`. Leave a value empty to leave it out.',
    },
    primary: { control: 'number', description: 'Number of the plan, from 1, whose card gets a border. Leave empty for none.' },
    tables: {
      control: 'object',
      description: 'One table each, in order: a `heading`, and `rows`, each a `feature` name and `values`, one per plan: `true` for a checkmark, text, or empty for a dash. A feature name can hold a tooltip as `<u>label | right | text</u>`. Each table needs a `heading`. Leave `tables` empty for none.',
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
