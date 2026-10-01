import { LIBRARY, renderPageBlock } from '../../src/milo.js';

export default { title: 'C1/Quote' };

const library = `${LIBRARY}/quote`;

export const Default = {
  render: () => renderPageBlock(library, 'quote'),
};

export const AlignToRight = {
  name: 'Align to right',
  render: () => renderPageBlock(library, 'quote', { index: 1 }),
};

export const Inline = {
  render: () => renderPageBlock(library, 'quote', { index: 2 }),
};

export const WithBorders = {
  name: 'With borders',
  render: () => renderPageBlock(library, 'quote', { index: 3 }),
};
