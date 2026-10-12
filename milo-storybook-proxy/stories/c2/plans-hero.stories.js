import { ACROBAT_TEST_FRAGMENTS, MEDIA, renderBlock, renderPageBlock } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/plans-hero';
import variants from 'virtual:variants/c2/plans-hero';
import { plansHero } from './authored.js';

const description = `
A hero with an eyebrow, a heading and body copy over an image. It's authored as one row with two cells: the text, then the image.

- A paragraph before the heading shows as an eyebrow. The heading shows at \`heading-2\` size and the body copy at \`body-md\` size. A link in bold or italics shows as a button.
- \`dark\` gives the block Milo's dark colors. The heading and body copy are light with or without it. With \`dark\` on the block or an element around it, the eyebrow is light.
- Text after the image in its cell, such as \`right, top\` or \`70%, 50%\`, sets the image's focal point: the part that stays in view when it's cropped
- From 768px, the block's height follows the window's width, up to a maximum. It grows to fit its text.
- Rows named \`Mobile-viewport\`, \`Tablet-viewport\` and \`Desktop-viewport\` give the block different content at each viewport. An empty cell keeps the content of the viewport below it.
- When the next section has \`rounded-corners\` or \`rounded-corners-top\`, the image extends below the block, behind that section's rounded corners. When the section before has \`rounded-corners\` or \`rounded-corners-bottom\`, it extends above the block.
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
    dark: { control: 'boolean', description: 'Give the block Milo\'s dark colors (`dark`)' },
    eyebrow: { control: 'text', description: 'Eyebrow above the heading. Leave empty for none.' },
    showEyebrow: { control: 'boolean', description: 'Show the eyebrow' },
    heading: { control: 'text', description: 'Heading, authored as an `h1`. Leave empty for none.' },
    body: { control: 'text', description: 'Body copy. Leave empty for none.' },
    image: { control: 'text', description: 'Image URL, shown from 768px when `mobileImage` is set' },
    mobileImage: { control: 'text', description: 'Image URL below 768px, in a Mobile-viewport row' },
    imageAlt: { control: 'text', description: 'Image alt text' },
    focalPoint: { control: 'text', description: 'The image\'s focal point as `x, y`, such as `right, top`' },
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
