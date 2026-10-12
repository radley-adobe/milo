import { ACROBAT, LIVE, MEDIA, renderPageSections, renderSections } from '../../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/split-aside-grid';
import { attr, section, sectionMetadata, splitAsideGrid } from '../authored.js';

const description = `
A [Split Aside Grid](?path=/docs/blocks-split-aside-grid--docs) below a Rich Content block with an eyebrow, an \`h2\` heading and body copy, over a dark background image. The section's metadata sets the background, spacing and motion.

- The Rich Content block's \`dark\` gives it light text, \`container\` side padding and \`spacing-xs-bottom\` padding below, and \`narrow\` narrows its heading and body copy from 768px
- A \`Tablet-viewport (center)\` row centers the Rich Content block's text from 768px, and its empty cell keeps the \`Mobile-viewport\` text
- \`dark\` gives the grid light text, and \`container\` gives it side padding except at its end from 768px
- \`background\` sets the section's background color or image
- \`parallax-double-garage-door\` moves the section down into place as it scrolls into view, and down again as it scrolls out. With reduced motion, nothing moves.
- \`spacing-4xl-top\` adds padding above the section
- Below 768px, the images form a stack of cards above the active item's text, and dragging the front card or clicking the previous and next buttons moves between items
- From 768px, the items form a list beside the images, and clicking an item opens it, showing its image
- Each item's portrait image below 768px comes from a \`Mobile-viewport\` row, and its landscape image from 768px from a \`Tablet-viewport\` row, whose empty text cell keeps the mobile text
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
    heading: { control: 'text', description: 'Heading, authored as an `h2`' },
    body: { control: 'text', description: 'Body copy below the heading. Leave empty for none.' },
    items: {
      control: 'object',
      description: 'One Split Aside Grid row each: `heading`, `body`, a link from `ctaLabel` and `ctaHref`, an `image` with its `imageAlt`, and a `mobileImage` that replaces `image` below 768px',
    },
    background: { control: 'text', description: 'The section\'s background: an SVG\'s URL or a color. Leave empty for none.' },
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
