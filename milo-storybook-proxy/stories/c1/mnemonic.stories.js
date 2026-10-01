import { LIBRARY, renderPageBlock } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c1/mnemonic-list';

export default { title: 'C1/Mnemonic', parameters: { cssprops } };

const library = `${LIBRARY}/mnemonic`;

export const Default = {
  render: () => renderPageBlock(library, 'mnemonic-list'),
};
