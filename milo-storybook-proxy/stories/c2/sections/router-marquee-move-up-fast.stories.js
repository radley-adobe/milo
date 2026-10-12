import { HOMEPAGE, HOMEPAGE_FRAGMENTS, LIVE, renderPageSections, renderSections } from '../../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/router-marquee';
import { section, sectionMetadata } from '../authored.js';
import { routerMarquee, SLIDES, SLIDES_DESCRIPTION } from './router-marquee.js';

const description = `
A [Router Marquee](?path=/docs/blocks-router-marquee--docs) pinned to the top of a page. The next section scrolls up over it. The section holds the Router Marquee block, and its metadata sets the first slide and the motion.

- \`parallax-move-up-fast\` pins the section to the top of the window. As the page scrolls, the section moves up and darkens. The next section scrolls up over it.
- With reduced motion, the section scrolls with the page and doesn't darken
- Focusing a link or button in a \`parallax-move-up-fast\` section scrolls the page back to the top
- \`starting-marquee\` gives the number of the slide to show first. The block moves that slide and its card to the front.
- The slides stop when the next section scrolls part way up the window and start again when the page scrolls back, unless they were stopped by hand
- Style values are separated by a comma and a space. A space inside a value becomes a hyphen, and capitals don't matter.
- The block is the height of the window, or taller when its content needs it, and shows one slide at a time with a card for each slide along the bottom
- A row whose first cell is \`mobile\`, \`tablet\` or \`desktop\` (or \`mobile-viewport\` and so on) starts that viewport's slides, one row per slide with two cells: the text, then the background. Mobile shows below 768px, tablet from 768px and desktop from 1280px. The block needs a \`mobile\` row.
- A viewport with no row gets a copy of the slides below it. In a slide row, an empty cell keeps that cell of the same slide in the viewport below.
- Each slide holds an eyebrow, a heading, body copy, buttons, and the card's icon and label, over a background image or video under a dark gradient on the text's side
- The heading is an \`h1\` or \`h2\`, and the paragraph before it is the eyebrow. Every slide needs a heading.
- A paragraph of emphasized links holds the buttons: a bold one is the primary button and the other one the secondary. Below 1280px, only the primary button shows.
- The icon is a link to an SVG, alone in its paragraph, and the next paragraph holds the label, a link. The block moves both into the slide's card, which links to the label's URL.
- Other paragraphs are body copy
- A background video plays muted and looped while its slide shows, and stops when the slides stop
- The slides change on their own and loop, sliding in from the side with their text following. A bar along the active card fills until the next slide.
- From 1280px, the cards sit side by side, each with its icon above its label, with the pause button after them, or above them when the row doesn't fit the window. Below 1280px, they sit in one row that moves to bring the active card to the start, each with its icon beside its label, with the pause button above them and a button at the end that goes back to the first slide. With a mouse below 1280px, a next button beside the pause button replaces the button at the end.
- Hovering a card shows its slide, and a swipe shows the next or previous one. Hovering or focusing a link or button in the block, a swipe, or the pause button stops the slides until the play button starts them again. With reduced motion, the slides start stopped and change only by hand, without sliding.
- A \`promo-placeholder-slide-<n>\` class on the block hides the \`n\`th authored slide and its card until the slide's Merch at Scale field resolves to a promotion
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
      description: 'Number of the slide to show first, from 1, authored as `starting-marquee`. Leave empty to show the slides in order.',
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
