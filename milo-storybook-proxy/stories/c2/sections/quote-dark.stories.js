import { CC_PRO_TEST_FRAGMENTS, renderPageSections, renderSections } from '../../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/quote';
import { quote, section, sectionMetadata } from '../authored.js';

const description = `
One [Quote](?path=/docs/blocks-quote--docs) alone in a dark section. The quote has \`center-footer\`, and the section's metadata sets its colors, background, width and corners.

- \`dark\` gives the section dark colors: a #131313 background and white text, with the role at 64% opacity. A \`background\` row replaces the #131313 with its own color, here \`#191919\`.
- \`container\` gives the section side padding: 24px below 768px and 8.333% of its width from 768px, with its content up to 1920px wide. \`fixed\` keeps the 24px padding from 768px too.
- The quote's side margins pull it out over the section's side padding. With \`container, fixed\`, the quote and its lines span the full width of a section up to 1968px wide.
- \`rounded-corners-bottom\` rounds the section's bottom corners by 22px. The next section's background reaches 22px up behind them.
- Style values are separated by a comma and a space. A space inside a value becomes a hyphen, and capitals don't matter.
- The block reads its cell's headings and paragraphs in order: the first is the quote, the second the name and the third the role
- The quote shows at \`heading-1\` size when it's a heading, up to 1312px wide. The name and role show at \`body-md\` size.
- An opening quote mark at the start of the quote, such as “, hangs outside the text's left edge
- \`center-footer\` centers the name and role below the quote
- Thin lines frame the text: one above and one below it across the block's full width, one at each side from the block's top to its bottom, and a dashed line down the middle. A white dot marks each corner of the text, where the lines cross. The lines are dark gray (#292929).
- The block has 24px of padding, 48px from 768px and 64px from 1280px
- Below 768px, the block is at least 600px tall, with the quote at the top and the name and role at the bottom, at least 128px below it. From 768px, the name and role sit 160px below the quote, or 240px from 1280px.
`;

// The section's authored markup from a story's args.
const authored = ({ style, background, ...args }) => section(
  quote({ ...args, variants: ['center-footer'] }),
  sectionMetadata({ style, background }),
);

export default {
  title: 'Sections/Quote (Dark)',
  parameters: { cssprops, docs: { description: { component: description } } },
  argTypes: {
    quote: { control: 'text', description: 'The quote, authored as an `h2`. Leave empty and the name shows as the quote.' },
    name: { control: 'text', description: 'Name of the person quoted. Leave empty and the role shows in its place.' },
    role: { control: 'text', description: 'Role of the person quoted, below the name. Leave empty for none.' },
    showAttribution: { control: 'boolean', description: 'Show the name and role' },
    style: { control: 'text', description: 'The section\'s style: classes separated by a comma and a space. Leave empty for none.' },
    background: { control: 'text', description: 'The section\'s background color. Leave empty for none.' },
  },
};

// The Creative Cloud Pro product page's quote and its section.
export const Default = {
  render: (args) => renderSections(authored(args), { foundation: 'c2' }),
  parameters: { docs: { source: { language: 'html', transform: (code, { args }) => authored(args) } } },
  args: {
    quote: '“Learning how to use Adobe well has been an essential part of growing as a professional artist and Photoshop is a very essential part of how I make my work happen.”',
    name: 'Lenne Chai',
    role: 'Photographer',
    showAttribution: true,
    style: 'dark, container, fixed, rounded-corners-bottom',
    background: '#191919',
  },
};

// The Creative Cloud Pro product page's section, as published.
export const CreativeCloudProProduct = {
  name: 'adobe.com: Creative Cloud Pro product',
  render: () => renderPageSections(`${CC_PRO_TEST_FRAGMENTS}/cpro-product`, 'quote', { foundation: 'c2' }),
  parameters: { controls: { disable: true } },
};
