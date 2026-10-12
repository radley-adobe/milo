import { CC_PRO_TEST_FRAGMENTS, renderPageSections, renderSections } from '../../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/side-by-side';
import { section, sectionMetadata } from '../authored.js';
import { PRODUCT, sideBySide } from './side-by-side.js';

const description = `
A featured [Side by Side](?path=/docs/blocks-side-by-side--docs) block above an \`equal\` one, in a dark section. Each block's classes set its layout and colors, and the section's metadata sets its width, spacing and background.

- \`featured\` makes one overlay card across the block: its image fills the card, aligned to its top, and its text is light. From 768px the card is 16:9, with its text at the bottom left, 24px from the edges, or 40px from 1280px. Below 768px, the text sits below a 1:1.1 area, 24px from the sides and bottom. A gradient behind the text darkens the bottom.
- A \`featured\` block followed by an \`equal\` block has 8px below it, the same gap as between cards
- \`equal\` makes two stacked cards: each image is cropped to 4:5, with the text below it, 16px from the edges, or 32px from 1280px. From 768px the cards take the second and third of three columns of 0.81, 1 and 1 parts, 8px apart, and the first stays empty. Each image is at least 306px high.
- Below 768px the stacked cards stack in one column, 8px apart, and each leaves 15% of the block's width empty on its left. \`small-left\` moves that space to its right.
- \`dark\` gives the \`equal\` block's cards light text. The featured card is light without it, because the block adds \`dark\` to an overlay card in a block without \`dark\`.
- Cards have 16px rounded corners. Each has a heading at \`heading-6\` size and body copy at \`body-md\`, up to 450px wide.
- \`spacing-xs-top\` on the featured block adds 24px above it, 32px from 1280px
- \`container, fixed\` gives the section 24px of side padding at every width, with its content up to 1920px wide
- \`spacing-xl-top\` adds padding above the section's content: 40px, 80px from 1024px and 128px from 1280px. \`spacing-2xl-bottom\` adds padding below it: 24px, 80px from 1024px and 128px from 1280px.
- \`background\` sets the section's background color. Its dark gray stays in both themes, and so does the cards' light text.
- Style values are separated by a comma and a space
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
      description: 'One Side by Side block each, in order: its `classes` and its `cards`, each with an `image` and its `imageAlt`, an `icon` URL, which shows only on a stacked card, a `heading`, `body`, and a link from `ctaLabel` and `ctaHref`. Leave a value empty to leave it out.',
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
  name: 'adobe.com: Creative Cloud Pro product',
  render: () => renderPageSections(`${CC_PRO_TEST_FRAGMENTS}/cpro-product`, 'side-by-side', { index: 3, foundation: 'c2' }),
  parameters: { controls: { disable: true } },
};
