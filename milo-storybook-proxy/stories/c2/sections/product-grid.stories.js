import { HOMEPAGE_FRAGMENTS, LIVE, MEDIA, renderPageSections, renderSections } from '../../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/explore-card';
import { exploreCard, icon, section, sectionMetadata } from '../authored.js';

const description = `
A three-column grid of [Explore Cards](?path=/docs/blocks-explore-card--docs) with rows of equal height. Each card is its own Explore Card block, and the section's metadata sets the grid, width, colors, background and motion.

- \`three-up\` puts the cards in three columns from 768px, 8px apart, and in one column below 768px
- \`product-grid\` as the layout, with an \`-up\` style, makes each card fill the height of its row. From 768px, every row has the same height.
- \`container\` gives the section 24px of side padding below 768px and 8.333% of its width from 768px, with its content up to 1920px wide
- \`dark\` gives the section dark colors: a #131313 background and white text. A \`background\` row replaces the #131313 with its own color, here \`#000\`.
- \`parallax stagger ltr\` moves the cards up into place as the section scrolls into view, from 768px. In each row, a card starts lower than the one before it: 72px, 156px and 264px below its place in three columns. Each row starts 48px lower than the one above it. Below 768px, or with reduced motion, nothing moves.
- Style values are separated by a comma and a space. A space inside a value becomes a hyphen, so \`parallax stagger ltr\` is the class \`parallax-stagger-ltr\`, and capitals don't matter.
- Each card shows its icon at the top and its heading, at \`heading-5\` size, and body copy at the bottom
- The whole card links to its first link, and the block removes the link itself
- A card's image stays hidden until the card is hovered or its link has keyboard focus. Then a gradient darkens the image.
- In a \`dark\` section, each card is tinted white at 8% opacity and its text is light
- Each card is at least 240px tall, 300px from 1440px and 360px from 1920px
`;

// The section's authored markup from a story's args.
const authored = ({ cards = [], style, background, layout }) => section(
  ...cards.map(exploreCard),
  sectionMetadata({ style, background, layout }),
);

// One of the homepage's explore cards, with its image from media/explore-card/.
const card = (name, iconName, heading, body, ctaHref) => ({
  icon: icon(iconName),
  heading,
  body,
  ctaLabel: 'link',
  ctaHref,
  image: `${MEDIA}/explore-card/${name}.webp`,
  imageAlt: '',
});

export default {
  title: 'Sections/Product Grid',
  parameters: { cssprops, liveExamples: [LIVE.home], docs: { description: { component: description } } },
  argTypes: {
    cards: {
      control: 'object',
      description: 'One explore card each, in order: an `icon` URL, `heading`, `body`, the URL the card links to in `ctaHref` with its text in `ctaLabel`, and an `image` that shows on hover with its `imageAlt`. Leave a value empty to leave it out.',
    },
    style: { control: 'text', description: 'The section\'s style: classes separated by a comma and a space. Leave empty for none.' },
    background: { control: 'text', description: 'The section\'s background color. Leave empty for none.' },
    layout: { control: 'text', description: 'The section\'s layout: `product-grid` makes each card fill the height of its row. Leave empty for none.' },
  },
};

// The homepage's nine explore cards and their section.
export const Default = {
  render: (args) => renderSections(authored(args), { foundation: 'c2' }),
  parameters: { docs: { source: { language: 'html', transform: (code, { args }) => authored(args) } } },
  args: {
    cards: [
      card('firefly', 'firefly-appicon-256', 'Firefly', 'Create and enhance images, video, and audio with AI-powered tools.', 'https://www.adobe.com/products/firefly.html'),
      card('acrobat', 'acrobat-pro', 'Adobe Acrobat', 'The complete AI-powered PDF and design solution for business workflows.', 'https://www.adobe.com/acrobat.html'),
      card('photoshop', 'photoshop', 'Photoshop', 'Create gorgeous images, rich graphics, and incredible art.', 'https://www.adobe.com/products/photoshop.html'),
      card('premiere', 'premiere-pro', 'Premiere', 'Create everything from social clips to feature films with the leading video editor.', 'https://www.adobe.com/products/premiere.html'),
      card('creative-cloud', 'creative-cloud', 'Creative Cloud', 'Get 20+ apps, including Photoshop, Illustrator, Premiere, and Acrobat Pro.', 'https://www.adobe.com/creativecloud.html'),
      card('genstudio', 'experience-cloud-logo', 'GenStudio', 'Scale your content supply chain.', 'https://business.adobe.com/products/genstudio.html'),
      card('business-products', 'experience-cloud-logo', 'Business Products', 'Adobe solutions integrate our best-in-class products to help you tackle pressing business challenges.', 'https://business.adobe.com/'),
      card('illustrator', 'illustrator', 'Illustrator', 'Design precision vector graphics—from branding to illustration—that stay sharp, scalable, and fully editable at any size.', 'https://www.adobe.com/products/illustrator.html'),
      card('all-products', 'all-products', 'All products', 'See all Adobe products', 'https://www.adobe.com/products/catalog.html'),
    ],
    style: 'three-up, container, dark, parallax stagger ltr',
    background: '#000',
    layout: 'product-grid',
  },
};

// The homepage fragment's section, as published.
export const Homepage = {
  name: 'adobe.com: Homepage',
  render: () => renderPageSections(`${HOMEPAGE_FRAGMENTS}/all-products-card/all-products-card`, 'explore-card', { foundation: 'c2' }),
  parameters: { controls: { disable: true } },
};
