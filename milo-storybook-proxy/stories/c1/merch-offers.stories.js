import { LIBRARY, renderPageBlock } from '../../src/milo.js';

export default { title: 'C1/Merch Offers' };

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
