import { HOMEPAGE, LIVE, renderBlock, renderPageBlock } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/router-marquee';
import variants from 'virtual:variants/c2/router-marquee';
import { sectionMetadata } from './authored.js';
import { routerMarquee, SLIDES, SLIDES_DESCRIPTION } from './sections/router-marquee.js';

const description = `
A full-window hero that shows one slide at a time. A card for each slide sits along the bottom. It's authored as a row naming a viewport, then one row per slide with two cells: the text, then the background.

- A row whose first cell is \`mobile\`, \`tablet\` or \`desktop\` (or \`mobile-viewport\` and so on) starts that viewport's slides. Mobile shows below 768px, tablet from 768px and desktop from 1280px. The block needs a \`mobile\` row.
- A viewport with no row gets a copy of the slides below it. In a slide row, an empty cell keeps that cell of the same slide in the viewport below.
- The text cell holds an eyebrow, a heading, body copy, buttons, an icon and the card's label. The heading is an \`h1\` or \`h2\`, and the paragraph before it is the eyebrow. Every slide needs a heading.
- A paragraph of emphasized links holds the buttons: a bold one is the primary button and the other one the secondary. Below 1280px, only the primary button shows.
- The icon is a link to an SVG, alone in its paragraph, and the next paragraph holds the label, a link. The block moves both into the slide's card, which links to the label's URL.
- Other paragraphs are body copy
- The background cell holds an image or a video, which covers the slide under a dark gradient on the text's side. A video plays muted and looped while its slide shows.
- The block grows taller than the window when its content needs it
- The slides change on their own and loop. A bar along the active card fills until the next slide.
- From 1280px, the cards sit side by side. Below 1280px, they sit in one row that moves to bring the active card to the start.
- Hovering a card shows its slide, and a swipe shows the next or previous one. Hovering or focusing a link or button in the block, a swipe, or the pause button stops the slides until the play button starts them again.
- The slides stop when the next section scrolls part way up the window and start again when the page scrolls back, unless they were stopped by hand
- With reduced motion, the slides start stopped and change only by hand, without sliding
- \`starting-marquee\` in the section's metadata gives the number of the slide to show first. The block moves that slide and its card to the front.
- A \`promo-placeholder-slide-<n>\` class on the block hides the \`n\`th authored slide and its card until the slide's Merch at Scale field resolves to a promotion
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
      description: 'Number of the slide to show first, from 1, authored as `starting-marquee` in the section\'s metadata. Leave empty for no section metadata, which shows the slides in order.',
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
