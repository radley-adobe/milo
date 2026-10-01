import { LIBRARY, renderLibraryExample, renderPageBlock } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c1/action-item';

export default { title: 'C1/Action Item', parameters: { cssprops } };

const library = `${LIBRARY}/action-item`;

export const Default = {
  render: () => renderPageBlock(library, 'action-item'),
};

export const Small = {
  render: () => renderPageBlock(library, 'action-item', { index: 1 }),
};

export const Medium = {
  render: () => renderPageBlock(library, 'action-item', { index: 2 }),
};

export const Large = {
  render: () => renderPageBlock(library, 'action-item', { index: 3 }),
};

export const Center = {
  render: () => renderPageBlock(library, 'action-item', { index: 4 }),
};

export const Rounded = {
  render: () => renderPageBlock(library, 'action-item', { index: 5 }),
};

export const RoundedL = {
  name: 'Rounded l',
  render: () => renderPageBlock(library, 'action-item', { index: 6 }),
};

export const AlignCenter = {
  name: 'Align center',
  render: () => renderPageBlock(library, 'action-item', { index: 7 }),
};

export const AlignBottom = {
  name: 'Align bottom',
  render: () => renderPageBlock(library, 'action-item', { index: 8 }),
};

export const Zoom = {
  render: () => renderPageBlock(library, 'action-item', { index: 9 }),
};

export const FloatIcon = {
  name: 'Float icon',
  render: () => renderPageBlock(library, 'action-item', { index: 10 }),
};

export const FloatButton = {
  name: 'Float button',
  render: () => renderPageBlock(library, 'action-item', { index: 11 }),
};

export const ActionScroller = {
  name: 'Action scroller',
  render: () => renderLibraryExample(library, 12),
};

export const ActionScrollerWNavigation = {
  name: 'Action scroller w/ navigation',
  render: () => renderLibraryExample(library, 13),
};
