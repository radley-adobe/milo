import { HOMEPAGE_FRAGMENTS, renderPage } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/explore-card';

export default { title: 'C2/Explore Card', parameters: { cssprops } };

export const HomepageAllProducts = {
  name: 'adobe.com: Homepage all products',
  render: () => renderPage(`${HOMEPAGE_FRAGMENTS}/all-products-card/all-products-card`, { foundation: 'c2' }),
};
