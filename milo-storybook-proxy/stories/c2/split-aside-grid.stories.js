import { ACROBAT, CC_PRO_TEST_FRAGMENTS, LIVE, MEDIA, renderBlock, renderPageBlock } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/split-aside-grid';
import variants from 'virtual:variants/c2/split-aside-grid';
import { attr, sectionMetadata, splitAsideGrid } from './authored.js';

const description = `
A list of items beside a stack of their images. It's authored as one row per item with two cells: the item's text, then its image or video.

- The text cell holds a heading at \`heading-5\` size, body copy and links
- \`dark\` gives the block light text and a transparent background
- \`mobile-carousel\` lines the media up side by side below 768px instead of stacking them
- \`container\` gives the block side padding, except at its end from 768px
- Below 768px, the media form a stack of cards above previous and next buttons, a dot for each item and the active item's text
- Below 768px, dragging the front card or clicking the buttons moves between items, and the items loop. With reduced motion, the cards, the carousel and the text change without animating.
- From 768px, clicking an item shows its media and opens it, and clicking the open item closes it
- A video plays while its item is active and in view, and pauses otherwise
- Rows named \`Mobile-viewport\`, \`Tablet-viewport\` and \`Desktop-viewport\` give the block different items at each viewport. An empty cell keeps the content of the viewport below it.
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
      description: 'One row each: `heading`, `body`, a link from `ctaLabel` and `ctaHref`, an `image` with its `imageAlt`, and a `mobileImage` that replaces `image` below 768px',
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
