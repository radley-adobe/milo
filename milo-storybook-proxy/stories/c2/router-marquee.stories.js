import { HOMEPAGE, LIVE, renderBlock, renderPageBlock } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/router-marquee';
import variants from 'virtual:variants/c2/router-marquee';
import { sectionMetadata } from './authored.js';
import { routerMarquee, SLIDES, SLIDES_DESCRIPTION } from './sections/router-marquee.js';

const description = `
A full-window hero showing one slide at a time, with a card for each along the bottom. It's authored as one row per slide with two cells: the text, then a background image or video.

- The text cell holds an eyebrow, an \`h1\` or \`h2\` heading, body copy, emphasized links for buttons (bold for primary), and the card's SVG icon link and label link
- Rows named \`mobile\`, \`tablet\` and \`desktop\` start each viewport's slides, and \`mobile\` is required. A missing viewport, or an empty cell, takes its content from the viewport below.
- \`starting-marquee\` in the section's metadata moves the slide with that number to the front
- A \`promo-placeholder-slide-<n>\` class on the block hides slide \`n\` and its card until its promotion loads
- Below 1280px, only the primary button shows
- The slides change on their own and loop, or only by hand with reduced motion
- Hovering a card shows its slide, and a swipe the next or previous one
- Hovering a link or button, a swipe or the pause button stops the slides until the play button starts them
- The slides stop when the next section scrolls part way up the window
`;

// Authored markup for the block from a story's args, followed by section metadata when
// `startingSlide` is set.
const authored = ({ startingSlide, ...args }) => [
  routerMarquee(args),
  sectionMetadata({ 'starting-marquee': startingSlide }),
].filter(Boolean).join('\n');

// A story that renders the block from its args. Show code gives the authored markup.
const blockStory = {
  render: (args) => renderBlock(authored(args), { foundation: 'c2' }),
  parameters: { docs: { source: { language: 'html', transform: (code, { args }) => authored(args) } } },
};

// The block fills the window, so its stories have no padding around them.
export default {
  title: 'Blocks/Router Marquee',
  parameters: { cssprops, layout: 'fullscreen', liveExamples: [LIVE.home], docs: { description: { component: description } } },
  argTypes: {
    variants,
    slides: { control: 'object', description: SLIDES_DESCRIPTION },
    startingSlide: {
      control: { type: 'number', min: 1 },
      description: 'Number of the slide to show first, from 1, authored as `starting-marquee` in the section\'s metadata',
    },
  },
};

// The homepage's slides, with its section's `starting-marquee`.
export const Default = {
  ...blockStory,
  args: { variants: [], slides: SLIDES, startingSlide: 1 },
};

// The homepage's block as published. Its slides' text loads from www.adobe.com, which doesn't
// allow requests from Storybook, so the slides show only their backgrounds and icons.
export const Homepage = {
  name: 'adobe.com: Homepage',
  render: () => renderPageBlock(HOMEPAGE, 'router-marquee', { foundation: 'c2' }),
  parameters: { controls: { include: ['variants'] } },
};
