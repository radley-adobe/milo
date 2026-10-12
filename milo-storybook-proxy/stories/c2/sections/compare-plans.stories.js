import { LIVE, renderPageSections, renderSections } from '../../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/comparison-table-c2';
import { section, sectionMetadata } from '../authored.js';
import { ACROBAT_PLANS, ACROBAT_TABLES, comparisonTable } from './compare-plans.js';

const description = `
A [Comparison Table C2](?path=/docs/blocks-comparison-table-c2--docs) on a light gray background. The section's metadata sets its width, spacing and background.

- \`container\` gives the section 24px of side padding below 768px and 8.333% of its width from 768px, with its content up to 1920px wide
- \`spacing-md\` adds 24px of padding above and below the section, 48px from 1280px. The block adds 40px of its own above and below, 80px from 900px.
- \`background\` sets the section's background color, light gray in both themes. The block's cards are white and its text dark in either theme, so it needs a light background.
- Style values are separated by a comma and a space, and capitals don't matter
- The block's header row holds a heading, shown at \`heading-4\` size, and one card per plan. Paragraphs holding only \`-\` split a card into parts: a label and the plan's name, a price and its terms, and a button. In the first part, the plan's name shows at \`heading-5\` size and the label in gray at label size.
- In a card's third part, a bold link shows as a filled blue button and an italic link as an outlined button, each as wide as the card. The first paragraph without a button shows above them in label size.
- From 900px, the cards sit in a row to the right of the heading and stick 24px below the global navigation as the page scrolls. Scrolling down while they're stuck shrinks each card to its label and name, and scrolling up shows the rest again.
- From 900px, the block's grid gives the heading and each plan a column at least 100px wide, 16px apart, and the cards fill the plan columns, 8px apart. Each feature row splits the block's full width into equal columns at least 100px wide. The cards have 16px of padding, 24px from 1440px.
- \`static-header\` on the block turns the sticking and shrinking off, so the cards scroll with the page
- In browsers with scroll-driven animations, the cards fade out as the end of the block scrolls up the window, unless reduced motion is set
- Below 900px, the cards sit in two columns and only the first two plans show. With more than two plans, each card's heading opens a menu that chooses the plan its column shows.
- \`primary\` in a plan's cell of a table's first row gives that plan's card a black border and a black label. In the dark theme, the border is white, so it doesn't show against the white card.
- The features are in tables, each with a heading that expands and collapses it. The first table starts expanded and the others collapsed.
- Each feature row holds its name, then a checkmark, text or a dash for each plan. From 900px, the name is in the first column and each value sits below its plan's card. Below 900px, the name sits above two values.
- In a feature's name, underlined text authored as \`label | position | text\` shows the label with a dotted underline and a tooltip of the text on hover or focus. The position is \`top\`, \`bottom\`, \`left\` or \`right\`. Without one, the tooltip shows at the right from 900px and below the label under 900px.
- Each table has the \`table\` role, with a hidden first row of column headers named after the plans. Screen readers hear the \`primary-feature\` placeholder for a checkmark and \`not-a-feature\` for a cross (\`icon-close\`) or an empty cell. They name each plan menu with the \`choose-table-column\` placeholder and the menu's number.
`;

// The section's authored markup from a story's args.
const authored = ({ style, background, ...table }) => section(comparisonTable(table), sectionMetadata({ style, background }));

export default {
  title: 'Sections/Compare Plans',
  parameters: { cssprops, liveExamples: [LIVE.acrobatPlans], docs: { description: { component: description } } },
  argTypes: {
    heading: { control: 'text', description: 'Heading in the header row\'s first cell, authored as an `h2`. Leave empty for none.' },
    plans: {
      control: 'object',
      description: 'One plan card each, in order: a `label` above its `title`, a `price` in bold and its `priceNote`, and a bold link from `ctaLabel` and `ctaHref`. Leave a value empty to leave it out.',
    },
    primary: { control: 'number', description: 'Number of the plan, from 1, whose card gets a black border. Leave empty for none.' },
    tables: {
      control: 'object',
      description: 'One table each, in order: a `heading`, and `rows`, each a `feature` name and `values`, one per plan: `true` for a checkmark, text, or empty for a dash. A feature name can hold a tooltip as `<u>label | right | text</u>`. Each table needs a `heading`. An empty heading stops the block decorating that table and the ones after it. Leave `tables` empty for none.',
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
    heading: 'Compare plans',
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
