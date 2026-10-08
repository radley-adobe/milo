import { renderSections } from '../../../src/milo.js';
import { attr, section, sectionMetadata } from '../authored.js';

// One explore card, with the image for `theme`. `light` and `dark` each give an image `src`. An
// image with a `color` sits in front of that background color, in the card's second row, as on
// the Acrobat pages. One without fills the card, as on the Creative Cloud pages. The heading and
// body stay the same in both themes and take the theme's text colors.
function card({ heading, body, light, dark }, theme) {
  const { src, color } = (theme === 'dark' ? dark : light) ?? {};
  const picture = src ? `<picture><img src="${attr(src)}" alt=""></picture>` : '';
  const text = `
    <div>
      ${heading ? `<h3>${heading}</h3>` : ''}
      ${body ? `<p>${body}</p>` : ''}
    </div>`;
  const rows = color ? `
  <div>${text}
    <div>${color}</div>
  </div>
  <div>
    <div>${picture}</div>
  </div>` : `
  <div>${text}
    <div>${picture}</div>
  </div>`;
  return `<div class="explore-card heading-6">${rows}\n</div>`;
}

// The section's authored markup from a story's args, with each card's image for `theme`.
const authored = ({ cards = [], style, layout, masonry }, theme) => section(
  ...cards.map((c) => card(c, theme)),
  sectionMetadata({ style, layout, masonry }),
);

export const argTypes = {
  cards: {
    control: 'object',
    description: 'One explore card each, in order: a `heading`, `body`, and an image for each theme in `light` and `dark`, each with a `src` and an optional background `color`. Leave a value empty to leave it out.',
  },
  style: { control: 'text', description: 'The section\'s style: classes separated by a comma and a space. Leave empty for none.' },
  layout: { control: 'text', description: 'The section\'s layout: `bento`, plus `stack-mobile` to stack the cards as the page scrolls below 768px. Leave empty for none.' },
  masonry: { control: 'text', description: 'Each card\'s span from 768px, in order, separated by commas or line breaks: `span 1` to `span 6` of 12 columns, or `full width`. `span 7` to `span 11` work only from 1280px. Leave empty for none.' },
};

// A story that renders its cards in an example bento section, with each card's image for the
// Theme menu's theme. The section has no background color, so it follows the theme too. Show
// code gives the authored markup.
export const bentoStory = {
  render: (args, { globals }) => renderSections(authored(args, globals.theme), { foundation: 'c2' }),
  parameters: { docs: { source: { language: 'html', transform: (code, { args, globals }) => authored(args, globals.theme) } } },
};

// The Docs description of a bento section, after a `lead` sentence on how it lays out its cards.
export const description = (lead) => `
${lead}

- The cards are [Explore Cards](?path=/docs/blocks-explore-card--docs). With \`bento\` in the layout, each card shows its image without hovering, aligned to its top. On hover, the image dims slightly and grows by 1.5%, with no gradient.
- A spacer above the text sets each card's shape: 1:1.1 below 768px and 1:0.88 from 768px, or 4:1.65 for a full-width card from 768px
- The heading and body copy sit at the bottom of the card, 24px from its sides, or 32px from 1440px, and up to 450px wide
- A card whose image cell holds a color, such as \`#f6f6f6\`, takes that background color, and an image in a second row shows in front of it, as on the Acrobat pages. An image in the image cell fills the card, as on the Creative Cloud pages.
- \`masonry\` lays the cards out on 12 columns from 768px, 8px apart. Each value gives the next card's span, separated by commas or line breaks: \`span 6\` for half the width, \`span 4\` for a third, or \`full width\`. \`span 7\` to \`span 11\` work only from 1280px. Below 768px, every card takes the full width.
- \`container, fixed\` gives the section 24px of side padding at every width
- \`stack-mobile\` in the layout stacks the cards below 768px as the page scrolls. Each card sticks below the navigation and fades in over the one before it, which shrinks and darkens. The first card shrinks to 92%, and the last one stays. Without CSS scroll-driven animations, or with reduced motion, the cards form a plain column 24px apart.
- Storybook shows each card's light image in the light theme and its dark image in the dark one. The section has no background color, so it follows the Theme menu.
`;
