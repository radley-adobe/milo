import {
  ACROBAT, CC_PRO_TEST_FRAGMENTS, LIVE, MEDIA, renderBlock, renderPageBlock,
} from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/hover-list';
import variants from 'virtual:variants/c2/hover-list';
import { attr, sectionMetadata } from './authored.js';

const description = `
A heading beside a numbered list whose items show images on hover. It's authored as a first row with a heading, body copy and a link, then one row per item with two cells: the item's text, then its images.

- The heading shows at \`heading-2\` size and each item's text at \`heading-5\` size
- \`compact-headline\` limits the width of the first row's text from 768px to 1279px
- \`no-animation\` hides the images, and from 1280px the items don't respond to hover
- Below 768px, the first row's text sits above the list. From 768px, it sits beside the list. Below 1280px, each item shows its first image as a thumbnail beside its text.
- From 1280px, hovering an item shows all its images as cards above the pointer. They grow in, follow the pointer and fade out when it leaves the list. With reduced motion, they show at full size, don't move and hide at once.
- Rows named \`Mobile-viewport\`, \`Tablet-viewport\` and \`Desktop-viewport\` give the block different content at each viewport. An empty cell keeps the content of the viewport below it.
- The block's text is light, so its section needs a dark background
`;

const image = (name) => `${MEDIA}/hover-list/${name}.webp`;

// The Acrobat page's section background, a dark gradient behind the block's white text.
const BACKGROUND = `${MEDIA}/hover-list/pdf-spaces-background.svg`;

// A row of the block, from its cells' markup.
const row = (...cells) => `  <div>\n${cells.map((markup) => `    ${markup}`).join('\n')}\n  </div>`;

// A cell holding one element per line, or an empty cell.
const cell = (lines) => (lines.length ? `<div>\n      ${lines.join('\n      ')}\n    </div>` : '<div></div>');

const pictures = (srcs) => srcs.filter(Boolean).map((src) => `<picture><img src="${attr(src)}" alt=""></picture>`);

// Authored markup for the block from a story's args, followed by section metadata that sets the
// background. When an item has a thumbnail, Mobile-viewport rows give each item its thumbnail, or
// its first image, below 1280px, and Desktop-viewport rows give it its images from 1280px. The
// Desktop-viewport heading cell is empty, so it keeps the Mobile-viewport heading, as on the
// Acrobat page.
const authored = ({
  variants: classes = [], heading, body, ctaLabel, ctaHref, items = [],
}) => {
  const text = cell([
    heading ? `<h2>${heading}</h2>` : '',
    body ? `<p>${body}</p>` : '',
    ctaLabel ? `<p><a href="${attr(ctaHref)}">${ctaLabel}</a></p>` : '',
  ].filter(Boolean));
  const itemRows = (media) => items.map((entry) => row(`<div>${entry.text ?? ''}</div>`, cell(pictures(media(entry)))));
  const images = ({ images: srcs = [] }) => srcs;
  const thumbnail = ({ thumbnail: src, images: srcs = [] }) => [src || srcs[0]];
  const rows = items.some((entry) => entry.thumbnail) ? [
    row('<div>Mobile-viewport</div>'),
    row(text),
    ...itemRows(thumbnail),
    row('<div>Desktop-viewport</div>'),
    row('<div></div>'),
    ...itemRows(images),
  ] : [row(text), ...itemRows(images)];
  return [
    `<div class="${['hover-list', ...classes].join(' ')}">\n${rows.join('\n')}\n</div>`,
    sectionMetadata({ background: `<a href="${attr(BACKGROUND)}">${BACKGROUND}</a>` }),
  ].join('\n');
};

// A story that renders the block from its args. Show code gives the authored markup.
const blockStory = {
  render: (args) => renderBlock(authored(args), { foundation: 'c2' }),
  parameters: { docs: { source: { language: 'html', transform: (code, { args }) => authored(args) } } },
};

// One of the Acrobat page's items: its thumbnail and the `count` images that show on hover.
const acrobatItem = (text, name, count) => ({
  text,
  thumbnail: image(name),
  images: Array.from({ length: count }, (_, i) => image(`${name}-${i + 1}`)),
});

export default {
  title: 'Blocks/Hover List',
  parameters: { cssprops, liveExamples: [LIVE.acrobat], docs: { description: { component: description } } },
  argTypes: {
    variants,
    heading: { control: 'text', description: 'Heading, authored as an `h2`. Leave empty for none.' },
    body: { control: 'text', description: 'Body copy below the heading. Leave empty for none.' },
    ctaLabel: { control: 'text', description: 'Link text. Leave empty for no link.' },
    ctaHref: { control: 'text', description: 'Link URL' },
    items: {
      control: 'object',
      description: 'The list\'s items, each with its `text`, the URLs of its hover `images`, and the URL of a `thumbnail` that `Mobile-viewport` rows show beside the text below 1280px',
    },
  },
};

// The Acrobat page's hover list, with its section's background image.
export const Default = {
  ...blockStory,
  args: {
    variants: [],
    heading: 'Your plan comes with more than great tools.',
    body: '',
    ctaLabel: '',
    ctaHref: '',
    items: [
      acrobatItem('Robust security features for protecting PDF content and controlling access', 'security', 3),
      acrobatItem('Responsible AI built to protect your work and data', 'responsible-ai', 2),
      acrobatItem('Integration with Microsoft 365, Dropbox, Adobe Creative Cloud, and more', 'integrations', 4),
      acrobatItem('Binding and secure e-signatures', 'e-signatures', 4),
      acrobatItem('Access to new features and updates as soon as they’re available', 'new-features', 3),
      acrobatItem('Available on desktop, web, and mobile plus browser extensions', 'platforms', 2),
    ],
  },
};

// The same list with its first row's text limited to 35% of the window's width
// from 768px to 1279px.
export const CompactHeadline = {
  ...blockStory,
  args: { ...Default.args, variants: ['compact-headline'] },
};

// The same list with its images hidden.
export const NoAnimation = {
  ...blockStory,
  args: { ...Default.args, variants: ['no-animation'] },
};

// The Acrobat page's hover list and its section's metadata, as published.
export const Acrobat = {
  name: 'adobe.com: Acrobat',
  render: () => renderPageBlock(ACROBAT, 'hover-list', { metadata: true, foundation: 'c2' }),
  parameters: { controls: { include: ['variants'] } },
};

// The hover list in the Creative Cloud Pro product test fragment, with its section's metadata.
export const CreativeCloudProProduct = {
  name: 'Redesign test: Creative Cloud Pro product',
  render: () => renderPageBlock(`${CC_PRO_TEST_FRAGMENTS}/cpro-product`, 'hover-list', { metadata: true, foundation: 'c2' }),
  parameters: { controls: { include: ['variants'] } },
};
