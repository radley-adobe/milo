import { expect, waitFor } from 'storybook/test';
import { LIVE, MEDIA, renderSections, waitForMilo } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/carousel-c2';
import variants from 'virtual:variants/c2/carousel-c2';

const description = `
A carousel whose slides are whole sections. It's authored as one row with two cells: the carousel's name, then its accessible label. Each slide is a section after it whose section metadata has a \`carousel\` row with the same name.

- The block takes every section on the page, or in its fragment, whose \`carousel\` metadata matches its name, and moves them into itself in page order. With fewer than two, it shows nothing.
- The first slide shows in the middle, with parts of the slides before and after it at each side. The slides loop.
- A slide is the width of the section less the grid margin on each side. It's 542px high below 768px and at least 542px high from 768px. From 1280px it keeps a 1600:890 ratio, up to 1920 × 890px.
- A slide with a Rich Content block shows its text over the section's background, with a gradient that darkens the start side. The text sits at the bottom of the slide below 768px and in the middle from 768px.
- A section background with two images shows the first below 768px and the second from 768px
- From 768px, previous and next buttons sit at the sides, and a dot for each slide marks the active one. At any width, a drag of more than 100px moves the slides, and so do the left and right arrow keys when focus is in the carousel.
- As the carousel scrolls into view, the slides move in from the sides and the buttons slide in. With reduced motion, nothing animates.
- The block has the \`group\` role, the \`carousel\` role description and its label as its accessible name. A live region announces each new slide's number and text, and the hidden slides' links leave the tab order.
`;

// The name that links the block to its slide sections.
const NAME = 'customer-testimonials';

// An arg as an attribute value.
const attr = (value = '') => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;');

const picture = (src, alt) => `
      <div><picture><img src="${attr(src)}" alt="${attr(alt)}"></picture></div>`;

// One slide section: a Rich Content block over the section's background image, with the mobile
// image first when there is one.
const slide = ({ heading, name, role, ctaLabel, ctaHref, image, mobileImage, imageAlt }) => `
<div>
  <div class="rich-content dark button-lg">
    <div>
      <div>
        ${heading ? `<h3>${heading}</h3>` : ''}
        ${name ? `<p><strong>${name}</strong></p>` : ''}
        ${role ? `<p>${role}</p>` : ''}
        ${ctaLabel ? `<p><em><a href="${attr(ctaHref)}">${ctaLabel}</a></em></p>` : ''}
      </div>
    </div>
  </div>
  <div class="section-metadata">
    ${image ? `<div>
      <div>background</div>${mobileImage ? picture(mobileImage, imageAlt) : ''}${picture(image, imageAlt)}
    </div>` : ''}
    <div><div>carousel</div><div>${NAME}</div></div>
  </div>
</div>`;

// Authored markup for the block's section and its slide sections from a story's args.
const authored = ({ variants: classes = [], label, slides = [] }) => `
<div>
  <div class="${['carousel-c2', ...classes].join(' ')}">
    <div><div>${NAME}</div><div>${label}</div></div>
  </div>
</div>
${slides.map(slide).join('\n')}`.trim();

export default {
  title: 'Blocks/Carousel C2',
  parameters: { cssprops, liveExamples: [LIVE.home], docs: { description: { component: description } } },
  argTypes: {
    variants,
    label: { control: 'text', description: 'Accessible name of the carousel. Leave empty for none.' },
    slides: {
      control: 'object',
      description: 'One slide section each, in order: `heading`, `name` and `role` text, a link from `ctaLabel` and `ctaHref`, and a background `image` with its `imageAlt`. `mobileImage` replaces `image` below 768px. Leave a value empty to leave it out. With fewer than two slides, the block shows nothing.',
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

const testimonial = (file, alt) => ({
  image: `${MEDIA}/carousel-c2/${file}.webp`,
  mobileImage: `${MEDIA}/carousel-c2/${file}-mobile.webp`,
  imageAlt: alt,
});

// The homepage's customer testimonials. `#_button-fill` gives each link the fill button style.
export const Default = {
  render: (args) => renderSections(authored(args), { foundation: 'c2' }),
  parameters: { docs: { source: { language: 'html', transform: (code, { args }) => authored(args) } } },
  args: {
    variants: [],
    label: 'Customer testimonials',
    slides: [{
      heading: '"Creative Cloud lets me create effortlessly and allows me to focus on what\'s important."',
      name: 'Antoni Sendra',
      role: 'Filmmaker',
      ctaLabel: 'See all plans',
      ctaHref: 'https://www.adobe.com/creativecloud/plans.html#_button-fill',
      ...testimonial('antoni-sendra', 'Filmmaker Antoni Sendra, staring thoughtfully at his editing workstation.'),
    }, {
      heading: '“With Acrobat, I can summarize key contract details in seconds.”',
      name: 'Angi Ciccarelli',
      role: 'Real Estate Agent',
      ctaLabel: 'See all plans',
      ctaHref: 'https://www.adobe.com/creativecloud/plans.html#filter=acrobat#_button-fill',
      ...testimonial('angi-ciccarelli', 'Real estate agent Angi Ciccarelli, speaking interview style to someone off screen.'),
    }, {
      heading: '"If it wasn\'t for Creative Cloud, I don\'t think I\'d be here. I feel like I can create anything."',
      name: 'Michelle Phan',
      role: 'Creator',
      ctaLabel: 'See all plans',
      ctaHref: 'https://www.adobe.com/creativecloud/plans.html#_button-fill',
      ...testimonial('michelle-phan', 'Portrait of creator Michelle Phan in a shaggy pink sweater, holding a makeup compact and brush.'),
    }],
  },
};
