import { HOMEPAGE, LIVE, renderBlock, renderPageBlock } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/router-marquee';
import variants from 'virtual:variants/c2/router-marquee';
import { sectionMetadata } from './authored.js';
import { routerMarquee, SLIDES, SLIDES_DESCRIPTION } from './sections/router-marquee.js';

const description = `
A full-window hero that shows one slide at a time. A card for each slide sits along the bottom. It's authored as a row naming a viewport, then one row per slide with two cells: the text, then the background.

- A row whose first cell is \`mobile\`, \`tablet\` or \`desktop\` (or \`mobile-viewport\` and so on) starts that viewport's slides. Mobile shows below 768px, tablet from 768px and desktop from 1280px. The block needs a \`mobile\` row.
- A viewport with no row gets a copy of the slides below it. In a viewport's slide row, an empty cell keeps that cell of the same slide in the viewport below, so a \`tablet\` row can change only the background.
- The text cell holds an eyebrow, a heading, body copy, buttons, an icon and the card's label. The heading is an \`h1\` or \`h2\`, and the paragraph before it is the eyebrow. Every slide needs a heading. Without one, the slide's eyebrow shows as body copy, and the block stops before it starts the slides: they don't change, and hovering a card, a swipe, the pause button and the back-to-first button do nothing.
- The heading is 40px below 768px, 56px from 768px and 80px from 1280px. Body copy is 16px, 18px and 20px.
- A paragraph of emphasized links holds the buttons: a bold one is the primary button and the other one the secondary. Below 1280px, only the primary button shows.
- The icon is a link to an SVG, alone in its paragraph, and the next paragraph holds the label, a link. The block moves both into the slide's card, which shows the icon and label and links to the label's URL. A slide with no icon gets a card labeled with its heading. A card whose label isn't a link has an empty URL, so it links to the current page.
- Other paragraphs are body copy
- The background cell holds an image or a video, which covers the slide under a dark gradient on the text's side. A video plays muted and looped while its slide shows, from the start each time, and stops when the slides stop.
- The text starts 88px from the top below 1280px. From 1280px it starts 144px from the top, or 88px when it would otherwise reach the cards. It's up to 484px wide below 1280px and 662px from 1280px. The cards sit 80px from the bottom. The block grows taller than the window when its content needs it.
- The slides change every 5 seconds and loop, sliding in from the side with their text following. The active card is white, and a red bar along its bottom fills until the next slide. When the first slide has a video, the slides start once it shows its first frame, or after 8 seconds.
- From 1280px, the cards sit side by side, each up to 220px wide, with the pause button after them, or above them when the row doesn't fit the window. Below 1280px, they sit in one row that moves to bring the active card to the start, with the pause button above them and a button at the end that goes back to the first slide. With a mouse below 1280px, a next button in the pause button's row replaces it.
- Below 1280px, when the next section has \`parallax-move-up-fast\`, the controls move in 24px from each side and the cards sit 160px from the bottom
- Hovering a card shows its slide. A swipe of more than 100px across the block shows the next or previous slide.
- Hovering or focusing any link or button in the block, a swipe, or the pause button stops the slides until the play button starts them again
- The slides stop when the next section is 30% of the way up the window and start again when the page scrolls back above it, unless they were stopped by hand. With reduced motion, they start stopped and the play button doesn't start them. They change only by hand, without sliding.
- \`starting-marquee\` in the section's metadata gives the number of the slide to show first. The block moves that slide and its card to the front.
- \`promo-placeholder-slide-<n>\` hides slide \`n\` and its card until the slide's Merch at Scale field resolves to a promotion. Storybook can't show it, because that content loads from www.adobe.com.
- The cards are a tab list, with each card a tab named by the eyebrow and label, and each slide a tab panel with the \`slide\` role description. The hidden slides are inert. While the slides play, a hint for screen readers suggests pausing them.
- The block builds the slides for each viewport and shows the one that fits the window. Moving between viewports keeps the active slide and whether the slides are stopped.
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
