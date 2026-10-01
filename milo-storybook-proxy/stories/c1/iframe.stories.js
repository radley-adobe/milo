import { LIBRARY, renderPageBlock } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c1/iframe';

export default { title: 'C1/iFrame', parameters: { cssprops } };

const library = `${LIBRARY}/iframe`;

export const Default = {
  render: () => renderPageBlock(library, 'iframe'),
};
