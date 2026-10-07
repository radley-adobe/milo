import { renderBlock } from '../../../src/milo.js';

// One explore card, with the image for `theme`. `light` and `dark` each give an image `src`. An
// image with a `color` sits in front of that background color, in the card's second row, as on
// the Acrobat pages. One without fills the card, as on the Creative Cloud pages. The heading and
// body stay the same in both themes and take the theme's text colors.
function card({ heading, body, light, dark }, theme) {
  const { src, color } = theme === 'dark' ? dark : light;
  const picture = `<picture><img src="${src}" alt=""></picture>`;
  const text = `<div><h3>${heading}</h3><p>${body}</p></div>`;
  const rows = color
    ? `<div>${text}<div>${color}</div></div><div><div>${picture}</div></div>`
    : `<div>${text}<div>${picture}</div></div>`;
  return `<div class="explore-card heading-6">${rows}</div>`;
}

// A story that renders `cards` in an example bento section, with each card's image for the
// Theme menu's theme. The section has no background color, so it follows the theme too.
// `masonry` gives the columns each card spans from 768px, one line per row, and `layout` is the
// section's layout.
export const bentoStory = (cards, { masonry, layout = 'bento' }) => ({
  render: (args, { globals }) => renderBlock(`
${cards.map((c) => card(c, globals.theme)).join('\n')}
<div class="section-metadata">
  <div><div>style</div><div>container, fixed</div></div>
  <div><div>layout</div><div>${layout}</div></div>
  <div><div>masonry</div><div>${masonry}</div></div>
</div>`, { foundation: 'c2' }),
});
