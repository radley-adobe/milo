import { LIBRARY, renderPageBlock } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c1/comparison-table';

export default { title: 'C1/Comparison Table', parameters: { cssprops } };

const library = `${LIBRARY}/comparison-table`;

export const Default = {
  render: () => renderPageBlock(library, 'comparison-table'),
};

export const StaticHeader = {
  name: 'Static header',
  render: () => renderPageBlock(library, 'comparison-table', { index: 1 }),
};
