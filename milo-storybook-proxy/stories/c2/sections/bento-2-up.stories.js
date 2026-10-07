import { CC_PRO_TEST_FRAGMENTS, renderPageBlock } from '../../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/explore-card';

// An example section built from a live fragment's cards, so it has no controls or Docs page.
export default {
  title: 'Sections/Bento (2 Up)',
  tags: ['!autodocs'],
  parameters: { cssprops, controls: { disable: true } },
};

// Two dark explore cards from the Creative Cloud Pro offer, side by side from 768px, in a bento
// section with no background color, so the section follows the Theme menu. Below 768px each
// card takes the full width.
export const Bento2Up = {
  name: 'Bento (2 Up)',
  render: () => renderPageBlock(`${CC_PRO_TEST_FRAGMENTS}/cpro-offer`, 'explore-card', {
    index: 10,
    count: 2,
    metadata: { style: 'container, fixed', layout: 'bento', masonry: 'span 6, span 6' },
    foundation: 'c2',
  }),
};
