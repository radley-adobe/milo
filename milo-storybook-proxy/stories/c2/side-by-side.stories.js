import { ACROBAT, CC_PRO_TEST_FRAGMENTS, LIVE, MEDIA, renderBlock, renderPageBlock } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/side-by-side';
import variants from 'virtual:variants/c2/side-by-side';
import { sectionMetadata, sideBySide } from './authored.js';
import { PRODUCT } from './sections/side-by-side.js';

const description = `
Two cards side by side: an overlay card, with its text over its image, and a stacked card, with its text below its image. It's authored as a media row, then a text row, one cell per card.

- A text cell holds a heading at \`heading-6\` size, body copy at \`body-md\` and links
- A stacked card shows the first of two images, each in its own paragraph, as an icon over the second
- \`reverse\` puts the stacked card first
- \`equal\` makes both cards stacked
- \`featured\` makes one overlay card across the block
- \`dark\` gives both cards light text
- \`scrim-off\` removes the gradient behind the overlay card's text
- \`content-subtle\` gives the body copy the subtle content color
- \`small-left\` moves a stacked card's empty space from its left to its right, below 768px
- \`first-card-<class>\` and \`second-card-<class>\` add a class, such as \`dark\`, to the first or second card
- A \`heading-\`, \`body-\` or \`button-\` class sets the size of every heading, body paragraph or button
- Below 768px the cards stack in one column
- A media cell can hold a video, which starts playing when it scrolls into view and pauses when it leaves
- From 768px, \`parallax-stagger-ltr\` moves the cards up into place as the block scrolls into view. With reduced motion, nothing moves.
- Rows named \`Mobile-viewport\`, \`Tablet-viewport\` and \`Desktop-viewport\` give the block different content at each viewport. An empty cell keeps the content of the viewport below it.
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
    variants,
    cards: {
      control: 'object',
      description: 'Two cards in order, or one with `featured`, each with an image, icon, heading, body copy and link. Leave a value empty for none.',
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
