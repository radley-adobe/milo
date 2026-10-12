import { CC_PRO_TEST_FRAGMENTS, renderPageBlock, renderSections } from '../../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/quote';
import { quote, section, sectionMetadata } from '../authored.js';

const description = `
One [Quote](?path=/docs/blocks-quote--docs) alone in a dark section. The quote has \`center-footer\`, and the section's metadata sets its colors, background, width and corners.

- The block reads its cell's headings and paragraphs in order as the quote, the name and the role. Each heading shows at \`heading-1\` size and each paragraph at \`body-md\` size.
- An opening quote mark at the start of the quote, such as “, hangs outside the text's left edge, or its right edge on a right-to-left page
- \`center-footer\` centers the name and role below the quote
- \`dark\` gives the section dark colors, and the quote's text takes them
- A \`background\` row replaces the section's background color
- \`container\` gives the section side padding, wider from 768px, and limits its content's width
- \`fixed\` keeps the narrower side padding from 768px too
- \`rounded-corners-bottom\` rounds the section's bottom corners, and the next section's background reaches up behind them
- Below 768px, the block has a minimum height, with the quote at the top and the name and role at the bottom. From 768px, it has no minimum height.
- The quote's side margins pull it out over the section's side padding
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
    quote: { control: 'text', description: 'The quote, authored as an `h2`' },
    name: { control: 'text', description: 'Name of the person quoted' },
    role: { control: 'text', description: 'Role of the person quoted, below the name. Leave empty for none.' },
    showAttribution: { control: 'boolean', description: 'Show the name and role' },
    style: { control: 'text', description: 'The section\'s style: classes separated by a comma and a space. Leave empty for none.' },
    background: { control: 'text', description: 'The section\'s background color' },
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
  name: 'Redesign test: Creative Cloud Pro product',
  render: () => renderPageBlock(`${CC_PRO_TEST_FRAGMENTS}/cpro-product`, 'quote', { metadata: true, foundation: 'c2' }),
  parameters: { controls: { disable: true } },
};
