import { LIBRARY, renderPageBlock } from '../../src/milo.js';

export default { title: 'C1/iFrame' };

const library = `${LIBRARY}/iframe`;

export const Default = {
  render: () => renderPageBlock(library, 'iframe'),
};
