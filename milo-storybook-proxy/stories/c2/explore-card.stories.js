import { HOMEPAGE_FRAGMENTS, renderBlock, renderPageSections } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/explore-card';
import variants from 'virtual:variants/c2/explore-card';

const description = `
A card that links to a product, with an icon and text over an image that shows on hover. It's authored as one row with two cells: the text, then the image.

- The text cell holds an optional icon, a heading, body copy and a link. The heading shows at \`heading-5\` size.
- An icon is a link to an SVG, alone in its paragraph. The block moves every image in the text cell into the first one's paragraph, at the top of the card. The heading and body copy sit at the bottom.
- The whole card links to the first link in the text cell that isn't a video. The block removes the link itself, unless the card has \`show-link\`, which keeps it as a label.
- The image cell holds an image or a video, hidden until the card is hovered or its link has keyboard focus. Then a card with a link darkens it with a gradient, and on hover its text turns light.
- A color in the image cell, such as \`#000\`, sets the card's background instead. An empty image cell leaves the card with no background.
- Behind the image, the card is tinted black at 8% opacity, or white at 8% in a \`dark\` section, where its text is light
- \`center\` centers the text
- The card is at least 240px tall, 300px from 1440px and 360px from 1920px
- A second row is optional. The block moves its cells into the text cell, over the text.
- Rows named \`Mobile-viewport\`, \`Tablet-viewport\` and \`Desktop-viewport\` give the card different content at each viewport. An empty cell keeps the content of the viewport below it.
- Milo has no block that holds explore cards. Explore cards in the same section form a grid when the section's style sets its columns, such as \`three-up\` for three columns from 768px and one below it. With \`product-grid\` as the section's layout, the cards fill the height of their row, and from 768px every row has the same height.
- In a section whose layout is \`bento\`, section metadata restyles the cards: the image shows without hovering, with no gradient, and grows slightly on hover
`;

const fragment = `${HOMEPAGE_FRAGMENTS}/all-products-card`;
const icon = (name) => `https://main--federal--adobecom.aem.page/federal/assets/svgs/${name}.svg`;

// An arg as an attribute value.
const attr = (value = '') => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;');

// Authored markup for one card from a story's args, followed by section metadata when `style`
// sets the section's style. The image cell stays when it's empty, because the block takes the
// row's last cell as its image cell.
const authored = ({ variants: classes = [], icon: iconUrl, showIcon, heading, body, ctaLabel, ctaHref, image, imageAlt }, style) => `
<div class="${['explore-card', ...classes].join(' ')}">
  <div>
    <div>
      ${showIcon && iconUrl ? `<p><a href="${attr(iconUrl)}">${iconUrl}</a></p>` : ''}
      ${heading ? `<h3>${heading}</h3>` : ''}
      ${body ? `<p>${body}</p>` : ''}
      ${ctaLabel ? `<p><a href="${attr(ctaHref)}">${ctaLabel}</a></p>` : ''}
    </div>
    <div>${image ? `<picture><img src="${attr(image)}" alt="${attr(imageAlt)}"></picture>` : ''}</div>
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
  title: 'Explore Card',
  parameters: { cssprops, docs: { description: { component: description } } },
  argTypes: {
    variants,
    icon: { control: 'text', description: 'URL of the SVG icon' },
    showIcon: { control: 'boolean', description: 'Show the icon' },
    image: { control: 'text', description: 'URL of the image that shows on hover. Leave empty for an empty image cell.' },
    imageAlt: { control: 'text', description: 'Image alt text. Leave empty when the image is decorative.' },
    heading: { control: 'text', description: 'Heading, authored as an `h3`' },
    body: { control: 'text', description: 'Body copy' },
    ctaLabel: { control: 'text', description: 'Link text, which shows only with `show-link`. Leave empty for a card with no link.' },
    ctaHref: { control: 'text', description: 'URL the card links to' },
  },
};

// The homepage's first explore card in the width of one column of a three-up section.
export const Default = {
  ...cardStory('three-up, container'),
  args: {
    variants: [],
    icon: icon('firefly-appicon-256'),
    showIcon: true,
    image: `${fragment}/media_177ad1e4e1f2ff11992428f533093c4766d7e730a.png?width=2000&format=webply&optimize=medium`,
    imageAlt: '',
    heading: 'Firefly',
    body: 'Create and enhance images, video, and audio with AI-powered tools.',
    ctaLabel: 'link',
    ctaHref: 'https://www.adobe.com/products/firefly.html',
  },
};

// The same card with its text centered.
export const Center = {
  ...cardStory('three-up, container'),
  args: { ...Default.args, variants: ['center'] },
};

// The section stories render the homepage fragment as published, so they have no controls.
const published = { controls: { disable: true } };

// The homepage's nine explore cards with the section that holds them, whose style is three-up and
// dark and whose layout is product-grid.
export const SectionThreeUp = {
  name: 'Section: 3 up',
  render: () => renderPageSections(`${fragment}/all-products-card`, 'explore-card', { foundation: 'c2' }),
  parameters: published,
};
