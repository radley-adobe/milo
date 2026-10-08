import { LIBRARY, LIVE, MEDIA, renderPageBlock, renderSections } from '../../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/base-card';
import { baseCard, icon, section, sectionMetadata } from '../authored.js';

const description = `
One wide [Base Card](?path=/docs/blocks-base-card--docs) across its section. The card has \`featured\`, and the section's metadata sets its width, background and motion.

- \`featured\` makes a wide card. From 1024px, its image is cropped to 2.2:1, its heading takes the left 5 of 12 columns and its link sits to the right of the heading. Below 1024px, the image is cropped to 4:3.
- \`container\` gives the section 24px of side padding below 768px and 8.333% of its width from 768px, with its content up to 1920px wide
- \`parallax-scale-down-grid\` starts the section scaled up, so its content spans the width of the window, about 1.2 times its size from 768px. The section shrinks to its own size as it scrolls into view. With reduced motion, nothing moves.
- \`background\` sets the section's background color. Storybook shows a white background in the theme's default background color, so it follows the Theme menu.
- Style values are separated by a comma and a space. A space inside a value becomes a hyphen, so \`parallax stagger ltr\` is the class \`parallax-stagger-ltr\`, and capitals don't matter.
- Each card holds an optional icon, a heading at \`heading-5\` size, body copy and a link, above its image
- An icon is a link to an SVG, alone in the card's first paragraph. The block moves it over the top-left corner of the image.
- A link alone in its paragraph shows as a label, and the whole card links to it
`;

// The section's authored markup from a story's args.
const authored = ({ style, background, ...card }) => section(
  baseCard({ ...card, variants: ['featured'] }),
  sectionMetadata({ style, background }),
);

export default {
  title: 'Sections/Base Card (Featured)',
  parameters: { cssprops, liveExamples: [LIVE.home], docs: { description: { component: description } } },
  argTypes: {
    icon: { control: 'text', description: 'URL of the SVG icon' },
    showIcon: { control: 'boolean', description: 'Show the icon' },
    image: { control: 'text', description: 'Image URL. Leave empty for no image cell.' },
    imageAlt: { control: 'text', description: 'Image alt text. Leave empty when the image is decorative.' },
    heading: { control: 'text', description: 'Heading, authored as an `h3`' },
    body: { control: 'text', description: 'Body copy' },
    ctaLabel: { control: 'text', description: 'Link text. Leave empty for no link.' },
    ctaHref: { control: 'text', description: 'Link URL' },
    style: { control: 'text', description: 'The section\'s style: classes separated by a comma and a space. Leave empty for none.' },
    background: { control: 'text', description: 'The section\'s background color. Leave empty for none.' },
  },
};

// The homepage's featured card and its section. The homepage gives the card a 4:3 image below
// 768px in a Mobile viewport row, which this leaves out.
export const Default = {
  render: (args) => renderSections(authored(args), { foundation: 'c2' }),
  parameters: { docs: { source: { language: 'html', transform: (code, { args }) => authored(args) } } },
  args: {
    icon: icon('experience-cloud-logo'),
    showIcon: true,
    image: `${MEDIA}/base-card/brand-visibility.webp`,
    imageAlt: '',
    heading: 'Turn AI signals into business impact with Adobe Brand Visibility.',
    body: 'Get the intelligence and tools to win customers in AI searches.',
    ctaLabel: 'Learn more',
    ctaHref: 'https://business.adobe.com/products/brand-visibility.html',
    style: 'container, parallax-scale-down-grid',
    background: '#ffffff',
  },
};

// The library's featured card with its section's metadata, as published.
export const Library = {
  name: 'Milo library',
  render: () => renderPageBlock(`${LIBRARY}/c2/base-card`, 'base-card', { metadata: true, foundation: 'c2' }),
  parameters: { controls: { disable: true } },
};
