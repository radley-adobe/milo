import { HOMEPAGE, LIVE, renderPageSections, renderSections } from '../../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/router-marquee';
import { section, sectionMetadata } from '../authored.js';
import { routerMarquee, SLIDES, SLIDES_DESCRIPTION } from './router-marquee.js';

const description = `
A [Router Marquee](?path=/docs/blocks-router-marquee--docs) pinned to the top of a page. The next section scrolls up over it. The section holds the Router Marquee block, and its metadata sets the first slide and the motion.

- \`parallax-move-up-fast\` pins the section to the top of the window. As the page scrolls through the first 80% of the window's height, the section moves up by 35% of the window's height, or 50% from 1280px to 1440px wide in a window under 900px tall, and darkens to 75% black. The next section scrolls up over it.
- With reduced motion, the section scrolls with the page and doesn't darken
- Focusing a link or button in a \`parallax-move-up-fast\` section scrolls the page back to the top
- \`starting-marquee\` gives the number of the slide to show first. The block moves that slide and its card to the front.
- The slides stop when the next section is 30% of the way up the window and start again when the page scrolls back above it, unless they were stopped by hand
- The next section here is the homepage's Rich Content section after the marquee. Its \`rounded-corners-top\` style rounds its top corners and moves it up over the marquee by 22px, or 32px from 1280px. Its metadata sets a white background, which Storybook shows in the theme's default background color, so it follows the Theme menu.
- On this page, each story is taller than its frame, because the block grows with the frame. The next section shows when the story scrolls inside the frame.
- Style values are separated by a comma and a space. A space inside a value becomes a hyphen, and capitals don't matter.
- The block is the height of the window, or taller when its content needs it, and shows one slide at a time with a card for each slide along the bottom. The slides change every 5 seconds and loop.
- Each slide holds an eyebrow, a heading, body copy, buttons, and the card's icon and label, over a background image or video under a dark gradient on the text's side
- The heading is an \`h1\` or \`h2\`, and the paragraph before it is the eyebrow. Every slide needs a heading. Without one, the slide's eyebrow shows as body copy, and the block stops before it starts the slides: they don't change, and hovering a card, a swipe, the pause button and the back-to-first button do nothing.
- The heading is 40px below 768px, 56px from 768px and 80px from 1280px. Body copy is 16px, 18px and 20px.
- A paragraph of emphasized links holds the buttons: a bold one is the primary button and the other one the secondary. Below 1280px, only the primary button shows.
- The icon is a link to an SVG, alone in its paragraph, and the next paragraph holds the label, a link. The block moves both into the slide's card, which shows the icon and label and links to the label's URL. A slide with no icon gets a card labeled with its heading. A card whose label isn't a link has an empty URL, so it links to the current page.
- The block's \`mobile\` row starts the slides below 768px, and a \`tablet\` row the slides from 768px, which also show from 1280px when the block has no \`desktop\` row. In a \`tablet\` slide row, an empty text cell keeps the mobile row's text, so the row changes only the background.
- From 1280px, the cards sit side by side, each up to 220px wide, with the pause button after them, or above them when the row doesn't fit the window. Below 1280px, they sit in one row that moves to bring the active card to the start, with the pause button above them and a button at the end that goes back to the first slide. With a mouse below 1280px, a next button in the pause button's row replaces it.
- Hovering a card shows its slide, and a swipe of more than 100px across the block shows the next or previous one. Hovering or focusing any link or button in the block, a swipe, or the pause button stops the slides until the play button starts them again. With reduced motion, the slides start stopped and the play button doesn't start them. They change only by hand, without sliding.
- The cards are a tab list, with each card a tab named by the eyebrow and label, and each slide a tab panel with the \`slide\` role description. The hidden slides are inert. While the slides play, a hint for screen readers suggests pausing them.
- A \`promo-placeholder-slide-<n>\` class on the block hides slide \`n\` and its card until the slide's Merch at Scale field resolves to a promotion. Storybook can't show it, because that content loads from www.adobe.com.
`;

// The homepage's Rich Content section after the marquee, which scrolls up over it.
const NEXT = section(`
<div class="rich-content center container wide body-lg parallax-line-height">
  <div>
    <div>
      <h2>Everything you need to make anything.</h2>
      <p>Whether you're a student, social influencer, creative professional, performance marketer, or global brand, Adobe has the apps you need to make it happen.</p>
    </div>
  </div>
</div>`.trim(), sectionMetadata({ style: 'rounded-corners-top, spacing-xl-top, spacing-xs-bottom', background: '#fff' }));

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
