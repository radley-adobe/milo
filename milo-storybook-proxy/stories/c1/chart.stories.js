import { LIBRARY, renderPageBlock } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c1/chart';
import variants from 'virtual:variants/c1/chart';

export default { title: 'C1/Chart', parameters: { cssprops }, argTypes: { variants } };

const library = `${LIBRARY}/chart`;

export const AreaWithBorder = {
  name: 'Area with border',
  render: () => renderPageBlock(library, 'chart'),
};

export const BarWithBorder = {
  name: 'Bar with border',
  render: () => renderPageBlock(library, 'chart', { index: 1 }),
};

export const ColumnWithBorder = {
  name: 'Column with border',
  render: () => renderPageBlock(library, 'chart', { index: 2 }),
};

export const DonutWithBorder = {
  name: 'Donut with border',
  render: () => renderPageBlock(library, 'chart', { index: 3 }),
};

export const LineWithBorder = {
  name: 'Line with border',
  render: () => renderPageBlock(library, 'chart', { index: 4 }),
};

export const ListWithBorder = {
  name: 'List with border',
  render: () => renderPageBlock(library, 'chart', { index: 5 }),
};

export const OversizedNumberWithBorder = {
  name: 'Oversized number with border',
  render: () => renderPageBlock(library, 'chart', { index: 6 }),
};

export const PieWithBorder = {
  name: 'Pie with border',
  render: () => renderPageBlock(library, 'chart', { index: 7 }),
};

export const DiagonalLabelsOnDesktop = {
  name: 'Diagonal labels on desktop',
  render: () => renderPageBlock(library, 'chart', { index: 8 }),
};
