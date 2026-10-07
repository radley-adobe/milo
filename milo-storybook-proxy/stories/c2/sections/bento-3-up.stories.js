import { ACROBAT_TEST_FRAGMENTS, renderPageBlock } from '../../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/explore-card';

// Renders cards from a live fragment, so it has no controls or Docs page.
export default {
  title: 'Sections/Bento (3 Up)',
  tags: ['!autodocs'],
  parameters: { cssprops, controls: { disable: true } },
};

// The three explore cards that sit side by side in the Acrobat product test's bento section,
// alone in that section, whose layout is bento. Below 768px each card takes the full width.
export const Bento3Up = {
  name: 'Bento (3 Up)',
  render: () => renderPageBlock(`${ACROBAT_TEST_FRAGMENTS}/ace1205-product`, 'explore-card', {
    index: 2, count: 3, metadata: true, masonry: 'span 4, span 4, span 4', foundation: 'c2',
  }),
};
