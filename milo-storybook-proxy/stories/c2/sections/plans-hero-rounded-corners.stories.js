import { ACROBAT_TEST_FRAGMENTS, MEDIA, renderPageSections, renderSections } from '../../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/plans-hero';
import { plansHero, section, sectionMetadata } from '../authored.js';

const description = `
A [Plans Hero](?path=/docs/blocks-plans-hero--docs) in its own section, followed by a section whose rounded top corners overlap the hero's image. The hero's section has no metadata. The next section's metadata sets its corners, width, spacing and background.

- \`rounded-corners-top\` rounds the next section's top corners and moves the section up over a space Milo adds at the end of the hero's section
- The hero's image extends below the block, so it fills that space and shows behind the rounded corners
- \`rounded-corners\` rounds all four corners of a section, and \`rounded-corners-bottom\` its bottom corners, with the same radius, overlap and space. When the section before the hero's has either one, the hero's image extends above the block the same way.
- \`container\` gives the section side padding and a maximum width for its content
- \`spacing-sm-top\` adds padding above the section's content
- \`background\` sets the section's background color
- Style values are separated by a comma and a space. A space inside a value becomes a hyphen, so \`rounded corners top\` is the class \`rounded-corners-top\`, and capitals don't matter.
- The hero is authored as one row with two cells: the text, then the image. The text cell holds an optional eyebrow, a heading and body copy. A paragraph before the heading shows as an eyebrow. The heading shows at \`heading-2\` size whatever its level, and the body copy at \`body-md\` size.
- A link in bold or italics in the hero's text shows as a button
- \`dark\` gives the hero Milo's dark colors. With \`dark\` on the hero or an element around it, such as its section, the eyebrow is light.
- The image covers the whole hero, behind the text. A gradient over it darkens the left side, or the right side on a right-to-left page.
- Text after the image in its cell sets the image's focal point as \`x, y\`, such as \`right, top\` or \`70%, 50%\`: the part that stays in view when the hero crops it
- The hero adds \`container\` to itself. The image spans the hero's full width, and the text has side padding. The text lines up with the content of a section with \`container\`, such as the next section. In a section with \`container\`, the hero has no side padding of its own.
- The hero's text is at most 4 of 6 columns wide below 768px, 6 of 12 from 768px and 5 of 12 from 1024px
- From 768px, the hero's height follows the window's width, up to a maximum, and grows to fit its text. The text is centered vertically, and from 1440px it sits at the top.
- Rows named \`Mobile-viewport\`, \`Tablet-viewport\` and \`Desktop-viewport\` give the hero different content at each viewport: Mobile below 768px, Tablet from 768px and Desktop from 1280px. With no Tablet row, Mobile shows below 1280px. Classes in parentheses after a row's name, such as \`Mobile-viewport (dark)\`, apply to the hero only at that viewport. An empty cell keeps the content of the viewport below it.
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
    dark: { control: 'boolean', description: 'Give the hero Milo\'s dark colors (`dark`), which make the eyebrow light' },
    eyebrow: { control: 'text', description: 'Eyebrow above the heading. Leave empty for none.' },
    showEyebrow: { control: 'boolean', description: 'Show the eyebrow' },
    heading: { control: 'text', description: 'Heading, authored as an `h1`. Leave empty for none.' },
    body: { control: 'text', description: 'Body copy. Leave empty for none.' },
    image: { control: 'text', description: 'Image URL, shown from 768px when `mobileImage` is set. Leave empty to show `mobileImage` at every width.' },
    mobileImage: { control: 'text', description: 'Image URL below 768px, in a Mobile-viewport row. Leave empty to show `image` at every width.' },
    imageAlt: { control: 'text', description: 'Image alt text. Leave empty when the image is decorative.' },
    focalPoint: { control: 'text', description: 'The image\'s focal point as `x, y`, such as `right, top`. Leave empty to center the image.' },
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
