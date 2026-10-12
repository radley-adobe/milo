import { CC_PRO_TEST_FRAGMENTS, renderPageSections, renderSections } from '../../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/side-by-side';
import { section, sectionMetadata, sideBySide } from '../authored.js';
import { PRODUCT } from './side-by-side.js';

const description = `
A featured [Side by Side](?path=/docs/blocks-side-by-side--docs) block above an \`equal\` one, in a section with a dark background. Each block's classes set its layout and colors, and the section's metadata sets its width, spacing and background.

- \`featured\` makes one overlay card across the block: its image fills the card, and its light text sits at the bottom over a gradient that darkens the image behind it. From 768px the card is 16:9, with its text at the bottom left.
- A \`featured\` block followed by an \`equal\` block has the same gap below it as between cards
- \`equal\` makes two stacked cards: each image is cropped to 4:5, with the text below it. From 768px the cards take the second and third of three columns, and the first stays empty.
- Below 768px the stacked cards stack in one column, and each leaves empty space on its left. \`small-left\` moves that space to its right.
- \`dark\` gives the \`equal\` block's cards light text. The featured card's text is light without it.
- Each card has a heading at \`heading-6\` size and body copy at \`body-md\`. The paragraph right before a card's heading shows as an eyebrow.
- A link alone in its paragraph shows as a label. A link in italics or bold shows as a button.
- An icon shows over the top-left corner of a stacked card's image. The icon and the image each need their own paragraph in the card's media cell, and an icon can be a link to an SVG.
- A card's media cell can hold a video instead of an image. A video starts playing when it scrolls into view and pauses when it leaves the view. A video that doesn't loop plays once, and one the visitor paused stays paused.
- Rows named \`Mobile-viewport\`, \`Tablet-viewport\` and \`Desktop-viewport\` in a block each start a media row and a text row for one viewport: below 768px, from 768px and from 1280px. Without a \`Tablet-viewport\` row, the \`Mobile-viewport\` rows show below 1280px. An empty cell keeps the content of the viewport below it.
- A viewport row can name classes in parentheses, such as \`Mobile-viewport (first-card-dark)\`, which the block takes at that viewport
- \`spacing-xs-top\` on the featured block adds space above it
- \`container, fixed\` gives the section side padding at every width and a maximum content width
- \`spacing-xl-top\` adds padding above the section's content, and \`spacing-2xl-bottom\` adds padding below it
- \`background\` sets the section's background color
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
      description: 'One Side by Side block each, in order: its `classes` and its `cards`, each with an `image` and its `imageAlt`, an `icon` URL, a `heading`, `body`, and a link from `ctaLabel` and `ctaHref`. Leave a value empty to leave it out.',
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
