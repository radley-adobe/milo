import { ACROBAT, LIVE, MEDIA, renderPageSections, renderSections } from '../../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/split-aside-grid';
import { attr, section, sectionMetadata, splitAsideGrid } from '../authored.js';

const description = `
A [Split Aside Grid](?path=/docs/blocks-split-aside-grid--docs) below a heading, over a dark background image. A Rich Content block holds the heading, and the section's metadata sets the background, spacing and motion.

- The Rich Content block holds an eyebrow, an \`h2\` heading and body copy. Its \`dark\` gives it light text, and \`container\` gives it 24px of side padding below 768px and 8.333% of its width from 768px. From 768px, \`narrow\` keeps the heading up to 680px wide and the body copy up to 415px, or 800px and 515px from 1440px. \`spacing-xs-bottom\` adds 24px of padding below it, 32px from 1280px.
- A \`Tablet-viewport (center)\` row centers the Rich Content block's text from 768px. Its empty cell keeps the text of the \`Mobile-viewport\` row.
- A Rich Content block followed by a Split Aside Grid shows its eyebrow in the default text color
- The Split Aside Grid has \`dark\`, which gives its text light colors and leaves its background transparent. Its \`container\` gives it 24px of side padding below 768px, and 8.333% of its width from 768px, where the block removes the padding at its end.
- \`background\` sets the section's background: a color, or an image that covers the section. A link whose text is the URL of an SVG, as here, shows the SVG. This one is black with dark gradients, so the section stays dark in both themes.
- The grid's previous and next buttons, dots and chevron boxes are white or translucent white in both themes, so it needs a dark background
- \`parallax-double-garage-door\` moves the section down into place from 30% of the window's height above it as it scrolls into view, and down by 20% of the window's height as it scrolls out. The section before it sits in front of it. Without CSS scroll-driven animations, or with reduced motion, nothing moves.
- \`spacing-4xl-top\` adds padding above the section: 64px, 80px from 1024px and 128px from 1280px
- Style values are separated by a comma and a space. A space inside a value becomes a hyphen, and capitals don't matter.
- Each grid item holds a heading at \`heading-5\` size, body copy and a link, and an image or video. A link alone in its paragraph shows as a bold label with an arrow. A video plays while its item is active and at least 40% of it is in view, and pauses otherwise. A video that doesn't loop stops at its end, and one authored with \`#autoplay1#viewportplay\` doesn't play again on its own.
- Below 768px, the images form a stack of 245 × 465px cards with the active item's card in front, then previous and next buttons and a dot for each item, then the active item's text. Dragging the front card or pressing the buttons moves between items, and so do the left and right arrow keys when focus is in the block. The items loop.
- From 768px, the items take the first 4 of 12 columns, or 3 from 1280px, with each heading as a button, at 48% opacity unless its item is open. Clicking an item opens it and shows its image beside the list, at the first image's aspect ratio and at least 480px high. Clicking the open item closes it. Below 1600px, the block's end edge cuts off the image.
- With reduced motion, the grid's cards and the items' text change without animating
- Each item's portrait image below 768px comes from a \`Mobile-viewport\` row, and its landscape image from 768px from a \`Tablet-viewport\` row. The tablet rows' empty text cells keep the text of the mobile rows.
`;

// The Rich Content block above the grid, centered from 768px.
const richContent = ({ eyebrow, heading, body }) => `
<div class="rich-content dark container narrow spacing-xs-bottom">
  <div>
    <div>Mobile-viewport</div>
  </div>
  <div>
    <div>
      ${eyebrow ? `<p>${eyebrow}</p>` : ''}
      ${heading ? `<h2>${heading}</h2>` : ''}
      ${body ? `<p>${body}</p>` : ''}
    </div>
  </div>
  <div>
    <div>Tablet-viewport (center)</div>
  </div>
  <div>
    <div></div>
  </div>
</div>`.trim();

// A background image URL as a link whose text is the URL, as the page authors it. Any other
// value, such as a color, stays as it is.
const backgroundCell = (value) => (/^https?:/.test(value ?? '') ? `<a href="${attr(value)}">${value}</a>` : value);

// The section's authored markup from a story's args.
const authored = ({ eyebrow, heading, body, items, background, style }) => section(
  richContent({ eyebrow, heading, body }),
  splitAsideGrid({ variants: ['dark'], items }),
  sectionMetadata({ background: backgroundCell(background), style }),
);

const image = (name) => `${MEDIA}/split-aside-grid/${name}.webp`;

const pdfSpaces = 'https://acrobat.adobe.com/link/spaces/urn:aaid:sc:US:48c94977-9292-45e0-9564-0a68b795619b/?x_api_client_id=acrobat_pdp&x_api_client_location=adobe#_blank';

export default {
  title: 'Sections/Split Aside Grid (Garage Door)',
  parameters: { cssprops, liveExamples: [LIVE.acrobat], docs: { description: { component: description } } },
  argTypes: {
    eyebrow: { control: 'text', description: 'Eyebrow above the heading. Leave empty for none.' },
    heading: { control: 'text', description: 'Heading, authored as an `h2`. Leave empty and the first paragraph, the eyebrow or else the body copy, shows at `heading-2` size.' },
    body: { control: 'text', description: 'Body copy below the heading. Leave empty for none.' },
    items: {
      control: 'object',
      description: 'One Split Aside Grid row each, in order: `heading`, `body`, a link from `ctaLabel` and `ctaHref`, and an `image` with its `imageAlt`. `mobileImage` replaces `image` below 768px. Leave a value empty to leave it out. An empty `image` leaves an empty frame, or shows `mobileImage` from 768px when that\'s set. With no `heading`, the item\'s button reads Slide 1, Slide 2 and so on from 768px. With no items, the block shows nothing.',
    },
    background: { control: 'text', description: 'The section\'s background: an SVG\'s URL, authored as a link whose text is the URL, or a color. Leave empty for none.' },
    style: { control: 'text', description: 'The section\'s style: classes separated by a comma and a space. Leave empty for none.' },
  },
};

// The Acrobat page's PDF Spaces section, without the Hover List block that follows the grid.
export const Default = {
  render: (args) => renderSections(authored(args), { foundation: 'c2' }),
  parameters: { docs: { source: { language: 'html', transform: (code, { args }) => authored(args) } } },
  args: {
    eyebrow: 'PDF Spaces',
    heading: 'Take your productivity to the next level with PDF Spaces.',
    body: 'Bring all your project files, PDFs, and links into one shareable AI-powered workspace that helps you and your team get more done together.',
    items: [{
      heading: 'Comprehend faster.',
      body: 'Chat with your files, generate summaries, and get insights with precise citations in a click. Ask questions to get actionable answers and next steps.',
      ctaLabel: 'Try PDF Spaces',
      ctaHref: pdfSpaces,
      image: image('acrobat-comprehend'),
      mobileImage: image('acrobat-comprehend-mobile'),
      imageAlt: '',
    }, {
      heading: 'Collaborate better.',
      body: 'Set up intelligent, shared PDF Spaces that bring together files, context, audio summaries, and a custom AI Assistant to help everyone unlock insights and understand what matters.',
      ctaLabel: 'Try PDF Spaces',
      ctaHref: pdfSpaces,
      image: image('acrobat-collaborate'),
      mobileImage: image('acrobat-collaborate-mobile'),
      imageAlt: '',
    }, {
      heading: 'Create on-brand content.',
      body: 'Transform your files and insights into polished presentations, reports, social posts, and more with Adobe Express templates and AI-powered design tools. No design skills needed.',
      ctaLabel: 'Try PDF Spaces',
      ctaHref: pdfSpaces,
      image: image('acrobat-create'),
      mobileImage: image('acrobat-create-mobile'),
      imageAlt: '',
    }],
    background: `${MEDIA}/split-aside-grid/pdf-spaces-background.svg`,
    style: 'parallax-double-garage-door, spacing-4xl-top',
  },
};

// The Acrobat page's section, as published, with its Hover List block.
export const Acrobat = {
  name: 'adobe.com: Acrobat',
  render: () => renderPageSections(ACROBAT, 'split-aside-grid', { foundation: 'c2' }),
  parameters: { controls: { disable: true } },
};
