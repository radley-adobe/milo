import { expect, waitFor } from 'storybook/test';
import { LIVE, renderSections, waitForMilo } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/carousel-c2';
import variants from 'virtual:variants/c2/carousel-c2';
import { carousel, slide, TESTIMONIALS } from './sections/slide.js';

const description = `
A horizontal carousel built with [Slides](?path=/docs/sections-slide--docs). It's authored as one row with two cells: the carousel's name, then its accessible label. A Slide section joins the carousel when its section metadata has a \`carousel\` row with that name.

- The block finds its Slide sections on the page, or in its fragment, and moves them into itself in page order. With fewer than two, it shows nothing.
- The first slide shows in the middle, with parts of the slides before and after it at each side. The slides loop.
- From 768px, previous and next buttons sit at the sides, and a dot for each slide marks the active one. At any width, a drag of more than 100px moves the slides, and so do the left and right arrow keys when focus is in the carousel.
- As the carousel scrolls into view, the slides move in from the sides and the buttons slide in. With reduced motion, nothing animates.
- The block has the \`group\` role, the \`carousel\` role description and its label as its accessible name. A live region announces each new slide's number and text, and the hidden slides' links leave the tab order.
`;

// Authored markup for the block's section and its slide sections from a story's args.
const authored = (args) => [carousel(args), ...(args.slides ?? []).map(slide)].join('\n');

export default {
  title: 'Blocks/Carousel C2',
  parameters: { cssprops, liveExamples: [LIVE.home], docs: { description: { component: description } } },
  argTypes: {
    variants,
    label: { control: 'text', description: 'Accessible name of the carousel. Leave empty for none.' },
    slides: {
      control: 'object',
      description: 'One Slide section each, in order: `heading`, `name` and `role` text, a link from `ctaLabel` and `ctaHref`, and a background `image` with its `imageAlt`. `mobileImage` replaces `image` below 768px. Leave a value empty to leave it out. With fewer than two slides, the block shows nothing.',
    },
  },
  // Moves to the next slide. The carousel clones slides at each end, so this follows the slide
  // indicators instead.
  play: async (context) => {
    await waitForMilo(context);
    await expect(context.canvasElement.querySelector('main').dataset.miloStatus).toBe('loaded');
    const active = () => context.canvasElement.querySelector('.slide-indicator.active');
    const first = active();
    await context.userEvent.click(context.canvas.getByRole('button', { name: 'Next slide' }));
    await waitFor(() => expect(active()).not.toBe(first));
  },
};

// The homepage's customer testimonials.
export const Default = {
  render: (args) => renderSections(authored(args), { foundation: 'c2' }),
  parameters: { docs: { source: { language: 'html', transform: (code, { args }) => authored(args) } } },
  args: { variants: [], label: 'Customer testimonials', slides: TESTIMONIALS },
};
