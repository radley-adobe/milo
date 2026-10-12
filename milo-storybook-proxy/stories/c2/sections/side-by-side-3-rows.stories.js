import { CC_PRO_TEST_FRAGMENTS, renderPageSections, renderSections } from '../../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/side-by-side';
import { section, sectionMetadata, sideBySide } from '../authored.js';
import { PRODUCT } from './side-by-side.js';

const description = `
Three [Side by Side](?path=/docs/blocks-side-by-side--docs) blocks: the default layout, \`equal\` and \`reverse\`. Each block is authored as a media row, then a text row, one cell per card.

- In the default layout, an overlay card, with its text over its image, comes before a stacked card, with its text below its image
- A text cell holds a heading at \`heading-6\` size, body copy at \`body-md\` and links
- \`equal\` makes both cards stacked
- \`reverse\` puts the stacked card first
- \`small-left\` moves a stacked card's empty space from its left to its right, below 768px
- \`container, fixed\` gives the section side padding and a maximum content width
- \`background\` sets the section's background color
- Below 768px the cards stack in one column
- A video in a media cell starts playing when it scrolls into view and pauses when it leaves
- From 768px, \`parallax-stagger-ltr\` moves a block's cards up into place as it scrolls into view. With reduced motion, nothing moves.
- Rows named \`Mobile-viewport\`, \`Tablet-viewport\` and \`Desktop-viewport\` give a block different content at each viewport. An empty cell keeps the content of the viewport below it.
- The blocks stack with no space between them. \`spacing-xs-top\` adds space above a block, and \`spacing-3xl-bottom\` and \`spacing-2xs-bottom\` add space below it.
`;

// The section's authored markup from a story's args.
const authored = ({ blocks = [], style, background }) => section(
  ...blocks.map(({ classes, cards }) => sideBySide({ variants: classes, cards })),
  sectionMetadata({ style, background }),
);

export default {
  title: 'Sections/Side by Side (3 Rows)',
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

// The Creative Cloud Pro product page's section of three Side by Side blocks, with the images it
// shows from 768px. The page also has `first-card-light` on the last block, which changes nothing
// there, and `rounded-corners-bottom` in the section's style, for the section below it.
export const Default = {
  render: (args) => renderSections(authored(args), { foundation: 'c2' }),
  parameters: { docs: { source: { language: 'html', transform: (code, { args }) => authored(args) } } },
  args: {
    blocks: [{
      classes: ['parallax-stagger-ltr', 'spacing-xs-top', 'spacing-3xl-bottom', 'small-left'],
      cards: [PRODUCT.composites, PRODUCT.tools],
    }, {
      classes: ['equal', 'spacing-3xl-bottom'],
      cards: [PRODUCT.retouch, PRODUCT.artwork],
    }, {
      classes: ['parallax-stagger-ltr', 'reverse', 'small-left', 'spacing-2xs-bottom'],
      cards: [PRODUCT.graphics, PRODUCT.selections],
    }],
    style: 'container, fixed',
    background: '#fff',
  },
};

// The section, as published.
export const CreativeCloudProProduct = {
  name: 'Redesign test: Creative Cloud Pro product',
  render: () => renderPageSections(`${CC_PRO_TEST_FRAGMENTS}/cpro-product`, 'side-by-side', { foundation: 'c2' }),
  parameters: { controls: { disable: true } },
};
