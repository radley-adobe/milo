import { LIBRARY, renderBlock, renderPageBlock, renderPageSections } from '../../src/milo.js';
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

export default {
  title: 'Base Card',
  parameters: { cssprops, docs: { description: { component: description } } },
  argTypes: { variants },
};

const library = `${LIBRARY}/c2/base-card`;

// Authored markup for one card, from the Playground story's args.
const card = ({ icon, heading, body, ctaLabel, ctaHref, image, imageAlt }) => `
  <div class="base-card">
    <div>
      <div>
        ${icon ? `<p><a href="${icon}">${icon}</a></p>` : ''}
        ${heading ? `<h3>${heading}</h3>` : ''}
        ${body ? `<p>${body}</p>` : ''}
        ${ctaLabel ? `<p><a href="${ctaHref}">${ctaLabel}</a></p>` : ''}
      </div>
      ${image ? `<div><picture><img src="${image}" alt="${imageAlt}"></picture></div>` : ''}
    </div>
  </div>`;

export const Playground = {
  args: {
    icon: 'https://main--federal--adobecom.aem.page/federal/assets/svgs/premiere-pro-64.svg',
    heading: 'Colour grading purpose-built for editors.',
    body: 'Now in Premiere (beta).',
    ctaLabel: 'Explore Premiere',
    ctaHref: 'https://www.adobe.com/products/premiere/color-mode.html',
    image: `${LIBRARY}/c2/media_1240ea9838a6b2823276406377ef7c85c4f4e2381.png?width=750&format=png&optimize=medium`,
    imageAlt: '',
  },
  argTypes: {
    icon: { control: 'text', description: 'URL of the SVG icon. Leave empty for no icon.' },
    heading: { control: 'text', description: 'Heading, authored as an `h3`' },
    body: { control: 'text', description: 'Body copy' },
    ctaLabel: { control: 'text', description: 'Link text. Leave empty for no link.' },
    ctaHref: { control: 'text', description: 'Link URL' },
    image: { control: 'text', description: 'Image URL. Leave empty for no image cell.' },
    imageAlt: { control: 'text', description: 'Image alt text. Leave empty when the image is decorative.' },
  },
  render: (args) => renderBlock(card(args), { foundation: 'c2' }),
};

export const Featured = {
  render: () => renderPageBlock(library, 'base-card', { foundation: 'c2' }),
};

export const Default = {
  render: () => renderPageBlock(library, 'base-card', { index: 1, foundation: 'c2' }),
};

// The Variants control changes only the first card in a story, so the section stories hide it.
const hideVariants = { variants: { table: { disable: true } } };

// The featured card with its section's metadata, which sets the section's container width,
// spacing, background and parallax.
export const SectionFeatured = {
  name: 'Section: Featured',
  render: () => renderPageBlock(library, 'base-card', { metadata: true, foundation: 'c2' }),
  argTypes: hideVariants,
};

// The library's three base cards with the section that holds them, whose style is three-up.
export const SectionThreeUp = {
  name: 'Section: 3 up',
  render: () => renderPageSections(library, 'base-card', { index: 1, foundation: 'c2' }),
  argTypes: hideVariants,
};
