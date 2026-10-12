import { ACROBAT_TEST_FRAGMENTS, MEDIA, renderPageSections, renderSections } from '../../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/plans-hero';
import { plansHero, section, sectionMetadata } from '../authored.js';

const description = `
A [Plans Hero](?path=/docs/blocks-plans-hero--docs) in its own section, then a section whose rounded top corners overlap the hero's image. The next section's metadata sets its corners, width, spacing and background.

- \`rounded-corners-top\` rounds the next section's top corners and moves it up over a space at the end of the hero's section, where the hero's image extends behind the corners
- \`rounded-corners\` rounds all four corners of a section, and \`rounded-corners-bottom\` its bottom corners. When the section before the hero's has either one, the image extends above the hero.
- \`container\` gives the section side padding and a maximum width for its content
- \`spacing-sm-top\` adds padding above the section's content
- \`background\` sets the section's background color
- The hero is authored as one row with two cells: the text, then the image behind it. A paragraph before the heading shows as an eyebrow.
- \`dark\` gives the hero Milo's dark colors. The heading and body copy are light with or without it. With \`dark\` on the hero or an element around it, the eyebrow is light.
- Text after the image in its cell, such as \`right, top\`, sets the image's focal point
- Rows named \`Mobile-viewport\`, \`Tablet-viewport\` and \`Desktop-viewport\` give the hero different content at each viewport. An empty cell keeps the content of the viewport below it.
`;

// The sections' authored markup from a story's args: the hero's section, then the next section,
// which holds only its metadata.
const authored = ({ nextStyle, nextBackground, ...hero }) => [
  section(plansHero(hero)),
  section(sectionMetadata({ style: nextStyle, background: nextBackground })),
].join('\n');

export default {
  title: 'Sections/Plans Hero (Rounded Corners)',
  parameters: { cssprops, docs: { description: { component: description } } },
  argTypes: {
    dark: { control: 'boolean', description: 'Give the hero Milo\'s dark colors (`dark`)' },
    eyebrow: { control: 'text', description: 'Eyebrow above the heading. Leave empty for none.' },
    showEyebrow: { control: 'boolean', description: 'Show the eyebrow' },
    heading: { control: 'text', description: 'Heading, authored as an `h1`. Leave empty for none.' },
    body: { control: 'text', description: 'Body copy. Leave empty for none.' },
    image: { control: 'text', description: 'Image URL, shown from 768px when `mobileImage` is set' },
    mobileImage: { control: 'text', description: 'Image URL below 768px, in a Mobile-viewport row' },
    imageAlt: { control: 'text', description: 'Image alt text' },
    focalPoint: { control: 'text', description: 'The image\'s focal point as `x, y`, such as `right, top`' },
    nextStyle: { control: 'text', description: 'The next section\'s style: classes separated by a comma and a space. Leave empty for none.' },
    nextBackground: { control: 'text', description: 'The next section\'s background color. Leave empty for none.' },
  },
};

// The hero of the Acrobat plans redesign test and the section after it.
export const Default = {
  render: (args) => renderSections(authored(args), { foundation: 'c2' }),
  parameters: { docs: { source: { language: 'html', transform: (code, { args }) => authored(args) } } },
  args: {
    dark: true,
    eyebrow: 'PDF and document essentials',
    showEyebrow: true,
    heading: 'Plans that work for you.',
    body: 'Try with confidence — you can cancel within 14 days of purchase for a full refund.',
    image: `${MEDIA}/plans-hero/acrobat-plans.webp`,
    mobileImage: `${MEDIA}/plans-hero/acrobat-plans-mobile.webp`,
    imageAlt: '',
    focalPoint: '',
    nextStyle: 'container, spacing-sm-top, rounded-corners-top',
    nextBackground: '#fff',
  },
};

// The fragment's hero section and the section after it, as published.
export const AcrobatPlans = {
  name: 'Redesign test: Acrobat plans',
  render: () => renderPageSections(`${ACROBAT_TEST_FRAGMENTS}/ace1205-plans`, 'plans-hero', { count: 2, foundation: 'c2' }),
  parameters: { controls: { disable: true } },
};
