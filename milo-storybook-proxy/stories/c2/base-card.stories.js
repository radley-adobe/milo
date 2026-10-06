import { HOMEPAGE_FRAGMENTS, renderBlock, renderPageSections } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/base-card';
import variants from 'virtual:variants/c2/base-card';

// The stories follow the S2A MediaCard stories, with the base cards from the adobe.com homepage.

const description = `
A card with an image above its text. It's authored as one row with two cells: the text, then the image.

- The text cell holds an optional icon, a heading, body copy and links. The heading shows at \`heading-5\` size.
- An icon is a link to an SVG, alone in the first paragraph of the text cell. The block moves it over the top-left corner of the image.
- A link alone in its paragraph shows as a label, and the whole card links to it
- The image is cropped to 4:3. A card with no image cell shows only its text.
- \`featured\` makes a wide card. From 1024px, its image is cropped to 2.2:1, its heading takes the left 5 of 12 columns and its link paragraph sits to the right of the heading.
- Rows named \`Mobile-viewport\`, \`Tablet-viewport\` and \`Desktop-viewport\` give the card different content at each viewport. An empty cell keeps the content of the viewport below it.
- The block adds \`base-card-section\` to its section, which puts the section's cards in one column below 768px
- Milo has no block that holds base cards. Base cards in the same section form a grid when the section's style sets its columns, such as \`three-up\` for three columns from 768px. \`two-up\`, \`four-up\` and \`six-up\` work the same way.
`;

// The homepage fragment with a featured base card in one section and three base cards in the
// next, and its images.
const HOMEPAGE = `${HOMEPAGE_FRAGMENTS}/explore-whats-new/explore-whats-new`;
const media = (name) => `${HOMEPAGE_FRAGMENTS}/explore-whats-new/media_${name}.png?width=2000&format=webply&optimize=medium`;
const icon = (name) => `https://main--federal--adobecom.aem.page/federal/assets/svgs/${name}.svg`;

// An arg as an attribute value.
const attr = (value = '') => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;');

// Authored markup for a section holding one card, from a story's args. `style` is the section's
// style, which sets the card's width.
const authored = ({ variants: classes = [], icon: iconUrl, showIcon, heading, body, ctaLabel, ctaHref, image, imageAlt }, style) => `
<div class="${['base-card', ...classes].join(' ')}">
  <div>
    <div>
      ${showIcon && iconUrl ? `<p><a href="${attr(iconUrl)}">${iconUrl}</a></p>` : ''}
      ${heading ? `<h3>${heading}</h3>` : ''}
      ${body ? `<p>${body}</p>` : ''}
      ${ctaLabel ? `<p><a href="${attr(ctaHref)}">${ctaLabel}</a></p>` : ''}
    </div>
    ${image ? `<div><picture><img src="${attr(image)}" alt="${attr(imageAlt)}"></picture></div>` : ''}
  </div>
</div>
<div class="section-metadata">
  <div><div>style</div><div>${style}</div></div>
</div>`.trim();

// Renders a section holding one card from a story's args, with `style` as the section's style.
const renderCard = (style) => (args) => renderBlock(authored(args, style), { foundation: 'c2' });

// Show code gives the authored markup.
const authoredSource = (style) => ({ language: 'html', transform: (code, { args }) => authored(args, style) });

// One column of a three-up section, the width a card has in the homepage's grid.
const CARD_STYLE = 'three-up, container';

// The Variants arg applies to the first card in a story, so only the Featured story sets it. The
// homepage stories keep their cards' authored classes.
export default {
  title: 'Base Card',
  render: renderCard(CARD_STYLE),
  parameters: {
    cssprops,
    docs: { description: { component: description }, source: authoredSource(CARD_STYLE) },
  },
  argTypes: {
    variants,
    icon: { control: 'text', description: 'URL of the SVG icon' },
    showIcon: { control: 'boolean', description: 'Show the icon' },
    image: { control: 'text', description: 'Image URL. Leave empty for no image cell.' },
    imageAlt: { control: 'text', description: 'Image alt text. Leave empty when the image is decorative.' },
    heading: { control: 'text', description: 'Heading, authored as an `h3`' },
    body: { control: 'text', description: 'Body copy' },
    ctaLabel: { control: 'text', description: 'Link text. Leave empty for no link.' },
    ctaHref: { control: 'text', description: 'Link URL' },
  },
  args: {
    icon: icon('acrobat-pro'),
    showIcon: true,
    image: media('11baea9af9d1d1306f14797ab9e4566c1620ecc11'),
    imageAlt: 'An Adobe Acrobat PDF Space, with presentation slides being collected and an AI prompt field that reads, "Generate presentation"',
    heading: 'Work smarter than ever with documents.',
    body: 'Trusted PDF tools, now with AI for editing, insights, and content creation.',
    ctaLabel: 'Explore Acrobat',
    ctaHref: 'https://www.adobe.com/acrobat/generative-ai-pdf.html',
  },
};

// The homepage stories render published sections, so they have no controls, and Show code gives
// the story's code.
const published = { controls: { disable: true }, docs: { source: { transform: (code) => code } } };

export const Card = {
  name: 'Card (4:3)',
};

export const Featured = {
  name: 'Featured (2.2:1)',
  render: renderCard('container'),
  parameters: { docs: { source: authoredSource('container') } },
  args: {
    variants: ['featured'],
    icon: icon('experience-cloud-logo'),
    image: media('1ffc572777c63f4a753a7ac51b7a94bd275e98cd7'),
    imageAlt: '',
    heading: 'Turn AI signals into business impact with Adobe Brand Visibility.',
    body: 'Get the intelligence and tools to win customers in AI searches.',
    ctaLabel: 'Learn more',
    ctaHref: 'https://business.adobe.com/products/brand-visibility.html',
  },
};

// The homepage's three base cards and the three-up section that holds them, as published.
export const ThreeUpGrid = {
  name: '3-Up Grid (homepage pattern)',
  render: () => renderPageSections(HOMEPAGE, 'base-card', { index: 1, foundation: 'c2' }),
  parameters: published,
};

// The homepage's featured base card and three-up grid, as published, without the section heading
// above them.
export const FullSection = {
  name: 'Full Section (homepage)',
  render: () => renderPageSections(HOMEPAGE, 'base-card', { count: 2, foundation: 'c2' }),
  parameters: published,
};

export const NoIcon = {
  name: 'No Icon',
  args: {
    icon: icon('photoshop'),
    showIcon: false,
    image: media('1179a8d50eb3482a8ef9a6fcb0ce35db8e25d43e2'),
    imageAlt: '',
    heading: 'Change only what you want.',
    body: 'Photoshop AI Assistant edits what you ask. Everything else stays.',
    ctaLabel: 'Try AI Assistant',
    ctaHref: 'https://www.adobe.com/products/photoshop/app.html',
  },
};
