import { LIBRARY, renderLibraryExample, renderPageBlock } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c1/table';
import variants from 'virtual:variants/c1/table';

export default { title: 'C1/Table', parameters: { cssprops }, argTypes: { variants } };

const library = `${LIBRARY}/table`;

export const LeftTop = {
  name: 'Left, top',
  render: () => renderPageBlock(library, 'table'),
};

export const Default = {
  render: () => renderPageBlock(library, 'table', { index: 1 }),
};

export const Highlight = {
  render: () => renderPageBlock(library, 'table', { index: 2 }),
};

export const Sticky = {
  render: () => renderPageBlock(library, 'table', { index: 3 }),
};

export const Collapse = {
  render: () => renderPageBlock(library, 'table', { index: 4 }),
};

export const HighlightStickyCollapse = {
  name: 'Highlight, sticky, collapse',
  render: () => renderPageBlock(library, 'table', { index: 5 }),
};

export const Merch = {
  render: () => renderPageBlock(library, 'table', { index: 6 }),
};

export const MerchHighlightSticky = {
  name: 'Merch, highlight, sticky',
  render: () => renderLibraryExample(library, 7),
};

export const MerchPricingBottom = {
  name: 'Merch pricing bottom',
  render: () => renderPageBlock(library, 'table', { index: 8 }),
};

export const MerchButtonRight = {
  name: 'Merch button right',
  render: () => renderPageBlock(library, 'table', { index: 9 }),
};

export const MerchMHeadingIcon = {
  name: 'Merch m heading icon',
  render: () => renderPageBlock(library, 'table', { index: 10 }),
};
