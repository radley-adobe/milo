import { CC_PRO_TEST_FRAGMENTS, renderPageBlock } from '../../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/explore-card';

// An example section built from a live fragment's cards, so it has no controls or Docs page.
export default {
  title: 'Sections/Bento (3 Up)',
  tags: ['!autodocs'],
  parameters: { cssprops, controls: { disable: true } },
};

// Three dark explore cards from the Creative Cloud Pro offer, side by side from 768px, in a
// bento section with no background color, so the section follows the Theme menu. Below 768px
// each card takes the full width.
export const Bento3Up = {
  name: 'Bento (3 Up)',
  render: () => renderPageBlock(`${CC_PRO_TEST_FRAGMENTS}/cpro-offer`, 'explore-card', {
    index: 3,
    count: 3,
    metadata: { style: 'container, fixed', layout: 'bento', masonry: 'span 4, span 4, span 4' },
    foundation: 'c2',
  }),
};
