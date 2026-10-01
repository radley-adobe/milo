import { LIBRARY, renderPageBlock } from '../../src/milo.js';

export default { title: 'C1/Reading Time' };

const library = `${LIBRARY}/reading-time`;

export const Default = {
  render: () => renderPageBlock(library, 'reading-time'),
};
