import { HOMEPAGE, HOMEPAGE_FRAGMENTS, LIVE, renderPageSections, renderSections } from '../../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/router-marquee';
import { section, sectionMetadata } from '../authored.js';
import { routerMarquee, SLIDES, SLIDES_DESCRIPTION } from './router-marquee.js';

const description = `
A [Router Marquee](?path=/docs/blocks-router-marquee--docs) pinned to the top of a page, with the next section scrolling up over it. The section holds the block, and its metadata sets the first slide and the motion.

- \`parallax-move-up-fast\` pins the section to the top of the window, where it moves up and darkens as the page scrolls. With reduced motion, it scrolls with the page and doesn't darken.
- \`starting-marquee\` moves the slide with that number to the front
- The block is a full-window hero showing one slide at a time. It's authored as one row per slide with two cells: the text, then a background image or video.
- Rows named \`mobile\`, \`tablet\` and \`desktop\` start each viewport's slides, and \`mobile\` is required. A missing viewport copies the one below, and an empty cell keeps the same slide's cell from the viewport below.
- Below 1280px, only the primary (bold) button shows
- The slides change on their own and loop, or only by hand with reduced motion
- Hovering or focusing a link or button in the block, a swipe, or the pause button stops the slides until the play button starts them
- The slides stop when the next section scrolls part way up the window, and start again when it scrolls back unless they were stopped by hand
`;

// The section after the homepage's marquee, which scrolls up over it: a link to the fragment that
// holds the homepage's Rich Content and Elastic Carousel sections. Milo puts the fragment's
// sections inside this one. A `rounded-corners-top` section right after the marquee's section
// would give the marquee's section a short `::after` from section-metadata.css, which replaces
// its darkening overlay with a strip at its top.
const NEXT_FRAGMENT = `${HOMEPAGE_FRAGMENTS}/everything-you-need/everything-you-need`;
const NEXT = section(`<p><a href="${NEXT_FRAGMENT}">${NEXT_FRAGMENT}</a></p>`);

// The section's authored markup from a story's args.
const authored = ({ slides, startingSlide, style }) => section(
  routerMarquee({ slides }),
  sectionMetadata({ 'starting-marquee': startingSlide, style }),
);

export default {
  title: 'Sections/Router Marquee (Move Up Fast)',
  parameters: { cssprops, layout: 'fullscreen', liveExamples: [LIVE.home], docs: { description: { component: description } } },
  argTypes: {
    slides: { control: 'object', description: SLIDES_DESCRIPTION },
    startingSlide: {
      control: { type: 'number', min: 1 },
      description: 'Number of the slide to show first, from 1, authored as `starting-marquee`',
    },
    style: { control: 'text', description: 'The section\'s style: classes separated by a comma and a space. Leave empty for none.' },
  },
};

// The homepage's marquee section, followed by the section that scrolls over it. Show code gives
// the marquee's section.
export const Default = {
  render: (args) => renderSections([authored(args), NEXT].join('\n'), { foundation: 'c2' }),
  parameters: { docs: { source: { language: 'html', transform: (code, { args }) => authored(args) } } },
  args: { slides: SLIDES, startingSlide: 1, style: 'parallax-move-up-fast' },
};

// The homepage's marquee section and the fragment after it, as published. The slides' text
// loads from www.adobe.com, which doesn't allow requests from Storybook, so the slides show only
// their backgrounds and icons.
export const Homepage = {
  name: 'adobe.com: Homepage',
  render: () => renderPageSections(HOMEPAGE, 'router-marquee', { count: 2, foundation: 'c2' }),
  parameters: { controls: { disable: true } },
};
