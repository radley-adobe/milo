import { ACROBAT, CC_PRO_TEST_FRAGMENTS, LIVE, MEDIA, renderBlock, renderPageBlock } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/split-aside-grid';
import variants from 'virtual:variants/c2/split-aside-grid';
import { attr, sectionMetadata, splitAsideGrid } from './authored.js';

const description = `
A list of items beside a stack of their images. It's authored as one row per item with two cells: the item's text, then its image or video.

- The text cell holds a heading, body copy and links. The heading shows at \`heading-5\` size. With no heading, the item's button reads Slide 1, Slide 2 and so on from 768px.
- A link alone in its paragraph shows as a bold label with an arrow
- The block takes each row's second cell as the item's media. An empty cell shows an empty frame.
- Below 768px, the media form a stack of 245 × 465px cards with the active item's card in front. Each card behind it sits 10px further toward the end edge, 4% shorter and gray, with its image hidden. Previous and next buttons and a dot for each item sit below the stack, then the active item's text.
- Below 768px, dragging the front card 20px or more toward the start edge moves to the next item, and toward the end edge to the previous one. The previous and next buttons do the same, and so do the left and right arrow keys when focus is in the block. The front card flies off toward the start edge as the next one comes forward, and the items loop. A live region announces each new item's number and text.
- \`mobile-carousel\` lines the media up side by side below 768px instead of stacking them. Each is \`1.2 × (100vw − 48px)\` wide, at the first media's aspect ratio and up to 600px high, so it runs past the window's edge. Dragging, the buttons and the arrow keys slide the media and the text by one item, and the items loop.
- From 768px, the block is a 12-column grid. The items take the first 4 columns, at least 300px, and the active item's media sits in columns 6 to 12. From 1280px, the items take 3 columns, at least 340px, and the media sits in columns 5 to 12.
- From 768px to 1599px, the media moves toward the block's end edge by the grid's side margin, and the block's end edge cuts it off
- From 768px, each item's heading is a button with a chevron, and other items' headings show at 48% opacity. Clicking an item opens it, showing its body copy and links, and shows its media. Clicking the open item closes or reopens it.
- From 768px, the media area takes the first media's aspect ratio, or 4:3, and is at least 480px high. Each media is cropped to fill it, keeping its start edge, inside a translucent frame with rounded corners.
- A video plays while its item is active and at least 40% of it is in view, and pauses otherwise
- \`dark\` gives the block's text light colors and leaves its background transparent, so the section's background shows through
- The previous and next buttons, the dots and the chevron boxes are white or translucent white in both themes, so the block suits a dark section background.
- \`container\` gives the block 24px of side padding below 768px, and 8.333% of its width from 768px, where the block removes the padding at its end.
- Rows named \`Mobile-viewport\`, \`Tablet-viewport\` and \`Desktop-viewport\` give the block different items at each viewport. Mobile-viewport applies below 768px, Tablet-viewport from 768px (to 1279px when there's a Desktop-viewport row) and Desktop-viewport from 1280px. With only Mobile and Desktop rows, Mobile applies below 1280px. An empty cell keeps the content of the viewport below it. Classes in parentheses after the name, such as \`Mobile-viewport (spacing-sm)\`, apply to the block at that viewport.
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
    dark: { control: 'boolean', description: 'Give the block light text (`dark`). Its background stays transparent.' },
    items: {
      control: 'object',
      description: 'One row each, in order: `heading`, `body`, a link from `ctaLabel` and `ctaHref`, and an `image` with its `imageAlt`. `mobileImage` replaces `image` below 768px, through `Mobile-viewport` and `Tablet-viewport` rows. Leave a value empty to leave it out. An empty `image` leaves an empty frame, or shows `mobileImage` from 768px when that\'s set. With no `heading`, the item\'s button reads Slide 1, Slide 2 and so on from 768px.',
    },
  },
};

// The Acrobat page's PDF Spaces items over its section background. The story shows the page's
// portrait images below 768px and, from 768px, the posters of its videos.
export const Default = {
  ...blockStory(background(media('pdf-spaces-background.svg'))),
  args: {
    variants: [],
    dark: true,
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
    variants: ['mobile-carousel'],
    dark: true,
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
  name: 'adobe.com: Creative Cloud Pro product',
  render: () => renderPageBlock(`${CC_PRO_TEST_FRAGMENTS}/cpro-product`, 'split-aside-grid', { metadata: true, foundation: 'c2' }),
  parameters: { controls: { include: ['variants'] } },
};
