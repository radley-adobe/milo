import { LIBRARY, renderPageBlock } from '../../src/milo.js';

export default { title: 'C1/Editorial Card' };

const library = `${LIBRARY}/editorial-card`;

export const Default = {
  render: () => renderPageBlock(library, 'editorial-card'),
};

export const Open = {
  render: () => renderPageBlock(library, 'editorial-card', { index: 1 }),
};

export const MediaTall = {
  name: 'Media tall',
  render: () => renderPageBlock(library, 'editorial-card', { index: 2 }),
};
