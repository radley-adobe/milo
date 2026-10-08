import { LIVE, renderSections } from '../../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/carousel-c2';
import { carousel, slide, TESTIMONIALS } from './slide.js';

const description = `
A single slide in a [Carousel C2](?path=/docs/blocks-carousel-c2--docs). A Slide is a section and shows only inside a carousel. It's authored as a section with a Rich Content block, and section metadata with a \`background\` row for its image and a \`carousel\` row with the carousel's name.

- The carousel moves in every section on the page, or in its fragment, whose \`carousel\` row matches its name. It adds \`carousel-slide\` to the section and gives it the \`group\` role and the \`slide\` role description. The slide's styles apply only inside the carousel.
- A slide is the width of the carousel less the grid margin on each side. It's 542px high below 768px and at least 542px high from 768px. From 1280px it keeps a 1600:890 ratio, up to 1920 × 890px.
- The section's background fills the slide, with rounded corners and a gradient that darkens the start side. A background with two images shows the first below 768px and the second from 768px.
- The Rich Content block's text sits over the background, at the bottom of the slide below 768px and in the middle from 768px. The homepage's slides use \`dark\` for light text and \`button-lg\` for a large button.
- An opening quote mark at the start of the heading hangs outside the text's edge
- A bold paragraph shows at eyebrow size
- Only the active slide shows its text
`;

export default {
  title: 'Sections/Slide',
  parameters: { cssprops, liveExamples: [LIVE.home], docs: { description: { component: description } } },
  argTypes: {
    heading: { control: 'text', description: 'Heading, authored as an `h3`. Leave empty for none.' },
    name: { control: 'text', description: 'Name, authored in bold. Leave empty for none.' },
    role: { control: 'text', description: 'Role, below the name. Leave empty for none.' },
    showAttribution: { control: 'boolean', description: 'Show the name and role' },
    ctaLabel: { control: 'text', description: 'Link text. Leave empty for no link.' },
    ctaHref: { control: 'text', description: 'Link URL. `#_button-fill` at the end gives the button the `fill` style.' },
    showCta: { control: 'boolean', description: 'Show the link' },
    image: { control: 'text', description: 'Background image URL. Leave empty for no background.' },
    mobileImage: { control: 'text', description: 'Background image URL below 768px. Leave empty to use `image` at every width.' },
    imageAlt: { control: 'text', description: 'Image alt text. Leave empty when the image is decorative.' },
  },
};

const { heading, name, role, ctaLabel, ctaHref, image, mobileImage, imageAlt } = TESTIMONIALS[0];

// The homepage's first testimonial, in a carousel with the other two, so it shows at a slide's
// size. Show code gives the slide's section.
export const Default = {
  render: (args) => renderSections([
    carousel({ label: 'Customer testimonials' }),
    slide(args),
    ...TESTIMONIALS.slice(1).map(slide),
  ].join('\n'), { foundation: 'c2' }),
  parameters: { docs: { source: { language: 'html', transform: (code, { args }) => slide(args) } } },
  args: { heading, name, role, showAttribution: true, ctaLabel, ctaHref, showCta: true, image, mobileImage, imageAlt },
};
