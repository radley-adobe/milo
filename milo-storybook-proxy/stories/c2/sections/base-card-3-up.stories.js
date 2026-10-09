import { LIBRARY, LIVE, MEDIA, renderPageSections, renderSections } from '../../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/base-card';
import { baseCard, icon, section, sectionMetadata } from '../authored.js';

const description = `
Three [Base Cards](?path=/docs/blocks-base-card--docs) in a row. Each card is its own Base Card block, and the section's metadata sets the columns, width, spacing, background and motion.

- \`three-up\` puts the cards in three columns from 768px, 8px apart. Below 768px they stack in one column, 40px apart, because Base Card adds \`base-card-section\` to its section. \`two-up\`, \`four-up\` and \`six-up\` give 2, 4 or 6 columns.
- \`container\` gives the section 24px of side padding below 768px and 8.333% of its width from 768px, with its content up to 1920px wide
- \`wide\` is on the homepage's section, but C2 styles nothing with it
- \`parallax stagger ltr\` moves the cards up into place as the section scrolls into view, from 768px. In each row, a card starts lower than the one before it: 72px, 156px and 264px below its place in three columns. Each row starts 48px lower than the one above it. Below 768px, or with reduced motion, nothing moves.
- \`spacing-3xl-bottom\` adds padding below the cards: 40px, 64px from 1024px and 128px from 1280px. \`spacing-sm\` would add 24px above and below, 32px from 1024px and 40px from 1280px.
- \`background\` sets the section's background color. Storybook shows a white background in the theme's default background color, so it follows the Theme menu.
- Style values are separated by a comma and a space. A space inside a value becomes a hyphen, so \`parallax stagger ltr\` is the class \`parallax-stagger-ltr\`, and capitals don't matter.
- Each card holds an optional icon, a heading at \`heading-5\` size, body copy and a link, above its image
- An icon is a link to an SVG, alone in the card's first paragraph. The block moves it over the top-left corner of the image.
- A link alone in its paragraph shows as a label, and the whole card links to it
- Each image is cropped to 4:3
`;

// The section's authored markup from a story's args.
const authored = ({ cards = [], style, background }) => section(...cards.map(baseCard), sectionMetadata({ style, background }));

export default {
  title: 'Sections/Base Card (3 up)',
  parameters: { cssprops, liveExamples: [LIVE.home], docs: { description: { component: description } } },
  argTypes: {
    cards: {
      control: 'object',
      description: 'One base card each, in order: an `icon` URL, `heading`, `body`, a link from `ctaLabel` and `ctaHref`, and an `image` with its `imageAlt`. Leave a value empty to leave it out.',
    },
    style: { control: 'text', description: 'The section\'s style: classes separated by a comma and a space. Leave empty for none.' },
    background: { control: 'text', description: 'The section\'s background color. Leave empty for none.' },
  },
};

// The homepage's three base cards and their section.
export const Default = {
  render: (args) => renderSections(authored(args), { foundation: 'c2' }),
  parameters: { docs: { source: { language: 'html', transform: (code, { args }) => authored(args) } } },
  args: {
    cards: [{
      icon: icon('photoshop'),
      heading: 'Change only what you want.',
      body: 'Photoshop AI Assistant edits what you ask. Everything else stays.',
      ctaLabel: 'Try AI Assistant',
      ctaHref: 'https://www.adobe.com/products/photoshop/app.html',
      image: `${MEDIA}/base-card/photoshop-ai-assistant.webp`,
      imageAlt: '',
    }, {
      icon: icon('premiere-pro'),
      heading: 'Introducing Color Mode.',
      body: 'Color grading purpose-built for editors. Now in Premiere (beta).',
      ctaLabel: 'Explore Premiere',
      ctaHref: 'https://www.adobe.com/products/premiere/color-mode.html',
      image: `${MEDIA}/base-card/premiere-color-grading.webp`,
      imageAlt: 'A rally car drives through a desert landscape, shown before and after color grading, with the edited version brighter and more vibrant.',
    }, {
      icon: icon('acrobat-pro'),
      heading: 'Work smarter than ever with documents.',
      body: 'Trusted PDF tools, now with AI for editing, insights, and content creation.',
      ctaLabel: 'Explore Acrobat',
      ctaHref: 'https://www.adobe.com/acrobat/generative-ai-pdf.html',
      image: `${MEDIA}/base-card/acrobat-pdf-space.webp`,
      imageAlt: 'An Adobe Acrobat PDF Space, with presentation slides being collected and an AI prompt field that reads, "Generate presentation"',
    }],
    style: 'three-up, container, wide, parallax stagger ltr, spacing-3xl-bottom',
    background: '#fff',
  },
};

// The library's three base cards and their section, as published.
export const Library = {
  name: 'Milo library',
  render: () => renderPageSections(`${LIBRARY}/c2/base-card`, 'base-card', { index: 1, foundation: 'c2' }),
  parameters: { controls: { disable: true } },
};
