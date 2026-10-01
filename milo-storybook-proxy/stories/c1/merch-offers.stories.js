import { LIBRARY, renderPageBlock } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c1/merch-offers';

export default { title: 'C1/Merch Offers', parameters: { cssprops } };

const library = `${LIBRARY}/merch-offers`;

export const Default = {
  render: () => renderPageBlock(library, 'merch-offers'),
};

export const Edu = {
  render: () => renderPageBlock(library, 'merch-offers', { index: 1 }),
};

export const Upgrade = {
  render: () => renderPageBlock(library, 'merch-offers', { index: 2 }),
};
