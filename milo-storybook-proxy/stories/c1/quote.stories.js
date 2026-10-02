import { LIBRARY, renderPageBlock } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c1/quote';
import variants from 'virtual:variants/c1/quote';

export default { title: 'C1/Quote', parameters: { cssprops }, argTypes: { variants } };

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
