import { ACROBAT, renderPageBlock } from '../../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/explore-card';

// Renders a card from a live page, so it has no controls or Docs page.
export default {
  title: 'Sections/Bento (Featured)',
  tags: ['!autodocs'],
  parameters: { cssprops, controls: { disable: true } },
};

// The full-width explore card from Acrobat Studio's first bento section, alone in that section,
// whose layout is bento.
export const BentoFeatured = {
  name: 'Bento (Featured)',
  render: () => renderPageBlock(`${ACROBAT}/acrobat-studio`, 'explore-card', {
    index: 2, metadata: true, masonry: 'full width', foundation: 'c2',
  }),
};
