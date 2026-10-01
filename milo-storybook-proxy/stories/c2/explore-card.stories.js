import { HOMEPAGE_FRAGMENTS, renderPage } from '../../src/milo.js';

export default { title: 'C2/Explore Card' };

export const HomepageAllProducts = {
  name: 'adobe.com: Homepage all products',
  render: () => renderPage(`${HOMEPAGE_FRAGMENTS}/all-products-card/all-products-card`, { foundation: 'c2' }),
};
