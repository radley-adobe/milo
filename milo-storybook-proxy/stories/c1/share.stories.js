import { LIBRARY, renderPageBlock } from '../../src/milo.js';

export default { title: 'C1/Social Media' };

const library = `${LIBRARY}/share`;

export const Default = {
  render: () => renderPageBlock(library, 'share'),
};

export const CustomTitleList = {
  name: 'Custom title + list',
  render: () => renderPageBlock(library, 'share', { index: 1 }),
};
