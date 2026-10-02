import { LIBRARY, renderPageBlock } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c1/editorial-card';
import variants from 'virtual:variants/c1/editorial-card';

export default { title: 'C1/Editorial Card', parameters: { cssprops }, argTypes: { variants } };

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
