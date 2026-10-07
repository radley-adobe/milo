import { CC_PRO_TEST_FRAGMENTS, renderPageSections } from '../../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/explore-card';

// Renders the fragment as published, so it has no controls or Docs page.
export default {
  title: 'Sections/Bento (2 Up)',
  tags: ['!autodocs'],
  parameters: { cssprops, controls: { disable: true } },
};

// The Creative Cloud Pro hub's bento section: four explore cards with show-link, two to a row
// from 768px. Its layout is bento and stack-mobile, so below 768px the cards stack as the page
// scrolls.
export const Bento2Up = {
  name: 'Bento (2 Up)',
  render: () => renderPageSections(`${CC_PRO_TEST_FRAGMENTS}/cpro-hub`, 'explore-card', { foundation: 'c2' }),
};
