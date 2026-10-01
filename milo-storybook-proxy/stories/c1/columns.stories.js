import { LIBRARY, renderPageBlock } from '../../src/milo.js';

export default { title: 'C1/Columns' };

const library = `${LIBRARY}/columns`;

export const Contained = {
  render: () => renderPageBlock(library, 'columns'),
};
