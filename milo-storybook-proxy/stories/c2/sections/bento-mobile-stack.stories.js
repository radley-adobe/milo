import { CC_PRO_TEST_FRAGMENTS, renderPageBlock } from '../../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/explore-card';

// An example section built from a live fragment's cards, so it has no controls or Docs page.
export default {
  title: 'Sections/Bento (Mobile Stack)',
  tags: ['!autodocs'],
  parameters: { cssprops, controls: { disable: true } },
};

// The Creative Cloud Pro offer's first three dark explore cards in a bento section with no
// background color, so the section follows the Theme menu. From 768px, two cards sit side by
// side with a full-width card under them. The layout is bento and stack-mobile, so below 768px
// the cards stack as the page scrolls, in browsers with CSS scroll-driven animations.
export const BentoMobileStack = {
  name: 'Bento (Mobile Stack)',
  render: () => renderPageBlock(`${CC_PRO_TEST_FRAGMENTS}/cpro-offer`, 'explore-card', {
    count: 3,
    metadata: { style: 'container, fixed', layout: 'bento, stack-mobile', masonry: 'span 6, span 6\nfull width' },
    foundation: 'c2',
  }),
};
