import { LIBRARY, renderPageBlock } from '../../src/milo.js';

export default { title: 'C1/Mnemonic' };

const library = `${LIBRARY}/mnemonic`;

export const Default = {
  render: () => renderPageBlock(library, 'mnemonic-list'),
};
