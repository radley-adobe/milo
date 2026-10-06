import { HOMEPAGE_FRAGMENTS, LIBRARY, renderBlock } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/base-card';
import variants from 'virtual:variants/c2/base-card';

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

const icon = (name) => `https://main--federal--adobecom.aem.page/federal/assets/svgs/${name}.svg`;

// An arg as an attribute value.
const attr = (value = '') => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;');

// Authored markup for one card from a story's args, followed by section metadata when `style`
// sets the section's style.
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
${style ? `<div class="section-metadata">
  <div><div>style</div><div>${style}</div></div>
</div>` : ''}`.trim();

// A story that renders one card from its args. Show code gives the authored markup.
const cardStory = (style) => ({
  render: (args) => renderBlock(authored(args, style), { foundation: 'c2' }),
  parameters: { docs: { source: { language: 'html', transform: (code, { args }) => authored(args, style) } } },
});

export default {
  title: 'Blocks/Base Card',
  parameters: { cssprops, docs: { description: { component: description } } },
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
};

// The library's first card in the width of one column of a three-up section. The homepage has
// the same card, with a link and a larger image.
export const Default = {
  ...cardStory('three-up, container'),
  args: {
    variants: [],
    icon: icon('acrobat-pro'),
    showIcon: true,
    image: `${HOMEPAGE_FRAGMENTS}/explore-whats-new/media_11baea9af9d1d1306f14797ab9e4566c1620ecc11.png?width=2000&format=webply&optimize=medium`,
    imageAlt: 'An Adobe Acrobat PDF Space, with presentation slides being collected and an AI prompt field that reads, "Generate presentation"',
    heading: 'Work smarter than ever with documents.',
    body: 'Trusted PDF tools, now with AI for editing, insights, and content creation.',
    ctaLabel: 'Explore Acrobat',
    ctaHref: 'https://www.adobe.com/acrobat/generative-ai-pdf.html',
  },
};

// The library's featured card, in the width of a container section.
export const Featured = {
  ...cardStory('container'),
  args: {
    variants: ['featured'],
    icon: icon('premiere-pro-64'),
    showIcon: true,
    image: `${LIBRARY}/c2/media_1240ea9838a6b2823276406377ef7c85c4f4e2381.png?width=2000&format=webply&optimize=medium`,
    imageAlt: '',
    heading: 'Featured base card.',
    body: 'Colour grading purpose-built for editors. Now in Premiere (beta).',
    ctaLabel: 'Explore Premiere',
    ctaHref: 'https://www.adobe.com/products/premiere/color-mode.html',
  },
};
