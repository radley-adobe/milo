import { ACROBAT_TEST_FRAGMENTS, MEDIA, renderBlock, renderPageBlock } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/plans-hero';
import variants from 'virtual:variants/c2/plans-hero';
import { plansHero } from './authored.js';

const description = `
A hero with an eyebrow, a heading and body copy over an image. It's authored as one row with two cells: the text, then the image.

- The text cell holds an optional eyebrow, a heading and body copy. A paragraph before the heading shows as an eyebrow. The heading shows at \`heading-2\` size whatever its level, and the body copy at \`body-md\` size.
- A link in bold or italics shows as a button
- The heading and body copy are white. The eyebrow is black at 64% opacity, or white at 64% when the block or an element around it has \`dark\`, such as its section or the body, where the Theme menu's Dark puts it.
- \`dark\` gives the block Milo's dark colors, including a #131313 background that shows when there's no image
- The image covers the whole block, behind the text. A gradient over it darkens the left side: below 768px, from clear at the right edge to black at 72% opacity at the left; from 768px, the right half is clear and the left edge is black at 64%. On a right-to-left page, the gradient is mirrored.
- Text after the image in its cell sets the image's focal point as \`x, y\`, such as \`right, top\` or \`70%, 50%\`. It picks the part of the image that stays in view when the block crops it.
- The block adds \`container\` to itself. The image spans the block's full width, and the text has 24px of side padding below 768px and 8.333% of the block's width from 768px, keeping the text within 1920px. In a section with \`container\`, the block has no side padding of its own.
- The text is at most 4 of 6 columns wide below 768px, 6 of 12 from 768px and 5 of 12 from 1024px
- Below 768px, the block is at least 400px tall. From 768px, it's 35% of the window's width tall, up to 600px, and grows to fit its text. The text is centered vertically, and from 1440px it sits at the top, 128px down.
- Rows named \`Mobile-viewport\`, \`Tablet-viewport\` and \`Desktop-viewport\` give the block different content at each viewport: Mobile below 768px, Tablet from 768px and Desktop from 1280px. With no Tablet row, Mobile shows below 1280px. A row on its own shows at every width, and Tablet and Desktop rows with no Mobile row leave the block empty. Classes in parentheses after a row's name, such as \`Mobile-viewport (dark)\`, apply to the block only at that viewport. An empty cell keeps the content of the viewport below it.
- When the next section has \`rounded-corners\` or \`rounded-corners-top\`, the image extends 32px below the block, so it shows behind that section's rounded corners. That section starts at the block's bottom edge, so when it's under 32px tall, the rest of the image shows below it. When the section before has \`rounded-corners\` or \`rounded-corners-bottom\`, the image extends 32px above the block the same way.
`;

// A story that renders the block from its args. Show code gives the authored markup.
const blockStory = {
  render: (args) => renderBlock(plansHero(args), { foundation: 'c2' }),
  parameters: { docs: { source: { language: 'html', transform: (code, { args }) => plansHero(args) } } },
};

export default {
  title: 'Blocks/Plans Hero',
  parameters: { cssprops, docs: { description: { component: description } } },
  argTypes: {
    variants,
    dark: { control: 'boolean', description: 'Give the block Milo\'s dark colors (`dark`), which make the eyebrow light' },
    eyebrow: { control: 'text', description: 'Eyebrow above the heading. Leave empty for none.' },
    showEyebrow: { control: 'boolean', description: 'Show the eyebrow' },
    heading: { control: 'text', description: 'Heading, authored as an `h1`. Leave empty for none, which makes the eyebrow show as body copy.' },
    body: { control: 'text', description: 'Body copy. Leave empty for none.' },
    image: { control: 'text', description: 'Image URL, shown from 768px when `mobileImage` is set. Leave empty to show `mobileImage` at every width, or leave both empty for no image.' },
    mobileImage: { control: 'text', description: 'Image URL below 768px, in a Mobile-viewport row. Leave empty to show `image` at every width, with no viewport rows.' },
    imageAlt: { control: 'text', description: 'Image alt text. Leave empty when the image is decorative.' },
    focalPoint: { control: 'text', description: 'The image\'s focal point as `x, y`, such as `right, top`. Leave empty to center the image.' },
  },
};

// The hero of the Acrobat plans redesign test, with a portrait image below 768px and a wide one
// from 768px.
export const Default = {
  ...blockStory,
  args: {
    variants: [],
    dark: true,
    eyebrow: 'PDF and document essentials',
    showEyebrow: true,
    heading: 'Plans that work for you.',
    body: 'Try with confidence — you can cancel within 14 days of purchase for a full refund.',
    image: `${MEDIA}/plans-hero/acrobat-plans.webp`,
    mobileImage: `${MEDIA}/plans-hero/acrobat-plans-mobile.webp`,
    imageAlt: '',
    focalPoint: '',
  },
};

// The fragment's hero, as published.
export const AcrobatPlans = {
  name: 'Redesign test: Acrobat plans',
  render: () => renderPageBlock(`${ACROBAT_TEST_FRAGMENTS}/ace1205-plans`, 'plans-hero', { metadata: true, foundation: 'c2' }),
  parameters: { controls: { include: ['variants'] } },
};
