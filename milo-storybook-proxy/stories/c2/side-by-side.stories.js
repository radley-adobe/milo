import { ACROBAT, CC_PRO_TEST_FRAGMENTS, LIVE, MEDIA, renderBlock, renderPageBlock } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/side-by-side';
import variants from 'virtual:variants/c2/side-by-side';
import { sectionMetadata, sideBySide } from './authored.js';
import { PRODUCT } from './sections/side-by-side.js';

const description = `
Two cards side by side: an overlay card, with its text over its image, and a stacked card, with its text below its image. It's authored as two rows: a media row, then a text row, each with one cell per card.

- A media cell holds an image or a video. A text cell holds a heading, body copy and links.
- Headings show at \`heading-6\` size and body copy at \`body-md\`. The paragraph right before the heading shows as an eyebrow. A card's first paragraph with any bold text gets \`title-6\`, a class with no styles, in place of \`body-md\`. When that's the eyebrow, no paragraph gets it. The text is up to 450px wide.
- A link alone in its paragraph shows as a label with no underline. A link in italics or bold shows as a button.
- Cards have 16px rounded corners and sit 8px apart. Below 768px they stack in one column. From 768px they sit side by side, aligned to the top: the overlay card first, in a column 1.81 times as wide as the stacked card's.
- An overlay card's image fills the card, aligned to its top. From 768px the card is 1:1.1, with its text at the top left, 24px from the edges, or 32px from 1280px, over a gradient that darkens the top left corner. Below 768px, the text sits below a 1:1.1 area, 24px from the sides and bottom, over a gradient that darkens the bottom.
- The block adds \`dark\` to the overlay card, which gives it light text and the gradient, unless the block has \`dark\` and no viewport rows
- A stacked card's image is cropped to 4:5, and from 768px it's at least 306px high. The text sits below it, 16px from the edges, or 32px from 1280px. Below 768px the card leaves 15% of the block's width empty on its left.
- In a stacked card, a media cell with two images or videos, each in its own paragraph, shows the first as a 32px icon over the top-left corner of the second: 16px from its edges, 24px from 768px and 32px from 1280px. An icon can be a link to an SVG.
- A video starts playing when 40% of it is in view and pauses when it leaves the view. A video that doesn't loop plays once, and one the visitor paused stays paused. Below 768px, an overlay card's video pause button sits 16px from the top of the card.
- \`reverse\` puts the stacked card first. From 768px the wider column is the second.
- \`equal\` makes both cards stacked. From 768px they take the second and third of three columns of 0.81, 1 and 1 parts, and the first stays empty.
- \`featured\` makes one overlay card across the block. From 768px it's 16:9, with its text at the bottom left, 24px from the edges, or 40px from 1280px, over a gradient that darkens the bottom. A \`featured\` block followed by an \`equal\` block has 8px below it.
- \`dark\` gives both cards light text, for a dark section. Without viewport rows, the overlay card then has no gradient.
- \`scrim-off\` removes the overlay card's gradient
- \`content-subtle\` shows both cards' body copy in the subtle content color
- \`small-left\` moves a stacked card's empty 15% to its right, below 768px
- \`first-card-<class>\` and \`second-card-<class>\` add a class to the first or second card: \`content-subtle\` for subtle body copy, \`content-solid\` for body copy in the text color in a \`content-subtle\` block, \`dark\` for light text, or \`light\`, which removes the card's \`dark\` class, so the card takes its section's colors and an overlay card has no gradient. With \`dark\` or \`light\`, a \`dark\` block moves its \`dark\` class to every card except a \`light\` one.
- A \`heading-\`, \`body-\` or \`button-\` class on the block, such as \`heading-5\`, sets the size of every heading, body paragraph or button
- Rows named \`Mobile-viewport\`, \`Tablet-viewport\` and \`Desktop-viewport\` each start a media row and a text row for one viewport: below 768px, from 768px and from 1280px. Without a \`Tablet-viewport\` row, the \`Mobile-viewport\` rows show below 1280px. An empty cell keeps the content of the viewport below it.
- A viewport row can name classes in parentheses, such as \`Mobile-viewport (first-card-dark)\`, which the block takes at that viewport. \`reverse\`, \`equal\` and \`featured\` there change only the block's styles, not which cards are overlay or stacked.
- One viewport row alone shows its rows at every width. A block with \`Tablet-viewport\` and \`Desktop-viewport\` rows and no \`Mobile-viewport\` row shows nothing.
- \`parallax-stagger-ltr\` on the block moves the cards up into place as the block scrolls into view, from 768px: the first card from 24px below its place and the second from 72px. With reduced motion, nothing moves.
- The block adds nothing to its section. Several Side by Side blocks in a section stack one below another, and \`spacing-\` classes on a block add space above or below it.
`;

// Authored markup for the block from a story's args, followed by section metadata when `style`
// sets the section's style.
const authored = (args, style) => [sideBySide(args), sectionMetadata({ style })].filter(Boolean).join('\n');

// A story that renders the block from its args. Show code gives the authored markup.
const blockStory = (style) => ({
  render: (args) => renderBlock(authored(args, style), { foundation: 'c2' }),
  parameters: { docs: { source: { language: 'html', transform: (code, { args }) => authored(args, style) } } },
});

export default {
  title: 'Blocks/Side by Side',
  parameters: { cssprops, liveExamples: [LIVE.pdfEssentials], docs: { description: { component: description } } },
  argTypes: {
    // The scan of side-by-side.css finds only `equal`, because the CSS nests its other classes
    // under `.side-by-side` with `&`. These are all the classes it styles that way.
    variants: { ...variants, options: ['content-subtle', 'dark', 'equal', 'featured', 'reverse', 'scrim-off', 'small-left'] },
    cards: {
      control: 'object',
      description: 'One card each, in order: an `image` with its `imageAlt`, an `icon` URL, a `heading`, `body`, and a link from `ctaLabel` and `ctaHref`. Leave a value empty to leave it out. The block shows an icon as a 32px icon on a stacked card; on an overlay card it shows as a second image. The block styles two cards, or one with `featured`; with `featured`, a second card shows unstyled.',
    },
    showIcon: { control: 'boolean', description: 'Show the icons' },
  },
};

// The PDF and document essentials page's block, without its `parallax-stagger-ltr` class, in the
// width of a container section. The overlay card shows a video on the page, and the story shows
// the video's poster image. The stacked card gets the Acrobat Pro icon, which the page's block
// doesn't have, so the icon control has an icon to show.
export const Default = {
  ...blockStory('container, fixed'),
  args: {
    variants: [],
    cards: [{
      image: `${MEDIA}/side-by-side/acrobat-ai-assistant.webp`,
      imageAlt: '',
      icon: '',
      heading: 'Understand quickly with AI Assistant.',
      body: 'Ask AI Assistant to quickly summarize, create an audio overview, analyze, provide insights, get answers with citations, and more.',
      ctaLabel: '',
      ctaHref: '',
    }, {
      image: `${MEDIA}/side-by-side/acrobat-pdf-spaces.webp`,
      imageAlt: '',
      icon: `${MEDIA}/icons/acrobat-pro.svg`,
      heading: 'Share effortlessly with PDF Spaces.',
      body: 'Share a secure PDF Space with teammates, where everyone can ask AI Assistant to help with research, strategy, planning, or quick learning.',
      ctaLabel: '',
      ctaHref: '',
    }],
    showIcon: true,
  },
};

// The Creative Cloud Pro product page's reverse block.
export const Reverse = {
  ...blockStory('container, fixed'),
  args: { variants: ['reverse'], cards: [PRODUCT.graphics, PRODUCT.selections], showIcon: true },
};

// The Creative Cloud Pro product page's first equal block.
export const Equal = {
  ...blockStory('container, fixed'),
  args: { variants: ['equal'], cards: [PRODUCT.retouch, PRODUCT.artwork], showIcon: true },
};

// The Creative Cloud Pro product page's featured block.
export const Featured = {
  ...blockStory('container, fixed'),
  args: { variants: ['featured'], cards: [PRODUCT.rotateObject], showIcon: true },
};

// Default's cards in a dark section.
export const Dark = {
  ...blockStory('container, fixed, dark'),
  args: { ...Default.args, variants: ['dark'] },
};

// Default's cards without the overlay card's gradient.
export const ScrimOff = {
  ...blockStory('container, fixed'),
  args: { ...Default.args, variants: ['scrim-off'] },
};

// Default's cards with subtle body copy.
export const ContentSubtle = {
  ...blockStory('container, fixed'),
  args: { ...Default.args, variants: ['content-subtle'] },
};

// Default's cards with the stacked card's empty space on its right, which shows below 768px.
export const SmallLeft = {
  ...blockStory('container, fixed'),
  args: { ...Default.args, variants: ['small-left'] },
};

const product = `${CC_PRO_TEST_FRAGMENTS}/cpro-product`;

export const PdfAndDocumentEssentials = {
  name: 'adobe.com: PDF and document essentials',
  render: () => renderPageBlock(`${ACROBAT}/pdf-and-document-essentials`, 'side-by-side', { metadata: true, foundation: 'c2' }),
  parameters: { controls: { include: ['variants'] } },
};

export const CreativeCloudProProductEqual = {
  name: 'Redesign test: Creative Cloud Pro product, equal',
  render: () => renderPageBlock(product, 'side-by-side', { index: 1, metadata: true, foundation: 'c2' }),
  parameters: { controls: { include: ['variants'] } },
};

export const CreativeCloudProProductFeatured = {
  name: 'Redesign test: Creative Cloud Pro product, featured',
  render: () => renderPageBlock(product, 'side-by-side', { index: 3, metadata: true, foundation: 'c2' }),
  parameters: { controls: { include: ['variants'] } },
};
