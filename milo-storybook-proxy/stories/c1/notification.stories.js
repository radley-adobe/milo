import { LIBRARY, renderPageBlock } from '../../src/milo.js';

export default { title: 'C1/Notification' };

const library = `${LIBRARY}/notification`;

export const Default = {
  render: () => renderPageBlock(library, 'notification'),
};

export const Center = {
  render: () => renderPageBlock(library, 'notification', { index: 1 }),
};

export const Pill = {
  render: () => renderPageBlock(library, 'notification', { index: 2 }),
};

export const PillDarkMButton = {
  name: 'Pill dark + m button',
  render: () => renderPageBlock(library, 'notification', { index: 3 }),
};

export const RibbonSpaceBetween = {
  name: 'Ribbon space-between',
  render: () => renderPageBlock(library, 'notification', { index: 4 }),
};

export const RibbonCenter = {
  name: 'Ribbon center',
  render: () => renderPageBlock(library, 'notification', { index: 5 }),
};

export const MWebFullWidthButtonInMobile = {
  name: 'mWeb full width button in mobile',
  render: () => renderPageBlock(library, 'notification', { index: 6 }),
};
