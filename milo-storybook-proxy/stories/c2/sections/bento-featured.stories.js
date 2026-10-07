import { ACROBAT, renderPageSections } from '../../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/explore-card';

// Renders the page as published, so it has no controls or Docs page.
export default {
  title: 'Sections/Bento (Featured)',
  tags: ['!autodocs'],
  parameters: { cssprops, controls: { disable: true } },
};

// Acrobat Studio's first bento section: a heading, two explore cards side by side and a
// full-width card under them. Its layout is bento, and its masonry metadata sets the columns
// each block spans from 768px. Below 768px each block takes the full width.
export const BentoFeatured = {
  name: 'Bento (Featured)',
  render: () => renderPageSections(`${ACROBAT}/acrobat-studio`, 'explore-card', { foundation: 'c2' }),
};
