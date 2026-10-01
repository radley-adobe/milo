import { LIBRARY, renderPageBlock } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c1/share';

export default { title: 'C1/Social Media', parameters: { cssprops } };

const library = `${LIBRARY}/share`;

export const Default = {
  render: () => renderPageBlock(library, 'share'),
};

export const CustomTitleList = {
  name: 'Custom title + list',
  render: () => renderPageBlock(library, 'share', { index: 1 }),
};
