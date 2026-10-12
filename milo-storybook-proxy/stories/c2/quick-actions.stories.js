import { ACROBAT_TEST_FRAGMENTS, MEDIA, renderBlock, renderPageBlock } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/quick-actions';
import variants from 'virtual:variants/c2/quick-actions';
import { attr, sectionMetadata } from './authored.js';

const description = `
A heading and a grid of linked tiles, each an image with a label. It's authored as an optional header row, then one row per tile with two cells: the label, then the image.

- In the header, the heading shows at \`heading-4\` size, an italic link as an outline button and a bold one as a blue button. A tile's label is a link at \`heading-6\` size, and the whole tile links to it.
- \`center-mobile\` stacks the header's content and centers it below 768px
- \`blur-background\` gives the block a dark background below 768px, so it needs a \`dark\` section. From 768px, it blurs what's behind the block and darkens it toward the bottom, starting clear at the top.
- The tiles sit in two columns below 768px, three from 768px and six from 1280px
- On hover, a tile darkens slightly, its image grows slightly and its chevron moves right
- The tiles move up into place as the block scrolls into view. With reduced motion, they don't move.
- Rows named \`Mobile-viewport\`, \`Tablet-viewport\` and \`Desktop-viewport\` give the block different content at each viewport. An empty cell keeps the content of the viewport below it.
`;

const image = (name) => `${MEDIA}/quick-actions/${name}.webp`;

// One tile row. Both cells stay when they're empty, because the block makes a tile only from a
// row with two cells.
const tile = ({ label, href, image: src, imageAlt }) => `
  <div>
    <div>${label ? `<a href="${attr(href)}">${label}</a>` : ''}</div>
    <div>${src ? `<picture><img src="${attr(src)}" alt="${attr(imageAlt)}"></picture>` : ''}</div>
  </div>`;

// Authored markup for the block from a story's args. The header row stays out when it has no
// heading, because the block makes a header only from a first row with a heading. `showHeader` is
// true unless set.
const block = ({
  variants: classes = [], showHeader = true, heading, body, ctaLabel, ctaHref, tiles = [],
}) => `
<div class="${['quick-actions', ...classes].join(' ')}">
  ${showHeader && heading ? `<div>
    <div>
      <h2>${heading}</h2>
      ${body ? `<p>${body}</p>` : ''}
      ${ctaLabel ? `<p><em><a href="${attr(ctaHref)}">${ctaLabel}</a></em></p>` : ''}
    </div>
  </div>` : ''}${tiles.map(tile).join('')}
</div>`.trim().replace(/^\s*\n/gm, '');

// Authored markup for the block from a story's args, followed by section metadata when `style`
// sets the section's style.
const authored = (args, style) => [block(args), sectionMetadata({ style })].filter(Boolean).join('\n');

// A story that renders the block from its args. Show code gives the authored markup.
const blockStory = (style) => ({
  render: (args) => renderBlock(authored(args, style), { foundation: 'c2' }),
  parameters: { docs: { source: { language: 'html', transform: (code, { args }) => authored(args, style) } } },
});

export default {
  title: 'Blocks/Quick Actions',
  parameters: { cssprops, docs: { description: { component: description } } },
  argTypes: {
    variants,
    showHeader: { control: 'boolean', description: 'Show the header row' },
    heading: { control: 'text', description: 'Heading, authored as an `h2`' },
    body: { control: 'text', description: 'Paragraph in the header row, after the heading. Leave empty for none.' },
    ctaLabel: { control: 'text', description: 'Header link text, authored in italics, so it shows as an outline button. Leave empty for none.' },
    ctaHref: { control: 'text', description: 'Header link URL' },
    tiles: {
      control: 'object',
      description: 'One tile row each, in order: a `label` linked to `href`, and an `image` with its `imageAlt`',
    },
  },
};

const TOOLS = 'https://www.adobe.com/acrobat/online';

// The block on the Acrobat redesign test's product page, in a container section.
export const Default = {
  ...blockStory('container'),
  args: {
    variants: [],
    showHeader: true,
    heading: 'Get started with Acrobat tools.',
    body: '',
    ctaLabel: 'Explore all tools',
    ctaHref: 'https://www.adobe.com/acrobat/online.html',
    tiles: [
      { label: 'Edit text and images', href: `${TOOLS}/pdf-editor.html`, image: image('edit-text-and-images'), imageAlt: '' },
      { label: 'JPG to PDF', href: `${TOOLS}/jpg-to-pdf.html`, image: image('jpg-to-pdf'), imageAlt: '' },
      { label: 'PDF to Word', href: `${TOOLS}/pdf-to-word.html`, image: image('pdf-to-word'), imageAlt: '' },
      { label: 'Combine files', href: `${TOOLS}/merge-pdf.html`, image: image('combine-files'), imageAlt: '' },
      { label: 'Fill and Sign', href: `${TOOLS}/sign-pdf.html`, image: image('fill-and-sign'), imageAlt: '' },
      { label: 'Generative Summary', href: `${TOOLS}/ai-summary-generator.html`, image: image('generative-summary'), imageAlt: '' },
    ],
  },
};

// The same block with its header centered below 768px. From 768px it looks like Default.
export const CenterMobile = {
  ...blockStory('container'),
  args: { ...Default.args, variants: ['center-mobile'] },
};

// The same block with `blur-background`, in a dark section, so its text is light and reads on
// the black background below 768px.
export const BlurBackground = {
  ...blockStory('container, dark'),
  args: { ...Default.args, variants: ['blur-background'] },
};

export const Acrobat = {
  name: 'Redesign test: Acrobat',
  render: () => renderPageBlock(`${ACROBAT_TEST_FRAGMENTS}/ace1205-product`, 'quick-actions', { metadata: true, foundation: 'c2' }),
  parameters: { controls: { include: ['variants'] } },
};
