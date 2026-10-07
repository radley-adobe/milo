import { CC_PRO_TEST_FRAGMENTS, renderPageBlock } from '../../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/explore-card';

// An example section built from a live fragment's card, so it has no controls or Docs page.
export default {
  title: 'Sections/Bento (Featured)',
  tags: ['!autodocs'],
  parameters: { cssprops, controls: { disable: true } },
};

// A full-width dark explore card from the Creative Cloud Pro offer, in a bento section with no
// background color, so the section follows the Theme menu.
export const BentoFeatured = {
  name: 'Bento (Featured)',
  render: () => renderPageBlock(`${CC_PRO_TEST_FRAGMENTS}/cpro-offer`, 'explore-card', {
    index: 9,
    metadata: { style: 'container, fixed', layout: 'bento', masonry: 'full width' },
    foundation: 'c2',
  }),
};
