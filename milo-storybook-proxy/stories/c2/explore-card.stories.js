import { HOMEPAGE_FRAGMENTS, renderPage } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c2/explore-card';
import variants from 'virtual:variants/c2/explore-card';

export default { title: 'Explore Card', parameters: { cssprops }, argTypes: { variants } };

export const HomepageAllProducts = {
  name: 'adobe.com: Homepage all products',
  render: () => renderPage(`${HOMEPAGE_FRAGMENTS}/all-products-card/all-products-card`, { foundation: 'c2' }),
};
