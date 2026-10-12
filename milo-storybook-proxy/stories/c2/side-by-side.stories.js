import { ACROBAT, CC_PRO_TEST_FRAGMENTS, LIVE, MEDIA, renderBlock, renderPageBlock } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/side-by-side';
import variants from 'virtual:variants/c2/side-by-side';
import { icon, sectionMetadata, sideBySide } from './authored.js';
import { PRODUCT } from './sections/side-by-side.js';

const description = `
Two cards side by side: an overlay card, with its text over its image, and a stacked card, with its text below its image. It's authored as two rows: a media row, then a text row, each with one cell per card.

- A media cell holds an image or a video. A text cell holds a heading, body copy and links.
- Headings show at \`heading-6\` size and body copy at \`body-md\`. The paragraph right before the heading shows as an eyebrow. The first bold paragraph shows at \`title-6\` size, unless it's the eyebrow. The text is up to 450px wide.
- A link alone in its paragraph shows as a label with no underline. A link in italics or bold shows as a button.
- Cards have 16px rounded corners and sit 8px apart. Below 768px they stack in one column. From 768px they sit side by side, aligned to the top: the overlay card first, in a column 1.81 times as wide as the stacked card's.
- An overlay card's image fills the card, aligned to its top. From 768px the card is 1:1.1, with its text at the top left, 24px from the edges, or 32px from 1280px, over a gradient that darkens the top left corner. Below 768px, the text sits below a 1:1.1 area, 24px from the sides and bottom, over a gradient that darkens the bottom.
- The block adds \`dark\` to the overlay card, which gives it light text and the gradient, unless the block has \`dark\` and no viewport rows
- A stacked card's image is cropped to 4:5, and from 768px it's at least 306px high. The text sits below it, 16px from the edges, or 32px from 1280px. Below 768px the card leaves 15% of the block's width empty on its left.
- In a stacked card, a media cell with two images or videos, each in its own paragraph, shows the first as a 32px icon over the top-left corner of the second: 16px from its edges, 24px from 768px and 32px from 1280px. An icon can be a link to an SVG.
- A video starts playing when 40% of it is in view and pauses when it leaves the view. A video that doesn't loop plays once, and one the visitor paused stays paused.
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
- \`parallax-stagger-ltr\` on the block moves the cards up into place as the block scrolls into view, from 768px: the first card from 24px below its place and the second from 72px. With reduced motion, or in browsers without CSS scroll-driven animations, nothing moves.
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
      description: 'One card each, in order: an `image` with its `imageAlt`, an `icon` URL, which shows only on a stacked card, a `heading`, `body`, and a link from `ctaLabel` and `ctaHref`. Leave a value empty to leave it out. The block shows two cards, or one with `featured`.',
    },
    showIcon: { control: 'boolean', description: 'Show the icons' },
  },
};

// The Creative Cloud Pro hub's block, with the images it shows from 1280px, in the width of a
// container section. The stacked card shows a video on the page, and the story shows the video's
// poster image.
export const Default = {
  ...blockStory('container, fixed'),
  args: {
    variants: [],
    cards: [{
      image: `${MEDIA}/side-by-side/firefly-ideas.webp`,
      imageAlt: '',
      icon: '',
      heading: 'Explore ideas faster with Adobe Firefly.',
      body: 'Generate and refine concepts using Firefly creative AI and top partner models, then remix and collaborate on mood boards and storyboards on the infinite canvas of Firefly Boards.',
      ctaLabel: '',
      ctaHref: '',
    }, {
      image: `${MEDIA}/side-by-side/creative-cloud-workflows.webp`,
      imageAlt: '',
      icon: icon('creative-cloud'),
      heading: 'Streamline workflows with apps that work together seamlessly.',
      body: 'Create across photo, design, and video with compatible apps, automatically synced assets, and integrated AI that speeds up routine tasks.',
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

const product = `${CC_PRO_TEST_FRAGMENTS}/cpro-product`;

export const PdfAndDocumentEssentials = {
  name: 'adobe.com: PDF and document essentials',
  render: () => renderPageBlock(`${ACROBAT}/pdf-and-document-essentials`, 'side-by-side', { metadata: true, foundation: 'c2' }),
  parameters: { controls: { include: ['variants'] } },
};

export const CreativeCloudProProductEqual = {
  name: 'adobe.com: Creative Cloud Pro product, equal',
  render: () => renderPageBlock(product, 'side-by-side', { index: 1, metadata: true, foundation: 'c2' }),
  parameters: { controls: { include: ['variants'] } },
};

export const CreativeCloudProProductFeatured = {
  name: 'adobe.com: Creative Cloud Pro product, featured',
  render: () => renderPageBlock(product, 'side-by-side', { index: 3, metadata: true, foundation: 'c2' }),
  parameters: { controls: { include: ['variants'] } },
};
