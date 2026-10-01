import { LIBRARY, renderLibraryExample, renderPageBlock } from '../../src/milo.js';

export default { title: 'C1/Bricks' };

const library = `${LIBRARY}/bricks`;

export const Default = {
  render: () => renderPageBlock(library, 'brick'),
};

export const Light = {
  render: () => renderPageBlock(library, 'brick', { index: 1 }),
};

export const RoundedCorners = {
  name: 'Rounded corners',
  render: () => renderPageBlock(library, 'brick', { index: 2 }),
};

export const LRoundedCornersImage = {
  name: 'L rounded corners image',
  render: () => renderPageBlock(library, 'brick', { index: 3 }),
};

export const Click = {
  render: () => renderPageBlock(library, 'brick', { index: 4 }),
};

export const ButtonFill = {
  name: 'Button fill',
  render: () => renderPageBlock(library, 'brick', { index: 5 }),
};

export const Stack = {
  render: () => renderPageBlock(library, 'brick', { index: 6 }),
};

export const Center = {
  render: () => renderPageBlock(library, 'brick', { index: 7 }),
};

export const Split = {
  render: () => renderPageBlock(library, 'brick', { index: 8 }),
};

export const HorizontalCenter = {
  name: 'Horizontal center',
  render: () => renderPageBlock(library, 'brick', { index: 9 }),
};

export const LightRoundedCornersSHeading = {
  name: 'Light rounded corners s heading',
  render: () => renderPageBlock(library, 'brick', { index: 10 }),
};

export const Grid = {
  render: () => renderLibraryExample(library, 11),
};
