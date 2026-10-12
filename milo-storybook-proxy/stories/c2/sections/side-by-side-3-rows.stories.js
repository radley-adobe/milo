import { CC_PRO_TEST_FRAGMENTS, renderPageSections, renderSections } from '../../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/side-by-side';
import { section, sectionMetadata, sideBySide } from '../authored.js';
import { PRODUCT } from './side-by-side.js';

const description = `
Three [Side by Side](?path=/docs/blocks-side-by-side--docs) blocks, one below another: the default layout, \`equal\` and \`reverse\`. Each block's classes set its layout, spacing and motion, and the section's metadata sets its width and background.

- Each block holds two cards. In the default layout and with \`reverse\`, one is an overlay card, with its text over its image, and the other a stacked card, with its text below its image. Cards have 16px rounded corners and sit 8px apart. Below 768px they stack in one column.
- From 768px, a block's cards sit side by side, aligned to the top. In the default layout, the overlay card comes first, in a column 1.81 times as wide as the stacked card's.
- \`equal\` makes both cards stacked. From 768px they take the second and third of three columns of 0.81, 1 and 1 parts, and the first stays empty.
- \`reverse\` puts the stacked card first. From 768px the wider column is the second.
- An overlay card's image fills the card, aligned to its top, and its text is light. From 768px the card is 1:1.1, with its text at the top left, 24px from the edges, or 32px from 1280px, over a gradient that darkens the top left corner. Below 768px, the text sits below a 1:1.1 area, 24px from the sides and bottom, over a gradient that darkens the bottom.
- A stacked card's image is cropped to 4:5, and from 768px it's at least 306px high. The text sits below it, 16px from the edges, or 32px from 1280px, and takes the section's text color.
- Below 768px a stacked card leaves 15% of the block's width empty on its left. \`small-left\` moves that space to its right.
- Each card has a heading at \`heading-6\` size and body copy at \`body-md\`, up to 450px wide
- The paragraph right before a card's heading shows as an eyebrow
- A link alone in its paragraph shows as a label with no underline. A link in italics or bold shows as a button.
- An icon shows as a 32px image over the top-left corner of a stacked card's image: 16px from its edges, 24px from 768px and 32px from 1280px. The icon and the image each need their own paragraph in the card's media cell, and an icon can be a link to an SVG. On an overlay card, an icon shows as a second image.
- A card's media cell can hold a video instead of an image. A video starts playing when 40% of it is in view and pauses when it leaves the view. A video that doesn't loop plays once, and one the visitor paused stays paused. Below 768px, an overlay card's video pause button sits 16px from the top of the card.
- Rows named \`Mobile-viewport\`, \`Tablet-viewport\` and \`Desktop-viewport\` in a block each start a media row and a text row for one viewport: below 768px, from 768px and from 1280px. Without a \`Tablet-viewport\` row, the \`Mobile-viewport\` rows show below 1280px. An empty cell keeps the content of the viewport below it.
- A viewport row can name classes in parentheses, such as \`Mobile-viewport (first-card-dark)\`, which the block takes at that viewport. \`reverse\`, \`equal\` and \`featured\` there change only the block's styles, not which cards are overlay or stacked.
- One viewport row alone shows its rows at every width. A block with \`Tablet-viewport\` and \`Desktop-viewport\` rows and no \`Mobile-viewport\` row shows nothing.
- The blocks stack with no space between them. \`spacing-xs-top\` adds 24px above a block, 32px from 1280px. \`spacing-3xl-bottom\` adds 40px below it, 64px from 1024px and 128px from 1280px. \`spacing-2xs-bottom\` adds 8px below it, 24px from 1024px.
- \`parallax-stagger-ltr\` on a block moves its cards up into place as the block scrolls into view, from 768px: the first card from 24px below its place and the second from 72px. With reduced motion, or in browsers without CSS scroll-driven animations, nothing moves.
- \`container, fixed\` gives the section 24px of side padding at every width, with its content up to 1920px wide
- \`background\` sets the section's background color. Storybook shows a white background in the theme's default background color, so it follows the Theme menu.
- Style values are separated by a comma and a space
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
      description: 'One Side by Side block each, in order: its `classes` and its `cards`, each with an `image` and its `imageAlt`, an `icon` URL, a `heading`, `body`, and a link from `ctaLabel` and `ctaHref`. Leave a value empty to leave it out. A block shows an icon as a 32px icon on a stacked card; on an overlay card it shows as a second image.',
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
  name: 'adobe.com: Creative Cloud Pro product',
  render: () => renderPageSections(`${CC_PRO_TEST_FRAGMENTS}/cpro-product`, 'side-by-side', { foundation: 'c2' }),
  parameters: { controls: { disable: true } },
};
