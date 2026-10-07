import { ACROBAT_TEST_FRAGMENTS, renderPageSections } from '../../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/explore-card';

// Renders the fragment as published, so it has no controls or Docs page.
export default {
  title: 'Sections/Bento (3 Up)',
  tags: ['!autodocs'],
  parameters: { cssprops, controls: { disable: true } },
};

// The Acrobat product test's bento section: from 768px, two explore cards, then three, then a
// full-width card. Below 768px each card takes the full width.
export const Bento3Up = {
  name: 'Bento (3 Up)',
  render: () => renderPageSections(`${ACROBAT_TEST_FRAGMENTS}/ace1205-product`, 'explore-card', { foundation: 'c2' }),
};
