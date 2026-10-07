import { CC_PRO_TEST_FRAGMENTS, renderPageSections } from '../../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/explore-card';

// Renders the fragment as published, so it has no controls or Docs page.
export default {
  title: 'Sections/Bento (Mobile Stack)',
  tags: ['!autodocs'],
  parameters: { cssprops, controls: { disable: true } },
};

// The Creative Cloud Pro offer's first bento section: from 768px, two explore cards side by side
// and a full-width card under them. Its layout is bento and stack-mobile, so below 768px the
// cards stack as the page scrolls.
export const BentoMobileStack = {
  name: 'Bento (Mobile Stack)',
  render: () => renderPageSections(`${CC_PRO_TEST_FRAGMENTS}/cpro-offer`, 'explore-card', { foundation: 'c2' }),
};
