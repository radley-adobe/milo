import { HOMEPAGE_FRAGMENTS, renderPageSections } from '../../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/explore-card';

const fragment = `${HOMEPAGE_FRAGMENTS}/all-products-card`;

// Renders the homepage fragment as published, so it has no controls or Docs page.
export default {
  title: 'Sections/Product Grid',
  tags: ['!autodocs'],
  parameters: { cssprops, controls: { disable: true } },
};

// The homepage's nine explore cards with the section that holds them, whose layout is
// product-grid and whose style is three-up and dark.
export const ProductGrid = {
  name: 'Product Grid',
  render: () => renderPageSections(`${fragment}/all-products-card`, 'explore-card', { foundation: 'c2' }),
};
