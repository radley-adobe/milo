import { CC_PRO_TEST_FRAGMENTS, renderBlock, renderPageBlock } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/quote';
import variants from 'virtual:variants/c2/quote';
import { quote, sectionMetadata } from './authored.js';

const description = `
A quote with the name and role of the person quoted, framed by thin lines. It's authored as one row with one cell that holds the quote, then the name, then the role.

- The block reads the cell's headings and paragraphs in order as the quote, the name and the role. Each heading shows at \`heading-1\` size and each paragraph at \`body-md\` size.
- An opening quote mark at the start of the quote, such as “, hangs outside the text's left edge, or its right edge on a right-to-left page
- The text takes its section's colors, in a light or a \`dark\` section
- Thin lines frame the text, with a dashed line down the middle. On a dark background, a dot marks each corner of the text.
- Below 768px, the block has a minimum height, with the quote at the top and the name and role at the bottom. From 768px, the block has no minimum height, and the name and role sit a set distance below the quote.
- \`center-footer\` centers the name and role. \`right-footer\` aligns them to the right, or to the left on a right-to-left page.
- A \`heading-\` class on the block, such as \`heading-3\`, replaces the quote's \`heading-1\` size, and a \`body-\` class, such as \`body-lg\`, replaces the \`body-md\` size
- Rows named \`Mobile-viewport\`, \`Tablet-viewport\` and \`Desktop-viewport\` give the quote different content at each viewport. A Mobile-viewport row applies from the smallest width, a Tablet-viewport row from 768px and a Desktop-viewport row from 1280px, each up to the next row's width. A Tablet-viewport or Desktop-viewport row on its own applies at every width. An empty cell keeps the content of the viewport below it. Classes in parentheses after a row's name, such as \`Desktop-viewport (right-footer)\`, apply only at that viewport.
- The block's side margins pull it out over its section's side padding. In a \`container, fixed\` section up to 1968px wide, the block and its lines span the section's full width. In a \`container\` section from 768px, the lines stop short of the section's edges.
- Milo has no block that holds quotes. Quotes in the same section stack in one column, each in its own frame. With a section style that sets columns, such as \`two-up\`, they sit side by side from 768px and their frames overlap.
`;

// Authored markup for one quote from a story's args, followed by section metadata when `style`
// sets the section's style.
const authored = (args, style) => [quote(args), sectionMetadata({ style })].filter(Boolean).join('\n');

// A story that renders one quote from its args. Show code gives the authored markup.
const quoteStory = (style) => ({
  render: (args) => renderBlock(authored(args, style), { foundation: 'c2' }),
  parameters: { docs: { source: { language: 'html', transform: (code, { args }) => authored(args, style) } } },
});

export default {
  title: 'Blocks/Quote',
  parameters: { cssprops, docs: { description: { component: description } } },
  argTypes: {
    variants,
    quote: { control: 'text', description: 'The quote, authored as an `h2`' },
    name: { control: 'text', description: 'Name of the person quoted' },
    role: { control: 'text', description: 'Role of the person quoted, below the name. Leave empty for none.' },
    showAttribution: { control: 'boolean', description: 'Show the name and role' },
  },
};

// The Creative Cloud Pro offer page's quote, in the width of a container section.
// The page also gives the block a `footer` class, which the block's CSS doesn't style,
// so the story leaves it out.
export const Default = {
  ...quoteStory('container'),
  args: {
    variants: [],
    quote: 'That’s why I love the Creative Cloud ecosystem, because it allows me to disappear in the creative process.',
    name: 'Antoni Sendra',
    role: 'Creative Director',
    showAttribution: true,
  },
};

// The Creative Cloud Pro product page's quote, which starts with an opening quote mark, in the
// width of the product page's `container, fixed` section.
export const CenterFooter = {
  ...quoteStory('container, fixed'),
  args: {
    variants: ['center-footer'],
    quote: '“Learning how to use Adobe well has been an essential part of growing as a professional artist and Photoshop is a very essential part of how I make my work happen.”',
    name: 'Lenne Chai',
    role: 'Photographer',
    showAttribution: true,
  },
};

// The default quote with its name and role on the right.
export const RightFooter = {
  ...quoteStory('container'),
  args: { ...Default.args, variants: ['right-footer'] },
};

export const CreativeCloudProProduct = {
  name: 'Redesign test: Creative Cloud Pro product',
  render: () => renderPageBlock(`${CC_PRO_TEST_FRAGMENTS}/cpro-product`, 'quote', { metadata: true, foundation: 'c2' }),
  parameters: { controls: { include: ['variants'] } },
};

export const CreativeCloudProOffer = {
  name: 'Redesign test: Creative Cloud Pro offer',
  render: () => renderPageBlock(`${CC_PRO_TEST_FRAGMENTS}/cpro-offer`, 'quote', { metadata: true, foundation: 'c2' }),
  parameters: { controls: { include: ['variants'] } },
};
