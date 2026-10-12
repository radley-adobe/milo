import { ACROBAT, CC_PRO_TEST_FRAGMENTS, LIVE, MEDIA, renderBlock, renderPageBlock } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/split-aside-grid';
import variants from 'virtual:variants/c2/split-aside-grid';
import { attr, sectionMetadata, splitAsideGrid } from './authored.js';

const description = `
A list of items beside a stack of their images. It's authored as one row per item with two cells: the item's text, then its image or video.

- The text cell holds a heading at \`heading-5\` size, body copy and links. A link alone in its paragraph shows as a bold label with an arrow.
- Below 768px, the media form a stack of cards with the active item's card in front and the cards behind it showing no image, then previous and next buttons and a dot for each item, then the active item's text. Dragging the front card, the buttons and, when focus is in the block, the left and right arrow keys move between items, and the items loop.
- \`mobile-carousel\` lines the media up side by side below 768px instead of stacking them, each at the first media's aspect ratio and running past the window's edge. Dragging, the buttons and the arrow keys slide the media and the text by one item, and the items loop.
- From 768px, the items take the first 4 of 12 columns, or 3 from 1280px. Each item's heading is a button with a chevron, dimmed unless its item is open. Clicking an item opens it, showing its body copy and links, and shows its media in columns 6 to 12, or 5 to 12 from 1280px. Clicking the open item closes it.
- From 768px, the media area takes the first media's aspect ratio, and each media is cropped to fill it, keeping its start edge. Below 1600px, the block's end edge cuts off the media.
- A video plays while its item is active and in view, and pauses otherwise
- With reduced motion, the cards, the carousel and the items' text change without animating
- \`dark\` gives the block's text light colors and leaves its background transparent. The block's buttons, dots and chevron boxes are light in both themes, so it suits a dark section background.
- \`container\` gives the block side padding, except at its end from 768px
- Rows named \`Mobile-viewport\`, \`Tablet-viewport\` and \`Desktop-viewport\` give the block different items at each viewport. Mobile-viewport applies below 768px, Tablet-viewport from 768px and Desktop-viewport from 1280px. With only Mobile-viewport and Desktop-viewport rows, Mobile-viewport applies below 1280px. A viewport row on its own applies at every width, and Tablet-viewport and Desktop-viewport rows with no Mobile-viewport row leave the block empty. An empty cell keeps the content of the viewport below it. Classes in parentheses after the name, such as \`Mobile-viewport (spacing-sm)\`, apply to the block at that viewport.
`;

// Section metadata whose background is the image at `url`, authored as a link whose text is
// the URL, as the pages author it.
const background = (url) => ({ background: `<a href="${attr(url)}">${url}</a>` });

// Authored markup for the block from a story's args, followed by section metadata with the
// section's settings.
const authored = (args, settings) => [splitAsideGrid(args), sectionMetadata(settings)].filter(Boolean).join('\n');

// A story that renders the block from its args in a section with `settings`. Show code gives the
// authored markup.
const blockStory = (settings) => ({
  render: (args) => renderBlock(authored(args, settings), { foundation: 'c2' }),
  parameters: { docs: { source: { language: 'html', transform: (code, { args }) => authored(args, settings) } } },
});

const media = (name) => `${MEDIA}/split-aside-grid/${name}`;

const pdfSpaces = 'https://acrobat.adobe.com/link/spaces/urn:aaid:sc:US:48c94977-9292-45e0-9564-0a68b795619b/?x_api_client_id=acrobat_pdp&x_api_client_location=adobe#_blank';

export default {
  title: 'Blocks/Split Aside Grid',
  parameters: { cssprops, liveExamples: [LIVE.acrobat], docs: { description: { component: description } } },
  argTypes: {
    variants,
    items: {
      control: 'object',
      description: 'One row each, in order: `heading`, `body`, a link from `ctaLabel` and `ctaHref`, and an `image` with its `imageAlt`. `mobileImage` replaces `image` below 768px, through `Mobile-viewport` and `Tablet-viewport` rows. Leave a value empty to leave it out.',
    },
  },
};

// The Acrobat page's PDF Spaces items over its section background. The story shows the page's
// portrait images below 768px and, from 768px, the posters of its videos.
export const Default = {
  ...blockStory(background(media('pdf-spaces-background.svg'))),
  args: {
    variants: ['dark'],
    items: [{
      heading: 'Comprehend faster.',
      body: 'Chat with your files, generate summaries, and get insights with precise citations in a click. Ask questions to get actionable answers and next steps.',
      ctaLabel: 'Try PDF Spaces',
      ctaHref: pdfSpaces,
      image: media('acrobat-comprehend.webp'),
      mobileImage: media('acrobat-comprehend-mobile.webp'),
      imageAlt: '',
    }, {
      heading: 'Collaborate better.',
      body: 'Set up intelligent, shared PDF Spaces that bring together files, context, audio summaries, and a custom AI Assistant to help everyone unlock insights and understand what matters.',
      ctaLabel: 'Try PDF Spaces',
      ctaHref: pdfSpaces,
      image: media('acrobat-collaborate.webp'),
      mobileImage: media('acrobat-collaborate-mobile.webp'),
      imageAlt: '',
    }, {
      heading: 'Create on-brand content.',
      body: 'Transform your files and insights into polished presentations, reports, social posts, and more with Adobe Express templates and AI-powered design tools. No design skills needed.',
      ctaLabel: 'Try PDF Spaces',
      ctaHref: pdfSpaces,
      image: media('acrobat-create.webp'),
      mobileImage: media('acrobat-create-mobile.webp'),
      imageAlt: '',
    }],
  },
};

// The Creative Cloud Pro test fragment's Photoshop items, with the posters of their videos, over
// its section background.
export const MobileCarousel = {
  ...blockStory(background(media('firefly-creative-ai-background.svg'))),
  name: 'Mobile Carousel',
  args: {
    variants: ['dark', 'mobile-carousel'],
    items: [{
      heading: 'Edit images with prompts.',
      body: 'Describe your edits to easily add, remove, and adjust content with Generative Fill and realistically extend images in any direction with Generative Expand.',
      image: media('photoshop-edit-with-prompts.webp'),
      imageAlt: '',
    }, {
      heading: 'Create with top AI models.',
      body: 'Take ideas further, faster with leading AI models including Nano Banana Pro, FLUX models, and Firefly Image 5 — all integrated within Photoshop.',
      image: media('photoshop-ai-models.webp'),
      imageAlt: '',
    }, {
      heading: 'Build scenes quickly.',
      body: 'Tilt, rotate, and scale objects in real time without rebuilding all the details with Rotate Object, then use Harmonize to easily blend new elements into any scene.',
      image: media('photoshop-build-scenes.webp'),
      imageAlt: '',
    }, {
      heading: 'Upscale images.',
      body: 'Improve resolution, image quality, and detail sharpness with Generative Upscale using AI models from Firefly and Topaz Labs.',
      image: media('photoshop-upscale.webp'),
      imageAlt: '',
    }, {
      heading: 'Move seamlessly from concept to client-ready.',
      body: 'Explore ideas, generate variations, and align creative directions with Firefly Boards, then refine hero images with advanced tools in Photoshop.',
      image: media('photoshop-concept-to-client.webp'),
      imageAlt: '',
    }],
  },
};

export const Acrobat = {
  name: 'adobe.com: Acrobat',
  render: () => renderPageBlock(ACROBAT, 'split-aside-grid', { metadata: true, foundation: 'c2' }),
  parameters: { controls: { include: ['variants'] } },
};

export const CreativeCloudProProduct = {
  name: 'Redesign test: Creative Cloud Pro product',
  render: () => renderPageBlock(`${CC_PRO_TEST_FRAGMENTS}/cpro-product`, 'split-aside-grid', { metadata: true, foundation: 'c2' }),
  parameters: { controls: { include: ['variants'] } },
};
