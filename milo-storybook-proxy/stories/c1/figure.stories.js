import { LIBRARY, renderPageBlock } from '../../src/milo.js';

export default { title: 'C1/Figure' };

const library = `${LIBRARY}/figure`;

export const ImageWithCaption = {
  name: 'Image with caption',
  render: () => renderPageBlock(library, 'figure'),
};

export const MultipleImagesWithCaptions = {
  name: 'Multiple images with captions',
  render: () => renderPageBlock(library, 'figure', { index: 1 }),
};

export const FullHeight = {
  name: 'Full-height',
  render: () => renderPageBlock(library, 'figure', { index: 2 }),
};
