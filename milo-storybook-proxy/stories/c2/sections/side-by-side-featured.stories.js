import { CC_PRO_TEST_FRAGMENTS, renderPageSections, renderSections } from '../../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/side-by-side';
import { section, sectionMetadata, sideBySide } from '../authored.js';
import { PRODUCT } from './side-by-side.js';

const description = `
A featured [Side by Side](?path=/docs/blocks-side-by-side--docs) block above an \`equal\` one, in a section with a dark background. Each block is authored as a media row, then a text row, one cell per card.

- A text cell holds a heading at \`heading-6\` size, body copy at \`body-md\` and links
- \`featured\` makes one overlay card across the block, with its light text over its image
- \`equal\` makes two stacked cards, each with its text below its image
- \`dark\` gives the \`equal\` block's cards light text
- \`small-left\` moves a stacked card's empty space from its left to its right, below 768px
- \`spacing-xs-top\` on the featured block adds space above it
- \`container, fixed\` gives the section side padding and a maximum content width
- \`spacing-xl-top\` adds padding above the section's content, and \`spacing-2xl-bottom\` adds padding below it
- \`background\` sets the section's background color
- Below 768px the stacked cards stack in one column
- A video in a media cell starts playing when it scrolls into view and pauses when it leaves
- Rows named \`Mobile-viewport\`, \`Tablet-viewport\` and \`Desktop-viewport\` give a block different content at each viewport. An empty cell keeps the content of the viewport below it.
- The featured block has the same gap below it as between cards
`;

// The section's authored markup from a story's args.
const authored = ({ blocks = [], style, background }) => section(
  ...blocks.map(({ classes, cards }) => sideBySide({ variants: classes, cards })),
  sectionMetadata({ style, background }),
);

export default {
  title: 'Sections/Side by Side (Featured)',
  parameters: { cssprops, docs: { description: { component: description } } },
  argTypes: {
    blocks: {
      control: 'object',
      description: 'The Side by Side blocks in order, each with its classes and cards. Leave a value empty for none.',
    },
    style: { control: 'text', description: 'The section\'s style: classes separated by a comma and a space. Leave empty for none.' },
    background: { control: 'text', description: 'The section\'s background color. Leave empty for none.' },
  },
};

// The Creative Cloud Pro product page's features section, with the images it shows from 768px.
// The page's featured card is a video with no poster image, so the story shows a frame of it. The
// page also has a Rich Content heading above the blocks, and `rounded-corners-top` in the
// section's style, for the section above it.
export const Default = {
  render: (args) => renderSections(authored(args), { foundation: 'c2' }),
  parameters: { docs: { source: { language: 'html', transform: (code, { args }) => authored(args) } } },
  args: {
    blocks: [{
      classes: ['featured', 'spacing-xs-top'],
      cards: [PRODUCT.rotateObject],
    }, {
      classes: ['equal', 'dark', 'small-left'],
      cards: [PRODUCT.harmonize, PRODUCT.generativeFill],
    }],
    style: 'container, fixed, spacing-xl-top, spacing-2xl-bottom',
    background: '#191919',
  },
};

// The section, as published.
export const CreativeCloudProProduct = {
  name: 'Redesign test: Creative Cloud Pro product',
  render: () => renderPageSections(`${CC_PRO_TEST_FRAGMENTS}/cpro-product`, 'side-by-side', { index: 3, foundation: 'c2' }),
  parameters: { controls: { disable: true } },
};
