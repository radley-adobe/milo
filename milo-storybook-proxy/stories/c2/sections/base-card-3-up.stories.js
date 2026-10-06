import { LIBRARY, renderPageSections } from '../../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/base-card';

const library = `${LIBRARY}/c2/base-card`;

// Renders the library page as published, so it has no controls or Docs page.
export default {
  title: 'Sections/Base Card (3 up)',
  tags: ['!autodocs'],
  parameters: { cssprops, controls: { disable: true } },
};

// The library's three base cards with the section that holds them, whose style is three-up.
export const BaseCardThreeUp = {
  name: 'Base Card (3 up)',
  render: () => renderPageSections(library, 'base-card', { index: 1, foundation: 'c2' }),
};
