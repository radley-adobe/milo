import { ACROBAT, renderPageBlock } from '../../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/explore-card';

// Renders cards from a live page, so it has no controls or Docs page.
export default {
  title: 'Sections/Bento (2 Up)',
  tags: ['!autodocs'],
  parameters: { cssprops, controls: { disable: true } },
};

// The two explore cards that sit side by side in Acrobat Studio's first bento section, alone in
// that section, whose layout is bento. Below 768px each card takes the full width.
export const Bento2Up = {
  name: 'Bento (2 Up)',
  render: () => renderPageBlock(`${ACROBAT}/acrobat-studio`, 'explore-card', {
    count: 2, metadata: true, masonry: 'span 6, span 6', foundation: 'c2',
  }),
};
