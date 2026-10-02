import { LIBRARY, renderPageBlock } from '../../src/milo.js';
import cssprops from 'virtual:cssprops/c1/text';
import variants from 'virtual:variants/c1/text';

export default { title: 'C1/Text', parameters: { cssprops }, argTypes: { variants } };

const library = `${LIBRARY}/text`;

export const Default = {
  render: () => renderPageBlock(library, 'text'),
};

export const DefaultLockup = {
  name: 'Default + lockup',
  render: () => renderPageBlock(library, 'text', { index: 1 }),
};

export const Example12ColLeftAlign = {
  name: '12 col left-align',
  render: () => renderPageBlock(library, 'text', { index: 2 }),
};

export const LongForm = {
  name: 'Long form',
  render: () => renderPageBlock(library, 'text', { index: 3 }),
};

export const Legal = {
  render: () => renderPageBlock(library, 'text', { index: 4 }),
};

export const LinkFarm = {
  name: 'Link farm',
  render: () => renderPageBlock(library, 'text', { index: 5 }),
};

export const AccentBar = {
  name: 'Accent bar',
  render: () => renderPageBlock(library, 'text', { index: 6 }),
};

export const MWebLeftAlignmentInMobile = {
  name: 'mWeb left alignment in mobile',
  render: () => renderPageBlock(library, 'text', { index: 7 }),
};

export const MWebCenterAlignmentInMobile = {
  name: 'mWeb center alignment in mobile',
  render: () => renderPageBlock(library, 'text', { index: 8 }),
};
