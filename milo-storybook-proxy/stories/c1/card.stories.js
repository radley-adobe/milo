import { LIBRARY, renderPageBlock } from '../../src/milo.js';

export default { title: 'C1/Card' };

const library = `${LIBRARY}/card`;

export const Default = {
  render: () => renderPageBlock(library, 'card'),
};

export const HalfCardBorder = {
  name: 'Half card border',
  render: () => renderPageBlock(library, 'card', { index: 1 }),
};

export const DoubleWidthCardBorder = {
  name: 'Double width card border',
  render: () => renderPageBlock(library, 'card', { index: 2 }),
};

export const ProductCardBorder = {
  name: 'Product card border',
  render: () => renderPageBlock(library, 'card', { index: 3 }),
};

export const HalfHeightCardBorder = {
  name: 'Half height card border',
  render: () => renderPageBlock(library, 'card', { index: 4 }),
};

export const Horizontal = {
  render: () => renderPageBlock(library, 'card-horizontal'),
};

export const HorizontalTile = {
  name: 'Horizontal tile',
  render: () => renderPageBlock(library, 'card-horizontal', { index: 1 }),
};
