import { LIVE, renderPageSections, renderSections } from '../../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/comparison-table-c2';
import { section, sectionMetadata } from '../authored.js';
import { ACROBAT_PLANS, ACROBAT_TABLES, comparisonTable } from './compare-plans.js';

const description = `
A [Comparison Table C2](?path=/docs/blocks-comparison-table-c2--docs) in a section whose metadata sets its width, spacing and background.

- \`container\` gives the section side padding and a maximum content width
- \`spacing-md\` adds padding above and below the section
- \`background\` sets the section's background color
- The block has a header row with a heading and a card per plan, then tables separated by rows holding \`+++\`
- Paragraphs holding only \`-\` split a card into parts: the plan's name as a heading, details such as a price, then links, bold for a filled button and italic for an outlined one
- After a table's heading row, each row holds a feature's name, then text or an icon per plan. An empty cell shows a dash.
- \`primary\` in a plan's cell of a table's heading row gives the plan's card a border
- \`static-header\` on the block keeps the cards from sticking
- Below 900px, the first two plans show, and with more, a menu on each card's heading switches its plan
- Clicking a table's heading expands or collapses it, and only the first starts expanded
- From 900px, the cards stick, and scrolling down while they're stuck shrinks them to their first part
- The cards fade out as the block's end scrolls up, except with reduced motion
`;

// The section's authored markup from a story's args.
const authored = ({ style, background, ...table }) => section(comparisonTable(table), sectionMetadata({ style, background }));

export default {
  title: 'Sections/Compare Plans',
  parameters: { cssprops, liveExamples: [LIVE.acrobatPlans], docs: { description: { component: description } } },
  argTypes: {
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
    style: { control: 'text', description: 'The section\'s style: classes separated by a comma and a space. Leave empty for none.' },
    background: { control: 'text', description: 'The section\'s background color. Leave empty for none.' },
  },
};

// Plans and features from the Acrobat plans page, in a section with the page's settings.
export const Default = {
  render: (args) => renderSections(authored(args), { foundation: 'c2' }),
  parameters: { docs: { source: { language: 'html', transform: (code, { args }) => authored(args) } } },
  args: {
    staticHeader: false,
    heading: 'Compare plans',
    body: '',
    plans: ACROBAT_PLANS,
    primary: 3,
    tables: ACROBAT_TABLES,
    style: 'container, spacing-md',
    background: '#f8f8f8',
  },
};

// The Acrobat plans page's table for individuals, annual, billed monthly, as published. The page
// shows it in a tab panel from this fragment. Its prices and buttons load from Merch at Scale on
// www.adobe.com, so they show a load error. Its plan names and price terms are placeholders,
// which resolve against milo.adobe.com here, so the ones only the Acrobat site has show their keys.
export const AcrobatPlans = {
  name: 'adobe.com: Acrobat plans',
  render: () => renderPageSections('https://main--da-dc--adobecom.aem.live/dc-shared/fragments/merch-cards/acrobat-plans-individuals-abm', 'comparison-table-c2', { foundation: 'c2' }),
  parameters: { controls: { disable: true } },
};
