import { LIBRARY, renderPageBlock } from '../../src/milo.js';
import card from 'virtual:cssprops/c1/card';
import cardHorizontal from 'virtual:cssprops/c1/card-horizontal';

export default { title: 'C1/Card' };

const library = `${LIBRARY}/card`;

export const Default = {
  parameters: { cssprops: card },
  render: () => renderPageBlock(library, 'card'),
};

export const HalfCardBorder = {
  name: 'Half card border',
  parameters: { cssprops: card },
  render: () => renderPageBlock(library, 'card', { index: 1 }),
};

export const DoubleWidthCardBorder = {
  name: 'Double width card border',
  parameters: { cssprops: card },
  render: () => renderPageBlock(library, 'card', { index: 2 }),
};

export const ProductCardBorder = {
  name: 'Product card border',
  parameters: { cssprops: card },
  render: () => renderPageBlock(library, 'card', { index: 3 }),
};

export const HalfHeightCardBorder = {
  name: 'Half height card border',
  parameters: { cssprops: card },
  render: () => renderPageBlock(library, 'card', { index: 4 }),
};

export const Horizontal = {
  parameters: { cssprops: cardHorizontal },
  render: () => renderPageBlock(library, 'card-horizontal'),
};

export const HorizontalTile = {
  name: 'Horizontal tile',
  parameters: { cssprops: cardHorizontal },
  render: () => renderPageBlock(library, 'card-horizontal', { index: 1 }),
};
