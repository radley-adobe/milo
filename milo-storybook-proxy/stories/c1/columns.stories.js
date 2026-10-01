import { LIBRARY, renderPageBlock } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c1/columns';

export default { title: 'C1/Columns', parameters: { cssprops } };

const library = `${LIBRARY}/columns`;

export const Contained = {
  render: () => renderPageBlock(library, 'columns'),
};
